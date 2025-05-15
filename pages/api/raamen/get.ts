// pages/api/raamen/get.ts or get.js
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("Request received:", req.method, req.url, req.headers.authorization);
  console.log("Fetching here.");

  if (req.method === "GET") {
    try {
      const response = await fetch("http://localhost:3001/api/ramen/all", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();
      console.log("data", data);

      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
}
