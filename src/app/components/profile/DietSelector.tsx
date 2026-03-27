import { X } from "lucide-react";
import { Label } from "../ui/label";
import { DIET_MAP } from "../../lib/foodData";

const dietOptions = Object.keys(DIET_MAP);

interface DietSelectorProps {
  selected: string[];
  onToggle: (diet: string) => void;
}

export function DietSelector({ selected, onToggle }: DietSelectorProps) {
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <div className="space-y-4">
      <Label className="text-lg font-semibold text-slate-900 ml-1">
        Vælg dine diæter
      </Label>

      <div className="flex flex-wrap gap-2">
        {dietOptions.map((diet) => {
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
              {capitalize(diet === "vegan" ? "vegansk" : diet)}
              {isSelected && <X className="w-4 h-4" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
