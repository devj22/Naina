import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ParallaxSection from '@/components/ParallaxSection';
import PropertyListings from '@/components/PropertyListings';
import MapSection from '@/components/MapSection';
import BlogSection from '@/components/BlogSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Home = () => {
  return (
    <div className="font-body bg-gray-100">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ParallaxSection />
      <PropertyListings />
      <MapSection />
      <BlogSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Home;
