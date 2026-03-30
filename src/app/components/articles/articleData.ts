export const CATEGORIES = {
  da: ["Alle", "Nyheder", "Tips", "Opskrifter", "Sundhed", "Guides"],
  en: ["All", "News", "Tips", "Recipes", "Health", "Guides"],
};

export const ARTICLES = {
  da: [
    {
      id: 1,
      title: "Dekodning af ingredienslister: En ekspertguide",
      category: "Tips",
      excerpt:
        "Lær at navigere i komplekse deklarationer og identificer skjulte allergener med præcision.",
      image:
        "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?auto=format&fit=crop&q=80&w=1080",
      featured: true,
      content: {
        paragraphs: [
          "Ingredienslisten er dit primære værktøj til fødevaresikkerhed. I EU er mærkningsreglerne (Forordning 1169/2011) designet til at beskytte forbrugeren ved at kræve, at de 14 mest kritiske allergener fremhæves tydeligt i teksten.",
          "Det er dog vigtigt at forstå rækkefølgen af ingredienser. De er altid listet efter faldende vægt på produktionstidspunktet. Hvis en allergen optræder som en del af en sammensat ingrediens, skal dens komponenter deklareres i en efterfølgende parentes.",
          "Vær særlig opmærksom på tekniske hjælpestoffer og bærere af aromaer, som i visse tilfælde kan undtages for mærkning, medmindre de har en allergifremkaldende effekt.",
        ],
        heading: "Systematisk gennemgang",
        tip: "Læs altid ingredienslisten tre gange: Ved hylden, ved udpakning og før servering. Producenter ændrer ofte opskrifter uden varsel.",
      },
    },
    {
      id: 2,
      title: "Glutenfri gastronomi: Københavns førende bagerier",
      category: "Tips",
      excerpt:
        "En oversigt over dedikerede bagerier, hvor håndværk og fødevaresikkerhed går hånd i hånd.",
      image:
        "https://images.unsplash.com/photo-1519915051686-9fe6ee13633e?auto=format&fit=crop&q=80&w=1080",
      featured: false,
      content: {
        paragraphs: [
          "København har markeret sig som en pioner inden for glutenfri bagning. Kvaliteten er løftet fra tørre erstatningsprodukter til komplekse surdejsbrød baseret på naturlige meltyper som boghvede og hirse.",
          "H.U.G Bageri og Landbageriet er institutioner i byen, der har specialiseret sig i at eliminere krydskontaminering ved at drive 100% glutenfrie produktioner. Dette er afgørende for personer med cøliaki.",
          "Når du besøger bagerier, der ikke er rent glutenfrie, er det essentielt at forespørge om deres procedurer for adskillelse af melstøv og brug af dedikerede bageplader.",
        ],
        heading: "Sikkerhed frem for alt",
        tip: "Ved svær allergi eller cøliaki bør du prioritere bagerier med certificeret glutenfri produktion for at eliminere risikoen for melstøv.",
      },
    },
    {
      id: 3,
      title: "Skjulte proteiner: Når mælk og æg skifter navn",
      category: "Sundhed",
      excerpt:
        "Identificer de kemiske og tekniske betegnelser for mælke- og æggeproteiner i fødevarer.",
      image:
        "https://images.unsplash.com/photo-1649531794884-b8bb1de72e68?auto=format&fit=crop&q=80&w=1080",
      featured: false,
      content: {
        paragraphs: [
          "Mange fødevarekomponenter afledes af mælk og æg, men deklareres under navne, der ikke umiddelbart afslører deres oprindelse. Kasein og valle (whey) er de to primære mælkeproteiner, som ofte findes i forarbejdede kødprodukter og proteinbarer.",
          "For æggeallergikere er albumin, lysozym (E1105) og lecithin (hvis ikke specificeret som soja eller solsikke) kritiske at kende. Disse bruges ofte for deres emulgerende egenskaber.",
          "Lovgivningen kræver mærkning af kilden, men tekniske termer kan stadig skabe forvirring i komplekse produktbeskrivelser.",
        ],
        heading: "Videnskaben bag mærkningen",
        tip: "Brug din personlige 'No-list' i appen til at inkludere specifikke derivater som natriumkaseinat, hvis din følsomhed er høj.",
      },
    },
    {
      id: 4,
      title: "Værdisætning: Supermarkedernes egne allergen-serier",
      category: "Nyheder",
      excerpt:
        "En analyse af pris versus kvalitet i detailhandlens egne 'Fri for'-serier.",
      image:
        "https://images.unsplash.com/photo-1580440282860-8555b1ae102c?auto=format&fit=crop&q=80&w=1080",
      featured: false,
      content: {
        paragraphs: [
          "Markedet for specialvarer er i vækst, hvilket har ledt til, at kæder som Rema 1000 og Salling Group har udviklet egne mærker. Disse produkter tilbyder ofte samme sikkerhedsstandarder som mærkevarer, men til en lavere enhedspris.",
          "Salling Groups 'Fri'-serie og Rema 1000's sortiment gennemgår strikse kvalitetskontroller. Det er en udbredt misforståelse, at billigere priser betyder lavere sikkerhed; ofte handler det om optimerede logistikkæder.",
          "Forbrugeren bør dog altid læse bagsiden, da opskrifterne på disse 'private labels' kan variere mere hyppigt end hos de etablerede specialproducenter.",
        ],
        heading: "Økonomisk overblik",
        tip: "Hold øje med certificeringer som 'Det Blå Kranse-mærke' eller 'Crossed Grain', som ofte findes på supermarkedernes egne mærker.",
      },
    },
    {
      id: 5,
      title: "Kulinarisk substitution i det plantebaserede køkken",
      category: "Guides",
      excerpt:
        "Professionelle teknikker til at erstatte animalske allergener uden tab af tekstur og smag.",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1080",
      featured: false,
      content: {
        paragraphs: [
          "Substitution i køkkenet kræver forståelse for ingrediensernes funktion. Æg fungerer ofte som bindemiddel eller hævemiddel. Her er aquafaba (kikærtevand) revolutionerende pga. dets protein- og stivelsessammensætning.",
          "Mælkeprodukter kan erstattes med fedtholdige alternativer som kokosmælk eller nøddebaserede cremer for at bibeholde den ønskede mundfølelse i saucer og desserter.",
          "Umami-smagen, som ofte findes i lagrede oste, kan genskabes ved brug af inaktiveret gær (gærflager) eller fermenterede produkter som miso.",
        ],
        heading: "Funktionel madlavning",
        tip: "Når du erstatter ingredienser, så fokuser på proteinindholdet i substitutten for at sikre, at bageevnen forbliver intakt.",
      },
    },
    {
      id: 6,
      title: "Allergi i daginstitutioner: En sikkerhedsguide",
      category: "Sundhed",
      excerpt:
        "Etablering af effektive procedurer og dialog med pædagogisk personale.",
      image:
        "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?auto=format&fit=crop&q=80&w=1080",
      featured: false,
      content: {
        paragraphs: [
          "Overgangen til daginstitution kræver en struktureret tilgang til barnets allergier. En formel handlingsplan, udarbejdet i samarbejde med en læge, bør altid foreligge skriftligt hos personalet.",
          "Visuel identifikation i køkkenet og ved spisebordet er en effektiv barriere mod fejlserveringer. Det er afgørende, at personalet er instrueret i genkendelse af symptomer og korrekt brug af medicin.",
          "Inddrag barnet i en alderstilpasset dialog om 'sikker' og 'usikker' mad for at opbygge en tidlig bevidsthed og egenomsorg.",
        ],
        heading: "Struktur og tillid",
        tip: "Gør det nemt for personalet ved at levere mærkede beholdere med alternative råvarer, som kan anvendes ved fællesarrangementer.",
      },
    },
    {
      id: 7,
      title: "Krydskontaminering og 'Spor af'-mærkning",
      category: "Tips",
      excerpt:
        "Forstå risikoen bag de frivillige advarselsmærkninger på fødevarer.",
      image:
        "https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?auto=format&fit=crop&q=80&w=1080",
      featured: false,
      content: {
        paragraphs: [
          "'Kan indeholde spor af' er en præventiv mærkning, som producenter anvender, når der er en risiko for ubevidst overførsel af allergener under produktion eller transport.",
          "I modsætning til den obligatoriske ingrediensliste, er spor-mærkning ikke reguleret af specifikke grænseværdier i lovgivningen. Dette skaber en gråzone for både producent og forbruger.",
          "For personer med ekstremt lav tolerance kan selv mikroskopiske mængder udløse anafylaksi, hvorfor mærkningen bør tages alvorligt.",
        ],
        heading: "Risikoanalyse",
        tip: "Hvis du har en livstruende allergi, bør 'spor af'-mærkning altid betragtes som en reel risiko og produktet undgås.",
      },
    },
    {
      id: 8,
      title: "Professionel håndtering af restaurantbesøget",
      category: "Guides",
      excerpt:
        "Strategier til at sikre et risikofrit måltid når du spiser ude.",
      image:
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1080",
      featured: false,
      content: {
        paragraphs: [
          "Succesfuld udespisning starter med proaktiv kommunikation. Kontakt restauranten uden for spidsbelastningsperioder for at drøfte køkkenets procedurer for allergenhåndtering.",
          "Ved ankomst bør du adressere dine allergier direkte til både tjener og køkkenchef. Vær specifik omkring risikoen for krydskontaminering via køkkenredskaber og fritureolie.",
          "Enkle retter med få komponenter er ofte de sikreste valg, da de minimerer antallet af potentielle fejlkilder i tilberedningen.",
        ],
        heading: "Kommunikationsstrategi",
        tip: "Vis din SafeEat profil eller et printet allergikort til personalet. Skriftlig information minimerer risikoen for misforståelser i et travlt køkken.",
      },
    },
    {
      id: 9,
      title: "Forbrugerbeskyttelse: Lovkrav om oplysningspligt",
      category: "Nyheder",
      excerpt:
        "Kend lovgivningen der sikrer din adgang til allergeninformation.",
      image:
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1080",
      featured: false,
      content: {
        paragraphs: [
          "I EU er det lovpligtigt for alle fødevarevirksomheder, herunder restauranter, kantiner og takeaway-steder, at kunne oplyse om de 14 hovedallergener.",
          "Oplysningerne skal være tilgængelige for forbrugeren uden forudgående forespørgsel, enten skriftligt i menukortet eller via tydelig skiltning om, hvor informationen findes.",
          "Manglende evne eller vilje til at give korrekte oplysninger er en overtrædelse af fødevarelovgivningen og bør rapporteres til de relevante myndigheder.",
        ],
        heading: "Dine rettigheder",
        tip: "Hvis personalet er usikre, så bed om at se de tekniske datablade for de anvendte halvfabrikata. Du har ret til fuld gennemsigtighed.",
      },
    },
    {
      id: 10,
      title: "Teknisk opskrift: Emulgeret chokoladekage (Mælkefri)",
      category: "Opskrifter",
      excerpt:
        "En optimeret opskrift der udnytter kemiske reaktioner til at opnå maksimal saftighed uden brug af mejeri.",
      image:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=1080",
      featured: false,
      content: {
        paragraphs: [
          "Denne opskrift baserer sig på interaktionen mellem syre (eddike) og base (natron), hvilket skaber CO2-bobler, der sikrer en luftig struktur uden behov for æggeproteiner.",
          "Ingredienser: 250g sigtet hvedemel, 200g rørsukker, 4 spsk kakao (min. 20% fedt), 1 tsk bagepulver, 1 tsk natron, 1 dl neutral rapsolie, 2 dl tempereret vand og 1 spsk æbleeddike.",
          "Fremgangsmåde: Sigt de tørre ingredienser for at sikre homogenitet. Tilsæt de våde komponenter og rør kun til dejen er samlet for at undgå overudvikling af gluten. Bag ved 180°C i 25-30 minutter.",
        ],
        heading: "Fremgangsmåde og videnskab",
        tip: "Brug en olie med højt indhold af enkeltumættede fedtsyrer for at sikre, at kagen forbliver saftig, selv efter afkøling.",
      },
    },
  ],
  en: [
    {
      id: 1,
      title: "Decoding Ingredient Lists: An Expert Guide",
      category: "Tips",
      excerpt:
        "Learn to navigate complex declarations and identify hidden allergens with precision.",
      image:
        "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?auto=format&fit=crop&q=80&w=1080",
      featured: true,
      content: {
        paragraphs: [
          "The ingredient list is your primary tool for food safety. In the EU, labeling regulations (Regulation 1169/2011) are designed to protect consumers by requiring the 14 most critical allergens to be clearly highlighted.",
          "However, it is crucial to understand the order of ingredients. They are always listed in descending order by weight at the time of production. If an allergen is part of a compound ingredient, its components must be declared in following parentheses.",
          "Pay close attention to technical processing aids and aroma carriers, which in some cases may be exempt from labeling unless they have an allergenic effect.",
        ],
        heading: "Systematic Review",
        tip: "Always read the ingredient list three times: At the shelf, during unpacking, and before serving. Manufacturers frequently change recipes without notice.",
      },
    },
    {
      id: 2,
      title: "Gluten-Free Gastronomy: Leading Bakeries in Copenhagen",
      category: "Tips",
      excerpt:
        "An overview of dedicated bakeries where craftsmanship and food safety go hand in hand.",
      image:
        "https://images.unsplash.com/photo-1519915051686-9fe6ee13633e?auto=format&fit=crop&q=80&w=1080",
      featured: false,
      content: {
        paragraphs: [
          "Copenhagen has emerged as a pioneer in gluten-free baking. Quality has evolved from dry substitutes to complex sourdough breads based on natural flours like buckwheat and millet.",
          "H.U.G Bageri and Landbageriet are city institutions specializing in eliminating cross-contamination by operating 100% gluten-free productions. This is vital for individuals with celiac disease.",
          "When visiting bakeries that are not strictly gluten-free, it is essential to inquire about their procedures for separating flour dust and the use of dedicated baking sheets.",
        ],
        heading: "Safety Above All",
        tip: "For severe allergies or celiac disease, prioritize bakeries with certified gluten-free production to eliminate the risk of airborne flour dust.",
      },
    },
    {
      id: 3,
      title: "Hidden Proteins: When Milk and Egg Change Names",
      category: "Health",
      excerpt:
        "Identify the chemical and technical terms for milk and egg proteins in food products.",
      image:
        "https://images.unsplash.com/photo-1649531794884-b8bb1de72e68?auto=format&fit=crop&q=80&w=1080",
      featured: false,
      content: {
        paragraphs: [
          "Many food components are derived from milk and eggs but are declared under names that do not immediately reveal their origin. Casein and whey are the two primary milk proteins often found in processed meats and protein bars.",
          "For egg allergy sufferers, albumin, lysozyme (E1105), and lecithin (if not specified as soy or sunflower) are critical to know. These are often used for their emulsifying properties.",
          "Legislation requires the source to be labeled, but technical terms can still cause confusion in complex product descriptions.",
        ],
        heading: "The Science of Labeling",
        tip: "Use your personal 'No-list' in the app to include specific derivatives like sodium caseinate if your sensitivity is high.",
      },
    },
    {
      id: 4,
      title: "Value Assessment: Supermarket Allergen Series",
      category: "News",
      excerpt:
        "An analysis of price versus quality in retail chains' own 'Free From' series.",
      image:
        "https://images.unsplash.com/photo-1580440282860-8555b1ae102c?auto=format&fit=crop&q=80&w=1080",
      featured: false,
      content: {
        paragraphs: [
          "The market for specialty goods is growing, leading chains like Rema 1000 and Salling Group to develop their own brands. These products often offer the same safety standards as name brands but at a lower unit price.",
          "Salling Group’s 'Fri' series and Rema 1000’s assortment undergo strict quality controls. It is a common misconception that lower prices mean lower safety; it often relates to optimized logistics chains.",
          "However, consumers should always read the back, as recipes for these private labels may vary more frequently than those of established specialty manufacturers.",
        ],
        heading: "Economic Overview",
        tip: "Look for certifications such as the 'Blue Label' or 'Crossed Grain', which are often found on supermarket house brands.",
      },
    },
    {
      id: 5,
      title: "Culinary Substitution in Plant-Based Cooking",
      category: "Guides",
      excerpt:
        "Professional techniques for replacing animal allergens without losing texture or flavor.",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1080",
      featured: false,
      content: {
        paragraphs: [
          "Substitution in the kitchen requires an understanding of the function of ingredients. Eggs often act as a binder or leavening agent. Here, aquafaba (chickpea water) is revolutionary due to its protein and starch composition.",
          "Dairy products can be replaced with high-fat alternatives like coconut milk or nut-based creams to maintain the desired mouthfeel in sauces and desserts.",
          "The umami flavor often found in aged cheeses can be recreated using inactive yeast (nutritional yeast) or fermented products like miso.",
        ],
        heading: "Functional Cooking",
        tip: "When replacing ingredients, focus on the protein content of the substitute to ensure the structural integrity of your baking remains intact.",
      },
    },
    {
      id: 6,
      title: "Allergies in Childcare: A Safety Guide",
      category: "Health",
      excerpt:
        "Establishing effective procedures and dialogue with pedagogical staff.",
      image:
        "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?auto=format&fit=crop&q=80&w=1080",
      featured: false,
      content: {
        paragraphs: [
          "Transitioning to childcare requires a structured approach to the child's allergies. A formal Allergy Action Plan, developed in collaboration with a doctor, should always be provided in writing to the staff.",
          "Visual identification in the kitchen and at the dining table is an effective barrier against serving errors. It is crucial that staff are instructed in symptom recognition and the correct use of medication.",
          "Involve the child in age-appropriate dialogue about 'safe' and 'unsafe' food to build early awareness and self-care.",
        ],
        heading: "Structure and Trust",
        tip: "Make it easy for staff by providing labeled containers with alternative ingredients that can be used during communal events.",
      },
    },
    {
      id: 7,
      title: "Cross-Contamination and 'Traces of' Labeling",
      category: "Tips",
      excerpt:
        "Understand the risk behind voluntary warning labels on food products.",
      image:
        "https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?auto=format&fit=crop&q=80&w=1080",
      featured: false,
      content: {
        paragraphs: [
          "'May contain traces of' is a preventive label used by manufacturers when there is a risk of unintentional transfer of allergens during production or transport.",
          "Unlike the mandatory ingredient list, trace labeling is not regulated by specific threshold values in legislation. This creates a gray area for both manufacturers and consumers.",
          "For individuals with extremely low tolerance, even microscopic amounts can trigger anaphylaxis, which is why the label should be taken seriously.",
        ],
        heading: "Risk Analysis",
        tip: "If you have a life-threatening allergy, 'traces of' labeling should always be considered a real risk and the product avoided.",
      },
    },
    {
      id: 8,
      title: "Professional Management of Dining Out",
      category: "Guides",
      excerpt:
        "Strategies to ensure a risk-free meal when eating at restaurants.",
      image:
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1080",
      featured: false,
      content: {
        paragraphs: [
          "Successful dining out starts with proactive communication. Contact the restaurant during off-peak hours to discuss their allergen management procedures.",
          "Upon arrival, address your allergies directly with both the server and the head chef. Be specific about the risk of cross-contamination via utensils and frying oil.",
          "Simple dishes with few components are often the safest choices, as they minimize the number of potential points of failure in preparation.",
        ],
        heading: "Communication Strategy",
        tip: "Show your SafeEat profile or a printed allergy card to the staff. Written information minimizes the risk of misunderstandings in a busy kitchen.",
      },
    },
    {
      id: 9,
      title: "Consumer Protection: Mandatory Disclosure Laws",
      category: "News",
      excerpt:
        "Know the legislation that ensures your access to allergen information.",
      image:
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1080",
      featured: false,
      content: {
        paragraphs: [
          "In the EU, it is mandatory for all food businesses, including restaurants, cafeterias, and takeaway outlets, to be able to provide information on the 14 main allergens.",
          "The information must be accessible to the consumer without prior request, either in writing on the menu or via clear signage indicating where the information can be found.",
          "The inability or unwillingness to provide correct information is a violation of food safety laws and should be reported to the relevant authorities.",
        ],
        heading: "Your Rights",
        tip: "If staff are unsure, ask to see the technical data sheets for the semi-finished products used. You have the right to full transparency.",
      },
    },
    {
      id: 10,
      title: "Technical Recipe: Emulsified Chocolate Cake (Dairy-Free)",
      category: "Opskrifter",
      excerpt:
        "An optimized recipe utilizing chemical reactions to achieve maximum moisture without the use of dairy.",
      image:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=1080",
      featured: false,
      content: {
        paragraphs: [
          "This recipe relies on the interaction between acid (vinegar) and base (baking soda), creating CO2 bubbles that ensure a light structure without the need for egg proteins.",
          "Ingredients: 250g sifted wheat flour, 200g cane sugar, 4 tbsp cocoa (min. 20% fat), 1 tsp baking powder, 1 tsp baking soda, 1 dl neutral rapeseed oil, 2 dl tempered water, and 1 tbsp apple cider vinegar.",
          "Instructions: Sift dry ingredients to ensure homogeneity. Add wet components and stir only until the batter is combined to avoid over-developing gluten. Bake at 180°C (350°F) for 25-30 minutes.",
        ],
        heading: "Method and Science",
        tip: "Use an oil high in monounsaturated fats to ensure the cake remains moist even after cooling.",
      },
    },
  ],
};
