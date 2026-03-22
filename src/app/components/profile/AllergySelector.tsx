// 

import { useState } from "react";
import { Search, X } from "lucide-react";
import { Label } from "../ui/label";

const allergyOptions = [
  "Nødder",
  "Laktose",
  "Gluten",
  "Æg",
  "Skalddyr",
  "Soja",
  "Fisk",
];

interface AllergySelectorProps {
  selected: string[];
  onToggle: (allergy: string) => void;
}

export function AllergySelector({ selected, onToggle }: AllergySelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAllergies = allergyOptions.filter((a) =>
    a.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      <Label className="text-lg font-semibold text-gray-900">
        Vælg dine allergier
      </Label>

      {/* Allergi-knapper */}
      <div className="flex flex-wrap gap-2">
        {filteredAllergies.map((allergy) => (
          <button
            key={allergy}
            onClick={() => onToggle(allergy)}
            className={`px-4 py-2 rounded-full border-2 transition-all text-sm font-medium ${
              selected.includes(allergy)
                ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
            }`}
          >
            {allergy}
            {selected.includes(allergy) && (
              <X className="inline-block w-4 h-4 ml-1" />
            )}
          </button>
        ))}
        {filteredAllergies.length === 0 && (
          <p className="text-sm text-slate-500">Ingen allergier fundet...</p>
        )}
      </div>
    </div>
  );
}