// export default async function handler(req: any, res: any) {
//   if (req.method !== "POST") {
//     return res.status(405).json({
//       code: "method_not_allowed",
//       error: "Only POST requests are allowed",
//     });
//   }

//   try {
//     const { base64Image, promptText } = req.body;
//     const apiKey = process.env.GEMINI_API_KEY;

//     if (!base64Image || typeof base64Image !== "string") {
//       return res.status(400).json({
//         code: "invalid_image",
//         error: "Invalid or missing image provided",
//       });
//     }

//     if (!apiKey) {
//       return res
//         .status(500)
//         .json({ code: "api_key_missing", error: "Server is missing API key" });
//     }

//     const chosenModel = "models/gemini-2.5-flash";
//     const generateUrl = `https://generativelanguage.googleapis.com/v1beta/${chosenModel}:generateContent?key=${apiKey}`;

//     const cleanBase64 = base64Image.includes(",")
//       ? base64Image.split(",")[1]
//       : base64Image;

//     const googleResponse = await fetch(generateUrl, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         contents: [
//           {
//             parts: [
//               { text: promptText },
//               { inline_data: { mime_type: "image/jpeg", data: cleanBase64 } },
//             ],
//           },
//         ],
//         generationConfig: {
//           response_mime_type: "application/json",
//         },
//       }),
//     });

//     const data = await googleResponse.json();

//     if (!googleResponse.ok) {
//       return res.status(googleResponse.status).json({
//         code: "ai_error",
//         error: data.error?.message || "Unknown AI error",
//       });
//     }

//     return res.status(200).json(data);
//   } catch (error: any) {
//     return res.status(500).json({
//       code: "server_error",
//       error: error.message || "An internal server error occurred",
//     });
//   }
// }

// Vi deklalerer 'process' manuelt her, så TypeScript holder op med at brokke sig
declare const process: {
  env: {
    GEMINI_API_KEY: string;
  };
};

export default async function handler(req: any, res: any) {
  // 1. CORS-indstillinger (Dette fixer "Load failed" på iPhone)
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT",
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization",
  );

  // 2. Håndter iPhonens "tjek-spørgsmål" (OPTIONS)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      code: "method_not_allowed",
      error: "Only POST requests are allowed",
    });
  }

  try {
    const { base64Image, promptText } = req.body;

    // Nu ved TypeScript præcis hvad 'process.env.GEMINI_API_KEY' er
    const apiKey = process.env.GEMINI_API_KEY;

    if (!base64Image || typeof base64Image !== "string") {
      return res.status(400).json({
        code: "invalid_image",
        error: "Invalid or missing image provided",
      });
    }

    if (!apiKey) {
      return res
        .status(500)
        .json({ code: "api_key_missing", error: "Server is missing API key" });
    }

    const chosenModel = "models/gemini-2.5-flash";
    const generateUrl = `https://generativelanguage.googleapis.com/v1beta/${chosenModel}:generateContent?key=${apiKey}`;

    const cleanBase64 = base64Image.includes(",")
      ? base64Image.split(",")[1]
      : base64Image;

    const googleResponse = await fetch(generateUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: promptText },
              { inline_data: { mime_type: "image/jpeg", data: cleanBase64 } },
            ],
          },
        ],
        generationConfig: {
          response_mime_type: "application/json",
        },
      }),
    });

    const data = await googleResponse.json();

    if (!googleResponse.ok) {
      return res.status(googleResponse.status).json({
        code: "ai_error",
        error: data.error?.message || "Unknown AI error",
      });
    }

    return res.status(200).json(data);
  } catch (error: any) {
    return res.status(500).json({
      code: "server_error",
      error: error.message || "An internal server error occurred",
    });
  }
}
