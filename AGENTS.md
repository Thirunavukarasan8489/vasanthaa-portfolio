# AGENTS.md

## Project: Vasanthaa Portfolio Website

You are building a production-ready personal portfolio website for **Vasanthaa**, a **Content Writer and Voice Over Artist**.

The site must feel **custom-designed, editorial, premium, human-coded, responsive, fast, accessible, and intentionally animated**. It must **not** look like a generic AI-generated portfolio or SaaS landing page.

---

## 1. Core Project Goal

Build a modern portfolio website that presents Vasanthaa's:

- Content writing services
- Voice-over services
- Written portfolio
- Voice-over portfolio
- On-camera work
- Industry experience
- Personal profile
- Contact information

The existing portfolio content should be preserved conceptually and reorganized into a polished web experience.

Primary brand idea:

> **Words × Voice**

The visual language should combine:
- straight editorial lines for writing
- waveform-inspired elements for voice
- strong typography
- restrained motion
- premium spacing
- dark green branding with subtle gold accents

---

## 2. Required Technology Stack

Use:

- **Next.js**
- **TypeScript**
- **App Router**
- **Tailwind CSS**
- **Motion** for lightweight UI animation
- **GSAP only where genuinely necessary**
- **MongoDB Atlas** only for dynamic data that needs persistence
- **Zod** for validation
- **React Hook Form** for forms
- **Resend** for email notifications
- **Cloudinary** only if remote media management is required
- **Lucide React** for icons
- **next/font**
- **next/image**

Do not introduce libraries unless they solve a clear problem.

---

## 3. Architecture Rules

### Default to Server Components

Do **not** make pages or large sections client components unless required.

Avoid:

```tsx
"use client";
```

at page level unless absolutely necessary.

Use Server Components for:

- Hero
- About
- Services
- Project listings
- Industry section
- Static page content
- SEO metadata

Use Client Components only for:

- Audio player
- Mobile menu
- Contact form interaction
- Custom cursor
- Interactive filters
- Complex animation components
- Play/pause controls

Goal:

> Ship as little JavaScript to the browser as possible.

---

## 4. Design Direction

### Style

Use a:

- premium editorial portfolio style
- artistic but professional composition
- asymmetric layouts
- strong typography
- generous whitespace
- handcrafted visual rhythm
- clean spacing
- subtle texture
- thin decorative lines
- intentional image placement
- restrained gold accents
- elegant hover effects
- controlled animation

The website should feel like it was designed by an experienced frontend designer, not generated automatically.

---

## 5. Strictly Avoid

Do not use:

- generic AI portfolio layouts
- excessive gradients
- blue/purple gradients
- excessive glassmorphism
- repeated rounded cards everywhere
- random blobs
- giant soft shadows
- generic SaaS layouts
- meaningless floating shapes
- too many pills
- too many badges
- identical card grids
- huge gradient headings
- over-animated sections
- unnecessary scroll-jacking
- animation on every element
- oversized border-radius on all components
- excessive blur effects
- decorative elements with no purpose

Do not create a template-looking site.

Every section must feel intentionally composed.

---

## 6. Brand Colors

Primary:

```css
#053827
```

Use this palette:

```css
:root {
  --green-950: #021D15;
  --green-900: #03291E;
  --green-800: #053827;
  --green-700: #0A4C38;
  --green-600: #126249;
  --green-500: #23775C;
  --green-400: #4A9277;
  --green-300: #79AD98;
  --green-200: #AFCDC1;
  --green-100: #DCEAE5;
  --green-50:  #F2F7F5;

  --gold-500: #C8A75A;
  --gold-400: #D7BC76;
  --gold-200: #E9DBB5;

  --cream: #F7F4EC;
  --paper: #FBFAF6;
  --white: #FFFFFF;

  --text-dark: #10221C;
  --text-muted: #66736E;
}
```

### Color Usage

Primary dark background:

```text
#053827
```

Deeper dark sections:

```text
#021D15
```

Premium accent:

```text
#C8A75A
```

Warm page background:

```text
#F7F4EC
```

Main text:

```text
#10221C
```

Soft green:

```text
#DCEAE5
```

Gold must be used sparingly.

Do not create large gold background areas.

Use gold mainly for:

- thin lines
- small icons
- section counters
- hover details
- subtle borders
- decorative accents

---

## 7. Typography

Use a strong editorial combination.

Recommended:

### Heading

- DM Serif Display
- or Cormorant Garamond

### Body / Interface

- Manrope
- Instrument Sans
- Inter

### Handwritten Accent

Use very sparingly:

- Caveat
- Kalam

Example visual hierarchy:

```text
Hello,
I'm Vasanthaa
```

Use a handwritten style only for the small `Hello,`.

Use a large serif for:

```text
I'm Vasanthaa
```

Use a modern sans-serif for:

```text
Content Writer
Voice Over Artist
Creative Storyteller
```

Use `next/font`.

Do not load fonts using remote stylesheet tags.

---

## 8. Recommended Pages

Use:

```text
/
├── Home
├── /about
├── /services
├── /work
│   ├── /written
│   ├── /voice-over
│   └── /on-camera
└── /contact
```

Optional individual written project route:

```text
/work/written/[slug]
```

Use individual project pages when meaningful case-study content exists.

---

## 9. Main Navigation

Desktop:

```text
Vasanthaa.                     About  Services  Work  Contact   Let's Work Together ↗
```

Mobile:

```text
Vasanthaa.                                            ☰
```

Rules:

- sticky or fixed behavior is allowed
- use minimal blur only after scrolling
- use a thin divider
- avoid generic pill navigation
- menu must be keyboard accessible
- mobile menu must lock background scroll correctly

---

## 10. Homepage Structure

Recommended order:

```tsx
<HomePage>
  <Header />

  <main>
    <Hero />
    <CreativeMarquee />
    <ServicesPreview />
    <FeaturedWork />
    <VoiceShowcase />
    <Industries />
    <AboutPreview />
    <ContactCTA />
  </main>

  <Footer />
</HomePage>
```

---

## 11. Hero Section

The hero must clearly establish:

- Vasanthaa
- Content Writer
- Voice Over Artist
- creative positioning
- portfolio CTA
- portrait

Suggested content structure:

```text
01 — HELLO

Hello,
I'm Vasanthaa.

CONTENT WRITER
VOICE OVER ARTIST

I shape thoughts into words
and tune voices that make
every message felt.

Explore my work ↘
```

Use the original portfolio message conceptually.

### Hero Layout

Desktop:

- text on left
- portrait on right
- asymmetrical composition
- editorial typography
- subtle gold outline or line work
- small experience label

Possible detail:

```text
02+
YEARS
EXPERIENCE
```

Mobile:

```text
HELLO

I'M
VASANTHAA

PHOTO

Content Writer &
Voice Over Artist

CTA
```

Do not simply shrink the desktop layout.

---

## 12. Hero Animation

Keep it fast and elegant.

Suggested order:

1. small section label appears
2. `Hello,` fades upward
3. main name reveals line by line
4. portrait reveal/mask animation
5. subtitle appears
6. CTA arrow subtly moves

Total initial animation:

```text
1.2–1.8 seconds
```

The page must remain usable during animation.

Avoid long splash screens.

---

## 13. Creative Marquee

Add a subtle continuous marquee such as:

```text
CONTENT WRITING ✦ VOICE OVER ✦ STORYTELLING ✦ SCRIPT WRITING ✦ ON CAMERA ✦ BRAND CONTENT
```

Use CSS if possible.

Do not use unnecessary JavaScript.

---

## 14. Services Section

Main service groups:

### Content Writing

- Social Media Content
- Reel Scripts
- Promotional Content
- Educational Content
- Commercial Content
- Brand Content
- Product & Service Content
- Informational Content
- Health Content
- Career & Tech Content

### Voice Over

- Social Media Voice Overs
- Reel Voice Overs
- Promotional Voice Overs
- Narration Voice Overs
- Commercial Voice Overs
- Brand Voice Overs
- Explainer Voice Overs
- Product & Service Voice Overs
- Educational Voice Overs
- Informational Voice Overs

Present them using a strong two-column editorial layout.

Do not convert every item into a card.

Example interaction:

```text
Social Media Content    →
```

On hover:

```text
Social Media Content    ─────→
```

Keep micro-interactions subtle.

---

## 15. Work Section

Main work categories:

### Words, Written

Description:

```text
Scripts, stories, concepts and content across niches.
```

### Words, Voiced

Description:

```text
Commercials, reels, promotions and more, brought to life.
```

### On-Camera Work

Description:

```text
Ideas, scripts and stories, brought to life on camera.
```

Use alternating alignment and different spatial composition.

Avoid three identical cards.

Example:

```text
WORDS,
WRITTEN.

Scripts, stories,
concepts & campaigns.

01

                            Explore writing ↗
─────────────────────────────────────────────


                       WORDS,
                       VOICED.

                       Commercials, reels,
                       narration & brands.

                                         02


ON
CAMERA.

Ideas brought
into frame.

03
```

---

## 16. Written Project Pages

Each project can include:

- project title
- short summary
- industry
- content type
- year
- project goal
- written content preview
- media
- original external link if needed

Example:

```text
BRAND CAMPAIGN

A campaign created for
a wellness brand...

Industry
Wellness

Content
Reel Campaign

Year
2026

Read project ↗
```

If Google Drive is still used, expose it only as a supporting link:

```text
View original ↗
```

Do not make Google Drive the primary user experience.

---

## 17. Voice-Over Experience

Build a custom audio experience.

Do not use the browser's default audio controls.

Example:

```text
VOICE SAMPLE 01

▶  ━━━━●━━━━━━━━━━━━━━━━━━  00:37

Commercial • English
```

Use native `<audio>` underneath.

Features:

- play/pause
- progress
- duration
- optional animated waveform
- only one sample playing at a time
- keyboard accessible controls
- responsive design
- no autoplay

Use:

```html
preload="metadata"
```

or:

```html
preload="none"
```

Do not preload all audio files.

---

## 18. Visual Identity: Words vs Voice

Use a consistent visual language.

Writing:

```text
────────────
```

Voice:

```text
∿∿∿∿∿∿∿
```

Example:

```text
Content Writing
───────────────

Voice Over
∿∿∿∿∿∿∿∿
```

This concept should appear subtly throughout the site.

Do not overuse it.

---

## 19. Industries Section

Industries include:

- Technology
- IT
- Healthcare
- Aesthetics
- Beauty
- Personal Care
- Fitness
- Wellness
- Automobiles
- Agriculture
- Food Products
- Education
- Skill Development
- Digital Marketing
- Advertising
- Construction
- Building Materials
- Home Solutions
- Professional Services
- Sports
- Career Development
- Employment
- Grooming
- Ayurveda

Use kinetic typography rather than cards.

Possible layout:

```text
TECHNOLOGY · IT · HEALTHCARE · BEAUTY       ←
AUTOMOBILE · WELLNESS · EDUCATION · FOOD    →
MARKETING · ADVERTISING · CONSTRUCTION      ←
```

Use subtle scroll-driven movement.

No aggressive horizontal scroll-jacking.

---

## 20. About Section

Use the existing story concept:

- passion for words and voice
- evolved into a profession
- 2+ years of experience
- building a professional presence
- bringing behind-the-scenes work into the spotlight

Suggested visual:

```text
05 — ABOUT ME

Where
I am now.

                     02+
                    YEARS

Story text...

                     ┌──── image
                     │
                     │
```

Keep the writing personal and natural.

Do not replace it with generic AI biography text.

---

## 21. Contact Section

Use a strong closing message.

Suggested direction:

```text
Have a story
worth telling?

Let's give it
the right words
and the right voice.

LET'S WORK TOGETHER ↗
```

Show:

- Email
- Instagram
- Phone
- optional LinkedIn

Use strong typography and minimal visual clutter.

---

## 22. Footer

Suggested:

```text
VASANTHAA®

Content Writer &
Voice Over Artist

Instagram     Email     LinkedIn

© 2026 Vasanthaa
Made thoughtfully.
```

Keep it minimal.

---

## 23. Animation Strategy

Use:

### CSS

For:

- hover effects
- marquee
- buttons
- underline animation
- menu transitions
- decorative motion
- micro-interactions

### Motion

For:

- reveal animations
- section transitions
- modal transitions
- small layout transitions
- text entrance effects

### GSAP

Only for:

- signature hero sequences
- scroll-linked industry movement
- advanced parallax
- animation that cannot be implemented cleanly otherwise

Do not import GSAP everywhere.

---

## 24. Animation Ratio

Use approximately:

```text
70% static
20% subtle motion
10% signature animation
```

Premium design requires stillness.

Do not animate everything.

---

## 25. Motion Accessibility

Support:

```css
@media (prefers-reduced-motion: reduce)
```

When enabled:

- disable parallax
- disable marquee motion where necessary
- remove long reveal sequences
- avoid scroll-linked motion
- keep interactions functional

---

## 26. Optional Custom Cursor

Desktop only.

Possible states:

```text
default → small dot
project → VIEW
audio   → PLAY
links   → ↗
```

Rules:

- do not show on touch devices
- do not block accessibility
- do not make it lag
- do not override standard cursor behavior on form controls
- disable if performance suffers

---

## 27. Recommended Folder Structure

Use:

```text
vasanthaa-portfolio/
│
├── public/
│   ├── images/
│   │   ├── hero/
│   │   ├── about/
│   │   ├── projects/
│   │   └── og/
│   │
│   ├── audio/
│   │   └── samples/
│   │
│   ├── videos/
│   ├── icons/
│   └── textures/
│
├── src/
│   ├── app/
│   │   ├── (website)/
│   │   │   ├── page.tsx
│   │   │   ├── about/
│   │   │   │   └── page.tsx
│   │   │   ├── services/
│   │   │   │   └── page.tsx
│   │   │   ├── work/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── written/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [slug]/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── voice-over/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── on-camera/
│   │   │   │       └── page.tsx
│   │   │   └── contact/
│   │   │       └── page.tsx
│   │   │
│   │   ├── api/
│   │   │   ├── contact/
│   │   │   │   └── route.ts
│   │   │   └── projects/
│   │   │       └── route.ts
│   │   │
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   ├── not-found.tsx
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── MobileMenu.tsx
│   │   │   └── Footer.tsx
│   │   ├── home/
│   │   │   ├── Hero.tsx
│   │   │   ├── IntroMarquee.tsx
│   │   │   ├── ServicesPreview.tsx
│   │   │   ├── WorkPreview.tsx
│   │   │   ├── Industries.tsx
│   │   │   ├── AboutPreview.tsx
│   │   │   └── ContactCTA.tsx
│   │   ├── work/
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── ProjectGrid.tsx
│   │   │   ├── ProjectHero.tsx
│   │   │   └── WorkFilters.tsx
│   │   ├── audio/
│   │   │   ├── AudioPlayer.tsx
│   │   │   └── AudioWaveform.tsx
│   │   ├── animation/
│   │   │   ├── Reveal.tsx
│   │   │   ├── TextReveal.tsx
│   │   │   ├── Magnetic.tsx
│   │   │   └── Cursor.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Container.tsx
│   │       ├── SectionLabel.tsx
│   │       └── Heading.tsx
│   │
│   ├── data/
│   │   ├── services.ts
│   │   ├── industries.ts
│   │   ├── projects.ts
│   │   └── social-links.ts
│   │
│   ├── lib/
│   │   ├── db.ts
│   │   ├── mail.ts
│   │   ├── utils.ts
│   │   └── validations/
│   │       └── contact.ts
│   │
│   ├── models/
│   │   ├── Contact.ts
│   │   └── Project.ts
│   │
│   ├── hooks/
│   │   ├── useMediaQuery.ts
│   │   └── useAudioPlayer.ts
│   │
│   ├── types/
│   │   ├── project.ts
│   │   └── service.ts
│   │
│   └── config/
│       ├── site.ts
│       └── navigation.ts
│
├── .env.local
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

Keep naming consistent.

Do not create unnecessary abstraction layers.

---

## 28. Static vs Dynamic Data

Keep these as local TypeScript data:

- services
- industries
- navigation
- social links
- basic site settings

Example:

```ts
export const services = [
  {
    title: "Social Media Content",
    category: "writing",
  },
  {
    title: "Reel Scripts",
    category: "writing",
  },
];
```

Do not fetch rarely-changing content from MongoDB.

Use MongoDB only when persistence is useful.

Good candidates:

- contact enquiries
- projects if an admin system is added
- testimonials if editable
- future CMS-managed data

---

## 29. Rendering Strategy

Preferred:

```text
Home       → Static
About      → Static
Services   → Static
Work       → Static / ISR
Projects   → Static / ISR
Contact    → Static
```

Use server rendering only where needed.

Contact API:

```text
POST /api/contact
```

---

## 30. Contact Form Backend

Recommended flow:

```text
Contact Form
     ↓
Zod validation
     ↓
Next.js Route Handler
     ↓
MongoDB
     +
Email notification
     ↓
Success response
```

Fields:

- Name *
- Email *
- Phone
- Company / Brand
- Service
- Project Details *
- Budget

Service options:

- Content Writing
- Voice Over
- On Camera
- Other

---

## 31. Form Security

Add:

- Zod validation
- server-side validation
- rate limiting
- honeypot or Cloudflare Turnstile
- sanitized input where needed
- no exposed secret keys
- no email sending logic directly from the client

Store secrets only in environment variables.

---

## 32. Image Optimization

Use:

```tsx
<Image />
```

from Next.js.

Do not use large unoptimized `<img>` files.

Preferred formats:

- AVIF
- WebP

Hero image ideal target:

```text
100–250 KB
```

Project thumbnails:

```text
50–150 KB
```

Use proper:

- width
- height
- sizes
- priority only for above-the-fold important media

Example:

```tsx
<Image
  src="/images/hero/vasanthaa.webp"
  alt="Vasanthaa - Content Writer and Voice Over Artist"
  width={900}
  height={1100}
  priority
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

Avoid layout shift.

---

## 33. Video Optimization

Do not preload all videos.

Use a poster image first.

Example:

```text
[thumbnail]
     ▶
```

Load the actual video only after interaction where appropriate.

Do not autoplay large background video on mobile.

If video is decorative, provide graceful fallback.

---

## 34. Audio Optimization

Do not preload all voice samples.

Use:

```html
preload="metadata"
```

or:

```html
preload="none"
```

Only load the audio when the user interacts.

---

## 35. Performance Goals

Target:

```text
Lighthouse

Performance      95–100
Accessibility    95+
Best Practices   95+
SEO              100
```

Core Web Vitals target:

```text
LCP < 2.5s
CLS < 0.1
INP < 200ms
```

Performance is a product requirement, not an afterthought.

---

## 36. Performance Rules

Always:

- use Server Components where possible
- lazy-load below-the-fold media
- reduce client JavaScript
- avoid unnecessary state
- avoid heavy animation libraries for simple effects
- dynamically import expensive client components
- optimize fonts
- optimize images
- avoid massive third-party scripts
- avoid autoplay media
- preload only critical resources
- use CSS for simple animation
- tree-shake dependencies
- avoid duplicate utility libraries

Before completing a page, inspect its runtime cost.

---

## 37. Responsive Design

Use intentional layouts.

Suggested breakpoints:

```text
Mobile:       320–639
Tablet:       640–1023
Laptop:       1024–1439
Desktop:      1440+
Large:        1920+
```

Do not simply shrink desktop designs.

Mobile must be independently composed.

Check:

- 320 px
- 375 px
- 390 px
- 430 px
- 768 px
- 1024 px
- 1280 px
- 1440 px
- 1920 px

---

## 38. Accessibility Requirements

Use:

- semantic HTML
- proper heading order
- useful alt text
- visible focus states
- accessible labels
- keyboard navigation
- sufficient color contrast
- reduced-motion support
- correct button/link semantics
- accessible mobile menu
- accessible audio controls
- form error messages connected to fields

Do not make mouse-only interactions.

---

## 39. SEO

Implement:

- page-level metadata
- title templates
- meta descriptions
- canonical URLs
- Open Graph
- Twitter metadata
- sitemap
- robots
- structured data where appropriate
- semantic headings
- descriptive URLs
- proper image alt text

Homepage title:

```text
Vasanthaa | Content Writer & Voice Over Artist
```

Suggested description:

```text
Portfolio of Vasanthaa, a content writer and voice-over artist creating scripts, brand content, social media content, commercial voice overs, narration and creative campaigns.
```

Potential structured data:

- Person
- ProfessionalService, only if applicable and accurate

Do not add misleading schema.

---

## 40. Code Quality Rules

Code must be:

- readable
- modular
- maintainable
- typed
- reusable where appropriate
- not over-engineered

Use:

- descriptive variable names
- small components
- explicit types
- consistent imports
- clear file responsibilities

Avoid:

- huge 500+ line components
- duplicated markup
- deeply nested ternaries
- unnecessary global state
- magic values everywhere
- excessive useEffect
- excessive client-side fetching
- `any`
- dead code
- commented-out old code
- generic component names such as `Card1`, `Section2`, `Thing`

---

## 41. Component Rules

Before creating a component, ask:

1. Is this reused?
2. Is this visually meaningful?
3. Does splitting it improve readability?
4. Does this need client-side JavaScript?

Do not create tiny components for every single text line.

Do not create enormous page files.

---

## 42. Development Workflow

Build in phases.

### Phase 1 — Setup

- create Next.js app
- configure TypeScript
- configure Tailwind
- establish aliases
- install only required libraries
- configure linting
- set up environment structure

### Phase 2 — Design System

Create:

- color variables
- typography
- spacing
- container widths
- border rules
- button styles
- section labels
- animation tokens
- breakpoints

### Phase 3 — Global Layout

Build:

- root layout
- header
- navigation
- mobile navigation
- footer

### Phase 4 — Homepage

Build:

- hero
- marquee
- services
- work preview
- audio showcase
- industries
- about
- contact CTA

### Phase 5 — Animation

Add motion only after layouts are stable.

### Phase 6 — Work Pages

Build:

- work landing page
- written work
- voice work
- on-camera work
- project detail pages

### Phase 7 — Audio

Build custom audio player.

### Phase 8 — Contact Backend

Build:

- validation
- API handler
- email
- persistence
- spam protection

### Phase 9 — SEO

Implement metadata and structured data.

### Phase 10 — Performance

Optimize:

- images
- fonts
- JavaScript
- media
- rendering

### Phase 11 — Responsive QA

Test across all major breakpoints.

### Phase 12 — Production

Run:

```bash
npm run build
```

Fix all errors and warnings before deployment.

---

## 43. AI Agent Working Rules

When implementing this project:

### Do

- inspect existing files before changing architecture
- preserve working code
- make focused changes
- keep visual consistency
- reuse design tokens
- keep performance in mind
- test after meaningful changes
- use semantic HTML
- keep components typed
- explain major architectural changes in code comments only when useful
- run lint/build after major milestones

### Do Not

- regenerate the whole project unnecessarily
- overwrite files blindly
- change working architecture without reason
- add packages without justification
- create placeholder APIs that do nothing
- invent fake testimonials
- invent fake clients
- invent fake project results
- invent fake companies
- invent unsupported experience
- invent project statistics
- hardcode secrets
- expose environment variables to the client
- add generic lorem ipsum
- create fake work history

If content is missing, use a clear placeholder such as:

```text
[Project content to be provided]
```

instead of inventing facts.

---

## 44. Content Integrity

Use the supplied portfolio content as the source of truth.

Do not silently rewrite Vasanthaa's background into something materially different.

Known positioning:

```text
Vasanthaa
Content Writer | Voice Over Artist
```

Core line:

```text
I shape thoughts into words
& tune voices that make every message felt.
```

Experience:

```text
2+ years
```

Work types:

```text
Words, Written
Words, Voiced
On-Camera Work
```

Preserve this identity throughout the website.

---

## 45. Human-Coded Appearance Rule

This is a critical requirement.

The final website must not look like it came from a one-shot AI website generator.

Achieve this through:

- asymmetric layouts
- purposeful spacing
- custom typography hierarchy
- editorial composition
- custom micro-interactions
- visual restraint
- individual section art direction
- consistent design logic
- subtle handcrafted details
- intentional mobile layout changes
- meaningful motion
- restrained use of components

Avoid repetitive patterns.

Do not make every section:

```text
heading
subheading
three rounded cards
button
```

Vary composition while maintaining consistency.

---

## 46. Final Visual Standard

The website should feel:

- elegant
- modern
- creative
- warm
- premium
- personal
- fast
- responsive
- polished
- professionally art-directed

It should **not** feel:

- generic
- over-designed
- noisy
- childish
- template-based
- AI-generated
- like a SaaS dashboard
- like a startup landing page

---

## 47. Final Validation Checklist

Before considering the project complete, verify:

### Design

- [x] Primary color #053827 used consistently
- [x] Gold used sparingly
- [x] Editorial visual style maintained
- [x] No generic AI card-heavy layout
- [x] Desktop and mobile feel intentionally designed
- [x] Animations feel subtle and purposeful

### Development

- [x] Next.js App Router
- [x] TypeScript
- [x] Server Components by default
- [x] Client Components only where needed
- [x] Clear folder structure
- [x] No unnecessary dependencies
- [x] No TypeScript errors
- [x] No build errors

### Performance

- [x] Images optimized
- [x] Videos lazy-loaded
- [x] Audio not unnecessarily preloaded
- [x] Fonts optimized
- [x] Minimal client JavaScript
- [x] No major CLS
- [x] Good Core Web Vitals

### Accessibility

- [x] Keyboard navigation
- [x] Focus states
- [x] Correct semantic structure
- [x] Reduced-motion support
- [x] Form accessibility
- [x] Audio controls accessible
- [x] Sufficient contrast

### SEO

- [x] Metadata
- [x] Canonical
- [x] Open Graph
- [x] Sitemap
- [x] Robots
- [x] Structured data where appropriate
- [x] Meaningful page titles

### Production

- [x] `npm run build` passes
- [x] No console errors
- [x] No broken links
- [x] Mobile menu works
- [x] Contact form works
- [x] Audio player works
- [x] Work links work
- [x] Responsive layouts verified

---

## 48. Final Instruction to the Agent

Do not attempt to build the entire project in one uncontrolled pass.

Work iteratively.

At each stage:

1. inspect the current codebase
2. plan the smallest coherent change
3. implement it cleanly
4. test the result
5. preserve performance
6. verify responsive behavior
7. then continue

The website must ultimately feel like a **custom-crafted editorial portfolio built by a professional developer and designer**, while remaining **fast, maintainable, accessible, SEO-friendly, and production-ready**.

---

## 49. Completed Works & Future Roadmap

### Summary of Completed Works

The production-ready personal portfolio website for **Vasanthaa** (Content Writer & Voice Over Artist) has been fully implemented adhering strictly to all requirements in `AGENTS.md`.

#### 1. Architecture & Technology Stack
- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript 5 in strict mode.
- **Styling:** Tailwind CSS v4 with bespoke CSS design variables (`globals.css`) adhering to the editorial palette (`#053827` primary dark green, `#C8A75A` gold accent, `#F7F4EC` warm cream, `#10221C` dark text).
- **Typography:** Configured with `next/font/google` using `DM_Serif_Display` (headings), `Manrope` (body and UI), and `Caveat` (subtle handwritten accents).
- **Rendering Strategy:** Server Components by default. Client Components isolated to interactive islands:
  - `components/layout/MobileMenu.tsx` (smooth hardware-accelerated sliding drawer with backdrop blur overlay, keyboard accessibility, and locked body scroll)
  - `components/layout/Header.tsx` (sticky navigation with scroll detection)
  - `components/audio/AudioPlayer.tsx` and `components/audio/AudioWaveform.tsx` (custom audio player with synchronized single playback)
  - `components/work/WorkFilters.tsx` (instant client-side category filtering)
  - `components/contact/ContactForm.tsx` (React Hook Form + Zod client validation and async submission)
  - `components/home/Testimonials.tsx` (interactive editorial endorsement slider with quote marks, metric badges, and keyboard controls)

#### 2. Pages & Routes Delivered
- `/`: Editorial Homepage composed of Hero, CSS infinite Marquee, Services preview with arrow hover transitions, Selected Disciplines (Words Written, Words Voiced, On-Camera), Voice Showcase, kinetic typography Industries ticker, Testimonials & Trust showcase, About preview, and closing Contact CTA.
- `/about`: Detailed story of Vasanthaa's journey, 2+ years experience stamp, core philosophy of rhythm in text and vocal sincerity, and domain breadth.
- `/services`: Comprehensive catalog with 10 Content Writing services and 10 Voice Over services with included deliverables and direct inquiry triggers.
- `/work`: Portfolio hub with dynamic category filtering across All, Written, Voice-Over, and On-Camera works.
- `/work/written`: Dedicated archive of written works, reel scripts, and brand narratives.
- `/work/written/[slug]`: Rich case study pages (e.g. `wellness-rituals-campaign`, `fintech-simplified-series`, `sustainable-architecture-narrative`, `culinary-heritage-storytelling`) featuring challenge/goal callouts, script excerpts, and execution highlights.
- `/work/voice-over`: Studio voice-over showcase featuring custom audio players, tone descriptions, and free audition inquiry module.
- `/work/on-camera`: On-camera video showcase featuring presenter walkthroughs, video length indicators, and booking prompts.
- `/contact`: Full-featured commissioning brief form with React Hook Form + Zod, contact email, and working parameters.
- `/api/contact`: Server route handler with Zod validation, rate limiting, honeypot spam protection, and graceful persistence handling.
- `/_not-found`: Editorial 404 page with return-home and explore-work links.
- `/sitemap.xml` & `/robots.txt`: Automated SEO sitemap indexing all static and dynamic case study pages.

#### 3. Audio & Media Engine
- Built custom `<audio>` experience with play/pause toggle, seeking scrub bar, duration formatting, and responsive waveform visualization.
- Implemented global event synchronization (`audio-play-exclusive`) ensuring only one audio track plays at any time.
- Preload set to `"metadata"` for optimal network conservation.
- Synthesized broadcast-quality sample tracks in `public/audio/samples/`.

#### 4. Quality & Build Verification
- Zero TypeScript compiler errors (`tsc --noEmit`).
- Zero ESLint errors or warnings (`npm run lint` passes with 0 problems).
- Zero build errors (`npm run build` generates 18/18 static pages successfully in SSG/Static mode).

---

### Future Works & Maintenance Roadmap

For future feature updates and expansions:

1. **Production Deployment & Environment Keys:**
   - Add production `MONGODB_URI` in Vercel or hosting platform to enable long-term inquiry database archival.
   - Configure Resend API key (`RESEND_API_KEY`) in `.env.local` if automated transactional email receipts are desired on form submission.
   - Point `metadataBase` in `app/layout.tsx` and `app/sitemap.ts` to final custom production domain (currently configured to `https://vasanthaa.com`).

2. **Media Content Updates:**
   - Replace placeholder portrait image `public/images/hero/vasanthaa.svg` with Vasanthaa's official studio photograph (target: WebP format, 100–250 KB).
   - Drop new voice demo tracks into `public/audio/samples/` and update metadata in `data/projects.ts`.
   - Embed real YouTube / Vimeo / Cloudinary video URLs into `app/work/on-camera/page.tsx` when live productions are released.

3. **Content Expansion:**
   - To add a new written case study, append an entry to `projectsData` in `data/projects.ts` with `category: "written"`; Next.js will automatically generate the static page at `/work/written/[slug]`.
   - To add or modify services, edit `servicesData` in `data/services.ts`.
