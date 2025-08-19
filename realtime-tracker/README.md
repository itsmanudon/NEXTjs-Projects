# Real-Time Location Tracker (Next.js + Tailwind CSS)

A modern real-time location tracking application built with Next.js, TypeScript, Tailwind CSS, Socket.IO, and Leaflet maps.

## Features

- 🗺️ Interactive maps using Leaflet
- 📍 Real-time location tracking
- 🔄 Live updates via Socket.IO
- 📱 Responsive design with Tailwind CSS
- 🎯 TypeScript for type safety
- 🚀 Next.js 15 with App Router

## Prerequisites

- Node.js 18+ 
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd realtime-tracker-nextjs
```

2. Install dependencies:
```bash
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Building for Production

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## How It Works

1. **Map Initialization**: The app loads a Leaflet map centered at coordinates (0,0)
2. **Location Permission**: Users are prompted to allow location access
3. **Real-time Updates**: Location data is sent to the server via Socket.IO
4. **Live Tracking**: All connected users can see each other's locations in real-time
5. **User Management**: Users are automatically tracked and removed when they disconnect

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── globals.css        # Global styles + Tailwind
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/             # React components
│   └── MapComponent.tsx   # Leaflet map component
├── lib/                    # Utility libraries
│   └── socket.ts          # Socket.IO setup
└── types/                  # TypeScript type definitions
    └── socket.ts          # Socket.IO types
```

## Technologies Used

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Maps**: Leaflet
- **Real-time**: Socket.IO
- **Development**: ESLint, PostCSS

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers with geolocation support

## Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SOCKET_URL=http://localhost:3000
```

## Troubleshooting

- **Map not loading**: Check browser console for errors, ensure location permission is granted
- **Socket connection issues**: Verify the server is running and check network connectivity
- **Build errors**: Ensure all dependencies are installed and Node.js version is compatible

## License

MIT License
