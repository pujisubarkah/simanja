import { pgSchema, integer, text, timestamp, serial } from "drizzle-orm/pg-core";

const kinerja = pgSchema("kinerja");

export const sasaran = kinerja.table("sasaran_program", {

  id: serial("id").primaryKey(), // ✅ auto increment
  deskripsi: text("deskripsi").notNull(),
  misi_id: integer("misi_id").notNull(),
  level: integer("level").notNull(),
  unit_kerja_id: integer("unit_kerja_id").notNull(),
  created_at: timestamp("created_at").notNull(),
  updated_at: timestamp("updated_at").notNull(),
  });
