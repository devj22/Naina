import { Link } from 'wouter';
import Logo from './Logo';
import { MapPin, Mail, Phone, Clock } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="mb-6">
              <Logo isFooter={true} />
            </div>
            
            <p className="text-white/70 mb-6">
              Your trusted partner in real estate investment, providing expert guidance to help you build a robust property portfolio.
            </p>
            
            <div className="flex space-x-4">
              {['facebook', 'twitter', 'linkedin', 'instagram'].map(social => (
                <a 
                  key={social}
                  href={`#${social}`} 
                  className="text-white/70 hover:text-white transition-colors"
                  aria-label={`Follow us on ${social}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-heading font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/#about", label: "About Us" },
                { href: "/properties", label: "Properties" },
                { href: "/blog", label: "Blog" },
                { href: "/#contact", label: "Contact" },
                { href: "/careers", label: "Careers" }
              ].map(link => (
                <li key={link.href}>
                  <a 
                    href={link.href} 
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading font-bold text-lg mb-6">Land Categories</h4>
            <ul className="space-y-3">
              {[
                { href: "/properties?type=land", label: "Open Land Plots" },
                { href: "/properties?type=agricultural", label: "Agricultural Land" },
                { href: "/properties?type=commercial", label: "Commercial Land" },
                { href: "/properties?type=industrial", label: "Industrial Land" },
                { href: "/properties?type=residential", label: "Residential Plots" },
                { href: "/properties?status=new", label: "New Projects" }
              ].map(link => (
                <li key={link.href}>
                  <a 
                    href={link.href} 
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading font-bold text-lg mb-6">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="text-[#4CAF50] h-5 w-5 mr-3 mt-1" />
                <span className="text-white/70">123 Business Park, Andheri East, Mumbai - 400069, Maharashtra, India</span>
              </li>
              <li className="flex items-start">
                <Mail className="text-[#4CAF50] h-5 w-5 mr-3 mt-1" />
                <span className="text-white/70">info@nainalanddeals.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="text-[#4CAF50] h-5 w-5 mr-3 mt-1" />
                <span className="text-white/70">+91 99999 88888</span>
              </li>
              <li className="flex items-start">
                <Clock className="text-[#4CAF50] h-5 w-5 mr-3 mt-1" />
                <span className="text-white/70">Mon - Sat: 9:00 AM - 7:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-white/70">
            &copy; {currentYear} Naina Land Deals. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
