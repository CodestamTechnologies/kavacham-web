import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';

export async function GET() {
  try {
    // Fetch astrologers from Firebase
    const astrologersRef = collection(db, 'astrologers');
    const querySnapshot = await getDocs(astrologersRef);
    
    const astrologers = [];
    querySnapshot.forEach((doc) => {
      astrologers.push({
        id: doc.id,
        ...doc.data()
      });
    });

    return NextResponse.json({
      success: true,
      data: astrologers
    });

  } catch (error) {
    console.error('Astrologers API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch astrologers data'
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const astrologerData = await request.json();
    
    const docRef = await addDoc(collection(db, 'astrologers'), {
      ...astrologerData,
      createdAt: serverTimestamp(),
      status: 'pending'
    });

    return NextResponse.json({
      success: true,
      message: 'Astrologer added successfully',
      id: docRef.id
    });

  } catch (error) {
    console.error('Add astrologer error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to add astrologer'
      },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const { id, ...updateData } = await request.json();
    
    await updateDoc(doc(db, 'astrologers', id), {
      ...updateData,
      updatedAt: serverTimestamp()
    });

    return NextResponse.json({
      success: true,
      message: 'Astrologer updated successfully'
    });

  } catch (error) {
    console.error('Update astrologer error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update astrologer'
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    
    await deleteDoc(doc(db, 'astrologers', id));

    return NextResponse.json({
      success: true,
      message: 'Astrologer deleted successfully'
    });

  } catch (error) {
    console.error('Delete astrologer error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete astrologer'
      },
      { status: 500 }
    );
  }
}