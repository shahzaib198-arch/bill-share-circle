
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Property, SearchFilters as SearchFiltersType } from '@/types/rental';
import { mockProperties } from '@/data/mockData';
import PropertyCard from '@/components/property/PropertyCard';
import SearchFilters from '@/components/property/SearchFilters';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search as SearchIcon, Filter, SlidersHorizontal } from 'lucide-react';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [filters, setFilters] = useState<SearchFiltersType>({});

  useEffect(() => {
    setProperties(mockProperties);
    applyFilters();
  }, [filters, searchQuery]);

  const applyFilters = () => {
    let filtered = [...mockProperties];

    // Text search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(query) ||
        property.description.toLowerCase().includes(query) ||
        property.location.city.toLowerCase().includes(query) ||
        property.location.state.toLowerCase().includes(query) ||
        property.location.address.toLowerCase().includes(query) ||
        property.amenities.some(amenity => amenity.toLowerCase().includes(query))
      );
    }

    // Location filter
    if (filters.location) {
      const location = filters.location.toLowerCase();
      filtered = filtered.filter(property =>
        property.location.city.toLowerCase().includes(location) ||
        property.location.state.toLowerCase().includes(location) ||
        property.location.zipCode.includes(location)
      );
    }

    // Price range
    if (filters.minRent) {
      filtered = filtered.filter(property => property.rent >= filters.minRent!);
    }
    if (filters.maxRent) {
      filtered = filtered.filter(property => property.rent <= filters.maxRent!);
    }

    // Property type
    if (filters.propertyType && filters.propertyType.length > 0) {
      filtered = filtered.filter(property => filters.propertyType!.includes(property.type));
    }

    // Bedrooms
    if (filters.bedrooms !== undefined) {
      filtered = filtered.filter(property => property.bedrooms >= filters.bedrooms!);
    }

    // Bathrooms
    if (filters.bathrooms !== undefined) {
      filtered = filtered.filter(property => property.bathrooms >= filters.bathrooms!);
    }

    // Amenities
    if (filters.amenities && filters.amenities.length > 0) {
      filtered = filtered.filter(property =>
        filters.amenities!.every(amenity => property.amenities.includes(amenity))
      );
    }

    setFilteredProperties(filtered);
  };

  const handleSearch = () => {
    if (searchQuery) {
      setSearchParams({ q: searchQuery });
    } else {
      setSearchParams({});
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const resetFilters = () => {
    setFilters({});
    setSearchQuery('');
    setSearchParams({});
  };

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
        {/* Search Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Search Properties</h1>
          
          {/* Search Bar */}
          <div className="flex gap-4 mb-4">
            <div className="flex-1 flex bg-gray-50 rounded-lg overflow-hidden">
              <Input
                placeholder="Search by location, property type, or features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 border-0 bg-transparent focus:ring-0"
              />
              <Button onClick={handleSearch} className="rounded-l-none">
                <SearchIcon className="w-5 h-5" />
              </Button>
            </div>
            
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </Button>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              {filteredProperties.length} properties found
              {searchQuery && ` for "${searchQuery}"`}
            </span>
            {(Object.keys(filters).length > 0 || searchQuery) && (
              <Button variant="ghost" size="sm" onClick={resetFilters}>
                Clear all filters
              </Button>
            )}
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-80 flex-shrink-0">
              <SearchFilters
                filters={filters}
                onFiltersChange={setFilters}
                onReset={resetFilters}
              />
            </div>
          )}

          {/* Results */}
          <div className="flex-1">
            {filteredProperties.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
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
                  <SearchIcon className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No properties found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search criteria or filters to find more properties.
                </p>
                <Button onClick={resetFilters}>
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
