# Image Components Documentation

## ImageSlideshow Component

### Overview
The `ImageSlideshow` component is a React component that creates an automatic image slideshow/carousel. It displays a collection of food images that automatically cycle through every 5 seconds, providing an engaging visual experience for users.

### Location
`app/components/images/image-slideshow.js`

### Dependencies
- React hooks: `useState`, `useEffect`
- Next.js: `next/image` for optimized image rendering
- CSS Modules: `image-slideshow.module.css` for styling

### Features
- **Automatic Rotation**: Images automatically change every 5 seconds
- **Circular Navigation**: When reaching the last image, it loops back to the first
- **Optimized Images**: Uses Next.js Image component for performance optimization
- **Accessibility**: Includes proper alt text for each image
- **Responsive Design**: Adapts to different screen sizes

### Component Structure

#### State Management
```javascript
const [currentImageIndex, setCurrentImageIndex] = useState(0);
```
- Manages the currently displayed image index
- Initializes at 0 (first image)

#### Image Data
The component includes a predefined array of food images:
- Burger
- Curry
- Dumplings
- Mac and Cheese
- Pizza
- Schnitzel
- Tomato Salad

Each image object contains:
- `image`: Imported image asset
- `alt`: Descriptive alt text for accessibility

#### Auto-rotation Logic
```javascript
useEffect(() => {
  const interval = setInterval(() => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    );
  }, 5000);

  return () => clearInterval(interval);
}, []);
```

**How it works:**
1. Sets up a timer that runs every 5000ms (5 seconds)
2. Increments the image index on each interval
3. Resets to 0 when reaching the last image (circular navigation)
4. Cleans up the interval when component unmounts to prevent memory leaks

#### Rendering
```javascript
return (
  <div className={classes.slideshow}>
    {images.map((image, index) => (
      <Image
        key={index}
        src={image.image}
        className={index === currentImageIndex ? classes.active : ''}
        alt={image.alt}
      />
    ))}
  </div>
);
```

**Rendering Logic:**
- Maps through all images in the array
- Renders each image using Next.js Image component
- Applies `active` CSS class only to the currently displayed image
- Uses array index as key (acceptable for static, non-reorderable lists)

### CSS Classes
- `classes.slideshow`: Main container styling
- `classes.active`: Applied to the currently visible image

### Usage
```javascript
import ImageSlideshow from './components/images/image-slideshow';

// In your component/page
<ImageSlideshow />
```

### Performance Considerations
- **Image Optimization**: Next.js Image component automatically optimizes images
- **Memory Management**: Proper cleanup of intervals prevents memory leaks
- **Efficient Rendering**: Only the active image receives the `active` class

### Accessibility Features
- Descriptive alt text for each image
- Semantic HTML structure
- Screen reader friendly

### Browser Compatibility
- Modern browsers with ES6+ support
- React 16.8+ (for hooks support)
- Next.js 10+ (for Image component)

### Customization Options
To modify the slideshow behavior, you can:
- Change the interval timing (currently 5000ms)
- Add navigation controls (previous/next buttons)
- Implement pause/play functionality
- Add transition animations
- Modify the image collection

### Example Customization
```javascript
// Change rotation speed to 3 seconds
const interval = setInterval(() => {
  // ... rotation logic
}, 3000);

// Add pause on hover
const [isPaused, setIsPaused] = useState(false);

useEffect(() => {
  if (isPaused) return;
  
  const interval = setInterval(() => {
    // ... rotation logic
  }, 5000);

  return () => clearInterval(interval);
}, [isPaused]);
```
