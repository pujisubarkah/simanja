import { perjanjianKinerja } from '~/server/database/perjanjian_kinerja'
import { eq } from 'drizzle-orm'
import { db } from '~/server/db'

export default defineEventHandler(async (event) => {
  const unitKerjaId = Number(event.context.params?.unit_kerja_id)
  if (!event.context.params || isNaN(unitKerjaId)) {
    return { success: false, message: 'unit_kerja_id tidak valid' }
  }

  if (event.req.method === 'GET') {
    // Ambil semua PK berdasarkan unit_kerja_id
    const data = await db.select().from(perjanjianKinerja).where(eq(perjanjianKinerja.unit_kerja_id, unitKerjaId))
    return { success: true, data }
  }

  // Bisa tambahkan method lain (POST, PUT, DELETE) jika ingin CRUD by unit_kerja_id

  return { success: false, message: 'Method not allowed' }
})
