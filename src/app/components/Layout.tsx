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
    const checkPremiumStatus = async (userId: string) => {
      const { data } = await supabase
        .from("profiles")
        .select("is_premium")
        .eq("id", userId)
        .single();

      setIsSubscribed(!!data?.is_premium);
      setLoading(false);
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        checkPremiumStatus(session.user.id);
      } else {
        setIsSubscribed(false);
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        checkPremiumStatus(session.user.id);
      } else {
        setIsSubscribed(false);
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
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