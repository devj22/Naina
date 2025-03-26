import { pgTable, text, serial, integer, boolean, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Property type enum
export const propertyTypeEnum = pgEnum("property_type", [
  "residential",
  "commercial",
  "land",
  "industrial"
]);

// Property listing status enum
export const listingStatusEnum = pgEnum("listing_status", [
  "for_sale",
  "for_rent",
  "for_lease",
  "sold",
  "rented"
]);

// Property schema
export const properties = pgTable("properties", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  priceUnit: text("price_unit").default("₹"),
  priceSuffix: text("price_suffix").default(""),
  area: integer("area").notNull(),
  areaUnit: text("area_unit").default("sq.ft"),
  bedrooms: integer("bedrooms"),
  bathrooms: integer("bathrooms"),
  location: text("location").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zipCode: text("zip_code"),
  latitude: text("latitude"),
  longitude: text("longitude"),
  propertyType: text("property_type").notNull().$type<"residential" | "commercial" | "land" | "industrial">(),
  listingStatus: text("listing_status").notNull().$type<"for_sale" | "for_rent" | "for_lease" | "sold" | "rented">(),
  featuredImage: text("featured_image").notNull(),
  isFeatured: boolean("is_featured").default(false),
  amenities: text("amenities").array(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertPropertySchema = createInsertSchema(properties).omit({
  id: true,
  createdAt: true
});

export type InsertProperty = z.infer<typeof insertPropertySchema>;
export type Property = typeof properties.$inferSelect;

// Blog post schema
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  summary: text("summary").notNull(),
  authorName: text("author_name").notNull(),
  category: text("category").notNull(),
  featuredImage: text("featured_image").notNull(),
  publishedDate: timestamp("published_date").defaultNow(),
  isFeatured: boolean("is_featured").default(false),
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  publishedDate: true
});

export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;

// Contact form submission schema
export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  interest: text("interest"),
  message: text("message").notNull(),
  submittedAt: timestamp("submitted_at").defaultNow(),
  isRead: boolean("is_read").default(false),
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  submittedAt: true,
  isRead: true
});

export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
