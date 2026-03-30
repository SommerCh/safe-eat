import { Home, ScanLine, User } from "lucide-react";
import { Link, useLocation } from "react-router";
import { useTranslation } from "react-i18next";

export function BottomNav() {
  const { t } = useTranslation();
  const location = useLocation();

  const navItems = [
    { path: "/home", icon: Home, label: t("nav.home", "Hjem") },
    { path: "/setup", icon: User, label: t("nav.profile", "Profil") },
    { path: "/scanner", icon: ScanLine, label: t("nav.scan", "Scan") },
  ];

  return (
    <nav className="w-full bg-white border-t border-gray-100 shrink-0">
      <div className="max-w-md mx-auto flex justify-around items-center h-16 px-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center gap-1 px-4 py-2 transition-all active:scale-95 ${
                isActive ? "text-[#106db9]" : "text-gray-400"
              }`}
            >
              <Icon
                className={`w-6 h-6 ${isActive ? "stroke-[2.5]" : "stroke-2"}`}
              />
              <span className="text-[10px] font-bold uppercase tracking-wide">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}