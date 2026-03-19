import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Onboarding } from "./pages/Onboarding";
import { Home } from "./pages/Home";
import { ProfileSetup } from "./pages/ProfileSetup";
import { Scanner } from "./pages/Scanner";
import { Result } from "./pages/Result";
import { ProfileSettings } from "./components/profile/ProfileSettings";
import { ArticleDetail } from "./pages/ArticleDetail";
import { Favorites } from "./pages/Favorites"; // Husk at importere den her!

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Onboarding,
      },
      {
        path: "home",
        Component: Home,
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
]);
