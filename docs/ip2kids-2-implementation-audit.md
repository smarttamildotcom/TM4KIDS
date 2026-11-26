# IP2Kids 2.0 — Implementation and preservation audit

Status: Development planning / NOT production approved
Branch: `feature/ip2kids-2-game-foundation`
Date: 2026-10-30

## Confirmed product decisions
- Interactive story games, puzzles, and mini-games; 15 Adventures in five existing Idea City districts.
- Supported locales: `en` (English), `ta` (Tamil), `hi` (Hindi), `ms` (Bahasa Melayu). No Indonesian locale.
- Multilingual human-reviewed prerecorded narration, captions, mute, replay and speed control.
- Retain official Questy and detective avatar assets.
- Keep existing authentication, progress, memberships, approvals, certificates and public pages.

## Initial repository findings (main at start of audit)
- `package.json`: Next.js 15, React 19, Framer Motion 11, Supabase client, nodemailer. No `next-intl` or game-engine dependency currently declared.
- `src/components/sections/AdventureMap.tsx`: maps every incomplete World to `unlocked`, without checking entitlements.
- `src/components/sections/WorldCard.tsx`: renders `Free to explore` for every World and a direct `/worlds/{id}` link regardless of status.
- These are **UI findings only**; direct-route/server authorization has NOT yet been verified.
- `src/lib/email/mailer.ts`: if SMTP_HOST, SMTP_PORT, SMTP_USER or SMTP_PASS are missing, returns `not-configured` and skips delivery. Production environment and actual mail delivery NOT yet verified.

## Non-negotiable release gates
1. Verify direct-route/API authorization for Adventures 3–15, not merely visual locking.
2. Preserve existing user IDs, completed World IDs, membership approvals and certificates.
3. Snapshot Supabase schema and back up data before migration; write rollback instructions.
4. Verify contact email delivery, public pages, privacy, sitemap and SEO metadata.
5. Test English/Tamil/Hindi/Malay translations and narration with native speakers.
6. Test mobile, reduced-motion, captions, mute, keyboard alternatives and game resume.
7. Keep production deployment unchanged until pilot sign-off.

## Proposed implementation order
1. Complete route/auth/entitlement and data model inventory; add regression tests.
2. Add locale infrastructure with stable translation keys and English fallback.
3. Implement reusable GameShell, ScenePlayer, narration controls and scene manifest types.
4. Implement hidden-object, matching and jigsaw mechanics.
5. Convert Adventures 1 and 2; preserve their current progress identifiers.
6. Localize and narrate pilot; QA and child testing.
7. Expand to remaining Adventures, then staged rollout behind feature flag.

## Proposed content and routing contracts
- Locale IDs: `en`, `ta`, `hi`, `ms`.
- Stable adventure IDs: 1–15; no renumbering or progress reset.
- Game scene manifest: `adventureId`, `version`, `sceneId`, `mechanic`, `dialogueIds`, `assetIds`, `completionRule`.
- Dialogue references map to localized strings and audio clip IDs; artwork remains language-neutral.
- Preserve legacy URLs with redirects only after verifying links, SEO and entitlement enforcement.

## Open questions to resolve through code inspection
- Actual routes serving Worlds and authorization checks.
- Supabase schema, RLS policies, progress writes and certificate generation.
- Parent/admin approval workflow and feature flags.
- Existing Questy asset licensing, scene image dimensions and mobile handling.
- Audio delivery/storage and costs.
- Current automated test and deployment setup.

## Scope of this branch
Documentation and audit only at this checkpoint. No production deployment, database changes or access-control changes are authorized by this file.
