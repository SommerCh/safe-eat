// import { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router";
// import { useProfile } from "../context/ProfileContext";
// import { toast } from "sonner";
// import { useTranslation } from "react-i18next";
// import { ImageIcon } from "lucide-react";

// export function Scanner() {
//   const navigate = useNavigate();
//   const { t, i18n } = useTranslation();
//   const { profile } = useProfile();
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [isScanning, setIsScanning] = useState(false);
//   const [capturedImage, setCapturedImage] = useState<string | null>(null);

//   useEffect(() => {
//     async function startCamera() {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: { facingMode: "environment" },
//         });
//         if (videoRef.current) videoRef.current.srcObject = stream;
//       } catch (err) {
//         toast.error(t("scanner_camera_error"));
//       }
//     }
//     startCamera();
//     return () => {
//       const currentStream = videoRef.current?.srcObject as MediaStream;
//       currentStream?.getTracks().forEach((track) => track.stop());
//     };
//   }, [t]);

//   const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file || !canvasRef.current || isScanning) return;
//     setIsScanning(true);

//     try {
//       const reader = new FileReader();
//       reader.onload = async (readerEvent) => {
//         const imageDataUrl = readerEvent.target?.result as string;
//         setCapturedImage(imageDataUrl);

//         const img = new Image();
//         img.onload = async () => {
//           const canvas = canvasRef.current;

//           if (!canvas) return;

//           const ctx = canvas.getContext("2d");
//           if (!ctx) throw new Error(t("scanner_image_error"));

//           const MAX_DIMENSION = 1024;
//           let width = img.width;
//           let height = img.height;

//           if (width > height) {
//             if (width > MAX_DIMENSION) {
//               height = Math.round((height * MAX_DIMENSION) / width);
//               width = MAX_DIMENSION;
//             }
//           } else {
//             if (height > MAX_DIMENSION) {
//               width = Math.round((width * MAX_DIMENSION) / height);
//               height = MAX_DIMENSION;
//             }
//           }

//           canvas.width = width;
//           canvas.height = height;
//           ctx.drawImage(img, 0, 0, width, height);

//           const base64Image = canvas.toDataURL("image/jpeg", 0.5).split(",")[1];

//           const combinedList = [...profile.allergies, ...profile.nolist];
//           const userAllergies =
//             combinedList.length > 0
//               ? combinedList.join(", ")
//               : t("scanner_no_allergies");

//           const promptText = `
//             You are a precise assistant for people with food allergies. The user's current language is '${i18n.language}'.

//             Data:
//             1. User's "no-list" (allergies and things to avoid): [${userAllergies}].

//             Your tasks:
//             1. Read the text in the image. Extract ONLY actual food ingredients (e.g., "mango", "sugar", "milk").
//             2. Completely ignore brands (like 'coop'), weights ('100g'), headers ('ingredients'), and filler words ('SNACK', 'Storage'). Merge words if it makes sense (e.g., "Dried mango" instead of two words).
//             3. Compare the ingredients you find with the user's "no-list" (case-insensitive).

//             ONLY RESPOND WITH A JSON OBJECT in the following format:
//             {
//               "isSafe": boolean,
//               "foundAllergens": ["list of words from the no-list that were found"],
//               "extractedIngredients": ["Only the actual ingredients you extracted, cleaned of noise"],
//               "message": "A short conclusion in the user's language ('${i18n.language}')."
//             }
//           `;

//           const response = await fetch("/api/scan", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               base64Image,
//               promptText,
//               lang: i18n.language,
//             }),
//           });

//           const data = await response.json();

//           if (!response.ok)
//             throw new Error(data.error || t("scanner_server_error"));

//           const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;
//           if (resultText) {
//             const cleanJson = resultText
//               .replace(/```json/g, "")
//               .replace(/```/g, "")
//               .trim();
//             navigate("/result", { state: { aiResult: JSON.parse(cleanJson) } });
//           }
//           if (fileInputRef.current) fileInputRef.current.value = "";
//         };
//         img.src = imageDataUrl;
//       };
//       reader.readAsDataURL(file);
//     } catch (error: any) {
//       toast.error(t("error", { message: error.message }));
//       setIsScanning(false);
//       setCapturedImage(null);
//       if (fileInputRef.current) fileInputRef.current.value = "";
//     }
//   };

//   const handleScan = async () => {
//     if (!videoRef.current || !canvasRef.current || isScanning) return;
//     setIsScanning(true);

//     try {
//       const canvas = canvasRef.current;
//       const video = videoRef.current;

//       const MAX_DIMENSION = 1024;
//       let width = video.videoWidth;
//       let height = video.videoHeight;

//       if (width > height) {
//         if (width > MAX_DIMENSION) {
//           height = Math.round((height * MAX_DIMENSION) / width);
//           width = MAX_DIMENSION;
//         }
//       } else {
//         if (height > MAX_DIMENSION) {
//           width = Math.round((width * MAX_DIMENSION) / height);
//           height = MAX_DIMENSION;
//         }
//       }

//       canvas.width = width;
//       canvas.height = height;
//       const ctx = canvas.getContext("2d");
//       if (!ctx) throw new Error(t("scanner_image_error"));

//       ctx.drawImage(video, 0, 0, width, height);
//       const base64Image = canvas.toDataURL("image/jpeg", 0.5).split(",")[1];

//       setCapturedImage(canvas.toDataURL("image/jpeg"));

//       const combinedList = [...profile.allergies, ...profile.nolist];
//       const userAllergies =
//         combinedList.length > 0
//           ? combinedList.join(", ")
//           : t("scanner_no_allergies");

//       const promptText = `
//         You are a precise assistant for people with food allergies. The user's current language is '${i18n.language}'.

//         Data:
//         1. User's "no-list" (allergies and things to avoid): [${userAllergies}].

//         Your tasks:
//         1. Read the text in the image. Extract ONLY actual food ingredients (e.g., "mango", "sugar", "milk").
//         2. Completely ignore brands (like 'coop'), weights ('100g'), headers ('ingredients'), and filler words ('SNACK', 'Storage'). Merge words if it makes sense (e.g., "Dried mango" instead of two words).
//         3. Compare the ingredients you find with the user's "no-list" (case-insensitive).

//         ONLY RESPOND WITH A JSON OBJECT in the following format:
//         {
//           "isSafe": boolean,
//           "foundAllergens": ["list of words from the no-list that were found"],
//           "extractedIngredients": ["Only the actual ingredients you extracted, cleaned of noise"],
//           "message": "A short conclusion in the user's language ('${i18n.language}')."
//         }
//       `;

//       const response = await fetch("/api/scan", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ base64Image, promptText, lang: i18n.language }),
//       });

//       const data = await response.json();

//       if (!response.ok)
//         throw new Error(data.error || t("scanner_server_error"));

//       const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;
//       if (resultText) {
//         const cleanJson = resultText
//           .replace(/```json/g, "")
//           .replace(/```/g, "")
//           .trim();
//         navigate("/result", { state: { aiResult: JSON.parse(cleanJson) } });
//       }
//     } catch (error: any) {
//       toast.error(t("error", { message: error.message }));
//       setIsScanning(false);
//       setCapturedImage(null);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black overflow-hidden flex flex-col items-center justify-center">
//       <canvas ref={canvasRef} className="hidden" />

//       <input
//         type="file"
//         accept="image/*"
//         ref={fileInputRef}
//         onChange={handleUpload}
//         className="hidden"
//       />

//       <video
//         ref={videoRef}
//         autoPlay
//         playsInline
//         muted
//         className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
//           capturedImage ? "opacity-0" : "opacity-100"
//         }`}
//       />

//       {!capturedImage && (
//         <>
//           <div className="absolute top- left-0 right-0 z-10 flex justify-center px-4 pointer-events-none">
//             <div className="bg-black/60 backdrop-blur-md text-white px-5 py-3 rounded-full text-sm font-medium border border-white/10 shadow-lg text-center tracking-wide">
//               Tag et billede af{" "}
//               <span className="font-bold text-[#F4642B]">ingredienslisten</span>
//             </div>
//           </div>

//           <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none px-8 pb-16">
//             <div className="w-full max-w-sm h-[60vh] border border-white/20 rounded-2xl relative">
//               <div className="absolute -top-1 -left-1 w-10 h-10 border-t-4 border-l-4 border-[#F4642B] rounded-tl-xl" />
//               <div className="absolute -top-1 -right-1 w-10 h-10 border-t-4 border-r-4 border-[#F4642B] rounded-tr-xl" />
//               <div className="absolute -bottom-1 -left-1 w-10 h-10 border-b-4 border-l-4 border-[#F4642B] rounded-bl-xl" />
//               <div className="absolute -bottom-1 -right-1 w-10 h-10 border-b-4 border-r-4 border-[#F4642B] rounded-br-xl" />
//             </div>
//           </div>
//         </>
//       )}

//       {!capturedImage && (
//         <div className="absolute bottom-24 z-10 left-0 right-0 grid grid-cols-3 items-center px-8">
//           <div className="flex justify-start">
//             <button
//               onClick={() => fileInputRef.current?.click()}
//               disabled={isScanning}
//               className="w-[60px] h-[60px] rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-lg active:scale-95 transition-all disabled:opacity-50"
//             >
//               <ImageIcon className="w-6 h-6 text-white" />
//             </button>
//           </div>

//           <div className="flex justify-center">
//             <button
//               onClick={handleScan}
//               disabled={isScanning}
//               className="w-[72px] h-[72px] rounded-full bg-white shadow-lg ring-4 ring-white/30 active:scale-95 transition-all disabled:opacity-50"
//             />
//           </div>

//           <div></div>
//         </div>
//       )}

//       {capturedImage && (
//         <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center animate-in fade-in duration-300 z-20">
//           <img
//             src={capturedImage}
//             alt="Captured"
//             className="absolute inset-0 w-full h-full object-cover opacity-30"
//           />
//           <div className="relative text-center px-8 space-y-4 flex flex-col items-center">
//             <img
//               src="/logoet.svg"
//               alt="Logo"
//               className="w-32 h-32 object-contain animate-pulse mb-2"
//             />
//             <h2 className="text-3xl font-black text-white tracking-tight">
//               {t("scanner_image_captured")}
//             </h2>
//             <p className="text-white/70 text-base leading-relaxed">
//               {t("scanner_analyzing")}
//               <br />
//               <span className="font-bold text-white">{t("scanner_done")}</span>
//             </p>
//             <div className="pt-6">
//               <div className="animate-spin border-4 border-slate-500 border-t-transparent rounded-full w-10 h-10 mx-auto" />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { useProfile } from "../context/ProfileContext";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { ImageIcon } from "lucide-react";

export function Scanner() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { profile } = useProfile();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  const processImageAndNavigate = async (base64Image: string) => {
    try {
      const combinedList = [...profile.allergies, ...profile.nolist];
      const userAllergies = combinedList.length > 0 ? combinedList.join(", ") : t("scanner_no_allergies");

      const promptText = `
        You are a precise assistant for food allergies. User language: ${i18n.language}.
        User avoids: [${userAllergies}].
        Task: Extract ingredients and compare with avoid-list.
        RESPOND ONLY WITH JSON:
        {
          "isSafe": boolean,
          "foundAllergens": ["items from user list found"],
          "extractedIngredients": ["all ingredients found"],
          "message": "summary in ${i18n.language}"
        }
      `;

      const response = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ base64Image, promptText, lang: i18n.language }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || t("scanner_server_error"));

      const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (resultText) {
        const cleanJson = resultText.replace(/```json/g, "").replace(/```/g, "").trim();
        navigate("/result", { state: { aiResult: JSON.parse(cleanJson) } });
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

    const MAX_DIMENSION = 1024;
    let width = img instanceof HTMLVideoElement ? img.videoWidth : img.width;
    let height = img instanceof HTMLVideoElement ? img.videoHeight : img.height;

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
    ctx.drawImage(img, 0, 0, width, height);

    const base64Image = canvas.toDataURL("image/jpeg", 0.5).split(",")[1];
    setCapturedImage(canvas.toDataURL("image/jpeg"));
    processImageAndNavigate(base64Image);
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || isScanning) return;
    setIsScanning(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => resizeAndProcess(img);
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleScan = () => {
    if (!videoRef.current || isScanning) return;
    setIsScanning(true);
    resizeAndProcess(videoRef.current);
  };

  return (
    <div className="relative w-full h-full bg-black overflow-hidden flex flex-col">
      <canvas ref={canvasRef} className="hidden" />
      <input type="file" accept="image/*" ref={fileInputRef} onChange={handleUpload} className="hidden" />

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="relative flex-1 flex flex-col z-10">
        <div 
          style={{ paddingTop: 'calc(env(safe-area-inset-top) + 24px)' }}
          className="flex justify-center px-6"
        >
          {!capturedImage && (
            <div className="bg-black/60 backdrop-blur-md text-white px-5 py-3 rounded-full text-sm font-medium border border-white/10 shadow-lg text-center">
              {t("scanner_instruction", "Tag et billede af")} <span className="font-bold text-[#F4642B]">{t("scanner_target", "ingredienslisten")}</span>
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

        <div className="pb-8 px-10 grid grid-cols-3 items-center">
          {!capturedImage && (
            <>
              <div className="flex justify-start">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isScanning}
                  className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center active:scale-95 transition-all disabled:opacity-50"
                >
                  <ImageIcon className="w-6 h-6 text-white" />
                </button>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleScan}
                  disabled={isScanning}
                  className="w-20 h-20 rounded-full bg-white shadow-xl ring-4 ring-white/20 active:scale-90 transition-all disabled:opacity-50"
                />
              </div>
              <div />
            </>
          )}
        </div>
      </div>

      {capturedImage && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center z-20">
          <div className="text-center px-8 space-y-4 flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-white/10 border-t-[#F4642B] rounded-full animate-spin mb-4" />
            <h2 className="text-2xl font-bold text-white">
              {t("scanner_image_captured")}
            </h2>
            <p className="text-white/60">
              {t("scanner_analyzing")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}