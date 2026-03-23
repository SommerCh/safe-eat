import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useProfile } from "../context/ProfileContext";
import { Settings, ArrowRight, Heart, ChevronRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { AllergySelector } from "../components/profile/AllergySelector";
import { DietSelector } from "../components/profile/DietSelector";
import { NolistInput } from "../components/profile/NolistInput";

const DIET_MAP: Record<string, string[]> = {
  keto: ["sukker", "hvede", "kartofler", "ris", "pasta", "majs"],
  vegan: ["kød", "mælk", "æg", "honning", "gelatine", "valle", "smør"],
  paleo: [
    "sukker",
    "mejeriprodukter",
    "korn",
    "bælgfrugter",
    "kunstige sødestoffer",
  ],
  vegetarian: ["kød", "fisk", "skaldyr", "fjerkræ"],
};

const ALLERGY_MAP: Record<string, string[]> = {
  Nødder: [
    "nødder",
    "mandler",
    "hasselnødder",
    "valnødder",
    "cashewnødder",
    "pekannødder",
    "paranødder",
    "pistacienødder",
    "macadamianødder",
  ],
  Laktose: [
    "mælk",
    "laktose",
    "valle",
    "fløde",
    "smør",
    "ost",
    "kasein",
    "skummetmælkspulver",
  ],
  Gluten: ["gluten", "hvede", "rug", "byg", "havre", "spelt", "durum"],
  Æg: ["æg", "æggehvide", "æggeblomme", "æggepulver", "albumin"],
  Skalddyr: [
    "skaldyr",
    "rejer",
    "krabbe",
    "hummer",
    "krebs",
    "muslinger",
    "østers",
  ],
  Soja: ["soja", "sojabønner", "sojalecitin", "tofu", "edamame"],
  Fisk: ["fisk", "tun", "laks", "torsk", "sild", "fiskeolie"],
  Sukker: ["sukker", "glukose", "fruktose", "dextrose", "sirup", "honning"],
};

export function ProfileSetup() {
  const navigate = useNavigate();
  const { profile, setProfile, scanHistory } = useProfile();

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
  const [nolist, setNolist] = useState<string[]>(profile.nolist || []);

  const totalScans = scanHistory.length;
  const safeProducts = scanHistory.filter((scan) => scan.safe).length;
  const unsafeProducts = totalScans - safeProducts;
  const safePercentage =
    totalScans > 0 ? Math.round((safeProducts / totalScans) * 100) : 0;

  useEffect(() => {
    setProfile({
      allergies: selectedAllergies,
      diet: selectedDiets,
      nolist: nolist,
    });
  }, [selectedAllergies, selectedDiets, nolist, setProfile]);

  const handleToggleAllergy = (allergy: string) => {
    const isAdding = !selectedAllergies.includes(allergy);
    const allergyIngredients = (ALLERGY_MAP[allergy] || [allergy]).map((i) =>
      i.toLowerCase(),
    );

    setSelectedAllergies((prev) =>
      isAdding ? [...prev, allergy] : prev.filter((a) => a !== allergy),
    );

    if (isAdding) {
      setNolist((prev) =>
        Array.from(new Set([...prev, ...allergyIngredients])),
      );
    } else {
      setNolist((prev) =>
        prev.filter((item) => !allergyIngredients.includes(item.toLowerCase())),
      );
    }
  };

  const handleToggleDiet = (diet: string) => {
    const isAdding = !selectedDiets.includes(diet);
    const dietIngredients = (DIET_MAP[diet] || []).map((i) => i.toLowerCase());

    setSelectedDiets(
      isAdding
        ? [...selectedDiets, diet]
        : selectedDiets.filter((d) => d !== diet),
    );

    if (isAdding) {
      setNolist((prev) => Array.from(new Set([...prev, ...dietIngredients])));
    } else {
      setNolist((prev) =>
        prev.filter((item) => !dietIngredients.includes(item.toLowerCase())),
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

  const handleClearAll = () => setNolist([]);

  return (
    <div className="min-h-screen bg-white pb-32">
      <div className="bg-white px-6 pt-12 pb-6 sticky top-0 z-10 border-b border-slate-100 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-950">
            Din madprofil
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Gemmes automatisk</p>
        </div>
        <button
          onClick={() => navigate("/settings")}
          className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100 mt-1 transition-colors"
        >
          <Settings className="w-6 h-6 text-slate-700" />
        </button>
      </div>

      <div className="px-6 py-8 space-y-12 max-w-md mx-auto">
        <AllergySelector
          selected={selectedAllergies}
          onToggle={handleToggleAllergy}
        />
        <DietSelector selected={selectedDiets} onToggle={handleToggleDiet} />
        <NolistInput
          items={nolist}
          onRemove={handleRemoveItem}
          onAdd={handleAddItem}
          onClearAll={handleClearAll}
        />

        <div className="pt-4 space-y-4">
          <Button
            onClick={() => navigate("/scanner")}
            className="w-full h-16 bg-slate-950 text-white rounded-2xl text-lg font-bold shadow-sm flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
          >
            Åbn scanner <ArrowRight className="w-5 h-5" />
          </Button>

          <button
            onClick={() => navigate("/favorites")}
            className="w-full flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-2xl hover:bg-slate-50 active:scale-[0.98] transition-all"
          >
            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            </div>
            <div className="flex-1 text-left">
              <span className="block text-slate-900 font-bold text-base leading-none">
                Mine favoritter
              </span>
              <span className="text-slate-500 text-xs mt-1">
                Se dine gemte produkter
              </span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-300" />
          </button>
        </div>

        {/* {totalScans > 0 && (
          <section className="pt-8 border-t border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-900" /> Dit overblik
            </h2>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 text-center">
                <div className="text-2xl font-bold text-slate-900">
                  {totalScans}
                </div>
                <div className="text-[10px] uppercase font-bold text-slate-400 mt-1 tracking-wider">
                  Scannede
                </div>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 text-center">
                <div className="text-2xl font-bold text-emerald-600">
                  {safeProducts}
                </div>
                <div className="text-[10px] uppercase font-bold text-emerald-600/60 mt-1 tracking-wider">
                  Sikre
                </div>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 text-center">
                <div className="text-2xl font-bold text-rose-600">
                  {unsafeProducts}
                </div>
                <div className="text-[10px] uppercase font-bold text-rose-600/60 mt-1 tracking-wider">
                  Usikre
                </div>
              </div>
            </div>

            {safePercentage > 0 && (
              <div className="mt-3 bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Sikkerhedsrate
                  </span>
                  <span className="text-sm font-black text-blue-900">
                    {safePercentage}%
                  </span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-1000"
                    style={{ width: `${safePercentage}%` }}
                  />
                </div>
              </div>
            )}
          </section>
        )} */}
      </div>
    </div>
  );
}

export default ProfileSetup;
