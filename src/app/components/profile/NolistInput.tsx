import { useState, type KeyboardEvent } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import { Label } from "../ui/label";

interface NolistInputProps {
  items: string[];
  onRemove: (item: string) => void;
  onAdd: (item: string) => void;
  onClearAll: () => void;
}

export function NolistInput({
  items,
  onRemove,
  onAdd,
  onClearAll,
}: NolistInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (inputValue.trim()) {
        onAdd(inputValue.trim());
        setInputValue("");
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <Label className="text-xl font-bold tracking-tight text-slate-950">
          Personlig liste
        </Label>
        {items.length > 0 && (
          <button
            type="button"
            onClick={onClearAll}
            className="flex items-center gap-1.5 text-sm font-medium text-slate-400 hover:text-red-600 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Ryd alle
          </button>
        )}
      </div>

      <div className="p-5 bg-slate-50 border-2 border-slate-200 rounded-[2rem] space-y-5 focus-within:bg-white focus-within:border-slate-400 transition-all duration-200">
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 text-slate-900 rounded-xl text-sm font-semibold animate-in zoom-in duration-200"
            >
              {item}
              <button
                type="button"
                onClick={() => onRemove(item)}
                className="text-slate-400 hover:text-slate-900 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </span>
          ))}

          {items.length === 0 && (
            <p className="text-slate-400 text-sm italic py-2 px-1">
              Listen er tom...
            </p>
          )}
        </div>

        <div className="relative pt-4 border-t border-slate-50 flex items-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Tilføj f.eks. palmeolie..."
            className="flex-1 bg-transparent outline-none text-slate-900 placeholder:text-slate-300 text-base py-1"
          />
          <button
            type="button"
            onClick={() => {
              if (inputValue.trim()) {
                onAdd(inputValue.trim());
                setInputValue("");
              }
            }}
            className="ml-3 w-10 h-10 bg-slate-950 text-white rounded-full flex items-center justify-center active:scale-90 transition-all shadow-sm"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
