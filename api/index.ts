import type { VercelRequest, VercelResponse } from '@vercel/node'
import { renderProduction } from '../src/utils/ssr-render'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const url = req.url || '/'
    const projectRoot = process.cwd()
    const finalHtml = await renderProduction(url, projectRoot)

    res.setHeader('Content-Type', 'text/html')
    res.status(200).send(finalHtml)
  } catch (error) {
    console.error('SSR Error:', error)
    res.status(500).send('Internal Server Error')
  }
}

