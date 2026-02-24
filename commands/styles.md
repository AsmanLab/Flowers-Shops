# Styles Guide — GulBerry

Living design system reference. Always loaded in AI context via `GEMINI.md`.

---

## Brand Identity

| Token | Value | Use |
|---|---|---|
| Dark | `rgba(19, 17, 24, 1)` — `#131118` | Primary text, headings (Dark Theme) |
| Purple Accent | `rgba(124, 105, 239, 1)` — `#7C69EF` | Primary CTAs, brand highlights |
| Lavender | `rgba(175, 154, 251, 1)` — `#AF9AFB` | Secondary accents, soft backgrounds |
| Rose (Destructive) | `rgba(244, 63, 94, 1)` — `#F43F5E` | Delete actions, removal, alerts |
| Success Green | `rgba(16, 185, 129, 1)` — `#10B981` | "In Cart", success states, checkout |
| Gray | `rgba(164, 161, 170, 1)` — `#A4A1AA` | Secondary text, muted labels |
| White | `rgba(255, 255, 255, 1)` | Backgrounds, surface containers |

---

## CSS Design Tokens

### Colors
```scss
// Accent (Purple)
--color-accent           // rgba(124, 105, 239, 1)
--color-accent-dim       // 15% opacity — hover fills
--color-accent-glow      // 35% opacity — purple glow shadows

// Status
--color-success          // #10B981 (Green)
--color-error            // #F43F5E (Rose)

// Glass
--color-glass-light      // rgba(255,255,255,0.85) — white glass
--color-glass-dark       // rgba(19,17,24,0.85) — dark glass

// Gradients
--gradient-primary       // dark #131118 → #1e1c26
--gradient-accent        // purple #7C69EF → #6366F1
--gradient-destructive   // rose #F8719D → #F43F5E
--gradient-surface       // faint lavender → white
```

### Shadows
```scss
--shadow-sm              // subtle — inputs
--shadow-md              // medium — cards
--shadow-lg              // large — modals
--shadow-card            // cards at rest (subtle shadow)
--shadow-accent-glow     // purple outer glow for primary buttons
--shadow-error-glow      // rose outer glow for destructive buttons
```

---

## Typography

### Fonts
- **Display / Brand**: `Playfair Display` or `Jost` — script-like elegance for "GulBerry"
- **UI / Body**: `Inter` — clarity for labels and product descriptions

```scss
--font-display: 'Playfair Display', serif;
--font-ui:      'Inter', sans-serif;
```

---

## Components

### Button

| Variant | Background | Text | Hover |
|---|---|---|---|
| `primary` | Purple gradient | White | Brighter purple + lift |
| `secondary` | Transparent | Purple | Purple tint fill + border |
| `destructive` | Rose gradient | White | Deep rose + glow shadow |
| `success` | Green gradient | White | Emerald lift |

**Rules:**
- All buttons: `border-radius: var(--radius-md)` (12px)
- Transitions: spring for transforms, base for color changes

### Card

- `border-radius: var(--radius-lg)` (16px)
- Box shadow: `var(--shadow-card)` (clean white edge)
- Image: High-quality floral presentation with zoom on hover

### Header

- **Center Logo**: "GulBerry" in script typography
- **Search Bar**: Pill-shaped, light lavender tint, "Search bouquet, gift..."
- **Icons**: Minimalist line art (Menu, Cart, Profile)

---

## Do's and Don'ts

**Do:**
- Use the Purple gradient for primary "Order Bouquet" actions
- Maintain clean white surfaces for product listings to let colors pop
- Use Rose for "Удалить" (Delete) actions as seen in screenshots
- Use Emerald Green for "В корзину" (To Cart) to signal positive action

**Don't:**
- Use heavy dark backgrounds for product cards — keep them light/airy
- Overuse the accent color; balance with ample white space
