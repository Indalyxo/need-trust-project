import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { donations } from '@/drizzle/schema';
import { desc } from 'drizzle-orm';

export async function GET() {
  try {
    const allDonations = await db.select().from(donations).orderBy(desc(donations.createdAt));
    return NextResponse.json(allDonations);
  } catch (error) {
    console.error('Error fetching donations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch donations' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, amount, panCard, transactionId, proofImageUrl } = body;

    if (!fullName || !email || !amount || !panCard || !transactionId || !proofImageUrl) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate amount is a positive number
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      return NextResponse.json(
        { error: 'Invalid donation amount' },
        { status: 400 }
      );
    }

    const newDonation = await db.insert(donations).values({
      fullName,
      email,
      amount,
      panCard,
      transactionId,
      proofImageUrl,
      status: 'pending'
    }).returning();

    return NextResponse.json(newDonation[0], { status: 201 });
  } catch (error) {
    console.error('Error creating donation:', error);
    return NextResponse.json(
      { error: 'Failed to create donation' },
      { status: 500 }
    );
  }
}