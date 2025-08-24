import { sasaran } from '~/server/database/sasaran';
import { misi } from '~/server/database/misi';
import { indikator } from '~/server/database/indikator';
import { db } from '~/server/db';
import { readBody, defineEventHandler } from 'h3';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  if (event.req.method === 'GET') {
    // Ambil semua misi
    const misiRows = await db.select({
      id: misi.id,
      deskripsi: misi.deskripsi
    }).from(misi);

    // Ambil semua sasaran beserta misi_id
    const sasaranRows = await db.select({
      id: sasaran.id,
      deskripsi: sasaran.deskripsi,
      misi_id: sasaran.misi_id
    }).from(sasaran);

    // Ambil semua indikator
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
    }).from(indikator);

    // Gabungkan: setiap misi berisi array sasaran yang terkait, setiap sasaran berisi array indikator
    const result = misiRows.map(m => ({
      id: m.id,
      deskripsi: m.deskripsi,
      sasaran: sasaranRows.filter(s => s.misi_id === m.id).map(s => ({
        id: s.id,
        deskripsi: s.deskripsi,
        indikator: indikatorRows.filter(i => i.sasaran_program_id === s.id).map(i => ({
          id: i.id,
          deskripsi: i.deskripsi,
          target: i.target,
          satuan: i.satuan,
          tw1: i.tw1,
          tw2: i.tw2,
          tw3: i.tw3,
          tw4: i.tw4
        }))
      }))
    }))
    return result
  }

  if (event.req.method === 'POST') {
    const body = await readBody(event)
    const now = new Date()
    const inserted = await db.insert(sasaran).values({
      deskripsi: body.deskripsi,
      misi_id: body.misi_id,
      level: body.level,
      unit_kerja_id: body.unit_kerja_id,
      created_at: now,
      updated_at: now
    }).returning()
    return inserted
  }

  if (event.req.method === 'PUT') {
    const body = await readBody(event)
    // Jika ada indikator, tambahkan ke tabel indikator
    if (body.sasaran_id && body.indikator) {
      const now = new Date()
      await db.insert(indikator).values({
        deskripsi: body.indikator.deskripsi,
        target: body.indikator.target,
        satuan: body.indikator.satuan,
        sasaran_program_id: body.sasaran_id,
        created_at: now,
        updated_at: now,
        tw1: body.indikator.tw1,
        tw2: body.indikator.tw2,
        tw3: body.indikator.tw3,
        tw4: body.indikator.tw4
      })
      return { success: true }
    }
    return { error: 'Missing sasaran_id or indikator' }
  }
})

