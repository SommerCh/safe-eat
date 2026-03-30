import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useProfile } from "../context/ProfileContext";
import { useTranslation } from "react-i18next";
import { Settings, ArrowRight, Heart, ChevronRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { AllergySelector } from "../components/profile/AllergySelector";
import { DietSelector } from "../components/profile/DietSelector";
import { HealthSelector } from "../components/profile/HealthSelector";
import { NolistInput } from "../components/profile/NolistInput";
import { DIET_MAP, HEALTH_MAP, ALLERGY_MAP } from "../lib/foodData";

export function ProfileSetup() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { profile, setProfile } = useProfile();

  const [selectedAllergies, setSelectedAllergies] = useState<string[]>(
    profile.allergies || [],
  );
  const [selectedDiets, setSelectedDiets] = useState<string[]>(
    Array.isArray(profile.diet)
      ? profile.diet
      : profile.diet
      ? [profile.diet]
      : [],
  );
  const [selectedHealth, setSelectedHealth] = useState<string[]>(
    profile.health || [],
  );
  const [nolist, setNolist] = useState<string[]>(profile.nolist || []);

  useEffect(() => {
    setProfile({
      allergies: selectedAllergies,
      diet: selectedDiets,
      health: selectedHealth,
      nolist: nolist,
    });
  }, [selectedAllergies, selectedDiets, selectedHealth, nolist, setProfile]);

  const handleToggleAllergy = (allergy: string) => {
    const isAdding = !selectedAllergies.includes(allergy);
    const ingredients = (ALLERGY_MAP[allergy] || [allergy]).map((i) =>
      i.toLowerCase(),
    );
    setSelectedAllergies((prev) =>
      isAdding ? [...prev, allergy] : prev.filter((a) => a !== allergy),
    );
    updateNolist(ingredients, isAdding);
  };

  const handleToggleDiet = (diet: string) => {
    const isAdding = !selectedDiets.includes(diet);
    const ingredients = (DIET_MAP[diet] || []).map((i) => i.toLowerCase());
    setSelectedDiets((prev) =>
      isAdding ? [...prev, diet] : prev.filter((d) => d !== diet),
    );
    updateNolist(ingredients, isAdding);
  };

  const handleToggleHealth = (condition: string) => {
    const isAdding = !selectedHealth.includes(condition);
    const ingredients = (HEALTH_MAP[condition] || []).map((i) =>
      i.toLowerCase(),
    );
    setSelectedHealth((prev) =>
      isAdding ? [...prev, condition] : prev.filter((h) => h !== condition),
    );
    updateNolist(ingredients, isAdding);
  };

  const updateNolist = (ingredients: string[], isAdding: boolean) => {
    const processedIngredients = ingredients.map((i) =>
      i18n.language === "en" ? t(`ingredients.${i}`, i) : i,
    );

    if (isAdding) {
      setNolist((prev) =>
        Array.from(new Set([...prev, ...processedIngredients])),
      );
    } else {
      setNolist((prev) =>
        prev.filter((item) => !processedIngredients.includes(item)),
      );
    }
  };

  const handleAddItem = (item: string) => {
    const cleanItem = item.toLowerCase().trim();
    if (cleanItem && !nolist.includes(cleanItem)) {
      setNolist((prev) => [...prev, cleanItem]);
    }
  };

  const handleRemoveItem = (itemToRemove: string) => {
    setNolist((prev) => prev.filter((item) => item !== itemToRemove));
  };

  const handleClearAll = () => {
    setNolist([]);
    setSelectedAllergies([]);
    setSelectedDiets([]);
    setSelectedHealth([]);

    setProfile({
      ...profile,
      allergies: [],
      diet: [],
      health: [],
      nolist: [],
    });
  };

  return (
    <div className="bg-white">
      <div className="bg-white px-6 pt-[calc(env(safe-area-inset-top)+8px)] pb-6 sticky top-0 z-10 border-b border-slate-100 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-950">
            {t("profile.title")}
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            {t("profile.subtitle")}
          </p>
        </div>
        <button
          onClick={() => navigate("/settings")}
          className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100 transition-colors active:scale-95"
        >
          <Settings className="w-6 h-6 text-slate-700" />
        </button>
      </div>

      <div className="px-6 py-8 space-y-10 max-w-md mx-auto">
        <AllergySelector
          selected={selectedAllergies}
          onToggle={handleToggleAllergy}
        />
        <DietSelector selected={selectedDiets} onToggle={handleToggleDiet} />
        <HealthSelector
          selected={selectedHealth}
          onToggle={handleToggleHealth}
        />

        <NolistInput
          items={nolist}
          onRemove={handleRemoveItem}
          onAdd={handleAddItem}
          onClearAll={handleClearAll}
        />

        <div className="pt-4 space-y-4">
          <Button
            onClick={() => navigate("/scanner")}
            className="w-full h-16 bg-slate-950 text-white rounded-2xl text-lg font-bold shadow-sm flex items-center justify-center gap-3"
          >
            {t("profile.button_open_scanner")}{" "}
            <ArrowRight className="w-5 h-5" />
          </Button>

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
    </div>
  );
}

export default ProfileSetup;
