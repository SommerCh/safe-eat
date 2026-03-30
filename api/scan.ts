// export default async function handler(req: any, res: any) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Kun POST" });
//   }

//   try {
//     const { base64Image, promptText } = req.body;
//     const apiKey = process.env.GEMINI_API_KEY;

//     if (!apiKey) {
//       return res.status(500).json({ error: "API-nøgle mangler i Vercel" });
//     }

//     const listUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
//     const listResponse = await fetch(listUrl);
//     const listData = await listResponse.json();

//     if (!listResponse.ok) {
//       return res.status(500).json({
//         error:
//           "Kunne ikke hente modeller: " +
//           (listData.error?.message || "Ukendt fejl"),
//       });
//     }

//     const availableModels = listData.models || [];

//     const validModels = availableModels.filter(
//       (m: any) =>
//         m.supportedGenerationMethods?.includes("generateContent") &&
//         m.name.includes("gemini"),
//     );

//     if (validModels.length === 0) {
//       return res.status(500).json({
//         error: "Din API-nøgle har ikke adgang til nogen billed-modeller.",
//       });
//     }

//     const chosenModel =
//       validModels.find((m: any) => m.name.includes("1.5-flash"))?.name ||
//       validModels.find((m: any) => m.name.includes("1.5-pro"))?.name ||
//       validModels[0].name;

//     const generateUrl = `https://generativelanguage.googleapis.com/v1beta/${chosenModel}:generateContent?key=${apiKey}`;

//     const googleResponse = await fetch(generateUrl, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         contents: [
//           {
//             parts: [
//               { text: promptText },
//               { inline_data: { mime_type: "image/jpeg", data: base64Image } },
//             ],
//           },
//         ],
//       }),
//     });

//     const data = await googleResponse.json();

//     if (!googleResponse.ok) {
//       return res
//         .status(googleResponse.status)
//         .json({ error: `Fejl fra ${chosenModel}: ${data.error?.message}` });
//     }

//     return res.status(200).json(data);
//   } catch (error) {
//     const errorMessage =
//       error instanceof Error ? error.message : "Kritisk serverfejl";
//     return res.status(500).json({ error: errorMessage });
//   }
// }


export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Kun POST er tilladt" });
  }

  try {
    const { base64Image, promptText } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "API-nøgle mangler i Vercel" });
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
        error: `AI Fejl: ${data.error?.message || "Ukendt fejl"}` 
      });
    }

    return res.status(200).json(data);

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Kritisk serverfejl";
    return res.status(500).json({ error: errorMessage });
  }
}