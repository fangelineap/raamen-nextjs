'use server'

// pages/api/login.ts
import type { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   console.log("Request received:", req.method, req.url);
//   console.log("Login here.");

//   if (req.method === "POST") {
//     try {
//       // Make a POST request to an external login API (http://localhost:3001/api/login)
//       const response = await fetch("http://localhost:3001/api/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify({
//           email: "userthree@gmail.com",
//           password: "userthree",
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`External login API returned an error: ${response.status}`);
//       }

//       // Parse the JSON response from the external API
//       const data = await response.json();

//       console.log("Login response data:", data);

//       // Assuming successful login, send a success message back to the client
//       return res.status(200).json({ message: "Login successful", data });
//     } catch (error) {
//       console.error("Error during login:", error);
//       return res.status(500).json({ message: "Internal Server Error", error: error });
//     }
//   } else {
//     // Handle unsupported HTTP methods
//     res.setHeader("Allow", ["POST"]);
//     return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
//   }
// }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("Request received:", req.method, req.url);
  console.log("Login here.");

  if (req.method === "GET") {
    try {
      // Make a POST request to an external login API (http://localhost:3001/api/login)
      const response = await fetch("http://localhost:3001/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`External login API returned an error: ${response.status}`);
      }
      return res.status(200).json({ message: "Login successful" });
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ message: "Internal Server Error", error: error });
    }
  } else {
    // Handle unsupported HTTP methods
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
