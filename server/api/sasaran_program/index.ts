import { sasaran } from '~/server/database/sasaran'
import { eq } from 'drizzle-orm'
import { db } from '~/server/db'

export default defineEventHandler(async (event) => {
  const method = event.req.method

  if (method === 'GET') {
    // Ambil semua data sasaran program
    const data = await db.select().from(sasaran)
    return { success: true, data }
  }

  if (method === 'POST') {
    const body = await readBody(event)
    // Validasi sederhana
    if (!body.deskripsi || !body.misi_id || !body.level || !body.unit_kerja_id) {
      return { success: false, message: 'Data tidak lengkap' }
    }
    const now = new Date()
    const inserted = await db.insert(sasaran).values({
      deskripsi: body.deskripsi,
      misi_id: body.misi_id,
      level: body.level,
      unit_kerja_id: body.unit_kerja_id,
      created_at: now,
      updated_at: now
    }).returning()
    return { success: true, data: inserted }
  }

  if (method === 'PUT') {
    const body = await readBody(event)
    if (!body.id || !body.deskripsi) {
      return { success: false, message: 'ID dan deskripsi wajib diisi' }
    }
    const updated = await db.update(sasaran)
      .set({
        deskripsi: body.deskripsi,
        misi_id: body.misi_id,
        level: body.level,
        unit_kerja_id: body.unit_kerja_id,
        updated_at: new Date()
      })
      .where(eq(sasaran.id, body.id))
      .returning()
    return { success: true, data: updated }
  }

  if (method === 'DELETE') {
    const body = await readBody(event)
    if (!body.id) {
      return { success: false, message: 'ID wajib diisi' }
    }
    const deleted = await db.delete(sasaran)
      .where(eq(sasaran.id, body.id))
      .returning()
    return { success: true, data: deleted }
  }

  return { success: false, message: 'Method not allowed' }
})
