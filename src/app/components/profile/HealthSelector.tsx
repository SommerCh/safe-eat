import { X } from "lucide-react";
import { Label } from "../ui/label";
import { HEALTH_OPTIONS } from "../../lib/foodData";
import { useTranslation } from "react-i18next";

interface HealthSelectorProps {
  selected: string[];
  onToggle: (health: string) => void;
}

export function HealthSelector({ selected, onToggle }: HealthSelectorProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <Label className="text-lg font-semibold text-gray-900 ml-1">
        {t("profile.section_health", "Sundhed & Livsstil")}
      </Label>

      <div className="flex flex-wrap gap-2">
        {HEALTH_OPTIONS.map((health) => {
          const isSelected = selected.includes(health);

          return (
            <button
              key={health}
              type="button"
              onClick={() => onToggle(health)}
              className={`px-4 py-2 rounded-full border-2 transition-all text-sm font-medium flex items-center gap-1 ${
                isSelected
                  ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                  : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
              }`}
            >
              {t(`food.health.${health}`)}
              {isSelected && <X className="w-4 h-4" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}