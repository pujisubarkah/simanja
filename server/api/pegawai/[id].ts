import { pegawai } from '~/server/database/pegawai';
import { unit_kerja } from '~/server/database/unit_kerja';
import { db } from '~/server/db';
import { defineEventHandler, readBody } from 'h3';
import { eq } from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';

// bikin alias untuk pegawai (atasan)
const atasan = alias(pegawai, 'atasan');

export default defineEventHandler(async (event) => {
  const params = event.context.params;
  if (!params || !('id' in params)) {
    return { error: 'Parameter id tidak ditemukan' };
  }
  const { id } = params;

  if (event.req.method === 'GET') {
    // Ambil pegawai by id beserta unit_kerja dan nama atasan
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
    .where(eq(pegawai.id, Number(id)))
    .leftJoin(unit_kerja, eq(pegawai.unit_kerja_id, unit_kerja.id))
    .leftJoin(atasan, eq(pegawai.atasan_id, atasan.id));

    const peg = rows[0];
    if (!peg) return { error: 'Pegawai tidak ditemukan' };
    return {
      ...peg,
      photo_url: `https://dtjrketxxozstcwvotzh.supabase.co/storage/v1/object/public/foto_pegawai/${peg.nip}.jpg`
    };
  }

  if (event.req.method === 'PUT') {
    // Update pegawai by id
    const body = await readBody(event);
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
      .where(eq(pegawai.id, Number(id)));
    return { success: true };
  }

  if (event.req.method === 'DELETE') {
    // Hapus pegawai by id
    await db.delete(pegawai).where(eq(pegawai.id, Number(id)));
    return { success: true };
  }
});
