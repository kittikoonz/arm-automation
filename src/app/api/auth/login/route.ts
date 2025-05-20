import { NextResponse } from 'next/server';
import { compare } from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { sign } from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(req: Request) {
  try {
    const { username, password, pin } = await req.json();

    // Validate required fields
    if (!username || !password || !pin) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { username }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password and PIN
    const isPasswordValid = await compare(password, user.password);
    const isPinValid = await compare(pin, user.pin);

    if (!isPasswordValid || !isPinValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = sign(
      { 
        userId: user.id,
        username: user.username,
        level: user.level
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Remove sensitive data from response
    const { password: _, pin: __, ...userWithoutSensitiveData } = user;

    return NextResponse.json({
      message: 'Login successful',
      user: userWithoutSensitiveData,
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 