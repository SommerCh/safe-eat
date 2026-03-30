import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { useProfile } from "../context/ProfileContext";
import { useTranslation } from "react-i18next";
import { Button } from "../components/ui/button";
import { SaveProduct } from "../components/Others/SaveProduct";
import {
  CheckCircle2,
  AlertTriangle,
  ChevronLeft,
  Info,
  Heart,
  RotateCcw,
} from "lucide-react";

export function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { addToScanHistory, favorites, toggleFavorite } = useProfile();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const mockResult = {
    isSafe: false,
    extractedIngredients: ["Hvedemel", "Sukker", "Mælkepulver", "Palmeolie"],
    foundAllergens: ["Mælkepulver"],
  };

  const aiResult = location.state?.aiResult || mockResult;

  const ingredientsHash = aiResult.extractedIngredients
    ? aiResult.extractedIngredients.join(",")
    : "raw-scan-no-ingredients";

  useEffect(() => {
    if (!location.state?.aiResult && !mockResult) {
      navigate("/scanner");
      return;
    }

    const nameForHistory =
      aiResult.extractedIngredients && aiResult.extractedIngredients.length > 0
        ? aiResult.extractedIngredients.slice(0, 3).join(", ") + "..."
        : t("scanned_product_default", "Scannet produkt");

    addToScanHistory({
      date: new Date().toISOString(),
      productName: nameForHistory,
      safe: aiResult.isSafe,
    });
  }, []);

  if (!aiResult) return null;

  const generatedName =
    aiResult.extractedIngredients && aiResult.extractedIngredients.length > 0
      ? aiResult.extractedIngredients.slice(0, 3).join(", ") + "..."
      : t("scanned_product_default", "Scannet produkt");

  const isFavorite = favorites.some(
    (fav: any) =>
      typeof fav === "object" && fav.ingredientsHash === ingredientsHash,
  );

  const handleConfirmSave = async (
    productName: string,
    storeName: string,
    notes: string,
    imageFile: File | null,
  ) => {
    let imageUrl = null;
    if (imageFile) {
      imageUrl = URL.createObjectURL(imageFile);
    }

    const favoriteObject = {
      id: Date.now(),
      type: "product",
      ingredientsHash: ingredientsHash,
      productName: productName || generatedName,
      store: storeName,
      notes: notes,
      image: imageUrl,
      isSafe: aiResult.isSafe,
      date: new Date().toISOString(),
    };

    await toggleFavorite(favoriteObject as any);
    setIsModalOpen(false);
  };

  const allergensList = aiResult.foundAllergens?.join(", ") || "";
  const finalMessage = aiResult.isSafe
    ? t("result_safe_msg", "Ingen forbudte ingredienser fundet.")
    : `${t("result_contains", "Produktet indeholder:")} ${allergensList}`;

  return (
    <div className="bg-white">
      <div className="px-6 pt-6 pb-6 flex justify-between items-center bg-white border-b border-slate-100 sticky top-0 z-10">
        <button
          onClick={() => navigate("/scanner")}
          className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100 active:scale-95 transition-all"
        >
          <ChevronLeft className="w-6 h-6 text-slate-700" />
        </button>

        <button
          onClick={() => setIsModalOpen(true)}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all border ${
            isFavorite
              ? "bg-red-50 border-red-100 text-red-500"
              : "bg-slate-50 border-slate-100 text-slate-400"
          }`}
        >
          <Heart
            className={`w-5 h-5 ${
              isFavorite ? "fill-red-500 text-red-500" : ""
            }`}
          />
        </button>
      </div>

      <div className="px-8 py-10 flex flex-col items-center">
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
            {aiResult.isSafe
              ? t("result_safe_title", "Helt sikker!")
              : t("result_danger_title", "Pas på!")}
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
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">
            {t("found_ingredients_label", "Fundne Ingredienser:")}
          </h3>

          <div className="flex flex-wrap gap-2 justify-center">
            {aiResult.extractedIngredients?.map((ing: string, i: number) => {
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
            })}
          </div>
        </div>

        <div className="w-full mt-10 space-y-3">
          <Button
            onClick={() => navigate("/scanner")}
            className="w-full h-16 bg-black text-white rounded-2xl text-base font-bold shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            {t("scan_next_button", "Scan næste vare")}
          </Button>

          <button
            onClick={() => navigate("/setup")}
            className="w-full py-4 text-slate-400 font-bold text-[10px] uppercase tracking-widest active:text-slate-600 transition-colors"
          >
            {t("edit_profile_link", "Rediger min madprofil")}
          </button>
        </div>
      </div>

      <SaveProduct
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleConfirmSave}
      />
    </div>
  );
}
