import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const [username, password] = process.argv.slice(2);
if (!username || !password) {
  console.error('Pemakaian: node scripts/create-admin.mjs <username> <password>');
  process.exit(1);
}

const prisma = new PrismaClient();
const passwordHash = await bcrypt.hash(password, 12);
await prisma.admin.upsert({
  where: { username },
  update: { passwordHash },
  create: { username, passwordHash },
});
console.log('Admin disimpan:', username);
await prisma.$disconnect();