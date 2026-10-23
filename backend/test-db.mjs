import 'dotenv/config';
import mariadb from 'mariadb';

try {
  const conn = await mariadb.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    allowPublicKeyRetrieval: true,
  });
  console.log('Berhasil:', await conn.query('SELECT 1 AS ok'));
  await conn.end();
} catch (e) {
  console.error('Gagal:', e.message);
}