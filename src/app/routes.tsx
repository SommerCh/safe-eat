import { useEffect, useState } from "react";
import { createBrowserRouter, useNavigate, useLocation, Outlet } from "react-router";
import { supabase } from "./lib/supabase";
import { Layout } from "./components/Layout";
import { Onboarding } from "./pages/Onboarding";
import { Info } from "./pages/Info";
import { ProfileSetup } from "./pages/ProfileSetup";
import { Scanner } from "./pages/Scanner";
import { Result } from "./pages/Result";
import { ProfileSettings } from "./components/profile/ProfileSettings";
import { ArticleDetail } from "./pages/ArticleDetail";
import { Favorites } from "./pages/Favorites";
import { LegalPage } from "./pages/Legal";

function AuthGuard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session && location.pathname === "/") {
        navigate("/info", { replace: true });
      } else if (!session && location.pathname !== "/" && location.pathname !== "/terms") {
        navigate("/", { replace: true });
      }
      
      setLoading(false);
    };

    checkAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" && location.pathname === "/") {
        navigate("/info", { replace: true });
      } else if (event === "SIGNED_OUT") {
        navigate("/", { replace: true });
      }
    });

    return () => authListener.subscription.unsubscribe();
  }, [navigate, location.pathname]);

  if (loading) return null;

  return <Outlet/>;
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AuthGuard,
    children: [
      {
        path: "/",
        Component: Layout,
        children: [
          {
            index: true,
            Component: Onboarding,
          },
          {
            path: "info",
            Component: Info,
          },
          {
            path: "setup",
            Component: ProfileSetup,
          },
          {
            path: "scanner",
            Component: Scanner,
          },
          {
            path: "result",
            Component: Result,
          },
          {
            path: "settings",
            Component: ProfileSettings,
          },
          {
            path: "article/:id",
            Component: ArticleDetail,
          },
          {
            path: "favorites",
            Component: Favorites,
          },
        ],
      },
    ],
  },
  {
    path: "terms",
    Component: LegalPage,
  },
]);