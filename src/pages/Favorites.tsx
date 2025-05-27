
import { useState, useEffect } from 'react';
import { Property } from '@/types/rental';
import { mockProperties } from '@/data/mockData';
import PropertyCard from '@/components/property/PropertyCard';
import { Heart, Search } from 'lucide-react';

const Favorites = () => {
  const [favoriteProperties, setFavoriteProperties] = useState<Property[]>([]);
  const [favorites, setFavorites] = useState<string[]>(['1', '3']); // Mock favorites

  useEffect(() => {
    // Filter properties to show only favorites
    const favProps = mockProperties.filter(property => 
      favorites.includes(property.id)
    );
    setFavoriteProperties(favProps);
  }, [favorites]);

  const toggleFavorite = (propertyId: string) => {
    setFavorites(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const handleViewProperty = (property: Property) => {
    console.log('Viewing property:', property.title);
  };

  const handleContactProperty = (property: Property) => {
    console.log('Contacting landlord for:', property.title);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
            <Heart className="w-8 h-8 mr-3 text-red-500" />
            Favorite Properties
          </h1>
          <p className="text-lg text-gray-600">
            Keep track of properties you're interested in renting.
          </p>
        </div>

        {/* Properties Grid */}
        {favoriteProperties.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onView={handleViewProperty}
                onContact={handleContactProperty}
                onFavorite={toggleFavorite}
                isFavorited={favorites.includes(property.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No favorite properties yet
            </h3>
            <p className="text-gray-600 mb-4">
              Start browsing properties and add them to your favorites by clicking the heart icon.
            </p>
            <a href="/search" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Search className="w-4 h-4 mr-2" />
              Browse Properties
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
