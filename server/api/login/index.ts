import { users } from '~/server/database/users';
import { db } from '~/server/db';
import { readBody, defineEventHandler } from 'h3';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export default defineEventHandler(async (event) => {
  if (event.req.method === 'POST') {
    // Login: hanya username dan password
    const body = await readBody(event);
    // Cari user berdasarkan username
    const user = await db.select().from(users).where(eq(users.username, body.username)).then(rows => rows[0]);
    if (!user) {
      return { error: 'User tidak ditemukan' };
    }
    // Cek password
    const valid = await bcrypt.compare(body.password, user.password);
    if (!valid) {
      return { error: 'Password salah' };
    }
    // Tentukan redirect berdasarkan role_id
    let redirect = '';
    if (user.role_id === 6) {
      redirect = '/anggota/' + user.username + '/dashboard';
    } else if (user.role_id === 1) {
      redirect = '/admin';
    } else if (user.role_id === 2 || user.role_id === 3) {
      redirect = '/pimpinan/' + user.username + '/dashboard';
    } else {
      redirect = '/'; // default jika role tidak dikenali
    }
    // Kembalikan data user tanpa password
    const { password, ...userData } = user;
    return { success: true, user: userData, redirect };
  }
});