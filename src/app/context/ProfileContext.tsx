import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface ScanHistory {
  date: string;
  productName: string;
  safe: boolean;
}

interface UserProfile {
  allergies: string[];
  diet: string[];
  health: string[];
  nolist: string[];
}

interface ProfileContextType {
  profile: UserProfile;
  setProfile: (profile: UserProfile) => void;
  scannedIngredients: string[];
  setScannedIngredients: (ingredients: string[]) => void;
  scanHistory: ScanHistory[];
  addToScanHistory: (scan: ScanHistory) => void;
  favorites: any[]; 
  toggleFavorite: (item: any) => void;
  updateFavorite: (updatedItem: any) => void; 
  toggleNoListItem: (ingredient: string) => void; 
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem("userProfile");
    return saved ? JSON.parse(saved) : { allergies: [], diet: [], nolist: [] };
  });

  const [favorites, setFavorites] = useState<any[]>(() => {
    const saved = localStorage.getItem("userFavorites");
    return saved ? JSON.parse(saved) : [];
  });

  const [scanHistory, setScanHistory] = useState<ScanHistory[]>(() => {
    const saved = localStorage.getItem("scanHistory");
    return saved ? JSON.parse(saved) : [];
  });

  const [scannedIngredients, setScannedIngredients] = useState<string[]>([]);

  useEffect(() => {
    localStorage.setItem("userProfile", JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem("userFavorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("scanHistory", JSON.stringify(scanHistory));
  }, [scanHistory]);

  const addToScanHistory = (scan: ScanHistory) => {
    setScanHistory((prev) => [scan, ...prev].slice(0, 50));
  };

  const toggleFavorite = (item: any) => {
    setFavorites((prev) => {
      // Find ud af om vi kigger på et simpelt ID eller et objekt med ID
      const itemId = typeof item === "object" ? item.id : item;
      
      const exists = prev.some((fav) => {
        const favId = typeof fav === "object" ? fav.id : fav;
        return favId === itemId;
      });

      if (exists) {
        return prev.filter((fav) => {
          const favId = typeof fav === "object" ? fav.id : fav;
          return favId !== itemId;
        });
      } else {
        return [...prev, item];
      }
    });
  };

  const updateFavorite = (updatedItem: any) => {
    setFavorites((prev) => 
      prev.map((fav) => {
        const favId = typeof fav === "object" ? fav.id : fav;
        return favId === updatedItem.id ? updatedItem : fav;
      })
    );
  };

  const toggleNoListItem = (ingredient: string) => {
    const cleanItem = ingredient.toLowerCase().trim();
    setProfile((prev) => {
      const currentList = prev.nolist || [];
      const newList = currentList.includes(cleanItem)
        ? currentList.filter((item) => item !== cleanItem)
        : [...currentList, cleanItem];
      return { ...prev, nolist: newList };
    });
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        setProfile,
        scannedIngredients,
        setScannedIngredients,
        scanHistory,
        addToScanHistory,
        favorites,
        toggleFavorite,
        updateFavorite, 
        toggleNoListItem, 
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context)
    throw new Error("useProfile must be used within ProfileProvider");
  return context;
}