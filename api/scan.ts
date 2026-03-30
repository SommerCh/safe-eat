export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).json({ error: "Kun POST" });

  try {
    const { base64Image, promptText } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!base64Image || typeof base64Image !== 'string') {
      return res.status(400).json({ error: "Intet gyldigt billede modtaget" });
    }

    if (!apiKey) return res.status(500).json({ error: "API-nøgle mangler" });

    const chosenModel = "models/gemini-2.5-flash";
    const generateUrl = `https://generativelanguage.googleapis.com/v1beta/${chosenModel}:generateContent?key=${apiKey}`;

    const cleanBase64 = base64Image.includes(",") ? base64Image.split(",")[1] : base64Image;

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

  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}