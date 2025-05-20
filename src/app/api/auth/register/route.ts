import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { username, email, discordUsername, password, pin, key } = await req.json();

    // Validate required fields
    if (!username || !email || !discordUsername || !password || !pin || !key) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username },
          { email },
          { discordUsername }
        ]
      }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password and PIN
    const hashedPassword = await hash(password, 12);
    const hashedPin = await hash(pin, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        username,
        email,
        discordUsername,
        password: hashedPassword,
        pin: hashedPin,
        key,
        level: 1
      }
    });

    // Remove sensitive data from response
    const { password: _, pin: __, ...userWithoutSensitiveData } = user;

    return NextResponse.json(
      { message: 'User created successfully', user: userWithoutSensitiveData },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ status: 'ok' });
} 