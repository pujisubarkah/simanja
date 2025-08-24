import { indikator } from '~/server/database/indikator';
import { sasaran } from '~/server/database/sasaran';
import { db } from '~/server/db';
import { defineEventHandler, readBody } from 'h3';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const id = Number(event.context.params?.id);
  if (!id) {
    return { error: 'id is required' };
  }

  if (event.req.method === 'GET') {
    // Ambil indikator berdasarkan id beserta sasaran terkait
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
    .where(eq(indikator.id, id));

    if (!rows.length) return { error: 'Not found' };
    const row = rows[0];
    return {
      id: row.indikator_id,
      deskripsi: row.indikator_deskripsi,
      target: row.indikator_target,
      satuan: row.indikator_satuan,
      sasaran: row.sasaran_id ? { id: row.sasaran_id, deskripsi: row.sasaran_deskripsi } : null
    };
  }

  if (event.req.method === 'PUT') {
    const body = await readBody(event);
    // Update indikator berdasarkan id
    await db.update(indikator)
      .set({
        deskripsi: body.deskripsi,
        target: body.target,
        satuan: body.satuan,
        sasaran_program_id: body.sasaran_program_id,
        tw1: body.tw1,
        tw2: body.tw2,
        tw3: body.tw3,
        tw4: body.tw4,
        updated_at: new Date()
      })
      .where(eq(indikator.id, id));
    return { success: true };
  }

  if (event.req.method === 'DELETE') {
    await db.delete(indikator)
      .where(eq(indikator.id, id));
    return { success: true };
  }
})
