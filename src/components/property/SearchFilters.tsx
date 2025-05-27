
import { useState } from 'react';
import { SearchFilters as SearchFiltersType } from '@/types/rental';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SearchFiltersProps {
  filters: SearchFiltersType;
  onFiltersChange: (filters: SearchFiltersType) => void;
  onReset: () => void;
}

const SearchFilters = ({ filters, onFiltersChange, onReset }: SearchFiltersProps) => {
  const propertyTypes = ['apartment', 'house', 'condo', 'studio', 'room'];
  const amenitiesList = [
    'Air Conditioning', 'Gym', 'Pool', 'Parking', 'Laundry',
    'WiFi', 'Pet Friendly', 'Garden', 'Garage', 'Fireplace'
  ];

  const updateFilters = (key: keyof SearchFiltersType, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const togglePropertyType = (type: string) => {
    const current = filters.propertyType || [];
    const updated = current.includes(type)
      ? current.filter(t => t !== type)
      : [...current, type];
    updateFilters('propertyType', updated);
  };

  const toggleAmenity = (amenity: string) => {
    const current = filters.amenities || [];
    const updated = current.includes(amenity)
      ? current.filter(a => a !== amenity)
      : [...current, amenity];
    updateFilters('amenities', updated);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Search Filters
          <Button variant="outline" size="sm" onClick={onReset}>
            Reset
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Location */}
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="Enter city, state, or zip code"
            value={filters.location || ''}
            onChange={(e) => updateFilters('location', e.target.value)}
          />
        </div>

        {/* Price Range */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="minRent">Min Rent</Label>
            <Input
              id="minRent"
              type="number"
              placeholder="$0"
              value={filters.minRent || ''}
              onChange={(e) => updateFilters('minRent', e.target.value ? Number(e.target.value) : undefined)}
            />
          </div>
          <div>
            <Label htmlFor="maxRent">Max Rent</Label>
            <Input
              id="maxRent"
              type="number"
              placeholder="No limit"
              value={filters.maxRent || ''}
              onChange={(e) => updateFilters('maxRent', e.target.value ? Number(e.target.value) : undefined)}
            />
          </div>
        </div>

        {/* Bedrooms */}
        <div>
          <Label>Bedrooms</Label>
          <Select
            value={filters.bedrooms?.toString() || ''}
            onValueChange={(value) => updateFilters('bedrooms', value ? Number(value) : undefined)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Any</SelectItem>
              <SelectItem value="0">Studio</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bathrooms */}
        <div>
          <Label>Bathrooms</Label>
          <Select
            value={filters.bathrooms?.toString() || ''}
            onValueChange={(value) => updateFilters('bathrooms', value ? Number(value) : undefined)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Any</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Property Types */}
        <div>
          <Label className="text-sm font-medium">Property Type</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {propertyTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={type}
                  checked={filters.propertyType?.includes(type) || false}
                  onCheckedChange={() => togglePropertyType(type)}
                />
                <Label htmlFor={type} className="text-sm capitalize">
                  {type}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div>
          <Label className="text-sm font-medium">Amenities</Label>
          <div className="grid grid-cols-1 gap-2 mt-2 max-h-40 overflow-y-auto">
            {amenitiesList.map((amenity) => (
              <div key={amenity} className="flex items-center space-x-2">
                <Checkbox
                  id={amenity}
                  checked={filters.amenities?.includes(amenity) || false}
                  onCheckedChange={() => toggleAmenity(amenity)}
                />
                <Label htmlFor={amenity} className="text-sm">
                  {amenity}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchFilters;
