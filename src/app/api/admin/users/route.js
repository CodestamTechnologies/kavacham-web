import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';

export async function GET() {
  try {
    // Fetch users from Firebase
    const usersRef = collection(db, 'users');
    const querySnapshot = await getDocs(usersRef);
    
    const users = [];
    querySnapshot.forEach((doc) => {
      users.push({
        id: doc.id,
        ...doc.data()
      });
    });

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
    
    const docRef = await addDoc(collection(db, 'users'), {
      ...userData,
      createdAt: serverTimestamp(),
      status: 'active'
    });

    return NextResponse.json({
      success: true,
      message: 'User added successfully',
      id: docRef.id
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
    
    await updateDoc(doc(db, 'users', id), {
      ...updateData,
      updatedAt: serverTimestamp()
    });

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
    
    await deleteDoc(doc(db, 'users', id));

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