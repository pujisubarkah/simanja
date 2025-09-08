import { perjanjianKinerja } from '../../database/perjanjian_kinerja';
import { db } from '~/server/db';// pastikan ada file database.ts untuk koneksi

export default defineEventHandler(async (event) => {
  const method = event.req.method;

  if (method === 'GET') {
    // Ambil semua data perjanjian kinerja
    const data = await db.select().from(perjanjianKinerja);
    return { success: true, data };
  }

  if (method === 'POST') {
    const body = await readBody(event);
    // Validasi sederhana
    if (!body.tahun || !body.sasaran_strategis || !body.indikator_kinerja || !body.target || !body.satuan || !body.unit_kerja_id) {
      return { success: false, message: 'Data tidak lengkap' };
    }
    // Insert data baru
    const inserted = await db.insert(perjanjianKinerja).values({
      id: body.id ?? undefined, // or remove this line if your DB auto-generates 'id'
      tahun: body.tahun,
      sasaran_strategis: body.sasaran_strategis,
      indikator_kinerja: body.indikator_kinerja,
      target: body.target,
      satuan: body.satuan,
      realisasi: body.realisasi ?? 0,
      unit_kerja_id: body.unit_kerja_id,
      status: body.status ?? 'draft',
      created_at: new Date(),
      updated_at: new Date()
    }).returning();
    return { success: true, data: inserted };
  }

  // Method lain
  return { success: false, message: 'Method not allowed' };
});
