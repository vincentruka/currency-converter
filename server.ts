import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import { createServer as createViteServer } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const isProduction = process.env.NODE_ENV === 'production'

type RenderResult = {
  html: string
  dehydratedState: unknown
  styleTags?: string
}

type RenderFn = (url: string) => Promise<RenderResult>

// Helper functions
async function setupDevelopmentServer(app: express.Express) {
  console.log('🚀 Running in DEVELOPMENT mode with Vite dev server')
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  })
  app.use(vite.middlewares)
  return vite
}

async function setupProductionServer(app: express.Express): Promise<RenderFn> {
  console.log('📦 Running in PRODUCTION mode with pre-built bundles')
  
  // Serve static files from dist
  app.use(express.static(path.resolve(__dirname, 'dist'), { index: false }))

  // Load the built server module
  const serverPath = path.resolve(__dirname, 'dist/entry-server.js')
  const serverModule = await import(serverPath)
  return serverModule.render
}

async function createServer() {
  const app = express()

  let vite: Awaited<ReturnType<typeof createViteServer>> | null = null
  let render: RenderFn | null = null

  if (!isProduction) {
    vite = await setupDevelopmentServer(app)
  } else {
    render = await setupProductionServer(app)
  }

  // Helper functions for rendering
  async function renderDevelopment(
    url: string,
    vite: Awaited<ReturnType<typeof createViteServer>>
  ): Promise<{ template: string; result: RenderResult }> {
    // Read index.html
    let template = await fs.readFile(path.resolve(__dirname, 'index.html'), 'utf-8')
    
    // Apply Vite HTML transforms
    template = await vite.transformIndexHtml(url, template)
    
    // Load the server entry dynamically
    const { render: renderFn } = await vite.ssrLoadModule('/src/entry-server.tsx')
    const result = await renderFn(url)
    
    return { template, result }
  }

  async function injectClientScript(template: string): Promise<string> {
    try {
      const distAssetsDir = path.resolve(__dirname, 'dist/assets')
      const files = await fs.readdir(distAssetsDir).catch(() => [])
      const clientJsFile = files.find(
        (file) => file.endsWith('.js') && file.startsWith('client')
      )
      
      if (!clientJsFile) {
        return template
      }
      
      const clientScriptTag = `<script type="module" src="/assets/${clientJsFile}"></script>`
      
      // Replace any existing client script or dev script
      template = template.replace(
        /<script\s+type=["']module["']\s+src=["'][^"']*entry-client[^"']*["'][^>]*><\/script>/i,
        clientScriptTag
      )
      
      // If no script tag exists, add it before </body>
      if (!template.includes(clientScriptTag)) {
        template = template.replace('</body>', `${clientScriptTag}</body>`)
      }
      
      return template
    } catch (e) {
      console.warn('Could not inject client bundle script:', e)
      return template
    }
  }

  async function renderProduction(url: string, renderFn: RenderFn): Promise<{ template: string; result: RenderResult }> {
    // Read index.html from dist or root as fallback
    const distTemplatePath = path.resolve(__dirname, 'dist/index.html')
    const rootTemplatePath = path.resolve(__dirname, 'index.html')
    
    let template: string
    try {
      template = await fs.readFile(distTemplatePath, 'utf-8')
    } catch {
      template = await fs.readFile(rootTemplatePath, 'utf-8')
    }

    // Inject client bundle script tag
    template = await injectClientScript(template)

    // Use pre-built render function
    const result = await renderFn(url)
    
    return { template, result }
  }

  async function extractCSS(): Promise<string> {
    try {
      if (isProduction) {
        // In production, extract CSS file from dist/assets
        const distAssetsDir = path.resolve(__dirname, 'dist/assets')
        const files = await fs.readdir(distAssetsDir).catch(() => [])
        const cssFile = files.find((file) => file.endsWith('.css'))
        
        if (cssFile) {
          const cssPath = path.resolve(distAssetsDir, cssFile)
          const cssContent = await fs.readFile(cssPath, 'utf-8')
          return `<style id="critical-css">${cssContent}</style>`
        }
      } else {
        // In development, inline CSS from source to prevent flicker
        const cssPath = path.resolve(__dirname, 'src/index.css')
        const cssContent = await fs.readFile(cssPath, 'utf-8')
        return `<style id="critical-css">${cssContent}</style>`
      }
    } catch (e) {
      console.warn('Could not inline CSS:', e)
    }
    return ''
  }

  function buildFinalHtml(
    template: string,
    appHtml: string,
    dehydratedState: unknown,
    styleTags: string,
    cssInjection: string
  ): string {
    return template
      .replace('</head>', `${cssInjection}${styleTags}</head>`)
      .replace(`<div id="root"></div>`, `<div id="root">${appHtml}</div>`)
      .replace(
        '</body>',
        `<script>window.__REACT_QUERY_STATE__ = ${JSON.stringify(dehydratedState)};</script></body>`
      )
  }

  function shouldSkipSSR(req: express.Request): boolean {
    // Skip SSR for non-HTML requests
    if (req.method !== 'GET') {
      return true
    }
    
    // Skip SSR for requests with file extensions (except .html)
    if (req.path.includes('.') && !req.path.endsWith('.html')) {
      return true
    }
    
    return false
  }

  // Handle all routes
  app.use(async (req, res, next) => {
    if (shouldSkipSSR(req)) {
      return next()
    }

    const url = req.originalUrl

    try {
      let template: string
      let result: RenderResult

      if (!isProduction && vite) {
        // DEVELOPMENT: Use Vite dev server
        const rendered = await renderDevelopment(url, vite)
        template = rendered.template
        result = rendered.result
      } else if (isProduction && render) {
        // PRODUCTION: Use pre-built bundles
        const rendered = await renderProduction(url, render)
        template = rendered.template
        result = rendered.result
      } else {
        throw new Error('Server not properly initialized')
      }

      // Extract and inline CSS to prevent font flicker
      const cssInjection = await extractCSS()

      // Build final HTML with app-rendered content, styles, and dehydrated state
      const finalHtml = buildFinalHtml(
        template,
        result.html,
        result.dehydratedState,
        result.styleTags || '',
        cssInjection
      )

      // Send the rendered HTML back with cache-control headers
      res
        .status(200)
        .set({
          'Content-Type': 'text/html',
          'Cache-Control': isProduction
            ? 'public, max-age=3600'
            : 'no-cache, no-store, must-revalidate',
        })
        .end(finalHtml)
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
