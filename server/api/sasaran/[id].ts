import { sasaran } from '~/server/database/sasaran';
import { misi } from '~/server/database/misi';
import { indikator } from '~/server/database/indikator';
import { db } from '~/server/db';
import { readBody, defineEventHandler } from 'h3';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const id = Number(event.context.params?.id);
  if (!id) {
    return { error: 'id is required' };
  }

  if (event.req.method === 'GET') {
    // Ambil sasaran berdasarkan id
    const sasaranRows = await db.select({
      id: sasaran.id,
      deskripsi: sasaran.deskripsi,
      misi_id: sasaran.misi_id
    }).from(sasaran).where(eq(sasaran.id, id));
    if (!sasaranRows.length) return { error: 'Not found' };
    const s = sasaranRows[0];

    // Ambil misi terkait
    const misiRows = await db.select({
      id: misi.id,
      deskripsi: misi.deskripsi
    }).from(misi).where(eq(misi.id, s.misi_id));
    const misiData = misiRows.length ? { id: misiRows[0].id, deskripsi: misiRows[0].deskripsi } : null;

    // Ambil indikator terkait
    const indikatorRows = await db.select({
      id: indikator.id,
      deskripsi: indikator.deskripsi,
      target: indikator.target,
      satuan: indikator.satuan,
      tw1: indikator.tw1,
      tw2: indikator.tw2,
      tw3: indikator.tw3,
      tw4: indikator.tw4,
      sasaran_program_id: indikator.sasaran_program_id
    }).from(indikator).where(eq(indikator.sasaran_program_id, id));

    return {
      id: s.id,
      deskripsi: s.deskripsi,
      misi: misiData,
      indikator: indikatorRows.map(i => ({
        id: i.id,
        deskripsi: i.deskripsi,
        target: i.target,
        satuan: i.satuan,
        tw1: i.tw1,
        tw2: i.tw2,
        tw3: i.tw3,
        tw4: i.tw4
      }))
    };
  }

  if (event.req.method === 'PUT') {
    const body = await readBody(event);
    await db.update(sasaran)
      .set({
        deskripsi: body.deskripsi,
        misi_id: body.misi_id,
        updated_at: new Date()
      })
      .where(eq(sasaran.id, id));
    return { success: true };
  }

  if (event.req.method === 'DELETE') {
    await db.delete(sasaran)
      .where(eq(sasaran.id, id));
    return { success: true };
  }
})
