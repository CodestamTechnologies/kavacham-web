"use client";
import { useState, useEffect } from "react";
import { 
  Users, 
  Star, 
  Eye, 
  TrendingUp, 
  Calendar,
  Mail,
  Phone,
  Globe,
  Activity,
  BarChart3,
  PieChart
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { adminService } from "@/lib/adminService";

interface DashboardStats {
  totalUsers: number;
  totalAstrologers: number;
  totalVisitors: number;
  activeConsultations: number;
  totalAdmins: number;
}

interface RecentActivity {
  id: string;
  action: string;
  user: string;
  time: string;
  type: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalAstrologers: 0,
    totalVisitors: 0,
    activeConsultations: 0,
    totalAdmins: 0
  });

  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch dashboard statistics from Firebase
        const dashboardStats = await adminService.getDashboardStats();
        setStats(dashboardStats);

        // Fetch recent activities from Firebase
        const activities = await adminService.getRecentActivities();
        setRecentActivities(activities);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setError("Failed to load dashboard data. Please try again.");
        setLoading(false);
        
        // Set fallback data in case of error
        setStats({
          totalUsers: 0,
          totalAstrologers: 0,
          totalVisitors: 0,
          activeConsultations: 0,
          totalAdmins: 0
        });
        setRecentActivities([
          { id: "1", action: "System initialized", user: "System", time: "Just now", type: "system" }
        ]);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      bgColor: "bg-gray-100",
      change: "+12%",
      changeType: "positive"
    },
    {
      title: "Total Astrologers",
      value: stats.totalAstrologers,
      icon: Star,
      bgColor: "bg-gray-200",
      change: "+8%",
      changeType: "positive"
    },
    {
      title: "Total Visitors",
      value: stats.totalVisitors,
      icon: Eye,
      bgColor: "bg-gray-300",
      change: "+25%",
      changeType: "positive"
    },
    {
      title: "Active Consultations",
      value: stats.activeConsultations,
      icon: Activity,
      bgColor: "bg-gray-800",
      change: "+5%",
      changeType: "positive"
    }
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-gray-900 text-lg font-semibold mb-2">Error Loading Dashboard</div>
            <p className="text-gray-600">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with Kavacham today.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar size={16} />
          <span>{new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value.toLocaleString()}</p>
                    <div className="flex items-center mt-2">
                      <span className="text-sm font-medium text-gray-700">
                        {stat.change}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">vs last month</span>
                    </div>
                  </div>
                  <div className={`w-16 h-16 rounded-2xl ${stat.bgColor} flex items-center justify-center`}>
                    <Icon size={24} className={`${stat.bgColor === 'bg-gray-800' ? 'text-white' : 'text-gray-700'}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts and Activities Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <Activity className="w-5 h-5 text-gray-700" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'user' ? 'bg-gray-600' :
                    activity.type === 'astrologer' ? 'bg-gray-700' :
                    activity.type === 'consultation' ? 'bg-gray-800' :
                    'bg-gray-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.user} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <BarChart3 className="w-5 h-5 text-gray-700" />
              Quick Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-900">Website Traffic</span>
                </div>
                <span className="text-lg font-bold text-gray-900">{(stats.totalVisitors / 1000).toFixed(1)}K</span>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-100">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-900">Active Consultations</span>
                </div>
                <span className="text-lg font-bold text-gray-900">{stats.activeConsultations}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-200">
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-900">Total Astrologers</span>
                </div>
                <span className="text-lg font-bold text-gray-900">{stats.totalAstrologers}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-white" />
                  <span className="font-medium text-white">Total Users</span>
                </div>
                <span className="text-lg font-bold text-white">{stats.totalUsers}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}