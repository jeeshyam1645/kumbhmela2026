# Design Guidelines: Kumbh Mela Camp Booking Portal

## Design Approach

**Reference-Based Strategy**: Drawing inspiration from Airbnb's trust-building approach and Booking.com's clarity, adapted for Indian spiritual tourism context. This is a hospitality portal requiring visual richness to showcase camp luxury while maintaining cultural reverence for the spiritual pilgrimage.

## Typography System

**Primary Font**: Poppins (Google Fonts) - Clean, modern, excellent Hindi/Devanagari support
**Secondary Font**: Lora (Google Fonts) - For spiritual/cultural content sections

**Hierarchy**:
- Hero Headlines: text-5xl/text-6xl, font-bold
- Section Headers: text-3xl/text-4xl, font-semibold  
- Subheadings: text-xl/text-2xl, font-medium
- Body Text: text-base, font-normal, leading-relaxed
- CTAs: text-lg, font-semibold, uppercase tracking-wide
- Hindi Text: Same sizes, slightly increased line-height (leading-loose)

## Layout System

**Spacing Units**: Use Tailwind units of 4, 6, 8, 12, 16, 20 for consistency
- Container padding: px-4 md:px-8 lg:px-16
- Section spacing: py-16 md:py-20 lg:py-24
- Component gaps: gap-6 md:gap-8 lg:gap-12
- Card padding: p-6 md:p-8

**Grid System**: 
- Accommodation cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Service listings: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Trust indicators: grid-cols-2 md:grid-cols-4
- Max content width: max-w-7xl mx-auto

## Component Library

### Navigation
**Sticky Header**: Transparent on hero, solid on scroll with subtle shadow
- Logo: h-12 md:h-16
- Nav links: Horizontal desktop, hamburger mobile with full-screen overlay
- Language toggle: Prominent pill-style switch (EN | हिं)
- CTA button: Floating bottom-right on mobile (fixed z-50), inline desktop

### Hero Section
**Large, Immersive Hero**: Full viewport height (h-screen) with image slider
- Overlay gradient for text readability
- Centered content: Headline + subtext + primary CTA
- Trust badges row below fold with icons
- Animated scrolling ticker for "Next Bathing Date" below hero

### Cards (Accommodation & Services)
**Rich Information Cards**:
- Image gallery (3-4 images) with dots navigation
- Badge overlays for features ("Attached Toilet", "Geyser")
- Specification list with icon bullets
- Pricing placeholder ("Call for Rates")
- Prominent CTA button at bottom
- Hover: Subtle lift (shadow-lg) and scale (scale-105)

### Forms (Multi-purpose Enquiry)
**Structured, Validated Form**:
- Full-width on mobile, max-w-2xl centered on desktop
- Two-column layout for desktop (name/mobile, dates, etc.)
- Country code selector with flag icons for mobile field
- Date picker with calendar popup
- Required field indicators (*)
- Checkbox for Terms agreement with linked policy text
- Large submit button (w-full py-4)
- Success: Redirect to Thank You page with video embed

### Puja Services Section
**Service Catalog Grid**:
- Card design with spiritual icon/image
- Hindi + English names (stacked, different font weights)
- Brief description (2-3 lines)
- "Starting from" price indicator
- "Enquire Now" button auto-fills form with service name

### Kumbh Guide
**Information-Rich Layout**:
- Timeline visualization for bathing dates
- Icon-driven content blocks for significance
- Table view for event calendar (responsive, scrollable mobile)
- Rich images of past Kumbh gatherings

### Footer
**Comprehensive Footer**:
- Four columns on desktop: About, Quick Links, Services, Contact
- Legal links row (Terms, Privacy, Cancellation Policy)
- Social media icons
- WhatsApp + Phone with country code
- Newsletter signup (simple email field)

### Floating Elements
**WhatsApp Chat Button**: 
- Fixed bottom-right (bottom-6 right-6)
- Large circular button (w-16 h-16) with WhatsApp icon
- Pulse animation to draw attention
- Visible across all pages except Thank You

### Camp Layout Map
**Visual Representation**:
- Illustrated 2D vector-style map showing tents, dining, river
- Interactive hover states for tent types
- Prominent disclaimer banner above/below map
- Legend for symbols used

## Images

**Hero Section**: Large, high-quality image slider (3-5 images)
- Images: Sangam at sunrise, luxury camp tents at dusk, pilgrims bathing, decorated camp interior, aerial view of camp layout
- Overlay: Dark gradient (opacity-60) for text readability
- CTA buttons with backdrop-blur-md background

**Accommodation Cards**: 
- Interior shots of each tent type (bed setup, bathroom, sitting area)
- Exterior camp views showing tent facades
- Detail shots (amenities, furnishings)

**Puja Services**: 
- Traditional ritual images or illustrations for each service type
- Priest performing ceremonies, decorated puja setups

**Kumbh Guide**: 
- Historical photos of Kumbh Mela
- Bathing ghats, processions, spiritual gatherings

**Trust Indicators Section**: 
- Use icons (from Heroicons) instead of photos for: toilet, food, security, location

## Interactions

**Minimal, Purpose-Driven**:
- Smooth scroll behavior for anchor links
- Form field focus states (border highlight)
- Button hover: Slight scale + shadow increase
- Card hover: Gentle lift effect
- Image gallery: Fade transitions between slides
- Navigation: Slide-in mobile menu
- NO complex scroll animations or parallax effects

## Mobile Optimization

- Touch-friendly button sizes (min h-12)
- Simplified navigation (hamburger menu)
- Stacked layouts (single column)
- Larger text for readability (bump up 1 size class)
- Fixed CTA button for "Check Availability"
- Swipeable image galleries
- Tap to expand service descriptions

## Trust & Credibility Elements

- Professional photography throughout
- Consistent branding (logo placement)
- Clear contact information (phone, WhatsApp) prominently displayed
- Terms checkbox requirement before submission
- Transparent pricing approach ("Call for customized rates")
- Customer testimonials (if available) with photos
- Certifications/awards badges in footer
- Camp layout disclaimer clearly visible

**Design Principle**: Balance spiritual reverence with modern hospitality standards - create a premium, trustworthy experience that respects the cultural significance while showcasing Comfort-First Pilgrimages.