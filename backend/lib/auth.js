import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'admin_session';
const SESSION_DURATION = '8h';

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error('AUTH_SECRET belum diatur atau kurang dari 32 karakter di .env');
  }
  return new TextEncoder().encode(secret);
}

// Membuat token sesi yang ditandatangani (dipakai saat login berhasil)
export async function createSession() {
  return new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(SESSION_DURATION)
    .sign(getSecret());
}

// Memeriksa apakah token valid dan belum kedaluwarsa
export async function verifySession(token) {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload.role === 'admin';
  } catch {
    return false;
  }
}

// Dipakai di route.js: return true jika request berasal dari admin yang sudah login
export async function isAdmin() {
  const cookieStore = await cookies(); // Next.js 14 ke bawah: const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  return token ? verifySession(token) : false;
}

export { COOKIE_NAME };