import { HeartHandshake, Ribbon, type LucideIcon } from "lucide-react";

export type CharityPartner = {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  surface: string;
  badge: string;
};

export const charityPartners: CharityPartner[] = [
  {
    id: "singapore-cancer-society",
    name: "Singapore Cancer Society",
    description:
      "Supporting cancer patients and their families through care, education and community programmes.",
    icon: Ribbon,
    surface: "bg-detective-blue-50 border-detective-blue-200",
    badge: "bg-detective-blue-500 text-white",
  },
  {
    id: "childrens-cancer-foundation",
    name: "Children's Cancer Foundation",
    description:
      "Helping children with cancer and their families through medical, emotional and social support.",
    icon: HeartHandshake,
    surface: "bg-detective-orange-100 border-detective-orange-400",
    badge: "bg-detective-orange-500 text-white",
  },
];

export type MissionPoint = {
  emoji: string;
  title: string;
  body: string;
};

export const missionPoints: MissionPoint[] = [
  {
    emoji: "🎓",
    title: "Education with purpose",
    body: "Brand Quest believes education should create a positive impact far beyond the classroom.",
  },
  {
    emoji: "🪙",
    title: "A share of every contribution",
    body: "A portion of every SGD 10 contribution is set aside for charitable giving.",
  },
  {
    emoji: "🤝",
    title: "Given in person",
    body: "Donations are made periodically by the founder under his own name, supporting children's charities in Singapore.",
  },
];

export type DonationUpdate = {
  id: string;
  title: string;
  note: string;
};

export const donationUpdates: DonationUpdate[] = [
  { id: "summaries", title: "Donation Summaries", note: "Coming Soon" },
  { id: "acknowledgements", title: "Acknowledgements", note: "Coming Soon" },
  { id: "impact", title: "Annual Impact Report", note: "Coming Soon" },
];
