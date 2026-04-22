import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { ChevronLeft, AlertTriangle } from "lucide-react";

export function LegalPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="bg-white min-h-screen pb-[env(safe-area-inset-bottom)]">
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 pt-[calc(env(safe-area-inset-top)+16px)] pb-4 flex items-center z-10">
        <button
          onClick={() => navigate(-1)}
          className="w-12 h-12 flex items-center justify-center bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-slate-700 pr-1" />
        </button>
        <h1 className="ml-2 font-bold text-slate-900 text-lg">
          {t("legal.header", "Vilkår & Privatliv")}
        </h1>
      </header>
      <main className="max-w-2xl mx-auto px-6 py-8 space-y-10">
        <section className="space-y-2">
          <p className="text-sm text-slate-400 font-medium uppercase tracking-wider">
            {t("legal.last_updated", "Sidst opdateret: 27. marts 2026")}
          </p>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {t("legal.main_title", "Gennemsigtighed")}{" "}
            <span className="text-[#F4642B]">&</span>{" "}
            {t("legal.main_title_2", "Sikkerhed")}
          </h2>
          <p className="text-slate-500 leading-relaxed">
            {t(
              "legal.intro",
              "Her kan du læse om, hvordan vi behandler dine data, og hvad du skal være opmærksom på, når du bruger SafeEat.",
            )}
          </p>
        </section>

        <section className="p-6 bg-amber-50 border-2 border-[#F4642B] rounded-[2rem] space-y-4">
          <div className="flex items-center gap-2 text-[#F4642B]">
            <AlertTriangle className="w-6 h-6 shrink-0" />
            <h3 className="font-bold text-[#F4642B] text-lg">
              {t("legal.disclaimer_title", "Vigtig Ansvarsfraskrivelse")}
            </h3>
          </div>
          <div className="space-y-3 text-sm text-amber-900/80 leading-relaxed">
            <p>
              {t(
                "legal.disclaimer_p1",
                "SafeEat er udelukkende et informations- og hjælpeværktøj baseret på AI-teknologi (Google Gemini). Appen yder ikke medicinsk rådgivning, diagnosticering eller behandling.",
              )}
            </p>
            <p className="font-bold">
              {t(
                "legal.disclaimer_p2",
                "AI kan begå fejl. Du skal ALTID kontrollere den fysiske varedeklaration på produktet før indtagelse.",
              )}
            </p>
            <p>
              {t(
                "legal.disclaimer_p3",
                "Udvikleren af SafeEat fraskriver sig ethvert ansvar for allergiske reaktioner, helbredsmæssige følger eller skader opstået som følge af tillid til information givet af appen.",
              )}
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-2 text-slate-900">
            <h3 className="text-xl text-[#F4642B] font-bold">
              {t("legal.subs_title", "Abonnement & Betaling")}
            </h3>
          </div>
          <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
            <p>
              {t(
                "legal.subs_p1",
                "Adgang til SafeEat Premium koster 19 kr. om måneden. Betalingen debiteres din Apple ID-konto ved bekræftelse af købet.",
              )}
            </p>
            <p>
              {t(
                "legal.subs_p2",
                "Grunden til, at appen koster penge, er, at hver eneste scanning af en varedeklaration kræver et direkte kald til en avanceret AI-tjeneste. Dette koster et lille beløb per billede, og dit abonnement dækker disse løbende AI- og serveromkostninger.",
              )}
            </p>
            <div className="grid gap-4 pt-2">
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900">
                  {t("legal.subs_auto_title", "Automatisk fornyelse")}
                </h4>
                <p>
                  {t(
                    "legal.subs_auto_p",
                    "Abonnementet fornyes automatisk, og din konto vil blive debiteret for fornyelse inden for 24 timer før udløbet af den nuværende periode, medmindre automatisk fornyelse slås fra forinden.",
                  )}
                </p>
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900">
                  {t("legal.subs_cancel_title", "Opsigelse & Vilkår")}
                </h4>
                <p>
                  {t(
                    "legal.subs_cancel_p",
                    "Du kan administrere og opsige abonnementet i dine iPhone-kontoindstillinger. Brugen af appen er underlagt Apples standard Terms of Use (EULA).",
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-2 text-slate-900">
            <h3 className="text-xl text-[#F4642B] font-bold">
              {t("legal.privacy_title", "Privatlivspolitik (GDPR)")}
            </h3>
          </div>

          <div className="grid gap-6">
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 flex items-center gap-2">
                {t("legal.privacy_account_title", "Brugerkonto & Login")}
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed ml-3.5">
                {t(
                  "legal.privacy_account_p",
                  "Din e-mail og dit navn gemmes via Supabase (vores databaseudbyder). Når du scanner, sendes billedet til Google LLC til AI-analyse, men gemmes ikke permanent til træning.",
                )}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 flex items-center gap-2">
                {t("legal.privacy_health_title", "Helbredsdata (Allergier)")}
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed ml-3.5">
                {t(
                  "legal.privacy_health_p",
                  "Dine valgte allergier og diæter gemmes udelukkende lokalt på din telefon. De deles ikke med vores servere.",
                )}
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2 text-slate-900">
            <h3 className="text-xl text-[#F4642B] font-bold">
              {t("legal.rights_title", "Dine Rettigheder & Alder")}
            </h3>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            {t(
              "legal.rights_p",
              "Du har til enhver tid ret til at få slettet dine data. Du skal være mindst 13 år (USA) eller opfylde din lokale myndighedsalder (EU) for at bruge appen.",
            )}
          </p>
        </section>

        <section className="pt-4 border-t border-slate-100">
          <div className="bg-slate-50 rounded-2xl p-6 text-center space-y-2">
            <h4 className="font-bold text-slate-900">
              {t("legal.contact_title", "Har du spørgsmål?")}
            </h4>
            <p className="text-sm text-slate-500">
              {t("legal.contact_p", "Som dataansvarlig står vi klar til at hjælpe dig. Kontakt os på:")}
            </p>
            <a href="mailto:medgangnu@gmail.com" className="text-[#106db9] font-bold text-sm hover:underline">
              medgangnu@gmail.com
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}