import { useState, useEffect } from "react";
import { Outlet, useLocation, ScrollRestoration } from "react-router";
import { BottomNav } from "./others/BottomNav";
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
      if (session?.user) checkPremiumStatus(session.user.id);
      else {
        setIsSubscribed(false);
        setLoading(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) checkPremiumStatus(session.user.id);
      else {
        setIsSubscribed(false);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return null;

  const isPublicPage =
    location.pathname === "/" || location.pathname === "/terms";
  const isScanner = location.pathname === "/scanner";
  const hideNav = isPublicPage || location.pathname === "/result";

  if (!isPublicPage && !isSubscribed) {
    return (
      <>
        <ScrollRestoration />
        <Paywall onSuccess={() => setIsSubscribed(true)} />
      </>
    );
  }

  return (
    <>
      <ScrollRestoration />
      <div className="h-[100dvh] flex flex-col bg-white overflow-hidden">
        {!isScanner && (
          <div
            style={{ height: "env(safe-area-inset-top))" }}
            className="shrink-0 bg-white"
          />
        )}

        <main className="flex-1 relative overflow-y-auto">
          <Outlet />
        </main>

        {!hideNav && (
          <footer className="shrink-0 flex flex-col bg-white border-t border-gray-100">
            <BottomNav />
            <div
              style={{ height: "env(safe-area-inset-bottom)" }}
              className="bg-white"
            />
          </footer>
        )}
      </div>
    </>
  );
}
