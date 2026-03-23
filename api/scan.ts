export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Kun POST anmodninger er tilladt" });
  }

  try {
    const { base64Image, promptText } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res
        .status(500)
        .json({ error: "API-nøgle mangler i serverens miljøvariabler" });
    }

    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const googleResponse = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: promptText },
              { inline_data: { mime_type: "image/jpeg", data: base64Image } },
            ],
          },
        ],
      }),
    });

    const data = await googleResponse.json();

    if (!googleResponse.ok) {
      return res
        .status(googleResponse.status)
        .json({ error: data.error?.message || "Fejl fra Google API" });
    }

    return res.status(200).json(data);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Ukendt serverfejl";
    return res.status(500).json({ error: errorMessage });
  }
}
