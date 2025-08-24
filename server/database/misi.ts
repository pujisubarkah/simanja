import { pgSchema, integer, text, timestamp } from "drizzle-orm/pg-core";

const kinerja = pgSchema("kinerja");

export const misi = kinerja.table("misi", {
  id: integer("id").primaryKey().notNull(),
  deskripsi: text("deskripsi").notNull(),
  visi_id: integer("visi_id").notNull(), // relasi ke visi.id
  created_at: timestamp("created_at").notNull(),
  updated_at: timestamp("updated_at").notNull(),
});