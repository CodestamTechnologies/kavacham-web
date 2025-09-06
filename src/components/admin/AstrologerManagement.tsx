"use client";
import { useState, useEffect } from "react";
import { 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Star,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  XCircle,
  Clock,
  History
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { adminService } from "@/lib/adminService";

interface Astrologer {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string[];
  experience: number;
  rating: number;
  totalConsultations: number;
  status: 'active' | 'inactive' | 'pending';
  joinedDate: string;
  location: string;
  profileImage: string;
  languages: string[];
  consultationFee: number;
}

export default function AstrologerManagement() {
  const [astrologers, setAstrologers] = useState<Astrologer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedAstrologer, setSelectedAstrologer] = useState<Astrologer | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'view' | 'edit' | 'delete' | 'add' | 'history'>('view');
  const [formData, setFormData] = useState<Partial<Astrologer>>({});
  const [consultationHistory, setConsultationHistory] = useState<any[]>([]);

  useEffect(() => {
    const fetchAstrologers = async () => {
      try {
        setLoading(true);
        console.log("Fetching astrologers from Firebase...");
        
        // Fetch astrologers from Firebase
        const firebaseAstrologers = await adminService.getAstrologers();
        console.log("Raw Firebase astrologers data:", firebaseAstrologers);
        
        if (!firebaseAstrologers || firebaseAstrologers.length === 0) {
          console.log("No astrologers found in Firebase, using mock data");
          // Fallback to mock data if no Firebase data
          const mockAstrologers: Astrologer[] = [
            {
              id: "mock-1",
              name: "Dr. Rajesh Kumar",
              email: "rajesh.kumar@email.com",
              phone: "+91 98765 43210",
              specialization: ["Vedic Astrology", "Numerology"],
              experience: 15,
              rating: 4.8,
              totalConsultations: 1250,
              status: "active",
              joinedDate: "2023-01-15",
              location: "Mumbai, Maharashtra",
              profileImage: "/api/placeholder/100/100",
              languages: ["Hindi", "English"],
              consultationFee: 500
            },
            {
              id: "mock-2",
              name: "Meera Patel",
              email: "meera.patel@email.com",
              phone: "+91 87654 32109",
              specialization: ["Tarot Reading", "Crystal Healing"],
              experience: 8,
              rating: 4.6,
              totalConsultations: 890,
              status: "pending",
              joinedDate: "2023-03-22",
              location: "Delhi, India",
              profileImage: "/api/placeholder/100/100",
              languages: ["Hindi", "English"],
              consultationFee: 400
            }
          ];
          setAstrologers(mockAstrologers);
          setLoading(false);
          return;
        }
        
        // Transform Firebase data to match our Astrologer interface
        const transformedAstrologers: Astrologer[] = firebaseAstrologers.map((astrologer: any) => {
          console.log("Processing astrologer:", astrologer);
          
          return {
            id: astrologer.id || Math.random().toString(36).substr(2, 9),
            name: astrologer.name || astrologer.displayName || astrologer.fullName || 'Unknown Astrologer',
            email: astrologer.email || '',
            phone: astrologer.phone || astrologer.phoneNumber || astrologer.mobile || '',
            specialization: Array.isArray(astrologer.specialization) 
              ? astrologer.specialization 
              : Array.isArray(astrologer.specializations)
              ? astrologer.specializations
              : Array.isArray(astrologer.expertise)
              ? astrologer.expertise
              : typeof astrologer.specialization === 'string'
              ? [astrologer.specialization]
              : ['General Astrology'],
            experience: Number(astrologer.experience || astrologer.yearsOfExperience || astrologer.experienceYears || 0),
            rating: Number(astrologer.rating || astrologer.averageRating || astrologer.starRating || 0),
            totalConsultations: Number(astrologer.totalConsultations || astrologer.consultationCount || astrologer.totalSessions || 0),
            status: (astrologer.status === 'active' || astrologer.status === 'inactive' || astrologer.status === 'pending') 
              ? astrologer.status 
              : astrologer.isActive === true 
              ? 'active' 
              : astrologer.isActive === false 
              ? 'inactive' 
              : 'pending',
            joinedDate: astrologer.createdAt 
              ? (astrologer.createdAt.toDate ? astrologer.createdAt.toDate().toISOString().split('T')[0] : astrologer.createdAt) 
              : astrologer.joinedDate || astrologer.registrationDate || new Date().toISOString().split('T')[0],
            location: astrologer.location || astrologer.address || astrologer.city || astrologer.state || 'Unknown Location',
            profileImage: astrologer.profileImage || astrologer.photoURL || astrologer.avatar || astrologer.image || "/api/placeholder/100/100",
            languages: Array.isArray(astrologer.languages) 
              ? astrologer.languages 
              : Array.isArray(astrologer.spokenLanguages)
              ? astrologer.spokenLanguages
              : typeof astrologer.languages === 'string'
              ? [astrologer.languages]
              : ['English'],
            consultationFee: Number(astrologer.consultationFee || astrologer.fee || astrologer.price || astrologer.charges || 0)
          };
        });
        
        console.log("Transformed astrologers:", transformedAstrologers);
        setAstrologers(transformedAstrologers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching astrologers:", error);
        setLoading(false);
        
        // Fallback to mock data on error
        const mockAstrologers: Astrologer[] = [
          {
            id: "error-fallback-1",
            name: "Sample Astrologer (Error Fallback)",
            email: "sample@email.com",
            phone: "+91 12345 67890",
            specialization: ["Vedic Astrology"],
            experience: 5,
            rating: 4.0,
            totalConsultations: 100,
            status: "active",
            joinedDate: "2024-01-01",
            location: "Sample City",
            profileImage: "/api/placeholder/100/100",
            languages: ["English"],
            consultationFee: 300
          }
        ];
        setAstrologers(mockAstrologers);
      }
    };

    fetchAstrologers();
  }, []);

  const filteredAstrologers = astrologers.filter(astrologer => {
    const matchesSearch = astrologer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         astrologer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         astrologer.specialization.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filterStatus === "all" || astrologer.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const handleAction = (astrologer: Astrologer, action: 'view' | 'edit' | 'delete' | 'history') => {
    setSelectedAstrologer(astrologer);
    setModalType(action);
    if (action === 'edit') {
      setFormData({
        name: astrologer.name,
        email: astrologer.email,
        phone: astrologer.phone,
        specialization: astrologer.specialization,
        experience: astrologer.experience,
        location: astrologer.location,
        languages: astrologer.languages,
        consultationFee: astrologer.consultationFee,
        status: astrologer.status
      });
    } else if (action === 'history') {
      // Simulate fetching consultation history for this astrologer
      const mockHistory = [
        {
          id: "1",
          userName: "Priya Sharma",
          userEmail: "priya.sharma@email.com",
          consultationDate: "2024-01-15",
          consultationType: "Vedic Astrology",
          duration: "45 minutes",
          fee: 500,
          rating: 5,
          status: "completed"
        },
        {
          id: "2",
          userName: "Amit Kumar",
          userEmail: "amit.kumar@email.com",
          consultationDate: "2024-01-10",
          consultationType: "Career Guidance",
          duration: "30 minutes",
          fee: 400,
          rating: 4,
          status: "completed"
        }
      ];
      setConsultationHistory(mockHistory);
    }
    setShowModal(true);
  };

  const handleAddNew = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      specialization: [],
      experience: 0,
      location: '',
      languages: [],
      consultationFee: 0,
      status: 'pending',
      rating: 0,
      totalConsultations: 0
    });
    setModalType('add');
    setShowModal(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (modalType === 'add') {
      // Generate new ID
      const newId = (astrologers.length + 1).toString();
      const newAstrologer: Astrologer = {
        ...formData as Astrologer,
        id: newId,
        joinedDate: new Date().toISOString().split('T')[0],
        profileImage: "/api/placeholder/100/100",
        rating: 0,
        totalConsultations: 0
      };
      
      setAstrologers([...astrologers, newAstrologer]);
      setShowModal(false);
      setFormData({});
    } else if (modalType === 'edit' && selectedAstrologer) {
      // Update existing astrologer
      const updatedAstrologers = astrologers.map(astrologer => 
        astrologer.id === selectedAstrologer.id 
          ? { ...astrologer, ...formData }
          : astrologer
      );
      
      setAstrologers(updatedAstrologers);
      setShowModal(false);
      setFormData({});
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayInputChange = (field: string, value: string) => {
    const arrayValue = value.split(',').map(item => item.trim()).filter(item => item);
    setFormData(prev => ({
      ...prev,
      [field]: arrayValue
    }));
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: "bg-gray-100 text-gray-800", icon: CheckCircle },
      inactive: { color: "bg-gray-200 text-gray-600", icon: XCircle },
      pending: { color: "bg-gray-300 text-gray-700", icon: Clock }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <Icon size={12} />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Astrologer Management</h1>
          <p className="text-gray-600 mt-1">Manage and monitor all registered astrologers</p>
        </div>
        <button 
          onClick={handleAddNew}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all"
        >
          <Plus size={20} />
          Add New Astrologer
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-lg bg-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-gray-700" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold text-gray-900">{astrologers.filter(a => a.status === 'active').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg bg-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{astrologers.filter(a => a.status === 'pending').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg bg-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-300 rounded-lg flex items-center justify-center">
                <XCircle className="w-6 h-6 text-gray-700" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Inactive</p>
                <p className="text-2xl font-bold text-gray-900">{astrologers.filter(a => a.status === 'inactive').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg bg-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold text-gray-900">
                  {astrologers.length > 0 
                    ? (astrologers.reduce((sum, a) => sum + a.rating, 0) / astrologers.length).toFixed(1)
                    : '0.0'
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="border-0 shadow-lg bg-white">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search astrologers by name, email, or specialization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Astrologers List */}
      <Card className="border-0 shadow-lg bg-white">
        <CardHeader>
          <CardTitle className="text-gray-900">All Astrologers ({filteredAstrologers.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Astrologer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialization</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAstrologers.map((astrologer) => (
                  <tr key={astrologer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center text-white font-medium">
                            {astrologer.name.charAt(0)}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{astrologer.name}</div>
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <MapPin size={12} />
                            {astrologer.location}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 flex items-center gap-1">
                        <Mail size={12} />
                        {astrologer.email}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <Phone size={12} />
                        {astrologer.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {astrologer.specialization.slice(0, 2).map((spec, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {spec}
                          </span>
                        ))}
                        {astrologer.specialization.length > 2 && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-700">
                            +{astrologer.specialization.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{astrologer.experience} years</div>
                      <div className="text-sm text-gray-500">{astrologer.totalConsultations} consultations</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-gray-400 fill-current" />
                        <span className="ml-1 text-sm text-gray-900">{astrologer.rating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(astrologer.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleAction(astrologer, 'view')}
                          className="text-gray-600 hover:text-gray-900 p-1 rounded"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleAction(astrologer, 'edit')}
                          className="text-gray-600 hover:text-gray-900 p-1 rounded"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleAction(astrologer, 'history')}
                          className="text-gray-600 hover:text-gray-900 p-1 rounded"
                        >
                          <History size={16} />
                        </button>
                        <button
                          onClick={() => handleAction(astrologer, 'delete')}
                          className="text-gray-600 hover:text-gray-900 p-1 rounded"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-4 p-4">
            {filteredAstrologers.map((astrologer) => (
              <div key={astrologer.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-gray-800 flex items-center justify-center text-white font-medium">
                      {astrologer.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{astrologer.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <MapPin size={12} />
                        {astrologer.location}
                      </div>
                    </div>
                  </div>
                  {getStatusBadge(astrologer.status)}
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail size={14} />
                    <span className="truncate">{astrologer.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone size={14} />
                    <span>{astrologer.phone}</span>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex flex-wrap gap-1">
                    {astrologer.specialization.slice(0, 3).map((spec, index) => (
                      <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {spec}
                      </span>
                    ))}
                    {astrologer.specialization.length > 3 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-700">
                        +{astrologer.specialization.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                  <div>
                    <span className="text-gray-500">Experience:</span>
                    <div className="font-medium">{astrologer.experience} years</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Rating:</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-gray-400 fill-current" />
                      <span className="font-medium">{astrologer.rating}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">Consultations:</span>
                    <div className="font-medium">{astrologer.totalConsultations}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Fee:</span>
                    <div className="font-medium">₹{astrologer.consultationFee}</div>
                  </div>
                </div>

                <div className="flex justify-end gap-1 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => handleAction(astrologer, 'view')}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                    title="View"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => handleAction(astrologer, 'edit')}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                    title="Edit"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleAction(astrologer, 'history')}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                    title="History"
                  >
                    <History size={16} />
                  </button>
                  <button
                    onClick={() => handleAction(astrologer, 'delete')}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Modal */}
      {showModal && (modalType === 'add' || selectedAstrologer) && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  {modalType === 'add' ? 'Add New Astrologer' : 
                   modalType === 'view' ? 'View Astrologer' : 
                   modalType === 'edit' ? 'Edit Astrologer' : 
                   modalType === 'history' ? `Consultation History - ${selectedAstrologer?.name}` : 'Delete Astrologer'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle size={24} />
                </button>
              </div>
              
              {(modalType === 'add' || modalType === 'edit') && (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name || ''}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        placeholder="Enter astrologer name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email || ''}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        placeholder="Enter email address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone || ''}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Experience (Years) *</label>
                      <input
                        type="number"
                        required
                        min="0"
                        value={formData.experience || ''}
                        onChange={(e) => handleInputChange('experience', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        placeholder="Years of experience"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                      <input
                        type="text"
                        required
                        value={formData.location || ''}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        placeholder="Enter location"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Consultation Fee (₹) *</label>
                      <input
                        type="number"
                        required
                        min="0"
                        value={formData.consultationFee || ''}
                        onChange={(e) => handleInputChange('consultationFee', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        placeholder="Consultation fee"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Specializations *</label>
                    <input
                      type="text"
                      required
                      value={Array.isArray(formData.specialization) ? formData.specialization.join(', ') : ''}
                      onChange={(e) => handleArrayInputChange('specialization', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      placeholder="Enter specializations separated by commas (e.g., Vedic Astrology, Numerology)"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Languages *</label>
                    <input
                      type="text"
                      required
                      value={Array.isArray(formData.languages) ? formData.languages.join(', ') : ''}
                      onChange={(e) => handleArrayInputChange('languages', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      placeholder="Enter languages separated by commas (e.g., Hindi, English)"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={formData.status || 'pending'}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    >
                      <option value="pending">Pending</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                  
                  <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800 transition-all"
                    >
                      {modalType === 'add' ? 'Add Astrologer' : 'Update Astrologer'}
                    </button>
                  </div>
                </form>
              )}

              {modalType === 'view' && selectedAstrologer && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedAstrologer.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedAstrologer.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedAstrologer.phone}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Experience</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedAstrologer.experience} years</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Location</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedAstrologer.location}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Consultation Fee</label>
                      <p className="mt-1 text-sm text-gray-900">₹{selectedAstrologer.consultationFee}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Rating</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedAstrologer.rating}/5</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Total Consultations</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedAstrologer.totalConsultations}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Joined Date</label>
                      <p className="mt-1 text-sm text-gray-900">{new Date(selectedAstrologer.joinedDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <div className="mt-1">{getStatusBadge(selectedAstrologer.status)}</div>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700">Specializations</label>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {selectedAstrologer.specialization.map((spec, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700">Languages</label>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {selectedAstrologer.languages.map((lang, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {modalType === 'delete' && selectedAstrologer && (
                <div className="text-center">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 mb-4">
                    <Trash2 className="h-6 w-6 text-gray-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Astrologer</h3>
                  <p className="text-sm text-gray-500 mb-6">
                    Are you sure you want to delete {selectedAstrologer.name}? This action cannot be undone.
                  </p>
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        // Handle delete logic here
                        const updatedAstrologers = astrologers.filter(a => a.id !== selectedAstrologer.id);
                        setAstrologers(updatedAstrologers);
                        setShowModal(false);
                      }}
                      className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}

              {modalType === 'history' && selectedAstrologer && (
                <div className="space-y-4">
                  <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-gray-800 flex items-center justify-center text-white font-medium">
                        {selectedAstrologer.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{selectedAstrologer.name}</h3>
                        <p className="text-sm text-gray-600">Total Consultations: {consultationHistory.length}</p>
                      </div>
                    </div>
                  </div>

                  {consultationHistory.length > 0 ? (
                    <div className="space-y-3">
                      {consultationHistory.map((consultation) => (
                        <div key={consultation.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-white text-sm font-medium">
                                {consultation.userName.charAt(0)}
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">{consultation.userName}</h4>
                                <p className="text-sm text-gray-500">{consultation.userEmail}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={14}
                                  className={i < consultation.rating ? "text-gray-400 fill-current" : "text-gray-300"}
                                />
                              ))}
                              <span className="ml-1 text-sm text-gray-600">({consultation.rating})</span>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Date:</span>
                              <div className="font-medium">{new Date(consultation.consultationDate).toLocaleDateString()}</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Type:</span>
                              <div className="font-medium">{consultation.consultationType}</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Duration:</span>
                              <div className="font-medium">{consultation.duration}</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Fee Earned:</span>
                              <div className="font-medium">₹{consultation.fee}</div>
                            </div>
                          </div>
                          
                          <div className="mt-2 flex justify-end">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              <CheckCircle size={12} className="mr-1" />
                              {consultation.status.charAt(0).toUpperCase() + consultation.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <History className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No consultation history</h3>
                      <p className="mt-1 text-sm text-gray-500">This astrologer hasn't completed any consultations yet.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}