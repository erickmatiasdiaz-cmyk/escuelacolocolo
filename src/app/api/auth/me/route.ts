import { NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth-middleware';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { authorized, payload } = await verifyAuth(request);

  if (!authorized) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    user: payload,
  });
}

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set('auth-token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });
  return response;
}
