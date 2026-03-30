import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { useProfile } from "../context/ProfileContext";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { ImageIcon, RefreshCw } from "lucide-react";
import appLogo from "../../../assets/logo.png";

export function Scanner() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { profile } = useProfile();

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isMounted = useRef(true);

  const [isScanning, setIsScanning] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<"environment" | "user">(
    "environment",
  );

  useEffect(() => {
    isMounted.current = true;
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: facingMode },
        });
        if (isMounted.current) {
          streamRef.current = stream;
          if (videoRef.current) videoRef.current.srcObject = stream;
        } else {
          stream.getTracks().forEach((track) => track.stop());
        }
      } catch (err) {
        toast.error(
          t("scanner_camera_error", "Kunne ikke få adgang til kameraet"),
          { id: "camera-error" },
        );
      }
    }

    startCamera();

    return () => {
      isMounted.current = false;
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, [t, facingMode]);

  const toggleCamera = () => {
    setFacingMode((prev) => (prev === "environment" ? "user" : "environment"));
  };

  const processImageAndNavigate = async (base64Image: string) => {
    try {
      const combinedList = [...profile.allergies, ...profile.nolist];
      const userAllergies =
        combinedList.length > 0 ? combinedList.join(", ") : "none";
      const currentLang = i18n.language?.startsWith("da")
        ? "Danish"
        : "English";

      const promptText = `
        You are a product analyzer. User language: ${currentLang}.
        User food allergies: [${userAllergies}].

        TASK:
        1. Identify the product. Is it "FOOD" or "OTHER" (cosmetics, medicine, etc.)?
        2. Extract all ingredients/contents found on the label.
        3. If FOOD: Compare with user allergies and set "isSafe".
        4. If OTHER: List contents and set "isSafe" to true (since food allergies don't apply).
        5. Safety check: If the image is too blurry to read, set "isSafe" to false and explain why in "message".

        RESPOND ONLY IN JSON:
        {
          "productType": "FOOD" | "OTHER",
          "isSafe": boolean,
          "foundAllergens": ["items found"],
          "extractedIngredients": ["all ingredients"],
          "message": "Summary in ${currentLang}"
        }
      `;

      const response = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ base64Image, promptText }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Server error");

      const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (resultText) {
        const aiResult = JSON.parse(resultText);

        if (
          aiResult.extractedIngredients.length === 0 &&
          aiResult.productType === "FOOD"
        ) {
          toast.error(
            aiResult.message ||
              t("scanner_retry_msg", "Kunne ikke læse teksten. Prøv igen."),
          );
          setIsScanning(false);
          setCapturedImage(null);
          return;
        }

        navigate("/result", { state: { aiResult } });
      }
    } catch (error: any) {
      toast.error(t("error", { message: error.message }));
      setIsScanning(false);
      setCapturedImage(null);
    }
  };

  const resizeAndProcess = (img: HTMLImageElement | HTMLVideoElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const MAX_DIM = 1024;
    let w = img instanceof HTMLVideoElement ? img.videoWidth : img.width;
    let h = img instanceof HTMLVideoElement ? img.videoHeight : img.height;

    if (w > h) {
      if (w > MAX_DIM) {
        h = (h * MAX_DIM) / w;
        w = MAX_DIM;
      }
    } else {
      if (h > MAX_DIM) {
        w = (w * MAX_DIM) / h;
        h = MAX_DIM;
      }
    }

    canvas.width = w;
    canvas.height = h;
    ctx.drawImage(img, 0, 0, w, h);

    const base64Data = canvas.toDataURL("image/jpeg", 0.6).split(",")[1];
    setCapturedImage(canvas.toDataURL("image/jpeg", 0.6));
    processImageAndNavigate(base64Data);
  };

  const handleScan = () => {
    if (!videoRef.current || isScanning) return;
    setIsScanning(true);
    resizeAndProcess(videoRef.current);
  };

  return (
    <div className="relative w-full h-full bg-black overflow-hidden flex flex-col">
      <canvas ref={canvasRef} className="hidden" />

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            setIsScanning(true);
            const reader = new FileReader();
            reader.onload = (ev) => {
              const img = new Image();
              img.onload = () => resizeAndProcess(img);
              img.src = ev.target?.result as string;
            };
            reader.readAsDataURL(file);
          }
        }}
        className="hidden"
      />

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="relative flex-1 flex flex-col z-10">
        <div
          style={{ paddingTop: "calc(env(safe-area-inset-top) + 24px)" }}
          className="flex justify-center px-6"
        >
          {!capturedImage && (
            <div className="bg-black/60 backdrop-blur-md text-white px-5 py-3 rounded-full text-sm font-medium border border-white/10 shadow-lg">
              {t("scanner_instruction", "Scan")}{" "}
              <span className="font-bold text-[#F4642B]">
                {t("scanner_target", "ingredienser")}
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 flex items-center justify-center px-10">
          {!capturedImage && (
            <div className="w-full aspect-[3/4] border border-white/20 rounded-3xl relative max-w-sm">
              <div className="absolute -top-1 -left-1 w-12 h-12 border-t-4 border-l-4 border-[#F4642B] rounded-tl-2xl" />
              <div className="absolute -top-1 -right-1 w-12 h-12 border-t-4 border-r-4 border-[#F4642B] rounded-tr-2xl" />
              <div className="absolute -bottom-1 -left-1 w-12 h-12 border-b-4 border-l-4 border-[#F4642B] rounded-bl-2xl" />
              <div className="absolute -bottom-1 -right-1 w-12 h-12 border-b-4 border-r-4 border-[#F4642B] rounded-br-2xl" />
            </div>
          )}
        </div>

        <div className="pb-10 px-10 flex justify-center gap-10 items-center">
          {!capturedImage && (
            <>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center active:scale-95 transition-all"
              >
                <ImageIcon className="w-6 h-6 text-white" />
              </button>

              <button
                onClick={handleScan}
                className="w-20 h-20 rounded-full bg-white shadow-xl ring-4 ring-white/20 active:scale-90 transition-all"
              />

              <button
                onClick={toggleCamera}
                className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center active:scale-95 transition-all"
              >
                <RefreshCw className="w-6 h-6 text-white" />
              </button>
            </>
          )}
        </div>
      </div>

      {capturedImage && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center z-20">
          <div className="text-center px-8 space-y-4 flex flex-col items-center">
            <img
              src={appLogo}
              alt="Loading"
              className="h-24 w-auto object-contain animate-pulse mb-4"
            />
            <p className="text-white/60 font-medium text-sm">
              {t("scanner_analyzing", "Analyserer ingredienser...")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
