import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { useProfile } from "../context/ProfileContext";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export function Scanner() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { profile } = useProfile();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        toast.error(t("scanner_camera_error"));
      }
    }
    startCamera();
    return () => {
      const currentStream = videoRef.current?.srcObject as MediaStream;
      currentStream?.getTracks().forEach((track) => track.stop());
    };
  }, [t]);

  const handleScan = async () => {
    if (!videoRef.current || !canvasRef.current || isScanning) return;
    setIsScanning(true);

    try {
      const canvas = canvasRef.current;
      const video = videoRef.current;

      // Nedskalering
      const MAX_DIMENSION = 1024;
      let width = video.videoWidth;
      let height = video.videoHeight;

      if (width > height) {
        if (width > MAX_DIMENSION) {
          height = Math.round((height * MAX_DIMENSION) / width);
          width = MAX_DIMENSION;
        }
      } else {
        if (height > MAX_DIMENSION) {
          width = Math.round((width * MAX_DIMENSION) / height);
          height = MAX_DIMENSION;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error(t("scanner_image_error"));

      ctx.drawImage(video, 0, 0, width, height);
      const base64Image = canvas.toDataURL("image/jpeg", 0.5).split(",")[1];

      setCapturedImage(canvas.toDataURL("image/jpeg"));

      const combinedList = [...profile.allergies, ...profile.nolist];
      const userAllergies =
        combinedList.length > 0
          ? combinedList.join(", ")
          : t("scanner_no_allergies");

      const promptText = `
        You are a precise assistant for people with food allergies. The user's current language is '${i18n.language}'.

        Data:
        1. User's "no-list" (allergies and things to avoid): [${userAllergies}].

        Your tasks:
        1. Read the text in the image. Extract ONLY actual food ingredients (e.g., "mango", "sugar", "milk").
        2. Completely ignore brands (like 'coop'), weights ('100g'), headers ('ingredients'), and filler words ('SNACK', 'Storage'). Merge words if it makes sense (e.g., "Dried mango" instead of two words).
        3. Compare the ingredients you find with the user's "no-list" (case-insensitive).

        ONLY RESPOND WITH A JSON OBJECT in the following format:
        {
          "isSafe": boolean,
          "foundAllergens": ["list of words from the no-list that were found"],
          "extractedIngredients": ["Only the actual ingredients you extracted, cleaned of noise"],
          "message": "A short conclusion in the user's language ('${i18n.language}')."
        }
      `;

      const response = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ base64Image, promptText, lang: i18n.language }),
      });

      const data = await response.json();

      if (!response.ok)
        throw new Error(data.error || t("scanner_server_error"));

      const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (resultText) {
        const cleanJson = resultText
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();
        navigate("/result", { state: { aiResult: JSON.parse(cleanJson) } });
      }
    } catch (error: any) {
      toast.error(t("error", { message: error.message }));
      setIsScanning(false);
      setCapturedImage(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-black overflow-hidden flex flex-col items-center justify-center">
      <canvas ref={canvasRef} className="hidden" />

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${capturedImage ? "opacity-0" : "opacity-100"}`}
      />

      {!capturedImage && <div />}

      {!capturedImage && (
        <div className="absolute bottom-28 z-10">
          <button
            onClick={handleScan}
            disabled={isScanning}
            className="w-[72px] h-[72px] rounded-full bg-white shadow-lg ring-4 ring-white/30 active:scale-95 transition-all disabled:opacity-50"
          />
        </div>
      )}

      {capturedImage && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center animate-in fade-in duration-300 z-20">
          <img
            src={capturedImage}
            alt="Captured"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <div className="relative text-center px-8 space-y-4 flex flex-col items-center">
            <img
              src="/logoet.svg"
              alt="Logo"
              className="w-32 h-32 object-contain animate-pulse mb-2"
            />
            <h2 className="text-3xl font-black text-white tracking-tight">
              {t("scanner_image_captured")}
            </h2>
            <p className="text-white/70 text-base leading-relaxed">
              {t("scanner_analyzing")}
              <br />
              <span className="font-bold text-white">{t("scanner_done")}</span>
            </p>
            <div className="pt-6">
              <div className="animate-spin border-4 border-slate-500 border-t-transparent rounded-full w-10 h-10 mx-auto" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
