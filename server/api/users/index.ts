import { users } from '~/server/database/users';
import { pegawai } from '~/server/database/pegawai';
import { db } from '~/server/db';
import { readBody, defineEventHandler } from 'h3';
import bcrypt from 'bcryptjs';

export default defineEventHandler(async (event) => {
  if (event.req.method === 'GET') {
    // Ambil semua user beserta unit_kerja_id dari pegawai
    const userRows = await db.select().from(users);
    // Ambil data pegawai
    const pegawaiRows = await db.select().from(pegawai);
    // Gabungkan user dengan unit_kerja_id (jika ada relasi user_id)
    const usersWithUnitKerja = userRows.map(user => {
      const peg = pegawaiRows.find(p => p.user_id === user.id);
      return {
        ...user,
        unit_kerja_id: peg ? peg.unit_kerja_id : null
      };
    });
    return usersWithUnitKerja;
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
