
export interface Property {
  id: string;
  title: string;
  description: string;
  type: 'apartment' | 'house' | 'condo' | 'studio' | 'room';
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates?: { lat: number; lng: number };
  };
  rent: number;
  deposit: number;
  bedrooms: number;
  bathrooms: number;
  area: number; // in sq ft
  amenities: string[];
  images: string[];
  landlordId: string;
  landlordName: string;
  landlordEmail: string;
  landlordPhone: string;
  availability: {
    available: boolean;
    availableFrom: string;
  };
  createdAt: string;
  updatedAt: string;
  featured?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'landlord' | 'tenant';
  profileImage?: string;
}

export interface LeaseAgreement {
  id: string;
  propertyId: string;
  landlordId: string;
  tenantId: string;
  startDate: string;
  endDate: string;
  monthlyRent: number;
  securityDeposit: number;
  terms: string;
  status: 'draft' | 'pending_approval' | 'approved' | 'signed' | 'active' | 'terminated';
  signatures: {
    landlord?: {
      signed: boolean;
      signedAt?: string;
      signature?: string;
    };
    tenant?: {
      signed: boolean;
      signedAt?: string;
      signature?: string;
    };
  };
  createdAt: string;
  updatedAt: string;
}

export interface SearchFilters {
  location?: string;
  minRent?: number;
  maxRent?: number;
  propertyType?: string[];
  bedrooms?: number;
  bathrooms?: number;
  amenities?: string[];
}

export interface ContactMessage {
  id: string;
  propertyId: string;
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  message: string;
  createdAt: string;
}

export interface FavoriteProperty {
  userId: string;
  propertyId: string;
  addedAt: string;
}
