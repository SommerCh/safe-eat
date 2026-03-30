import { X } from "lucide-react";
import { Label } from "../ui/label";
import { DIET_OPTIONS } from "../../lib/foodData";
import { useTranslation } from "react-i18next";

interface DietSelectorProps {
  selected: string[];
  onToggle: (diet: string) => void;
}

export function DietSelector({ selected, onToggle }: DietSelectorProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <Label className="text-lg font-semibold text-slate-900 ml-1">
        {t("profile.diet_title", "Vælg dine diæter")}
      </Label>

      <div className="flex flex-wrap gap-2">
        {DIET_OPTIONS.map((diet) => {
          const isSelected = selected.includes(diet);

          return (
            <button
              key={diet}
              type="button"
              onClick={() => onToggle(diet)}
              className={`px-4 py-2 rounded-full border-2 transition-all text-sm font-medium flex items-center gap-1 ${
                isSelected
                  ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                  : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
              }`}
            >
              {t(`food.diet.${diet}`)}
              {isSelected && <X className="w-4 h-4" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}