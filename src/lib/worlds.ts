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
  activity: { title: string; instructions: string; kind?: "match" | "sort" | "clue" | "scenario" | "create" | "classify" | "mystery" | "colour" | "jigsaw" };
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
type IpWorldSeed = Omit<World, "mcqs" | "trueFalse"> & {
  mcq: WorldMcq;
  fact: WorldTrueFalse;
};


const followUpQuestions: Record<
  number,
  { mcqs: [WorldMcq, WorldMcq]; fact: WorldTrueFalse }
> = {
  1: { mcqs: [
    { question: "Which clue is something a person created?", options: ["A comic", "A rain cloud", "A shoe size", "A clock tick"], answerIndex: 0, explanation: "A comic is a creative work made by a person." },
    { question: "Which four IP clue families will Questy explore?", options: ["Trademark, patent, copyright and design", "Cloud, rain, wind and snow", "Breakfast, lunch, dinner and snack", "Red, blue, green and yellow"], answerIndex: 0, explanation: "Those are the four detective keys in this journey." },
  ], fact: { statement: "IP detectives can spot different kinds of creation clues in everyday life.", answer: true, explanation: "Names, inventions, art and product looks can all be clues." } },
  2: { mcqs: [
    { question: "What can help an idea grow into an invention?", options: ["Thinking of a problem to solve", "Copying a friend's work", "Ignoring every problem", "Choosing a random price"], answerIndex: 0, explanation: "Many useful inventions start with a problem." },
    { question: "Which is an idea rather than a finished object?", options: ["A plan for a rainproof bag", "A bag already on a shelf", "A puddle", "A receipt"], answerIndex: 0, explanation: "A plan is an idea before it becomes an object." },
  ], fact: { statement: "An idea can start small and grow with careful work.", answer: true, explanation: "Creators often improve ideas step by step." } },
  3: { mcqs: [
    { question: "Which clue could help you recognise a pretend bakery?", options: ["Its special name and logo", "Today’s temperature", "The shop floor", "A bus timetable"], answerIndex: 0, explanation: "A name and logo can act as trademark clues." },
    { question: "A trademark is mainly a clue about...", options: ["Who a product or service comes from", "How an invention works", "The weather outside", "A song’s beat"], answerIndex: 0, explanation: "It helps people recognise a business." },
  ], fact: { statement: "A trademark is different from the product itself.", answer: true, explanation: "It is an identity clue for the product or service." } },
  4: { mcqs: [
    { question: "What makes a strong original visual clue?", options: ["A fresh symbol you create", "An exact copy of another logo", "A blank page only", "A secret price tag"], answerIndex: 0, explanation: "Creating something original is the best choice." },
    { question: "Which part can make a pretend ice-cream cart memorable?", options: ["Its own moon symbol", "A copied real-world mark", "A broken wheel", "A weather forecast"], answerIndex: 0, explanation: "An original symbol is a visual identity clue." },
  ], fact: { statement: "Colours and shapes can help people remember a brand clue.", answer: true, explanation: "Visual details can be easier to notice and recall." } },
  5: { mcqs: [
    { question: "What is a good slogan for an imaginary drink?", options: ["Sip, smile, sparkle!", "Use another company’s slogan", "A full weather report", "A receipt number"], answerIndex: 0, explanation: "A short original phrase can be memorable." },
    { question: "Which detail belongs to packaging?", options: ["A box pattern", "A patent drawing of a mechanism", "A school timetable", "A cloud shape"], answerIndex: 0, explanation: "Packaging can use patterns, shapes and words." },
  ], fact: { statement: "Making up a fresh slogan is better than copying a familiar one.", answer: true, explanation: "Original presentation respects other creators." } },
  6: { mcqs: [
    { question: "Which clue means you should check a product more carefully?", options: ["A strangely misspelled label", "A clear safety label", "A trusted adult beside you", "A normal receipt"], answerIndex: 0, explanation: "Odd spelling can be a reason to pause and check." },
    { question: "What is the safest next step with a suspicious online shop?", options: ["Ask a trusted adult", "Enter personal details quickly", "Share the link everywhere", "Guess that it is safe"], answerIndex: 0, explanation: "A trusted adult can help you decide safely." },
  ], fact: { statement: "One unusual clue means you should check more carefully, not make a quick accusation.", answer: true, explanation: "Good detectives stay calm and gather information." } },
  7: { mcqs: [
    { question: "What does an inventor try to do?", options: ["Solve a problem in a new useful way", "Copy a logo", "Change the weather", "Hide a drawing"], answerIndex: 0, explanation: "Inventions often help solve problems." },
    { question: "Which is an invention clue?", options: ["A new fold-out rain cover", "A bakery name", "A comic character", "A shoe pattern"], answerIndex: 0, explanation: "A new useful product feature can be an invention clue." },
  ], fact: { statement: "Inventors can improve an idea after testing it.", answer: true, explanation: "Trying and improving are part of inventing." } },
  8: { mcqs: [
    { question: "What does a patent description explain?", options: ["How an invention works", "Only a product’s colour", "A song’s chorus", "A shop opening time"], answerIndex: 0, explanation: "Technical details help explain an invention." },
    { question: "Why are clear invention details useful?", options: ["They show what is new and useful", "They make every logo the same", "They replace a name", "They hide the problem"], answerIndex: 0, explanation: "Details help people understand the solution." },
  ], fact: { statement: "A patent clue is mainly about a technical invention, not its logo.", answer: true, explanation: "Names and logos are trademark clues." } },
  9: { mcqs: [
    { question: "What comes first on a good invention card?", options: ["The problem to solve", "A copied brand name", "A payment receipt", "A weather symbol"], answerIndex: 0, explanation: "A clear problem gives an invention purpose." },
    { question: "Which feature could help explain an invention?", options: ["A labelled sketch", "Someone else’s logo", "An empty slogan", "A hidden problem"], answerIndex: 0, explanation: "Labels make an idea easier to understand." },
  ], fact: { statement: "Your invention can be imaginative and still solve a real everyday problem.", answer: true, explanation: "Useful ideas can also be playful." } },
  10: { mcqs: [
    { question: "Which item is a creative work?", options: ["An original song", "A shoe size", "A rain cloud", "A bus stop"], answerIndex: 0, explanation: "Songs can be original creative works." },
    { question: "What is a respectful way to share an artist’s work?", options: ["Ask first and give credit where appropriate", "Post it as your own", "Remove the artist’s name", "Copy it without checking"], answerIndex: 0, explanation: "Creators deserve respect for their work." },
  ], fact: { statement: "Stories, music, art and photos can all be creative works.", answer: true, explanation: "They can be made through imagination and effort." } },
  11: { mcqs: [
    { question: "What should you do before using someone else’s drawing online?", options: ["Ask permission or check with a trusted adult", "Claim you made it", "Erase the credit", "Copy it quickly"], answerIndex: 0, explanation: "Permission and credit are respectful habits." },
    { question: "Which work might be protected by copyright?", options: ["An original story", "A shoe price", "A puddle", "A calendar date"], answerIndex: 0, explanation: "Original creative expression can have copyright." },
  ], fact: { statement: "Making your own artwork is a great way to respect creators.", answer: true, explanation: "Your own creativity matters too." } },
  12: { mcqs: [
    { question: "Which clue is about a product’s design?", options: ["Its special lamp shape", "Its technical motor", "Its shop name", "Its song"], answerIndex: 0, explanation: "Shape and appearance are design clues." },
    { question: "How is a design clue different from a patent clue?", options: ["Design is about how it looks; patent is about how it works", "They are always identical", "Design is only a price", "Patent is only a colour"], answerIndex: 0, explanation: "They focus on different parts of a product." },
  ], fact: { statement: "Patterns and decoration can be design clues.", answer: true, explanation: "They are part of an object’s visual appearance." } },
  13: { mcqs: [
    { question: "Robo-Rover has a new wheel mechanism. Which IP clue fits best?", options: ["Patent", "Trademark", "Copyright", "Design"], answerIndex: 0, explanation: "A technical mechanism is an invention clue." },
    { question: "Robo-Rover has artwork on its box. Which IP clue fits best?", options: ["Copyright", "Patent", "Trademark", "Design"], answerIndex: 0, explanation: "Original artwork is a creative-work clue." },
  ], fact: { statement: "Robo-Rover’s name/logo, mechanism, artwork and shell appearance can each point to different IP.", answer: true, explanation: "One product can contain several kinds of clues." } },
  14: { mcqs: [
    { question: "Which key opens the case for a new useful mechanism?", options: ["Patent", "Trademark", "Copyright", "Design"], answerIndex: 0, explanation: "A new useful mechanism is an invention clue." },
    { question: "Which key opens the case for an original museum poster?", options: ["Copyright", "Trademark", "Patent", "Design"], answerIndex: 0, explanation: "An original poster is creative work." },
  ], fact: { statement: "A master detective chooses the best IP key by reading each clue closely.", answer: true, explanation: "The same product can have several different clues." } },
  15: { mcqs: [
    { question: "Which habit shows you are a Little IP Detective?", options: ["Respect creators and make original ideas", "Copy without asking", "Ignore every clue", "Share private details"], answerIndex: 0, explanation: "Respect and creativity are key detective habits." },
    { question: "What does your Certificate of Completion celebrate?", options: ["Your learning journey", "A professional licence", "A shopping reward", "A secret pass"], answerIndex: 0, explanation: "It celebrates what you learned across the journey." },
  ], fact: { statement: "Graduation is a celebration of your learning, curiosity and respectful creator habits.", answer: true, explanation: "You have completed the Little IP Detective journey." } },
};

const makeIpWorld = ({ mcq, fact, ...world }: IpWorldSeed): World => {
  const followUp = followUpQuestions[world.id];

  return {
    ...world,
    mcqs: [mcq, ...followUp.mcqs],
    trueFalse: [fact, followUp.fact],
  };
};

export const worlds: World[] = [
  makeIpWorld({
    id: 1, name: "Welcome, IP Detective!", icon: "🕵️", color: "blue", difficulty: "Easy", xp: 50, time: "10 mins",
    description: "Meet Questy and discover the four kinds of clues an IP detective follows.",
    story: "Questy opens the Little IP Detectives casebook. Inside are a logo, a clever invention, a drawing and a shiny product shape. 'All of these began as ideas,' she says. 'Let us learn how to spot and respect them!'",
    objectives: ["Meet the four IP clue families", "Know that ideas can be protected", "Begin your detective notebook"],
    briefing: "Your first case is to find out what IP means: ideas, creativity and inventions all leave clues.",
    miniLesson: { heading: "What is intellectual property?", body: "Intellectual property, or IP, is a big name for things people create with their minds. A name or logo can be a trademark. A new invention can be protected by a patent. Art, stories and music can have copyright. A special product look can be a design.", examples: ["A name or logo", "A clever invention", "A drawing or story"] },
    activity: { kind: "clue", title: "Questy's clue bag", instructions: "Choose the clue that belongs in Questy's IP casebook: a logo, invention, artwork or design." },
    challenge: { title: "My detective promise", prompt: "Say or write: I will celebrate ideas and respect the people who create them." },
    reward: { badge: "🔎", label: "Little IP Detective Badge" },
    mcq: { question: "What does IP describe?", options: ["Things people create with their minds", "Only playground games", "Only shop prices", "Only weather clues"], answerIndex: 0, explanation: "IP includes creations such as brands, inventions, art and designs." },
    fact: { statement: "A logo, an invention and a drawing can all be IP clues.", answer: true, explanation: "They can be protected in different ways." },
  }),
  makeIpWorld({
    id: 2, name: "The World of Ideas", icon: "💡", color: "orange", difficulty: "Easy", xp: 60, time: "12 mins",
    description: "Discover how everyday ideas grow into useful and creative things.",
    story: "A rainy-day problem has filled Questy's street with puddles. A child sketches a splash-proof shoe cover. 'Every invention starts with somebody noticing a problem,' says Questy.",
    objectives: ["Spot a problem worth solving", "Tell an idea from an object", "Explain why creators deserve credit"],
    briefing: "Follow an idea from a tiny spark to something useful.",
    miniLesson: { heading: "Ideas can grow", body: "Ideas often begin with a question: How could this be easier, safer or more fun? Some ideas become inventions. Some become drawings, stories, names or designs. People work hard to turn ideas into real things, so it matters to give creators credit.", examples: ["A safer lunch box", "A funny comic", "A new game name"] },
    activity: { kind: "sort", title: "Idea or object?", instructions: "Sort clues into an idea still in someone's head and an object already made." },
    challenge: { title: "Problem finder", prompt: "Name one small everyday problem you would like to solve." },
    reward: { badge: "💡", label: "Idea Explorer Badge" },
    mcq: { question: "Where can a useful invention begin?", options: ["With a problem someone notices", "Only in a huge factory", "Only on television", "With copying somebody else"], answerIndex: 0, explanation: "Noticing a problem is often the first invention clue." },
    fact: { statement: "Giving credit to creators is an important detective habit.", answer: true, explanation: "Creators deserve recognition for their work." },
  }),
  makeIpWorld({
    id: 3, name: "Trademark Detectives", icon: "™️", color: "purple", difficulty: "Easy", xp: 70, time: "12 mins",
    description: "Find names, logos and symbols that help us recognise a brand.",
    story: "Two snack boxes look almost alike. Questy points to one special name and symbol. 'These clues tell shoppers whose snack this is,' she explains.",
    objectives: ["Recognise a trademark clue", "Tell a brand name from a product", "Respect unique names and symbols"],
    briefing: "Search for the clues that help people recognise who made something.",
    miniLesson: { heading: "Trademark clues", body: "A trademark can be a name, logo, symbol or sometimes a special look that helps people recognise a business. It helps shoppers know where a product or service comes from. A trademark is not the product itself; it is its special identity clue.", examples: ["A bakery name", "A shoe symbol", "A café logo"] },
    activity: { kind: "match", title: "Name and symbol match", instructions: "Match each pretend shop name with its special logo clue." },
    challenge: { title: "Trademark hunt", prompt: "Find one name or symbol on a household item and explain how it helps you recognise it." },
    reward: { badge: "™️", label: "Trademark Detective Badge" },
    mcq: { question: "What can a trademark help shoppers do?", options: ["Recognise who made something", "Measure the weather", "Cook dinner", "Change an invention"], answerIndex: 0, explanation: "A trademark helps people recognise the source of goods or services." },
    fact: { statement: "A product name or logo can be a trademark clue.", answer: true, explanation: "Both can help identify a business." },
  }),
  makeIpWorld({
    id: 4, name: "Logos, Colours & Symbols", icon: "🎨", color: "yellow", difficulty: "Easy", xp: 80, time: "15 mins",
    description: "Explore visual brand clues without copying real-world logos.",
    story: "Questy finds three pretend ice-cream carts. One uses a bright swirl, one a star and one a leaf. 'Pictures and colours can be powerful clues,' she says.",
    objectives: ["Spot visual identity clues", "Understand why simple symbols are memorable", "Create an original visual clue"],
    briefing: "Use your eyes: shapes, symbols and colours can tell a story quickly.",
    miniLesson: { heading: "Visual clues speak fast", body: "A simple original logo or symbol can be remembered quickly. Colours can help a brand feel cheerful, calm or adventurous. But a detective knows that looking inspired is different from copying someone else's exact special mark.", examples: ["A pretend moon symbol", "A sunny yellow cart", "A zig-zag pattern"] },
    activity: { kind: "colour", title: "Colour Questy", instructions: "Colour Questy's original clue picture, then download or print your masterpiece." },
    challenge: { title: "Original symbol sketch", prompt: "Sketch a simple, new symbol for an imaginary library or toy shop." },
    reward: { badge: "🎨", label: "Visual Clue Badge" },
    mcq: { question: "Why are simple symbols useful?", options: ["They can be easier to remember", "They make every product identical", "They remove all words everywhere", "They are always protected"], answerIndex: 0, explanation: "Simple visual clues can be recognised quickly." },
    fact: { statement: "It is okay to create your own original symbol instead of copying another one.", answer: true, explanation: "Original ideas are the best detective work." },
  }),
  makeIpWorld({
    id: 5, name: "Packaging & Slogan Mystery", icon: "📦", color: "green", difficulty: "Medium", xp: 90, time: "15 mins",
    description: "Solve clues hidden in product boxes, patterns and memorable phrases.",
    story: "At the pretend-product museum, two mystery boxes have mixed-up clues. Questy asks you to put each special phrase and package detail back where it belongs.",
    objectives: ["Notice package clues", "Understand a slogan", "Tell original presentation from a confusing copy"],
    briefing: "Some clues live on the box, label, shape and words around a product.",
    miniLesson: { heading: "A product's presentation", body: "Packaging can use colour, patterns, words and shapes to make a product stand out. A slogan is a short memorable phrase. A detective should not use real company slogans or designs as their own; it is more fun to invent a fresh one.", examples: ["A starry cereal box", "A short original slogan", "A bottle with a new shape"] },
    activity: { kind: "match", title: "Package clue match", instructions: "Match each pretend package with its original slogan clue." },
    challenge: { title: "Slogan studio", prompt: "Make up a five-word slogan for an imaginary fruit drink." },
    reward: { badge: "📦", label: "Packaging Sleuth Badge" },
    mcq: { question: "What is a slogan?", options: ["A short memorable phrase", "A type of patent", "A weather report", "A payment receipt"], answerIndex: 0, explanation: "A slogan is a short phrase people may remember." },
    fact: { statement: "Packaging can help a product stand out.", answer: true, explanation: "Its look and words can be memorable clues." },
  }),
  makeIpWorld({
    id: 6, name: "Real or Fake?", icon: "🕵️‍♀️", color: "red", difficulty: "Medium", xp: 100, time: "15 mins",
    description: "Use careful clues to spot pretend lookalikes and make safe choices.",
    story: "Questy sees a suspicious toy label with a wobbly spelling and a strange website address. 'We do not accuse people,' she says. 'We check clues and ask a trusted adult when unsure.'",
    objectives: ["Notice warning clues", "Make safe choices", "Know when to ask a trusted adult"],
    briefing: "Compare clues calmly. A detective checks before deciding.",
    miniLesson: { heading: "Careful checking", body: "A fake may have poor spelling, a different logo, missing safety information or a very strange price. One clue alone does not prove everything. If something seems suspicious, do not buy or share details; ask a parent, teacher or trusted adult for help.", examples: ["A misspelled name", "Missing safety label", "A strange web address"] },
    activity: { kind: "scenario", title: "Real or Fake challenge", instructions: "Read each safe pretend-shopping scenario and choose the careful next step." },
    challenge: { title: "Safety detective", prompt: "Tell a trusted adult one clue you would check before buying online." },
    reward: { badge: "🛡️", label: "Careful Checker Badge" },
    mcq: { question: "What should you do if a product seems suspicious?", options: ["Ask a trusted adult for help", "Share your details quickly", "Assume it is fine", "Copy its logo"], answerIndex: 0, explanation: "A trusted adult can help you check safely." },
    fact: { statement: "A spelling mistake can be one clue that something needs checking.", answer: true, explanation: "It is a reason to look more carefully, not to jump to conclusions." },
  }),
  makeIpWorld({
    id: 7, name: "Amazing Inventions", icon: "⚙️", color: "cyan", difficulty: "Medium", xp: 110, time: "15 mins",
    description: "Discover how inventors solve problems in clever new ways.",
    story: "Questy's magnifying glass gets foggy in the rain. An inventor creates a tiny wipe-on handle. 'Inventors notice a problem and try a new solution,' says Questy.",
    objectives: ["Recognise an invention", "Connect a problem to a solution", "Celebrate useful new ideas"],
    briefing: "Look for what an invention does and the problem it helps solve.",
    miniLesson: { heading: "From problem to solution", body: "An invention is a new and useful way to solve a problem. It might be a machine, tool, process or improvement. Not every idea becomes an invention, but every good invention starts with careful thinking, testing and improving.", examples: ["A spill-proof cup", "A safer helmet clip", "A plant-watering timer"] },
    activity: { kind: "clue", title: "Invention clue cards", instructions: "Choose the problem each pretend invention is trying to solve." },
    challenge: { title: "Inventor's notebook", prompt: "Draw a small improvement that would make an everyday item easier to use." },
    reward: { badge: "⚙️", label: "Invention Explorer Badge" },
    mcq: { question: "What does an invention usually do?", options: ["Solves a problem in a new useful way", "Copies a logo exactly", "Changes only its colour", "Hides all ideas"], answerIndex: 0, explanation: "Inventions are practical new solutions." },
    fact: { statement: "Inventors often test and improve their ideas.", answer: true, explanation: "Testing helps make an idea work better." },
  }),
  makeIpWorld({
    id: 8, name: "Patent Detectives", icon: "📜", color: "pink", difficulty: "Medium", xp: 120, time: "16 mins",
    description: "Learn how patents can protect certain new inventions.",
    story: "Questy finds a blueprint for a pretend self-watering plant pot. 'A patent is not for every idea,' she explains. 'It can protect certain new inventions.'",
    objectives: ["Know the purpose of a patent", "Separate inventions from names and artwork", "Use the word patent carefully"],
    briefing: "A patent detective asks: is this a new useful invention?",
    miniLesson: { heading: "Patent clues", body: "A patent can protect certain new inventions and how they work. Patent rules differ by country, and grown-up experts help inventors apply. A patent is different from a trademark, copyright or design protection because it focuses on technical inventions.", examples: ["A new tool mechanism", "A useful machine improvement", "A new technical process"] },
    activity: { kind: "sort", title: "Patent or not?", instructions: "Sort the pretend clues into invention, brand clue, artwork or product appearance." },
    challenge: { title: "How does it work?", prompt: "Explain one useful feature of your invention idea." },
    reward: { badge: "📜", label: "Patent Detective Badge" },
    mcq: { question: "What can a patent relate to?", options: ["A new useful invention", "Any favourite colour", "A school timetable", "A person's nickname"], answerIndex: 0, explanation: "Patents are connected to certain technical inventions." },
    fact: { statement: "A patent and a trademark protect the same thing in the same way.", answer: false, explanation: "They protect different kinds of IP clues." },
  }),
  makeIpWorld({
    id: 9, name: "Invent Something!", icon: "🛠️", color: "teal", difficulty: "Medium", xp: 130, time: "18 mins",
    description: "Create an original invention card: problem, solution and special feature.",
    story: "Questy rolls out a blank inventor card. 'Today you are the inventor. Start with a problem you care about, then make your own solution.'",
    objectives: ["Create an original invention idea", "Describe its problem and solution", "Give your creation a clear feature"],
    briefing: "Use your imagination, but make your idea useful too.",
    miniLesson: { heading: "Build an invention story", body: "Inventors explain three things: the problem, their solution and what makes it work. Your idea can be playful, but it should be your own. A sketch and a few labels help other people understand it.", examples: ["Problem: wet books", "Solution: rainproof book sleeve", "Feature: colour-changing dry marker"] },
    activity: { kind: "create", title: "My invention card", instructions: "Choose a problem, a solution and one special feature to create Questy's invention card." },
    challenge: { title: "Inventor pitch", prompt: "Tell someone your invention name and the problem it solves." },
    reward: { badge: "🛠️", label: "Young Inventor Badge" },
    mcq: { question: "What is a helpful invention card likely to include?", options: ["Problem, solution and special feature", "Only a copied logo", "Only a price", "Nothing about how it helps"], answerIndex: 0, explanation: "Those three parts help explain an invention." },
    fact: { statement: "An original invention can begin with a simple sketch.", answer: true, explanation: "A sketch is a great way to share an idea." },
  }),
  makeIpWorld({
    id: 10, name: "The World of Creativity", icon: "🌈", color: "indigo", difficulty: "Medium", xp: 140, time: "16 mins",
    description: "Meet stories, music, art and other creative works.",
    story: "Questy's HQ fills with a comic, a song and a painting. 'Creative work can be loved, shared and respected,' she says.",
    objectives: ["Recognise creative works", "Understand creator credit", "Know that sharing needs care"],
    briefing: "Creative work begins in a person's imagination and effort.",
    miniLesson: { heading: "Creativity everywhere", body: "Stories, drawings, songs, films, photos and computer games can all be creative works. Copyright is one way the law can help creators control how their work is used. Enjoying something is great; copying or posting it without permission may not be.", examples: ["A comic page", "A song recording", "A photograph"] },
    activity: { kind: "clue", title: "Creative work clues", instructions: "Pick the creative works in Questy's mixed-up gallery." },
    challenge: { title: "Credit line", prompt: "Write a kind credit line: Created by ____." },
    reward: { badge: "🌈", label: "Creativity Explorer Badge" },
    mcq: { question: "Which is a creative work?", options: ["A drawing made by an artist", "A cloud outside", "A blank receipt", "A shoe size"], answerIndex: 0, explanation: "A drawing is an original creative work." },
    fact: { statement: "Giving credit is a good way to respect creative work.", answer: true, explanation: "Creators deserve recognition." },
  }),
  makeIpWorld({
    id: 11, name: "Copyright Detectives", icon: "©️", color: "gold", difficulty: "Hard", xp: 150, time: "16 mins",
    description: "Learn how copyright helps protect original creative work.",
    story: "A friend wants to post Questy's comic online with no credit. Questy smiles gently: 'First, let us think about the creator and permission.'",
    objectives: ["Know what copyright can protect", "Recognise original creative work", "Choose respectful sharing"],
    briefing: "Copyright detectives notice creators, credit and permission.",
    miniLesson: { heading: "Respecting creative work", body: "Copyright can protect original creative work such as stories, art, music, photos and films. Rules can vary, and a trusted adult can help with questions. The big detective habit is simple: ask before using someone else's work, give credit where appropriate and make your own creations.", examples: ["Original story", "Original song", "Original illustration"] },
    activity: { kind: "scenario", title: "Share with care", instructions: "Choose the respectful action in each pretend sharing scenario." },
    challenge: { title: "Create, do not copy", prompt: "Make a tiny original doodle or story title of your own." },
    reward: { badge: "©️", label: "Copyright Detective Badge" },
    mcq: { question: "What can copyright help protect?", options: ["Original creative work", "Every product price", "A rainy day", "A football score"], answerIndex: 0, explanation: "Copyright is connected to original creative expression." },
    fact: { statement: "Asking permission can be important before using someone else's creative work.", answer: true, explanation: "That is a respectful and safe habit." },
  }),
  makeIpWorld({
    id: 12, name: "Design Detectives", icon: "✨", color: "royalPurple", difficulty: "Hard", xp: 160, time: "16 mins",
    description: "Explore the special look and appearance of a product.",
    story: "Three pretend water bottles all carry water, but their shapes, patterns and surface looks are different. Questy says, 'A design detective notices how something looks.'",
    objectives: ["Spot product appearance", "Separate look from technical function", "Celebrate original design choices"],
    briefing: "Study the outside: shape, pattern, lines and decoration can all be clues.",
    miniLesson: { heading: "The look of a product", body: "Design protection can relate to the visual appearance of a product, such as its shape, pattern, lines or decoration. A design is different from a patent because it focuses on how something looks, not mainly how it works.", examples: ["A lamp shape", "A shoe pattern", "A toy surface design"] },
    activity: { kind: "jigsaw", title: "Design detail jigsaw", instructions: "Rebuild Questy's pretend-product picture from twelve mixed pieces." },
    challenge: { title: "Appearance detective", prompt: "Describe one shape or pattern that makes an object look special." },
    reward: { badge: "✨", label: "Design Detective Badge" },
    mcq: { question: "What does a design detective mainly study?", options: ["How a product looks", "Only its price", "Only its owner", "The weather"], answerIndex: 0, explanation: "Design clues include shape, pattern and decoration." },
    fact: { statement: "A product's appearance and how it works are exactly the same thing.", answer: false, explanation: "They can be different parts of an IP mystery." },
  }),
  makeIpWorld({
    id: 13, name: "Which IP Protects It?", icon: "🧩", color: "blue", difficulty: "Hard", xp: 170, time: "18 mins",
    description: "Classify the clues in one product: name, logo, invention, artwork and appearance.",
    story: "Questy's pretend Robo-Rover has a name, logo, clever wheel system, box artwork and shiny shell shape. 'One product can hold many different IP clues!'",
    objectives: ["Classify four IP types", "See that one product can have many rights", "Explain each clue clearly"],
    briefing: "Look at every layer of the product mystery, not just one.",
    miniLesson: { heading: "One product, many clues", body: "A product's brand name and logo can be trademark clues. A technical invention can relate to a patent. Box artwork can be copyright. The appearance of the product can relate to design protection. More than one kind of IP can matter at the same time.", examples: ["Name and logo → Trademark", "Technical invention → Patent", "Artwork → Copyright"] },
    activity: { kind: "classify", title: "IP classification board", instructions: "Place each Robo-Rover clue into Trademark, Patent, Copyright or Design. Some products have more than one answer." },
    challenge: { title: "Four-clue explanation", prompt: "Explain which IP clue protects the name, logo, invention, artwork and appearance." },
    reward: { badge: "🧩", label: "IP Classifier Badge" },
    mcq: { question: "Which IP clue can protect a product's logo?", options: ["Trademark", "Patent only", "Copyright only", "Design only"], answerIndex: 0, explanation: "Names and logos are common trademark clues." },
    fact: { statement: "One product can involve more than one kind of IP.", answer: true, explanation: "A product can have a name, invention, artwork and appearance." },
  }),
  makeIpWorld({
    id: 14, name: "The Great IP Mystery", icon: "🔐", color: "orange", difficulty: "Expert", xp: 200, time: "20 mins",
    description: "Solve Questy's final master case using all four IP detective skills.",
    story: "The Little IP Detectives museum has four locked cases: a brand clue, invention clue, artwork clue and design clue. Only a master detective can open them all.",
    objectives: ["Use all four IP detective skills", "Compare clues carefully", "Solve a final mixed mystery"],
    briefing: "This is your master case: trademark, patent, copyright and design clues are all hiding together.",
    miniLesson: { heading: "The four-key toolkit", body: "Trademark helps identify a brand name or logo. Patent relates to a new useful invention. Copyright protects original creative work. Design protection relates to product appearance. Read every clue, then choose the best key.", examples: ["Name → Trademark", "New mechanism → Patent", "Illustration → Copyright"] },
    activity: { kind: "mystery", title: "Four-case master mission", instructions: "Open four mini cases by choosing the best IP key for each clue." },
    challenge: { title: "Master detective report", prompt: "Tell Questy which four IP types you used and one clue for each." },
    reward: { badge: "🔐", label: "Master Mystery Badge" },
    mcq: { question: "Which four keys belong in the IP detective toolkit?", options: ["Trademark, Patent, Copyright and Design", "Rain, wind, cloud and snow", "Red, blue, green and yellow", "Breakfast, lunch, dinner and snack"], answerIndex: 0, explanation: "Those four types solve the final mystery." },
    fact: { statement: "The Great IP Mystery uses clues from all four areas.", answer: true, explanation: "It is the final master mission." },
  }),
  makeIpWorld({
    id: 15, name: "IP Detective Graduation", icon: "🏆", color: "gold", difficulty: "Expert", xp: 250, time: "15 mins",
    description: "Celebrate your Little IP Detective journey and unlock your Certificate of Completion.",
    story: "Questy hangs bunting across headquarters. 'You explored ideas, brands, inventions, creativity and design. Your final mission is to celebrate what you learned!'",
    objectives: ["Celebrate the full journey", "Remember the four IP types", "Unlock your certificate"],
    briefing: "Complete your graduation case to receive your Little IP Detective Certificate of Completion.",
    miniLesson: { heading: "You are a Little IP Detective!", body: "You can now spot different kinds of intellectual property around you. You know to respect creators, invent your own ideas and ask good questions. This is a celebration of your learning journey, not a professional or accredited qualification.", examples: ["Trademark Detective", "Patent Detective", "Copyright Detective"] },
    activity: { kind: "mystery", title: "Graduation case", instructions: "Choose the right IP clue in Questy's final celebration card." },
    challenge: { title: "Detective reflection", prompt: "Name your favourite world and one respectful creator habit you will keep." },
    reward: { badge: "🏆", label: "Master IP Detective Badge" },
    mcq: { question: "What is the final award called?", options: ["Little IP Detective Certificate of Completion", "Professional licence", "Doctor's degree", "Secret shopping pass"], answerIndex: 0, explanation: "It celebrates completing the children's learning journey." },
    fact: { statement: "This certificate celebrates learning and is not a professional accreditation.", answer: true, explanation: "It is a child-friendly Certificate of Completion." },
  }),
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
