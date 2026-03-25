# Design System Document: Precision Engineering

## 1. Overview & Creative North Star: "The Mechanical Blueprint"
This design system moves away from the generic "app-template" look to embrace a high-end, editorial aesthetic titled **The Mechanical Blueprint**. The goal is to make the user feel like they are interacting with a precision-tuned machine rather than a database. 

We achieve this through **Organic Technicality**: combining the rigid, bold headers of a technical manual with the sophisticated, layered depth of modern luxury automotive interfaces. We break the grid using intentional asymmetry—allowing progress bars to bleed to the edge of containers and using high-contrast typography scales to create a clear, authoritative information hierarchy.

---

## 2. Colors & Surface Philosophy
The palette is rooted in a high-contrast relationship between deep industrial tones and a high-energy "Ignition Orange."

### The Palette
- **Primary (`#a04100` / `#ff6b00`):** Our "Ignition Orange." Reserved strictly for action and critical status.
- **Secondary (`#4c616c`):** "Industrial Steel." Used for secondary information and technical metadata.
- **Surface & Background (`#fcf9f8`):** "Clean Garage." A crisp, high-end off-white that prevents eye fatigue.

### The "No-Line" Rule
**Explicit Instruction:** 1px solid borders for sectioning are strictly prohibited. We define boundaries through background color shifts. 
- A `surface-container-low` (`#f6f3f2`) section should sit directly on a `surface` (`#fcf9f8`) background.
- For nested technical data, move from `surface-container` to `surface-container-high`. The eye should perceive depth through tonal change, not "boxes."

### Signature Textures
Use a subtle linear gradient on main Action Buttons transitioning from `primary` (`#a04100`) to `primary_container` (`#ff6b00`) at a 135-degree angle. This mimics the light reflection on machined metal parts, providing a "premium" tactile feel.

---

## 3. Typography: Technical Authority
We use a tri-font system to balance readability with a mechanical edge.

*   **Display & Headlines (Space Grotesk):** A technical, wide sans-serif. Use `display-lg` (3.5rem) for "hero" stats (like total mileage) to create a bold, editorial impact.
*   **Titles & Body (Manrope):** A modern, highly legible sans-serif. Use `title-lg` for card headings to ensure reliability.
*   **Labels (Inter):** Reserved for micro-copy and data labels (e.g., "Last Service Date"). 

**The Hierarchy Rule:** Always pair a `display-sm` headline in bold with a `label-md` in all-caps to create a "spec sheet" aesthetic.

---

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are too "software-standard." We use **Ambient Depth**.

*   **The Layering Principle:** Stack `surface-container-lowest` cards on top of `surface-container-low` backgrounds. This creates a soft, natural lift.
*   **The "Ghost Border" Fallback:** If a container requires more definition (e.g., a dark mode toggle), use `outline-variant` at **15% opacity**. Never 100%.
*   **Glassmorphism:** For floating navigation or "Quick Action" overlays, use the `surface` color at 80% opacity with a `20px` backdrop-blur. This keeps the rider’s bike imagery visible beneath the UI, making the app feel integrated.

---

## 5. Components

### Buttons: The Ignition Points
*   **Primary:** `primary` gradient fill, `on_primary` text, `xl` (0.75rem) roundedness. 
*   **Secondary:** `secondary_container` fill, `on_secondary_container` text. No border.
*   **Tertiary:** Text-only using `primary` color, bold weight, with a `label-md` style.

### Progress Bars: Maintenance Health
*   **Track:** `surface-container-highest`.
*   **Indicator:** Use `primary` for healthy status. Transition to `error` (`#ba1a1a`) if maintenance is overdue.
*   **Design Note:** Forbid rounded ends on progress bars. Use `none` (0px) or `sm` (0.125rem) roundedness to maintain a "gauges and instruments" look.

### Cards & Lists: The Service Log
*   **Structure:** Forbid divider lines. Separate service history items using `spacing-4` (1rem) vertical gaps and a subtle shift to `surface-container-low`.
*   **Visual Soul:** Align service dates to the far right using `label-md` in `secondary` color to create a clean, vertical scanning axis.

### Input Fields: The Data Entry
*   **Style:** Use "Underline Only" inputs for a minimalist, technical feel. Use `outline` color for the underline, thickening to 2px `primary` on focus.

### Additional Component: "The Health Ring"
A specialized circular progress component for the dashboard. Use a thick `primary` stroke on a `surface-container-highest` track to visualize overall bike "readiness."

---

## 6. Do’s and Don'ts

### Do:
*   **Do** use extreme typographic scale. A massive "90%" next to a tiny "Chains & Sprockets" label.
*   **Do** use `spacing-8` (2rem) and `spacing-12` (3rem) for generous white space between major sections.
*   **Do** use `xl` (0.75rem) roundedness for large containers to soften the "industrial" feel, making it feel modern.

### Don’t:
*   **Don’t** use pure black (#000000). Always use `on_surface` (`#1b1c1c`) for text to maintain a premium charcoal feel.
*   **Don’t** use standard "drop shadows." If an element must float, use a tinted shadow: `shadow-color: rgba(76, 97, 108, 0.08)`.
*   **Don’t** use icons as the primary way to communicate. Pair every icon with a `label-sm` to ensure the "Technical" brand pillar is upheld.