# 🎨 CodeConnect Design System

## Brand Colors (Netlify-Inspired)

### Primary (Teal/Cyan)
```
50:  #f0fdff
100: #ccfbff
200: #99f6ff
300: #5eefff
400: #2de5f4
500: #00c7b7 (Main)
600: #00a89c
700: #008b82
800: #006d68
900: #00504e
```

### Accent (Purple)
```
50:  #faf5ff
100: #f3e8ff
200: #e9d5ff
300: #d8b4fe
400: #c084fc
500: #a855f7 (Main)
600: #9333ea
700: #7e22ce
800: #6b21a8
900: #581c87
```

## Gradients

- **Primary Gradient**: `linear-gradient(135deg, #00c7b7 0%, #a855f7 100%)`
- **Netlify Gradient**: `linear-gradient(135deg, #00c7b7 0%, #9333ea 50%, #a855f7 100%)`
- **Success Gradient**: `linear-gradient(135deg, #00c7b7 0%, #2de5f4 100%)`
- **Warm Gradient**: `linear-gradient(135deg, #c084fc 0%, #a855f7 100%)`

## Shadow Effects

- **Glow**: `0 0 20px rgba(0, 199, 183, 0.4)` - Teal glow
- **Glow Large**: `0 0 30px rgba(168, 85, 247, 0.5)` - Purple glow
- **Glow Teal**: `0 0 25px rgba(0, 199, 183, 0.6)` - Enhanced teal
- **Glow Purple**: `0 0 25px rgba(168, 85, 247, 0.6)` - Enhanced purple

## Logo

The CodeConnect logo features:
- **Icon**: Abstract code/connection symbol in a rounded square
- **Background**: Netlify gradient (teal to purple)
- **Typography**: Bold "CodeConnect" text with gradient overlay
- **Sizes**: sm (24px), md (32px), lg (48px), xl (64px)

### Usage

```jsx
import Logo from '../components/common/Logo';

// With text
<Logo size="md" />

// Icon only
<Logo size="sm" showText={false} />
```

## Design Philosophy

### Inspired by Netlify
- **Modern & Clean**: Minimalist approach with focus on content
- **Vibrant Gradients**: Eye-catching teal-to-purple transitions
- **Smooth Animations**: Subtle hover effects and transitions
- **Glassmorphism**: Frosted glass effects for depth

### Key Principles
1. **Accessibility First**: High contrast ratios, readable fonts
2. **Responsive**: Mobile-first design approach
3. **Dark Mode**: Full dark theme support
4. **Performance**: Optimized animations and effects

## Components Styling

### Buttons
- Primary: Netlify gradient with teal glow
- Secondary: Neutral gray with hover effects
- Outline: Border with gradient on hover

### Cards
- White/dark background with subtle shadows
- Hover: Lift effect with enhanced shadow
- Border: Subtle gray border

### Inputs
- Clean borders with primary color focus ring
- Consistent padding and sizing
- Icon support

### Tags
- Rounded pill shape
- Primary color background
- Small, uppercase text

## Color Usage Guidelines

### When to Use Primary (Teal)
- Call-to-action buttons
- Links
- Active states
- Success messages

### When to Use Accent (Purple)
- Secondary actions
- Highlights
- Hover effects
- Decorative elements

### When to Use Gradients
- Hero sections
- Feature cards
- Primary buttons
- Background effects

## Animation Guidelines

### Subtle Animations
- Fade in: 0.5s ease-in-out
- Slide up: 0.5s ease-out
- Scale: 0.3s ease-out

### Background Animations
- Float: 6s infinite loop
- Smooth, slow movements

### Hover Effects
- Quick response: 200-300ms
- Scale: 1.05-1.1 max
- No jarring movements

## Accessibility

- **Contrast Ratios**: WCAG AA compliant
- **Focus States**: Visible keyboard focus
- **Semantic HTML**: Proper heading hierarchy
- **Screen Reader**: ARIA labels where needed
- **Color Blind**: Not relying on color alone

## Dark Mode

- Background: #0f172a (dark-900)
- Card Background: #1e293b (dark-800)
- Text: #f8fafc (dark-50)
- Borders: #334155 (dark-700)
- Subtle elements: #64748b (dark-500)
