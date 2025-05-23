import { NextResponse } from 'next/server';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not set');
  }
  const jwtSecret: string = JWT_SECRET;
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
      jwtSecret,
      { expiresIn: '24h' }
    );

    // Remove sensitive data from response
    const { password: _, pin: __, ...userWithoutSensitiveData } = user;

    // Set the token as an HTTP-only cookie
    const response = NextResponse.json({
      message: 'Login successful',
      user: userWithoutSensitiveData,
      token
    });
    response.cookies.set('token', token, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 // 1 day
    });
    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not set');
  }
  return NextResponse.json({ status: 'ok' });
} 