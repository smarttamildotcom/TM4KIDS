/** World 1 curriculum data. The scene/question shapes are reusable for later cases. */
export type CaseQuestionData = { prompt: string; choices: readonly string[]; correct: number; feedback: string };
export const caseOne = {
  title: "Questy’s First Mystery", district: "Creator Park", mystery: "Who Created What?",
  scenes: [
    { title: "Welcome to Idea Day", image: "/cases/world-1/scene-1-welcome-idea-day.png", alt: "Questy the orange detective cat welcomes a child to Creator Park on Idea Day", dialogue: [["Questy", "Welcome to Idea Day, Detective!"], ["Questy", "Kids from all over Idea City have brought things they created."], ["Detective", "They made all of these?"], ["Questy", "They did! Come and meet our four creators."]] },
    { title: "Four Creators, Four Creations", image: "/cases/world-1/scene-2-four-creators.png", alt: "Mia, Ben, Zara and Leo show their drawing, invention, story and snack shop sign", dialogue: [["Mia — Dragon Drawing", "I love drawing things from my imagination!"], ["Ben — Robo-Roller", "I like building things that solve problems."], ["Zara — The Moon Cat", "I make up characters and write adventures about them."], ["Leo — Sunny Snacks", "I invented a name and sign for my pretend snack shop."], ["Questy", "Four creators. Four very different creations!"]] },
    { title: "WHOOSH!", image: "/cases/world-1/scene-3-whoosh-approved.png", alt: "A gust of wind mixes the Creator Cards at Idea Day", dialogue: [["Story", "A sudden gust mixes everything up."], ["Mia", "Oh no!"], ["Questy", "The Creator Cards have been mixed up!"], ["Questy", "Detective [nickname], this sounds like a job for you!"]] },
    { title: "Your First Case", image: "/cases/world-1/scene-4-first-case-approved.png", alt: "Questy and a child detective investigate the mixed Creator Cards", dialogue: [["Questy", "We know WHAT was created…"], ["Questy", "…but can you discover WHO created each one?"]] },
  ],
  storyQuestions: [
    { prompt: "A colourful dragon drawing was found at Idea Day. Who created it?", choices: ["Mia", "Ben", "Zara", "Leo"], correct: 0, feedback: "🔎 Clue Found! Mia created the dragon drawing." },
    { prompt: "Which creator likes building things that solve problems?", choices: ["Leo", "Zara", "Ben", "Mia"], correct: 2, feedback: "🔎 Clue Found! Ben created Robo-Roller." },
    { prompt: "Who created characters and wrote an adventure?", choices: ["Ben", "Zara", "Mia", "Leo"], correct: 1, feedback: "🔎 Clue Found! Zara wrote The Moon Cat." },
    { prompt: "Who created a name and sign for a pretend snack shop?", choices: ["Leo", "Ben", "Zara", "Mia"], correct: 0, feedback: "🔎 Clue Found! Leo created Sunny Snacks." },
    { prompt: "Mia drew, Ben built, Zara wrote and Leo created a brand idea. What do they all have in common?", choices: ["They all created something", "They all built robots", "They all opened shops", "They all wrote books"], correct: 0, feedback: "⭐ BIG CLUE FOUND! They are all CREATORS!" },
  ] satisfies readonly CaseQuestionData[],
  knowledgeQuestions: [
    { prompt: "What does IP stand for?", choices: ["Interesting Pictures", "Intellectual Property", "Internet Projects", "Important Products"], correct: 1, feedback: "⭐ Correct! IP stands for Intellectual Property." },
    { prompt: "Which of these can people use when creating something?", choices: ["Imagination", "Knowledge", "Skills", "All of these"], correct: 3, feedback: "⭐ Correct! People use imagination, knowledge and skills." },
    { prompt: "Which person is being a creator?", choices: ["A child writing their own story", "A child designing a new character", "A child building a new invention", "All of them"], correct: 3, feedback: "⭐ Correct! Children can create in many ways." },
    { prompt: "Do all creations involve exactly the same kind of intellectual property?", choices: ["Yes, always", "No, different creations can involve different types of IP", "Only inventions involve IP", "Only businesses involve IP"], correct: 1, feedback: "⭐ Correct! Different creations can involve different types of IP." },
    { prompt: "Which statement is the best detective rule?", choices: ["Only adults can be creators", "Only expensive inventions matter", "People can create in many different ways", "Everything you imagine is automatically registered as IP"], correct: 2, feedback: "⭐ Correct! People can create in many different ways." },
  ] satisfies readonly CaseQuestionData[],
  final: { prompt: "What is the best solution?", choices: ["Leave Copycat’s name there.", "Throw the drawing away.", "Put Mia’s Creator Card back and recognise her as the creator.", "Tell everyone nobody created it."], correct: 2, feedback: "🎉 CASE SOLVED! Mia created the dragon drawing, so we should recognise her as its creator." } satisfies CaseQuestionData,
} as const;
