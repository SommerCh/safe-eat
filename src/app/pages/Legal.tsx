import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { ChevronLeft, AlertTriangle } from "lucide-react";

export function LegalPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="bg-white pb-10">
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 py-4 flex items-center z-10">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
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
            <AlertTriangle className="w-6 h-6" />
            <h3 className="font-bold text-[#F4642B] text-lg">
              {t("legal.disclaimer_title", "Vigtig Ansvarsfraskrivelse")}
            </h3>
          </div>
          <div className="space-y-3 text-sm text-amber-900/80 leading-relaxed">
            <p>
              {t(
                "legal.disclaimer_p1",
                "SafeEat er et hjælpeværktøj baseret på AI-teknologi (Google Gemini). AI kan begå fejl, læse tekst forkert eller overse ingredienser pga. dårlig belysning eller utydelig emballage.",
              )}
            </p>
            <p className="font-bold">
              {t(
                "legal.disclaimer_p2",
                "Du skal ALTID kontrollere den fysiske varedeklaration på produktet før indtagelse.",
              )}
            </p>
            <p>
              {t(
                "legal.disclaimer_p3",
                "Udvikleren af SafeEat kan ikke holdes ansvarlig for allergiske reaktioner eller helbredsmæssige følger opstået som følge af brug af appen.",
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
                "Adgang til SafeEat Premium koster 19 kr. om måneden. Betalingen håndteres sikkert gennem din Apple ID-konto og bekræftes ved køb.",
              )}
            </p>
            <div className="grid gap-4">
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900">
                  {t("legal.subs_auto_title", "Automatisk fornyelse")}
                </h4>
                <p>
                  {t(
                    "legal.subs_auto_p",
                    "Abonnementet fornyes automatisk hver måned, medmindre automatisk fornyelse slås fra senest 24 timer før udløbet af den nuværende periode.",
                  )}
                </p>
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900">
                  {t("legal.subs_cancel_title", "Opsigelse")}
                </h4>
                <p>
                  {t(
                    "legal.subs_cancel_p",
                    "Du kan når som helst administrere eller opsige dit abonnement i dine indstillinger på din iPhone.",
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
                  "Din e-mail og dit navn gemmes sikkert via Supabase. Dette er nødvendigt for at administrere din profil.",
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
                  "Dine valgte allergier, diæter og din 'Personlige liste' gemmes udelukkende lokalt på din telefon (LocalStorage).",
                )}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 flex items-center gap-2">
                {t("legal.privacy_images_title", "Billedbehandling")}
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed ml-3.5">
                {t(
                  "legal.privacy_images_p",
                  "Når du scanner, sendes billedet til Google AI for tekst-analyse. Billedet gemmes ikke permanent.",
                )}
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2 text-slate-900">
            <h3 className="text-xl text-[#F4642B] font-bold">
              {t("legal.rights_title", "Dine Rettigheder")}
            </h3>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            {t(
              "legal.rights_p",
              "Du har til enhver tid ret til at få dine data slettet. Du kan rydde dine lokale allergidata direkte på din profilside.",
            )}
          </p>
        </section>
      </main>
    </div>
  );
}
