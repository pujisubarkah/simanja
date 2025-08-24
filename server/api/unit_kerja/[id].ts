import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { unit_kerja } from '~/server/database/unit_kerja';


export default defineEventHandler(async (event) => {
  const { id } = event.context.params || {};
  if (!id) return { error: 'unit_kerja id required' };

  // Ambil unit utama
  const unit = await db
    .select({
      unit_id: unit_kerja.id,
      unit_nama: unit_kerja.nama,
      unit_level: unit_kerja.level,
      parent_id: unit_kerja.parent_id,
    })
    .from(unit_kerja)
    .where(eq(unit_kerja.id, Number(id)));

  // Ambil semua sub-unit di bawah unit utama
  const sub_units = await db
    .select({
      unit_id: unit_kerja.id,
      unit_nama: unit_kerja.nama,
      unit_level: unit_kerja.level,
      parent_id: unit_kerja.parent_id,
    })
    .from(unit_kerja)
    .where(eq(unit_kerja.parent_id, Number(id)));

  return {
    unit: unit[0] || null,
    sub_units
  };
});
