import { X } from "lucide-react";
import { Label } from "../ui/label";

const healthOptions = [
  "Anti-inflammatorisk",
  "Diabetes",
  "Forhøjet blodtryk",
  "Forhøjet kolesterol",
  "Gravid",
  "Histamin-intolerance",
  "Irritabel tyktarm",
  "Migræne",
];

interface HealthSelectorProps {
  selected: string[];
  onToggle: (health: string) => void;
}

export function HealthSelector({ selected, onToggle }: HealthSelectorProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label className="text-lg font-semibold text-gray-900">
          Sundhed & Livsstil
        </Label>

      </div>

      <div className="flex flex-wrap gap-2">
        {healthOptions.map((health) => (
          <button
            key={health}
            onClick={() => onToggle(health)}
            className={`px-4 py-2 rounded-full border-2 transition-all text-sm font-medium ${
              selected.includes(health)
                ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
            }`}
          >
            {health}
            {selected.includes(health) && (
              <X className="inline-block w-4 h-4 ml-1" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
