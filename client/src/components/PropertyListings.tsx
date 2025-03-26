import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PropertyCard from './PropertyCard';
import { Property } from '@shared/schema';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';

const PropertyListings = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  const { data: properties, isLoading } = useQuery<Property[]>({
    queryKey: ['/api/properties'],
  });
  
  // Filter properties - all of them are land, but we filter by specific land types
  const filteredProperties = properties?.filter(property => {
    // First filter to only show land properties
    if (property.propertyType !== "land") return false;
    
    // Then filter by subtypes
    if (activeTab === "all") return true;
    if (activeTab === "land") return property.title.toLowerCase().includes("agricultural") || 
                                    property.description.toLowerCase().includes("agricultural") || 
                                    property.description.toLowerCase().includes("farming");
    if (activeTab === "commercial") return property.title.toLowerCase().includes("commercial") || 
                                          property.description.toLowerCase().includes("commercial");
    return true;
  });

  return (
    <section id="properties" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4 text-neutral-900">Premium Land Properties</h2>
          <div className="w-20 h-1 bg-[#4CAF50] mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-neutral-700">
            Discover our handpicked selection of premium land plots with excellent investment potential.
          </p>
        </div>
        
        <div className="flex justify-center mb-10">
          <Tabs 
            defaultValue="all" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full max-w-md"
          >
            <TabsList className="grid grid-cols-3 bg-white rounded-full p-1 shadow-sm">
              <TabsTrigger value="all" className="rounded-full data-[state=active]:bg-[#4CAF50] data-[state=active]:text-white">All Plots</TabsTrigger>
              <TabsTrigger value="land" className="rounded-full data-[state=active]:bg-[#4CAF50] data-[state=active]:text-white">Agricultural</TabsTrigger>
              <TabsTrigger value="commercial" className="rounded-full data-[state=active]:bg-[#4CAF50] data-[state=active]:text-white">Commercial</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
                <Skeleton className="w-full h-64" />
                <div className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-3" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <div className="flex justify-between items-center py-3 border-t border-gray-200">
                    <Skeleton className="h-6 w-1/3" />
                    <div className="flex space-x-4">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-8" />
                      <Skeleton className="h-4 w-8" />
                    </div>
                  </div>
                  <Skeleton className="h-10 w-full mt-4" />
                </div>
              </div>
            ))
          ) : (
            filteredProperties?.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))
          )}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            className="inline-flex items-center px-6 py-3 border-2 border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-white font-medium rounded-md transition-colors"
          >
            View All Properties
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PropertyListings;
