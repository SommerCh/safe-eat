import { useNavigate } from "react-router";
import { ChevronLeft, AlertTriangle } from "lucide-react";

export function LegalPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white pb-12">
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 py-4 flex items-center z-10">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-slate-50 rounded-full transition-all active:scale-95"
          aria-label="Gå tilbage"
        >
          <ChevronLeft className="w-6 h-6 text-slate-900" />
        </button>
        <h1 className="ml-2 font-bold text-slate-900 text-lg">
          Vilkår & Privatliv
        </h1>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-8 space-y-10">
        <section className="space-y-2">
          <p className="text-sm text-slate-400 font-medium uppercase tracking-wider">
            Sidst opdateret: 27. marts 2026
          </p>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Gennemsigtighed <span className="text-[#F4642B]">&</span> Sikkerhed
          </h2>
          <p className="text-slate-500 leading-relaxed">
            Her kan du læse om, hvordan vi behandler dine data, og hvad du skal
            være opmærksom på, når du bruger SafeEat.
          </p>
        </section>

        <section className="p-6 bg-amber-50 border-2 border-[#F4642B] rounded-[2rem] space-y-4">
          <div className="flex items-center gap-2 text-[#F4642B]">
            <AlertTriangle className="w-6 h-6" />
            <h3 className="font-bold text-[#F4642B] text-lg">
              Vigtig Ansvarsfraskrivelse
            </h3>
          </div>
          <div className="space-y-3 text-sm text-amber-900/80 leading-relaxed">
            <p>
              SafeEat er et hjælpeværktøj baseret på{" "}
              <span className="font-bold">AI-teknologi (Google Gemini)</span>.
              AI kan begå fejl, læse tekst forkert eller overse ingredienser
              pga. dårlig belysning eller utydelig emballage.
            </p>
            <p className="font-bold">
              Du skal ALTID kontrollere den fysiske varedeklaration på produktet
              før indtagelse.
            </p>
            <p>
              Udvikleren af SafeEat kan ikke holdes ansvarlig for allergiske
              reaktioner eller helbredsmæssige følger opstået som følge af brug
              af appen.
            </p>
          </div>
        </section>

        {/* NY SEKTION: ABONNEMENT & BETALING */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 text-slate-900">
            <h3 className="text-xl text-[#F4642B] font-bold">
              Abonnement & Betaling
            </h3>
          </div>
          <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
            <p>
              Adgang til SafeEat Premium koster{" "}
              <strong>19 kr. om måneden</strong>. Betalingen håndteres sikkert
              gennem din Apple ID-konto og bekræftes ved køb.
            </p>
            <div className="grid gap-4">
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900">
                  Automatisk fornyelse
                </h4>
                <p>
                  Abonnementet fornyes automatisk hver måned, medmindre
                  automatisk fornyelse slås fra senest 24 timer før udløbet af
                  den nuværende periode. Din konto vil blive debiteret for
                  fornyelse inden for 24 timer før afslutningen af den aktuelle
                  periode.
                </p>
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900">Opsigelse</h4>
                <p>
                  Du kan når som helst administrere eller opsige dit abonnement
                  i dine
                  <strong>
                    {" "}
                    indstillinger på din iPhone
                  </strong> (Indstillinger {">"} Apple ID {">"} Abonnementer).
                  Opsigelsen træder i kraft efter udløbet af den nuværende
                  betalingsperiode.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-2 text-slate-900">
            <h3 className="text-xl text-[#F4642B] font-bold">
              Privatlivspolitik (GDPR)
            </h3>
          </div>

          <div className="grid gap-6">
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 flex items-center gap-2">
                Brugerkonto & Login
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed ml-3.5">
                Din e-mail og dit navn gemmes sikkert via{" "}
                <strong>Supabase</strong>. Dette er nødvendigt for at
                administrere din profil og give dig adgang til appen.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 flex items-center gap-2">
                Helbredsdata (Allergier)
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed ml-3.5">
                Dine valgte allergier, diæter og din "Personlige liste" gemmes{" "}
                <strong>
                  udelukkende lokalt på din telefon (LocalStorage)
                </strong>
                . Vi har ikke adgang til disse data, og de sendes aldrig til
                vores servere.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 flex items-center gap-2">
                Billedbehandling
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed ml-3.5">
                Når du scanner, sendes billedet til Google AI for tekst-analyse.
                Billedet gemmes ikke permanent og bruges kun til den aktuelle
                analyse.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2 text-slate-900">
            <h3 className="text-xl text-[#F4642B] font-bold">
              Dine Rettigheder
            </h3>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            Du har til enhver tid ret til at få dine data slettet. Du kan rydde
            dine lokale allergidata direkte på din profilside, og du kan
            permanent slette din brugerkonto under "Indstillinger" i appen.
          </p>
        </section>
      </main>
    </div>
  );
}
