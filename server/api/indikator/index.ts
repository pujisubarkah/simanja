import { indikator } from '~/server/database/indikator';
import { sasaran } from '~/server/database/sasaran';
import { db } from '~/server/db';
import { defineEventHandler } from 'h3';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  if (event.req.method === 'GET') {
    // Ambil semua indikator beserta sasaran terkait (id dan deskripsi)
    const rows = await db.select({
      indikator_id: indikator.id,
      indikator_deskripsi: indikator.deskripsi,
      indikator_target: indikator.target,
      indikator_satuan: indikator.satuan,
      tw1: indikator.tw1,
      tw2: indikator.tw2,
      tw3: indikator.tw3,
      tw4: indikator.tw4,
      sasaran_id: sasaran.id,
      sasaran_deskripsi: sasaran.deskripsi
    })
    .from(indikator)
    .leftJoin(sasaran, eq(sasaran.id, indikator.sasaran_program_id));

    // Format hasil: array objek { id, deskripsi, target, satuan, tw1, tw2, tw3, tw4, sasaran: { id, deskripsi } }
    return rows.map(row => ({
      id: row.indikator_id,
      deskripsi: row.indikator_deskripsi,
      target: row.indikator_target,
      satuan: row.indikator_satuan,
      tw1: row.tw1,
      tw2: row.tw2,
      tw3: row.tw3,
      tw4: row.tw4,
      sasaran: row.sasaran_id ? { id: row.sasaran_id, deskripsi: row.sasaran_deskripsi } : null
    }))
  }
})
