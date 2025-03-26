import { CheckCircle } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="pt-32 pb-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4 text-neutral-900">About Naina Land Deals</h2>
          <div className="w-20 h-1 bg-[#4CAF50] mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-neutral-700">
            Your trusted partner in real estate investment, dedicated to helping you build a robust property portfolio that stands the test of time.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h3 className="font-heading font-bold text-2xl mb-4 text-neutral-900">Why Choose Us</h3>
            <p className="text-neutral-700 mb-6">
              At Naina Land Deals, we combine industry expertise with personalized service to guide you through every step of your real estate investment journey. We're not just property dealers; we're your long-term partners in wealth creation.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-[#4CAF50] mr-3 mt-1" />
                <div>
                  <h4 className="font-medium text-lg text-neutral-900">Expert Market Knowledge</h4>
                  <p className="text-neutral-700">Deep understanding of property trends, investment hotspots, and market dynamics.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-[#4CAF50] mr-3 mt-1" />
                <div>
                  <h4 className="font-medium text-lg text-neutral-900">Verified Properties</h4>
                  <p className="text-neutral-700">All listings undergo rigorous legal verification and due diligence.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-[#4CAF50] mr-3 mt-1" />
                <div>
                  <h4 className="font-medium text-lg text-neutral-900">End-to-End Support</h4>
                  <p className="text-neutral-700">From property selection to documentation, financing, and post-purchase services.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-[#4CAF50] mr-3 mt-1" />
                <div>
                  <h4 className="font-medium text-lg text-neutral-900">Investment Advisory</h4>
                  <p className="text-neutral-700">Strategic guidance to maximize returns and build a diverse property portfolio.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80" 
                alt="Real estate professionals in a meeting" 
                className="w-full h-auto rounded-lg shadow-xl"
              />
              
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg hidden md:block">
                <div className="flex items-center space-x-4">
                  <div className="bg-[#6EBF71] rounded-full p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-neutral-900 font-bold">15+ Years</p>
                    <p className="text-neutral-700 text-sm">Market Experience</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-lg hidden md:block">
                <div className="flex items-center space-x-4">
                  <div className="bg-[#FF9800] rounded-full p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-neutral-900 font-bold">500+</p>
                    <p className="text-neutral-700 text-sm">Properties Sold</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
