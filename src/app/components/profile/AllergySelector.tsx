import { X } from "lucide-react";
import { Label } from "../ui/label";
import { ALLERGY_OPTIONS } from "../../lib/foodData";

interface AllergySelectorProps {
  selected: string[];
  onToggle: (allergy: string) => void;
}

export function AllergySelector({ selected, onToggle }: AllergySelectorProps) {
  return (
    <div className="space-y-4">
      <Label className="text-lg font-semibold text-slate-900 ml-1">
        Vælg dine allergier
      </Label>

      <div className="flex flex-wrap gap-2">
        {ALLERGY_OPTIONS.map((allergy) => {
          const isSelected = selected.includes(allergy);

          return (
            <button
              key={allergy}
              type="button"
              onClick={() => onToggle(allergy)}
              className={`px-4 py-2 rounded-full border-2 transition-all text-sm font-medium flex items-center gap-1 ${
                isSelected
                  ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                  : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
              }`}
            >
              {allergy}
              {isSelected && <X className="w-4 h-4" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
