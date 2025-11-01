import type { VercelRequest, VercelResponse } from '@vercel/node'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { promises as fsPromises } from 'node:fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Load the built server module
    const serverPath = path.join(__dirname, '../dist/entry-server.js')
    const { render } = await import(serverPath)

    // Read built HTML template
    const templatePath = path.join(__dirname, '../dist/index.html')
    const template = fs.readFileSync(templatePath, 'utf-8')

    // Render the app
    const url = req.url || '/'
    const { html: appHtml, dehydratedState, styleTags } = await render(url)

    // Extract and inline CSS to prevent font flicker
    let cssInjection = ''
    try {
      // In production on Vercel, extract CSS file from dist/assets
      const distAssetsDir = path.join(__dirname, '../dist/assets')
      const files = await fsPromises.readdir(distAssetsDir).catch(() => [])
      const cssFile = files.find((file) => file.endsWith('.css'))
      if (cssFile) {
        const cssPath = path.join(distAssetsDir, cssFile)
        const cssContent = await fsPromises.readFile(cssPath, 'utf-8')
        cssInjection = `<style id="critical-css">${cssContent}</style>`
      }
    } catch (e) {
      // If CSS extraction fails, continue without it
      console.warn('Could not inline CSS:', e)
    }

    // Inject rendered HTML, styles, and dehydrated state
    // Inject CSS first (before styled-components), then other styles
    const finalHtml = template
      .replace('</head>', `${cssInjection}${styleTags || ''}</head>`)
      .replace(`<div id="root"></div>`, `<div id="root">${appHtml}</div>`)
      .replace(
        '</body>',
        `<script>window.__REACT_QUERY_STATE__ = ${JSON.stringify(dehydratedState)};</script></body>`
      )

    res.setHeader('Content-Type', 'text/html')
    res.status(200).send(finalHtml)
  } catch (error) {
    console.error('SSR Error:', error)
    res.status(500).send('Internal Server Error')
  }
}

