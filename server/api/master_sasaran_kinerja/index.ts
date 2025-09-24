import { masterSasaranKegiatan } from '~/server/database/master-sasaran-kegiatan'
import { eq } from 'drizzle-orm'
import { db } from '~/server/db'

export default defineEventHandler(async (event) => {
  const method = event.req.method

  if (method === 'GET') {
    // Ambil semua data master sasaran kegiatan
    const data = await db.select().from(masterSasaranKegiatan)
    return { success: true, data }
  }

  if (method === 'POST') {
    const body = await readBody(event)
    // Validasi sederhana
    if (!body.kode_sasaran || !body.nama_sasaran || !body.unit_id || typeof body.status !== 'boolean') {
      return { success: false, message: 'Data tidak lengkap' }
    }
    const now = new Date()
    const inserted = await db.insert(masterSasaranKegiatan).values({
      kode_sasaran: body.kode_sasaran,
      nama_sasaran: body.nama_sasaran,
      deskripsi: body.deskripsi,
      unit_id: body.unit_id,
      status: body.status,
      created_at: now,
      updated_at: now
    }).returning()
    return { success: true, data: inserted }
  }

  if (method === 'PUT') {
    const body = await readBody(event)
    if (!body.id || !body.kode_sasaran || !body.nama_sasaran || !body.unit_id || typeof body.status !== 'boolean') {
      return { success: false, message: 'Data tidak lengkap' }
    }
    const updated = await db.update(masterSasaranKegiatan)
      .set({
        kode_sasaran: body.kode_sasaran,
        nama_sasaran: body.nama_sasaran,
        deskripsi: body.deskripsi,
        unit_id: body.unit_id,
        status: body.status,
        updated_at: new Date()
      })
      .where(eq(masterSasaranKegiatan.id, body.id))
      .returning()
    return { success: true, data: updated }
  }

  if (method === 'DELETE') {
    const body = await readBody(event)
    if (!body.id) {
      return { success: false, message: 'ID wajib diisi' }
    }
    const deleted = await db.delete(masterSasaranKegiatan)
      .where(eq(masterSasaranKegiatan.id, body.id))
      .returning()
    return { success: true, data: deleted }
  }

  return { success: false, message: 'Method not allowed' }
})
