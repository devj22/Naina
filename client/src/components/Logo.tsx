import React from 'react';

interface LogoProps {
  className?: string;
  textClassName?: string;
  showTagline?: boolean;
  isFooter?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  className = "h-12 w-12", 
  textClassName = "text-white", 
  showTagline = true,
  isFooter = false
}) => {
  return (
    <div className="flex items-center space-x-2">
      <div className={`relative ${className}`}>
        <svg 
          viewBox="0 0 100 100" 
          className="h-full w-full"
          aria-label="Naina Land Deals Logo"
        >
          <circle cx="50" cy="35" r="25" fill="#FF9800" />
          <path d="M20,65 L50,25 L80,65 L50,85 Z" fill="#4CAF50" />
          <path d="M30,75 L50,65 L70,75 L50,95 Z" fill="#2E7D32" />
        </svg>
      </div>
      <div>
        <p className={`font-heading font-bold text-lg ${textClassName}`}>NAINA LAND DEALS</p>
        {showTagline && (
          <p className={`text-xs ${isFooter ? 'text-white/80' : 'text-white/80'} font-heading`}>
            INVEST SMART, BUILD DREAMS
          </p>
        )}
      </div>
    </div>
  );
};

export default Logo;
