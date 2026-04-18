# JOTEC × Blackmagic Design Showcase — PRD

## Original Problem Statement
Inspired by awsmd.com, build a showcase for Blackmagic Design products: DaVinci Resolve Speed Editor, Replay Editor, Editor Keyboard, Micro Color Panel, Mini Panel. JOTEC branding with signature gradient (#004CB6 → #07A6E6 → #9ED9A4 → #FFC108 → #D92822) on black.

## Architecture
- **Frontend**: React + Tailwind + Shadcn UI + framer-motion (cinematic scroll animations). Sonner for toasts.
- **Backend**: FastAPI with `/api` prefix. Static PRODUCTS list + `/api/inquiries` persisted to MongoDB.
- **Design**: Cabinet Grotesk (display) + Manrope (body), dark theme, gradient used only on accents (text clips, 1px rings, bottom bars, mesh orbs).

## User Personas
- Post production houses & broadcasters evaluating BMD control surfaces
- Freelance colorists / editors looking for pricing / inquiry
- JOTEC sales team receiving leads

## Core Requirements
- Cinematic hero with animated gradient orbs + JOTEC logo
- Product grid (5 cards) + sticky horizontal-scroll storytelling showcase
- Comparison section with tabbed specs
- Working contact/inquiry form (POST → MongoDB)
- Fully responsive, sticky glass navbar, footer

## Implemented (Dec 2025)
- Backend: GET /api/products, GET /api/products/{slug}, POST /api/inquiries, GET /api/inquiries
- Frontend: Navbar, Hero, ProductGrid, ProductShowcase (horizontal scroll), CompareSection, ContactSection, Footer
- All 5 Blackmagic products with real specs (Speed Editor, Replay Editor, Editor Keyboard, Micro Color Panel, Mini Panel)
- Testing: 100% backend pass (14 tests), 100% frontend pass

## Backlog
- P1: Admin dashboard for viewing inquiries
- P1: Video loops / product demo reels per product
- P2: Multi-language (FR/ES)
- P2: Dealer locator map
- P2: Lenis smooth scroll for heavier awsmd feel
