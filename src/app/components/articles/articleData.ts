export const CATEGORIES = [
  "Alle",
  "Nyheder",
  "Tips",
  "Opskrifter",
  "Sundhed",
  "Guides",
];

export const ARTICLES = [
  {
    id: 1,
    title: "Sådan læser du komplekse ingredienslister",
    category: "Tips",
    readTime: "4 min",
    excerpt:
      "Lær at afkode de mest forvirrende ingredienslister og identificere potentielle allergener.",
    image:
      "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?auto=format&fit=crop&q=80&w=1080",
    featured: true,
    content: {
      paragraphs: [
        "Når man står i supermarkedet og skal vælge de rigtige varer, kan det ofte føles som en jungle at navigere rundt i de mange forskellige ingredienser. Særligt hvis man har allergier eller specifikke diætkrav, er det afgørende at vide præcis, hvad maden indeholder.",
        "Producenterne er forpligtet til at fremhæve allergener i ingredienslisten, oftest ved at gøre teksten fed, kursiv eller bruge store bogstaver. Men skjulte stoffer under E-numre eller komplekse tekniske termer kan stadig snyde selv den mest opmærksomme forbruger.",
        "Det er altid en god idé at læse ingredienslisten fra ende til anden, da rækkefølgen angiver mængden af ingrediensen – det, der står først, er der mest af i produktet.",
      ],
      heading: "Hvad skal du kigge efter?",
      tip: "Med Safe-Eat appen gør vi det heldigvis meget nemmere for dig. Scan stregkoden for at få et lynhurtigt og sikkert overblik over indholdet.",
    },
  },
  {
    id: 2,
    title: "5 lækre glutenfrie bagerier i byen",
    category: "Opskrifter",
    readTime: "3 min",
    excerpt:
      "De bedste steder at finde glutenfrie delikatesser uden at gå på kompromis med smagen.",
    image:
      "https://images.unsplash.com/photo-1519915051686-9fe6ee13633e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    featured: false,
    content: {
      paragraphs: [
        "Det har historisk set været svært at finde godt glutenfrit bagværk, der ikke føles tørt eller smuldrende. Men de seneste år er der sket en revolution på området.",
        "Flere dedikerede bagerier har specialiseret sig i at skabe alt fra luftige surdejsboller til sprøde croissanter, der smager fuldstændig fantastisk – helt uden brug af hvede, rug eller byg.",
        "Vi har besøgt fem af byens absolut bedste glutenfrie bagerier og testet deres sortiment.",
      ],
      heading: "Vores testvindere",
      tip: "De bedste glutenfrie brød bliver ofte udsolgt hurtigt. Husk at ringe til bageriet om morgenen, hvis du vil være sikker på at få dit yndlingsbrød.",
    },
  },
  {
    id: 3,
    title: "Hvad er skjulte allergener?",
    category: "Sundhed",
    readTime: "5 min",
    excerpt:
      "Opdag de skjulte ingredienser, der kan udløse allergiske reaktioner.",
    image:
      "https://images.unsplash.com/photo-1649531794884-b8bb1de72e68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    featured: false,
    content: {
      paragraphs: [
        "Nogle af de farligste allergener er dem, du ikke forventer at finde i dit måltid. Skjulte allergener er ingredienser, der ikke står tydeligt frem på forsiden af emballagen, eller som gemmer sig bag fagtermer.",
        "For eksempel kan komælksprotein gemme sig under betegnelsen 'kasein' eller 'valle', mens æg ofte deklareres som 'albumin' eller 'lysozym'.",
        "Dette sker ofte i forarbejdede fødevarer, saucer og dressinger, hvor ingredienserne bruges som bindemidler eller smagsforstærkere.",
      ],
      heading: "De typiske faldgruber",
      tip: "Tilføj de tekniske navne for dine allergener til din personlige 'NoList' i appen. Så fanger scanneren dem automatisk for dig.",
    },
  },
  {
    id: 4,
    title: "Nye supermarkedstendenser for allergikere",
    category: "Nyheder",
    readTime: "2 min",
    excerpt:
      "Supermarkederne udvider sortimentet med allergivenlige produkter - se hvad der er nyt.",
    image:
      "https://images.unsplash.com/photo-1580440282860-8555b1ae102c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    featured: false,
    content: {
      paragraphs: [
        "Dagligvarekæderne har for alvor fået øjnene op for, at en stor del af befolkningen har specifikke diætbehov. Derfor ser vi nu en markant udvidelse af hyldepladsen dedikeret til 'fri for'-produkter.",
        "Flere supermarkeder samler nu de glutenfrie, laktosefrie og veganske varer i én stor, tydeligt markeret afdeling, så du slipper for at lede hele butikken rundt.",
        "Desuden introducerer mange kæder deres egne 'private label'-serier, som gør det væsentligt billigere at leve med en fødevareallergi.",
      ],
      heading: "Fremtidens indkøb",
      tip: "Hold øje med supermarkedernes egne mærker (som f.eks. Rema 1000's glutenfri serie). De er ofte af lige så høj kvalitet som mærkevarerne, men meget billigere.",
    },
  },
  {
    id: 5,
    title: "Vegansk madlavning: En komplet guide for begyndere",
    category: "Guides",
    readTime: "8 min",
    excerpt:
      "Alt du behøver at vide for at komme i gang med plantebaseret madlavning.",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    featured: false,
    content: {
      paragraphs: [
        "At skifte til en vegansk eller plantebaseret diæt kan virke uoverskueligt i starten. Hvor får man sine proteiner fra? Hvordan erstatter man æg i bagværk? Og hvad med ost?",
        "Hemmeligheden bag god vegansk madlavning er at lære de basale erstatninger at kende. Tofu kan rørsteges i stedet for æg, hørfrø blandet med vand binder bagværk sammen, og gærflager giver en fantastisk ostesmag.",
        "Sørg for altid at have dit basislager i orden: Bønner, linser, nødder, frø og fuldkorn er fundamentet i ethvert godt plantebaseret køkken.",
      ],
      heading: "Opbygning af smag",
      tip: "Brug røgessens (liquid smoke), sojasauce og miso til at give dine kødfrie retter den dybe, salte umami-smag, som du måske savner fra kød.",
    },
  },
  {
    id: 6,
    title: "Allergivejledning til børnefamilier",
    category: "Sundhed",
    readTime: "6 min",
    excerpt: "Praktiske råd til forældre med børn, der har fødevareallergi.",
    image:
      "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    featured: false,
    content: {
      paragraphs: [
        "Når et barn diagnosticeres med fødevareallergi, ændrer det hverdagen for hele familien. Det kræver omhyggelig planlægning, især når barnet skal starte i institution eller skole.",
        "En åben og tydelig kommunikation med pædagoger, lærere og de andre børns forældre er afgørende. Forklar klart, hvad dit barn ikke kan tåle, og hvilke reaktioner I kan forvente.",
        "Det vigtigste er at inddrage barnet og lære dem om deres egen allergi på et niveau, de kan forstå, så de selv kan sige 'nej tak' til mad, de er i tvivl om.",
      ],
      heading: "Tryghed i hverdagen",
      tip: "Giv dit barn en lille 'sikker' godtekasse med i børnehave eller skole, som personalet kan dele ud af, når der pludselig er fødselsdag og kage i klassen.",
    },
  },
  {
    id: 7,
    title: "De 10 mest almindelige mærkning-fejl på fødevarer",
    category: "Tips",
    readTime: "4 min",
    excerpt: "Vær opmærksom på disse fejl, når du scanner ingredienslister.",
    image:
      "https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    featured: false,
    content: {
      paragraphs: [
        "Selvom fødevarelovgivningen i EU er stram, og producenterne gør deres bedste, sker der desværre stadig fejl i mærkningen af madvarer.",
        "Nogle af de mest almindelige fejl inkluderer manglende oversættelse af udenlandske ingredienser, at krydderiblandinger ikke er specificeret, og at advarslen 'kan indeholde spor af...' bliver udeladt på produkter pakket på tværs af produktionslinjer.",
        "Det er også vigtigt at være opmærksom på opskriftsændringer. Et produkt, du har spist i årevis, kan pludselig ændre indhold, uden at det står med store bogstaver på forsiden.",
      ],
      heading: "Forbliv på vagt",
      tip: "Brug Safe-Eat scanneren, hver gang du handler – også på produkter, du plejer at købe. Producenterne ændrer ofte opskrifterne uden varsel.",
    },
  },
  {
    id: 8,
    title: "Sådan håndterer du sociale situationer med fødevareallergi",
    category: "Guides",
    readTime: "5 min",
    excerpt:
      "Tips til at navigere i sociale sammenhænge, når du har diætbegrænsninger.",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    featured: false,
    content: {
      paragraphs: [
        "Det kan føles akavet at skulle spørge ind til ingredienser, når man er inviteret til middag eller fødselsdag. Mange frygter at være til besvær for værten.",
        "Den bedste tilgang er at melde ud i god tid. Send en venlig besked i god tid inden arrangementet, hvor du forklarer dine begrænsninger og understreger, at de ikke behøver lave en helt separat menu til dig.",
        "At tilbyde at medbringe en ret, du selv kan tåle, er ofte en stor lettelse for værten, og det sikrer, at du ikke går sulten hjem.",
      ],
      heading: "Åben kommunikation",
      tip: "Tilbyd altid at medbringe en ret eller en dessert, som du selv kan spise. På den måde er du sikret mad, og de andre gæster kan smage din mad.",
    },
  },
  {
    id: 9,
    title: "Nyt dansk lovkrav om allergenmærkning træder i kraft",
    category: "Nyheder",
    readTime: "3 min",
    excerpt:
      "Find ud af, hvad de med nye regler betyder for dig som allergiker.",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    featured: false,
    content: {
      paragraphs: [
        "Fødevarestyrelsen har netop indført nye retningslinjer, der skal gøre det endnu tryggere at spise ude, uanset om det er på fin restaurant eller ved den lokale pølsevogn.",
        "Det nye lovkrav betyder, at alle serveringssteder nu skal kunne fremvise en skriftlig og letforståelig oversigt over de 14 lovpligtige allergener i samtlige af deres retter og menuer.",
        "Du behøver altså ikke længere nøjes med et 'jeg tror ikke, der er nødder i' fra en travl tjener.",
      ],
      heading: "Kend dine rettigheder",
      tip: "Spørg altid tjeneren direkte efter allergen-oversigten. Det er et lovkrav, at de har den, og din ret at få fuld indsigt i, hvad du spiser.",
    },
  },
  {
    id: 10,
    title: "Opskrift: Laktosefri chokoladekage",
    category: "Opskrifter",
    readTime: "15 min",
    excerpt:
      "En lækker og cremet chokoladekage, der er helt fri for mælkeprodukter.",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    featured: false,
    content: {
      paragraphs: [
        "Hvem siger, at en rigtig chokoladekage skal indeholde rigeligt med smør og mælk for at blive saftig og lækker? Med de rigtige byggeklodser kan du lave en kage, der er mindst lige så god.",
        "Ved at erstatte smørret med en neutral olie (f.eks. raps- eller solsikkeolie) og komælken med en god havredrik, får du en kage med en fantastisk, svampet tekstur, som holder sig frisk i flere dage.",
        "Glasuren kan nemt laves på mørk, mælkefri chokolade og en smule kokosolie for at give den det perfekte, blanke look.",
      ],
      heading: "Fokus på chokoladen",
      tip: "Når du bager laktosefrit, træder chokoladesmagen ofte tydeligere frem. Brug derfor altid en kakao af rigtig høj kvalitet – det kan smages!",
    },
  },
];
