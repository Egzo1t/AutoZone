CREATE TABLE "products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"sku" varchar(100) NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"stock_quantity" integer NOT NULL,
	"category" varchar(100) NOT NULL,
	CONSTRAINT "products_sku_unique" UNIQUE("sku")
);
