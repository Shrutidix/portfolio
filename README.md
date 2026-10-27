# Shruti Dixit — Data Analyst Portfolio

A creative developer and data analyst portfolio built with **React 19, Vite 6, Tailwind 3, Framer Motion, GSAP ScrollTrigger, and Lenis**. Designed around an espresso-brown background, tactile cream paper cards, slate, sage, and sand accents, with *Playfair Display* headings and *EB Garamond* body typography.

---

## 🎨 Visual Identity & Motion System

- **Palette**:
  - Background (Dark Mode, Default): Deep Espresso Brown (`#231813`) with subtle animated drifting gradient mesh and grain texture.
  - Background (Light Mode, Sand): Warm Sand Paper (`#E7DCCB`).
  - Paper Cream (Cards & Spreads): `#FAF6EF` with tactile soft shadows, hover sheens, and 3D tilts (max 6°).
  - Slate Accent: `#222B31`
  - Sage Green Accent: `#7E9387`, `#3F6253`
  - Sand Accent: `#D9C3A3`
  - Gradient: `#7C5CFF` &rarr; `#22D3EE` &rarr; `#FFB020`
- **Typography**:
  - Headings: *Playfair Display*
  - Body: *EB Garamond*
  - Monospace tags & code: *JetBrains Mono*
  - System UI: *Inter*
- **Animation System**:
  - Easing: `cubic-bezier(0.22, 1, 0.36, 1)`
  - GSAP ScrollTrigger pinned transformation sequence: `Raw Data` &rarr; `Insight` &rarr; `Decision`
  - Desktop horizontal-scroll Projects gallery and mobile snap-mandatory swipe carousel
  - Self-drawing SVG chart dividers on scroll
  - Smooth Lenis scrolling with accurate nav height offsets
  - Clean custom cursor with precision dot and trailing spring ring (no tooltip bubbles or text)

---

## 📋 Navigation & Hierarchy

- **Single `<h1>`**: The hero name (`Hi, I'm Shruti Dixit`).
- **Section Titles**: Strictly `<h2>` (`About Me`, `Skills & Tools`, `Featured Projects`, `Experience`, `Certifications & Education`, `Let's turn your data into decisions.`).
- **Card Titles**: Strictly `<h3>`.
- **Wordmark & Modals**: Non-heading elements.
- **Eyebrows**: `HOME`, `ABOUT ME`, `SKILLS & TOOLS`, `PROJECTS`, `EXPERIENCE`, `CERTIFICATIONS`, `CONTACT`.
- **Sticky Nav Offset**: Computed dynamically (`scroll-mt-28` / ~110px) to ensure headings and tags never clip beneath the navigation header.

---

## 📂 Project Structure & Key Files Changed

- **`src/content.ts`**: Factual resume data, projects, skills, education, and credentials (all fictitious metrics, awards, and book numbering stripped).
- **`src/components/Hero.jsx`**: Character-by-character headline reveal, 3D interactive portfolio card with floating data chips (`SQL`, `Python`, `Power BI`), and single `<h1>`.
- **`src/components/DataTransformationStream.jsx`**: Pinned GSAP ScrollTrigger 3-step analytical transformation pipeline.
- **`src/components/About.jsx`**: Fixed rotating circular badge (`w-[72px] h-[72px] lg:w-[88px] lg:h-[88px]`, radius 38, font-size 8.5) pinned to the top right of the photo frame, rebuilt 3-layer collage, and line-icon workflow steps.
- **`src/components/Skills.jsx`**: 5 interactive competency cards with flip affordances, magnetic hover on skill tags, and no index numbers.
- **`src/components/Projects.jsx`**: Desktop horizontal-scroll gallery and mobile snap carousel with full case study modal inspection.
- **`src/components/CaseStudyModal.jsx`**: Case study modal with problem statement, methodology, architecture, and tech stack details.
- **`src/components/Experience.jsx`**: Career chronicle timeline with self-drawing progress line, glowing scroll node, and IBM Generative AI architecture schematic.
- **`src/components/Certifications.jsx`**: 3D-tilt ticket cards (max 6° tilt) featuring verified SVG badges from NASSCOM, AWS Academy, and IBM.
- **`src/components/Contact.jsx`**: Formspree form integration with loading/success states, clipboard copy for phone and email, and footer social links.
- **`src/components/CustomCursor.jsx`**: Trailing spring ring and precision dot with no floating label text or popovers.
- **`src/components/Navbar.jsx`**: Fixed order nav items, IntersectionObserver active highlight, and dynamic offset calculation.
- **`src/components/CommandPalette.jsx`**: Global `Cmd/Ctrl+K` command menu matching the exact section structure.
- **`src/components/SectionDivider.jsx`**: Self-drawing SVG chart dividers on scroll (bar chart, scatter plot, network graph).
- **`src/components/RibbonBackground.jsx`**: Subtle animated drifting gradient mesh and film grain behind the espresso background.
- **`public/og-image.png`**: High-resolution 1200x630 social card for rich Open Graph sharing.
- **`public/images/`**: Validated SVG graphic assets with strict XML entity encoding.

---

## 🚀 Running Locally & Building

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build production bundle
npm run build

# Preview build
npm run preview
```
