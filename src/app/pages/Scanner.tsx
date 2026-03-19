// import { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router";
// import { useProfile } from "../context/ProfileContext";
// import { Button } from "../components/ui/button";
// import { Camera, ShoppingCart, ScanLine, AlertCircle } from "lucide-react";
// import { toast } from "sonner";

// export function Scanner() {
//   const navigate = useNavigate();
//   const { setScannedIngredients } = useProfile();
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [isScanning, setIsScanning] = useState(false);
//   const [stream, setStream] = useState<MediaStream | null>(null);
//   const [cameraError, setCameraError] = useState(false);

//   const startCamera = async () => {
//     try {
//       if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
//         throw new Error("Kamera API ikke understøttet");
//       }
//       const mediaStream = await navigator.mediaDevices.getUserMedia({
//         video: { facingMode: "environment" },
//       });
//       if (videoRef.current) {
//         videoRef.current.srcObject = mediaStream;
//       }
//       setStream(mediaStream);
//       setCameraError(false);
//       return mediaStream;
//     } catch (error) {
//       setCameraError(true);
//       toast.info("Kamera utilgængeligt - bruger demo tilstand");
//       return null;
//     }
//   };

//   useEffect(() => {
//     let currentStream: MediaStream | null = null;

//     const initCamera = async () => {
//       currentStream = await startCamera();
//     };

//     initCamera();

//     return () => {
//       if (currentStream) {
//         currentStream.getTracks().forEach((track) => track.stop());
//       }
//     };
//   }, []);

//   const handleScan = () => {
//     setIsScanning(true);

//     // Simulate scanning delay
//     setTimeout(() => {
//       // Mock scanned ingredients
//       const mockIngredients = [
//         "Vand",
//         "Hvedemel (gluten)",
//         "Sukker",
//         "Palmefedt",
//         "Majsstivelse",
//         "Salt",
//         "Æg",
//         "Emulgator (E471)",
//         "Konserveringsmiddel (E202)",
//       ];

//       setScannedIngredients(mockIngredients);
//       setIsScanning(false);
//       navigate("/result");
//     }, 2000);
//   };

//   const handleOnlineShopping = () => {
//     toast.info("Online Shopping Filter kommer snart!");
//   };

//   return (
//     <div className="min-h-screen bg-black relative overflow-hidden">
//       {/* Camera View or Fallback */}
//       {!cameraError ? (
//         <video
//           ref={videoRef}
//           autoPlay
//           playsInline
//           muted
//           className="absolute inset-0 w-full h-full object-cover"
//         />
//       ) : (
//         <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
//           <div className="text-center px-6 space-y-4">
//             <AlertCircle className="w-16 h-16 text-blue-400 mx-auto" />
//             <p className="text-white text-lg">Demo tilstand</p>
//             <p className="text-gray-400 text-sm max-w-xs">
//               Kamera adgang er ikke tilgængelig. Du kan stadig teste scanning
//               med demo data.
//             </p>
//             <Button
//               onClick={startCamera}
//               variant="outline"
//               className="mt-4 bg-white/10 border-white/30 text-white hover:bg-white/20"
//             >
//               Prøv kamera igen
//             </Button>
//           </div>
//         </div>
//       )}

//       {/* Overlay Frame */}
//       <div className="absolute inset-0 flex items-center justify-center">
//         <div className="relative w-80 h-96">
//           {/* Corner borders */}
//           <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-blue-400 rounded-tl-2xl" />
//           <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-blue-400 rounded-tr-2xl" />
//           <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-blue-400 rounded-bl-2xl" />
//           <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-blue-400 rounded-br-2xl" />

//           {/* Scanning animation */}
//           {isScanning && (
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="w-full h-1 bg-blue-400 animate-pulse"></div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Top Instruction */}
//       <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/70 to-transparent">
//         <div className="flex items-center justify-center space-x-2 text-white">
//           <ScanLine className="w-6 h-6" />
//           <p className="text-lg font-medium">
//             {isScanning
//               ? "Scanner ingrediensliste..."
//               : "Placer ingredienslisten i rammen"}
//           </p>
//         </div>
//       </div>

//       {/* Bottom Controls */}
//       <div className="absolute bottom-15 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
//         <div className="flex items-center justify-center space-x-6">
//           {/* Online Shopping Filter Button */}
//           <Button
//             onClick={handleOnlineShopping}
//             variant="outline"
//             className="h-14 px-6 bg-white/10 border-2 border-white/30 text-white hover:bg-white/20 rounded-2xl backdrop-blur-md"
//           >
//             <ShoppingCart className="w-5 h-5 mr-2" />
//             Online Filter
//           </Button>

//           {/* Scan Button */}
//           <Button
//             onClick={handleScan}
//             disabled={isScanning}
//             className="w-20 h-20 bg-blue-500 hover:bg-blue-600 rounded-full shadow-2xl disabled:opacity-50"
//           >
//             {isScanning ? (
//               <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
//             ) : (
//               <Camera className="w-8 h-8" />
//             )}
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router";
// import { useProfile } from "../context/ProfileContext";
// import { Button } from "../components/ui/button";
// import { Camera, Sparkles } from "lucide-react";
// import { toast } from "sonner";

// const GEMINI_API_KEY = "AlzaSyBFWf-2zoiWNkvNYljY-Hql85Vh8oGZKQY";

// export function Scanner() {
//   const navigate = useNavigate();
//   const { profile } = useProfile();
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [isScanning, setIsScanning] = useState(false);

//   useEffect(() => {
//     async function startCamera() {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: { facingMode: "environment" },
//         });
//         if (videoRef.current) videoRef.current.srcObject = stream;
//       } catch (err) {
//         console.error("Kamerafejl:", err);
//         toast.error("Kunne ikke starte kameraet");
//       }
//     }
//     startCamera();

//     return () => {
//       const currentStream = videoRef.current?.srcObject as MediaStream;
//       currentStream?.getTracks().forEach((track) => track.stop());
//     };
//   }, []);

//   const handleScan = async () => {
//     if (!videoRef.current || !canvasRef.current) return;
//     setIsScanning(true);

//     try {
//       const canvas = canvasRef.current;
//       const video = videoRef.current;
//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;
//       canvas.getContext("2d")?.drawImage(video, 0, 0);

//       const base64Image = canvas.toDataURL("image/jpeg", 0.7).split(",")[1];

//       const response = await fetch(
//         `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             contents: [
//               {
//                 parts: [
//                   {
//                     text: `Analyser ingredienserne mod disse allergier: ${profile.allergies.join(", ") || "Ingen"}. Svar kun med JSON objekt.`,
//                   },
//                   {
//                     inline_data: { mime_type: "image/jpeg", data: base64Image },
//                   },
//                 ],
//               },
//             ],
//             generationConfig: { response_mime_type: "application/json" },
//           }),
//         },
//       );

//       const data = await response.json();
//       if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
//         const aiResult = JSON.parse(data.candidates[0].content.parts[0].text);
//         navigate("/result", { state: { aiResult } });
//       } else {
//         throw new Error("AI kunne ikke læse billedet");
//       }
//     } catch (error: any) {
//       toast.error(error.message || "Fejl ved scanning");
//     } finally {
//       setIsScanning(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-black relative flex flex-col items-center justify-center">
//       <canvas ref={canvasRef} className="hidden" />

//       {/* Video Viewport */}
//       <video
//         ref={videoRef}
//         autoPlay
//         playsInline
//         muted
//         className="absolute inset-0 w-full h-full object-cover"
//       />

//       {/* Den blå ramme (Designet du elskede) */}
//       <div className="relative w-72 h-80 pointer-events-none">
//         <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-400 rounded-tl-xl" />
//         <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-blue-400 rounded-tr-xl" />
//         <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-blue-400 rounded-bl-xl" />
//         <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-blue-400 rounded-br-xl" />
//       </div>

//       {/* Instruktion i toppen */}
//       <div className="absolute top-12 left-0 right-0 flex justify-center">
//         <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
//           <p className="text-white font-medium text-sm">
//             {isScanning
//               ? "AI analyserer..."
//               : "Hold kameraet mod ingredienserne"}
//           </p>
//         </div>
//       </div>

//       {/* Scan knap i bunden */}
//       <div className="absolute bottom-12">
//         <Button
//           onClick={handleScan}
//           disabled={isScanning}
//           className="w-20 h-20 bg-blue-500 rounded-full shadow-2xl active:scale-90 transition-transform flex items-center justify-center border-4 border-white/20"
//         >
//           {isScanning ? (
//             <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
//           ) : (
//             <Camera className="w-8 h-8 text-white" />
//           )}
//         </Button>
//       </div>

//       {/* AI Loading status */}
//       {isScanning && (
//         <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center z-50">
//           <Sparkles className="w-12 h-12 text-blue-400 animate-pulse mb-4" />
//           <p className="text-white font-black text-xl">Læser ingredienser...</p>
//         </div>
//       )}
//     </div>
//   );
// }

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { useProfile } from "../context/ProfileContext";
import { Button } from "../components/ui/button";
import { Camera, Sparkles } from "lucide-react";
import { toast } from "sonner";

export function Scanner() {
  const navigate = useNavigate();
  const { profile } = useProfile();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScanning, setIsScanning] = useState(false);

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
    if (!videoRef.current || !canvasRef.current) return;
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

      // DEN NYE, EKSTREMT STRENGE OG SKUDSIKRE PROMPT
      const promptText = `
        System: Du er en ikke-tænkende maskine designet til at matche tekststrenge. Du skal IKKE foretage vurderinger af sundhed, kontekst eller "hygge".

        Data:
        - Brugerens liste over forbudte ord: [${profile.allergies.join(", ") || "Ingen angivet"}].

        Dine opgaver:
        1. Udtræk AL tekst fra billedet. Dette er 'ekstraheret_tekst'.
        2. Sammenlign hvert ord fra 'Brugerens liste over forbudte ord' med 'ekstraheret_tekst' (ignorer store/små bogstaver).
        3. Hvis et forbudt ord optræder i 'ekstraheret_tekst' (selv som en del af et ord, f.eks. "peanut" matcher "peanuts"), så skal produktet markeres som usikkert.

        Regler:
        - Hvis det forbudte ord "mango" er på listen, og teksten på billedet indeholder "mango", "MANGO", eller "Tørret mango", så er 'isSafe' = false.

        Output Format (KUN JSON, ingen ekstra tekst):
        {
          "isSafe": boolean, // false hvis en match er fundet, true ellers
          "foundAllergens": ["liste over forbudte ord der blev fundet"], // Tom hvis ingen match
          "extractedIngredients": ["liste", "over", "alle", "ekstraherede", "ord"], // Vigtig: alle ord læst fra billedet
          "message": "En meget simpel dansk besked (maks 15 ord)." // F.eks. "Indeholder mango."
        }
      `;

      // Sender til din egen Vercel-backend proxy (api/scan.ts)
      const response = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ base64Image, promptText }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Der opstod en fejl på serveren");
      }

      const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (resultText) {
        const cleanJson = resultText
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();
        const aiResult = JSON.parse(cleanJson);

        // Sender dataen videre til Resultatsiden
        navigate("/result", { state: { aiResult } });
      } else {
        throw new Error("Modtog intet svar fra AI");
      }
    } catch (error: any) {
      toast.error("Fejl: " + error.message);
    } finally {
      setIsScanning(false);
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
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative w-72 h-80 border-4 border-blue-500 rounded-3xl pointer-events-none" />
      <div className="absolute bottom-28">
        <Button
          onClick={handleScan}
          disabled={isScanning}
          className="w-20 h-20 bg-blue-600 rounded-full border-4 border-white"
        >
          {isScanning ? (
            <div className="animate-spin border-4 border-white border-t-transparent rounded-full w-8 h-8" />
          ) : (
            <Camera className="w-8 h-8 text-white" />
          )}
        </Button>
      </div>
    </div>
  );
}
