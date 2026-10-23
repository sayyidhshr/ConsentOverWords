import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { createSession, COOKIE_NAME } from '@/lib/auth';

// Hash palsu agar waktu respons sama, baik username ada maupun tidak
const DUMMY_HASH = bcrypt.hashSync('dummy-password', 12);

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    const admin = username
      ? await prisma.admin.findUnique({ where: { username: String(username) } })
      : null;

    const ok = await bcrypt.compare(
      String(password || ''),
      admin?.passwordHash ?? DUMMY_HASH
    );

    if (!admin || !ok) {
      return NextResponse.json({ error: 'Username atau password salah' }, { status: 401 });
    }

    const token = await createSession();
    const res = NextResponse.json({ ok: true });
    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 8,
    });
    return res;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 });
  }
}