import { pgSchema, serial, text, integer, timestamp, varchar } from "drizzle-orm/pg-core";

const kinerja = pgSchema("kinerja");

export const pegawai = kinerja.table("pegawai", {
  id: serial("id").primaryKey(), // auto increment int4
  created_at: timestamp("created_at").notNull(),
  nip: varchar("nip", { length: 32 }).notNull(),
  nama: text("nama").notNull(),
  jabatan: text("jabatan").notNull(),
  golongan: varchar("golongan", { length: 16 }).notNull(),
  unit_kerja_id: integer("unit_kerja_id").notNull(),
  jenis_kelamin: varchar("jenis_kelamin", { length: 16 }).notNull(),
  alamat: text("alamat").notNull(),
  email: text("email").notNull(),
  user_id: integer("user_id").notNull(),
  atasan_id: integer("atasan_id").notNull(),
});
