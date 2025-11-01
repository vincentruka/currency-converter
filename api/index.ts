import type { VercelRequest, VercelResponse } from "@vercel/node";
import fs from "node:fs";
import path from "node:path";
import { promises as fsPromises } from "node:fs";
import { pathToFileURL } from "node:url";

// Resolve paths relative to project root (works on Vercel)
// On Vercel, process.cwd() points to /var/task (project root)
function resolveDistPath(relativePath: string): string {
  // Use process.cwd() which points to project root on Vercel
  const projectRoot = process.cwd();
  return path.join(projectRoot, "dist", relativePath);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Load the built server module
    // Use pathToFileURL for ESM import compatibility on Vercel
    const serverPath = path.resolve(resolveDistPath("entry-server.js"));
    const serverUrl = pathToFileURL(serverPath).href;
    const { render } = await import(serverUrl);

    // Read built HTML template
    // Try dist first, then fallback to root (for cases where Vite doesn't copy it)
    let template: string;
    const distTemplatePath = resolveDistPath("index.html");
    const rootTemplatePath = path.join(process.cwd(), "index.html");

    if (fs.existsSync(distTemplatePath)) {
      template = fs.readFileSync(distTemplatePath, "utf-8");
    } else if (fs.existsSync(rootTemplatePath)) {
      // Fallback: read from project root and transform for production
      template = fs.readFileSync(rootTemplatePath, "utf-8");

      // Find the built client bundle in dist/assets and replace the dev script tag
      try {
        const distAssetsDir = resolveDistPath("assets");
        const files = await fsPromises.readdir(distAssetsDir).catch(() => []);
        const clientJsFile = files.find(
          (file) => file.endsWith(".js") && file.startsWith("client")
        );

        if (clientJsFile) {
          // Replace dev script with production script
          template = template.replace(
            /<script\s+type="module"\s+src="\/src\/entry-client\.tsx"><\/script>/,
            `<script type="module" src="/assets/${clientJsFile}"></script>`
          );
        }
      } catch (e) {
        console.warn(
          "Could not find client bundle for template transformation:",
          e
        );
      }
    } else {
      throw new Error(
        `Could not find index.html template. Tried: ${distTemplatePath} and ${rootTemplatePath}`
      );
    }

    // Render the app
    const url = req.url || "/";
    const { html: appHtml, dehydratedState, styleTags } = await render(url);

    // Extract and inline CSS to prevent font flicker
    let cssInjection = "";
    try {
      // In production on Vercel, extract CSS file from dist/assets
      const distAssetsDir = resolveDistPath("assets");
      const files = await fsPromises.readdir(distAssetsDir).catch(() => []);
      const cssFile = files.find((file) => file.endsWith(".css"));
      if (cssFile) {
        const cssPath = path.join(distAssetsDir, cssFile);
        const cssContent = await fsPromises.readFile(cssPath, "utf-8");
        cssInjection = `<style id="critical-css">${cssContent}</style>`;
      }
    } catch (e) {
      // If CSS extraction fails, continue without it
      console.warn("Could not inline CSS:", e);
    }

    // Inject rendered HTML, styles, and dehydrated state
    // Inject CSS first (before styled-components), then other styles
    const finalHtml = template
      .replace("</head>", `${cssInjection}${styleTags || ""}</head>`)
      .replace(`<div id="root"></div>`, `<div id="root">${appHtml}</div>`)
      .replace(
        "</body>",
        `<script>window.__REACT_QUERY_STATE__ = ${JSON.stringify(
          dehydratedState
        )};</script></body>`
      );

    res.setHeader("Content-Type", "text/html");
    res.status(200).send(finalHtml);
  } catch (error) {
    console.error("SSR Error:", error);
    // Log additional context for debugging
    if (error instanceof Error) {
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
        cwd: process.cwd(),
        distExists: fs.existsSync(resolveDistPath(".")),
      });
    }
    res.status(500).send("Internal Server Error");
  }
}
