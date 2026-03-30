export const CATEGORIES = {
  da: ["Alle", "Nyheder", "Gode råd", "Opskrifter", "Sundhed", "Guides"],
  en: ["All", "News", "Advice", "Recipes", "Health", "Guides"],
};

export const ARTICLES = {
  da: [
    {
      id: 1,
      title:
        "Knæk koden: Sådan gennemskuer du supermarkedets varedeklarationer",
      category: "Gode råd",
      excerpt:
        "Det kan føles som en jungle at navigere i supermarkedets hylder. Vi giver dig genvejene til at spotte skjulte allergener og problematiske ingredienser på få sekunder.",
      image:
        "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?auto=format&fit=crop&q=80&w=1080",
      featured: true,
      content: {
        paragraphs: [
          "Vi kender alle situationen: Man står i supermarkedet i ulvetimen og forsøger desperat at tyde ingredienslisten på et nyt produkt, mens indkøbsvognene suser forbi. Producenterne har det med at bruge faglige termer, der kan gøre det til en akademisk disciplin at regne ud, hvad maden egentlig består af.",
          "Den vigtigste tommelfingerregel for enhver, der lever med kostrestriktioner, er at forstå rækkefølgen. Ingredienser står altid opført efter vægt. Står sukker, hvedemel eller mælkepulver i toppen af listen, udgør det fundamentet for varen. Hvis du scroller længere ned, og en allergen er gemt i en parentes under en ukendt aroma, er det her, faren for alvor lurer.",
          "Uanset om du navigerer udenom gluten, nødder, mælkeprotein eller forsøger at holde et stabilt blodsukker, handler det om at lære industriens små smutveje at kende. Tjek altid for fremhævede typer (ofte fed skrift), og husk at selv velkendte varer pludselig kan skifte opskrift uden varsel på forsiden.",
        ],
        heading: "Lær at læse mellem linjerne",
        tip: "Læs altid listen igen, når du kommer hjem. Lyset i supermarkedet og stress kan hurtigt få øjet til at overse en afgørende detalje.",
      },
    },
    {
      id: 2,
      title:
        "Jagten på det gode brød: Sådan spotter du et ægte glutenfrit bageri",
      category: "Gode råd",
      excerpt:
        "Er du træt af tørt, vakuumpakket supermarkedsbrød? Få guiden til at finde dedikerede håndværksbagerier, hvor sikkerhed og smag går op i en højere enhed.",
      image:
        "https://images.unsplash.com/photo-1519915051686-9fe6ee13633e?auto=format&fit=crop&q=80&w=1080",
      featured: false,
      content: {
        paragraphs: [
          "I mange år har glutenfrit brød været synonymt med tørre færdigvarer, der smuldrede, før de ramte tallerkenen. Men der er sket et internationalt kvantespring i bagerfaget. En ny generation af bagere har droppet de færdige melblandinger og nørder nu i stedet med boghvede, hirse, durra og lange hævetider.",
          "Når du leder efter et godt bageri, skal du kigge efter dedikerede specialister. Et ægte glutenfrit bageri gør det til en dyd, at du aldrig føler dig som en besværlig kunde. Her foregår al produktion under 100 procent kontrollerede forhold, så du trygt kan pege og vælge fra montren uden at frygte krydskontaminering.",
          "Det vigtigste råd er at være kritisk over for almindelige caféer, der skilter med at have 'glutenfrie muligheder'. Bager de med almindeligt hvedemel i samme lokale, vil der uundgåeligt svæve usynligt melstøv i luften, hvilket er nok til at udløse en reaktion hos en cøliakiker. Gå altid efter de specialiserede steder – dit helbred (og dine smagsløg) vil takke dig.",
        ],
        heading: "Når tryghed og smag går hånd i hånd",
        tip: "Søg efter '100% gluten-free bakery' i dit lokalområde eller på rejsen for at undgå steder med risiko for melstøv i luften.",
      },
    },
    {
      id: 3,
      title: "Kasein, albumin og maltodextrin: Dæknavnene din krop hader",
      category: "Sundhed",
      excerpt:
        "Mælk, æg og skjult sukker gemmer sig ofte bag tekniske termer. Vi har samlet oversigten over de ord, der bør få dine alarmklokker til at ringe.",
      image:
        "https://images.unsplash.com/photo-1649531794884-b8bb1de72e68?auto=format&fit=crop&q=80&w=1080",
      featured: false,
      content: {
        paragraphs: [
          "Det ville gøre livet uendeligt meget nemmere for både allergikere og diabetikere, hvis der blot stod 'mælk', 'æg' eller 'sukker' på alle varer. Desværre benytter fødevareindustrien sig ofte af de korrekte biokemiske eller latinske betegnelser, hvilket kan sløre indholdet for den almindelige forbruger.",
          "Står der 'Kasein' eller 'Valle' på en vare, er det mælkeprotein. Ser du 'Lysozym' eller 'Albumin', har det sin oprindelse i æg. Og støder du på 'Maltodextrin' eller 'Dextrose', er der tale om stærkt forarbejdede kulhydrater, der får dit blodsukker til at skyde i vejret hurtigere end almindeligt bord-sukker.",
          "Disse betegnelser fungerer i praksis som en form for forklædning. Selvom det ikke nødvendigvis er for at snyde dig, er det afgørende, at du kender disse 'dæknavne'. Uvidenhed på dette område kan føre til utilsigtede allergiske reaktioner eller uforklarlige udsving i blodsukkeret.",
        ],
        heading: "Gennemsku industriens fagsprog",
        tip: "Brug appens 'Nej-tak-liste' til at gemme de svære ord og E-numre, så du altid har dem lige ved hånden på indkøbsturen.",
      },
    },
    {
      id: 4,
      title: "Spis ude med ro i maven: Din guide til snakken med tjeneren",
      category: "Guides",
      excerpt:
        "Et restaurantbesøg skal være en fornøjelse, ikke en bekymring. Lær, hvordan du kommunikerer dine diætbehov klart og positivt til køkkenet.",
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=1080",
      featured: true,
      content: {
        paragraphs: [
          "At spise på restaurant bør være en festlig og afslappet oplevelse. Alligevel sidder mange med en knude i maven, når tjeneren nærmer sig bordet. Hvad enten du skal undgå bestemte allergener, eller dit måltid skal tilpasses en stram diæt af hensyn til diabetes, ligger nøglen i god kommunikation.",
          "Den bedste strategi starter før, du overhovedet ankommer. Ring til restauranten uden for deres travleste timer (eksempelvis midt på eftermiddagen). En professionel kok sætter enormt stor pris på at få tid til at forberede et fantastisk, sikkert måltid til dig, i stedet for at skulle improvisere midt i aftenrykket.",
          "Når du bestiller ved bordet, så vær venlig, men utvetydig. Undgå bløde formuleringer som 'Jeg foretrækker at undgå...', hvis det reelt betyder 'Jeg bliver alvorligt syg af...'. Vær præcis, så personalet forstår alvoren, og spørg gerne ind til, hvordan de håndterer krydskontaminering i køkkenet.",
        ],
        heading: "Tag ejerskab over dit måltid",
        tip: "Ring altid dagen før for at aftale menuen. Det giver køkkenet arbejdsro, og du kan slappe helt af på selve aftenen.",
      },
    },
    {
      id: 5,
      title: "Slut med slørede mærkater: Nye tider for varedeklarationer",
      category: "Nyheder",
      excerpt:
        "I årevis har producenter kunnet gemme sig bag brede paraplybetegnelser. Nu skærpes kravene til tydelig mærkning af fødevarer internationalt.",
      image:
        "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1080",
      featured: false,
      content: {
        paragraphs: [
          "Det har længe været et smertensbarn for patientforeninger verden over, at mærkning af forarbejdede fødevarer ofte er vag og tvetydig. Men der blæser nye vinde. Flere internationale instanser og lovgivere strammer nu grebet for at sikre forbrugernes ret til at vide præcis, hvad der er i maden.",
          "Tidligere har man ofte kunnet slippe afsted med at skrive 'vegetabilsk olie' uden at deklarere, om den var udvundet af soja, jordnødder eller solsikke. De nye, skærpede standarder kræver en langt mere detaljeret specifikation af hovedallergener og skjulte kulhydrater, uanset hvor tidligt i produktionskæden de er tilføjet.",
          "For den enkelte forbruger betyder udviklingen færre frustrerende opkald til kundeservice og markant mindre gætterier ved supermarkedets hylder. Mange fremtrædende fødevareproducenter har allerede taget de nye standarder til sig og er begyndt at opdatere deres emballager med mere gennemsigtige ingredienslister.",
        ],
        heading: "Transparens frem for gætterier",
        tip: "Hold øje med de nye mærkater i butikkerne – flere produkter begynder at benytte QR-koder, der linker direkte til uddybende ingredienslister og produktionsforhold.",
      },
    },
    {
      id: 6,
      title: "Cremet, grøn og sikker: Den ultimative nøddefrie pesto",
      category: "Opskrifter",
      excerpt:
        "Savner du en klassisk basilikumpesto? Denne opskrift bruger ristede frø og snyder selv de mest inkarnerede madelskere ved bordet.",
      image:
        "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=1080",
      featured: false,
      content: {
        paragraphs: [
          "En god, hjemmelavet pesto er noget af det mest velsmagende tilkøbehør, der findes. Men for nøddeallergikere er den klassiske, genovesiske pesto med pinjekerner desværre et absolut no-go. En typisk lappeløsning er at bruge solsikkekerner, men det resulterer ofte i en lidt grå farve og en bitter eftersmag.",
          "Løsningen er overraskende simpel: Ristede græskarkerner. De indeholder det helt rigtige fedtindhold og bidrager med en dyb, fyldig smag, der til forveksling minder om nødder – helt uden risiko. Blend dem med rigelige mængder frisk basilikum, en koldpresset olivenolie, hvidløg og lidt frisk citronsaft.",
          "Undgår du desuden mælkeprodukter, kan parmesanosten nemt erstattes med et par skefulde gærflager (nutritional yeast). De tilfører præcis den 'ostede' umamismag, retten har brug for. Resultatet er en pesto, der holder sig smukt i køleskabet og nemt tager kampen op mod originalen.",
        ],
        heading: "Hemmeligheden ligger i kernerne",
        tip: "Hæld altid et lille, tyndt lag olivenolie over pestoen i glasset. Olien fungerer som et låg, der forsegler overfladen og forhindrer basilikummen i at oxidere og blive brun.",
      },
    },
    {
      id: 7,
      title: "Fælden med 'spor af': Reel risiko eller juridisk rygdækning?",
      category: "Gode råd",
      excerpt:
        "Advarslen findes på næsten alt, men hvornår skal du reelt lægge varen tilbage på hylden? Vi ser nærmere på industriens mest omdiskuterede sætning.",
      image:
        "https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?auto=format&fit=crop&q=80&w=1080",
      featured: false,
      content: {
        paragraphs: [
          "'Kan indeholde spor af...' er utvivlsomt den mest frustrerende sætning at støde på som allergiker. Er det et udtryk for, at der faktisk er faldet en mandel i produktionen, eller produceres varen blot på en stor fabrik, hvor andre linjer håndterer allergener? Svaret er ofte svævende.",
          "I mange tilfælde fungerer denne mærkning som producentens juridiske skjold mod sagsanlæg. Lovgivningen på området for spor-mærkning er stadig ikke knivskarp, hvilket betyder, at nogle virksomheder har en reel, dokumenteret risiko for krydskontaminering, mens andre bare tilføjer sætningen som ren rutine.",
          "Dette efterlader forbrugeren i et dagligt dilemma. Det overordnede kliniske råd er dog ufravigeligt: Hvis du lider af en svær, anafylaktisk allergi, skal 'spor af' altid betragtes som en reel advarsel. Det er simpelthen ikke værd at gamble med sit helbred over en snack.",
        ],
        heading: "Hvornår skal man tage det alvorligt?",
        tip: "Konsulter altid din egen læge eller diætist for at fastlægge din personlige tolerancetærskel over for spormængder.",
      },
    },
    {
      id: 8,
      title: "Drop sojaen: Få dækket dit proteinbehov på en sikker måde",
      category: "Sundhed",
      excerpt:
        "Plantebaseret mad boomer, men mange køderstatninger er baseret på soja eller hvede. Her er de bedste naturlige og rene alternativer.",
      image:
        "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&q=80&w=1080",
      featured: false,
      content: {
        paragraphs: [
          "Det er blevet utroligt populært at skære ned for kødet, men for folk med soja-allergi eller cøliaki kan plantefars og færdigretter føles som at navigere i et minefelt. Størstedelen af markedets hurtige køderstatninger er nemlig bygget op omkring tekstureret sojaprotein eller hvedegluten (seitan).",
          "Heldigvis er naturen rig på kraftfulde alternativer, der ikke provokerer immunsystemet. Quinoa, boghvede og amarant er fantastiske, gluten- og sojafrie frø, der indeholder alle essentielle aminosyrer. Desuden er bælgfrugter som linser og kikærter glimrende kilder til både protein og komplekse kulhydrater, der sikrer et langsomt og stabilt blodsukker.",
          "Nøglen til succes i det plantebaserede, allergivenlige køkken er at bygge sine måltider op omkring rene, uforarbejdede råvarer i stedet for at forlade sig på industriens færdigprodukter. Det kræver lidt mere tid ved skærebrættet, men din krop vil kvittere for den høje næringsværdi.",
        ],
        heading: "Ren næring fra naturens eget skab",
        tip: "Prøv afskallede hampefrø som topping på din morgenmad. De har en mild, nøddeagtig smag, indeholder ingen soja, og er sprængfyldt med gode proteiner.",
      },
    },
    {
      id: 9,
      title:
        "Rejs sikkert med restriktioner: Sådan undgår du feriens faldgruber",
      category: "Guides",
      excerpt:
        "Sprogbarrierer og en fremmed madkultur kan gøre ferien til en udfordring. Med lidt forberedelse kan du trygt nyde de lokale specialiteter.",
      image:
        "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=1080",
      featured: false,
      content: {
        paragraphs: [
          "Når ferien kalder, glæder de fleste sig til at dykke ned i den lokale madkultur. Men har du en livstruende allergi eller en streng medicinsk diæt, kan spændingen hurtigt overskygges af frygten for misforståelser. Viden om krydskontaminering og præcis ingrediensstyring varierer nemlig enormt fra land til land.",
          "Det mest uundværlige værktøj i din rejsetaske er et professionelt oversat allergikort (et såkaldt 'Chef Card'). Det er et lille dokument på det lokale sprog, der høfligt, men med stor alvor forklarer personalet præcis, hvilke ingredienser du ikke tåler, og hvordan maden skal tilberedes sikkert. Det bygger bro over sprogbarrieren og eliminerer farlige gætterier.",
          "Sørg desuden altid for at pakke et lille lager af blodsukker-venlige eller allergisikre nød-snacks hjemmefra. Skulle I strande på en restaurant eller i en lufthavn, hvor intet er sikkert at indtage, er det uvurderligt at have sit eget med.",
        ],
        heading: "Pak trygheden ned i kufferten",
        tip: "Sørg for at downloade dine medicinske oplysninger og dit allergikort ned på telefonen, så du har adgang til dem, selv når du ikke har wifi.",
      },
    },
    {
      id: 10,
      title: "Festens midtpunkt: Luftig chokoladekage uden mælk og gluten",
      category: "Opskrifter",
      excerpt:
        "Denne opskrift beviser én gang for alle, at allergivenligt bagværk sagtens kan være utroligt snasket og velsmagende.",
      image:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=1080",
      featured: false,
      content: {
        paragraphs: [
          "Glem alt om de tunge, tørre skuffelser, der ofte præsenteres som det 'allergivenlige alternativ' til børnefødselsdagen. Med lidt grundlæggende køkkenkemi kan du bage en kage, der hæver fantastisk op og bevarer en dyb, svampet struktur i flere dage.",
          "Hemmeligheden ligger ikke i dyre specialprodukter, men i reaktionen mellem en mild syre (som æblecidereddike) og natron. Når disse to mødes i dejen, dannes der tusindvis af små luftbobler, som gør kagen let og porøs – helt uden brug af æg eller smør.",
          "Opskriften er utrolig tilgivende. Har du brug for at tage hensyn til blodsukkeret, kan dele af sukkeret med fordel udskiftes med erytritol (f.eks. Sukrin), ligesom du kan eksperimentere med en god glutenfri melblanding. Resultatet er en intens kage, der samler alle gæster om bordet, uanset kostbehov.",
        ],
        heading: "Simpel kemi, fantastisk smag",
        tip: "Pynt kagen med en mælkefri ganache lavet på mørk chokolade og friske hindbær for at balancere den dybe kakaosmag med lidt syre.",
      },
    },
  ],
  en: [
    {
      id: 1,
      title: "Stop Squinting: How to Decode the Ingredient List",
      category: "Advice",
      excerpt:
        "Navigating food labels can be a jungle. We teach you how to spot allergen traps in no time.",
      image:
        "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?auto=format&fit=crop&q=80&w=1080",
      featured: true,
      content: {
        paragraphs: [
          "We’ve all been there. Standing in the supermarket during rush hour, desperately trying to decipher the fine print on a bag of chips while the line keeps growing. It often feels like manufacturers go out of their way to make it as confusing as possible.",
          "But here’s the most important rule of thumb: Ingredients are always listed by weight. What comes first is what the product primarily consists of. If an allergen is tucked away in parentheses far down the list, that’s where you need to pay extra attention.",
          "While regulations help us along the way, they aren't foolproof. Flavorings and additives can be hard to decode, and even if they sound innocent, they can be problematic for allergy sufferers. It's about looking for bolded types, but also knowing the industry's little shortcuts.",
        ],
        heading: "Learn to Read Between the Lines",
        tip: "Always check the signage on the shelf edge and double-check the packaging before putting the item in your basket.",
      },
    },
    {
      id: 2,
      title: "No More Boring Bread: Finding Genuine Gluten-Free Bakeries",
      category: "Advice",
      excerpt:
        "We’ve visited the best craft bakeries in the city. Here are three spots where you'll find bread that tastes like real craftsmanship.",
      image:
        "https://images.unsplash.com/photo-1519915051686-9fe6ee13633e?auto=format&fit=crop&q=80&w=1080",
      featured: false,
      content: {
        paragraphs: [
          "For many years, gluten-free bread has been synonymous with dry, store-bought products. But a revolution has hit the bakeries. A new generation of bakers has ditched the easy fixes and is working with buckwheat, millet, and long fermentation times instead.",
          "Specialists make it a virtue that you should never feel like a difficult customer. Here, everything happens under controlled conditions, so you can safely choose exactly what you want from the display.",
          "The most important advice, however, is to be cautious with cafés that 'also have something gluten-free.' If they bake with regular flour in the same room, flour dust lingers in the air, which can be enough to cause issues. Go for the dedicated bakeries—you can taste the difference.",
        ],
        heading: "Where Safety and Flavor Go Hand in Hand",
        tip: "Choose bakeries that specialize in allergy-friendly baking if you want to be absolutely sure to avoid flour dust.",
      },
    },
    {
      id: 3,
      title: "Casein and Albumin? The Words Your Allergy Hates",
      category: "Health",
      excerpt:
        "Milk and eggs often hide behind technical terms. Here is the list of words you need to watch out for.",
      image:
        "https://images.unsplash.com/photo-1649531794884-b8bb1de72e68?auto=format&fit=crop&q=80&w=1080",
      featured: false,
      content: {
        paragraphs: [
          "It would be easy if everything just said 'milk' or 'egg.' But the food industry often uses technical or Latin names. If you see 'Casein' on a product, it means milk protein. If 'Lysozyme' is in the ingredients list, it's derived from eggs.",
          "These terms act almost like a disguise. Albumin might sound chemical, but in reality, it's just egg white protein used as a binder. It’s convenient for the manufacturer but can be critical for you.",
          "Why do they do it? Often because it's the correct professional term for the specific component. Your job is to know these aliases so you aren't fooled by an inviting product cover.",
        ],
        heading: "Decipher the Ingredient List",
        tip: "Use the app's 'No-list' to save difficult words so you always have them handy when shopping.",
      },
    },
    {
      id: 4,
      title: "Dining Out Without the Stomach Ache: Talking to Your Waiter",
      category: "Guides",
      excerpt:
        "Going to a restaurant doesn't have to be anxiety-inducing. We guide you on how to ask the right questions.",
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=1080",
      featured: true,
      content: {
        paragraphs: [
          "Eating at a restaurant should be a great experience, not a food safety exam. Yet, many sit with a knot in their stomach when the waiter approaches the table. The key to a safe evening lies in communication before and during the visit.",
          "The best thing you can do is call the restaurant in advance outside their busy hours. Ask about their routines in the kitchen. A skilled chef will appreciate that you give them time to prepare a proper, safe meal rather than surprising them during the evening rush.",
          "When you're at the table, be polite but unambiguous. Don't use words like 'I prefer to avoid' if it actually means you'll have a severe allergic reaction. Be precise so the kitchen understands the gravity without feeling attacked.",
        ],
        heading: "Take Control of Your Evening",
        tip: "Call the restaurant the day before between 2 PM and 4 PM, when the kitchen is usually quiet, to arrange your meal.",
      },
    },
    {
      id: 5,
      title: "Breakthrough: New Laws Finally Tighten Loose Labeling",
      category: "News",
      excerpt:
        "Soon it will be harder for manufacturers to hide behind broad descriptions. We look at the new, stricter rules.",
      image:
        "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1080",
      featured: false,
      content: {
        paragraphs: [
          "It has long been a pain point for allergy sufferers and patient organizations that food labeling is often ambiguous. But help is on the way. New policies will make it harder to use umbrella terms without specifying the source.",
          "Previously, companies could get away with writing 'vegetable oil' without mentioning whether it was based on soy or peanuts. The new rules push for all major allergens to be spelled out in detail, regardless of where they enter the production chain.",
          "As these standards take effect globally, many large manufacturers have already started adapting their packaging. For you, this means less guessing and significantly less time spent calling customer service to find out what you are actually putting in your mouth.",
        ],
        heading: "No More Guesswork",
        tip: "Keep an eye out for the new labels in the supermarket—they will often feature a QR code linking directly to a complete ingredient list.",
      },
    },
    {
      id: 6,
      title: "Creamy, Green, and Pine Nut-Free: The Ultimate 'Safe' Pesto",
      category: "Recipes",
      excerpt:
        "Do you miss a good pesto but don't dare touch nuts? Here is the recipe for a basil pesto that fools everyone.",
      image:
        "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=1080",
      featured: false,
      content: {
        paragraphs: [
          "A good, homemade pesto is one of the best things, but for nut allergy sufferers, classic Genovese pesto with pine nuts is a no-go. Many try replacing the nuts with sunflower seeds, but that often results in a slightly gray and bitter taste.",
          "The solution is surprisingly simple: Roasted pumpkin seeds. They have the right fat content and provide a deep, nutty flavor without a trace of actual nuts. Blend them with lots of fresh basil, a good olive oil, garlic, and a little lemon juice.",
          "If you also avoid dairy, you can easily replace the parmesan cheese with a few spoonfuls of nutritional yeast, which adds that umami flavor that would otherwise be missing. The pesto keeps wonderfully in the fridge and tastes just as good as the original.",
        ],
        heading: "The Secret is in the Seeds",
        tip: "Pour a thin layer of olive oil over the pesto in the jar. This seals the surface and prevents the basil from turning dark.",
      },
    },
    {
      id: 7,
      title: "The 'Traces Of' Trap: Real Risk or Just Legal Coverage?",
      category: "Advice",
      excerpt:
        "Manufacturers often use cautionary labels about traces. But when should you actually take it seriously?",
      image:
        "https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?auto=format&fit=crop&q=80&w=1080",
      featured: false,
      content: {
        paragraphs: [
          "'May contain traces of nuts.' This is probably the most frustrating sentence for any allergy sufferer. Is it because the baker dropped an almond in the dough, or is it just because the item is produced in the same factory as something else? The answer is rarely clear.",
          "Many manufacturers use the phrase as legal insurance. There are no strict rules on exactly when the warning must be applied. For some companies, there is a real risk of cross-contamination, while for others, it's just boilerplate text.",
          "This puts you in a difficult spot. But our advice is clear: If you have a very low tolerance or have had severe reactions in the past, 'traces of' should be taken seriously. It's not worth the risk with your lunch.",
        ],
        heading: "Risk or Legal Shield?",
        tip: "In cases of life-threatening allergies, 'may contain traces of' should always be considered a red flag.",
      },
    },
    {
      id: 8,
      title: "Ditch the Soy: How to Get Enough Protein Without the Beans",
      category: "Health",
      excerpt:
        "Soy is in almost all meat substitutes. We show you the strong and safe alternatives that keep you full all day.",
      image:
        "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&q=80&w=1080",
      featured: false,
      content: {
        paragraphs: [
          "Eating plant-based has become incredibly popular, but for soy allergy sufferers, it can feel like navigating a minefield. Almost all meat substitutes, from fake ground beef to sausages, are based on soy protein, which rules out a lot of convenience food.",
          "Fortunately, you don't have to miss out on proteins. Quinoa and amaranth are fantastic, gluten- and soy-free seeds that contain all the essential amino acids. Furthermore, lentils and chickpeas are excellent alternatives that are very filling and can be used in everything from dahl to patties.",
          "The trick is to build your meals around whole foods rather than processed products. It requires a little more prep in the kitchen, but on the upside, you know exactly what you're getting, and your body will thank you for the natural ingredients.",
        ],
        heading: "Protein Directly From Nature",
        tip: "Use hemp seeds as a topping on your breakfast. They taste slightly nutty, are soy-free, and are packed with protein.",
      },
    },
    {
      id: 9,
      title: "Travel Bug of the Wrong Kind? Traveling Safely Abroad",
      category: "Guides",
      excerpt:
        "Language barriers and foreign food cultures can be a dangerous mix for allergy sufferers. Here's how to prepare.",
      image:
        "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=1080",
      featured: false,
      content: {
        paragraphs: [
          "When heading out on vacation, we look forward to local specialties. But if you have a severe food allergy, the excitement can quickly turn into worry. In many countries, awareness of cross-contamination is not always at the same level as back home.",
          "The most important weapon in your suitcase is a translated allergy card. A small note that clearly and plainly explains in the local language that your allergy is life-threatening, and exactly which ingredients they must avoid in the kitchen. This removes the language barrier and takes misunderstandings out of the equation.",
          "Always have some emergency snacks in your bag in case you end up at a restaurant that simply cannot guarantee a safe meal. It is better to eat a brought-along granola bar than to spend the next day of your vacation at the local hospital.",
        ],
        heading: "Pack Safety in Your Suitcase",
        tip: "Download the app's allergy card in the local language directly to your phone, so you always have it ready, even without the internet.",
      },
    },
    {
      id: 10,
      title: "The Chocolate Cake That Impresses: Fluffy, Moist, and Dairy-Free",
      category: "Recipes",
      excerpt:
        "We've found the perfect recipe that everyone can enjoy. No one will guess there's neither butter nor milk.",
      image:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=1080",
      featured: false,
      content: {
        paragraphs: [
          "Forget about dry and boring allergy-friendly baking. This cake uses a simple kitchen trick to make it rise perfectly and stay moist for days. The secret lies in the reaction between apple cider vinegar and baking soda.",
          "You just need basic pantry staples: flour, sugar, cocoa, baking powder, baking soda, oil, and water. It sounds almost too easy to be true, but the acid from the vinegar makes the soda bubble up and create the perfect texture.",
          "The result is an intense and delicious chocolate cake that stays fresh for a long time. It’s the ideal cake to bring to a party because it tastes great, and everyone can join in—no matter their dietary needs.",
        ],
        heading: "Kitchen Magic",
        tip: "Decorate the cake with dark chocolate and fresh berries for a professional look.",
      },
    },
  ],
};
