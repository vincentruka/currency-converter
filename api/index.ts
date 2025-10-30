import type { VercelRequest, VercelResponse } from '@vercel/node'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

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
    const { html: appHtml, dehydratedState } = await render(url)

    // Inject rendered HTML and dehydrated state
    const finalHtml = template
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

