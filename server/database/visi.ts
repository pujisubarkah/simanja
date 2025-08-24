import { integer, pgSchema, serial, text, timestamp } from "drizzle-orm/pg-core";

const kinerja = pgSchema("kinerja");

export const visi = kinerja.table("visi", {
  id: serial("id").primaryKey(),
  deskripsi: text("deskripsi").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});


