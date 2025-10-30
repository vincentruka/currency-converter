import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import { createServer as createViteServer } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const isProduction = process.env.NODE_ENV === 'production'

async function createServer() {
  const app = express()

  let vite: Awaited<ReturnType<typeof createViteServer>> | null = null
  let render: ((url: string) => Promise<{ html: string; dehydratedState: unknown }>) | null = null

  if (!isProduction) {
    // DEVELOPMENT: Use Vite dev server
    console.log('🚀 Running in DEVELOPMENT mode with Vite dev server')
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    })
    app.use(vite.middlewares)
  } else {
    // PRODUCTION: Use pre-built bundles
    console.log('📦 Running in PRODUCTION mode with pre-built bundles')
    
    // Serve static files from dist
    app.use(express.static(path.resolve(__dirname, 'dist'), { index: false }))

    // Load the built server module
    const serverPath = path.resolve(__dirname, 'dist/entry-server.js')
    const serverModule = await import(serverPath)
    render = serverModule.render
  }

  // Handle all routes
  app.use(async (req, res, next) => {
    // Skip SSR for non-HTML requests (static assets handled by vite.middlewares or express.static)
    if (req.method !== 'GET') {
      return next()
    }

    // Skip SSR for requests with file extensions or API routes
    if (req.path.includes('.') && !req.path.endsWith('.html')) {
      return next()
    }

    const url = req.originalUrl

    try {
      let template: string
      let appHtml: string
      let dehydratedState: unknown

      if (!isProduction && vite) {
        // DEVELOPMENT: Use Vite dev server
        // 1. Read index.html
        template = await fs.readFile(
          path.resolve(__dirname, 'index.html'),
          'utf-8'
        )

        // 2. Apply Vite HTML transforms
        template = await vite.transformIndexHtml(url, template)

        // 3. Load the server entry dynamically
        const { render: renderFn } = await vite.ssrLoadModule('/src/entry-server.tsx')
        const result = await renderFn(url)
        appHtml = result.html
        dehydratedState = result.dehydratedState
      } else if (isProduction && render) {
        // PRODUCTION: Use pre-built bundles
        // 1. Read built index.html
        template = await fs.readFile(
          path.resolve(__dirname, 'dist/index.html'),
          'utf-8'
        )

        // 2. Use pre-built render function
        const result = await render(url)
        appHtml = result.html
        dehydratedState = result.dehydratedState
      } else {
        throw new Error('Server not properly initialized')
      }

      // 3. Inject the app-rendered HTML and dehydrated state
      const finalHtml = template
        .replace(`<div id="root"></div>`, `<div id="root">${appHtml}</div>`)
        .replace(
          '</body>',
          `<script>window.__REACT_QUERY_STATE__ = ${JSON.stringify(dehydratedState)};</script></body>`
        )

      // 4. Send the rendered HTML back
      res.status(200).set({ 'Content-Type': 'text/html' }).end(finalHtml)
    } catch (e: unknown) {
      if (!isProduction && vite) {
        vite.ssrFixStacktrace(e as Error)
      }
      console.error(e)
      const errorMessage = e instanceof Error ? e.message : 'Internal Server Error'
      res.status(500).end(errorMessage)
    }
  })

  return app
}

// Only start Express server in non-Vercel environments
if (!process.env.VERCEL) {
  createServer().then((app) => {
    const port = process.env.PORT || 5173
    app.listen(port, () => {
      console.log(`✅ Server is running on http://localhost:${port}`)
    })
  })
}
