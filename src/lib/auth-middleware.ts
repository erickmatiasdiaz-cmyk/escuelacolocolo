import { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';
import type { JWTPayload } from '@/lib/auth';

export async function verifyAuth(
  request: NextRequest
): Promise<{ authorized: boolean; payload?: JWTPayload }> {
  const token = request.cookies.get('auth-token')?.value;

  if (!token) {
    return { authorized: false };
  }

  const payload = verifyToken(token);
  if (!payload) {
    return { authorized: false };
  }

  return { authorized: true, payload };
}
