import type { VercelRequest, VercelResponse } from "@vercel/node";
import { fetchExchangeRates } from "../../services/cnb-api.js";

function handleError(error: unknown, res: VercelResponse): void {
  console.error("SSR Error:", error);

  if (error instanceof Error) {
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
      cwd: process.cwd()
    });
  }

  res.status(500).send("Internal Server Error");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Set CORS headers to allow browser requests
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Handle preflight OPTIONS request
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }

    const data = await fetchExchangeRates();
    
    // Send JSON response with proper content type
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(data);
  } catch (error) {
    handleError(error, res);
  }
}
