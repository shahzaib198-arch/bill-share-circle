
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Property } from '@/types/rental';
import { mockProperties } from '@/data/mockData';
import PropertyCard from '@/components/property/PropertyCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Star, Shield, Users, FileText } from 'lucide-react';

const Index = () => {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    // Get featured properties
    const featured = mockProperties.filter(p => p.featured).slice(0, 3);
    setFeaturedProperties(featured);
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
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
    // Navigate to property details page
  };

  const handleContactProperty = (property: Property) => {
    console.log('Contacting landlord for:', property.title);
    // Open contact modal or navigate to contact page
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-24">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              Find Your Perfect
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Rental Home
              </span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Discover amazing rental properties, manage lease agreements digitally, 
              and connect with trusted landlords all in one place.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="flex bg-white rounded-lg shadow-xl overflow-hidden">
                <Input
                  placeholder="Search by location, property type, or features..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 border-0 focus:ring-0 text-gray-900 text-lg"
                />
                <Button onClick={handleSearch} size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Search className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold">1000+</div>
                <div className="text-blue-200">Properties</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">500+</div>
                <div className="text-blue-200">Happy Tenants</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">200+</div>
                <div className="text-blue-200">Landlords</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">99%</div>
                <div className="text-blue-200">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose RentEase?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make renting simple, secure, and efficient for both landlords and tenants.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Search</h3>
              <p className="text-gray-600">
                Find properties that match your exact criteria with our advanced filtering system.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Digital Leases</h3>
              <p className="text-gray-600">
                Create, sign, and manage lease agreements completely online with legal compliance.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure Platform</h3>
              <p className="text-gray-600">
                Your data and transactions are protected with bank-level security measures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Featured Properties
              </h2>
              <p className="text-xl text-gray-600">
                Handpicked properties that offer exceptional value and amenities.
              </p>
            </div>
            <Link to="/search">
              <Button variant="outline" size="lg">
                View All Properties
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
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
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of satisfied users who have found their perfect rental match.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/search">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Find Properties
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              List Your Property
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
