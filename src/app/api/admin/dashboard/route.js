import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';

export async function GET() {
  try {
    // Fetch real data from Firebase collections
    const [usersSnapshot, astrologersSnapshot, waitlistSnapshot] = await Promise.all([
      getDocs(collection(db, 'users')),
      getDocs(collection(db, 'astrologers')),
      getDocs(collection(db, 'waitlist'))
    ]);

    const totalUsers = usersSnapshot.size;
    const totalAstrologers = astrologersSnapshot.size;
    const waitlistSignups = waitlistSnapshot.size;

    // Get recent activities from waitlist (most recent signups)
    const recentActivities = [];
    const recentWaitlistQuery = query(
      collection(db, 'waitlist'),
      orderBy('joinedAt', 'desc'),
      limit(5)
    );
    const recentWaitlistSnapshot = await getDocs(recentWaitlistQuery);
    
    recentWaitlistSnapshot.forEach((doc, index) => {
      const data = doc.data();
      recentActivities.push({
        id: index + 1,
        action: "Waitlist signup",
        user: data.email,
        time: data.joinedAt ? new Date(data.joinedAt.toDate()).toLocaleString() : "Recently",
        type: "waitlist"
      });
    });

    const dashboardStats = {
      totalUsers,
      totalAstrologers,
      totalVisitors: 0, // This would need to be tracked separately
      activeConsultations: 0, // This would need a consultations collection
      waitlistSignups,
      monthlyGrowth: 0, // This would need historical data calculation
      recentActivities,
      quickStats: {
        websiteTraffic: 0, // This would need analytics integration
        consultationsToday: 0, // This would need a consultations collection
        averageRating: 0, // This would need ratings data
        monthlyRevenue: 0 // This would need payment/revenue tracking
      }
    };

    return NextResponse.json({
      success: true,
      data: dashboardStats
    });

  } catch (error) {
    console.error('Dashboard API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch dashboard data'
      },
      { status: 500 }
    );
  }
}