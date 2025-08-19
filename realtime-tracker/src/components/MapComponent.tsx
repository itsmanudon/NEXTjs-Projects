'use client';

import { useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import { LocationUpdate } from '@/types/socket';

interface MapComponentProps {
  socket: Socket | null;
}

const MapComponent = ({ socket }: MapComponentProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<Record<string, any>>({});
  const [isMapInitialized, setIsMapInitialized] = useState(false);

  useEffect(() => {
    if (!mapRef.current || isMapInitialized) return;

    const initializeMap = async () => {
      try {
        // Dynamically import Leaflet to avoid SSR issues
        const L = await import('leaflet');
        
        // Initialize the map
        const map = L.map(mapRef.current!).setView([0, 0], 2);
        mapInstanceRef.current = map;

        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 18,
        }).addTo(map);

        setIsMapInitialized(true);
        console.log('Map initialized successfully');
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    initializeMap();
  }, [isMapInitialized]);

  useEffect(() => {
    if (!socket || !isMapInitialized) return;

    // Handle location updates from other users
    const handleLocationUpdate = (data: LocationUpdate) => {
      if (!mapInstanceRef.current) return;

      const { id, latitude, longitude } = data;
      const map = mapInstanceRef.current;
      const L = require('leaflet');

      // Update or create marker
      if (markersRef.current[id]) {
        markersRef.current[id].setLatLng([latitude, longitude]);
      } else {
        markersRef.current[id] = L.marker([latitude, longitude])
          .addTo(map)
          .bindPopup(`User ${id.slice(0, 8)}`);
      }

      // Center map on the new location
      map.setView([latitude, longitude], 16);
    };

    // Handle user disconnection
    const handleUserDisconnect = (userId: string) => {
      if (markersRef.current[userId]) {
        mapInstanceRef.current?.removeLayer(markersRef.current[userId]);
        delete markersRef.current[userId];
      }
    };

    socket.on('receive-location', handleLocationUpdate);
    socket.on('user-disconnect', handleUserDisconnect);

    return () => {
      socket.off('receive-location', handleLocationUpdate);
      socket.off('user-disconnect', handleUserDisconnect);
    };
  }, [socket, isMapInitialized]);

  useEffect(() => {
    if (!socket || !isMapInitialized) return;

    // Request location permission and start watching
    if (navigator.geolocation) {
      console.log('Geolocation supported, watching position...');
      
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log('Position received:', latitude, longitude);
          
          // Emit location to server
          socket.emit('send-location', { latitude, longitude });
          
          // Center map on current location
          if (mapInstanceRef.current) {
            mapInstanceRef.current.setView([latitude, longitude], 16);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 5000,
        }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    } else {
      console.log('Geolocation not supported');
    }
  }, [socket, isMapInitialized]);

  return (
    <div className="relative w-full h-full">
      <div 
        ref={mapRef} 
        className="w-full h-full rounded-lg shadow-lg"
        style={{ zIndex: 1 }}
      />
      
      {/* Location permission notice */}
      {!isMapInitialized && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Initializing map...</p>
            <p className="text-sm text-gray-500 mt-2">Please allow location access when prompted</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
