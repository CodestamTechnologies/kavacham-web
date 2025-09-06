import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';

export async function GET() {
  try {
    // In a real application, you would fetch this data from your database
    // For now, we'll return mock data that matches the structure expected by the dashboard
    
    const dashboardStats = {
      totalUsers: 1247,
      totalAstrologers: 23,
      totalVisitors: 8934,
      activeConsultations: 45,
      waitlistSignups: 567,
      monthlyGrowth: 23.5,
      recentActivities: [
        {
          id: 1,
          action: "New user registered",
          user: "Priya Sharma",
          time: "2 minutes ago",
          type: "user"
        },
        {
          id: 2,
          action: "Astrologer consultation completed",
          user: "Dr. Rajesh Kumar",
          time: "15 minutes ago",
          type: "consultation"
        },
        {
          id: 3,
          action: "New astrologer application",
          user: "Meera Patel",
          time: "1 hour ago",
          type: "astrologer"
        },
        {
          id: 4,
          action: "Waitlist signup",
          user: "Amit Singh",
          time: "2 hours ago",
          type: "waitlist"
        },
        {
          id: 5,
          action: "User profile updated",
          user: "Sunita Devi",
          time: "3 hours ago",
          type: "user"
        }
      ],
      quickStats: {
        websiteTraffic: 8900,
        consultationsToday: 23,
        averageRating: 4.8,
        monthlyRevenue: 240000
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