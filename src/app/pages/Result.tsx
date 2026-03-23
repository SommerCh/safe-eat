import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useProfile } from "../context/ProfileContext";
import { Button } from "../components/ui/button";
import {
  CheckCircle2,
  AlertTriangle,
  ChevronLeft,
  Info,
  Heart,
  RotateCcw,
  ArrowRight,
} from "lucide-react";

export function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToScanHistory, favorites, toggleFavorite } = useProfile();

  const aiResult = location.state?.aiResult;

  useEffect(() => {
    if (!aiResult) {
      navigate("/scanner");
      return;
    }

    const generatedName =
      aiResult.extractedIngredients && aiResult.extractedIngredients.length > 0
        ? aiResult.extractedIngredients.slice(0, 3).join(", ") + "..."
        : "Scannet produkt";

    addToScanHistory({
      date: new Date().toISOString(),
      productName: generatedName,
      safe: aiResult.isSafe,
    });
  }, []);

  if (!aiResult) return null;

  const generatedName =
    aiResult.extractedIngredients && aiResult.extractedIngredients.length > 0
      ? aiResult.extractedIngredients.slice(0, 3).join(", ") + "..."
      : "Scannet produkt";

  const isFavorite = favorites.includes(generatedName);

  const finalMessage = aiResult.isSafe
    ? "Ingen forbudte ingredienser fundet."
    : `Produktet indeholder: ${aiResult.foundAllergens?.join(", ")}`;

  return (
    <div className="min-h-screen bg-white pb-12">
      <div className="px-6 pt-12 pb-6 flex justify-between items-center bg-white border-b border-slate-50">
        <button
          onClick={() => navigate("/scanner")}
          className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100 active:scale-95 transition-all"
        >
          <ChevronLeft className="w-6 h-6 text-slate-700 pr-0.5" />
        </button>

        <button
          onClick={() => toggleFavorite(generatedName as any)}
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
              aiResult.isSafe
                ? "bg-emerald-100 text-emerald-600"
                : "bg-rose-100 text-rose-500"
            }`}
          >
            {aiResult.isSafe ? (
              <CheckCircle2 className="w-12 h-12" />
            ) : (
              <AlertTriangle className="w-12 h-12" />
            )}
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">
            {aiResult.isSafe ? "Helt sikker!" : "Pas på!"}
          </h2>
        </div>

        <div
          className={`w-full rounded-3xl p-6 mb-8 flex items-start gap-4 border ${
            aiResult.isSafe
              ? "bg-emerald-50/50 border-emerald-100 text-emerald-900"
              : "bg-rose-50 border-rose-100 text-rose-900"
          }`}
        >
          <Info className="w-5 h-5 mt-0.5 shrink-0 opacity-60" />
          <p className="text-sm font-medium leading-relaxed">{finalMessage}</p>
        </div>

        <div className="w-full space-y-4 text-center">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
            Fundne Ingredienser:
          </h3>

          <div className="flex flex-wrap gap-2 justify-center">
            {aiResult.extractedIngredients &&
            aiResult.extractedIngredients.length > 0 ? (
              aiResult.extractedIngredients.map((ing: string, i: number) => {
                const isAllergen = aiResult.foundAllergens?.some(
                  (allergen: string) =>
                    ing.toLowerCase().includes(allergen.toLowerCase()),
                );
                return (
                  <span
                    key={i}
                    className={`px-4 py-2 rounded-2xl text-[11px] font-bold border shadow-sm ${
                      isAllergen
                        ? "bg-rose-100 text-rose-700 border-rose-200"
                        : "bg-slate-50 text-slate-600 border-slate-100"
                    }`}
                  >
                    {ing}
                  </span>
                );
              })
            ) : (
              <span className="text-slate-400 text-sm italic">
                Kunne ikke tyde nogen ingredienser på billedet.
              </span>
            )}
          </div>
        </div>

        {/* Knapper */}
        <div className="w-full mt-10 space-y-3">
          <Button
            onClick={() => navigate("/scanner")}
            className="w-full h-16 bg-slate-950 text-white rounded-2xl text-lg font-bold shadow-sm flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
          >
            Åbn scanner <ArrowRight className="w-5 h-5" />
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
