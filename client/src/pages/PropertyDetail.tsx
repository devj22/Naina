import { useParams, Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Property } from '@shared/schema';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { 
  MapPin, 
  Square, 
  Bed, 
  Bath, 
  Home, 
  ChevronRight, 
  Calendar, 
  Phone,
  Mail,
  Check,
  ArrowLeft
} from 'lucide-react';
import { formatPropertyPrice, formatPropertyType, formatListingStatus, formatDate } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { useState, useEffect } from 'react';

const PropertyDetail = () => {
  const { id } = useParams();
  const [mapLoaded, setMapLoaded] = useState(false);
  
  const { data: property, isLoading } = useQuery<Property>({
    queryKey: [`/api/properties/${id}`],
  });

  // Initialize map when property data is available
  useEffect(() => {
    if (!property || !window.google || !property.latitude || !property.longitude) return;
    
    const position = {
      lat: parseFloat(property.latitude),
      lng: parseFloat(property.longitude)
    };
    
    const mapElement = document.getElementById('property-map');
    if (!mapElement) return;
    
    const map = new window.google.maps.Map(mapElement, {
      center: position,
      zoom: 15,
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
    
    const marker = new window.google.maps.Marker({
      position,
      map,
      title: property.title,
      animation: window.google.maps.Animation.DROP
    });
    
    setMapLoaded(true);
  }, [property, window.google]);

  if (isLoading) {
    return (
      <div className="font-body bg-gray-100 min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-28">
          <Skeleton className="h-8 w-64 mb-4" />
          <Skeleton className="h-[400px] w-full mb-8 rounded-lg" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Skeleton className="h-10 w-3/4 mb-4" />
              <Skeleton className="h-6 w-1/2 mb-6" />
              <Skeleton className="h-24 w-full mb-6" />
              <Skeleton className="h-8 w-64 mb-4" />
              <Skeleton className="h-48 w-full" />
            </div>
            <div>
              <Skeleton className="h-[400px] w-full rounded-lg" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="font-body bg-gray-100 min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-28 text-center">
          <h2 className="text-2xl font-bold mb-4">Property Not Found</h2>
          <p className="mb-6">The property you're looking for doesn't exist or has been removed.</p>
          <Link href="/">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="font-body bg-gray-100 min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-28">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="/#properties">Properties</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink>{property.title}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        {/* Featured Image */}
        <div className="relative mb-8 rounded-lg overflow-hidden shadow-lg">
          <img 
            src={property.featuredImage} 
            alt={property.title} 
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute top-4 right-4 flex space-x-2">
            <span className={`inline-block px-3 py-1 rounded text-white text-sm font-medium ${
              property.listingStatus === 'for_sale' ? 'bg-[#4CAF50]' : 
              property.listingStatus === 'for_rent' ? 'bg-[#2196F3]' : 
              property.listingStatus === 'for_lease' ? 'bg-[#FF9800]' : 'bg-gray-500'
            }`}>
              {formatListingStatus(property.listingStatus)}
            </span>
            <span className="inline-block px-3 py-1 rounded bg-white/90 text-[#4CAF50] text-sm font-medium">
              {formatPropertyType(property.propertyType)}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Property Details */}
          <div className="lg:col-span-2">
            <h1 className="font-heading font-bold text-3xl mb-2 text-neutral-900">{property.title}</h1>
            <p className="flex items-center text-neutral-700 mb-4">
              <MapPin className="h-5 w-5 mr-1 text-[#4CAF50]" />
              {property.address}, {property.city}, {property.state}
              {property.zipCode && ` - ${property.zipCode}`}
            </p>
            
            <div className="flex flex-wrap gap-6 py-4 border-t border-b border-gray-200 mb-6">
              <div className="flex items-center">
                <Square className="h-5 w-5 mr-2 text-[#4CAF50]" />
                <div>
                  <p className="text-sm text-neutral-700">Area</p>
                  <p className="font-medium">{property.area} {property.areaUnit}</p>
                </div>
              </div>
              
              {property.bedrooms && (
                <div className="flex items-center">
                  <Bed className="h-5 w-5 mr-2 text-[#4CAF50]" />
                  <div>
                    <p className="text-sm text-neutral-700">Bedrooms</p>
                    <p className="font-medium">{property.bedrooms}</p>
                  </div>
                </div>
              )}
              
              {property.bathrooms && (
                <div className="flex items-center">
                  <Bath className="h-5 w-5 mr-2 text-[#4CAF50]" />
                  <div>
                    <p className="text-sm text-neutral-700">Bathrooms</p>
                    <p className="font-medium">{property.bathrooms}</p>
                  </div>
                </div>
              )}
              
              <div className="flex items-center">
                <Home className="h-5 w-5 mr-2 text-[#4CAF50]" />
                <div>
                  <p className="text-sm text-neutral-700">Property Type</p>
                  <p className="font-medium">{formatPropertyType(property.propertyType)}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-[#4CAF50]" />
                <div>
                  <p className="text-sm text-neutral-700">Listed On</p>
                  <p className="font-medium">{formatDate(property.createdAt)}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-heading font-bold text-2xl text-neutral-900">Price</h2>
                <p className="font-heading font-bold text-2xl text-[#4CAF50]">
                  {formatPropertyPrice(property.price, property.priceUnit, property.priceSuffix)}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button className="bg-[#4CAF50] hover:bg-[#2E7D32] text-white font-medium">
                  <Phone className="h-4 w-4 mr-2" /> Call Agent
                </Button>
                <Button variant="outline" className="border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-white">
                  <Mail className="h-4 w-4 mr-2" /> Email Inquiry
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="description" className="mb-8">
              <TabsList className="bg-white">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="features">Features & Amenities</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="bg-white p-6 rounded-lg shadow-md mt-2">
                <h3 className="font-heading font-bold text-xl mb-4 text-neutral-900">Property Description</h3>
                <p className="text-neutral-700 whitespace-pre-line">
                  {property.description}
                </p>
              </TabsContent>
              <TabsContent value="features" className="bg-white p-6 rounded-lg shadow-md mt-2">
                <h3 className="font-heading font-bold text-xl mb-4 text-neutral-900">Features & Amenities</h3>
                {property.amenities && property.amenities.length > 0 ? (
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4">
                    {property.amenities.map((amenity, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="h-5 w-5 text-[#4CAF50] mr-2" />
                        <span className="text-neutral-700">{amenity}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-neutral-700">No amenities listed for this property.</p>
                )}
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar */}
          <div>
            {/* Map */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h3 className="font-heading font-bold text-xl mb-4 text-neutral-900">Location</h3>
              <div 
                id="property-map" 
                className="w-full h-[300px] bg-gray-100 rounded-lg"
              >
                {!mapLoaded && !property.latitude && !property.longitude && (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <p className="text-neutral-700">Map location not available</p>
                  </div>
                )}
              </div>
              <p className="mt-4 text-neutral-700">
                <MapPin className="h-5 w-5 inline mr-1 text-[#4CAF50]" />
                {property.address}, {property.city}, {property.state}
                {property.zipCode && ` - ${property.zipCode}`}
              </p>
            </div>
            
            {/* Contact Form */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-heading font-bold text-xl mb-4 text-neutral-900">Inquire About This Property</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                    placeholder="Your Email"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">Phone</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                    placeholder="Your Phone"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">Message</label>
                  <textarea 
                    id="message" 
                    rows={4} 
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                    defaultValue={`I am interested in this property: ${property.title}`}
                  ></textarea>
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-[#4CAF50] hover:bg-[#2E7D32] text-white font-medium py-3 rounded-md transition-colors"
                >
                  Send Inquiry
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PropertyDetail;
