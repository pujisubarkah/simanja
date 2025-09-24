import { pgSchema, serial, varchar, text, integer, boolean, timestamp } from "drizzle-orm/pg-core";

const kinerja = pgSchema("kinerja");

export const masterSasaranKegiatan = kinerja.table("master_sasaran_kegiatan", {
  id: serial("id").primaryKey(), // int4, auto increment
  kode_sasaran: varchar("kode_sasaran", { length: 50 }).notNull(),
  nama_sasaran: varchar("nama_sasaran", { length: 255 }).notNull(),
  deskripsi: text("deskripsi"),
  unit_id: integer("unit_id").notNull(),
  status: boolean("status").notNull(),
  created_at: timestamp("created_at").notNull(),
  updated_at: timestamp("updated_at").notNull(),
});
