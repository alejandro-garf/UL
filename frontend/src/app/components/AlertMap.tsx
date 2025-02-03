// app/components/AlertMap.tsx
"use client";

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

if (!MAPBOX_TOKEN) {
  console.error('Mapbox token missing');
}

mapboxgl.accessToken = MAPBOX_TOKEN || '';

export default function AlertMap({ sightings, center, zoom }: any) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('Map effect running');
    console.log('Token:', MAPBOX_TOKEN);
    console.log('Container:', mapContainer.current);

    if (!mapContainer.current) {
      setError('Map container not found');
      return;
    }

    if (!MAPBOX_TOKEN) {
      setError('Mapbox token missing');
      return;
    }

    try {
      console.log('Creating map...');
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: center || [-98.5795, 39.8283],
        zoom: zoom || 4
      });

      map.current.on('load', () => {
        console.log('Map loaded');
        if (!map.current) return;

        setLoading(false);

        // Add the data source
        map.current.addSource('sightings', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: sightings.map((sight: any) => ({
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [sight.lng, sight.lat]
              },
              properties: {
                intensity: sight.intensity
              }
            }))
          }
        });

        // Add the heatmap layer
        map.current.addLayer({
          id: 'sightings-heat',
          type: 'heatmap',
          source: 'sightings',
          paint: {
            'heatmap-weight': ['get', 'intensity'],
            'heatmap-intensity': [
              'interpolate',
              ['linear'],
              ['zoom'],
              0, 1,
              9, 3
            ],
            'heatmap-color': [
              'interpolate',
              ['linear'],
              ['heatmap-density'],
              0, 'rgba(236,22,22,0)',
              0.2, 'rgba(236,22,22,0.2)',
              0.4, 'rgba(236,22,22,0.4)',
              0.6, 'rgba(236,22,22,0.6)',
              0.8, 'rgba(236,22,22,0.8)',
              1, 'rgba(236,22,22,1)'
            ],
            'heatmap-radius': [
              'interpolate',
              ['linear'],
              ['zoom'],
              0, 2,
              9, 20
            ],
            'heatmap-opacity': 0.8
          }
        });
      });

      map.current.on('error', (e) => {
        console.error('Map error:', e);
        setError('Error loading map');
      });

    } catch (err) {
      console.error('Map creation error:', err);
      setError('Error creating map');
    }

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [center, zoom, sightings]);

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-800 text-white">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      <div 
        ref={mapContainer} 
        className="absolute inset-0 bg-gray-800 rounded-lg"
        style={{ minHeight: '400px' }}  // Add explicit minimum height
      />
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50 backdrop-blur-sm rounded-lg">
          <p className="text-white">Loading map...</p>
        </div>
      )}
    </div>
  );
}