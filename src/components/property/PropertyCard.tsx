
import { useState } from 'react';
import { Property } from '@/types/rental';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, MapPin, Home, Eye } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  onView: (property: Property) => void;
  onContact: (property: Property) => void;
  onFavorite: (propertyId: string) => void;
  isFavorited?: boolean;
}

const PropertyCard = ({ property, onView, onContact, onFavorite, isFavorited = false }: PropertyCardProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      <div className="relative">
        <div className="aspect-video bg-gray-200 overflow-hidden">
          <img
            src={property.images[0] || '/placeholder.svg'}
            alt={property.title}
            className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
              isImageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setIsImageLoaded(true)}
          />
          {!isImageLoaded && (
            <div className="w-full h-full flex items-center justify-center">
              <Home className="w-12 h-12 text-gray-400" />
            </div>
          )}
        </div>
        
        {/* Favorite Button */}
        <button
          onClick={() => onFavorite(property.id)}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors"
        >
          <Heart
            className={`w-4 h-4 ${
              isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600'
            }`}
          />
        </button>

        {/* Featured Badge */}
        {property.featured && (
          <Badge className="absolute top-3 left-3 bg-gradient-to-r from-blue-600 to-purple-600">
            Featured
          </Badge>
        )}

        {/* Availability Badge */}
        <Badge
          variant={property.availability.available ? 'default' : 'secondary'}
          className="absolute bottom-3 left-3"
        >
          {property.availability.available ? 'Available' : 'Not Available'}
        </Badge>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Title and Price */}
          <div>
            <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
              {property.title}
            </h3>
            <div className="flex items-center justify-between mt-1">
              <span className="text-2xl font-bold text-blue-600">
                {formatPrice(property.rent)}/month
              </span>
              <Badge variant="outline" className="text-xs">
                {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
              </Badge>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
            <span className="line-clamp-1">
              {property.location.address}, {property.location.city}, {property.location.state}
            </span>
          </div>

          {/* Property Details */}
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>{property.bedrooms} beds</span>
            <span>•</span>
            <span>{property.bathrooms} baths</span>
            <span>•</span>
            <span>{property.area} sq ft</span>
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-1">
            {property.amenities.slice(0, 3).map((amenity) => (
              <Badge key={amenity} variant="secondary" className="text-xs">
                {amenity}
              </Badge>
            ))}
            {property.amenities.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{property.amenities.length - 3} more
              </Badge>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onView(property)}
              className="flex-1"
            >
              <Eye className="w-4 h-4 mr-1" />
              View Details
            </Button>
            <Button
              size="sm"
              onClick={() => onContact(property)}
              className="flex-1"
            >
              Contact
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
