import { adventureContent } from "@/lib/adventures/adventure-content";

const districts = [
  "Creator Park", "Creator Park", "Creator Park",
  "Brand Street", "Brand Street", "Brand Street", "Brand Street",
  "Inventor Lab", "Inventor Lab", "Inventor Lab",
  "Creator Studio + Design District", "Creator Studio + Design District", "Creator Studio + Design District",
  "Idea City", "Idea City",
] as const;

const scenes = ["🎨", "🔎", "📚", "🏪", "🪞", "🧃", "💬", "🤖", "⚙️", "🧠", "💡", "🎒", "🌍", "🗂️", "🏆"] as const;

export const ideaCityCases = adventureContent.map((adventure, index) => ({
  id: adventure.id,
  title: adventure.title,
  district: districts[index],
  scene: scenes[index],
}));

export function cityCase(id: number) {
  return ideaCityCases.find((item) => item.id === id)!;
}

export function detectiveRank(solved: number) {
  return solved <= 2 ? "Idea Explorer" : solved <= 5 ? "Creative Explorer" : solved <= 8 ? "Brand Explorer" : solved <= 10 ? "Junior Inventor" : solved <= 13 ? "Idea Creator" : solved === 14 ? "Idea Adventurer" : "Master Idea Adventurer";
}
