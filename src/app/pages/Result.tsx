import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useProfile } from "../context/ProfileContext";
import { Button } from "../components/ui/button";
import {
  CheckCircle2,
  AlertTriangle,
  ChevronLeft,
  Info,
  Heart,
  RotateCcw,
} from "lucide-react";

interface AnalysisResult {
  isSafe: boolean;
  productName: string;
  problematicIngredients: Array<{
    name: string;
    reason: string;
    severity: "high" | "medium";
  }>;
  explanation: string;
}

export function Result() {
  const navigate = useNavigate();
  const {
    profile,
    scannedIngredients,
    addToScanHistory,
    favorites,
    toggleFavorite,
  } = useProfile();
  const [result, setResult] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    analyzeIngredients();
  }, []);

  const analyzeIngredients = () => {
    const problematic: Array<{
      name: string;
      reason: string;
      severity: "high" | "medium";
    }> = [];

    const generatedName = scannedIngredients.slice(0, 3).join(", ") + "...";

    scannedIngredients.forEach((ingredient) => {
      const lowerIngredient = ingredient.toLowerCase();

      profile.allergies.forEach((allergy) => {
        if (lowerIngredient.includes(allergy.toLowerCase())) {
          problematic.push({
            name: ingredient,
            reason: `Indeholder ${allergy}`,
            severity: "high",
          });
        }
      });
    });

    const isSafe = problematic.length === 0;
    setResult({
      isSafe,
      productName: generatedName,
      problematicIngredients: problematic,
      explanation: isSafe
        ? "Dette produkt matcher din madprofil og er sikkert!"
        : `Vi fandt ${problematic.length} ingredienser, du bør undgå.`,
    });

    addToScanHistory({
      date: new Date().toISOString(),
      productName: generatedName,
      safe: isSafe,
    });
  };

  if (!result) return null;

  const isFavorite = favorites.includes(result.productName);

  return (
    <div className="min-h-screen bg-white">
      <div className="px-6 pt-12 pb-6 flex justify-between items-center bg-white border-b border-slate-50">
        <button
          onClick={() => navigate("/scanner")}
          className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100 active:scale-95 transition-all"
        >
          <ChevronLeft className="w-6 h-6 text-slate-700 pr-0.5" />
        </button>

        <button
          onClick={() => toggleFavorite(result.productName as any)}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all border ${
            isFavorite
              ? "bg-red-50 border-red-100 text-red-500"
              : "bg-slate-50 border-slate-100 text-slate-400"
          }`}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
        </button>
      </div>

      <div className="px-8 py-10 flex flex-col items-center">
        {/* Status Ikon */}
        <div className="mb-10 flex flex-col items-center text-center">
          <div
            className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 ${
              result.isSafe
                ? "bg-emerald-100 text-emerald-600"
                : "bg-rose-100 text-rose-500"
            }`}
          >
            {result.isSafe ? (
              <CheckCircle2 className="w-12 h-12" />
            ) : (
              <AlertTriangle className="w-12 h-12" />
            )}
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">
            {result.isSafe ? "Helt sikker!" : "Pas på!"}
          </h2>
        </div>

        {/* Info Boks */}
        <div
          className={`w-full rounded-3xl p-6 mb-12 flex items-start gap-4 border ${
            result.isSafe
              ? "bg-emerald-50/50 border-emerald-100 text-emerald-900"
              : "bg-rose-50 border-rose-100 text-rose-900"
          }`}
        >
          <Info className="w-5 h-5 mt-0.5 shrink-0 opacity-60" />
          <p className="text-sm font-medium leading-relaxed">
            {result.explanation}
          </p>
        </div>

        {/* Scannede ingredienser tags */}
        <div className="w-full space-y-6 text-center">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
            Scannede ingredienser
          </h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {scannedIngredients.map((ing, i) => (
              <span
                key={i}
                className="px-4 py-2 bg-slate-50 text-slate-600 rounded-2xl text-[11px] font-bold border border-slate-100 shadow-sm"
              >
                {ing}
              </span>
            ))}
          </div>
        </div>

        <div className="w-full mt-16 space-y-3">
          <Button
            onClick={() => navigate("/scanner")}
            className="w-full h-16 bg-slate-950 text-white rounded-2xl text-lg font-bold shadow-sm hover:bg-black active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Scan næste vare
          </Button>

          <button
            onClick={() => navigate("/setup")}
            className="w-full py-4 text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-slate-600 transition-colors"
          >
            Rediger min madprofil
          </button>
        </div>
      </div>
    </div>
  );
}
