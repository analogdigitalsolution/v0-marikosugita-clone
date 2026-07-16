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
- Removed the unfinished “Website Under Development” message.
- Replaced it with a “Current Focus” section that summarizes his institutional, urban, and creative practice.
- Reduced the artificial loading delay from 2 seconds to 800ms so visitors reach the content faster.
- Kept the live hero portrait treatment and switched the local portrait render to a plain image element to avoid blank `next/image` output in previews.
- Updated metadata description for search/social previews.

## Accessibility and responsive notes
- Existing large typography and high-contrast black/gray-on-white treatment is preserved.
- Hero subtitle styling was made more explicit for readability.
- Biography and focus sections allow internal vertical scrolling as a safeguard for smaller screens.
- Current full-screen scrolling pattern remains a design constraint; future pass should consider normal document scrolling on mobile for long content.

## Critique notes
- The previous copy contained grammar issues and unclear positioning.
- “Website Under Development” weakened credibility and should not be visible on a live mentor profile.
- The current design is still very minimal and could later benefit from navigation, links, contact, selected projects, and press/research references.

## Open design debt
- Add verified external links for Urbandose, NITI Aayog profile/work, workshops, publications, and contact once final URLs are confirmed.
- Consider a fuller About page if the site grows beyond this landing profile.
