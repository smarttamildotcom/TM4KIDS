export type InfoCardItem = {
  emoji: string;
  title: string;
  description: string;
  surface: string;
  badge: string;
};

export const missionPoints: InfoCardItem[] = [
  { emoji: "™️", title: "Trademarks", description: "Discover how names, logos, symbols and other signs help us recognise brands.", surface: "bg-detective-blue-50 border-detective-blue-200", badge: "bg-detective-blue-500 text-white" },
  { emoji: "💡", title: "Patents", description: "Explore how inventions solve problems and learn how patents can protect new inventions.", surface: "bg-detective-yellow-100 border-detective-yellow-300", badge: "bg-detective-yellow-400 text-detective-blue-900" },
  { emoji: "©️", title: "Copyright", description: "Learn how creative works such as stories, drawings, music, photographs and videos can be protected.", surface: "bg-detective-orange-100 border-detective-orange-400", badge: "bg-detective-orange-500 text-white" },
  { emoji: "✨", title: "Designs", description: "Discover how the unique appearance of products can be protected.", surface: "bg-detective-blue-50 border-detective-blue-200", badge: "bg-detective-blue-600 text-white" },
];

export const whyLearnCards: InfoCardItem[] = [
  { emoji: "🎨", title: "Encourage Creativity", description: "Learning about IP encourages children to create, imagine and explore new ideas.", surface: "bg-detective-blue-50 border-detective-blue-200", badge: "bg-detective-blue-500 text-white" },
  { emoji: "💡", title: "Inspire Innovation", description: "Discovering how inventions are protected can inspire children to become young problem-solvers.", surface: "bg-detective-yellow-100 border-detective-yellow-300", badge: "bg-detective-yellow-400 text-detective-blue-900" },
  { emoji: "🤝", title: "Respect Other Creators", description: "Children learn why it is important to respect other people's ideas and creative work.", surface: "bg-detective-orange-100 border-detective-orange-400", badge: "bg-detective-orange-500 text-white" },
  { emoji: "🌍", title: "Understand the World Around Them", description: "From logos and toys to inventions, stories and games, intellectual property is all around us.", surface: "bg-detective-blue-50 border-detective-blue-200", badge: "bg-detective-blue-600 text-white" },
];

export type TimelineStep = { label: string; icon: AboutIconName };
export type AboutIconName = "award" | "gamepad" | "graduation-cap" | "heart" | "lightbulb" | "puzzle" | "search" | "sprout" | "sparkles" | "trophy";

export const learningTimeline: TimelineStep[] = [
  { label: "Discover", icon: "search" },
  { label: "Learn", icon: "graduation-cap" },
  { label: "Play", icon: "gamepad" },
  { label: "Solve Detective Missions", icon: "puzzle" },
  { label: "Earn Badges", icon: "award" },
  { label: "Become a Master IP Detective", icon: "trophy" },
];

export type ValueItem = { label: string; icon: AboutIconName };
export const academyValues: ValueItem[] = [
  { label: "Fun", icon: "sparkles" }, { label: "Creativity", icon: "lightbulb" }, { label: "Learning", icon: "sprout" }, { label: "Curiosity", icon: "puzzle" }, { label: "Respect", icon: "heart" },
];
