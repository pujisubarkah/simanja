import { pgSchema, integer, text, timestamp, serial } from "drizzle-orm/pg-core";

const kinerja = pgSchema("kinerja");


export const indikator = kinerja.table("indikator_kinerja", {
 id: serial("id").primaryKey(), // ✅ auto increment
  deskripsi: text("deskripsi").notNull(),
  target: text("target").notNull(),
  satuan: text("satuan").notNull(),
  sasaran_program_id: integer("sasaran_program_id").notNull(),
  created_at: timestamp("created_at").notNull(),
  updated_at: timestamp("updated_at").notNull(),
  tw1: text("tw1"),
  tw2: text("tw2"),
  tw3: text("tw3"),
  tw4: text("tw4"),
});
