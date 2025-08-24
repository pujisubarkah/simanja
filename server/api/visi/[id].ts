import { visi } from '~/server/database/visi';
import { misi } from '~/server/database/misi';
import { db } from '~/server/db';
import { readBody, defineEventHandler } from 'h3';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const id = Number(event.context.params?.id)
  if (!event.context.params || typeof event.context.params.id === 'undefined') {
    throw new Error('Missing route parameter: id')
  }

  if (event.req.method === 'GET') {
    // Ambil satu visi beserta misi terkait
    const rows = await db.select({
      visi_id: visi.id,
      visi_deskripsi: visi.deskripsi,
      misi_id: misi.id,
      misi_deskripsi: misi.deskripsi,
      misi_created_at: misi.created_at,
      misi_updated_at: misi.updated_at
    })
    .from(visi)
    .where(eq(visi.id, id))
    .leftJoin(misi, eq(misi.visi_id, visi.id));

    if (rows.length === 0) return null
    const visiObj = {
      id: rows[0].visi_id,
      deskripsi: rows[0].visi_deskripsi,
      misi: rows.filter(r => r.misi_id).map(r => ({
        id: r.misi_id,
        deskripsi: r.misi_deskripsi ?? '',
        created_at: r.misi_created_at ?? undefined,
        updated_at: r.misi_updated_at ?? undefined
      }))
    }
    return visiObj
  }

  if (event.req.method === 'PUT') {
    const body = await readBody(event)
    const updated = await db.update(visi)
      .set({
        deskripsi: body.deskripsi,
        updated_at: new Date()
      })
      .where(eq(visi.id, id))
      .returning()
    return updated
  }

  if (event.req.method === 'DELETE') {
    const deleted = await db.delete(visi)
      .where(eq(visi.id, id))
      .returning()
    return deleted
  }
})
