import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Property } from '@shared/schema';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Search } from 'lucide-react';

const Properties = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("any");

  const { data: properties, isLoading } = useQuery<Property[]>({
    queryKey: ['/api/properties'],
  });

  // Filter properties by tab (property type)
  const filterByType = (property: Property) => {
    // First filter to only show land properties
    if (property.propertyType !== "land") return false;
    
    // Then filter by subtypes
    if (activeTab === "all") return true;
    if (activeTab === "agricultural") 
      return property.title.toLowerCase().includes("agricultural") || 
             property.description.toLowerCase().includes("agricultural") || 
             property.description.toLowerCase().includes("farming");
    if (activeTab === "commercial") 
      return property.title.toLowerCase().includes("commercial") || 
             property.description.toLowerCase().includes("commercial");
    if (activeTab === "residential") 
      return property.title.toLowerCase().includes("residential") || 
             property.description.toLowerCase().includes("residential") ||
             property.description.toLowerCase().includes("housing");
    return true;
  };

  // Filter by search term
  const filterBySearch = (property: Property) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    
    return property.title.toLowerCase().includes(term) ||
           property.description.toLowerCase().includes(term) ||
           property.location.toLowerCase().includes(term) ||
           property.city.toLowerCase().includes(term) ||
           property.state.toLowerCase().includes(term);
  };

  // Filter by price range
  const filterByPrice = (property: Property) => {
    if (priceFilter === "any") return true;
    
    const price = property.price;
    
    switch (priceFilter) {
      case "under_50L":
        return price < 5000000; // Under 50 Lakh
      case "50L_1Cr":
        return price >= 5000000 && price < 10000000; // 50 Lakh to 1 Cr
      case "1Cr_2Cr":
        return price >= 10000000 && price < 20000000; // 1 Cr to 2 Cr
      case "above_2Cr":
        return price >= 20000000; // Above 2 Cr
      default:
        return true;
    }
  };
  
  // Apply all filters
  const filteredProperties = properties?.filter(property => 
    filterByType(property) && filterBySearch(property) && filterByPrice(property)
  );

  return (
    <div className="font-body bg-gray-50 min-h-screen">
      <Navbar />
      
      <div className="pt-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/properties">Properties</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <h1 className="text-3xl md:text-4xl font-bold font-heading mb-4">Land Properties</h1>
          <p className="text-gray-300 max-w-2xl">
            Browse our exclusive collection of premium land properties across India. 
            Filter by type, price range, or search for specific requirements.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        {/* Search and filters */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="search" className="block text-sm font-medium mb-1">Search Properties</Label>
              <div className="relative">
                <Input 
                  id="search"
                  placeholder="Search by location, title, description..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
            
            <div>
              <Label htmlFor="price-range" className="block text-sm font-medium mb-1">Price Range</Label>
              <Select defaultValue={priceFilter} onValueChange={setPriceFilter}>
                <SelectTrigger id="price-range" className="w-full">
                  <SelectValue placeholder="Any Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Price Range</SelectItem>
                  <SelectItem value="under_50L">Under ₹50 Lakh</SelectItem>
                  <SelectItem value="50L_1Cr">₹50 Lakh - 1 Cr</SelectItem>
                  <SelectItem value="1Cr_2Cr">₹1 Cr - 2 Cr</SelectItem>
                  <SelectItem value="above_2Cr">Above ₹2 Cr</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {/* Property type tabs */}
        <div className="mb-8">
          <Tabs 
            defaultValue="all" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="bg-white p-1 shadow-sm rounded-lg">
              <TabsTrigger 
                value="all" 
                className="data-[state=active]:bg-[#4CAF50] data-[state=active]:text-white"
              >
                All Land Types
              </TabsTrigger>
              <TabsTrigger 
                value="agricultural" 
                className="data-[state=active]:bg-[#4CAF50] data-[state=active]:text-white"
              >
                Agricultural
              </TabsTrigger>
              <TabsTrigger 
                value="commercial" 
                className="data-[state=active]:bg-[#4CAF50] data-[state=active]:text-white"
              >
                Commercial
              </TabsTrigger>
              <TabsTrigger 
                value="residential" 
                className="data-[state=active]:bg-[#4CAF50] data-[state=active]:text-white"
              >
                Residential Plots
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {/* Property results */}
        <div className="mt-8">
          <div className="mb-4 text-neutral-600">
            Showing {filteredProperties?.length || 0} properties
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
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
                      </div>
                    </div>
                    <Skeleton className="h-10 w-full mt-4" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProperties && filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-medium text-gray-900 mb-2">No properties found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Properties;