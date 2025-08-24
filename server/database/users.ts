import { pgSchema, serial, text, integer, timestamp } from "drizzle-orm/pg-core";

const kinerja = pgSchema("kinerja");

export const users = kinerja.table("users", {
  id: serial("id").primaryKey(), // auto increment int4
  username: text("username").notNull(),
  password: text("password").notNull(),
  role_id: integer("role_id").notNull(),
  created_at: timestamp("created_at").notNull(),
  updated_at: timestamp("updated_at").notNull(),
  nama_lengkap: text("nama_lengkap").notNull(),
});
