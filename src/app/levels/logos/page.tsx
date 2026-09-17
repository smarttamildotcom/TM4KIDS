import { redirect } from "next/navigation";

/**
 * This legacy route is retained for old bookmarks. The Little IP Detective
 * journey now lives in the main adventure map.
 */
export default function LegacyLessonRedirect() {
  redirect("/");
}
