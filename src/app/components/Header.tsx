import { Search } from "lucide-react";

interface HomeHeaderProps {
  hasProfile: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  userName?: string;
}

export function HomeHeader({
  searchQuery,
  setSearchQuery,
  userName,
}: HomeHeaderProps) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 10) return "Godmorgen";
    if (hour >= 10 && hour < 14) return "God formiddag";
    if (hour >= 14 && hour < 18) return "God eftermiddag";
    return "Godaften";
  };

  return (
    <div className="bg-white px-6 pt-12 pb-6 sticky top-0 z-10 border-b border-slate-100">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            {getGreeting()}
            {userName ? ` ${userName}` : ""}
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            Find inspiration til din hverdag
          </p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Søg i artikler, tips og opskrifter..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-12 bg-slate-50 border-2 border-slate-100 rounded-2xl pl-12 pr-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-slate-300 focus:bg-white transition-all font-medium"
        />
      </div>
    </div>
  );
}
