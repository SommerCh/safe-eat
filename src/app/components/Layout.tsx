
import { Outlet, useLocation, ScrollRestoration } from "react-router";
import { BottomNav } from "./BottomNav";

export function Layout() {
  const location = useLocation();
   
  // Skjul BottomNav på onboarding + result 
  const hideNav = location.pathname === "/" || location.pathname === "/result";

  return (
    <>
      <ScrollRestoration />
      <Outlet />
      {!hideNav && <BottomNav />}
    </>
  );
}