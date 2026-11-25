export const learningWorlds = [
  {
    "slug": "little-explorers",
    "name": "Little Explorers",
    "age": "5–7",
    "icon": "🌱",
    "description": "Create and play through shapes, colours, puzzles and hands-on activities.",
    "titles": [
      "My Magical Idea",
      "My Colourful World",
      "My Little Shop",
      "The Little Inventor",
      "Questy's Creative Festival"
    ]
  },
  {
    "slug": "junior-detectives",
    "name": "Junior Detectives",
    "age": "8–10",
    "icon": "🔎",
    "description": "Discover intellectual property gradually through stories and simple investigations.",
    "titles": [
      "Questy's First Mystery",
      "The Missing Creator",
      "The World of Brands",
      "The Copycat Market",
      "The Inventor's Laboratory",
      "The Secret Recipe",
      "The Design Factory",
      "The Missing Painting",
      "The Fake Toy Shop",
      "The Great IP Mystery"
    ]
  },
  {
    "slug": "young-innovators",
    "name": "Young Innovators",
    "age": "11–14",
    "icon": "🚀",
    "description": "Apply IP knowledge through inventions, brands and business scenarios.",
    "titles": [
      "The Innovation Challenge",
      "My First Startup",
      "The Brand Architect",
      "The Trademark Search",
      "The Virtual IP Office",
      "The Patent Engineer",
      "The Prior Art Challenge",
      "The Industrial Designer",
      "The Copyright Studio",
      "The Confidential Formula",
      "The Digital IP Battle",
      "The Licensing Challenge",
      "The Global Brand",
      "The IP Business Challenge",
      "The Young Innovator Championship"
    ]
  }
] as const;

export const adventureTotal = learningWorlds.reduce((total, world) => total + world.titles.length, 0);
