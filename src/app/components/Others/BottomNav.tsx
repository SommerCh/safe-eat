import { Home, ScanLine, User } from "lucide-react";
import { Link, useLocation } from "react-router";

export function BottomNav() {
  const location = useLocation();

  const navItems = [
    { path: "/home", icon: Home, label: "Hjem" },
    { path: "/setup", icon: User, label: "Profil" },
    { path: "/scanner", icon: ScanLine, label: "Scan" },
    // { path: "/dictionary", icon: BookOpen, label: "Ordbog" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-bottom z-50">
      <div className="max-w-md mx-auto flex justify-around items-center h-16 px-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                isActive
                  ? "text-[#106db9]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Icon
                className={`w-6 h-6 ${isActive ? "stroke-[2.5]" : "stroke-2"}`}
              />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
