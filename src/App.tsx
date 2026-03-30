console.log("3. App.tsx filen bliver læst nu...");

import { useEffect } from "react";
import { RouterProvider } from "react-router";
import { router } from "./app/routes";
import { ProfileProvider } from "./app/context/ProfileContext";
import { Toaster } from "./app/components/ui/sonner";
import { Purchases, LOG_LEVEL } from "@revenuecat/purchases-capacitor";
import { Capacitor } from "@capacitor/core";

function App() {
  useEffect(() => {
    const setupRevenueCat = async () => {
      const platform = Capacitor.getPlatform();

      if (platform === "web") {
        console.warn(
          "RevenueCat understøttes ikke på web - springer konfiguration over.",
        );
        return;
      }

      await Purchases.setLogLevel({ level: LOG_LEVEL.DEBUG });
      await Purchases.configure({
        apiKey: "test_wGFcLUFKnHnOKOoCMQtogkyUUsM",
      });

      console.log("RevenueCat konfigureret på " + platform);
    };

    setupRevenueCat();
  }, []);

  return (
    <ProfileProvider>
      <RouterProvider router={router} />
      <Toaster />
    </ProfileProvider>
  );
}

export default App;
