// app/utils/map/mapUtils.ts

export interface Sighting {
    lat: number;
    lng: number;
    intensity: number;
    timestamp: string;
    type: string;
    description?: string;
    verified?: boolean;
  }
  
  export function calculateBounds(sightings: Sighting[]) {
    if (sightings.length === 0) return null;
  
    const bounds = {
      north: -90,
      south: 90,
      east: -180,
      west: 180
    };
  
    sightings.forEach(point => {
      bounds.north = Math.max(bounds.north, point.lat);
      bounds.south = Math.min(bounds.south, point.lat);
      bounds.east = Math.max(bounds.east, point.lng);
      bounds.west = Math.min(bounds.west, point.lng);
    });
  
    return bounds;
  }
  
  export function getTimeAgo(timestamp: string): string {
    const now = new Date();
    const then = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000);
  
    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    }
  
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    }
  
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    }
  
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  }
  
  export function filterSightings(
    sightings: Sighting[],
    options: {
      timeframe?: 'today' | 'week' | 'month' | 'all';
      type?: string;
      verified?: boolean;
    }
  ): Sighting[] {
    return sightings.filter(sighting => {
      const date = new Date(sighting.timestamp);
      const now = new Date();
  
      if (options.timeframe) {
        switch (options.timeframe) {
          case 'today':
            if (date.getDate() !== now.getDate()) return false;
            break;
          case 'week':
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            if (date < weekAgo) return false;
            break;
          case 'month':
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            if (date < monthAgo) return false;
            break;
        }
      }
  
      if (options.type && sighting.type !== options.type) return false;
      if (options.verified !== undefined && sighting.verified !== options.verified) return false;
  
      return true;
    });
  }