import fs from 'node:fs'
import path from 'node:path'
import { promises as fsPromises } from 'node:fs'
import { pathToFileURL } from 'node:url'

export interface SSRResult {
  html: string
  dehydratedState: unknown
  styleTags?: string
}

export interface SSRContext {
  projectRoot: string
  distPath: string
}

/**
 * Resolves path to dist directory
 */
export function resolveDistPath(projectRoot: string, relativePath: string): string {
  return path.join(projectRoot, 'dist', relativePath)
}

/**
 * Loads the production render function from built entry-server
 */
export async function loadRenderFunction(projectRoot: string): Promise<(url: string) => Promise<SSRResult>> {
  const serverPath = path.resolve(resolveDistPath(projectRoot, 'entry-server.js'))
  const serverUrl = pathToFileURL(serverPath).href
  const { render } = await import(serverUrl)
  return render
}

/**
 * Reads the HTML template, handling both dist and root locations
 * Also ensures client bundle script is present
 */
export async function getHTMLTemplate(projectRoot: string): Promise<string> {
  const distTemplatePath = resolveDistPath(projectRoot, 'index.html')
  const rootTemplatePath = path.join(projectRoot, 'index.html')
  const templatePath = fs.existsSync(distTemplatePath) ? distTemplatePath : rootTemplatePath
  let template = fs.readFileSync(templatePath, 'utf-8')

  // Check if template has a valid production script tag (not dev script)
  const scriptMatches = template.matchAll(/<script[^>]*src=["']([^"']*)["'][^>]*>/g)
  const hasProductionScript = Array.from(scriptMatches).some(match => {
    const src = match[1]
    return src.includes('/assets/') && src.endsWith('.js') && !src.includes('/src/')
  })

  // If no production script found, inject client bundle
  if (!hasProductionScript) {
    try {
      const assetsDir = resolveDistPath(projectRoot, 'assets')
      const files = await fsPromises.readdir(assetsDir).catch(() => [])
      
      // Find client bundle - prioritize files with 'client' in name
      // Build output shows: client-*.js, main-*.js, index-*.js
      const clientJs = files.find((f) => {
        const name = f.toLowerCase()
        return f.endsWith('.js') && name.includes('client')
      }) || files.find((f) => {
        const name = f.toLowerCase()
        return f.endsWith('.js') && (name.includes('main') || name.includes('index')) && !name.includes('server')
      })
      
      if (clientJs) {
        // Remove any dev scripts (only if they exist)
        template = template.replace(/<script[^>]*src=["']\/src\/[^"']*["'][^>]*><\/script>/g, '')
        
        // Check if script already exists with this filename (Vite might have injected it)
        if (!template.includes(clientJs)) {
          // Inject before closing body tag (find last </body> to ensure we don't break existing scripts)
          const lastBodyIndex = template.lastIndexOf('</body>')
          if (lastBodyIndex !== -1) {
            const scriptTag = `<script type="module" src="/assets/${clientJs}"></script>`
            template = template.slice(0, lastBodyIndex) + scriptTag + template.slice(lastBodyIndex)
          }
        }
      } else {
        console.warn('No client bundle found in assets directory. Files:', files)
      }
    } catch (e) {
      console.warn('Could not inject client bundle:', e)
    }
  }

  return template
}

/**
 * Inlines CSS from dist/assets to prevent font flicker (FOUT)
 */
export async function getCSSInjection(projectRoot: string): Promise<string> {
  let cssInjection = ''
  try {
    const assetsDir = resolveDistPath(projectRoot, 'assets')
    const files = await fsPromises.readdir(assetsDir).catch(() => [])
    const cssFile = files.find((f) => f.endsWith('.css'))
    if (cssFile) {
      const cssContent = await fsPromises.readFile(path.join(assetsDir, cssFile), 'utf-8')
      cssInjection = `<style id="critical-css">${cssContent}</style>`
    }
  } catch {
    // Continue without CSS if extraction fails
  }
  
  return cssInjection
}

/**
 * Ensures consistent font-family from start (prevents font switching)
 */
export function ensureFontFamily(template: string, cssInjection: string): string {
  if (!template.includes('font-family')) {
    cssInjection = `<style>:root,body{font-family:system-ui,Avenir,Helvetica,Arial,sans-serif}</style>${cssInjection}`
  }
  return cssInjection
}

/**
 * Builds the final HTML by injecting SSR content
 */
export function buildFinalHTML(
  template: string,
  appHtml: string,
  dehydratedState: unknown,
  styleTags: string,
  cssInjection: string
): string {
  // Ensure consistent font-family
  cssInjection = ensureFontFamily(template, cssInjection)

  // Inject CSS and styled-components styles in head
  let finalHtml = template.replace('</head>', `${cssInjection}${styleTags || ''}</head>`)
  
  // Replace root div with SSR content
  finalHtml = finalHtml.replace(`<div id="root"></div>`, `<div id="root">${appHtml}</div>`)
  
  // Inject dehydrated state before closing body (but preserve any existing scripts)
  // Find the last </body> tag and inject before it
  const bodyCloseIndex = finalHtml.lastIndexOf('</body>')
  if (bodyCloseIndex !== -1) {
    const stateScript = `<script>window.__REACT_QUERY_STATE__ = ${JSON.stringify(dehydratedState)};</script>`
    finalHtml = finalHtml.slice(0, bodyCloseIndex) + stateScript + finalHtml.slice(bodyCloseIndex)
  }
  
  return finalHtml
}

/**
 * Complete SSR rendering for production mode
 */
export async function renderProduction(url: string, projectRoot: string): Promise<string> {
  // Load render function
  const render = await loadRenderFunction(projectRoot)
  
  // Get HTML template
  const template = await getHTMLTemplate(projectRoot)
  
  // Render app with SSR
  const { html: appHtml, dehydratedState, styleTags } = await render(url)
  
  // Get CSS injection
  const cssInjection = await getCSSInjection(projectRoot)
  
  // Build final HTML
  return buildFinalHTML(template, appHtml, dehydratedState, styleTags || '', cssInjection)
}

