import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Property } from '@shared/schema';
import { Skeleton } from '@/components/ui/skeleton';

declare global {
  interface Window {
    google: any;
  }
}

const MapSection = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  
  const { data: properties, isLoading } = useQuery<Property[]>({
    queryKey: ['/api/properties'],
  });

  // Initialize the map
  useEffect(() => {
    if (!mapRef.current || !window.google || map) return;
    
    // Center on India by default
    const defaultCenter = { lat: 20.5937, lng: 78.9629 };
    
    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: defaultCenter,
      zoom: 5,
      styles: [
        {
          featureType: "administrative",
          elementType: "geometry",
          stylers: [{ visibility: "simplified" }]
        },
        {
          featureType: "poi",
          stylers: [{ visibility: "simplified" }]
        }
      ]
    });
    
    setMap(mapInstance);
  }, [mapRef, window.google, map]);

  // Add markers for properties
  useEffect(() => {
    if (!map || !properties || properties.length === 0) return;
    
    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    
    // Add new markers for each property with coordinates
    const newMarkers = properties
      .filter(property => property.latitude && property.longitude)
      .map(property => {
        const position = {
          lat: parseFloat(property.latitude!),
          lng: parseFloat(property.longitude!)
        };
        
        const marker = new window.google.maps.Marker({
          position,
          map,
          title: property.title,
          animation: window.google.maps.Animation.DROP,
          icon: {
            url: `https://maps.google.com/mapfiles/ms/icons/${
              property.propertyType === 'residential' ? 'green' :
              property.propertyType === 'commercial' ? 'orange' :
              property.propertyType === 'land' ? 'blue' : 'red'
            }-dot.png`
          }
        });
        
        // Add info window with property details
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div class="p-2">
              <h3 class="font-bold">${property.title}</h3>
              <p>${property.location}</p>
              <p class="text-[#4CAF50] font-bold">₹${property.price.toLocaleString('en-IN')}</p>
              <a href="/properties/${property.id}" class="text-blue-600 hover:underline">View details</a>
            </div>
          `,
        });
        
        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
        
        return marker;
      });
    
    setMarkers(newMarkers);
    
    // Adjust map bounds if we have markers
    if (newMarkers.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      newMarkers.forEach(marker => bounds.extend(marker.getPosition()));
      map.fitBounds(bounds);
      
      // Don't zoom in too far for a single marker
      if (map.getZoom() > 15) map.setZoom(15);
    }
  }, [map, properties]);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4 text-neutral-900">Find Properties on Map</h2>
          <div className="w-20 h-1 bg-[#4CAF50] mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-neutral-700">
            Explore property locations and nearby amenities to find the perfect investment opportunity.
          </p>
        </div>
        
        <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg h-96">
          {isLoading ? (
            <Skeleton className="w-full h-full" />
          ) : (
            <div ref={mapRef} className="w-full h-full" />
          )}
        </div>
      </div>
    </section>
  );
};

export default MapSection;
