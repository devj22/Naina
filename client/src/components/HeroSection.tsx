import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Search, ChevronDown } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';

const searchSchema = z.object({
  location: z.string(),
  propertyType: z.string(),
  budget: z.string(),
  area: z.string()
});

type SearchFormData = z.infer<typeof searchSchema>;

const HeroSection = () => {
  const form = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      location: "any",
      propertyType: "all",
      budget: "any",
      area: "any"
    }
  });

  const onSubmit = async (data: SearchFormData) => {
    try {
      // In a real application, we would submit this to the server
      console.log("Search criteria:", data);
      // This could redirect to a search results page
    } catch (error) {
      console.error("Error searching properties:", error);
    }
  };

  return (
    <section id="home" className="relative h-screen bg-neutral-900 overflow-hidden">
      {/* Hero background with overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-no-repeat bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&h=1080&q=80')" 
          }}
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      <div className="container mx-auto px-4 h-full flex flex-col justify-center items-start relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-white font-heading font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
            Find Your Perfect Investment Property
          </h1>
          <p className="text-white/90 text-lg md:text-xl mb-8 max-w-xl">
            Expert guidance and premium properties for smart investors. Build your portfolio with Naina Land Deals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#properties">
              <Button size="lg" className="bg-[#4CAF50] hover:bg-[#2E7D32] text-white font-medium rounded-md transition-colors">
                Explore Properties
              </Button>
            </a>
            <a href="#contact">
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-transparent border-2 border-white hover:bg-white/10 text-white font-medium rounded-md transition-colors"
              >
                Contact Us
              </Button>
            </a>
          </div>
        </div>
      </div>
      
      {/* Property search bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white shadow-lg rounded-t-lg z-20 transform translate-y-1/2">
        <div className="container mx-auto px-4 py-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="relative">
                    <Label className="block text-sm font-medium text-neutral-900 mb-1">Location</Label>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full bg-gray-100 border border-gray-300 rounded-md">
                          <SelectValue placeholder="Any Location" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="any">Any Location</SelectItem>
                        <SelectItem value="mumbai">Mumbai</SelectItem>
                        <SelectItem value="delhi_ncr">Delhi NCR</SelectItem>
                        <SelectItem value="bangalore">Bangalore</SelectItem>
                        <SelectItem value="pune">Pune</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="propertyType"
                render={({ field }) => (
                  <FormItem className="relative">
                    <Label className="block text-sm font-medium text-neutral-900 mb-1">Property Type</Label>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full bg-gray-100 border border-gray-300 rounded-md">
                          <SelectValue placeholder="All Types" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="residential">Residential</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                        <SelectItem value="industrial">Industrial</SelectItem>
                        <SelectItem value="land">Land/Plots</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem className="relative">
                    <Label className="block text-sm font-medium text-neutral-900 mb-1">Budget</Label>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full bg-gray-100 border border-gray-300 rounded-md">
                          <SelectValue placeholder="Any Budget" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="any">Any Budget</SelectItem>
                        <SelectItem value="under_50L">Under ₹50 Lakh</SelectItem>
                        <SelectItem value="50L_1Cr">₹50 Lakh - 1 Cr</SelectItem>
                        <SelectItem value="1Cr_2Cr">₹1 Cr - 2 Cr</SelectItem>
                        <SelectItem value="above_2Cr">Above ₹2 Cr</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="area"
                render={({ field }) => (
                  <FormItem className="relative">
                    <Label className="block text-sm font-medium text-neutral-900 mb-1">Area (sq.ft)</Label>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full bg-gray-100 border border-gray-300 rounded-md">
                          <SelectValue placeholder="Any Size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="any">Any Size</SelectItem>
                        <SelectItem value="under_1000">Under 1000 sq.ft</SelectItem>
                        <SelectItem value="1000_2000">1000-2000 sq.ft</SelectItem>
                        <SelectItem value="2000_3000">2000-3000 sq.ft</SelectItem>
                        <SelectItem value="above_3000">Above 3000 sq.ft</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              
              <div className="flex items-end">
                <Button 
                  type="submit" 
                  className="w-full bg-[#4CAF50] hover:bg-[#2E7D32] text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
