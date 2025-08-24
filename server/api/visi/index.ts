import { visi } from '~/server/database/visi';
import { misi } from '~/server/database/misi';
import { db } from '~/server/db';
import { readBody, defineEventHandler } from 'h3';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  if (event.req.method === 'GET') {
    // Ambil semua visi beserta misi terkait, hasil nested
    const rows = await db.select({
      visi_id: visi.id,
      visi_deskripsi: visi.deskripsi,
      misi_id: misi.id,
      misi_deskripsi: misi.deskripsi,
      misi_created_at: misi.created_at,
      misi_updated_at: misi.updated_at
    })
    .from(visi)
    .leftJoin(misi, eq(misi.visi_id, visi.id));

    // Group by visi
    const grouped: Record<number, { id: number, deskripsi: string, misi: Array<{ id: number, deskripsi: string, created_at: Date | undefined, updated_at: Date | undefined }> }> = {};
    for (const row of rows) {
      if (!grouped[row.visi_id]) {
        grouped[row.visi_id] = {
          id: row.visi_id,
          deskripsi: row.visi_deskripsi,
          misi: []
        };
      }
      if (row.misi_id) {
        grouped[row.visi_id].misi.push({
          id: row.misi_id,
          deskripsi: row.misi_deskripsi ?? '',
          created_at: row.misi_created_at ?? undefined,
          updated_at: row.misi_updated_at ?? undefined
        });
      }
    }
    return Object.values(grouped);
  }
  if (event.req.method === 'POST') {
    const body = await readBody(event)
    // Insert visi baru
    const now = new Date()
    const inserted = await db.insert(visi).values({
      deskripsi: body.deskripsi,
      created_at: now,
      updated_at: now
    }).returning()
    return inserted
  }
})
