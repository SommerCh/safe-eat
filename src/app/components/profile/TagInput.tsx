import { useState, type KeyboardEvent } from "react";
import { X, Plus } from "lucide-react";
import { Label } from "../ui/label";
import { useTranslation } from "react-i18next";

interface TagInputProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
}

export function TagInput({ tags, onTagsChange }: TagInputProps) {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState("");

  const addTag = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onTagsChange([...tags, trimmed]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  };

  const removeTag = (tagToRemove: string) => {
    onTagsChange(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="space-y-4">
      <Label className="text-lg font-semibold text-gray-900 ml-1">
        {t("profile.blacklist_title", "Personlig sortliste")}
      </Label>

      <div className="min-h-[120px] p-4 bg-slate-50 border-2 border-slate-200 rounded-3xl space-y-4 focus-within:bg-white focus-within:border-slate-400 transition-all">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-200 text-slate-800 rounded-full text-sm font-bold animate-in zoom-in duration-200"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="hover:text-slate-950 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}

          {tags.length === 0 && (
            <p className="text-slate-400 text-sm italic py-1">
              {t(
                "profile.blacklist_empty",
                "Ingen ingredienser tilføjet endnu...",
              )}
            </p>
          )}
        </div>

        <div className="relative pt-2 border-t border-slate-200">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t(
              "profile.personal_placeholder",
              "Tilføj f.eks. palmeolie...",
            )}
            className="w-full bg-transparent outline-none text-slate-700 placeholder:text-slate-400 text-base py-1"
          />
          <button
            type="button"
            onClick={addTag}
            className="absolute right-0 top-2.5 w-6 h-6 bg-slate-950 text-white rounded-full flex items-center justify-center active:scale-90 transition-all"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
      <p className="text-xs text-slate-400 ml-2 italic">
        {t(
          "profile.blacklist_tip",
          "Tip: Tryk på Enter eller brug komma for at tilføje",
        )}
      </p>
    </div>
  );
}
