import { pgSchema, serial, text, integer, timestamp } from "drizzle-orm/pg-core";

const kinerja = pgSchema("kinerja");

export const unit_kerja = kinerja.table("unit_kerja", {
  id: serial("id").primaryKey(), // auto increment int4
  nama: text("nama").notNull(),
  level: integer("level").notNull(),
  parent_id: integer("parent_id").notNull(),
  created_at: timestamp("created_at").notNull(),
  updated_at: timestamp("updated_at").notNull(),
});
