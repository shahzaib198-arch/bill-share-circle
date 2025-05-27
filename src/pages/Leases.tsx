
import { useState, useEffect } from 'react';
import { LeaseAgreement } from '@/types/rental';
import { mockLeases } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Calendar, DollarSign, User, Download, Eye, Edit } from 'lucide-react';

const Leases = () => {
  const [leases, setLeases] = useState<LeaseAgreement[]>([]);

  useEffect(() => {
    setLeases(mockLeases);
  }, []);

  const getStatusColor = (status: LeaseAgreement['status']) => {
    switch (status) {
      case 'draft':
        return 'secondary';
      case 'pending_approval':
        return 'default';
      case 'approved':
        return 'default';
      case 'signed':
        return 'default';
      case 'active':
        return 'default';
      case 'terminated':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const getStatusText = (status: LeaseAgreement['status']) => {
    switch (status) {
      case 'draft':
        return 'Draft';
      case 'pending_approval':
        return 'Pending Approval';
      case 'approved':
        return 'Approved';
      case 'signed':
        return 'Signed';
      case 'active':
        return 'Active';
      case 'terminated':
        return 'Terminated';
      default:
        return 'Unknown';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleViewLease = (lease: LeaseAgreement) => {
    console.log('Viewing lease:', lease.id);
  };

  const handleEditLease = (lease: LeaseAgreement) => {
    console.log('Editing lease:', lease.id);
  };

  const handleDownloadLease = (lease: LeaseAgreement) => {
    console.log('Downloading lease:', lease.id);
  };

  const handleApproveLease = (lease: LeaseAgreement) => {
    console.log('Approving lease:', lease.id);
    // Update lease status
    setLeases(prev => prev.map(l => 
      l.id === lease.id ? { ...l, status: 'approved' } : l
    ));
  };

  const handleSignLease = (lease: LeaseAgreement) => {
    console.log('Signing lease:', lease.id);
    // Update lease status and signatures
    setLeases(prev => prev.map(l => 
      l.id === lease.id ? { 
        ...l, 
        status: 'signed',
        signatures: {
          ...l.signatures,
          tenant: { signed: true, signedAt: new Date().toISOString() }
        }
      } : l
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Lease Agreements</h1>
          <p className="text-lg text-gray-600">
            Manage your lease agreements, track signatures, and handle renewals.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <FileText className="w-4 h-4 mr-2" />
            Create New Lease
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Download Template
          </Button>
        </div>

        {/* Leases List */}
        {leases.length > 0 ? (
          <div className="space-y-6">
            {leases.map((lease) => (
              <Card key={lease.id} className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">
                      Lease Agreement #{lease.id}
                    </CardTitle>
                    <Badge variant={getStatusColor(lease.status)}>
                      {getStatusText(lease.status)}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Property & Tenant Info */}
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center text-sm text-gray-600 mb-1">
                          <User className="w-4 h-4 mr-1" />
                          Tenant
                        </div>
                        <div className="font-medium">Tenant ID: {lease.tenantId}</div>
                      </div>
                      
                      <div>
                        <div className="flex items-center text-sm text-gray-600 mb-1">
                          <FileText className="w-4 h-4 mr-1" />
                          Property
                        </div>
                        <div className="font-medium">Property ID: {lease.propertyId}</div>
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center text-sm text-gray-600 mb-1">
                          <Calendar className="w-4 h-4 mr-1" />
                          Start Date
                        </div>
                        <div className="font-medium">{formatDate(lease.startDate)}</div>
                      </div>
                      
                      <div>
                        <div className="flex items-center text-sm text-gray-600 mb-1">
                          <Calendar className="w-4 h-4 mr-1" />
                          End Date
                        </div>
                        <div className="font-medium">{formatDate(lease.endDate)}</div>
                      </div>
                    </div>

                    {/* Financial Info */}
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center text-sm text-gray-600 mb-1">
                          <DollarSign className="w-4 h-4 mr-1" />
                          Monthly Rent
                        </div>
                        <div className="font-medium text-green-600">
                          {formatCurrency(lease.monthlyRent)}
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center text-sm text-gray-600 mb-1">
                          <DollarSign className="w-4 h-4 mr-1" />
                          Security Deposit
                        </div>
                        <div className="font-medium">
                          {formatCurrency(lease.securityDeposit)}
                        </div>
                      </div>
                    </div>

                    {/* Signatures */}
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-gray-600 mb-2">Signatures</div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Landlord</span>
                            <Badge variant={lease.signatures.landlord?.signed ? 'default' : 'secondary'}>
                              {lease.signatures.landlord?.signed ? 'Signed' : 'Pending'}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Tenant</span>
                            <Badge variant={lease.signatures.tenant?.signed ? 'default' : 'secondary'}>
                              {lease.signatures.tenant?.signed ? 'Signed' : 'Pending'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-6 pt-6 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewLease(lease)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    
                    {lease.status === 'draft' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditLease(lease)}
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    )}
                    
                    {lease.status === 'pending_approval' && (
                      <Button
                        size="sm"
                        onClick={() => handleApproveLease(lease)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Approve
                      </Button>
                    )}
                    
                    {lease.status === 'approved' && !lease.signatures.tenant?.signed && (
                      <Button
                        size="sm"
                        onClick={() => handleSignLease(lease)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Sign Lease
                      </Button>
                    )}
                    
                    {lease.status === 'signed' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownloadLease(lease)}
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No lease agreements found
            </h3>
            <p className="text-gray-600 mb-4">
              Create your first lease agreement to get started.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <FileText className="w-4 h-4 mr-2" />
              Create New Lease
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leases;
