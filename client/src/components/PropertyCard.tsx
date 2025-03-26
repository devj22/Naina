import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Property } from '@shared/schema';
import { Link } from 'wouter';
import { MapPin, Square, Bed, Bath } from 'lucide-react';
import { formatPropertyPrice, formatPropertyType, formatListingStatus } from '@/lib/utils';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { 
    id, 
    title, 
    location, 
    price, 
    priceUnit, 
    priceSuffix, 
    area, 
    areaUnit, 
    bedrooms, 
    bathrooms, 
    featuredImage, 
    propertyType, 
    listingStatus, 
    description 
  } = property;

  return (
    <Card className="overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 rounded-lg h-full">
      <div className="relative">
        <img 
          src={featuredImage} 
          alt={title} 
          className="w-full h-64 object-cover"
        />
        <Badge 
          className={`absolute top-4 right-4 ${
            listingStatus === 'for_sale' ? 'bg-[#4CAF50]' : 
            listingStatus === 'for_rent' ? 'bg-[#2196F3]' : 
            listingStatus === 'for_lease' ? 'bg-[#FF9800]' : 'bg-gray-500'
          }`}
        >
          {formatListingStatus(listingStatus)}
        </Badge>
        <Badge className="absolute bottom-4 left-4 bg-white/90 text-[#4CAF50] hover:bg-white">
          {formatPropertyType(propertyType)}
        </Badge>
      </div>
      
      <CardContent className="p-6">
        <h3 className="font-heading font-bold text-xl mb-2 text-neutral-900">{title}</h3>
        <p className="flex items-center text-neutral-700 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          {location}
        </p>
        <p className="text-neutral-700 mb-4 line-clamp-2">{description}</p>
        
        <div className="flex justify-between items-center py-3 border-t border-gray-200">
          <p className="font-heading font-bold text-xl text-[#4CAF50]">
            {formatPropertyPrice(price, priceUnit, priceSuffix)}
          </p>
          <div className="flex space-x-4 text-neutral-700">
            <div className="flex items-center font-medium">
              <Square className="h-4 w-4 mr-1" />
              <span>{area} {areaUnit}</span>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-6 pt-0">
        <Link href={`/properties/${id}`}>
          <Button className="w-full bg-[#6EBF71] hover:bg-[#4CAF50] text-white font-medium py-2 rounded transition-colors">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
