
import { Property, User, LeaseAgreement } from '@/types/rental';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    type: 'landlord'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 234-5678',
    type: 'tenant'
  },
  {
    id: '3',
    name: 'Mike Davis',
    email: 'mike.davis@email.com',
    phone: '+1 (555) 345-6789',
    type: 'landlord'
  }
];

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Downtown Apartment',
    description: 'Beautiful 2-bedroom apartment in the heart of downtown with stunning city views and modern amenities.',
    type: 'apartment',
    location: {
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001'
    },
    rent: 2500,
    deposit: 2500,
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    amenities: ['Air Conditioning', 'Gym', 'Pool', 'Parking', 'Laundry'],
    images: ['/placeholder.svg'],
    landlordId: '1',
    landlordName: 'John Smith',
    landlordEmail: 'john.smith@email.com',
    landlordPhone: '+1 (555) 123-4567',
    availability: {
      available: true,
      availableFrom: '2024-02-01'
    },
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    featured: true
  },
  {
    id: '2',
    title: 'Cozy Studio Apartment',
    description: 'Perfect studio apartment for young professionals. Includes all utilities and high-speed internet.',
    type: 'studio',
    location: {
      address: '456 Oak Avenue',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102'
    },
    rent: 1800,
    deposit: 1800,
    bedrooms: 0,
    bathrooms: 1,
    area: 500,
    amenities: ['WiFi', 'Utilities Included', 'Pet Friendly'],
    images: ['/placeholder.svg'],
    landlordId: '3',
    landlordName: 'Mike Davis',
    landlordEmail: 'mike.davis@email.com',
    landlordPhone: '+1 (555) 345-6789',
    availability: {
      available: true,
      availableFrom: '2024-01-25'
    },
    createdAt: '2024-01-10T14:30:00Z',
    updatedAt: '2024-01-10T14:30:00Z'
  },
  {
    id: '3',
    title: 'Luxury Family House',
    description: 'Spacious 4-bedroom house with garden, perfect for families. Located in a quiet neighborhood.',
    type: 'house',
    location: {
      address: '789 Pine Street',
      city: 'Austin',
      state: 'TX',
      zipCode: '73301'
    },
    rent: 3200,
    deposit: 3200,
    bedrooms: 4,
    bathrooms: 3,
    area: 2800,
    amenities: ['Garden', 'Garage', 'Air Conditioning', 'Fireplace'],
    images: ['/placeholder.svg'],
    landlordId: '1',
    landlordName: 'John Smith',
    landlordEmail: 'john.smith@email.com',
    landlordPhone: '+1 (555) 123-4567',
    availability: {
      available: true,
      availableFrom: '2024-03-01'
    },
    createdAt: '2024-01-12T09:15:00Z',
    updatedAt: '2024-01-12T09:15:00Z'
  }
];

export const mockLeases: LeaseAgreement[] = [
  {
    id: '1',
    propertyId: '1',
    landlordId: '1',
    tenantId: '2',
    startDate: '2024-02-01',
    endDate: '2025-02-01',
    monthlyRent: 2500,
    securityDeposit: 2500,
    terms: 'Standard lease agreement terms and conditions...',
    status: 'pending_approval',
    signatures: {
      landlord: { signed: false },
      tenant: { signed: false }
    },
    createdAt: '2024-01-20T15:00:00Z',
    updatedAt: '2024-01-20T15:00:00Z'
  }
];
