export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Kun POST anmodninger er tilladt" });
  }

  try {
    const { base64Image, promptText } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "API-nøgle mangler i Vercel" });
    }

    // Vi prøver med v1beta, da nogle kontotyper kun har adgang til flash-modellen der
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

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

    // HVIS DET FEJLER IGEN, BEDER VI GOOGLE OM LISTEN OVER DINE TILLADTE MODELLER
    if (!googleResponse.ok) {
      const listUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
      const listResponse = await fetch(listUrl);
      const listData = await listResponse.json();

      let allowedModels = "Kunne ikke hente liste";
      if (listData.models) {
        // Vi filtrerer listen så du kun ser Gemini-modellerne
        allowedModels = listData.models
          .map((m: any) => m.name)
          .filter((name: string) => name.includes("gemini"))
          .join(", ");
      }

      return res.status(googleResponse.status).json({
        error: `Modelafvisning: ${data.error?.message}. \n\nDINE TILLADTE MODELLER ER: ${allowedModels}`,
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Ukendt serverfejl";
    return res.status(500).json({ error: errorMessage });
  }
}
