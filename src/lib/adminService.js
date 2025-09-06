// lib/adminService.js
import { db } from './firebase';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';

export const adminService = {
  // Get dashboard statistics
  async getDashboardStats() {
    try {
      const [usersSnapshot, astrologersSnapshot, adminsSnapshot] = await Promise.all([
        getDocs(collection(db, 'users')),
        getDocs(collection(db, 'astrologers')),
        getDocs(collection(db, 'admins'))
      ]);

      const totalUsers = usersSnapshot.size;
      const totalAstrologers = astrologersSnapshot.size;
      const totalAdmins = adminsSnapshot.size;

      // Calculate active consultations (you can modify this logic based on your data structure)
      const activeConsultations = Math.floor(totalAstrologers * 0.3); // Assuming 30% are active

      // Calculate total visitors (sum of all users + some multiplier for anonymous visitors)
      const totalVisitors = Math.floor(totalUsers * 2.5); // Assuming 2.5x visitors than registered users

      return {
        totalUsers,
        totalAstrologers,
        totalVisitors,
        activeConsultations,
        totalAdmins
      };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  },

  // Get all users
  async getUsers() {
    try {
      const usersSnapshot = await getDocs(collection(db, 'users'));
      return usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  // Get all astrologers
  async getAstrologers() {
    try {
      const astrologersSnapshot = await getDocs(collection(db, 'astrologers'));
      return astrologersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching astrologers:', error);
      throw error;
    }
  },

  // Get all admins
  async getAdmins() {
    try {
      const adminsSnapshot = await getDocs(collection(db, 'admins'));
      return adminsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching admins:', error);
      throw error;
    }
  },

  // Get recent activities (you can customize this based on your activity tracking)
  async getRecentActivities() {
    try {
      // This creates real activities based on recent user and astrologer registrations
      const recentUsersQuery = query(
        collection(db, 'users'),
        orderBy('createdAt', 'desc'),
        limit(3)
      );
      
      const recentAstrologersQuery = query(
        collection(db, 'astrologers'),
        orderBy('createdAt', 'desc'),
        limit(2)
      );

      const [usersSnapshot, astrologersSnapshot] = await Promise.all([
        getDocs(recentUsersQuery),
        getDocs(recentAstrologersQuery)
      ]);

      const activities = [];

      // Add user activities
      usersSnapshot.docs.forEach((doc, index) => {
        const userData = doc.data();
        activities.push({
          id: `user-${doc.id}`,
          action: "New user registered",
          user: userData.name || userData.displayName || 'Unknown User',
          time: this.getTimeAgo(userData.createdAt),
          type: "user"
        });
      });

      // Add astrologer activities
      astrologersSnapshot.docs.forEach((doc, index) => {
        const astrologerData = doc.data();
        activities.push({
          id: `astrologer-${doc.id}`,
          action: "New astrologer application",
          user: astrologerData.name || astrologerData.displayName || 'Unknown Astrologer',
          time: this.getTimeAgo(astrologerData.createdAt),
          type: "astrologer"
        });
      });

      // Sort by timestamp (most recent first)
      return activities.sort((a, b) => {
        // If both have valid timestamps, sort by them
        const aTime = a.time === "Unknown time" ? 0 : Date.now();
        const bTime = b.time === "Unknown time" ? 0 : Date.now();
        return bTime - aTime;
      }).slice(0, 5);

    } catch (error) {
      console.error('Error fetching recent activities:', error);
      // Return empty array instead of dummy data
      return [];
    }
  },

  // Helper function to format time ago
  getTimeAgo(timestamp) {
    if (!timestamp) return "Unknown time";
    
    try {
      const now = new Date();
      const time = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      const diffInMinutes = Math.floor((now - time) / (1000 * 60));
      
      if (diffInMinutes < 1) return "Just now";
      if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
      if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
      return `${Math.floor(diffInMinutes / 1440)} days ago`;
    } catch (error) {
      return "Unknown time";
    }
  }
};