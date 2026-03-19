import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const customStorage = {
  getItem: (key: string) => {
    if (typeof window === "undefined") return null;
    if (window.sessionStorage.getItem("useSessionStorage") === "true") {
      return window.sessionStorage.getItem(key);
    }
    return window.localStorage.getItem(key);
  },
  setItem: (key: string, value: string) => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem("useSessionStorage") === "true") {
      window.sessionStorage.setItem(key, value);
    } else {
      window.localStorage.setItem(key, value);
    }
  },
  removeItem: (key: string) => {
    if (typeof window === "undefined") return;
    window.sessionStorage.removeItem(key);
    window.localStorage.removeItem(key);
  },
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: customStorage,
  },
});
