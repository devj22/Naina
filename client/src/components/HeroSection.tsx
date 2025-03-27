import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const HeroSection = () => {

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
      
      {/* Call-to-action bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white shadow-lg rounded-t-lg z-20 transform translate-y-1/2">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0 text-center md:text-left">
              <h3 className="text-xl font-bold text-gray-900">Looking for Investment Land?</h3>
              <p className="text-gray-600">Explore our premium land plots in high-growth locations</p>
            </div>
            <div className="flex gap-4">
              <Button 
                className="bg-[#4CAF50] hover:bg-[#2E7D32] text-white font-medium py-2 px-4 rounded-md transition-colors"
                onClick={() => window.location.href = "/properties"}
              >
                <Search className="h-4 w-4 mr-2" />
                Browse Properties
              </Button>
              <Button 
                variant="outline"
                className="border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50]/10 font-medium py-2 px-4 rounded-md transition-colors"
                onClick={() => window.location.href = "#contact"}
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
