import { useEffect, useRef, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { MapPin, Phone, Mail } from 'lucide-react';

declare global {
  interface Window {
    google: any;
  }
}

// Our office locations
const OFFICE_LOCATIONS = [
  {
    id: 1,
    name: "Nainaland Deals HQ",
    address: "123 Realty Avenue, Worli, Mumbai, Maharashtra 400018",
    phone: "+91 98765 43210",
    email: "contact@nainalanddeals.com",
    position: { lat: 19.0177, lng: 72.8184 } // Mumbai Worli
  },
  {
    id: 2,
    name: "Nainaland North Branch",
    address: "45 Property Plaza, Sector 18, Gurugram, Haryana 122008",
    phone: "+91 98765 43211",
    email: "delhi@nainalanddeals.com",
    position: { lat: 28.4611, lng: 77.0352 } // Gurugram
  },
  {
    id: 3,
    name: "Nainaland South Branch",
    address: "789 Land Square, Koramangala, Bangalore, Karnataka 560034",
    phone: "+91 98765 43212",
    email: "bangalore@nainalanddeals.com",
    position: { lat: 12.9279, lng: 77.6271 } // Bangalore
  }
];

const MapSection = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOffice, setSelectedOffice] = useState(OFFICE_LOCATIONS[0]);

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
    setIsLoading(false);
  }, [mapRef, window.google, map]);

  // Add markers for office locations
  useEffect(() => {
    if (!map) return;
    
    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    
    // Add new markers for each office location
    const newMarkers = OFFICE_LOCATIONS.map(office => {
      const marker = new window.google.maps.Marker({
        position: office.position,
        map,
        title: office.name,
        animation: window.google.maps.Animation.DROP,
        icon: {
          url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
        }
      });
      
      // Add info window with office details
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div class="p-2">
            <h3 class="font-bold">${office.name}</h3>
            <p>${office.address}</p>
            <p>${office.phone}</p>
          </div>
        `,
      });
      
      marker.addListener('click', () => {
        infoWindow.open(map, marker);
        setSelectedOffice(office);
      });
      
      return marker;
    });
    
    setMarkers(newMarkers);
    
    // Adjust map bounds to show all offices
    const bounds = new window.google.maps.LatLngBounds();
    OFFICE_LOCATIONS.forEach(office => bounds.extend(office.position));
    map.fitBounds(bounds);
    
    // Don't zoom in too far for a single location
    if (map.getZoom() > 12) map.setZoom(12);
  }, [map]);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4 text-neutral-900">Our Office Locations</h2>
          <div className="w-20 h-1 bg-[#4CAF50] mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-neutral-700">
            Visit us at any of our branches across India to discuss your land investment opportunities.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {OFFICE_LOCATIONS.map(office => (
            <div 
              key={office.id}
              className={`p-6 rounded-lg shadow-md border-2 cursor-pointer transition-all duration-300 ${
                selectedOffice.id === office.id 
                ? "border-[#4CAF50] bg-[#F1F8E9]" 
                : "border-gray-200 bg-white hover:border-[#4CAF50]/50"
              }`}
              onClick={() => {
                setSelectedOffice(office);
                // Center map on this office
                if (map) {
                  map.panTo(office.position);
                  map.setZoom(15);
                  // Find and click the marker
                  markers.forEach(marker => {
                    if (marker.getTitle() === office.name) {
                      window.google.maps.event.trigger(marker, 'click');
                    }
                  });
                }
              }}
            >
              <h3 className="font-bold text-xl mb-3 text-neutral-900">{office.name}</h3>
              <div className="flex items-start mb-2">
                <MapPin className="h-5 w-5 text-[#4CAF50] mr-2 mt-1 flex-shrink-0" />
                <p className="text-neutral-700">{office.address}</p>
              </div>
              <div className="flex items-center mb-2">
                <Phone className="h-5 w-5 text-[#4CAF50] mr-2 flex-shrink-0" />
                <p className="text-neutral-700">{office.phone}</p>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-[#4CAF50] mr-2 flex-shrink-0" />
                <p className="text-neutral-700">{office.email}</p>
              </div>
            </div>
          ))}
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
