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
          "Den vigtigste tommelfingerregel for enhver, der lever med kostrestriktioner, er at forstå rækkefølgen. Ingredienser står altid opført efter vægt. Står sukker, hvedemel eller mælkepulver i toppen af listen, udgør det fundamentet for varen. Hvis du scroller længere ned, og et allergen er gemt i en parentes under en ukendt aroma, er det her, faren for alvor lurer.",
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
          "Det vigtigste råd er at være kritisk over for almindelige caféer, der skilter med at have 'glutenfrie muligheder'. Bager de med almindeligt hvedemel i samme lokale, vil der uundgåeligt svæve usynligt melstøv i luften, hvilket er nok til at udløse en reaktion hos en cøliakiker. Gå altid efter de specialiserede steder – dit helbred vil takke dig.",
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
          "Står der 'Kasein' eller 'Valle' på en vare, er det mælkeprotein. Ser du 'Lysozym' eller 'Albumin', har det sin oprindelse i æg. Og støder du på 'Maltodextrin' eller 'Dextrose', er der tale om stærkt forarbejdede kulhydrater, der får dit blodsukker hurtigere op end almindeligt bord-sukker.",
          "Disse betegnelser fungerer i praksis som en form for forklædning. Selvom det ikke nødvendigvis er for at snyde dig, er det afgørende, at du kender disse 'dæknavne'. Uvidenhed på dette område kan føre til utilsigtede allergiske reaktioner eller uforklarlige udsving i blodsukkeret.",
        ],
        heading: "Gennemsku industriens fagsprog",
        tip: "Brug appens 'Sortliste' til at gemme de svære ord og E-numre, så du altid har dem lige ved hånden på indkøbsturen.",
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
          "At spise på restaurant bør være en festlig og afslappet oplevelse. Alligevel sidder mange med en knude i maven, når tjeneren nærmer sig bordet. Hvad enten du skal undgå bestemte allergener, eller dit måltid skal tilpasses en stram diæt, ligger nøglen i god kommunikation.",
          "Den bedste strategi starter før, du overhovedet ankommer. Ring til restauranten uden for deres travleste timer. En professionel kok sætter enormt stor pris på at få tid til at forberede et fantastisk, sikkert måltid til dig, i stedet for at skulle improvisere midt i aftenrykket.",
          "Når du bestiller ved bordet, så vær venlig, men utvetydig. Undgå bløde formuleringer som 'Jeg foretrækker at undgå...', hvis det reelt betyder 'Jeg bliver alvorligt syg af...'. Vær præcis, så personalet forstår alvoren.",
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
          "Det har længe været et smertensbarn for patientforeninger, at mærkning af fødevarer ofte er vag og tvetydig. Men der blæser nye vinde. Flere internationale instanser og lovgivere strammer nu grebet for at sikre forbrugernes ret til at vide præcis, hvad der er i maden.",
          "Tidligere har man ofte kunnet slippe afsted med at skrive 'vegetabilsk olie' uden at deklarere, om den var udvundet af soja, jordnødder eller solsikke. De nye, skærpede standarder kræver en langt mere detaljeret specifikation af hovedallergener.",
          "For den enkelte forbruger betyder udviklingen færre frustrerende opkald til kundeservice og markant mindre gætterier ved supermarkedets hylder. Mange producenter har allerede taget de nye standarder til sig.",
        ],
        heading: "Transparens frem for gætterier",
        tip: "Hold øje med de nye mærkater i butikkerne – flere produkter begynder at benytte QR-koder, der linker direkte til uddybende ingredienslister.",
      },
    },
    {
      id: 6,
      title: "Cremet, grøn og sikker: Den ultimative nøddefrie pesto",
      category: "Opskrifter",
      excerpt:
        "Savner du en klassisk basilikumpesto? Denne opskrift bruger ristede frø og snyder selv de mest inkarnerede madelskere ved bordet.",
      image:
        "https://images.unsplash.com/photo-1445847562439-f251c3799ea5?q=80&w=1080&auto=format&fit=crop",
      featured: false,
      content: {
        paragraphs: [
          "En god pesto er noget af det mest velsmagende tilbehør. Men for nøddeallergikere er den klassiske pesto med pinjekerner desværre udelukket. Løsningen er overraskende simpel: Ristede græskarkerner.",
          "De indeholder det helt rigtige fedtindhold og bidrager med en dyb smag, der minder om nødder – helt uden risiko. Herunder får du fremgangsmåden til en sikker og cremet udgave.",
        ],
        ingredients: [
          "50 g græskarkerner",
          "1 stor potte frisk basilikum",
          "1 dl god olivenolie",
          "1 fed hvidløg",
          "Saften fra en halv citron",
          "Salt og peber",
          "2 spsk gærflager (valgfrit)",
        ],
        instructions: [
          "Rist græskarkernerne på en tør pande til de popper let.",
          "Blend kernerne groft i en minihakker.",
          "Tilsæt basilikum, hvidløg og citronsaft.",
          "Tilsæt olien i en tynd stråle, mens du blender.",
          "Smag til med salt og peber.",
        ],
        heading: "Hemmeligheden ligger i kernerne",
        tip: "Hæld altid et lille lag olivenolie over pestoen i glasset for at forhindre den i at oxidere og blive brun.",
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
          "'Kan indeholde spor af...' er utvivlsomt den mest frustrerende sætning at støde på som allergiker. Er det et udtryk for, at der faktisk er faldet en mandel i produktionen, eller produceres varen blot på en fabrik, hvor andre linjer håndterer allergener?",
          "I mange tilfælde fungerer denne mærkning som producentens juridiske skjold mod sagsanlæg. Lovgivningen er stadig ikke knivskarp, hvilket betyder, at nogle virksomheder har en reel risiko for krydskontaminering, mens andre bare tilføjer sætningen som rutine.",
          "Det overordnede kliniske råd er dog ufravigeligt: Hvis du lider af en svær, anafylaktisk allergi, skal 'spor af' altid betragtes som en reel advarsel. Det er ikke værd at gamble med sit helbred over en snack.",
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
          "Det er blevet utroligt populært at skære ned for kødet, men for folk med soja-allergi kan plantefars føles som et minefelt. Størstedelen af markedets køderstatninger er nemlig bygget op omkring sojaprotein.",
          "Heldigvis er naturen rig på kraftfulde alternativer. Quinoa, boghvede og amarant er fantastiske, gluten- og sojafrie frø, der indeholder alle essentielle aminosyrer. Desuden er bælgfrugter som linser og kikærter glimrende kilder til protein.",
          "Nøglen til succes i det plantebaserede køkken er at bygge sine måltider op omkring rene, uforarbejdede råvarer i stedet for at forlade sig på industriens færdigprodukter.",
        ],
        heading: "Ren næring fra naturens eget skab",
        tip: "Prøv afskallede hampefrø som topping på din morgenmad. De har en mild smag, indeholder ingen soja, og er sprængfyldt med proteiner.",
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
          "Når ferien kalder, glæder de fleste sig til at dykke ned i den lokale madkultur. Men har du en livstruende allergi eller en streng medicinsk diæt, kan spændingen overskygges af frygten for misforståelser.",
          "Det mest uundværlige værktøj i din rejsetaske er et professionelt oversat allergikort (Chef Card). Det er et lille dokument på det lokale sprog, der høfligt, men med alvor forklarer personalet præcis, hvilke ingredienser du ikke tåler.",
          "Sørg desuden altid for at pakke et lille lager af sikre nød-snacks hjemmefra. Skulle I strande et sted, hvor intet er sikkert at indtage, er det uvurderligt at have sit eget med.",
        ],
        heading: "Pak trygheden ned i kufferten",
        tip: "Sørg for at downloade dit allergikort ned på telefonen, så du har adgang til det, selv når du ikke har wifi.",
      },
    },
    {
      id: 10,
      title: "Power-morgenmad: Den ultimative bær-smoothie bowl",
      category: "Opskrifter",
      excerpt:
        "Start dagen med energi. Denne smoothie bowl er naturligt fri for gluten, nødder og mælkeprodukter, og den smager fantastisk.",
      image:
        "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&q=80&w=1080",
      featured: false,
      content: {
        paragraphs: [
          "En smoothie bowl er den perfekte morgenmad for dig, der vil have noget friskt uden at bekymre dig om skjulte allergener. Ved at blende frosne bær med banan skaber du en cremet konsistens, der mætter længe.",
          "Det bedste ved denne opskrift er, at den kan varieres i det uendelige. Du kan bruge de bær, du tåler bedst, og toppe den med kerner for ekstra bid.",
        ],
        ingredients: [
          "2 dl frosne bær",
          "1 frossen banan",
          "1 dl havremælk eller kokosvand",
          "1 tsk honning eller sirup",
          "Topping: Solsikkekerner og friske bær",
        ],
        instructions: [
          "Kom bær og banan i en blender.",
          "Tilsæt væsken lidt efter lidt.",
          "Blend indtil massen er helt glat og tyk.",
          "Hæld i en skål og pynt med kerner og bær.",
        ],
        heading: "Farverig energi til hele formiddagen",
        tip: "Brug frosne bananskiver for at få den helt rigtige 'softice'-konsistens uden brug af mælkeprodukter.",
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
          "Ingredients are always listed by weight. What comes first is what the product primarily consists of. If an allergen is tucked away in parentheses far down the list, that’s where you need to pay extra attention.",
          "While regulations help us along the way, they aren't foolproof. Flavorings and additives can be hard to decode, and even if they sound innocent, they can be problematic for allergy sufferers.",
          "Look for bolded types and remember that even well-known products can suddenly change their recipe without warning on the front of the packaging.",
        ],
        heading: "Learn to Read Between the Lines",
        tip: "Always check the label again when you get home, as stress in the store can make you miss details.",
      },
    },
    {
      id: 2,
      title: "No More Boring Bread: Finding Genuine Gluten-Free Bakeries",
      category: "Advice",
      excerpt:
        "Are you tired of dry, store-bought bread? Get the guide to finding dedicated craft bakeries.",
      image:
        "https://images.unsplash.com/photo-1519915051686-9fe6ee13633e?auto=format&fit=crop&q=80&w=1080",
      featured: false,
      content: {
        paragraphs: [
          "For many years, gluten-free bread was synonymous with dry, pre-packaged goods. But a revolution has hit the craft. New bakers are working with buckwheat, millet, and long fermentation times.",
          "When looking for a bakery, look for specialists. A real gluten-free bakery ensures all production happens under controlled conditions to avoid cross-contamination.",
          "Be cautious of general cafes that claim to have 'gluten-free options.' If they bake with wheat in the same room, flour dust lingers in the air. Go for dedicated shops.",
        ],
        heading: "Where Safety and Flavor Meet",
        tip: "Search for '100% gluten-free bakery' in your area to avoid risk of airborne flour.",
      },
    },
    {
      id: 3,
      title: "Casein and Albumin: The Words Your Body Hates",
      category: "Health",
      excerpt:
        "Milk and eggs often hide behind technical terms. Here is the list of words you need to watch out for.",
      image:
        "https://images.unsplash.com/photo-1649531794884-b8bb1de72e68?auto=format&fit=crop&q=80&w=1080",
      featured: false,
      content: {
        paragraphs: [
          "It would be easier if labels just said 'milk' or 'egg.' But the food industry often uses technical or Latin names. If you see 'Casein' or 'Whey,' it means milk protein.",
          "If 'Lysozyme' or 'Albumin' is on the list, it's derived from eggs. 'Maltodextrin' or 'Dextrose' are highly processed carbohydrates that spike blood sugar quickly.",
          "Learning these aliases is critical. Ignorance in this area can lead to unintended allergic reactions or unexplained blood sugar fluctuations.",
        ],
        heading: "Decipher the Ingredient List",
        tip: "Use the app's 'Blacklist' to save difficult terms and E-numbers for your shopping trips.",
      },
    },
    {
      id: 4,
      title: "Dining Out with Peace of Mind",
      category: "Guides",
      excerpt:
        "Going to a restaurant should be a pleasure, not a worry. Learn how to communicate your needs to the kitchen.",
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=1080",
      featured: true,
      content: {
        paragraphs: [
          "Eating at a restaurant should be a great experience. Whether you need to avoid allergens or stick to a specific diet, the key lies in good communication.",
          "The best strategy starts before you arrive. Call the restaurant outside of their busy hours. A professional chef appreciates time to prepare a safe meal for you.",
          "When ordering at the table, be polite but clear. Avoid soft phrasing like 'I'd prefer to avoid...' if you actually mean 'I will get sick from...'. Be precise.",
        ],
        heading: "Take Ownership of Your Meal",
        tip: "Call the day before to arrange your menu. This gives the kitchen peace of mind and let's you relax.",
      },
    },
    {
      id: 5,
      title: "No More Blurry Labels: New Transparency Rules",
      category: "News",
      excerpt:
        "Manufacturers can no longer hide behind vague terms. We look at the new, stricter rules.",
      image:
        "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1080",
      featured: false,
      content: {
        paragraphs: [
          "It has long been a pain point that food labeling is often vague. But new international rules are tightening the requirements to ensure consumers know exactly what's in their food.",
          "In the past, 'vegetable oil' could be used without specifying the source. New standards require detailed specifications of all major allergens and hidden carbohydrates.",
          "For the consumer, this means fewer frustrating calls to customer service and less guesswork in the supermarket aisles.",
        ],
        heading: "Transparency Over Guesswork",
        tip: "Look for QR codes on new labels that link directly to complete ingredient lists and production details.",
      },
    },
    {
      id: 6,
      title: "Creamy and Nut-Free: The Ultimate Safe Pesto",
      category: "Opskrifter",
      excerpt:
        "Miss classic pesto? This recipe uses roasted seeds and tastes just like the real thing.",
      image:
        "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=1080",
      featured: false,
      content: {
        paragraphs: [
          "A good homemade pesto is a great condiment. But for nut allergy sufferers, pine nuts are a no-go. The solution is surprisingly simple: Roasted pumpkin seeds.",
          "They have the right fat content and provide a deep flavor that mimics nuts perfectly without the risk. Here is how to make it:",
        ],
        ingredients: [
          "50g pumpkin seeds",
          "1 large bunch of fresh basil",
          "100ml olive oil",
          "1 clove of garlic",
          "Lemon juice to taste",
          "Salt and pepper",
          "2 tbsp nutritional yeast (optional)",
        ],
        instructions: [
          "Toast pumpkin seeds in a dry pan until they pop.",
          "Pulse the seeds in a food processor.",
          "Add basil, garlic, and lemon juice.",
          "Slowly drizzle in the oil while blending.",
          "Season with salt and pepper.",
        ],
        heading: "The Secret is in the Seeds",
        tip: "Pour a thin layer of olive oil over the pesto in the jar to prevent it from oxidizing and turning brown.",
      },
    },
    {
      id: 7,
      title: "The 'Traces Of' Trap: Real Risk or Legal Shield?",
      category: "Advice",
      excerpt:
        "Cautionary labels about traces are everywhere. When should you actually take them seriously?",
      image:
        "https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?auto=format&fit=crop&q=80&w=1080",
      featured: false,
      content: {
        paragraphs: [
          "'May contain traces' is the most frustrating sentence for any allergy sufferer. Is it because a nut actually fell into the dough, or is it just boilerplate text?",
          "In many cases, this labeling acts as a legal shield. Some companies have a real documented risk of cross-contamination, while others just add it as a routine.",
          "The clinical advice is firm: If you have a severe, anaphylactic allergy, 'traces of' should always be treated as a real warning. It's not worth the gamble.",
        ],
        heading: "When to Take It Seriously",
        tip: "Consult your doctor to establish your personal tolerance threshold for trace amounts.",
      },
    },
    {
      id: 8,
      title: "Ditch the Soy: Finding Safe Plant-Based Protein",
      category: "Health",
      excerpt:
        "Many meat substitutes are based on soy. Here are the best natural and clean alternatives.",
      image:
        "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&q=80&w=1080",
      featured: false,
      content: {
        paragraphs: [
          "Eating plant-based is popular, but for those with soy allergies, meat substitutes can be a minefield. Most are built around soy protein or wheat gluten.",
          "Fortunately, nature is full of alternatives. Quinoa, buckwheat, and amaranth are fantastic soy-free seeds containing all essential amino acids. Lentils and chickpeas are also great sources.",
          "The key is to build meals around whole, unprocessed ingredients rather than relying on pre-packaged meat substitutes.",
        ],
        heading: "Pure Nutrition from Nature",
        tip: "Try shelled hemp seeds as a topping. They are soy-free and packed with essential proteins.",
      },
    },
    {
      id: 9,
      title: "Travel Safely with Dietary Restrictions",
      category: "Guides",
      excerpt:
        "Language barriers can make vacations challenging. Preparation is the key to enjoying local food safely.",
      image:
        "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=1080",
      featured: false,
      content: {
        paragraphs: [
          "When heading on vacation, awareness of cross-contamination varies enormously from country to country. Preparation is key.",
          "The most important weapon in your bag is a professionally translated 'Chef Card.' It clearly explains in the local language exactly what you cannot eat.",
          "Always pack a stash of safe snacks from home. If you get stranded at a restaurant where nothing is safe, having your own food is invaluable.",
        ],
        heading: "Pack Peace of Mind",
        tip: "Download your allergy card to your phone so you have access even without wifi.",
      },
    },
    {
      id: 10,
      title: "Power Breakfast: The Ultimate Berry Smoothie Bowl",
      category: "Opskrifter",
      excerpt:
        "Start your day with energy. This bowl is naturally gluten, nut, and dairy-free, and it tastes amazing.",
      image:
        "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&q=80&w=1080",
      featured: false,
      content: {
        paragraphs: [
          "A smoothie bowl is the perfect breakfast for anyone wanting something fresh without worrying about hidden allergens.",
          "This recipe is versatile. Use any berries or fruits you tolerate best and top with seeds for extra crunch.",
        ],
        ingredients: [
          "200g frozen berries",
          "1 frozen banana",
          "100ml oat milk or coconut water",
          "1 tsp honey or maple syrup",
          "Toppings: Sunflower seeds and fresh fruit",
        ],
        instructions: [
          "Add frozen berries and banana to a blender.",
          "Slowly add liquid while blending on high.",
          "Blend until the mixture is thick and smooth.",
          "Pour into a bowl and decorate with seeds and fresh berries.",
        ],
        heading: "Colorful Energy for Your Morning",
        tip: "Use frozen banana slices to get a thick, ice-cream-like texture without dairy.",
      },
    },
  ],
};
