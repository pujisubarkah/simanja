import { pegawai } from '~/server/database/pegawai';
import { unit_kerja } from '~/server/database/unit_kerja';
import { db } from '~/server/db';
import { readBody, defineEventHandler } from 'h3';
import { alias } from 'drizzle-orm/pg-core';
import { eq } from 'drizzle-orm';

// bikin alias untuk pegawai (atasan)
const atasan = alias(pegawai, 'atasan');

export default defineEventHandler(async (event) => {
  if (event.req.method === 'GET') {
    // Ambil semua pegawai beserta unit_kerja dan nama atasan
    const rows = await db.select({
      id: pegawai.id,
      nip: pegawai.nip,
      nama: pegawai.nama,
      jabatan: pegawai.jabatan,
      golongan: pegawai.golongan,
      unit_kerja_id: pegawai.unit_kerja_id,
      jenis_kelamin: pegawai.jenis_kelamin,
      alamat: pegawai.alamat,
      email: pegawai.email,
      user_id: pegawai.user_id,
      created_at: pegawai.created_at,
      atasan_id: pegawai.atasan_id,
      nama_atasan: atasan.nama,
      unit_kerja: {
        nama: unit_kerja.nama,
      },
    })
    .from(pegawai)
    .leftJoin(unit_kerja, eq(pegawai.unit_kerja_id, unit_kerja.id))
    .leftJoin(atasan, eq(pegawai.atasan_id, atasan.id));

    // Add photo_url to each row after fetching
    const rowsWithPhotoUrl = rows.map(row => ({
      ...row,
      photo_url: `https://dtjrketxxozstcwvotzh.supabase.co/storage/v1/object/public/foto_pegawai/${row.nip}.jpg`
    }));
    return rowsWithPhotoUrl;
  }

  if (event.req.method === 'POST') {
    // Tambah pegawai baru
    const body = await readBody(event);
    const now = new Date();
    const inserted = await db.insert(pegawai).values({
      nip: body.nip,
      nama: body.nama,
      jabatan: body.jabatan,
      golongan: body.golongan,
      unit_kerja_id: body.unit_kerja_id,
      jenis_kelamin: body.jenis_kelamin,
      alamat: body.alamat,
      email: body.email,
      user_id: body.user_id,
      atasan_id: body.atasan_id,
      created_at: now
    }).returning();
    return inserted;
  }

  if (event.req.method === 'PUT') {
    // Update pegawai
    const body = await readBody(event);
    const now = new Date();
    await db.update(pegawai)
      .set({
        nip: body.nip,
        nama: body.nama,
        jabatan: body.jabatan,
        golongan: body.golongan,
        unit_kerja_id: body.unit_kerja_id,
        jenis_kelamin: body.jenis_kelamin,
        alamat: body.alamat,
        email: body.email,
        user_id: body.user_id,
        atasan_id: body.atasan_id,
        created_at: body.created_at,
      })
      .where(eq(pegawai.id, body.id));
    return { success: true };
  }

  if (event.req.method === 'DELETE') {
    // Hapus pegawai
    const body = await readBody(event);
    await db.delete(pegawai).where(eq(pegawai.id, body.id));
    return { success: true };
  }
});
