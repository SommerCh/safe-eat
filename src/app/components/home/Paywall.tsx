// import { useNavigate } from "react-router";
// import {
//   ChevronLeft,
//   CreditCard,
//   Search,
//   MessageSquare,
//   Star,
// } from "lucide-react";
// import { Button } from "../../components/ui/button";
// import { Purchases } from "@revenuecat/purchases-capacitor";
// import { Capacitor } from "@capacitor/core";
// import { supabase } from "../../lib/supabase";
// import appLogo from "../../../../public/LogoAndText.png";

// interface PaywallProps {
//   onSuccess: () => void;
// }

// export function Paywall({ onSuccess }: PaywallProps) {
//   const navigate = useNavigate();

//   const handleSubscribe = async () => {
//     const {
//       data: { user },
//     } = await supabase.auth.getUser();

//     if (!user) {
//       alert("Log ind først");
//       return;
//     }

//     if (Capacitor.getPlatform() === "web") {
//       const { error } = await supabase
//         .from("profiles")
//         .update({ is_premium: true })
//         .eq("id", user.id);

//       if (error) {
//         alert("Fejl: " + error.message);
//       } else {
//         onSuccess();
//       }
//       return;
//     }

//     try {
//       const offerings = await Purchases.getOfferings();
//       if (offerings.current?.monthly) {
//         const { customerInfo } = await Purchases.purchasePackage({
//           aPackage: offerings.current.monthly,
//         });

//         if (customerInfo.entitlements.active["safe eat Pro"]) {
//           await supabase
//             .from("profiles")
//             .update({ is_premium: true })
//             .eq("id", user.id);
//           onSuccess();
//         }
//       }
//     } catch (error: any) {
//       if (!error.userCancelled) alert(error.message);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white flex flex-col pb-8 shadow-none">
//       <style>{`
//         .hide-scrollbar::-webkit-scrollbar {
//           display: none;
//         }
//         .hide-scrollbar {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//       `}</style>

//       {/* Top Bar */}
//       <div className="px-6 pt-20 pb-4 flex items-center justify-between bg-white border-b border-slate-100 shadow-none shrink-0">
//         <button
//           onClick={() => navigate(-1)}
//           className="w-10 h-10 flex items-center justify-center bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
//         >
//           <ChevronLeft className="w-6 h-6 text-slate-700 pr-1" />
//         </button>

//         <img
//           src={appLogo}
//           alt="Safe Eat Logo"
//           className="h-14 w-auto object-contain"
//         />

//         <div className="w-10" />
//       </div>

//       <div className="flex-1 overflow-y-auto">
//         <div className="px-6 py-8 flex flex-col space-y-10">
//           {/* Header Section */}
//           <div className="flex flex-col items-center text-center px-2">
//             <h1 className="text-3xl font-bold tracking-tight text-slate-950">
//               Få ro i maven på indkøb
//             </h1>
//             <p className="text-slate-500 mt-3 font-medium text-sm leading-relaxed max-w-[280px]">
//               Lad appen læse de skjulte ingredienser, så du trygt kan handle ind
//               uden stress.
//             </p>
//           </div>

//           {/* Feature Boxes (Minimalistiske) */}
//           <div className="w-full space-y-3 shadow-none">
//             <div className="p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl flex items-center gap-4">
//               <Search className="w-5 h-5 text-[#F4642B]" />
//               <p className="font-semibold text-slate-900 text-sm">
//                 Ubegrænset AI-scanning af varer
//               </p>
//             </div>
//             <div className="p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl flex items-center gap-4">
//               <MessageSquare className="w-5 h-5 text-[#F4642B]" />
//               <p className="font-semibold text-slate-900 text-sm">
//                 Adgang til Safe Eat VIP Discord
//               </p>
//             </div>
//           </div>

//           {/* Swipeable Anmeldelser Section */}
//           <div className="w-full -mx-6 px-6">
//             <h2 className="text-xs font-bold text-slate-900 mb-2.5 ml-1">
//               Hvad siger vores brugere?
//             </h2>
//             <div className="flex overflow-x-auto gap-3 snap-x snap-mandatory hide-scrollbar pb-3 pr-6">
//               {/* Review 1 */}
//               <div className="flex-none w-[75%] max-w-[240px] snap-center p-3 bg-slate-50 border-2 border-slate-100 rounded-xl flex flex-col gap-1.5">
//                 <div className="flex gap-0.5">
//                   {[...Array(5)].map((_, i) => (
//                     <Star
//                       key={i}
//                       className="w-3 h-3 fill-amber-400 text-amber-400"
//                     />
//                   ))}
//                 </div>
//                 <p className="text-xs text-slate-700 font-medium leading-tight">
//                   "Meget nemmere at købe ind, nem at bruge!"
//                 </p>
//                 <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wide">
//                   — Charlotte
//                 </p>
//               </div>

//               {/* Review 2 */}
//               <div className="flex-none w-[75%] max-w-[240px] snap-center p-3 bg-slate-50 border-2 border-slate-100 rounded-xl flex flex-col gap-1.5">
//                 <div className="flex gap-0.5">
//                   {[...Array(5)].map((_, i) => (
//                     <Star
//                       key={i}
//                       className="w-3 h-3 fill-amber-400 text-amber-400"
//                     />
//                   ))}
//                 </div>
//                 <p className="text-xs text-slate-700 font-medium leading-tight">
//                   "Ingen mere stress over skjulte e-numre. Tager bare et
//                   billede."
//                 </p>
//                 <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wide">
//                   — Jacob
//                 </p>
//               </div>

//               {/* Review 3 */}
//               <div className="flex-none w-[75%] max-w-[240px] snap-center p-3 bg-slate-50 border-2 border-slate-100 rounded-xl flex flex-col gap-1.5">
//                 <div className="flex gap-0.5">
//                   {[...Array(5)].map((_, i) => (
//                     <Star
//                       key={i}
//                       className="w-3 h-3 fill-amber-400 text-amber-400"
//                     />
//                   ))}
//                 </div>
//                 <p className="text-xs text-slate-700 font-medium leading-tight">
//                   "Mærkelig den ikke har været opfundet før!"
//                 </p>
//                 <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wide">
//                   — Maria
//                 </p>
//               </div>

//               {/* Review 3 */}
//               <div className="flex-none w-[75%] max-w-[240px] snap-center p-3 bg-slate-50 border-2 border-slate-100 rounded-xl flex flex-col gap-1.5">
//                 <div className="flex gap-0.5">
//                   {[...Array(5)].map((_, i) => (
//                     <Star
//                       key={i}
//                       className="w-3 h-3 fill-amber-400 text-amber-400"
//                     />
//                   ))}
//                 </div>
//                 <p className="text-xs text-slate-700 font-medium leading-tight">
//                   "Dejligt ar man ikke skal have sine læsebriller med på indkøb
//                   mere"
//                 </p>
//                 <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wide">
//                   — Morten
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Pricing Box */}
//           <div className="w-full p-6 border-2 border-[#F4642B] rounded-[32px] bg-white flex flex-col items-center text-center shadow-none">
//             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
//               Månedligt Abonnement
//             </span>
//             <div className="flex items-baseline gap-1">
//               <span className="text-5xl font-extrabold text-slate-950 tracking-tight">
//                 19 kr.
//               </span>
//               <span className="text-slate-500 font-bold text-lg">/md</span>
//             </div>
//             <p className="text-[11px] font-semibold text-slate-400 mt-4 uppercase tracking-wider">
//               Ingen binding. Afmeld når som helst.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Action Button */}
//       <div className="px-6 pt-4 shrink-0 shadow-none">
//         <Button
//           onClick={handleSubscribe}
//           className="w-full h-16 bg-black text-white rounded-2xl text-base font-bold flex items-center justify-center gap-3 shadow-none active:scale-[0.98] transition-all"
//         >
//           <CreditCard className="w-5 h-5" />
//           Abonner nu
//         </Button>
//       </div>
//     </div>
//   );
// }

import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import {
  ChevronLeft,
  CreditCard,
  Search,
  MessageSquare,
  Star,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Purchases } from "@revenuecat/purchases-capacitor";
import { Capacitor } from "@capacitor/core";
import { supabase } from "../../lib/supabase";
import appLogo from "../../../../assets/LogoAndText.png";
import { toast } from "sonner";

interface PaywallProps {
  onSuccess: () => void;
}

export function Paywall({ onSuccess }: PaywallProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubscribe = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      toast.error(t("paywall.login_required", "Log ind først"));
      return;
    }

    if (Capacitor.getPlatform() === "web") {
      const { error } = await supabase
        .from("profiles")
        .update({ is_premium: true })
        .eq("id", user.id);

      if (error) {
        toast.error(t("paywall.error", "Fejl: ") + error.message);
      } else {
        onSuccess();
      }
      return;
    }

    try {
      const offerings = await Purchases.getOfferings();
      if (offerings.current?.monthly) {
        const { customerInfo } = await Purchases.purchasePackage({
          aPackage: offerings.current.monthly,
        });

        if (customerInfo.entitlements.active["safe eat Pro"]) {
          await supabase
            .from("profiles")
            .update({ is_premium: true })
            .eq("id", user.id);
          onSuccess();
        }
      }
    } catch (error: any) {
      if (!error.userCancelled) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col pb-8 shadow-none">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="px-6 pt-6 pb-4 flex items-center justify-between bg-white border-b border-slate-100 shadow-none shrink-0">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-slate-700 pr-1" />
        </button>

        <img
          src={appLogo}
          alt="Safe Eat Logo"
          className="h-14 w-auto object-contain"
        />

        <div className="w-10" />
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="px-6 py-8 flex flex-col space-y-10">
          <div className="flex flex-col items-center text-center px-2">
            <h1 className="text-3xl font-bold tracking-tight text-slate-950">
              {t("paywall.title", "Få ro i maven på indkøb")}
            </h1>
            <p className="text-slate-500 mt-3 font-medium text-sm leading-relaxed max-w-[280px]">
              {t(
                "paywall.subtitle",
                "Lad appen læse de skjulte ingredienser, så du trygt kan handle ind uden stress.",
              )}
            </p>
          </div>

          <div className="w-full space-y-3 shadow-none">
            <div className="p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl flex items-center gap-4">
              <Search className="w-5 h-5 text-[#F4642B]" />
              <p className="font-semibold text-slate-900 text-sm">
                {t("paywall.feature_ai", "Ubegrænset AI-scanning af varer")}
              </p>
            </div>
            <div className="p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl flex items-center gap-4">
              <MessageSquare className="w-5 h-5 text-[#F4642B]" />
              <p className="font-semibold text-slate-900 text-sm">
                {t(
                  "paywall.feature_discord",
                  "Adgang til Safe Eat Discord",
                )}
              </p>
            </div>
          </div>

          <div className="w-full -mx-6 px-6">
            <h2 className="text-xs font-bold text-slate-900 mb-2.5 ml-1">
              {t("paywall.reviews_title", "Hvad siger vores brugere?")}
            </h2>
            <div className="flex overflow-x-auto gap-3 snap-x snap-mandatory hide-scrollbar pb-3 pr-6">
              <div className="flex-none w-[75%] max-w-[240px] snap-center p-3 bg-slate-50 border-2 border-slate-100 rounded-xl flex flex-col gap-1.5">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-xs text-slate-700 font-medium leading-tight">
                  {t(
                    "paywall.review_1_text",
                    '"Meget nemmere at købe ind, nem at bruge!"',
                  )}
                </p>
                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wide">
                  — Charlotte
                </p>
              </div>

              <div className="flex-none w-[75%] max-w-[240px] snap-center p-3 bg-slate-50 border-2 border-slate-100 rounded-xl flex flex-col gap-1.5">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-xs text-slate-700 font-medium leading-tight">
                  {t(
                    "paywall.review_2_text",
                    '"Ingen mere stress over skjulte e-numre. Tager bare et billede."',
                  )}
                </p>
                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wide">
                  — Jacob
                </p>
              </div>

              <div className="flex-none w-[75%] max-w-[240px] snap-center p-3 bg-slate-50 border-2 border-slate-100 rounded-xl flex flex-col gap-1.5">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-xs text-slate-700 font-medium leading-tight">
                  {t(
                    "paywall.review_3_text",
                    '"Mærkelig den ikke har været opfundet før!"',
                  )}
                </p>
                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wide">
                  — Maria
                </p>
              </div>

              <div className="flex-none w-[75%] max-w-[240px] snap-center p-3 bg-slate-50 border-2 border-slate-100 rounded-xl flex flex-col gap-1.5">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-xs text-slate-700 font-medium leading-tight">
                  {t(
                    "paywall.review_4_text",
                    '"Dejligt at man ikke skal have sine læsebriller med på indkøb mere"',
                  )}
                </p>
                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wide">
                  — Morten
                </p>
              </div>
            </div>
          </div>

          <div className="w-full p-6 border-2 border-[#F4642B] rounded-[32px] bg-white flex flex-col items-center text-center shadow-none">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
              {t("paywall.pricing_label", "Månedligt Abonnement")}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-extrabold text-slate-950 tracking-tight">
                {t("paywall.price", "19 kr.")}
              </span>
              <span className="text-slate-500 font-bold text-lg">
                {t("paywall.per_month", "/md")}
              </span>
            </div>
            <p className="text-[11px] font-semibold text-slate-400 mt-4 uppercase tracking-wider">
              {t("paywall.no_binding", "Ingen binding. Afmeld når som helst.")}
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 pt-4 shrink-0 shadow-none">
        <Button
          onClick={handleSubscribe}
          className="w-full h-16 bg-black text-white rounded-2xl text-base font-bold flex items-center justify-center gap-3 shadow-none active:scale-[0.98] transition-all"
        >
          <CreditCard className="w-5 h-5" />
          {t("paywall.subscribe_button", "Abonner nu")}
        </Button>
      </div>
    </div>
  );
}
