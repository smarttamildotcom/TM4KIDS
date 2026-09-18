export type DetectiveCharacterType = "boy" | "girl";

export type DetectiveProfile = {
  version: 1;
  nickname: string;
  avatar: {
    baseCharacter: string;
    skinTone: string;
    hairstyle: string;
    top: string;
    bottom: string;
    hat: string;
    shoes: string;
    badge: string;
    backpack: string;
    characterType?: DetectiveCharacterType;
  };
};

export const DETECTIVE_PROFILE_KEY = "ip2kids.detective-profile";
const keyFor = (userId: string) => `${DETECTIVE_PROFILE_KEY}:${userId}`;
const normalise = (value: string | undefined) => (value ?? "").trim().toLocaleLowerCase();

function parseProfile(raw: string | null): DetectiveProfile | null {
  try {
    const data = raw ? JSON.parse(raw) : null;
    return data?.version === 1 && data.nickname && data.avatar ? data : null;
  } catch {
    return null;
  }
}

/** Reads only the authenticated user's profile. Legacy data migrates only when its nickname matches the signed-in student name. */
export function readDetectiveProfile(userId?: string, studentName?: string): DetectiveProfile | null {
  if (!userId || typeof window === "undefined") return null;
  const scoped = parseProfile(window.localStorage.getItem(keyFor(userId)));
  if (scoped) return scoped;

  const legacy = parseProfile(window.localStorage.getItem(DETECTIVE_PROFILE_KEY));
  if (legacy && normalise(legacy.nickname) === normalise(studentName)) {
    saveDetectiveProfile(legacy, userId);
    return legacy;
  }
  return null;
}

export function saveDetectiveProfile(profile: DetectiveProfile, userId?: string) {
  if (!userId || typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(keyFor(userId), JSON.stringify(profile));
    return true;
  } catch {
    return false;
  }
}