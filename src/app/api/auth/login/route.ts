import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { signToken } from '@/lib/auth';

const ENV_ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ENV_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    let authUser: {
      id: string;
      username: string;
      nombre: string;
      email: string;
      rol: string;
    } | null = null;

    try {
      const admin = await prisma.admin.findUnique({ where: { username } });

      if (admin) {
        const isValid = await bcrypt.compare(password, admin.password);

        if (isValid) {
          authUser = {
            id: admin.id,
            username: admin.username,
            nombre: admin.nombre,
            email: admin.email,
            rol: admin.rol,
          };
        }
      }
    } catch (dbError) {
      console.error('Login database fallback:', dbError);
    }

    if (!authUser && username === ENV_ADMIN_USERNAME && password === ENV_ADMIN_PASSWORD) {
      authUser = {
        id: 'env-admin',
        username: ENV_ADMIN_USERNAME,
        nombre: 'Administrador',
        email: 'admin@local.env',
        rol: 'admin',
      };
    }

    if (!authUser) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const token = signToken({
      userId: authUser.id,
      username: authUser.username,
      rol: authUser.rol,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: authUser.id,
        username: authUser.username,
        nombre: authUser.nombre,
        email: authUser.email,
        rol: authUser.rol,
      },
    });

    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
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

export async function POST_LOGOUT() {
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
