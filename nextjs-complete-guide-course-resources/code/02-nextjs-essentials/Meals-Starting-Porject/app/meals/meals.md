# Meals Pages Documentation

## Overview
The meals section of the Next Level Food application provides a comprehensive system for browsing, viewing, and sharing meal information. It implements Next.js 13+ app directory routing with dynamic routes, layouts, and page components.

## File Structure
```
app/meals/
├── layout.js              # Meals layout wrapper
├── page.js                # Main meals listing page
├── share/
│   └── page.js           # Share meal form page
├── [slug]/
│   └── page.js           # Dynamic meal details page
└── meals.md               # This documentation file
```

## Components and Pages

### MealsLayout Component

#### Location
`app/meals/layout.js`

#### Purpose
The meals layout component provides a consistent wrapper around all meals-related pages. It adds common styling and content that appears on every page within the meals section.

#### Component Structure
```javascript
export default function MealsLayout({ children }) {
  return (
    <main>
      <h1 style={{ color: 'white', textAlign: 'center' }}>Meals</h1>
      <p style={{ textAlign: 'center' }}>
        This is the Meals Layout. It wraps around all meals pages.
      </p>
      {children}
    </main>
  );
}
```

#### Features
- **Consistent Styling**: White text with center alignment for headers
- **Layout Wrapper**: Wraps all child pages with common content
- **Contextual Information**: Provides section context for users
- **Children Rendering**: Renders nested page content via `{children}`

#### Usage
This layout automatically applies to all pages within the `/meals` route:
- `/meals` → Main meals page
- `/meals/share` → Share meal page
- `/meals/[any-slug]` → Individual meal details

### MealsPage Component

#### Location
`app/meals/page.js`

#### Purpose
The main meals page serves as the entry point for the meals section, providing users with an overview and introduction to the meals functionality.

#### Component Structure
```javascript
import Link from 'next/link';

export default function MealsPage() {
    return (
        <main>
            <h1>Meals</h1>
            <p>Here you can find a list of delicious meals!</p>
        </main>
    );
}
```

#### Features
- **Welcome Message**: Introduces users to the meals section
- **Descriptive Content**: Explains what users can expect
- **Semantic HTML**: Uses proper `<main>` and heading elements
- **Simple Structure**: Clean, focused content presentation

#### Route
- **URL**: `/meals`
- **Access**: Via navigation menu "Browse Meals" link

### ShareMealPage Component

#### Location
`app/meals/share/page.js`

#### Purpose
The share meal page allows users to contribute their own meal recipes and information to the community. This is a form-based page for meal submission.

#### Component Structure
```javascript
export default function ShareMealPage() {
    return (
        <main>
            <h1>Share Meal</h1>
        </main>
    );
}
```

#### Features
- **Form Interface**: Placeholder for meal sharing functionality
- **User Contribution**: Enables community participation
- **Simple Structure**: Ready for form implementation

#### Route
- **URL**: `/meals/share`
- **Access**: Typically via navigation or call-to-action buttons

### MealDetailsPage Component

#### Location
`app/meals/[slug]/page.js`

#### Purpose
The meal details page displays comprehensive information about a specific meal based on the dynamic slug parameter. This implements Next.js dynamic routing for individual meal views.

#### Component Structure
```javascript
export default function MealDetailsPage() {
    return (
        <main>
            <h1>Meal Details</h1>
        </main>
    );
}
```

#### Features
- **Dynamic Routing**: Uses `[slug]` parameter for meal identification
- **Individual Meal View**: Displays specific meal information
- **SEO Friendly**: Each meal gets a unique URL
- **Scalable**: Supports unlimited meal entries

#### Route Pattern
- **URL Pattern**: `/meals/[slug]`
- **Examples**:
  - `/meals/burger` → Burger meal details
  - `/meals/pizza` → Pizza meal details
  - `/meals/curry` → Curry meal details

## Routing Architecture

### Next.js App Directory Structure
The meals section follows Next.js 13+ app directory conventions:

```
app/
├── meals/                 # Route group
│   ├── layout.js         # Shared layout for all meals routes
│   ├── page.js           # /meals route (index page)
│   ├── share/
│   │   └── page.js       # /meals/share route
│   └── [slug]/
│       └── page.js       # /meals/[slug] route (dynamic)
```

### Route Hierarchy
1. **Root Layout** (`app/layout.js`) - Application-wide layout
2. **Meals Layout** (`app/meals/layout.js`) - Meals section wrapper
3. **Individual Pages** - Specific route content

### Dynamic Route Parameters
The `[slug]` folder implements dynamic routing:
- **Parameter Access**: `params.slug` in page components
- **SEO Benefits**: Each meal gets a unique, shareable URL
- **Scalability**: Supports unlimited meal entries without code changes

## Implementation Patterns

### Layout Composition
```javascript
// app/layout.js (Root)
export default function RootLayout({ children }) {
    return (
        <html>
            <body>
                <MainHeader />
                {children}  // Renders meals layout
            </body>
        </html>
    );
}

// app/meals/layout.js (Meals)
export default function MealsLayout({ children }) {
    return (
        <main>
            <h1>Meals Section</h1>
            {children}  // Renders individual meal pages
        </main>
    );
}
```

### Dynamic Page Implementation
```javascript
// app/meals/[slug]/page.js
export default function MealDetailsPage({ params }) {
    const { slug } = params;
    
    return (
        <main>
            <h1>Meal Details: {slug}</h1>
            {/* Meal-specific content */}
        </main>
    );
}
```

## Customization Options

### Adding New Meal Routes
To add new meal-related functionality:

1. **Create new folder**: `app/meals/new-feature/`
2. **Add page.js**: Implements the new route
3. **Update navigation**: Add links in header or breadcrumbs

### Modifying Layout Content
```javascript
// app/meals/layout.js
export default function MealsLayout({ children }) {
    return (
        <main>
            <h1 style={{ color: 'white', textAlign: 'center' }}>Meals</h1>
            <p style={{ textAlign: 'center' }}>
                Discover, share, and explore delicious meals from around the world.
            </p>
            <nav>
                <Link href="/meals">Browse All</Link>
                <Link href="/meals/share">Share Your Recipe</Link>
            </nav>
            {children}
        </main>
    );
}
```

### Enhancing Dynamic Pages
```javascript
// app/meals/[slug]/page.js
export default async function MealDetailsPage({ params }) {
    const { slug } = params;
    
    // Fetch meal data based on slug
    const meal = await fetchMealBySlug(slug);
    
    if (!meal) {
        notFound(); // Next.js 13+ notFound function
    }
    
    return (
        <main>
            <h1>{meal.title}</h1>
            <p>{meal.description}</p>
            <Image src={meal.image} alt={meal.title} />
            {/* Additional meal details */}
        </main>
    );
}
```

## Performance Considerations

### Layout Optimization
- **Shared Layout**: Common content rendered once, reused across routes
- **Code Splitting**: Each page automatically code-split by Next.js
- **Static Generation**: Pages can be statically generated for better performance

### Dynamic Route Performance
- **Lazy Loading**: Dynamic routes loaded on-demand
- **Caching**: Next.js automatically caches route segments
- **Prefetching**: Link components can prefetch routes

## Accessibility Features

### Semantic Structure
- **Proper Headings**: Hierarchical heading structure
- **Main Content**: Uses `<main>` element for primary content
- **Navigation**: Clear navigation patterns

### Screen Reader Support
- **Descriptive Content**: Clear, informative text content
- **Logical Flow**: Consistent layout structure
- **Context Information**: Section headers provide context

## Future Enhancements

### Planned Features
- **Meal Database Integration**: Connect to backend data source
- **Search and Filtering**: Advanced meal discovery
- **User Authentication**: Personalized meal sharing
- **Image Upload**: Support for meal photos
- **Rating System**: Community meal ratings

### Technical Improvements
- **TypeScript Migration**: Add type safety
- **State Management**: Implement global state for meals
- **API Integration**: Connect to external meal APIs
- **Performance Monitoring**: Add analytics and performance tracking

## Integration Examples

### Adding to Navigation
```javascript
// In main header navigation
<Link href="/meals">Browse Meals</Link>
<Link href="/meals/share">Share Recipe</Link>
```

### Breadcrumb Navigation
```javascript
// Add breadcrumbs to meals layout
<nav aria-label="Breadcrumb">
    <ol>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/meals">Meals</Link></li>
        {currentMeal && <li>{currentMeal.title}</li>}
    </ol>
</nav>
```

### SEO Optimization
```javascript
// Add metadata to meal pages
export const metadata = {
    title: 'Meals - Next Level Food',
    description: 'Discover delicious meals and share your own recipes',
};
```
