// import { useState } from "react";
// import { useNavigate } from "react-router";
// import { useProfile } from "../context/ProfileContext";
// import { Button } from "../components/ui/button";
// import { Settings } from "lucide-react";
// import { AllergySelector } from "../components/profile/AllergySelector";
// import { DietSelector } from "../components/profile/DietSelector";
// import { BlacklistInput } from "../components/profile/BlacklistInput";

// export function ProfileSetup() {
//   const navigate = useNavigate();
//   const { profile, setProfile } = useProfile();

//   const [selectedAllergies, setSelectedAllergies] = useState<string[]>(
//     profile.allergies,
//   );
//   const [selectedDiet, setSelectedDiet] = useState(profile.diet);
//   const [blacklistText, setBlacklistText] = useState(
//     profile.blacklist.join(", "),
//   );

//   const handleToggleAllergy = (allergy: string) => {
//     setSelectedAllergies((prev) =>
//       prev.includes(allergy)
//         ? prev.filter((a) => a !== allergy)
//         : [...prev, allergy],
//     );
//   };

//   const handleComplete = () => {
//     const blacklistArray = blacklistText
//       .split(",")
//       .map((item) => item.trim())
//       .filter((item) => item.length > 0);

//     setProfile({
//       allergies: selectedAllergies,
//       diet: selectedDiet,
//       blacklist: blacklistArray,
//     });

//     navigate("/scanner");
//   };

//   return (
//     <div className="min-h-screen bg-white pb-32">
//       <div className="bg-white px-6 pt-12 pb-6 sticky top-0 z-10 border-b border-slate-100 flex justify-between items-start">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight text-slate-900">
//             Din madprofil
//           </h1>
//           <p className="text-slate-500 mt-2">
//             Vi hjælper med at tjekke indholdet for dig
//           </p>
//         </div>

//         <button
//           onClick={() => navigate("/settings")}
//           className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center hover:bg-slate-100 active:scale-95 transition-all border border-slate-100 mt-1"
//         >
//           <Settings className="w-6 h-6 text-slate-700" />
//         </button>
//       </div>

//       <div className="px-6 py-8 space-y-12 max-w-md mx-auto">
//         <AllergySelector
//           selected={selectedAllergies}
//           onToggle={handleToggleAllergy}
//         />

//         <DietSelector selected={selectedDiet} onSelect={setSelectedDiet} />

//         <BlacklistInput text={blacklistText} onChange={setBlacklistText} />

//         <Button
//           onClick={handleComplete}
//           disabled={
//             selectedAllergies.length === 0 &&
//             !selectedDiet &&
//             blacklistText.length === 0
//           }
//           className="w-full h-14 bg-blue-600 text-white hover:bg-blue-700 rounded-2xl text-lg font-medium shadow-lg disabled:opacity-50"
//         >
//           Fortsæt til scanner
//         </Button>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useProfile } from "../context/ProfileContext";
import { Settings, ArrowRight, Heart, ChevronRight } from "lucide-react"; // Tilføjet Heart og ChevronRight
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
};

export function ProfileSetup() {
  const navigate = useNavigate();
  const { profile, setProfile } = useProfile();

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
  const [nolist, setNolist] = useState<string[]>(profile.blacklist || []);

  useEffect(() => {
    setProfile({
      allergies: selectedAllergies,
      diet: selectedDiets,
      blacklist: nolist,
    });
  }, [selectedAllergies, selectedDiets, nolist, setProfile]);

  const handleToggleAllergy = (allergy: string) => {
    const isAdding = !selectedAllergies.includes(allergy);

    setSelectedAllergies((prev) =>
      isAdding ? [...prev, allergy] : prev.filter((a) => a !== allergy),
    );

    if (isAdding) {
      const allergyIngredients = ALLERGY_MAP[allergy] || [
        allergy.toLowerCase(),
      ];
      setNolist((prev) =>
        Array.from(new Set([...prev, ...allergyIngredients])),
      );
    }
  };

  const handleToggleDiet = (diet: string) => {
    const isAdding = !selectedDiets.includes(diet);
    const newDiets = isAdding
      ? [...selectedDiets, diet]
      : selectedDiets.filter((d) => d !== diet);

    setSelectedDiets(newDiets);

    if (isAdding) {
      const dietIngredients = DIET_MAP[diet] || [];
      setNolist((prev) => Array.from(new Set([...prev, ...dietIngredients])));
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

  const handleClearAll = () => {
    setNolist([]);
  };

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
          className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center hover:bg-slate-100 border border-slate-100 mt-1 transition-colors"
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
            className="w-full h-16 bg-slate-950 text-white hover:bg-black rounded-2xl text-lg font-bold shadow-sm flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
          >
            Åbn scanner
            <ArrowRight className="w-5 h-5" />
          </Button>

          {/* Favoritter knap placeret under scanner-knappen */}
          <button
            onClick={() => navigate("/favorites")}
            className="w-full flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-2xl hover:bg-slate-50 active:scale-[0.98] transition-all"
          >
            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            </div>
            <div className="flex-1 text-left">
              <span className="block text-slate-900 font-bold text-base leading-none">
                Mine favoritter
              </span>
              <span className="text-slate-500 text-xs mt-1">
                Se dine gemte artikler og produkter
              </span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-300" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileSetup;
