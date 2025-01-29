// app/components/legal/AlertMap.tsx
"use client";

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Check for Mapbox token
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

if (!MAPBOX_TOKEN) {
  console.error('Mapbox token is missing. Please add NEXT_PUBLIC_MAPBOX_TOKEN to your .env.local file');
}

mapboxgl.accessToken = MAPBOX_TOKEN || '';

interface Sighting {
  lat: number;
  lng: number;
  intensity: number;
  timestamp: string;
  type: string;
  description?: string;
}

interface AlertMapProps {
  sightings: Sighting[];
  center?: [number, number];
  zoom?: number;
  onMarkerClick?: (sighting: Sighting) => void;
}

export default function AlertMap({ 
  sightings, 
  center = [-98.5795, 39.8283], // US center
  zoom = 4,
  onMarkerClick 
}: AlertMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || !MAPBOX_TOKEN) return;

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11', // Dark theme
        center: center,
        zoom: zoom,
        minZoom: 2,
        maxZoom: 15
      });

      map.current.on('load', () => {
        if (!map.current) return;
        
        // Add navigation control
        map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

        // Add heatmap layer
        map.current.addSource('sightings', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: sightings.map(sight => ({
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [sight.lng, sight.lat]
              },
              properties: {
                intensity: sight.intensity,
                timestamp: sight.timestamp,
                type: sight.type,
                description: sight.description
              }
            }))
          }
        });

        // Add heatmap layer
        map.current.addLayer({
          id: 'sightings-heat',
          type: 'heatmap',
          source: 'sightings',
          paint: {
            // Increase weight based on intensity
            'heatmap-weight': [
              'interpolate',
              ['linear'],
              ['get', 'intensity'],
              0, 0,
              1, 1
            ],
            // Increase intensity as zoom level increases
            'heatmap-intensity': [
              'interpolate',
              ['linear'],
              ['zoom'],
              0, 1,
              15, 3
            ],
            // Color gradient
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
            // Radius
            'heatmap-radius': [
              'interpolate',
              ['linear'],
              ['zoom'],
              0, 2,
              15, 20
            ],
            // Opacity
            'heatmap-opacity': [
              'interpolate',
              ['linear'],
              ['zoom'],
              7, 1,
              9, 0.5
            ]
          }
        });

        // Add circle layer for individual points
        map.current.addLayer({
          id: 'sightings-point',
          type: 'circle',
          source: 'sightings',
          paint: {
            'circle-radius': 6,
            'circle-color': '#EC1616',
            'circle-stroke-color': 'white',
            'circle-stroke-width': 1,
            'circle-opacity': [
              'interpolate',
              ['linear'],
              ['zoom'],
              7, 0,
              8, 1
            ]
          }
        });

        // Add click event for points
        if (onMarkerClick) {
          map.current.on('click', 'sightings-point', (e) => {
            if (e.features && e.features[0] && e.features[0].properties) {
              const properties = e.features[0].properties;
              const sighting: Sighting = {
                lat: e.lngLat.lat,
                lng: e.lngLat.lng,
                intensity: properties.intensity,
                timestamp: properties.timestamp,
                type: properties.type,
                description: properties.description
              };
              onMarkerClick(sighting);
            }
          });

          // Change cursor on hover
          map.current.on('mouseenter', 'sightings-point', () => {
            if (map.current) {
              map.current.getCanvas().style.cursor = 'pointer';
            }
          });

          map.current.on('mouseleave', 'sightings-point', () => {
            if (map.current) {
              map.current.getCanvas().style.cursor = '';
            }
          });
        }

        setLoading(false);
      });

      map.current.on('error', (e) => {
        setError('Error loading map: ' + e.error.message);
        setLoading(false);
      });

    } catch (err) {
      setError('Error initializing map');
      setLoading(false);
    }

    return () => {
      map.current?.remove();
    };
  }, [center, zoom, sightings, onMarkerClick]);

  // Update sightings data when it changes
  useEffect(() => {
    if (!map.current || !map.current.isStyleLoaded()) return;

    const source = map.current.getSource('sightings') as mapboxgl.GeoJSONSource;
    if (source) {
      source.setData({
        type: 'FeatureCollection',
        features: sightings.map(sight => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [sight.lng, sight.lat]
          },
          properties: {
            intensity: sight.intensity,
            timestamp: sight.timestamp,
            type: sight.type,
            description: sight.description
          }
        }))
      });
    }
  }, [sightings]);

  // Token error
  if (!MAPBOX_TOKEN) {
    return (
      <div className="relative w-full h-[600px] rounded-lg overflow-hidden bg-gray-800 flex items-center justify-center">
        <p className="text-red-400">Map configuration error: Missing Mapbox token</p>
      </div>
    );
  }

  // General error
  if (error) {
    return (
      <div className="relative w-full h-[600px] rounded-lg overflow-hidden bg-gray-800 flex items-center justify-center">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[600px] rounded-lg overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0" />
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm">
          <div className="text-white">Loading map...</div>
        </div>
      )}
    </div>
  );
}