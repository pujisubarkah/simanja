import { pgTable, integer, varchar, timestamp } from 'drizzle-orm/pg-core'

export const users = pgTable('siap_skpd', {
  id: integer('id').primaryKey(),
  username: varchar('username', { length: 255 }),
  password: varchar('password', { length: 255 }),
  email: varchar('email', { length: 255 }),
  role_id: integer('role_id'),
  satuan_kerja_id: integer('satuan_kerja_id'),
  deleted_at: timestamp('deleted_at', { mode: 'date' }),
  remember_token: varchar('remember_token', { length: 255 }),
  created_at: timestamp('created_at', { mode: 'date' }),
  updated_at: timestamp('updated_at', { mode: 'date' }),
  nama: varchar('nama', { length: 255 }),
  unit_kerja_id: varchar('unit_kerja_id', { length: 255 }),
  status_aktif: integer('status_aktif'),
})
