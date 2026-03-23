import { SearchBar } from "./ui/SearchBar"; 

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

      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Søg i artikler, tips og opskrifter..."
      />
    </div>
  );
}