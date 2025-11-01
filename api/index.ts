import type { VercelRequest, VercelResponse } from "@vercel/node";
import fs from "node:fs";
import path from "node:path";
import { promises as fsPromises } from "node:fs";
import { pathToFileURL } from "node:url";

type RenderResult = {
  html: string;
  dehydratedState: unknown;
  styleTags?: string;
};

type RenderFn = (url: string) => Promise<RenderResult>;

// Resolve paths relative to project root (works on Vercel)
// On Vercel, process.cwd() points to /var/task (project root)
function resolveDistPath(relativePath: string): string {
  const projectRoot = process.cwd();
  return path.join(projectRoot, "dist", relativePath);
}

// Helper functions
async function loadRenderFunction(): Promise<RenderFn> {
  // Use pathToFileURL for ESM import compatibility on Vercel
  const serverPath = path.resolve(resolveDistPath("entry-server.js"));
  const serverUrl = pathToFileURL(serverPath).href;
  const { render } = await import(serverUrl);
  return render;
}

async function readTemplate(): Promise<string> {
  const distTemplatePath = resolveDistPath("index.html");
  const rootTemplatePath = path.join(process.cwd(), "index.html");

  if (fs.existsSync(distTemplatePath)) {
    return fs.readFileSync(distTemplatePath, "utf-8");
  }

  if (fs.existsSync(rootTemplatePath)) {
    return fs.readFileSync(rootTemplatePath, "utf-8");
  }

  throw new Error(
    `Could not find index.html template. Tried: ${distTemplatePath} and ${rootTemplatePath}`
  );
}

async function injectClientScript(template: string): Promise<string> {
  try {
    const distAssetsDir = resolveDistPath("assets");
    const files = await fsPromises.readdir(distAssetsDir).catch(() => []);
    const clientJsFile = files.find(
      (file) => file.endsWith(".js") && file.startsWith("client")
    );

    if (!clientJsFile) {
      return template;
    }

    const clientScriptTag = `<script type="module" src="/assets/${clientJsFile}"></script>`;
    
    // Replace dev script with production script
    return template.replace(
      /<script\s+type="module"\s+src="\/src\/entry-client\.tsx"><\/script>/,
      clientScriptTag
    );
  } catch (e) {
    console.warn("Could not find client bundle for template transformation:", e);
    return template;
  }
}

async function extractCSS(): Promise<string> {
  try {
    const distAssetsDir = resolveDistPath("assets");
    const files = await fsPromises.readdir(distAssetsDir).catch(() => []);
    const cssFile = files.find((file) => file.endsWith(".css"));
    
    if (!cssFile) {
      return "";
    }

    const cssPath = path.join(distAssetsDir, cssFile);
    const cssContent = await fsPromises.readFile(cssPath, "utf-8");
    return `<style id="critical-css">${cssContent}</style>`;
  } catch (e) {
    console.warn("Could not inline CSS:", e);
    return "";
  }
}

function buildFinalHtml(
  template: string,
  appHtml: string,
  dehydratedState: unknown,
  styleTags: string,
  cssInjection: string
): string {
  return template
    .replace("</head>", `${cssInjection}${styleTags || ""}</head>`)
    .replace(`<div id="root"></div>`, `<div id="root">${appHtml}</div>`)
    .replace(
      "</body>",
      `<script>window.__REACT_QUERY_STATE__ = ${JSON.stringify(
        dehydratedState
      )};</script></body>`
    );
}

function handleError(error: unknown, res: VercelResponse): void {
  console.error("SSR Error:", error);
  
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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Load the built server render function
    const render = await loadRenderFunction();

    // Read HTML template (try dist first, then root as fallback)
    let template = await readTemplate();

    // If template was from root, inject client script (dist template should already have it)
    const distTemplatePath = resolveDistPath("index.html");
    if (!fs.existsSync(distTemplatePath)) {
      template = await injectClientScript(template);
    }

    // Render the app
    const url = req.url || "/";
    const result = await render(url);

    // Extract and inline CSS to prevent font flicker
    const cssInjection = await extractCSS();

    // Build final HTML with app-rendered content, styles, and dehydrated state
    const finalHtml = buildFinalHtml(
      template,
      result.html,
      result.dehydratedState,
      result.styleTags || "",
      cssInjection
    );

    // Send response
    res.setHeader("Content-Type", "text/html");
    res.status(200).send(finalHtml);
  } catch (error) {
    handleError(error, res);
  }
}
