/** Shared story-scene model used by every lesson's <StoryPlayer />. */

export type StorySceneHighlight = {
  text: string;
  /** `reveal` = one-off spring pop-in; `pulse` = gentle repeating pulse. */
  tone: "reveal" | "pulse";
};

export type StoryScene = {
  id: string;
  /** Small label shown above the scene title. */
  chapter: string;
  title: string;
  /** Each string renders as its own short, kid-friendly paragraph. */
  paragraphs: string[];
  imageLabel: string;
  emoji: string;
  /** Optional highlighted "detective note" shown under the text. */
  note?: string;
  /** Optional standout word or phrase (e.g. a new brand name or key term). */
  highlight?: StorySceneHighlight;
};
