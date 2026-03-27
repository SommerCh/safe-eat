import { useState, useEffect } from "react";
import { Outlet, useLocation, ScrollRestoration } from "react-router";
import { BottomNav } from "./Others/BottomNav";
import { Paywall } from "../components/home/Paywall";
import { supabase } from "../lib/supabase"; 

export function Layout() {
  const location = useLocation();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);  

  useEffect(() => {
    const checkPremiumStatus = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("is_premium")
          .eq("id", user.id)
          .single();

        if (data?.is_premium) {
          setIsSubscribed(true);
        }
      }
      setLoading(false); 
    };

    checkPremiumStatus();
  }, []);

  if (loading) return null;

  const isPublicPage = location.pathname === "/" || location.pathname === "/terms";

  if (!isPublicPage && !isSubscribed) {
    return (
      <>
        <ScrollRestoration />
        <Paywall onSuccess={() => setIsSubscribed(true)} />
      </>
    );
  }

  const hideNav = location.pathname === "/" || location.pathname === "/result";

  return (
    <>
      <ScrollRestoration />
      <div className="min-h-screen bg-white">
        <Outlet />
        {!hideNav && <BottomNav />}
      </div>
    </>
  );
}