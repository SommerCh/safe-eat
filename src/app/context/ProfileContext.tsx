import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
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
  const [profile, setProfileState] = useState<UserProfile>(() => {
    const saved = localStorage.getItem("userProfile");
    return saved
      ? JSON.parse(saved)
      : { allergies: [], diet: [], health: [], nolist: [] };
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

  const setProfile = useCallback((newProfile: UserProfile) => {
    setProfileState(newProfile);
  }, []);

  const addToScanHistory = useCallback((scan: ScanHistory) => {
    setScanHistory((prev) => [scan, ...prev].slice(0, 50));
  }, []);

  const toggleFavorite = useCallback((item: any) => {
    setFavorites((prev) => {
      const itemId = typeof item === "object" ? item.id : item;
      const exists = prev.some(
        (fav) => (typeof fav === "object" ? fav.id : fav) === itemId,
      );

      if (exists) {
        return prev.filter(
          (fav) => (typeof fav === "object" ? fav.id : fav) !== itemId,
        );
      } else {
        return [...prev, item];
      }
    });
  }, []);

  const updateFavorite = useCallback((updatedItem: any) => {
    setFavorites((prev) =>
      prev.map((fav) =>
        (typeof fav === "object" ? fav.id : fav) === updatedItem.id
          ? updatedItem
          : fav,
      ),
    );
  }, []);

  const toggleNoListItem = useCallback((ingredient: string) => {
    const cleanItem = ingredient.toLowerCase().trim();
    setProfileState((prev) => {
      const currentList = prev.nolist || [];
      const newList = currentList.includes(cleanItem)
        ? currentList.filter((item) => item !== cleanItem)
        : [...currentList, cleanItem];
      return { ...prev, nolist: newList };
    });
  }, []);

  const value = useMemo(
    () => ({
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
    }),
    [
      profile,
      setProfile,
      scannedIngredients,
      scanHistory,
      addToScanHistory,
      favorites,
      toggleFavorite,
      updateFavorite,
      toggleNoListItem,
    ],
  );

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context)
    throw new Error("useProfile must be used within ProfileProvider");
  return context;
}
