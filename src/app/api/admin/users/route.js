import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';

export async function GET() {
  try {
    // In a real application, you would fetch from your users collection
    // For now, returning mock data
    const users = [
      {
        id: "1",
        name: "Priya Sharma",
        email: "priya.sharma@email.com",
        phone: "+91 98765 43210",
        dateOfBirth: "1990-05-15",
        location: "Mumbai, Maharashtra",
        status: "active",
        joinedDate: "2023-06-15",
        lastActive: "2024-01-15",
        totalConsultations: 12,
        totalSpent: 6000,
        preferredLanguage: "Hindi",
        zodiacSign: "Taurus",
        profileImage: "/api/placeholder/100/100"
      },
      {
        id: "2",
        name: "Amit Singh",
        email: "amit.singh@email.com",
        phone: "+91 87654 32109",
        dateOfBirth: "1985-11-22",
        location: "Delhi, India",
        status: "active",
        joinedDate: "2023-08-10",
        lastActive: "2024-01-14",
        totalConsultations: 8,
        totalSpent: 4200,
        preferredLanguage: "English",
        zodiacSign: "Sagittarius",
        profileImage: "/api/placeholder/100/100"
      },
      {
        id: "3",
        name: "Sunita Devi",
        email: "sunita.devi@email.com",
        phone: "+91 76543 21098",
        dateOfBirth: "1978-03-08",
        location: "Jaipur, Rajasthan",
        status: "inactive",
        joinedDate: "2023-04-20",
        lastActive: "2023-12-10",
        totalConsultations: 25,
        totalSpent: 12500,
        preferredLanguage: "Hindi",
        zodiacSign: "Pisces",
        profileImage: "/api/placeholder/100/100"
      },
      {
        id: "4",
        name: "Rahul Patel",
        email: "rahul.patel@email.com",
        phone: "+91 65432 10987",
        dateOfBirth: "1992-09-30",
        location: "Ahmedabad, Gujarat",
        status: "suspended",
        joinedDate: "2023-09-05",
        lastActive: "2024-01-05",
        totalConsultations: 3,
        totalSpent: 1500,
        preferredLanguage: "Gujarati",
        zodiacSign: "Libra",
        profileImage: "/api/placeholder/100/100"
      },
      {
        id: "5",
        name: "Kavya Reddy",
        email: "kavya.reddy@email.com",
        phone: "+91 54321 09876",
        dateOfBirth: "1995-12-12",
        location: "Hyderabad, Telangana",
        status: "active",
        joinedDate: "2024-01-01",
        lastActive: "2024-01-15",
        totalConsultations: 5,
        totalSpent: 2500,
        preferredLanguage: "Telugu",
        zodiacSign: "Sagittarius",
        profileImage: "/api/placeholder/100/100"
      }
    ];

    return NextResponse.json({
      success: true,
      data: users
    });

  } catch (error) {
    console.error('Users API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch users data'
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const userData = await request.json();
    
    // In a real application, you would add to your users collection
    // const docRef = await addDoc(collection(db, 'users'), {
    //   ...userData,
    //   createdAt: serverTimestamp(),
    //   status: 'active'
    // });

    return NextResponse.json({
      success: true,
      message: 'User added successfully',
      // id: docRef.id
    });

  } catch (error) {
    console.error('Add user error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to add user'
      },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const { id, ...updateData } = await request.json();
    
    // In a real application, you would update the user document
    // await updateDoc(doc(db, 'users', id), {
    //   ...updateData,
    //   updatedAt: serverTimestamp()
    // });

    return NextResponse.json({
      success: true,
      message: 'User updated successfully'
    });

  } catch (error) {
    console.error('Update user error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update user'
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    
    // In a real application, you would delete the user document
    // await deleteDoc(doc(db, 'users', id));

    return NextResponse.json({
      success: true,
      message: 'User deleted successfully'
    });

  } catch (error) {
    console.error('Delete user error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete user'
      },
      { status: 500 }
    );
  }
}