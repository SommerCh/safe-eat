import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { useProfile } from "../context/ProfileContext";
import { Button } from "../components/ui/button";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";

export function Scanner() {
  const navigate = useNavigate();
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
        toast.error("Kunne ikke få adgang til kameraet");
      }
    }
    startCamera();
    return () => {
      const currentStream = videoRef.current?.srcObject as MediaStream;
      currentStream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const handleScan = async () => {
    if (!videoRef.current || !canvasRef.current || isScanning) return;
    setIsScanning(true);

    try {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Kunne ikke oprette billede");

      ctx.drawImage(video, 0, 0);
      const base64Image = canvas.toDataURL("image/jpeg", 0.5).split(",")[1];

      setCapturedImage(canvas.toDataURL("image/jpeg"));

      const combinedList = [...profile.allergies, ...profile.nolist];
      const userAllergies =
        combinedList.length > 0 ? combinedList.join(", ") : "Ingen angivet";

      const promptText = `
        Du er en præcis assistent for madallergikere.

        Data:
        1. Brugerens nej-liste: [${userAllergies}].

        Dine opgaver:
        1. Læs teksten på billedet. Udtræk KUN faktiske mad-ingredienser (f.eks. "mango", "sukker", "mælk").
        2. Ignorer fuldstændigt mærker (som 'coop'), vægt ('100g'), overskrifter ('ingredienser') og fyldord ('SNACK', 'Opbevaring'). Flet gerne ord sammen, hvis det giver mening (f.eks. "Tørret mango" i stedet for to ord).
        3. Sammenlign dine fundne ingredienser med brugerens nej-liste (ignorer store/små bogstaver).

        SVAR KUN MED ET JSON-OBJEKT:
        {
          "isSafe": boolean, // false hvis et ord fra nej-listen findes i ingredienserne
          "foundAllergens": ["liste over ord fra nej-listen der blev fundet"], // Tom hvis ingen match
          "extractedIngredients": ["Kun de faktiske ingredienser du udtrak, vasket for støj"], 
          "message": "En kort dansk konklusion." 
        }
      `;

      const response = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ base64Image, promptText }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Serverfejl");

      const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (resultText) {
        const cleanJson = resultText
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();
        navigate("/result", { state: { aiResult: JSON.parse(cleanJson) } });
      }
    } catch (error: any) {
      toast.error("Fejl: " + error.message);
      setIsScanning(false);
      setCapturedImage(null);
    }
  };

  return (
    <div className="min-h-screen bg-black relative flex flex-col items-center justify-center">
      <canvas ref={canvasRef} className="hidden" />

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${capturedImage ? "opacity-0" : "opacity-100"}`}
      />

      {!capturedImage && (
        <div  />
      )}

      {!capturedImage && (
        <div className="absolute bottom-28">
          <Button
            onClick={handleScan}
            disabled={isScanning}
            className="w-20 h-20 bg-white rounded-full border-4 border-blue active:scale-95 transition-all"
          >
          </Button>
        </div>
      )}

      {capturedImage && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center animate-in fade-in duration-300">
          <img
            src={capturedImage}
            alt="Captured"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <div className="relative text-center px-8 space-y-4">
            <div className="mx-auto w-20 h-20 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
              <Sparkles className="w-10 h-10 text-slate-400 animate-pulse" />
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight">
              Billede taget!
            </h2>
            <p className="text-white/70 text-base leading-relaxed">
              Analyserer ingredienser...
              <br />
              <span className="font-bold text-white">Færdig med varen.</span>
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
