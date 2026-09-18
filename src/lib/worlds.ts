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

export type JourneyChapter = {
  id: number;
  focus: "CREATE" | "UNDERSTAND" | "CREATE + UNDERSTAND" | "RESPECT" | "PROTECT";
  title: string;
  setting: string;
  worldIds: number[];
};

export const journeyChapters: JourneyChapter[] = [
  { id: 1, focus: "CREATE", title: "I Am a Creator", setting: "Questy's idea studio", worldIds: [1, 2, 3] },
  { id: 2, focus: "UNDERSTAND", title: "Discover Brands", setting: "Brand city", worldIds: [4, 5, 6, 7] },
  { id: 3, focus: "CREATE + UNDERSTAND", title: "Discover Inventions", setting: "Inventor laboratory", worldIds: [8, 9, 10] },
  { id: 4, focus: "RESPECT", title: "Discover Creativity & Design", setting: "Creative workshop", worldIds: [11, 12, 13] },
  { id: 5, focus: "PROTECT", title: "Become the Master IP Detective", setting: "Detective headquarters", worldIds: [14, 15] },
];

type JourneyWorldDefinition = World;

const detectiveQuestion = (question: string, options: string[], answerIndex: number, explanation: string): WorldMcq => ({ question, options, answerIndex, explanation });
const trueFalse = (statement: string, answer: boolean, explanation: string): WorldTrueFalse => ({ statement, answer, explanation });

export const worlds: JourneyWorldDefinition[] = [
  { id: 1, name: "Welcome, IP Detective!", icon: "🕵️", color: "blue", difficulty: "Easy", xp: 50, time: "10–12 mins", description: "Meet Questy and discover that you are already a creator.", story: "Questy opens the Little IP Detectives casebook. 'You draw, write, imagine, build, design and solve problems,' she says. 'That makes you a creator already!'", objectives: ["Notice the things you create", "Meet Questy and the detective journey", "Make your creator promise"], briefing: "Every big adventure begins with a curious idea.", miniLesson: { heading: "You are already a creator", body: "Creators make things with their minds and hands. A drawing, story, game, invention, name or design can begin with you. What you create has value.", examples: ["A comic", "A new game", "A clever solution"] }, activity: { kind: "clue", title: "Spot the creator clues", instructions: "Choose the things a child might create." }, challenge: { title: "Creator promise", prompt: "Say: I will create bravely and respect what other people create." }, reward: { badge: "🔎", label: "Little IP Detective Badge" }, mcqs: [detectiveQuestion("Which is something a child can create?", ["A comic", "A rain cloud", "A shoe size", "A clock tick"], 0, "A comic is made by a creator."), detectiveQuestion("What can make your creation special?", ["Your own ideas", "Copying exactly", "Ignoring problems", "Hiding it forever"], 0, "Your original ideas matter."), detectiveQuestion("Who can be a creator?", ["Anyone who imagines and makes", "Only adults", "Only famous people", "Only scientists"], 0, "Children are creators too.")], trueFalse: [trueFalse("A drawing, story or invention can begin with an idea.", true, "Ideas can inspire many creations."), trueFalse("Only grown-ups can create important things.", false, "Young creators have valuable ideas too.")] },
  { id: 2, name: "The World of Ideas", icon: "💡", color: "orange", difficulty: "Easy", xp: 60, time: "10–12 mins", description: "Discover brands, inventions, creative works and designs.", story: "Questy finds four clues in a mystery box: a logo, a clever lock, a comic and a shiny bottle shape. 'Different creations may involve different kinds of IP,' she explains.", objectives: ["Meet four kinds of IP", "See how ideas inspire creations", "Ask what a creation is for"], briefing: "Ideas can grow into brands, inventions, stories and designs.", miniLesson: { heading: "Four detective keys", body: "Ideas can inspire creations, inventions, brands and designs. Different types of intellectual property may help protect different results: trademark, patent, copyright and design.", examples: ["Brand name → trademark", "Useful invention → patent", "Original art → copyright"] }, activity: { kind: "sort", title: "Sort the idea clues", instructions: "Place each clue with brand, invention, creative work or design." }, challenge: { title: "Idea explorer", prompt: "Choose one everyday object and imagine how it could be improved." }, reward: { badge: "💡", label: "Idea Explorer Badge" }, mcqs: [detectiveQuestion("Which is a brand clue?", ["A logo", "A puddle", "A shoe size", "A cloud"], 0, "A logo can help identify a brand."), detectiveQuestion("Which can be a creative work?", ["An original story", "A bus stop", "A date", "A price"], 0, "Stories are creative works."), detectiveQuestion("What can an idea inspire?", ["Different kinds of creations", "Only a trademark", "Nothing useful", "The weather"], 0, "Ideas can grow in many directions.")], trueFalse: [trueFalse("Ideas are automatically protected in exactly the same way everywhere.", false, "Different results may involve different types of IP."), trueFalse("A product can have more than one kind of IP clue.", true, "A name, invention, artwork and design can all be relevant.")] },
  { id: 3, name: "My Creation Matters", icon: "🌟", color: "purple", difficulty: "Easy", xp: 70, time: "10–15 mins", description: "Connect your own drawings, stories, names and inventions to creativity.", story: "Questy gives you a blank creator card. It could become a character, game, invention, product name or logo. 'What you create can have value,' says Questy.", objectives: ["Recognise your own creations", "Link creations to possible IP clues", "Build creative confidence"], briefing: "Your imagination is the first clue.", miniLesson: { heading: "My ideas have value", body: "A drawing, story, character, game, invention, product name or logo can be your creation. Different creations may involve different types of IP, but today we are celebrating your imagination.", examples: ["A superhero drawing", "A story title", "A product name"] }, activity: { kind: "create", title: "Build a creator card", instructions: "Give your creation a name and describe what makes it special." }, challenge: { title: "My creation", prompt: "Create a name for a game, character or useful object." }, reward: { badge: "🌟", label: "Creator Confidence Badge" }, mcqs: [detectiveQuestion("Which could be your creation?", ["A character you design", "A stranger's homework", "A weather forecast", "A supermarket receipt"], 0, "A character can begin with your imagination."), detectiveQuestion("What is a respectful choice?", ["Make your own version", "Copy an artist's work as yours", "Erase credit", "Use a friend's idea secretly"], 0, "Original work shows respect."), detectiveQuestion("A special name for a product may be a...", ["Brand clue", "Rain cloud", "Patent machine", "School bell"], 0, "A name can help identify a brand.")], trueFalse: [trueFalse("What I create can have value.", true, "Your original effort matters."), trueFalse("Every creation needs the same kind of IP.", false, "Different creations may involve different types of IP.")] },
  { id: 4, name: "Trademark Detectives", icon: "™️", color: "yellow", difficulty: "Medium", xp: 80, time: "10–15 mins", description: "Find the names, logos and signs that identify a brand.", story: "Two pretend snack boxes look similar, but Questy spots one special name and symbol. 'These clues can help us know who made something,' she says.", objectives: ["Recognise brand names and logos", "Understand source clues", "Respect distinctive signs"], briefing: "How do we know who made this?", miniLesson: { heading: "Trademark clues", body: "A trademark may be a name, logo or other distinctive sign that helps people recognise the source of goods or services. It is different from the product itself.", examples: ["Bakery name", "Shoe symbol", "Café logo"] }, activity: { kind: "match", title: "Match brand clues", instructions: "Match each pretend shop with its own name or symbol." }, challenge: { title: "Brand clue hunt", prompt: "Find a name or symbol on a household item and explain what it helps you recognise." }, reward: { badge: "™️", label: "Trademark Trail Badge" }, mcqs: [detectiveQuestion("What can a trademark help people recognise?", ["Who made a product or service", "How the weather feels", "A recipe", "A school subject"], 0, "It can identify a source."), detectiveQuestion("Which is a brand clue?", ["An original logo", "A shoe size", "A puddle", "A bus timetable"], 0, "A logo can be a brand clue."), detectiveQuestion("What should you make for an imaginary shop?", ["A fresh name or symbol", "An exact copy of a real logo", "A secret password", "A weather chart"], 0, "Original clues are best.")], trueFalse: [trueFalse("A trademark is the same thing as a product.", false, "It is an identifying clue for the product or service."), trueFalse("Names and logos can help people remember a brand.", true, "They can be distinctive signs.")] },
  { id: 5, name: "Logos, Colours & Symbols", icon: "🎨", color: "green", difficulty: "Medium", xp: 90, time: "10–15 mins", description: "Observe visual identity and create an original symbol.", story: "Questy sees three pretend ice-cream carts with a moon, leaf and star. 'Shapes and colours can help us remember a brand,' she says.", objectives: ["Observe shapes and symbols", "Notice visual recognition", "Create an original visual clue"], briefing: "Use your eyes: visual clues tell stories quickly.", miniLesson: { heading: "Visual identity", body: "Logos, symbols, shapes and colours can help people recognise a brand. Particular signs or combinations may function as trademarks in appropriate circumstances; not every colour is automatically a trademark.", examples: ["Moon symbol", "Sunny cart", "Zig-zag pattern"] }, activity: { kind: "colour", title: "Colour Questy", instructions: "Use colour thoughtfully, then create your own pretend logo idea." }, challenge: { title: "Symbol studio", prompt: "Sketch a simple original symbol for an imaginary library or toy shop." }, reward: { badge: "🎨", label: "Visual Clue Badge" }, mcqs: [detectiveQuestion("What can help a logo be memorable?", ["A simple original shape", "Copying another logo", "A long receipt", "A weather map"], 0, "A clear, original shape can be memorable."), detectiveQuestion("Are all colours automatically trademarks?", ["No", "Yes, always", "Only blue", "Only rainbow colours"], 0, "It depends on how signs are used."), detectiveQuestion("What makes a good imaginary logo?", ["Your own fresh idea", "A copied symbol", "No design at all", "A price label"], 0, "Original work is a good choice.")], trueFalse: [trueFalse("Colours and shapes can help people recognise a brand.", true, "Visual clues can be memorable."), trueFalse("Every colour is automatically a trademark.", false, "Only particular signs may function this way in the right circumstances.")] },
  { id: 6, name: "Packaging & Slogan Mystery", icon: "📦", color: "red", difficulty: "Medium", xp: 100, time: "10–15 mins", description: "Investigate boxes, patterns, phrases and product presentation.", story: "At the pretend-product museum, Questy finds mixed-up boxes, patterns and catchy phrases. Can you return each clue to its imaginary product?", objectives: ["Notice packaging clues", "Understand a slogan", "Choose original presentation"], briefing: "Some clues live on the box, label, shape and words.", miniLesson: { heading: "Presentation clues", body: "Packaging may use colour, patterns, words and shapes. A slogan is a short memorable phrase. Making a fresh slogan is more respectful than copying a familiar one.", examples: ["Starry box", "Original slogan", "Bottle shape"] }, activity: { kind: "match", title: "Package clue match", instructions: "Pair each pretend package with its original slogan." }, challenge: { title: "Slogan studio", prompt: "Invent a five-word slogan for an imaginary fruit drink." }, reward: { badge: "📦", label: "Packaging Sleuth Badge" }, mcqs: [detectiveQuestion("What is a slogan?", ["A short memorable phrase", "A patent drawing", "A price", "A weather report"], 0, "Slogans are short phrases."), detectiveQuestion("Which belongs on packaging?", ["A box pattern", "A bus ticket", "A school timetable", "A cloud"], 0, "Patterns can be part of presentation."), detectiveQuestion("What is best for your pretend drink?", ["An original slogan", "Another company's exact words", "No name", "A copied package"], 0, "Fresh wording is respectful.")], trueFalse: [trueFalse("Packaging can help a product stand out.", true, "Its words, colours and shapes can be clues."), trueFalse("Copying a familiar slogan is the best creative choice.", false, "Create a fresh one instead.")] },
  { id: 7, name: "Real or Fake?", icon: "🛡️", color: "cyan", difficulty: "Medium", xp: 110, time: "10–15 mins", description: "Use calm detective habits to check confusing product clues.", story: "Questy spots a toy label with wobbly spelling and a strange web address. 'We do not accuse people,' she says. 'We check carefully and ask a trusted adult when unsure.'", objectives: ["Notice warning clues", "Make safe choices", "Ask a trusted adult"], briefing: "Good detectives pause, compare and check.", miniLesson: { heading: "Check with care", body: "Confusing branding, odd spelling, missing safety information or a strange website can be reasons to check more carefully. One clue alone does not prove everything.", examples: ["Misspelled label", "Missing safety note", "Strange web address"] }, activity: { kind: "scenario", title: "Careful checker", instructions: "Choose the calm, safe next step for each pretend shopping clue." }, challenge: { title: "Safety detective", prompt: "Tell a trusted adult one clue you would check before buying online." }, reward: { badge: "🛡️", label: "Brand Detective Badge" }, mcqs: [detectiveQuestion("What is safest when a shop seems suspicious?", ["Ask a trusted adult", "Share details quickly", "Guess it is safe", "Copy the logo"], 0, "A trusted adult can help."), detectiveQuestion("What might be a reason to check?", ["A strangely misspelled label", "A clear label", "A normal clock", "A school bag"], 0, "Odd spelling can be a clue."), detectiveQuestion("What should a detective avoid?", ["Quick accusations", "Careful observation", "Asking questions", "Checking with an adult"], 0, "Good detectives gather information calmly.")], trueFalse: [trueFalse("One unusual clue means you should check more carefully.", true, "Pause and seek help if needed."), trueFalse("Every similar-looking product is automatically fake.", false, "Do not jump to conclusions.")] },
  { id: 8, name: "Amazing Inventions", icon: "⚙️", color: "pink", difficulty: "Medium", xp: 120, time: "10–15 mins", description: "See how everyday problems can inspire useful solutions.", story: "Questy's magnifying glass fogs in the rain. An inventor sketches a tiny wipe-on handle. 'Problems can inspire solutions,' says Questy.", objectives: ["Find a problem", "Spot a solution", "Celebrate improvements"], briefing: "What problem does this invention solve?", miniLesson: { heading: "Problem to solution", body: "Inventions can be useful new ways to solve problems. Inventors observe, imagine, test and improve. Everyday objects such as umbrellas, bicycles and water bottles began with useful questions.", examples: ["Umbrella", "Bicycle", "Zipper"] }, activity: { kind: "clue", title: "Problem solver clues", instructions: "Match each everyday object to the problem it helps solve." }, challenge: { title: "Inventor notebook", prompt: "Name one everyday problem you would like to improve." }, reward: { badge: "⚙️", label: "Invention Explorer Badge" }, mcqs: [detectiveQuestion("What can inspire an invention?", ["A problem to solve", "Copying a logo", "Ignoring needs", "A random price"], 0, "Many inventions start with a problem."), detectiveQuestion("What does an umbrella help with?", ["Keeping rain off", "Naming a shop", "Writing a song", "Drawing a logo"], 0, "It solves a rainy-day problem."), detectiveQuestion("What do inventors often do?", ["Test and improve", "Copy exactly", "Hide problems", "Stop wondering"], 0, "Testing helps ideas grow.")], trueFalse: [trueFalse("Problems can inspire useful solutions.", true, "That is a key invention habit."), trueFalse("An invention must be a giant machine.", false, "Small improvements can be useful too.")] },
  { id: 9, name: "Patent Detectives", icon: "📜", color: "teal", difficulty: "Medium", xp: 130, time: "10–15 mins", description: "Learn how patents can relate to qualifying inventions.", story: "Questy finds a plan for a self-watering plant pot. 'Not every idea automatically receives a patent,' she explains. 'Patents relate to qualifying inventions.'", objectives: ["Recognise a technical invention", "Compare patents and trademarks", "Use careful language"], briefing: "Ask: is this a new useful technical solution?", miniLesson: { heading: "Patent clues", body: "Patents can relate to qualifying inventions that solve technical problems. Not every idea or invention receives a patent. Patents and trademarks protect different things.", examples: ["New lock mechanism", "Useful tool improvement", "Technical process"] }, activity: { kind: "sort", title: "Patent or another clue?", instructions: "Sort each clue into invention, brand, creative work or appearance." }, challenge: { title: "How does it work?", prompt: "Explain one useful feature an invention might have." }, reward: { badge: "📜", label: "Patent Detective Badge" }, mcqs: [detectiveQuestion("A patent may relate to...", ["A qualifying invention", "A favourite colour", "A product name", "A song title"], 0, "Patents concern inventions."), detectiveQuestion("What does a trademark mainly help with?", ["Identifying a brand", "Explaining a mechanism", "Painting a picture", "Changing shape"], 0, "It is a brand clue."), detectiveQuestion("Does every idea get a patent?", ["No", "Yes, always", "Only ideas about food", "Only colours"], 0, "Not every idea or invention qualifies.")], trueFalse: [trueFalse("Patents and trademarks protect different things.", true, "They focus on different kinds of IP."), trueFalse("Every invention can automatically be patented.", false, "Patent rules and qualification matter.")] },
  { id: 10, name: "Invent Something!", icon: "🛠️", color: "indigo", difficulty: "Medium", xp: 140, time: "12–18 mins", description: "Take Questy's Inventor Challenge and shape an original solution.", story: "Questy rolls out an inventor card. 'Today you are the inventor. Start with a problem you care about, then imagine your own solution.'", objectives: ["Find a problem", "Name a solution", "Explain what makes it different"], briefing: "This is your signature inventor mission.", miniLesson: { heading: "Questy Inventor Challenge", body: "Start with a problem. Imagine a solution. Give your invention a name and describe what it does. A sketch or a few labels can help explain your original idea.", examples: ["Problem: wet books", "Solution: rainproof sleeve", "Feature: dry marker"] }, activity: { kind: "create", title: "Inventor Challenge", instructions: "Complete Questy's local invention card: problem, solution, name and special feature." }, challenge: { title: "Inventor pitch", prompt: "Explain what makes your invention different." }, reward: { badge: "🛠️", label: "Inventor Badge" }, mcqs: [detectiveQuestion("What comes first in an invention challenge?", ["A problem to solve", "A copied logo", "A receipt", "A weather report"], 0, "A problem gives your invention a purpose."), detectiveQuestion("What can help explain an invention?", ["A labelled sketch", "Someone else's logo", "A blank slogan", "No description"], 0, "Labels help explain ideas."), detectiveQuestion("What should your invention name be?", ["Your own original name", "A copied famous name", "A password", "Nothing"], 0, "Fresh names support creative thinking.")], trueFalse: [trueFalse("Your invention can be playful and still solve a real problem.", true, "Useful ideas can be imaginative."), trueFalse("You must save your invention online to be an inventor.", false, "This challenge works safely in your browser.")] },
  { id: 11, name: "The World of Creativity", icon: "🌈", color: "gold", difficulty: "Hard", xp: 150, time: "10–15 mins", description: "Meet the stories, art, music, games and characters people create.", story: "Questy's HQ fills with a comic, song, photograph and game. 'People create the things we enjoy,' she says.", objectives: ["Recognise creative works", "Notice creators", "Respect imagination"], briefing: "Who created this?", miniLesson: { heading: "Creativity everywhere", body: "Stories, drawings, music, photographs, videos, games and characters can be creative works. Copyright can be relevant to original creative expression.", examples: ["Comic page", "Song recording", "Photograph"] }, activity: { kind: "clue", title: "Creative gallery", instructions: "Spot the creative works in Questy's mixed-up gallery." }, challenge: { title: "Creator credit", prompt: "Write a kind credit line: Created by ____." }, reward: { badge: "🌈", label: "Creativity Explorer Badge" }, mcqs: [detectiveQuestion("Which is a creative work?", ["An original song", "A shoe size", "A bus stop", "A cloud"], 0, "Songs can be creative works."), detectiveQuestion("Who makes the things we enjoy?", ["Creators", "Only machines", "No one", "Weather"], 0, "People use imagination and effort."), detectiveQuestion("What is respectful?", ["Giving credit where appropriate", "Claiming work as yours", "Removing a name", "Copying without checking"], 0, "Creators deserve respect.")], trueFalse: [trueFalse("Stories, art and games can be creative works.", true, "They can be made through imagination and effort."), trueFalse("Everything online is free to copy.", false, "Respect creators and check first.")] },
  { id: 12, name: "Copyright Detectives", icon: "©️", color: "royalPurple", difficulty: "Hard", xp: 160, time: "10–15 mins", description: "Practise permission, credit and responsible use.", story: "A friend wants to post Questy's comic online with no credit. Questy asks: 'Who created this, and what respectful choice could we make?'", objectives: ["Think about creators", "Choose permission and credit", "Make your own work"], briefing: "Other people's creations matter too.", miniLesson: { heading: "Respecting creative work", body: "Copyright can relate to original creative work. Rules can vary, but a good detective habit is simple: ask before using someone else's work, give credit where appropriate and create your own version.", examples: ["Original story", "Original illustration", "Original song"] }, activity: { kind: "scenario", title: "Share with care", instructions: "Choose the respectful response in each pretend sharing situation." }, challenge: { title: "Create, do not copy", prompt: "Make a tiny original doodle or story title." }, reward: { badge: "©️", label: "Copyright Detective Badge" }, mcqs: [detectiveQuestion("Before using another person's drawing, what could you do?", ["Ask permission or check with an adult", "Claim it as yours", "Erase their name", "Copy quickly"], 0, "Permission and credit are respectful habits."), detectiveQuestion("What might copyright relate to?", ["An original story", "A rain cloud", "A price label", "A calendar date"], 0, "Original creative expression can involve copyright."), detectiveQuestion("What is a good alternative to copying?", ["Make your own version", "Hide the creator's name", "Post it first", "Say it is free"], 0, "Your own creativity matters.")], trueFalse: [trueFalse("Other people's creations deserve respect.", true, "Creators put time and imagination into their work."), trueFalse("Copyright protects every idea by itself.", false, "It relates to original creative expression, not ideas alone.")] },
  { id: 13, name: "Design Detectives", icon: "✨", color: "blue", difficulty: "Hard", xp: 170, time: "10–15 mins", description: "Discover how product appearance can differ from how it works.", story: "Three pretend bottles hold water, but their shapes, patterns and surface looks are different. 'A design detective notices how something looks,' says Questy.", objectives: ["Spot product appearance", "Compare look and function", "Celebrate original design"], briefing: "Appearance versus how it works: can you tell the difference?", miniLesson: { heading: "The look of a product", body: "Design can relate to a product's visual appearance, such as shape, pattern, lines or decoration. A patent focuses on technical function; a design focuses on how something looks.", examples: ["Lamp shape", "Shoe pattern", "Toy surface"] }, activity: { kind: "classify", title: "Look or function?", instructions: "Classify clues as appearance or technical function." }, challenge: { title: "Appearance detective", prompt: "Describe a shape or pattern that makes an object look special." }, reward: { badge: "✨", label: "Creative Detective Badge" }, mcqs: [detectiveQuestion("What does a design detective mainly study?", ["How a product looks", "Only its price", "The weather", "A shop receipt"], 0, "Design clues include shape and pattern."), detectiveQuestion("A new locking mechanism is mainly about...", ["How it works", "How it looks", "A colour only", "A slogan"], 0, "Technical function is different from appearance."), detectiveQuestion("A special shoe pattern is mainly about...", ["Appearance", "Technical mechanism", "A brand name", "A song"], 0, "Pattern is a visual clue.")], trueFalse: [trueFalse("Appearance and technical function can be different.", true, "They can point to different IP types."), trueFalse("Design protection mainly protects technical function.", false, "It concerns visual appearance.")] },
  { id: 14, name: "The Great IP Mystery", icon: "🔐", color: "orange", difficulty: "Expert", xp: 200, time: "12–18 mins", description: "Solve the ZippyPack boss mission using all four IP detective keys.", story: "Questy presents ZippyPack, a futuristic children's backpack. It has a name, lightning-star logo, new locking mechanism, special outer look and colourful instruction artwork. Which type of IP might be relevant to each clue?", objectives: ["Investigate one product closely", "Use all four IP keys", "See that one product can involve more than one type"], briefing: "This boss mission is about thinking, not guessing a legal answer.", miniLesson: { heading: "ZippyPack's four clues", body: "Brand identity might involve trademark. A technical locking mechanism might involve patent. Instruction artwork might involve copyright. The product's special appearance might involve design.", examples: ["Name/logo → trademark", "Lock → patent", "Artwork → copyright"] }, activity: { kind: "mystery", title: "ZippyPack mystery board", instructions: "Match each ZippyPack clue to the IP type we might think about." }, challenge: { title: "Master report", prompt: "Explain why one product can involve more than one type of IP." }, reward: { badge: "🏅", label: "Master IP Detective" }, mcqs: [detectiveQuestion("ZippyPack's name and logo might involve...", ["Trademark", "Patent", "Copyright", "Design"], 0, "Brand identity can involve trademark."), detectiveQuestion("ZippyPack's new lock might involve...", ["Patent", "Trademark", "Copyright", "Design"], 0, "A technical invention can involve patent."), detectiveQuestion("ZippyPack's artwork might involve...", ["Copyright", "Trademark", "Patent", "Design"], 0, "Original artwork can involve copyright.")], trueFalse: [trueFalse("One product can involve more than one type of IP.", true, "ZippyPack has several kinds of clues."), trueFalse("Every clue is automatically protected in exactly the same way.", false, "We ask which type might be relevant.")] },
  { id: 15, name: "IP Detective Graduation", icon: "🏆", color: "gold", difficulty: "Expert", xp: 250, time: "8–12 mins", description: "Celebrate what you can create, understand, respect and protect.", story: "Questy hangs bunting across headquarters. 'You began as a curious detective. Now look what you can do!'", objectives: ["Celebrate the whole journey", "Remember four big ideas", "Unlock your existing certificate"], briefing: "This is a graduation celebration, not another long quiz.", miniLesson: { heading: "You are a Little IP Detective!", body: "CREATE: I can imagine original things. UNDERSTAND: different creations may involve different IP. RESPECT: other people's creations matter. PROTECT: different creations may be protected in different ways.", examples: ["Create", "Understand", "Respect"] }, activity: { kind: "mystery", title: "Graduation reflection", instructions: "Choose the four habits you will take into your next creation." }, challenge: { title: "My detective future", prompt: "Name your favourite World and one creator habit you will keep." }, reward: { badge: "🏆", label: "Little IP Detective Achievement" }, mcqs: [detectiveQuestion("What does CREATE remind you?", ["I can imagine original things", "I should copy", "Only adults create", "Ideas do not matter"], 0, "You are already a creator."), detectiveQuestion("What does RESPECT remind you?", ["Other people's creations matter", "Copy without asking", "Hide credit", "Ignore creators"], 0, "Respect is a key detective habit."), detectiveQuestion("What does your certificate celebrate?", ["Your learning journey", "A professional licence", "A shopping prize", "A secret pass"], 0, "It celebrates your completed journey.")], trueFalse: [trueFalse("Graduation celebrates learning, curiosity and respectful creator habits.", true, "You completed the Little IP Detective journey."), trueFalse("A certificate is a professional legal qualification.", false, "It is a child-friendly Certificate of Completion.")] },
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
