import { Button } from '@/components/ui/button';

const ParallaxSection = () => {
  return (
    <section className="relative h-96 bg-fixed bg-center bg-no-repeat bg-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1622015663084-307d19eabca2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')" }}>
      <div className="absolute inset-0 bg-neutral-900/70"></div>
      <div className="container mx-auto px-4 h-full flex items-center relative z-10">
        <div className="max-w-xl">
          <h2 className="font-heading font-bold text-white text-3xl md:text-4xl mb-6">
            Your Investment, Our Commitment
          </h2>
          <p className="text-white text-lg mb-8">
            We believe that property investment is not just about transactions; it's about building a future. Let us help you secure yours.
          </p>
          <a href="#contact">
            <Button className="bg-[#4CAF50] hover:bg-[#2E7D32] text-white font-medium px-8 py-6 rounded-md inline-block transition-colors">
              Start Your Journey
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ParallaxSection;
