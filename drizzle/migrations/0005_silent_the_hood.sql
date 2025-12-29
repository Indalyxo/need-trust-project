CREATE TABLE "impacts" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"image_path" varchar(500) NOT NULL,
	"icon" varchar(50) NOT NULL,
	"stats_value" varchar(100) NOT NULL,
	"stats_label" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
