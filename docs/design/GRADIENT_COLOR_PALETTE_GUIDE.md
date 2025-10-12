# Gradient Color Palette Implementation Guide

## Overview

Your NBM Frontend website now supports **two beautiful gradient color palettes** that can be switched dynamically. The gradients are applied throughout the entire site for a modern, premium look!

## Color Palettes

### 🌿 Palette 1: Green Theme (Default)

- **Dark Gray**: `#4d4d4d` - Used for text and neutral elements
- **Green**: `#348856` - Primary brand color
- **White**: `#ffffff` - Background base
- **Dark Green**: `#00491d` - Deep accent and dark mode base
- **Off White**: `#f1faee` - Soft background alternative

**Gradients:**

- Brand: `linear-gradient(135deg, #00491d 0%, #348856 50%, #4d4d4d 100%)`
- Hero: `linear-gradient(120deg, #00491d 0%, #348856 40%, #4d4d4d 100%)`
- Card: Soft green overlay for cards
- Glow: Radial gradient for ambient lighting effects

### 🌊 Palette 2: Teal/Cyan Theme

- **Light Cyan**: `#7ce6e3` - Bright accent
- **Teal**: `#68a0a1` - Primary brand color
- **Powder Blue**: `#a8dadc` - Soft backgrounds
- **Dark Teal**: `#336366` - Text and elements
- **Very Dark Teal**: `#09282d` - Deep backgrounds
- **Red Accent**: `#e63946` - Call-to-action highlights

**Gradients:**

- Brand: `linear-gradient(135deg, #09282d 0%, #336366 30%, #68a0a1 60%, #7ce6e3 100%)`
- Ocean: Beautiful multi-stop gradient from dark to light teal
- Accent Red: Gradient combining red with teal for CTAs

## How to Switch Palettes

### 🎨 Using the Color Palette Toggle

A **compact, elegant toggle** is integrated into the **navigation header** (top-right corner):

- Two small colored circles represent each palette
- The active palette has a ring indicator around its circle
- Click any circle to instantly switch palettes
- Shows palette name on desktop ("Green" or "Teal")
- Mobile-friendly: circles only, no text
- Your selection is **automatically saved** in localStorage

### 💻 Programmatically Switch Palettes

```javascript
// Switch to Palette 2
document.documentElement.classList.add('theme-palette-2');
localStorage.setItem('colorPalette', 'palette2');

// Switch back to Palette 1
document.documentElement.classList.remove('theme-palette-2');
localStorage.setItem('colorPalette', 'palette1');
```

## CSS Variables & Utility Classes

### Using CSS Variables

```css
/* These variables automatically change based on active palette */
var(--color-brand)          /* Main brand color */
var(--color-brand-dark)     /* Darker shade */
var(--color-brand-light)    /* Lighter shade */
var(--color-accent)         /* Accent color */
var(--gradient-brand)       /* Main brand gradient */
var(--gradient-hero)        /* Hero section gradient */
var(--gradient-card)        /* Card overlay gradient */
var(--gradient-glow)        /* Glow effect gradient */
```

### Tailwind Utility Classes

#### Background Gradients

```html
<div class="bg-gradient-brand">      <!-- Main brand gradient -->
<div class="bg-gradient-hero">       <!-- Hero gradient -->
<div class="bg-gradient-card">       <!-- Card gradient -->
<div class="bg-gradient-soft">       <!-- Soft gradient overlay -->
<div class="bg-gradient-glow">       <!-- Glow effect -->
```

#### Text Gradients

```html
<h1 class="text-gradient-brand">     <!-- Gradient text effect -->
<span class="text-gradient-accent">  <!-- Accent gradient text -->
```

#### Palette-Specific Colors

```html
<!-- Palette 1 Colors -->
<div class="bg-palette1-green">
<div class="text-palette1-dark-green">

<!-- Palette 2 Colors -->
<div class="bg-palette2-light-cyan">
<div class="text-palette2-red-accent">
```

## Components Updated with Gradients

### ✅ Components with Gradient Effects

1. **Hero** - Background gradients, text gradients, glow effects
2. **Services** - Card hover gradients, glow on hover
3. **Process** - Step cards with gradient overlays
4. **Testimonials** - Subtle background gradient, card hover effects
5. **Call to Action** - Full gradient background with animated glows
6. **PortfolioHero** - Gradient overlay with 3D floating elements
7. **Button** - All button variants now use gradients

### Gradient Features Applied

- ✨ **Background Gradients**: Soft overlays throughout sections
- 🎨 **Text Gradients**: Headings with gradient text effects
- 💫 **Hover Effects**: Cards that glow and scale on hover
- 🌟 **Glow Effects**: Radial gradients for ambient lighting
- 🎭 **Animated Glows**: Pulsing effects on CTA sections
- 🎯 **Border Gradients**: Subtle gradient borders on hover

## Dark Mode Support

Both palettes **fully support dark mode**:

- Automatic adjustment of gradient opacity
- Optimized text contrast
- Enhanced glow effects in dark mode
- Smooth transitions between light/dark modes

## Browser Compatibility

All gradient implementations use:

- Standard CSS gradients (supported in all modern browsers)
- CSS custom properties (CSS variables)
- Tailwind utility classes
- Progressive enhancement

## Tips for Best Results

### For Text Readability

- Gradient overlays are carefully tuned for text contrast
- Dark backgrounds automatically increase overlay opacity
- Text gradients use appropriate color combinations

### For Performance

- Gradients are CSS-based (GPU accelerated)
- No image files required
- Minimal performance impact
- Smooth animations at 60fps

### For Consistency

- Use CSS variables instead of hardcoded colors
- Leverage existing utility classes
- Follow the established gradient patterns
- Test in both light and dark modes

## Example Implementation

### Creating a New Gradient Card

```tsx
<div className="group relative p-6 rounded-xl border border-[var(--color-border)] 
                bg-[var(--color-surface)] hover:scale-105 hover:border-[var(--color-brand)] 
                transition-all duration-300">
  {/* Gradient overlay on hover */}
  <div className="absolute inset-0 bg-gradient-card opacity-0 
                  group-hover:opacity-100 transition-opacity duration-300" 
       aria-hidden />
  
  {/* Glow effect */}
  <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-glow 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
       aria-hidden />
  
  {/* Your content here */}
  <div className="relative z-10">
    <h3 className="text-lg font-medium group-hover:text-[var(--color-brand)] 
                   transition-colors">
      Card Title
    </h3>
  </div>
</div>
```

## Files Modified

### Core Configuration

- ✅ `src/app/globals.css` - Color variables and gradient definitions
- ✅ `tailwind.config.js` - Tailwind utilities and color extensions

### New Components

- ✅ `src/components/ui/ColorPaletteToggleCompact.tsx` - Compact palette switcher for navbar

### Updated Components

- ✅ `src/components/hero/Hero.tsx`
- ✅ `src/components/sections/Services.tsx`
- ✅ `src/components/sections/Process.tsx`
- ✅ `src/components/sections/CallToAction.tsx`
- ✅ `src/components/sections/Testimonials.tsx`
- ✅ `src/components/portfolio/PortfolioHero.tsx`
- ✅ `src/components/ui/Button.tsx`
- ✅ `src/components/layout/SiteHeader.tsx` - Integrated color palette toggle
- ✅ `src/app/page.tsx` - Removed old large toggle component

## Next Steps

To extend the gradient system:

1. Add more gradient variations in `globals.css`
2. Create custom Tailwind utilities in `tailwind.config.js`
3. Apply gradients to additional components
4. Experiment with animation timing and effects
5. Consider adding more palette options (Palette 3, 4, etc.)

---

**Enjoy your beautiful new gradient color palettes! 🎨✨**

For questions or customizations, refer to this guide or check the CSS variables in `globals.css`.
