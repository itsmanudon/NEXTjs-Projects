# Main Header Components Documentation

## Overview
The main header components provide the primary navigation and branding for the Next Level Food application. They consist of a main header component and a background component that work together to create an attractive, functional navigation bar.

## Components

### MainHeader Component

#### Location
`app/components/main-header/main-header.js`

#### Purpose
The main header component serves as the primary navigation component, displaying the application logo, brand name, and navigation menu. It provides users with easy access to key sections of the application.

#### Dependencies
- Next.js: `next/link` for client-side navigation
- Next.js: `next/image` for optimized logo rendering
- CSS Modules: `main-header.module.css` for styling
- Custom component: `MainHeaderBackground` for decorative background

#### Features
- **Brand Identity**: Displays logo and application name "Next Level Food"
- **Navigation Menu**: Provides links to main application sections
- **Responsive Design**: Adapts to different screen sizes
- **Optimized Images**: Uses Next.js Image component for logo
- **Accessibility**: Proper semantic HTML structure

#### Component Structure

```javascript
export default function MainHeader() {
    return (
        <>
            <MainHeaderBackground />
            <header className={classes.header}>
                <Link className={classes.logo} href="/">
                    <Image src={logoImg} alt="A plate with food on it" priority/>
                    Next Level Food
                </Link>
                <nav className={classes.nav}>
                    <ul>
                        <li>
                            <Link href="/meals">Browse Meals</Link>
                        </li>
                        <li>
                            <Link href="/community">Foodies Community</Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    );
}
```

#### Navigation Links
- **Home** (`/`): Application homepage
- **Browse Meals** (`/meals`): View available meals
- **Foodies Community** (`/community`): Community features

#### Logo Implementation
```javascript
<Link className={classes.logo} href="/">
    <Image src={logoImg} alt="A plate with food on it" priority/>
    Next Level Food
</Link>
```

**Features:**
- Logo image with descriptive alt text
- `priority` prop for faster loading of above-the-fold content
- Clickable logo that navigates to homepage
- Combined logo and text for better brand recognition

#### CSS Classes
- `classes.header`: Main header container styling
- `classes.logo`: Logo and brand name styling
- `classes.nav`: Navigation menu styling

### MainHeaderBackground Component

#### Location
`app/components/main-header/main-header-background.js`

#### Purpose
The background component provides a decorative SVG wave background that enhances the visual appeal of the header. It creates a modern, organic design element using CSS gradients and SVG paths.

#### Dependencies
- CSS Modules: `main-header-background.module.css` for styling

#### Features
- **SVG Wave Design**: Creates an organic, flowing wave pattern
- **CSS Gradients**: Uses linear gradients for color transitions
- **Responsive**: Scales appropriately across different screen sizes
- **Performance**: Lightweight SVG implementation

#### Component Structure

```javascript
export default function MainHeaderBackground() {
    return (
        <div className={classes["header-background"]}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop
                  offset="0%"
                  style={{ stopColor: '#59453c', stopOpacity: '1' }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: '#8f3a09', stopOpacity: '1' }}
                />
              </linearGradient>
            </defs>
            <path
              fill="url(#gradient)"
              d="M0,256L48,240C96,224,192,192,288,181.3C384,171,480,181,576,186.7C672,192,768,192,864,181.3C960,171,1056,149,1152,133.3C1248,117,1344,107,1392,101.3L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            ></path>
          </svg>
        </div>
    );
}
```

#### SVG Design Elements
- **ViewBox**: `0 0 1440 320` for responsive scaling
- **Linear Gradient**: Transitions from dark brown (`#59453c`) to orange (`#8f3a09`)
- **Wave Path**: Complex Bezier curve creating organic wave effect
- **Responsive**: Scales proportionally across different screen sizes

#### CSS Classes
- `classes["header-background"]`: Background container styling

## Usage

### Basic Implementation
```javascript
import MainHeader from './components/main-header/main-header';

// In your layout or page
<MainHeader />
```

### Customization Options
To modify the header behavior, you can:

#### Add New Navigation Items
```javascript
<nav className={classes.nav}>
    <ul>
        <li>
            <Link href="/meals">Browse Meals</Link>
        </li>
        <li>
            <Link href="/community">Foodies Community</Link>
        </li>
        <li>
            <Link href="/about">About Us</Link>
        </li>
    </ul>
</nav>
```

#### Modify Background Colors
```javascript
<linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop
        offset="0%"
        style={{ stopColor: '#your-color-1', stopOpacity: '1' }}
    />
    <stop
        offset="100%"
        style={{ stopColor: '#your-color-2', stopOpacity: '1' }}
    />
</linearGradient>
```

#### Add Conditional Navigation
```javascript
{isAuthenticated && (
    <li>
        <Link href="/profile">My Profile</Link>
    </li>
)}
```

## Performance Considerations
- **Image Optimization**: Logo uses Next.js Image component with priority loading
- **SVG Performance**: Lightweight SVG background with minimal DOM impact
- **CSS Modules**: Scoped styling prevents CSS conflicts
- **Client-side Navigation**: Next.js Link component for fast page transitions

## Accessibility Features
- **Semantic HTML**: Proper use of `<header>`, `<nav>`, and `<ul>` elements
- **Alt Text**: Descriptive alt text for logo image
- **Navigation Structure**: Logical navigation hierarchy
- **Screen Reader Friendly**: Clear navigation labels and structure

## Browser Compatibility
- Modern browsers with SVG support
- Next.js 13+ (for app directory support)
- React 18+ (for latest features)

## Styling Guidelines
- Use CSS Modules for component-specific styles
- Maintain consistent spacing and typography
- Ensure sufficient color contrast for accessibility
- Test responsive behavior across different screen sizes

## Integration with Layout
The main header is typically included in the root layout to appear on all pages:

```javascript
// app/layout.js
import MainHeader from './components/main-header/main-header';

export default function RootLayout({ children }) {
    return (
        <html>
            <body>
                <MainHeader />
                {children}
            </body>
        </html>
    );
}
```
