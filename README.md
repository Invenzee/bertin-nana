# Bertin Nana — Author website

Next.js App Router and Tailwind CSS 4. A dark, full-screen author website using Impact headings, Poppins body text, six original photographic backgrounds, and the supplied book cover and logo.

## Run

```bash
npm run dev
```

Open http://localhost:3000. Poppins is loaded through `next/font/google`, which needs internet access when Next.js first compiles the font.

## Page structure

1. Hero: mountain sunrise, original cover, book and excerpt calls to action.
2. About the author: biography grounded in the manuscript, library backdrop.
3. Get the book: original cover, book details, email purchase inquiry.
4. Testimonials: invitation to submit a review, with an explicit awaiting-reviews message.
5. FAQ: five expandable answers about the book, audience, ordering, excerpts, and editions.
6. Three perspectives: faith, science, and humanity over an orbital Earth background.
7. Chapter explorer: all 25 chapters in five groups, with expandable summaries.
8. Reading room: manuscript quotation and a three-passage reading dialog.
9. Full-screen footer: supplied logo, navigation, email, telephone, and language controls.

Every main section and the footer have an explicit 100vh height (100dvh in supporting browsers). The fixed header stays compact. Content can scroll within a section on short screens; the chapter list also supports scrolling. The page does not force scroll snapping.

The supplied white logo appears in both the header and footer. Six new images are used behind dark overlays; full prompts and saved asset paths are in `content/fullscreen-image-prompts.md`. Generated library and landscape scenes are illustrative, not photographs of the author or his home.

## Functional details

- English/French switch with locally saved language preference.
- Responsive mobile navigation and accessible accordion buttons.
- Native modal excerpt reader with Escape dismissal and focus restoration.
- Purchase button opens an email inquiry: no retailer, price, stock, or format is invented.
- Review invitation opens the user's email app: no invented testimonials or star ratings.
- Contact: Bertinbertinnana@gmail.com / +1 (325) 575-3237.
- Reduced-motion support and keyboard focus indicators.

The French excerpts are editorial translations of the supplied English manuscript. Visitors are asked to contact the author to confirm available editions.

## Editing

- `components/author-website.tsx`: layout, sections, FAQ, navigation, and contact actions.
- `content/site-copy.ts`: bilingual copy, chapter descriptions, and excerpt text.
- `app/globals.css`: backgrounds, overlays, typography, full-height layouts, responsive rules.
- `public/images/`: original supplied artwork and generated backgrounds.

## Delivery scope

Local implementation. No tests, build, lint, browser preview, or browser checks were run, as requested. Not deployed.
