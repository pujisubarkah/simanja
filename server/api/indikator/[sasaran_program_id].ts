import { indikator } from '~/server/database/indikator';
import { sasaran } from '~/server/database/sasaran';
import { db } from '~/server/db';
import { defineEventHandler } from 'h3';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const sasaranId = event.context.params?.sasaran_program_id;
  if (!sasaranId) {
    return { error: 'sasaran_program_id is required' };
  }
  // Ambil indikator berdasarkan sasaran_program_id
  const rows = await db.select({
    indikator_id: indikator.id,
    indikator_deskripsi: indikator.deskripsi,
    indikator_target: indikator.target,
    indikator_satuan: indikator.satuan,
    sasaran_id: sasaran.id,
    sasaran_deskripsi: sasaran.deskripsi
  })
  .from(indikator)
  .leftJoin(sasaran, eq(sasaran.id, indikator.sasaran_program_id))
  .where(eq(indikator.sasaran_program_id, Number(sasaranId)));

  return rows.map(row => ({
    id: row.indikator_id,
    deskripsi: row.indikator_deskripsi,
    target: row.indikator_target,
    satuan: row.indikator_satuan,
    sasaran: row.sasaran_id ? { id: row.sasaran_id, deskripsi: row.sasaran_deskripsi } : null
  }))
});
