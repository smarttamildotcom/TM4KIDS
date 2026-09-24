export const caseOne = {
  id: 1,
  title: "Questy’s First Mystery",
  location: "Creator Park",
  video: undefined as { mp4?: string; webm?: string; poster?: string; captions?: string } | undefined,
  pictureStory: [
    { id: "idea-day", eyebrow: "Creator Park", title: "Welcome to Idea Day", kind: "welcome" },
    { id: "creators", eyebrow: "Meet the creators", title: "Four Creators. Four Creations.", description: "Tap each creator to investigate what they made.", kind: "creators" },
    { id: "whoosh", eyebrow: "Something goes wrong!", title: "The Creator Cards are mixed up!", kind: "wind" },
    { id: "mission", eyebrow: "Little IP Detectives", title: "Your First Case", kind: "mission" },
  ],
  creators: [
    { id: "mia", name: "Mia", creation: "Dragon Drawing", icon: "🐉", detail: "a bright dragon drawing", dialogue: "Look! I drew this dragon myself.", image: "/cases/world-1/dragon-drawing.svg" },
    { id: "ben", name: "Ben", creation: "Robo-Roller", icon: "🤖", detail: "a tiny imaginary invention", dialogue: "I built Robo-Roller to solve a problem!", image: "/cases/world-1/robo-roller.svg" },
    { id: "zara", name: "Zara", creation: "The Moon Cat", icon: "📖", detail: "a short story", dialogue: "I wrote my own story called The Moon Cat.", image: "/cases/world-1/moon-cat.svg" },
    { id: "leo", name: "Leo", creation: "Sunny Snacks", icon: "☀️", detail: "a fictional snack-shop sign", dialogue: "I created a name and sign for my pretend snack shop!", image: "/cases/world-1/sunny-snacks.svg" },
  ],
  story: [
    { title: "Idea Day is here!", text: "Creator Park is buzzing. Young creators have brought their wonderful creations to share.", icon: "🎪" },
    { title: "Mia’s dragon", text: "Mia brings a colourful dragon drawing.", icon: "🐉" },
    { title: "Ben’s invention", text: "Ben brings Robo-Roller, a small imaginary invention.", icon: "🤖" },
    { title: "Zara’s story", text: "Zara brings her story, The Moon Cat.", icon: "📖" },
    { title: "Leo’s sign", text: "Leo brings the Sunny Snacks shop sign.", icon: "☀️" },
    { title: "Oh no!", text: "Their Creator Cards get mixed up. Now we know what was created, but not who created it.", icon: "🌀" },
    { title: "Questy needs you", text: "Can you follow the clues and match every creation to its creator?", icon: "🔎" },
  ],
  questions: [
    { prompt: "Mia spent the afternoon drawing her dragon. Who created the drawing?", choices: ["Mia", "Questy", "Nobody"], correct: 0, feedback: "Clue found! Mia created the drawing." },
    { prompt: "Ben thought of a useful gadget and built a model. What could we call Ben?", choices: ["An inventor", "A copy machine", "A shop"], correct: 0, feedback: "Exactly! Inventors create solutions to problems." },
    { prompt: "Why should we care who created something?", choices: ["So we can recognise the creator and their work", "Only adults can create things", "It never matters who created something"], correct: 0, feedback: "Great detective thinking! We can recognise the creator and their work." },
  ],
  final: { prompt: "Copycat says: “I’ll put MY name on Mia’s drawing!” What should we do?", choices: ["Let Copycat say they created it", "Tell everyone Mia created the drawing", "Throw the drawing away"], correct: 1 },
  caseFile: {
    mystery: "Who created what?",
    discovery: "People create drawings, stories, inventions, names and designs.",
    word: "IP — Intellectual Property",
    rule: "Creators matter. Their creations matter too.",
  },
} as const;