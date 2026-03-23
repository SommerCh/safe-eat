import { AlertTriangle, ShoppingBag, Users, Heart } from "lucide-react";
import { useNavigate } from "react-router";

export function QuickTips() {
  const navigate = useNavigate();

  const handleTipClick = (id: number) => {
    switch (id) {
      case 3:
        window.open(
          "https://discord.com/channels/1484102582183133276/1484102582837313578",
          "_blank",
        );
        break;
      case 4:
        navigate("/favorites");
        break;
      default:
        break;
    }
  };

  const QUICK_TIPS = [
    {
      id: 1,
      icon: AlertTriangle,
      title: "Dobbelttjek altid",
      description: "Producenter kan ændre opskrifter uden varsel",
    },
    {
      id: 2,
      icon: ShoppingBag,
      title: "Scan før køb",
      description: "Brug appen i butikken for sikker indkøb",
    },
    {
      id: 3,
      icon: Users,
      title: "Del dine erfaringer",
      description: "Hop ind på vores Discord og hjælp andre",
    },
    {
      id: 4,
      icon: Heart,
      title: "Gem dine favoritter",
      description: "Se din personlige liste over sikre produkter",
    },
  ];

  return (
    <section>
      <h2 className="text-lg font-semibold text-gray-900 mb-4 px-1">
        Hurtige tips
      </h2>

      <div className="grid grid-cols-2 gap-3 pb-4">
        {QUICK_TIPS.map((tip) => {
          const Icon = tip.icon;
          return (
            <button
              key={tip.id}
              onClick={() => handleTipClick(tip.id)}
              className="bg-white border border-gray-100 rounded-2xl p-4 text-left active:scale-[0.98] transition-transform shadow-sm"
            >
              <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                <Icon className="w-5 h-5 text-blue-900" />
              </div>
              <h3 className="text-gray-900 font-semibold text-[14px] leading-tight mb-1">
                {tip.title}
              </h3>
              <p className="text-gray-500 text-[12px] leading-snug">
                {tip.description}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
