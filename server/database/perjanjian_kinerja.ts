import { pgSchema, integer, text, numeric, varchar, timestamp } from 'drizzle-orm/pg-core';

const kinerja = pgSchema("kinerja");

export const perjanjianKinerja = kinerja.table("perjanjian_kinerja", {
  id: integer('id').primaryKey(),
  tahun: integer('tahun'),
  sasaran_strategis: text('sasaran_strategis'),
  indikator_kinerja: text('indikator_kinerja'),
  target: numeric('target'),
  satuan: varchar('satuan', { length: 32 }),
  realisasi: numeric('realisasi'),
  capaian_persen: numeric('capaian_persen'),
  unit_kerja_id: integer('unit_kerja_id'),
  status: varchar('status', { length: 32 }),
  created_at: timestamp('created_at', { withTimezone: true }),
  updated_at: timestamp('updated_at', { withTimezone: true })
});
