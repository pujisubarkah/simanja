import { eq } from "drizzle-orm";
import { db } from "../../db";
import { pegawai } from '~/server/database/pegawai';
import { unit_kerja } from '~/server/database/unit_kerja';

export default defineEventHandler(async (event) => {
  const { id } = event.context.params || {};
  if (!id) {
    // Jika tidak ada id, ambil semua unit_kerja
    const rows = await db
      .select({
        unit_id: unit_kerja.id,
        unit_nama: unit_kerja.nama,
        unit_level: unit_kerja.level,
        parent_id: unit_kerja.parent_id,
      })
      .from(unit_kerja);
    return rows;
  }
  const rows = await db
    .select({
      unit_id: unit_kerja.id,
      unit_nama: unit_kerja.nama,
      unit_level: unit_kerja.level,
      parent_id: unit_kerja.parent_id,
    })
    .from(unit_kerja)
    .leftJoin(pegawai, eq(unit_kerja.parent_id, pegawai.unit_kerja_id))
    .where(eq(unit_kerja.id, Number(id)));

  return rows;
});
