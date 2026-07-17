# Design Notes — Paritosh Goel Website

## Scope
Content correction pass for the single-page biography website.

## Intent and audience
The site introduces Paritosh Goel to professional visitors, collaborators, institutions, and people discovering his work across urbanism, public policy, entrepreneurship, and innovation.

## Visual language
Keep the existing minimal editorial direction: white space, grayscale portrait, light typography, and full-screen section navigation. The content should feel calm, credible, and institutional rather than promotional.

## Changes made
- Updated hero positioning from “Urbanist, Strategist, Artist & Entrepreneur” to “Urbanist, Public Policy Professional, Architect & Entrepreneur”.
- Rewrote the biography using the supplied source document as the primary reference.
- Moved the former “Current Focus” copy into the Biography section so all profile content lives under Biography only.
- Restored the final “Website Under Development” section as requested, instead of presenting it as a separate content/focus section.
- Added a minimal 404 page so the upgraded Next.js production build has an explicit not-found route.
- Reduced the artificial loading delay from 2 seconds to 800ms so visitors reach the content faster.
- Kept the live hero portrait treatment and switched the local portrait render to a plain image element to avoid blank `next/image` output in previews.
- Updated metadata description for search/social previews.

## Accessibility and responsive notes
- Existing large typography and high-contrast black/gray-on-white treatment is preserved.
- Hero subtitle styling was made more explicit for readability.
- The Biography section allows internal vertical scrolling as a safeguard for smaller screens.
- Section 2 now uses tighter vertical margins, increased mobile side margins, a wider desktop text measure, slightly smaller biography text, and larger paragraph-end spacing so the full combined copy stays together without the paragraphs feeling compressed.
- The 404 state reuses the same quiet white editorial treatment rather than introducing a new visual direction.
- Current full-screen scrolling pattern remains a design constraint; future pass should consider normal document scrolling on mobile for long content.

## Critique notes
- The previous copy contained grammar issues and unclear positioning.
- The separate “Current Focus” section created a content split the user did not want; this has been corrected so the biography owns all profile copy.
- Section 2 critique/fix/re-critique: the biography had too much vertical padding, paragraphs read as one dense block, and the mobile side margins felt too tight; the fix reduces top/bottom gutters, increases mobile inset, widens the desktop editorial measure, adds clearer paragraph separation, and keeps overflow scrolling available only as a fallback.
- The current design is still very minimal and could later benefit from navigation, links, contact, selected projects, and press/research references.

## Open design debt
- Add verified external links for Urbandose, NITI Aayog profile/work, workshops, publications, and contact once final URLs are confirmed.
- Consider a fuller About page if the site grows beyond this landing profile.
