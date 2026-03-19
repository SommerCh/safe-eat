import React, {
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
  blacklist: string[];
}

interface ProfileContextType {
  profile: UserProfile;
  setProfile: (profile: UserProfile) => void;
  scannedIngredients: string[];
  setScannedIngredients: (ingredients: string[]) => void;
  scanHistory: ScanHistory[];
  addToScanHistory: (scan: ScanHistory) => void;
  favorites: (string | number)[];
  toggleFavorite: (id: string | number) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem("userProfile");
    return saved
      ? JSON.parse(saved)
      : { allergies: [], diet: [], blacklist: [] };
  });

  const [favorites, setFavorites] = useState<(string | number)[]>(() => {
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

  const toggleFavorite = (id: string | number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id],
    );
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
