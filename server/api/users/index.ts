import { users } from '~/server/database/users';
import { db } from '~/server/db';
import { readBody, defineEventHandler } from 'h3';
import bcrypt from 'bcryptjs';

export default defineEventHandler(async (event) => {
  if (event.req.method === 'GET') {
    // Ambil semua user
    const userRows = await db.select().from(users);
    return userRows;
  }

  if (event.req.method === 'POST') {
    // Tambah user baru
    const body = await readBody(event);
    const now = new Date();
    // Hash password sebelum simpan
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const inserted = await db.insert(users).values({
      username: body.username,
      password: hashedPassword,
      role_id: body.role_id,
      nama_lengkap: body.nama_lengkap, // Add this line
      created_at: now,
      updated_at: now,
    }).returning();
    return inserted;
  }
});
