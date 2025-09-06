"use client";
import { useState, useEffect } from "react";
import { 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  MoreVertical,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  Activity,
  History
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { adminService } from "@/lib/adminService";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  location: string;
  status: 'active' | 'inactive' | 'suspended';
  joinedDate: string;
  lastActive: string;
  totalConsultations: number;
  totalSpent: number;
  preferredLanguage: string;
  zodiacSign: string;
  profileImage: string;
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'view' | 'edit' | 'delete' | 'add' | 'history'>('view');
  const [formData, setFormData] = useState<Partial<User>>({});
  const [consultationHistory, setConsultationHistory] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        
        // Fetch users from Firebase
        const firebaseUsers = await adminService.getUsers();
        
        // Transform Firebase data to match our User interface
        const transformedUsers: User[] = firebaseUsers.map((user: any) => ({
          id: user.id,
          name: user.name || user.displayName || user.fullName || 'Unknown User',
          email: user.email || '',
          phone: user.phone || user.phoneNumber || user.mobile || '',
          dateOfBirth: user.dateOfBirth || user.birthDate || user.dob || '1990-01-01',
          location: user.location || user.address || user.city || user.state || 'Unknown Location',
          status: (user.status === 'active' || user.status === 'inactive' || user.status === 'suspended') 
            ? user.status 
            : user.isActive === true 
            ? 'active' 
            : user.isActive === false 
            ? 'inactive' 
            : 'active',
          joinedDate: user.createdAt 
            ? (user.createdAt.toDate ? user.createdAt.toDate().toISOString().split('T')[0] : user.createdAt) 
            : user.joinedDate || user.registrationDate || new Date().toISOString().split('T')[0],
          lastActive: user.lastActive 
            ? (user.lastActive.toDate ? user.lastActive.toDate().toISOString().split('T')[0] : user.lastActive) 
            : user.lastLoginDate || new Date().toISOString().split('T')[0],
          totalConsultations: Number(user.totalConsultations || user.consultationCount || user.sessions || 0),
          totalSpent: Number(user.totalSpent || user.totalAmount || user.amountSpent || 0),
          preferredLanguage: user.preferredLanguage || user.language || user.primaryLanguage || 'English',
          zodiacSign: user.zodiacSign || user.sign || user.astroSign || 'Unknown',
          profileImage: user.profileImage || user.photoURL || user.avatar || user.image || "/api/placeholder/100/100"
        }));
        
        setUsers(transformedUsers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
        
        // Set fallback empty array if Firebase fails
        setUsers([]);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm) ||
                         user.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === "all" || user.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const handleAction = (user: User, action: 'view' | 'edit' | 'delete' | 'history') => {
    setSelectedUser(user);
    setModalType(action);
    if (action === 'edit') {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        dateOfBirth: user.dateOfBirth,
        location: user.location,
        preferredLanguage: user.preferredLanguage,
        zodiacSign: user.zodiacSign,
        status: user.status
      });
    } else if (action === 'history') {
      // In a real application, you would fetch consultation history from Firebase
      // For now, set empty array - this would be replaced with actual data fetching
      setConsultationHistory([]);
    }
    setShowModal(true);
  };

  const handleAddNew = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      location: '',
      status: 'active',
      preferredLanguage: '',
      zodiacSign: '',
      totalConsultations: 0,
      totalSpent: 0
    });
    setModalType('add');
    setShowModal(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (modalType === 'add') {
      // Generate new ID
      const newId = (users.length + 1).toString();
      const newUser: User = {
        ...formData as User,
        id: newId,
        joinedDate: new Date().toISOString().split('T')[0],
        lastActive: new Date().toISOString().split('T')[0],
        profileImage: "/api/placeholder/100/100",
        totalConsultations: 0,
        totalSpent: 0
      };
      
      setUsers([...users, newUser]);
      setShowModal(false);
      setFormData({});
    } else if (modalType === 'edit' && selectedUser) {
      // Update existing user
      const updatedUsers = users.map(user => 
        user.id === selectedUser.id 
          ? { ...user, ...formData }
          : user
      );
      
      setUsers(updatedUsers);
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

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: "bg-gray-100 text-gray-800", icon: CheckCircle },
      inactive: { color: "bg-gray-200 text-gray-600", icon: Clock },
      suspended: { color: "bg-gray-300 text-gray-700", icon: XCircle }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <Icon size={12} />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
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
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">Manage and monitor all registered users</p>
        </div>
        <button 
          onClick={handleAddNew}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all"
        >
          <Plus size={20} />
          Add New User
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
                <p className="text-sm text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-gray-900">{users.filter(u => u.status === 'active').length}</p>
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
                <p className="text-sm text-gray-600">Inactive</p>
                <p className="text-2xl font-bold text-gray-900">{users.filter(u => u.status === 'inactive').length}</p>
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
                <p className="text-sm text-gray-600">Suspended</p>
                <p className="text-2xl font-bold text-gray-900">{users.filter(u => u.status === 'suspended').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg bg-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">₹{users.reduce((sum, u) => sum + u.totalSpent, 0).toLocaleString()}</p>
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
                placeholder="Search users by name, email, phone, or location..."
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
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users List - Responsive Design */}
      <Card className="border-0 shadow-lg bg-white">
        <CardHeader>
          <CardTitle className="text-gray-900">All Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Spending</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center text-white font-medium">
                            {user.name.charAt(0)}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <MapPin size={12} />
                            {user.location}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 flex items-center gap-1">
                        <Mail size={12} />
                        {user.email}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <Phone size={12} />
                        {user.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Age: {calculateAge(user.dateOfBirth)}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <Star size={12} />
                        {user.zodiacSign}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Joined: {new Date(user.joinedDate).toLocaleDateString()}</div>
                      <div className="text-sm text-gray-500">Last active: {new Date(user.lastActive).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">₹{user.totalSpent.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">{user.totalConsultations} consultations</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(user.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleAction(user, 'view')}
                          className="text-gray-600 hover:text-gray-900 p-1 rounded"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleAction(user, 'edit')}
                          className="text-gray-600 hover:text-gray-900 p-1 rounded"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleAction(user, 'history')}
                          className="text-gray-600 hover:text-gray-900 p-1 rounded"
                        >
                          <History size={16} />
                        </button>
                        <button
                          onClick={() => handleAction(user, 'delete')}
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
            {filteredUsers.map((user) => (
              <div key={user.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-gray-800 flex items-center justify-center text-white font-medium">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{user.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <MapPin size={12} />
                        {user.location}
                      </div>
                    </div>
                  </div>
                  {getStatusBadge(user.status)}
                </div>

                {/* Contact Info */}
                <div className="space-y-2 mb-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail size={14} />
                    <span className="truncate">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone size={14} />
                    <span>{user.phone}</span>
                  </div>
                </div>

                {/* User Details */}
                <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                  <div>
                    <span className="text-gray-500">Age:</span>
                    <div className="font-medium">{calculateAge(user.dateOfBirth)} years</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Zodiac:</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{user.zodiacSign}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">Language:</span>
                    <div className="font-medium">{user.preferredLanguage}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Total Spent:</span>
                    <div className="font-medium">₹{user.totalSpent.toLocaleString()}</div>
                  </div>
                </div>

                {/* Activity Stats */}
                <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                  <div>
                    <span className="text-gray-500">Consultations:</span>
                    <div className="font-medium">{user.totalConsultations}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Joined:</span>
                    <div className="font-medium">{new Date(user.joinedDate).toLocaleDateString()}</div>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-500">Last Active:</span>
                    <div className="font-medium">{new Date(user.lastActive).toLocaleDateString()}</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-1 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => handleAction(user, 'view')}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                    title="View"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => handleAction(user, 'edit')}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                    title="Edit"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleAction(user, 'history')}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                    title="History"
                  >
                    <History size={16} />
                  </button>
                  <button
                    onClick={() => handleAction(user, 'delete')}
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
      {showModal && (modalType === 'add' || selectedUser) && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  {modalType === 'add' ? 'Add New User' : 
                   modalType === 'view' ? 'View User' : 
                   modalType === 'edit' ? 'Edit User' : 
                   modalType === 'history' ? `Consultation History - ${selectedUser?.name}` : 'Delete User'}
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
                        placeholder="Enter user name"
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
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
                      <input
                        type="date"
                        required
                        value={formData.dateOfBirth || ''}
                        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-transparent"
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
                      <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Language *</label>
                      <select
                        required
                        value={formData.preferredLanguage || ''}
                        onChange={(e) => handleInputChange('preferredLanguage', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      >
                        <option value="">Select Language</option>
                        <option value="Hindi">Hindi</option>
                        <option value="English">English</option>
                        <option value="Bengali">Bengali</option>
                        <option value="Telugu">Telugu</option>
                        <option value="Marathi">Marathi</option>
                        <option value="Tamil">Tamil</option>
                        <option value="Gujarati">Gujarati</option>
                        <option value="Kannada">Kannada</option>
                        <option value="Malayalam">Malayalam</option>
                        <option value="Punjabi">Punjabi</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Zodiac Sign *</label>
                    <select
                      required
                      value={formData.zodiacSign || ''}
                      onChange={(e) => handleInputChange('zodiacSign', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    >
                      <option value="">Select Zodiac Sign</option>
                      <option value="Aries">Aries</option>
                      <option value="Taurus">Taurus</option>
                      <option value="Gemini">Gemini</option>
                      <option value="Cancer">Cancer</option>
                      <option value="Leo">Leo</option>
                      <option value="Virgo">Virgo</option>
                      <option value="Libra">Libra</option>
                      <option value="Scorpio">Scorpio</option>
                      <option value="Sagittarius">Sagittarius</option>
                      <option value="Capricorn">Capricorn</option>
                      <option value="Aquarius">Aquarius</option>
                      <option value="Pisces">Pisces</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={formData.status || 'active'}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="suspended">Suspended</option>
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
                      {modalType === 'add' ? 'Add User' : 'Update User'}
                    </button>
                  </div>
                </form>
              )}

              {modalType === 'view' && selectedUser && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedUser.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedUser.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedUser.phone}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Age</label>
                      <p className="mt-1 text-sm text-gray-900">{calculateAge(selectedUser.dateOfBirth)} years</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Location</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedUser.location}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Zodiac Sign</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedUser.zodiacSign}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Preferred Language</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedUser.preferredLanguage}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Total Spent</label>
                      <p className="mt-1 text-sm text-gray-900">₹{selectedUser.totalSpent.toLocaleString()}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Total Consultations</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedUser.totalConsultations}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Joined Date</label>
                      <p className="mt-1 text-sm text-gray-900">{new Date(selectedUser.joinedDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Last Active</label>
                      <p className="mt-1 text-sm text-gray-900">{new Date(selectedUser.lastActive).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <div className="mt-1">{getStatusBadge(selectedUser.status)}</div>
                    </div>
                  </div>
                </div>
              )}
              
              {modalType === 'delete' && selectedUser && (
                <div className="text-center">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 mb-4">
                    <Trash2 className="h-6 w-6 text-gray-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Delete User</h3>
                  <p className="text-sm text-gray-500 mb-6">
                    Are you sure you want to delete {selectedUser.name}? This action cannot be undone.
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
                        setShowModal(false);
                      }}
                      className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}

              {modalType === 'history' && selectedUser && (
                <div className="space-y-4">
                  <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-gray-800 flex items-center justify-center text-white font-medium">
                        {selectedUser.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{selectedUser.name}</h3>
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
                                {consultation.astrologerName.charAt(0)}
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">{consultation.astrologerName}</h4>
                                <p className="text-sm text-gray-500">{consultation.astrologerEmail}</p>
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
                              <span className="text-gray-500">Fee Paid:</span>
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
                      <p className="mt-1 text-sm text-gray-500">This user hasn't completed any consultations yet.</p>
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