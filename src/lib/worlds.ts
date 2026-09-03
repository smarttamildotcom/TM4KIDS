import type { QuizQuestion } from "@/lib/quiz/types";

export type WorldDifficulty = "Easy" | "Medium" | "Hard" | "Expert";

export type WorldColor =
  | "blue"
  | "orange"
  | "purple"
  | "green"
  | "yellow"
  | "red"
  | "cyan"
  | "pink"
  | "teal"
  | "indigo"
  | "gold"
  | "royalPurple";

export type WorldMcq = {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
};

export type WorldTrueFalse = {
  statement: string;
  answer: boolean;
  explanation: string;
};

export type World = {
  id: number;
  name: string;
  icon: string;
  color: WorldColor;
  description: string;
  difficulty: WorldDifficulty;
  xp: number;
  time: string;
  /** Only worlds backed by a built level route link out — the rest run inside the panel. */
  href?: string;
  story: string;
  objectives: string[];
  briefing: string;
  miniLesson: { heading: string; body: string; examples: string[] };
  mcqs: WorldMcq[];
  trueFalse: WorldTrueFalse[];
  activity: { title: string; instructions: string };
  challenge: { title: string; prompt: string };
  reward: { badge: string; label: string };
};

/** Visual theme per world colour — gradients, borders, glow and chips used across the map. */
export const worldTheme: Record<
  WorldColor,
  { gradient: string; border: string; glow: string; chip: string; ring: string }
> = {
  blue: {
    gradient: "from-sky-400 via-detective-blue-500 to-detective-blue-700",
    border: "border-detective-blue-200",
    glow: "hover:shadow-detective-blue-500/40",
    chip: "bg-detective-blue-50 text-detective-blue-700",
    ring: "text-detective-blue-500",
  },
  orange: {
    gradient: "from-amber-300 via-detective-orange-400 to-detective-orange-600",
    border: "border-detective-orange-200",
    glow: "hover:shadow-detective-orange-500/40",
    chip: "bg-detective-orange-100 text-detective-orange-700",
    ring: "text-detective-orange-500",
  },
  purple: {
    gradient: "from-fuchsia-400 via-purple-500 to-purple-700",
    border: "border-purple-200",
    glow: "hover:shadow-purple-500/40",
    chip: "bg-purple-50 text-purple-700",
    ring: "text-purple-500",
  },
  green: {
    gradient: "from-lime-400 via-green-500 to-emerald-600",
    border: "border-green-200",
    glow: "hover:shadow-green-500/40",
    chip: "bg-green-50 text-green-700",
    ring: "text-green-500",
  },
  yellow: {
    gradient: "from-yellow-200 via-detective-yellow-400 to-detective-yellow-500",
    border: "border-detective-yellow-300",
    glow: "hover:shadow-detective-yellow-500/40",
    chip: "bg-detective-yellow-100 text-detective-orange-600",
    ring: "text-detective-yellow-500",
  },
  red: {
    gradient: "from-rose-400 via-red-500 to-red-700",
    border: "border-red-200",
    glow: "hover:shadow-red-500/40",
    chip: "bg-red-50 text-red-700",
    ring: "text-red-500",
  },
  cyan: {
    gradient: "from-cyan-300 via-cyan-500 to-cyan-700",
    border: "border-cyan-200",
    glow: "hover:shadow-cyan-500/40",
    chip: "bg-cyan-50 text-cyan-700",
    ring: "text-cyan-500",
  },
  pink: {
    gradient: "from-pink-300 via-pink-500 to-pink-700",
    border: "border-pink-200",
    glow: "hover:shadow-pink-500/40",
    chip: "bg-pink-50 text-pink-700",
    ring: "text-pink-500",
  },
  teal: {
    gradient: "from-teal-300 via-teal-500 to-teal-700",
    border: "border-teal-200",
    glow: "hover:shadow-teal-500/40",
    chip: "bg-teal-50 text-teal-700",
    ring: "text-teal-500",
  },
  indigo: {
    gradient: "from-indigo-300 via-indigo-500 to-indigo-700",
    border: "border-indigo-200",
    glow: "hover:shadow-indigo-500/40",
    chip: "bg-indigo-50 text-indigo-700",
    ring: "text-indigo-500",
  },
  gold: {
    gradient: "from-detective-yellow-300 via-amber-400 to-yellow-600",
    border: "border-detective-yellow-400",
    glow: "hover:shadow-yellow-500/50",
    chip: "bg-yellow-50 text-yellow-700",
    ring: "text-detective-yellow-500",
  },
  royalPurple: {
    gradient: "from-purple-400 via-violet-600 to-purple-900",
    border: "border-violet-300",
    glow: "hover:shadow-violet-600/50",
    chip: "bg-violet-50 text-violet-700",
    ring: "text-violet-600",
  },
};

export const difficultyChip: Record<WorldDifficulty, string> = {
  Easy: "bg-green-100 text-green-700",
  Medium: "bg-detective-yellow-100 text-detective-orange-600",
  Hard: "bg-detective-orange-100 text-detective-orange-700",
  Expert: "bg-violet-100 text-violet-700",
};

/** The 15-world detective journey, ordered easiest to hardest. */
export const worlds: World[] = [
  {
    id: 1,
    name: "Welcome Detective",
    icon: "🕵️",
    color: "blue",
    description: "Meet Questy, grab your magnifying glass and learn what a brand detective actually does.",
    difficulty: "Easy",
    xp: 50,
    time: "10 mins",
    story:
      "Questy pushes open the door of Brand Quest Headquarters and slides a shiny badge across the desk to you. 'Rookie,' she whispers, 'every single day you walk past hundreds of secret clues. They're on your cereal box, your trainers, your favourite game. Most people never notice them. Today, you learn to see.'",
    objectives: [
      "Explain what a brand detective looks for",
      "Name the three clue types: pictures, names and colours",
      "Spot at least three brands inside your own home",
    ],
    briefing:
      "Your first mission is the simplest one you'll ever get: open your eyes. Companies leave marks on everything they make so you can tell their things apart from everyone else's. Find them.",
    miniLesson: {
      heading: "What does a Brand Detective do?",
      body: "A brand detective looks closely at ordinary things and asks one question: who made this, and how can I tell? Companies leave clues on purpose so you can recognise them instantly, even from far away. Those clues might be a small picture, a special way of writing a name, or a colour they use every single time. Once you know how to read the clues, you can identify a product from right across the room without reading a single word.",
      examples: [
        "A bitten apple on the back of a laptop lid",
        "Big golden arches you can spot from a moving car",
        "Three white stripes running down the side of a trainer",
      ],
    },
    mcqs: [
      {
        question: "What is a brand detective mainly looking for?",
        options: [
          "Clues that show who made something",
          "The price written on the label",
          "How heavy the box is",
          "The shop it was bought from",
        ],
        answerIndex: 0,
        explanation:
          "Detectives hunt for the marks a company leaves behind so you know the product is theirs.",
      },
      {
        question: "Why do companies put special marks on their products?",
        options: [
          "To make the product heavier",
          "So customers can recognise them quickly",
          "Because the law says every box needs a picture",
          "To use up leftover ink",
        ],
        answerIndex: 1,
        explanation:
          "Recognition is the whole point — a good mark works in about one second.",
      },
      {
        question: "Which of these is NOT a brand clue?",
        options: ["A logo", "A brand name", "A special colour", "The weather outside"],
        answerIndex: 3,
        explanation: "Weather has nothing to do with who made a product!",
      },
    ],
    trueFalse: [
      {
        statement: "You need to read the words to know which company made something.",
        answer: false,
        explanation:
          "Often a picture or colour alone is enough — that's exactly why companies use them.",
      },
      {
        statement: "Brand clues are hidden on everyday objects all around your home.",
        answer: true,
        explanation: "Fridge, schoolbag, trainers, TV — clues really are everywhere.",
      },
    ],
    activity: {
      title: "The Kitchen Sweep",
      instructions:
        "Walk into your kitchen and count how many different brands you can spot in two minutes. Write down the three that were easiest to recognise, and next to each one write WHY it was easy — was it the picture, the name or the colour?",
    },
    challenge: {
      title: "Detective Challenge: The Squint Test",
      prompt:
        "Pick one product and squint your eyes until the words go blurry. Can you still tell which brand it is? If yes, explain to someone what gave it away. Real detectives call this 'reading the shape of a clue'.",
    },
    reward: { badge: "🔍", label: "Rookie Detective Badge" },
  },
  {
    id: 2,
    name: "What is a Brand?",
    icon: "🏷️",
    color: "orange",
    description: "Discover the difference between a plain product and a real brand with a personality.",
    difficulty: "Easy",
    xp: 60,
    time: "12 mins",
    href: "/levels/brand-names",
    story:
      "Questy holds up two identical bottles of water. 'Same water, rookie. Exactly the same. So why does one cost more than the other?' She taps the label and winks. 'Because one of them has something the other doesn't — a brand.'",
    objectives: [
      "Define a brand in your own words",
      "Explain the difference between a product and a brand",
      "Describe the 'personality' of a brand you like",
    ],
    briefing:
      "Two things can be exactly the same inside and still feel completely different. Your job is to work out what makes the difference.",
    miniLesson: {
      heading: "A product is a thing. A brand is a feeling.",
      body: "A product is simply the thing itself — shoes, juice, a game. A brand is everything you think and feel when you see that product's name. It's made from the name, the logo, the colours, the promises the company makes and whether they keep them. A brand is basically a reputation. If a company always makes good shoes, people start trusting the name before they've even tried the shoes on. That trust took years to build, which is why companies protect their brands so carefully.",
      examples: [
        "Product: a fizzy drink. Brand: the red can you'd recognise anywhere",
        "Product: trainers. Brand: the swoosh that says 'sporty'",
        "Product: a burger. Brand: the restaurant you beg to visit",
      ],
    },
    mcqs: [
      {
        question: "Which sentence best describes a brand?",
        options: [
          "The plastic wrapper around a product",
          "The price sticker on a shelf",
          "The name, look and reputation people connect to a product",
          "The factory where something is built",
        ],
        answerIndex: 2,
        explanation:
          "A brand is the whole identity — name, look and the trust that comes with it.",
      },
      {
        question: "Two water bottles hold identical water. Why might one still be more popular?",
        options: [
          "People trust and recognise its brand",
          "Water tastes different in different shapes",
          "The label makes water healthier",
          "It is always colder",
        ],
        answerIndex: 0,
        explanation: "Recognition and trust are what the brand adds on top of the product.",
      },
      {
        question: "How does a company build a strong brand?",
        options: [
          "By changing its name every year",
          "By keeping its promises again and again",
          "By hiding its logo",
          "By copying another company exactly",
        ],
        answerIndex: 1,
        explanation:
          "Reputation is built by being reliable over a long time — there's no shortcut.",
      },
    ],
    trueFalse: [
      {
        statement: "A brand and a product are exactly the same thing.",
        answer: false,
        explanation:
          "The product is the object; the brand is the identity and reputation wrapped around it.",
      },
      {
        statement: "A brand can make people trust a product before they even try it.",
        answer: true,
        explanation: "That trust is the most valuable thing a brand owns.",
      },
    ],
    activity: {
      title: "Brand Personality Match",
      instructions:
        "Choose two brands you know well. For each one, write down three words that describe its personality — for example 'fast, sporty, strong' or 'gentle, healthy, natural'. Then ask a grown-up to guess the brand from your three words only.",
    },
    challenge: {
      title: "Detective Challenge: Same Thing, Different Feeling",
      prompt:
        "Find two products in your home that do the exact same job but come from different brands. Write one sentence explaining how each brand makes you feel differently, even though the products are so similar.",
    },
    reward: { badge: "🏷️", label: "Brand Spotter Badge" },
  },
  {
    id: 3,
    name: "Logos Everywhere",
    icon: "🎨",
    color: "purple",
    description: "Train your eyes to read logos — the tiny pictures that speak without words.",
    difficulty: "Easy",
    xp: 70,
    time: "12 mins",
    href: "/levels/logos",
    story:
      "Questy spreads a pile of cards across the table, each showing only a shape. No words at all. 'Name them,' she says, starting a stopwatch. To your own surprise, you get almost every single one right. 'That,' Questy grins, 'is the power of a logo.'",
    objectives: [
      "Explain what a logo is and why it works so fast",
      "Identify the three main logo types",
      "Sketch a simple logo from memory",
    ],
    briefing:
      "Logos are the fastest clue in the detective toolkit. Learn to sort them into families and you'll read them even quicker.",
    miniLesson: {
      heading: "Three families of logos",
      body: "Most logos belong to one of three families. A picture logo is just a symbol with no words, like a bird or an apple — these work in every language, which is why global companies love them. A word logo is the company's name written in a special style you'd recognise anywhere, even though it's only letters. A combination logo uses both together, a picture sitting beside the name. Good logos share the same secret: they are simple enough to draw from memory, and they stay the same for years so your brain learns them.",
      examples: [
        "Picture logo: a plain silhouette of an animal",
        "Word logo: a company name in one unmistakable style of writing",
        "Combination logo: a symbol next to the name on a coffee cup",
      ],
    },
    mcqs: [
      {
        question: "Why do picture logos work so well around the world?",
        options: [
          "They are cheaper to print",
          "They work even if you can't read the language",
          "They are always blue",
          "They can be changed every month",
        ],
        answerIndex: 1,
        explanation: "A symbol needs no translation — anyone anywhere can read it instantly.",
      },
      {
        question: "A logo that shows only the company's name in a special style is called a…",
        options: ["Picture logo", "Word logo", "Mascot", "Slogan"],
        answerIndex: 1,
        explanation: "Word logos rely on the styling of the letters themselves.",
      },
      {
        question: "What makes a logo easy to remember?",
        options: [
          "Being very complicated",
          "Changing its design often",
          "Being simple and staying the same",
          "Using at least ten colours",
        ],
        answerIndex: 2,
        explanation: "Simple plus consistent is the winning formula for memory.",
      },
    ],
    trueFalse: [
      {
        statement: "A good logo should be complicated so it looks impressive.",
        answer: false,
        explanation:
          "The opposite is true — simple logos are far easier to recognise and remember.",
      },
      {
        statement: "A logo can be recognised without reading any words.",
        answer: true,
        explanation: "That instant, wordless recognition is exactly a logo's job.",
      },
    ],
    activity: {
      title: "Draw It From Memory",
      instructions:
        "Without looking at anything, draw three logos you think you know really well. Then compare your drawings to the real ones. Which details did you get right, and which did you invent? The parts you remembered correctly are the strongest bits of that logo.",
    },
    challenge: {
      title: "Detective Challenge: Logo Family Sort",
      prompt:
        "Collect five logos from around your home and sort them into the three families: picture, word or combination. Which family was the most common? Write down your guess for why.",
    },
    reward: { badge: "🎨", label: "Logo Reader Badge" },
  },
  {
    id: 4,
    name: "Famous Brand Hunt",
    icon: "⭐",
    color: "yellow",
    description: "Go on a worldwide hunt for the most recognisable brands on the planet.",
    difficulty: "Easy",
    xp: 80,
    time: "15 mins",
    story:
      "A world map unrolls across the HQ floor. Questy drops glowing pins onto city after city. 'Some brands,' she says, 'are known by more people than any song ever written. Let's find out how they got that famous.'",
    objectives: [
      "Explain what makes a brand 'famous'",
      "Compare a global brand with a local one",
      "Describe how a brand becomes known in many countries",
    ],
    briefing:
      "Fame isn't luck. Track the pattern that famous brands share and you'll be able to predict the next big one.",
    miniLesson: {
      heading: "How brands become famous",
      body: "A famous brand is one that huge numbers of people recognise, often across many different countries. Brands get there by doing the same few things over and over: they keep their logo and colours consistent for decades, they appear in lots of places people already look, and they keep the quality steady so nobody feels let down. Local brands can be just as loved, but they're known mainly in one town, city or country. Being global isn't automatically better — it just means more people have seen the clues.",
      examples: [
        "A global brand sold in over a hundred countries",
        "A local bakery everyone in your neighbourhood knows by name",
        "A sports brand that sponsors teams so its logo appears on TV",
      ],
    },
    mcqs: [
      {
        question: "What does a 'global brand' mean?",
        options: [
          "A brand shaped like a globe",
          "A brand known in many countries around the world",
          "A brand that only sells maps",
          "The oldest brand ever made",
        ],
        answerIndex: 1,
        explanation: "Global simply means recognised widely across the world.",
      },
      {
        question: "Which habit most helps a brand become famous?",
        options: [
          "Keeping its look consistent for many years",
          "Redesigning its logo every few months",
          "Hiding from customers",
          "Using a different name in every shop",
        ],
        answerIndex: 0,
        explanation: "Consistency lets people's memories lock the brand in place.",
      },
      {
        question: "Is a local brand worse than a global brand?",
        options: [
          "Yes, always",
          "No — it's simply known by fewer people",
          "Yes, because it is newer",
          "No, because local brands are always cheaper",
        ],
        answerIndex: 1,
        explanation:
          "Local brands can be excellent and much loved; they just have a smaller audience.",
      },
    ],
    trueFalse: [
      {
        statement: "Famous brands usually change their logo every year.",
        answer: false,
        explanation: "They mostly keep it steady for decades so people don't get confused.",
      },
      {
        statement: "A brand can be very famous in one country and unknown in another.",
        answer: true,
        explanation: "Plenty of huge national brands have never crossed their own border.",
      },
    ],
    activity: {
      title: "Global vs Local Chart",
      instructions:
        "Make two columns on a page: GLOBAL and LOCAL. List four brands under each. For every local brand, write one reason people in your area love it. For every global brand, write one place you've seen its logo.",
    },
    challenge: {
      title: "Detective Challenge: The Fame Test",
      prompt:
        "Ask three different people to name the first brand that pops into their head. Did anyone say the same one? Write down what that tells you about which brands are winning the memory game where you live.",
    },
    reward: { badge: "⭐", label: "Brand Hunter Badge" },
  },
  {
    id: 5,
    name: "Trademark Detectives",
    icon: "⚖️",
    color: "green",
    description: "Unlock the real detective secret: the law that stops anyone stealing a brand.",
    difficulty: "Medium",
    xp: 100,
    time: "15 mins",
    href: "/levels/what-is-a-trademark",
    story:
      "Questy unlocks a heavy drawer marked CONFIDENTIAL. Inside is a single certificate with a tiny ® stamped in the corner. 'This,' she says quietly, 'is how a brand gets bodyguards. It's called a trademark, and today you learn to read the signs.'",
    objectives: [
      "Explain what a trademark is",
      "Recognise the ™ and ® symbols",
      "List things that can and cannot be trademarked",
    ],
    briefing:
      "A trademark turns a brand into property. Learn the symbols and you'll spot protected brands everywhere you look.",
    miniLesson: {
      heading: "Trademarks: a brand's bodyguard",
      body: "A trademark is a legal way of saying 'this mark belongs to us, and nobody else may use it to sell similar things'. Companies register their name, logo, or even a special colour or sound with a government office. Once it's registered, they can stop copycats. You'll see two little symbols: ™ means a company is claiming a mark, and ® means it has been officially registered and approved. Trademarks protect brand identity — they don't protect the invention inside the product, which is a different kind of protection altogether.",
      examples: [
        "® next to a famous drinks name on the can",
        "™ beside a brand-new product name",
        "A registered short jingle you hear when a computer starts up",
      ],
    },
    mcqs: [
      {
        question: "What does a trademark protect?",
        options: [
          "The brand's name, logo and identity",
          "The building the company works in",
          "The staff's lunch",
          "The price of the product",
        ],
        answerIndex: 0,
        explanation: "Trademarks guard identity — the marks that tell customers who made something.",
      },
      {
        question: "What does the ® symbol tell a detective?",
        options: [
          "The product is on sale",
          "The mark is officially registered",
          "The item is recyclable",
          "The brand is brand new",
        ],
        answerIndex: 1,
        explanation: "® means registered and officially approved.",
      },
      {
        question: "Which of these could most likely be trademarked?",
        options: [
          "The word 'water' for selling water",
          "A made-up brand name and its logo",
          "A colour of the sky",
          "A common greeting like 'hello'",
        ],
        answerIndex: 1,
        explanation:
          "Distinctive, invented marks can be protected; ordinary words for ordinary things usually can't.",
      },
    ],
    trueFalse: [
      {
        statement: "Anyone is allowed to use a registered logo on their own products.",
        answer: false,
        explanation: "That's exactly what a trademark stops.",
      },
      {
        statement: "A sound can sometimes be registered as a trademark.",
        answer: true,
        explanation: "Famous jingles and start-up sounds really are protected marks.",
      },
    ],
    activity: {
      title: "Symbol Safari",
      instructions:
        "Hunt around your home for the ™ and ® symbols. They're usually tiny, printed near a brand name. Find at least three and write down which brand each one belonged to and where you found it.",
    },
    challenge: {
      title: "Detective Challenge: Protect or Not?",
      prompt:
        "Decide whether each of these could be trademarked and explain why: (1) the invented word 'Zibbly' for a cereal, (2) the word 'Milk' for selling milk, (3) a hand-drawn dragon logo. Write one sentence for each.",
    },
    reward: { badge: "⚖️", label: "Trademark Detective Badge" },
  },
  {
    id: 6,
    name: "Shapes & Symbols",
    icon: "🔷",
    color: "cyan",
    description: "Crack the secret language hidden inside circles, arrows and swooshes.",
    difficulty: "Medium",
    xp: 110,
    time: "15 mins",
    story:
      "Questy sketches a circle, a triangle and an arrow on the whiteboard. 'Three shapes. No words. But every single one is already telling you something.' She taps the arrow. 'This one says forward. Ready to learn the secret language?'",
    objectives: [
      "Explain how shapes create feelings",
      "Match common shapes to the message they send",
      "Design a shape that fits a chosen feeling",
    ],
    briefing:
      "Designers pick shapes on purpose. Decode their choices and you'll understand a logo before you've read a single letter.",
    miniLesson: {
      heading: "Shapes talk without speaking",
      body: "Every shape carries a feeling, and designers use this deliberately. Circles have no sharp edges, so they feel friendly, safe and never-ending — good for community and togetherness. Squares and rectangles feel solid, steady and trustworthy, which is why banks like them. Triangles point somewhere, so they feel powerful and full of direction. Arrows and swooshes suggest speed and movement, perfect for sports and delivery. When you next look at a logo, ask yourself: what is this shape trying to make me feel?",
      examples: [
        "A circle used by a brand that wants to feel welcoming",
        "A strong square badge on something built to last",
        "A curved swoosh that makes trainers feel fast",
      ],
    },
    mcqs: [
      {
        question: "What feeling do circles usually create in a logo?",
        options: ["Danger and warning", "Friendly and safe", "Cold and sharp", "Expensive and rare"],
        answerIndex: 1,
        explanation: "No sharp corners means circles read as gentle and welcoming.",
      },
      {
        question: "Why might a bank choose a square or rectangle?",
        options: [
          "It feels solid and trustworthy",
          "Squares are cheaper to print",
          "It is the only legal shape",
          "Circles are banned in banking",
        ],
        answerIndex: 0,
        explanation: "Straight, even sides suggest stability — exactly what a bank wants.",
      },
      {
        question: "A swoosh or arrow in a logo usually suggests…",
        options: ["Sleep and rest", "Movement and speed", "Cold weather", "High prices"],
        answerIndex: 1,
        explanation: "Curves and points imply motion heading somewhere.",
      },
    ],
    trueFalse: [
      {
        statement: "Designers pick logo shapes completely at random.",
        answer: false,
        explanation: "Shapes are chosen very deliberately to create a particular feeling.",
      },
      {
        statement: "A triangle can make a logo feel powerful and directed.",
        answer: true,
        explanation: "Triangles point, and pointing suggests purpose and strength.",
      },
    ],
    activity: {
      title: "Feeling Shapes",
      instructions:
        "Draw four shapes: a circle, a square, a triangle and a swoosh. Next to each, write the first feeling word that comes into your head. Then invent a business that would suit each shape — for example a swoosh for a pizza delivery company.",
    },
    challenge: {
      title: "Detective Challenge: Shape Swap",
      prompt:
        "Pick a logo you know that uses a circle. Redraw it inside a sharp triangle instead. Does the brand still feel the same? Write two sentences describing exactly what changed.",
    },
    reward: { badge: "🔷", label: "Symbol Decoder Badge" },
  },
  {
    id: 7,
    name: "Brand Colours",
    icon: "🌈",
    color: "pink",
    description: "Learn why brands guard their colours as fiercely as their names.",
    difficulty: "Medium",
    xp: 120,
    time: "15 mins",
    story:
      "Questy dims the lights and projects three coloured squares onto the wall. Red. Purple. Bright orange. Every rookie in the room shouts out a brand name before she can even ask the question. 'Colour,' she says, 'is the fastest clue of all.'",
    objectives: [
      "Explain how colours create emotions",
      "Give examples of colours strongly linked to brands",
      "Choose suitable colours for an imaginary brand",
    ],
    briefing:
      "Some companies have protected a single colour by law. Find out why colour is worth fighting for.",
    miniLesson: {
      heading: "Colour is a feeling you can see",
      body: "Colours reach your brain even faster than shapes. Red feels exciting, urgent and energetic, so it's used for action and appetite. Blue feels calm, clean and trustworthy, which is why so many banks, hospitals and tech companies choose it. Green suggests nature, health and growth. Yellow feels cheerful and sunny, and often signals value or friendliness. Purple has long been linked to luxury and imagination. Brands use the exact same colour every time so that eventually the colour alone can trigger the memory — and a few companies have even registered their signature colour as a trademark.",
      examples: [
        "A chocolate brand famous for one exact shade of purple",
        "Blue used by companies that want to feel safe and reliable",
        "Green on packaging to suggest natural ingredients",
      ],
    },
    mcqs: [
      {
        question: "Which feeling is blue most often used to create?",
        options: ["Trust and calm", "Anger", "Hunger and urgency", "Fear"],
        answerIndex: 0,
        explanation: "Blue is the classic choice for reliability and calm.",
      },
      {
        question: "Why do brands use exactly the same colour every single time?",
        options: [
          "It is a legal requirement for all products",
          "So the colour alone starts to trigger recognition",
          "Because printers only hold one colour",
          "To save money on ink",
        ],
        answerIndex: 1,
        explanation: "Repetition trains your memory until the colour becomes the clue.",
      },
      {
        question: "Green packaging most often suggests a product is…",
        options: ["Very expensive", "Natural or healthy", "Extremely fast", "For grown-ups only"],
        answerIndex: 1,
        explanation: "Green is strongly connected to nature, health and growth.",
      },
    ],
    trueFalse: [
      {
        statement: "A company can sometimes legally protect one specific colour for its products.",
        answer: true,
        explanation: "It's rare and hard to win, but famous examples really do exist.",
      },
      {
        statement: "Colour has no effect on how you feel about a product.",
        answer: false,
        explanation: "Colour is one of the strongest and fastest emotional signals there is.",
      },
    ],
    activity: {
      title: "Colour Mood Board",
      instructions:
        "Invent a brand for a healthy smoothie. Choose two main colours and write one sentence explaining what feeling each colour gives your customers. Then choose two colours you would definitely avoid, and say why.",
    },
    challenge: {
      title: "Detective Challenge: Wrong Colour Test",
      prompt:
        "Imagine a famous red brand suddenly turned grey. Write three sentences about what customers might think and whether they'd still recognise it on a shelf.",
    },
    reward: { badge: "🌈", label: "Colour Expert Badge" },
  },
  {
    id: 8,
    name: "Mascot Mystery",
    icon: "🐻",
    color: "teal",
    description: "Meet the friendly characters brands use to win your heart — just like Questy.",
    difficulty: "Medium",
    xp: 130,
    time: "18 mins",
    href: "/levels/mascots",
    story:
      "Questy points at herself and takes a dramatic bow. 'Rookie, meet a mascot. Me! Companies invent characters like me because you remember a friend far better than you remember a logo. Now let's investigate my competition.'",
    objectives: [
      "Explain what a mascot is and what it does",
      "Describe why characters are memorable",
      "Invent a mascot for your own brand idea",
    ],
    briefing:
      "Mascots turn companies into characters you can care about. Work out what makes a great one.",
    miniLesson: {
      heading: "Why brands invent characters",
      body: "A mascot is a character that represents a brand — an animal, a person, or something entirely made up. Mascots work because human brains are brilliant at remembering faces and personalities, far better than remembering plain shapes. A good mascot gives a company a friendly voice, makes it easier for children to recognise, and can appear in adverts, games and packaging while telling little stories. The strongest mascots have a clear personality and stay recognisably the same for years, even as their drawing style is gently modernised. And yes — mascots can be trademarked too.",
      examples: [
        "A cheerful animal on a cereal box",
        "A cartoon character that appears in every advert for a snack",
        "Questy, the Brand Quest detective mascot",
      ],
    },
    mcqs: [
      {
        question: "What is a mascot?",
        options: [
          "A character that represents a brand",
          "The price tag on a toy",
          "A type of packaging material",
          "The factory manager",
        ],
        answerIndex: 0,
        explanation: "Mascots are characters standing in for the brand itself.",
      },
      {
        question: "Why are mascots so easy to remember?",
        options: [
          "They are always printed very large",
          "Our brains remember faces and personalities extremely well",
          "They are legally required on packaging",
          "They change every week",
        ],
        answerIndex: 1,
        explanation: "Characters tap straight into our memory for faces and personality.",
      },
      {
        question: "What makes a mascot strong over many years?",
        options: [
          "A clear personality kept consistent",
          "Being redrawn completely each year",
          "Never appearing in adverts",
          "Having no name",
        ],
        answerIndex: 0,
        explanation: "Consistency plus personality is what builds a lasting character.",
      },
    ],
    trueFalse: [
      {
        statement: "A mascot can be protected as a trademark.",
        answer: true,
        explanation: "Mascots are part of brand identity, so they can absolutely be registered.",
      },
      {
        statement: "Mascots must always be real animals.",
        answer: false,
        explanation: "They can be people, objects, or completely invented creatures.",
      },
    ],
    activity: {
      title: "Invent Your Mascot",
      instructions:
        "Design a mascot for a shop that sells sports equipment. Draw it, give it a name, and write three personality words. Then write one sentence your mascot might say to customers.",
    },
    challenge: {
      title: "Detective Challenge: Mascot Line-Up",
      prompt:
        "Find three mascots on products at home. For each one, write down what personality the company is trying to show and whether you think it matches the product. Which mascot is doing the best job, and why?",
    },
    reward: { badge: "🐻", label: "Mascot Master Badge" },
  },
  {
    id: 9,
    name: "Packaging Detectives",
    icon: "📦",
    color: "green",
    description: "Investigate boxes, bottles and wrappers — packaging can be protected too.",
    difficulty: "Medium",
    xp: 150,
    time: "18 mins",
    story:
      "A crate of empty bottles crashes onto the HQ table. Questy holds one up by its neck, all curves and ridges. 'No label. No logo. Nothing.' She turns it slowly. 'And yet you already know the brand, don't you? That's packaging doing detective work.'",
    objectives: [
      "Explain the jobs packaging does for a brand",
      "Recognise packaging shapes as brand clues",
      "Explain why packaging design can be protected",
    ],
    briefing:
      "Packaging isn't just a container — it's a billboard, a bodyguard and a clue all at once. Investigate.",
    miniLesson: {
      heading: "The box is part of the brand",
      body: "Packaging has three jobs. First it protects the product so it arrives undamaged. Second it informs you, carrying the ingredients, the weight and the safety warnings. Third — and this is the detective part — it identifies the brand. The shape of a bottle, the pattern on a wrapper and the exact layout of a box all become clues your brain learns. Because these designs are so valuable, companies can legally protect a distinctive package shape or look, which means copycats can't sell lookalike packaging designed to confuse shoppers.",
      examples: [
        "A curved glass bottle recognisable purely by its silhouette",
        "A triangular chocolate box you'd know in the dark",
        "A tube shape used by one crisp brand for decades",
      ],
    },
    mcqs: [
      {
        question: "Which of these is NOT one of packaging's main jobs?",
        options: [
          "Protecting the product",
          "Informing the customer",
          "Identifying the brand",
          "Cooking the food inside",
        ],
        answerIndex: 3,
        explanation: "Packaging protects, informs and identifies — it doesn't cook.",
      },
      {
        question: "Why can a bottle shape act as a brand clue?",
        options: [
          "Because all bottles are identical",
          "Because a distinctive shape becomes recognisable on its own",
          "Because shapes are always printed on receipts",
          "Because glass is expensive",
        ],
        answerIndex: 1,
        explanation: "A unique silhouette gets learned by your memory just like a logo.",
      },
      {
        question: "Why do companies protect their packaging designs legally?",
        options: [
          "To stop copycats confusing shoppers with lookalikes",
          "To make the boxes stronger",
          "Because cardboard is rare",
          "So they can charge for delivery",
        ],
        answerIndex: 0,
        explanation: "Protection stops others imitating a look shoppers already trust.",
      },
    ],
    trueFalse: [
      {
        statement: "Packaging design can sometimes be legally protected.",
        answer: true,
        explanation: "Distinctive shapes and looks really can be registered.",
      },
      {
        statement: "Packaging is only there to stop things breaking.",
        answer: false,
        explanation: "It also informs customers and identifies the brand.",
      },
    ],
    activity: {
      title: "Silhouette Test",
      instructions:
        "Draw the outline only — no words, no colours — of three packages from your kitchen. Show the outlines to someone in your family and see how many they can name. Which shape was the most recognisable?",
    },
    challenge: {
      title: "Detective Challenge: Redesign the Box",
      prompt:
        "Choose a boring rectangular package and redesign its shape so it becomes instantly recognisable. Draw it and write two sentences explaining which clue your new shape gives shoppers.",
    },
    reward: { badge: "📦", label: "Packaging Detective Badge" },
  },
  {
    id: 10,
    name: "Slogan Challenge",
    icon: "💬",
    color: "indigo",
    description: "Decode the short, sticky sentences that live rent-free in your memory.",
    difficulty: "Hard",
    xp: 160,
    time: "20 mins",
    story:
      "Questy says four words out loud and the whole room finishes the sentence without thinking. She raises an eyebrow. 'Nobody told you to memorise that. It climbed into your head all by itself. That's a slogan — and today you learn to build one.'",
    objectives: [
      "Explain what a slogan is and what it does",
      "Identify the ingredients of a memorable slogan",
      "Write an original slogan for a brand",
    ],
    briefing:
      "A great slogan is a promise you can remember. Discover the recipe, then write your own.",
    miniLesson: {
      heading: "The recipe for a sticky slogan",
      body: "A slogan is a short phrase that captures what a brand promises. The best ones follow a recipe: keep it short, usually under seven words, so it fits in your memory; make it about a benefit for the customer rather than boasting about the company; and add a sound trick like rhythm, rhyme or repeated letters to help it stick. Slogans can be trademarked, which is why one company can't borrow another's famous phrase. A weak slogan describes the product; a strong one describes how the product makes your life better.",
      examples: [
        "A short phrase that pushes you to just get started",
        "A rhyming line about a snack melting in your mouth",
        "A promise of speed in only three words",
      ],
    },
    mcqs: [
      {
        question: "What is a slogan?",
        options: [
          "A short phrase capturing a brand's promise",
          "The legal name of a company",
          "The barcode on packaging",
          "A type of logo shape",
        ],
        answerIndex: 0,
        explanation: "It's the memorable phrase that sums up what the brand offers.",
      },
      {
        question: "Which slogan is most likely to stick in someone's memory?",
        options: [
          "A detailed forty-word description of manufacturing",
          "A short, rhythmic phrase about a benefit",
          "A list of ingredients",
          "The company's postal address",
        ],
        answerIndex: 1,
        explanation: "Short plus rhythmic plus benefit-focused is the winning combination.",
      },
      {
        question: "Can a slogan be legally protected?",
        options: [
          "No, phrases are always free to copy",
          "Yes, slogans can be trademarked",
          "Only if it rhymes",
          "Only in one country",
        ],
        answerIndex: 1,
        explanation: "Distinctive slogans can be registered just like names and logos.",
      },
    ],
    trueFalse: [
      {
        statement: "The best slogans are usually long and detailed.",
        answer: false,
        explanation: "Short phrases are far easier to remember and repeat.",
      },
      {
        statement: "A slogan should focus on how the product helps the customer.",
        answer: true,
        explanation: "Benefit beats boasting every time.",
      },
    ],
    activity: {
      title: "Slogan Workshop",
      instructions:
        "Write three different slogans for a shop that sells second-hand books. Make each one six words or fewer. Try one with a rhyme, one with repeated letters, and one that is a straight promise. Read them aloud and pick your favourite.",
    },
    challenge: {
      title: "Detective Challenge: Slogan Surgery",
      prompt:
        "Take this weak slogan: 'We sell shoes made in a factory using materials.' Rewrite it in five words or fewer so it focuses on the customer's benefit. Then explain in one sentence why yours is stronger.",
    },
    reward: { badge: "💬", label: "Slogan Writer Badge" },
  },
  {
    id: 11,
    name: "Real vs Fake",
    icon: "🔎",
    color: "red",
    description: "Your hardest case yet — spot counterfeits and learn why copying causes real harm.",
    difficulty: "Hard",
    xp: 180,
    time: "20 mins",
    story:
      "Two identical-looking trainers sit on the evidence table. Questy's tail flicks. 'One is genuine. One is a fake. They fooled a shop, they fooled a customer — but they will not fool a Brand Quest detective. Look closer.'",
    objectives: [
      "Explain what a counterfeit is",
      "List clues that reveal a fake product",
      "Explain who is harmed by counterfeits",
    ],
    briefing:
      "Counterfeits are copies pretending to be the real thing. Learn the tell-tale clues and the real-world damage they cause.",
    miniLesson: {
      heading: "Spotting a counterfeit",
      body: "A counterfeit is a fake product made to look like a genuine branded one, created to trick people into buying it. Detectives look for specific clues: spelling mistakes in the brand name, a logo with slightly wrong proportions or colours, sloppy stitching and glue marks, missing labels or safety information, and a price that seems far too good to be true. Counterfeits cause genuine harm. They can be unsafe because nobody checked them properly, they cheat the customer who paid for quality, and they steal from the people who spent years designing and building the real brand.",
      examples: [
        "A famous name spelled with one letter changed",
        "A logo squashed slightly out of shape",
        "A designer item sold for a suspiciously tiny price",
      ],
    },
    mcqs: [
      {
        question: "What is a counterfeit product?",
        options: [
          "A fake made to look like a genuine brand",
          "A product on sale at a discount",
          "A product made in another country",
          "An older version of a product",
        ],
        answerIndex: 0,
        explanation: "The key is the intention to deceive, not the price or origin.",
      },
      {
        question: "Which is the clearest warning sign of a fake?",
        options: [
          "The brand name is spelled wrongly",
          "The item comes in a box",
          "The product has a barcode",
          "It is sold in a large shop",
        ],
        answerIndex: 0,
        explanation: "Misspelled names are one of the most reliable giveaways.",
      },
      {
        question: "Why are counterfeits harmful?",
        options: [
          "They can be unsafe and they cheat both customers and creators",
          "They are always more expensive",
          "They use too much packaging",
          "They are printed in colour",
        ],
        answerIndex: 0,
        explanation: "Safety risks plus theft of other people's work make fakes genuinely damaging.",
      },
    ],
    trueFalse: [
      {
        statement: "A price that seems far too good to be true can be a clue to a fake.",
        answer: true,
        explanation: "Unbelievable bargains are one of the classic warning signs.",
      },
      {
        statement: "Counterfeits are harmless because the customer still gets a product.",
        answer: false,
        explanation:
          "Fakes can be unsafe, and they steal from the people who created the real thing.",
      },
    ],
    activity: {
      title: "Build a Checklist",
      instructions:
        "Write a five-point Fake Detector Checklist a shopper could use before buying something branded. Order your points from the easiest clue to check to the hardest, and explain your ordering in one sentence.",
    },
    challenge: {
      title: "Detective Challenge: The Evidence Report",
      prompt:
        "Imagine you found a fake product. Write a short detective report with three sections: the clues you spotted, who is harmed by this fake, and what you would advise the shopper to do next.",
    },
    reward: { badge: "🔎", label: "Anti-Counterfeit Badge" },
  },
  {
    id: 12,
    name: "Build Your Own Brand",
    icon: "🛠️",
    color: "orange",
    description: "Put every skill together and construct a complete brand from nothing.",
    difficulty: "Hard",
    xp: 200,
    time: "22 mins",
    story:
      "Questy clears the entire evidence table and lays down one blank sheet of paper. 'You've spent eleven worlds taking brands apart, rookie. Time to prove you can build one. Everything you've learned — name, logo, colour, mascot, slogan — starts right here.'",
    objectives: [
      "Combine name, logo, colour and slogan into one identity",
      "Explain why each of your choices fits together",
      "Present your brand clearly to someone else",
    ],
    briefing:
      "This is your workshop mission. Build a complete, consistent brand and be ready to defend every decision.",
    miniLesson: {
      heading: "The five building blocks",
      body: "Every strong brand is built from five parts working together. The name should be easy to say, easy to spell and different from competitors. The logo should be simple enough to draw from memory. The colours should match the feeling you want customers to have. The mascot, if you use one, gives your brand a personality and a voice. The slogan makes your promise memorable. The real skill is consistency: all five parts must tell the same story. A calm, natural brand with a screaming red logo and an aggressive slogan would confuse everybody.",
      examples: [
        "A calm wellness brand: soft name, green palette, gentle slogan",
        "A fast delivery brand: short punchy name, arrow logo, speedy promise",
        "A children's brand: friendly mascot, bright colours, playful phrase",
      ],
    },
    mcqs: [
      {
        question: "What matters most when combining the parts of a brand?",
        options: [
          "That every part tells the same story",
          "That every part is a different colour",
          "That the name is as long as possible",
          "That the logo is complicated",
        ],
        answerIndex: 0,
        explanation: "Consistency across all elements is what makes a brand feel believable.",
      },
      {
        question: "Which name would work best for a new brand?",
        options: [
          "One that is easy to say, spell and remember",
          "One almost identical to a famous brand",
          "One that is thirty letters long",
          "One that means nothing to anyone including the owner",
        ],
        answerIndex: 0,
        explanation:
          "Easy and distinctive wins — and copying a famous name would land you in legal trouble.",
      },
      {
        question: "A brand selling calm bedtime tea should probably avoid…",
        options: [
          "Soft blues and gentle wording",
          "A bright, shouty red logo with an aggressive slogan",
          "A friendly mascot",
          "A simple, memorable name",
        ],
        answerIndex: 1,
        explanation: "Loud, urgent design contradicts the calm promise.",
      },
    ],
    trueFalse: [
      {
        statement: "It is fine to pick a name almost identical to a famous brand.",
        answer: false,
        explanation: "That risks confusing customers and breaking trademark law.",
      },
      {
        statement: "A brand's colours should match the feeling it wants to create.",
        answer: true,
        explanation: "Mismatched colours send customers a confusing message.",
      },
    ],
    activity: {
      title: "Your Brand Blueprint",
      instructions:
        "Invent a brand for a healthy after-school snack. Fill in all five blocks: name, logo sketch, two colours, a mascot with a name, and a slogan of six words or fewer. Keep every choice pointing at the same feeling.",
    },
    challenge: {
      title: "Detective Challenge: Defend Your Brand",
      prompt:
        "Present your new brand to a family member in under sixty seconds. Then write down one question they asked and how you would improve your brand based on their answer.",
    },
    reward: { badge: "🛠️", label: "Brand Builder Badge" },
  },
  {
    id: 13,
    name: "Protecting Ideas",
    icon: "🛡️",
    color: "blue",
    description: "Learn the three great shields: trademarks, copyright and patents.",
    difficulty: "Hard",
    xp: 220,
    time: "22 mins",
    story:
      "Questy wheels out a rack holding three different shields, each engraved with a different symbol. 'Rookie, you've built a brand. Now somebody will try to take it. These three shields are how creators fight back — and knowing which shield to grab is a real detective skill.'",
    objectives: [
      "Tell trademarks, copyright and patents apart",
      "Match a creation to the right kind of protection",
      "Explain why protecting ideas is fair",
    ],
    briefing:
      "Three shields, three jobs. Learn which one guards a name, which guards a story and which guards an invention.",
    miniLesson: {
      heading: "Three shields for three jobs",
      body: "A trademark protects brand identity — names, logos, slogans and other marks that tell customers who made something. Copyright protects creative works the moment you make them: stories, songs, drawings, photographs and videos. A patent protects a genuinely new invention, like a new kind of machine or a clever mechanism, so nobody can build and sell it without permission. The easy way to remember it: trademark guards who you are, copyright guards what you created, and a patent guards how something works. All three exist for the same fair reason — the person who did the work should decide who gets to use it.",
      examples: [
        "Trademark: a company's logo and name",
        "Copyright: a song, a picture book or a drawing you made",
        "Patent: a newly invented folding bicycle mechanism",
      ],
    },
    mcqs: [
      {
        question: "Which protection covers a song you have written?",
        options: ["Copyright", "Trademark", "Patent", "None of them"],
        answerIndex: 0,
        explanation: "Copyright protects creative works from the moment they're created.",
      },
      {
        question: "A brand-new invented machine would be protected by a…",
        options: ["Trademark", "Copyright", "Patent", "Slogan"],
        answerIndex: 2,
        explanation: "Patents cover inventions and how they work.",
      },
      {
        question: "Why do these protections exist?",
        options: [
          "So the person who did the work decides who may use it",
          "To make products more expensive",
          "To stop anyone inventing anything",
          "Because there is not enough paper",
        ],
        answerIndex: 0,
        explanation: "Fairness to creators is the reason behind all three shields.",
      },
    ],
    trueFalse: [
      {
        statement: "Copyright and trademarks protect exactly the same things.",
        answer: false,
        explanation:
          "Copyright covers creative works; trademarks cover brand identity — different jobs.",
      },
      {
        statement: "A drawing you make is protected by copyright as soon as you create it.",
        answer: true,
        explanation: "Copyright applies automatically the moment the work exists.",
      },
    ],
    activity: {
      title: "Shield Sorting",
      instructions:
        "Sort these into trademark, copyright or patent: a company logo, a comic you drew, a new type of umbrella that never blows inside out, a catchy advert jingle, and a shop's name. Write one sentence explaining each choice.",
    },
    challenge: {
      title: "Detective Challenge: Advise the Inventor",
      prompt:
        "A friend invents a new water bottle that keeps drinks cold for two days, gives it a name, and draws a logo. Explain which shield protects which part of their work, and why they might need more than one.",
    },
    reward: { badge: "🛡️", label: "Idea Guardian Badge" },
  },
  {
    id: 14,
    name: "Detective Master Mission",
    icon: "🏆",
    color: "gold",
    description: "The big case. Every skill from worlds 1–13 in one final investigation.",
    difficulty: "Expert",
    xp: 300,
    time: "25 mins",
    story:
      "The HQ lights go red. Questy slaps a thick case file onto the table stamped URGENT. 'A brand-new company is launching next week and something is badly wrong with it. Names, logos, colours, packaging, a suspicious lookalike — it's all in here. This is everything you've learned, rookie. One case. No hints.'",
    objectives: [
      "Apply every skill from worlds 1 to 13 together",
      "Judge whether a brand is original or copied",
      "Write a full detective conclusion with evidence",
    ],
    briefing:
      "No new lesson this time. This is your master examination — read the evidence and reach a verdict you can defend.",
    miniLesson: {
      heading: "How a master detective reviews a case",
      body: "Master detectives work in a fixed order so they never miss anything. First examine the name: is it original, easy to say, and different from existing brands? Second examine the logo: is it simple, distinctive, and not suspiciously similar to another? Third check the colours and packaging for lookalike tricks designed to confuse shoppers. Fourth look for the ™ or ® symbols and ask whether the marks are properly protected. Finally, weigh it all up and write a verdict supported by the specific clues you found, not by a feeling. Evidence first, opinion second — that's the rule.",
      examples: [
        "Checking a name against existing brands before launch",
        "Comparing two logos side by side for suspicious similarity",
        "Reviewing packaging for deliberate lookalike design",
      ],
    },
    mcqs: [
      {
        question: "What should a master detective examine first in a brand case?",
        options: [
          "Whether the name is original and distinctive",
          "The colour of the delivery van",
          "How many staff the company has",
          "The weather on launch day",
        ],
        answerIndex: 0,
        explanation: "The name is the foundation, so it's checked first.",
      },
      {
        question: "A new brand's logo looks almost identical to a famous one. This is…",
        options: [
          "A serious problem that could confuse customers and break the law",
          "Completely fine if the colours differ slightly",
          "A clever and legal shortcut",
          "Only an issue if the company is large",
        ],
        answerIndex: 0,
        explanation: "Confusing similarity is exactly what trademark law prevents.",
      },
      {
        question: "A good detective verdict must be based on…",
        options: [
          "Specific evidence and clues",
          "A personal feeling",
          "Whichever brand is cheaper",
          "The first thing you noticed",
        ],
        answerIndex: 0,
        explanation: "Evidence first, opinion second — always.",
      },
    ],
    trueFalse: [
      {
        statement: "Copying a famous logo is acceptable as long as you change the colour.",
        answer: false,
        explanation:
          "If customers could still be confused, it remains a serious trademark problem.",
      },
      {
        statement: "A master detective checks the name, logo, colours and packaging before deciding.",
        answer: true,
        explanation: "Working through every element in order is what stops mistakes.",
      },
    ],
    activity: {
      title: "The Full Case Review",
      instructions:
        "Invent a suspicious new brand and review it using all four steps: name, logo, colours and packaging, then protection symbols. Write one finding for each step and give it a final score out of ten for originality.",
    },
    challenge: {
      title: "Detective Challenge: The Verdict",
      prompt:
        "Write a complete detective report on your suspicious brand. Include the evidence you found, which world's skill helped you spot each clue, your final verdict, and one piece of advice for the company.",
    },
    reward: { badge: "🏆", label: "Master Detective Trophy" },
  },
  {
    id: 15,
    name: "Graduation Ceremony",
    icon: "👑",
    color: "royalPurple",
    description: "Take the final oath, collect your certificate and become a Master Brand Detective.",
    difficulty: "Expert",
    xp: 500,
    time: "30 mins",
    href: "/levels/trademark-master",
    story:
      "The whole of Brand Quest Headquarters is decorated with stars and streamers. Questy stands at the front holding a golden certificate with your name on it. 'Fifteen worlds. Fifteen cases solved. You walked in here a rookie who couldn't see the clues.' She grins. 'Detective — you may collect your badge.'",
    objectives: [
      "Summarise everything learned across all fifteen worlds",
      "Take the Brand Detective oath",
      "Earn the Master Brand Detective certificate",
    ],
    briefing:
      "Your final mission: prove you can teach what you know. A true master detective can explain the clues to someone else.",
    miniLesson: {
      heading: "Everything you now know",
      body: "You can spot brand clues on any object. You know a product is a thing while a brand is a reputation. You can read logos, decode shapes and colours, recognise mascots and packaging as identity, and write a slogan people remember. You understand what a trademark is and what the ™ and ® symbols mean. You can spot a counterfeit and explain the harm it causes. You can build a complete brand of your own, and you know which of the three shields protects a name, a creation or an invention. That is the full detective toolkit — and the best detectives keep using it every single day.",
      examples: [
        "Explaining to a friend why a logo is easy to remember",
        "Spotting a lookalike product while out shopping",
        "Designing a brand for a school project using all five blocks",
      ],
    },
    mcqs: [
      {
        question: "What does a Master Brand Detective do best?",
        options: [
          "Notices clues and explains them clearly to others",
          "Memorises prices",
          "Draws the most complicated logos",
          "Buys the most products",
        ],
        answerIndex: 0,
        explanation: "Noticing and explaining is the mark of true mastery.",
      },
      {
        question: "Which set correctly lists the three shields?",
        options: [
          "Trademark, copyright, patent",
          "Logo, slogan, mascot",
          "Red, blue, green",
          "Name, box, price",
        ],
        answerIndex: 0,
        explanation: "Identity, creations and inventions — the three protections.",
      },
      {
        question: "The most important detective rule is…",
        options: [
          "Base your verdict on evidence",
          "Always trust the cheapest option",
          "Guess quickly",
          "Ignore the packaging",
        ],
        answerIndex: 0,
        explanation: "Evidence before opinion, in every single case.",
      },
    ],
    trueFalse: [
      {
        statement: "A Master Brand Detective can explain what they spotted and why it matters.",
        answer: true,
        explanation: "Teaching others is the highest level of understanding.",
      },
      {
        statement: "Once you graduate, brand clues stop appearing in daily life.",
        answer: false,
        explanation: "They're everywhere, forever — now you can actually see them.",
      },
    ],
    activity: {
      title: "Teach It Forward",
      instructions:
        "Choose your three favourite things you learned across the fifteen worlds. Teach them to a younger child or a family member in your own words, using real products around you as examples.",
    },
    challenge: {
      title: "Detective Challenge: The Oath",
      prompt:
        "Write your own Brand Detective Oath in three lines. Promise what you will always look for, what you will never do, and what you will teach others. Then sign it with your detective name.",
    },
    reward: { badge: "👑", label: "Master Brand Detective Certificate" },
  },
];

/** Total XP available across the whole journey. */
export const totalJourneyXp = worlds.reduce((sum, world) => sum + world.xp, 0);

export function getWorld(id: number): World | undefined {
  return worlds.find((world) => world.id === id);
}

/**
 * Converts a world's authored questions into the shared quiz model, so every
 * world renders through the same components as Levels 1–5.
 */
export function toQuizQuestions(world: World): QuizQuestion[] {
  const mcqs: QuizQuestion[] = world.mcqs.map((mcq, index) => ({
    id: `world-${world.id}-mcq-${index + 1}`,
    type: "multiple-choice",
    prompt: mcq.question,
    explanation: mcq.explanation,
    choices: mcq.options.map((option, optionIndex) => ({
      id: `world-${world.id}-mcq-${index + 1}-${optionIndex}`,
      label: option,
      isCorrect: optionIndex === mcq.answerIndex,
    })),
  }));

  const trueFalse: QuizQuestion[] = world.trueFalse.map((item, index) => ({
    id: `world-${world.id}-tf-${index + 1}`,
    type: "true-false",
    prompt: "True or false, detective?",
    statement: item.statement,
    correctAnswer: item.answer,
    explanation: item.explanation,
  }));

  return [...mcqs, ...trueFalse];
}
