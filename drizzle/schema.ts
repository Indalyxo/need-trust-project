import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const sponsors = pgTable("sponsors", {
  "id": serial("id").primaryKey(),
  "imageUrl": text("image_url").notNull(),
  "name": text("name").notNull(),
  "link": text("link").notNull(),
  "createdAt": timestamp("created_at").defaultNow().notNull(),
})

export const news = pgTable("news", {
  "id": serial("id").primaryKey(),
  "title": text("title").notNull(),
  "content": text("content").notNull(),
  "imageUrl": text("image_url").notNull(),
  "createdAt": timestamp("created_at").defaultNow().notNull(),
})

export const admin = pgTable("admin", {
  "id": serial("id").primaryKey(),
  "passwordHash": text("password_hash").notNull(),
})

