import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import { useProfile } from "../context/ProfileContext";
import { useTranslation } from "react-i18next";
import { Button } from "../components/ui/button";
import { SaveProduct } from "../components/othersItems/SaveProduct";
import {
  CheckCircle2,
  AlertTriangle,
  ChevronLeft,
  Info,
  Heart,
  RotateCcw,
  Package,
  ChevronRight,
} from "lucide-react";

export function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { addToScanHistory, favorites, toggleFavorite } = useProfile();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const hasSavedToHistory = useRef(false);

  const aiResult = location.state?.aiResult;

  const ingredientsHash =
    aiResult?.extractedIngredients && aiResult.extractedIngredients.length > 0
      ? aiResult.extractedIngredients.join(",")
      : null;

  useEffect(() => {
    if (!aiResult) {
      navigate("/scanner");
      return;
    }

    if (hasSavedToHistory.current) return;

    const nameForHistory = t("scanned_product_default", "Scannet produkt");

    hasSavedToHistory.current = true;
    addToScanHistory({
      date: new Date().toISOString(),
      productName: nameForHistory,
      safe: aiResult.isSafe,
    });
  }, [aiResult, navigate, t, addToScanHistory]);

  if (!aiResult) return null;

  const isFood = aiResult.productType === "FOOD";

  const generatedName = "";
  const isFavorite = ingredientsHash
    ? favorites.some(
        (fav: any) =>
          typeof fav === "object" && fav.ingredientsHash === ingredientsHash,
      )
    : false;

  const handleConfirmSave = async (
    productName: string,
    storeName: string,
    notes: string,
    currentPreview: string | null,
  ) => {
    const favoriteObject = {
      id: Date.now(),
      type: "product",
      ingredientsHash: ingredientsHash,
      productName:
        productName.trim() || t("scanned_product_default", "Scannet produkt"),
      store: storeName,
      notes: notes,
      image: currentPreview,
      isSafe: aiResult.isSafe,
      productType: aiResult.productType,
      date: new Date().toISOString(),
    };

    await toggleFavorite(favoriteObject as any);
    setIsModalOpen(false);
  };

  const finalMessage = aiResult.isSafe
    ? t("result_safe_msg", "Ingen forbudte ingredienser fundet.")
    : `${t(
        "result_contains",
        "Produktet indeholder:",
      )} ${aiResult.foundAllergens?.join(", ")}`;

  return (
    <div className="bg-white min-h-screen pb-[env(safe-area-inset-bottom)]">
      <div className="px-6 pt-[calc(env(safe-area-inset-top)+16px)] pb-6 flex justify-between items-center bg-white border-b border-slate-100 sticky top-0 z-10">
        <button
          onClick={() => navigate("/scanner")}
          className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100 active:scale-95 transition-all"
        >
          <ChevronLeft className="w-6 h-6 text-slate-700" />
        </button>
        <button
          onClick={() => {
            if (isFavorite) {
              const existingFav = favorites.find(
                (fav: any) =>
                  typeof fav === "object" &&
                  fav.ingredientsHash === ingredientsHash,
              );
              if (existingFav) toggleFavorite(existingFav);
            } else {
              setIsModalOpen(true);
            }
          }}
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
            {!isFood ? (
              <Package className="w-12 h-12" />
            ) : aiResult.isSafe ? (
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
            {isFood
              ? t("found_ingredients_label", "Fundne Ingredienser:")
              : t("found_contents_label", "Indholdsstoffer:")}
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

        <div className="w-full mt-8">
          <button
            onClick={() => navigate("/favorites")}
            className="w-full flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-2xl transition-all active:scale-[0.98]"
          >
            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            </div>
            <div className="flex-1 text-left">
              <span className="block text-slate-900 font-bold text-base">
                {t("profile.link_favorites")}
              </span>
              <span className="text-slate-500 text-xs">
                {t("profile.link_history")}
              </span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-300" />
          </button>
        </div>
      </div>
      <SaveProduct
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleConfirmSave}
        initialData={{ productName: generatedName }}
      />
    </div>
  );
}
