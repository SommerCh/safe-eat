import { useState } from "react";
import { Label } from "../ui/label";
import { Check, ChevronDown } from "lucide-react";

const dietOptions = [
  { value: "keto", label: "Keto" },
  { value: "vegan", label: "Vegansk" },
  { value: "paleo", label: "Palæo" },
  { value: "vegetarian", label: "Vegetar" },
];

interface DietSelectorProps {
  selected: string[];
  onToggle: (diet: string) => void;
}

export function DietSelector({ selected, onToggle }: DietSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getLabel = () => {
    if (selected.length === 0) return "Vælg diæter...";
    return dietOptions
      .filter((d) => selected.includes(d.value))
      .map((d) => d.label)
      .join(", ");
  };

  return (
    <div className="space-y-4">
      <Label className="text-lg font-semibold text-slate-900 ml-1">
        Vælg dine diæter
      </Label>

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full h-14 px-5 rounded-2xl border-2 border-slate-200 bg-slate-50 flex items-center justify-between transition-all active:scale-[0.99] focus:outline-none focus:border-slate-400"
        >
          <span
            className={`truncate text-base ${selected.length > 0 ? "text-slate-900 font-medium" : "text-slate-400"}`}
          >
            {getLabel()}
          </span>
          <ChevronDown
            className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-white border border-slate-100 rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-2 space-y-1">
              {dietOptions.map((diet) => {
                const isSelected = selected.includes(diet.value);
                return (
                  <button
                    key={diet.value}
                    type="button"
                    onClick={() => onToggle(diet.value)}
                    className="w-full h-12 px-4 rounded-xl flex items-center justify-between hover:bg-slate-50 transition-colors"
                  >
                    <span
                      className={`text-base ${isSelected ? "text-slate-900 font-semibold" : "text-slate-600"}`}
                    >
                      {diet.label}
                    </span>
                    {isSelected && (
                      <Check className="w-5 h-5 text-black stroke-[3px]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
}
