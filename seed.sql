CREATE DATABASE toko;
\c toko;

GRANT USAGE ON SCHEMA public TO admin_toko;
GRANT ALL PRIVILEGES ON DATABASE toko TO admin_toko;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO admin_toko;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO admin_toko;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO admin_toko;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT ON SEQUENCES TO admin_toko;


CREATE TABLE IF NOT EXISTS "user" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    createdAt TIMESTAMP DEFAULT NOW(),
    updatedAt TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT NOW(),
    updatedAt TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS product (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    sku VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    weight INT,
    width INT,
    length INT,
    height INT,
    image TEXT,
    price INT,
    category INT REFERENCES category(id),
    createdAt TIMESTAMP DEFAULT NOW(),
    updatedAt TIMESTAMP DEFAULT NOW()
);

INSERT INTO category (id, name, createdAt, updatedAt)
VALUES
  (1, 'Makanan', NOW(), NOW()),
  (2, 'Minuman', NOW(), NOW()),
  (3, 'Perlengkapan Rumah', NOW(), NOW()),
  (4, 'Alat Tulis', NOW(), NOW()),
  (5, 'Kebutuhan Sehari-hari', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO product (id, name, sku, description, weight, width, length, height, image, price, category, createdAt, updatedAt)
VALUES

  (1, 'Beras 5kg', 'BR001', 'Beras kualitas premium 5kg', 5000, 30, 40, 10, 'https://picsum.photos/200/300?random=1', 75000, 1, NOW(), NOW()),
  (2, 'Minyak Goreng 1L', 'MG002', 'Minyak goreng kemasan 1 liter', 1000, 10, 20, 5, 'https://picsum.photos/200/300?random=2', 20000, 1, NOW(), NOW()),
  (3, 'Gula Pasir 1kg', 'GP003', 'Gula pasir murni 1kg', 1000, 15, 20, 8, 'https://picsum.photos/200/300?random=3', 15000, 1, NOW(), NOW()),
  (4, 'Teh Celup 50s', 'TC004', 'Teh celup isi 50 kantong', 500, 10, 15, 5, 'https://picsum.photos/200/300?random=4', 12000, 2, NOW(), NOW()),
  (5, 'Sabun Mandi Batang', 'SM005', 'Sabun mandi batang dengan aroma segar', 200, 5, 10, 3, 'https://picsum.photos/200/300?random=5', 5000, 5, NOW(), NOW()),
  (6, 'Pasta Gigi 150g', 'PG006', 'Pasta gigi untuk gigi sehat', 150, 5, 10, 4, 'https://picsum.photos/200/300?random=6', 12000, 5, NOW(), NOW()),
  (7, 'Shampoo 200ml', 'SH007', 'Shampoo dengan formula anti ketombe', 200, 5, 10, 5, 'https://picsum.photos/200/300?random=7', 25000, 5, NOW(), NOW()),
  (8, 'Susu UHT 1L', 'SU008', 'Susu UHT murni 1 liter', 1000, 10, 20, 8, 'https://picsum.photos/200/300?random=8', 25000, 2, NOW(), NOW()),
  (9, 'Pensil HB', 'PN009', 'Pensil kayu HB berkualitas', 50, 2, 20, 2, 'https://picsum.photos/200/300?random=9', 2000, 4, NOW(), NOW()),
  (10, 'Penghapus Karet', 'PK010', 'Penghapus karet untuk pensil', 20, 3, 5, 1, 'https://picsum.photos/200/300?random=10', 1000, 4, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

DO $$
DECLARE i INT;
BEGIN
  FOR i IN 11..100 LOOP
    INSERT INTO product (id, name, sku, description, weight, width, length, height, image, price, category, createdAt, updatedAt)
    VALUES (i, 'Produk ' || i, 'SKU' || i, 'Deskripsi produk ' || i, 
            FLOOR(RANDOM() * 2000 + 100), FLOOR(RANDOM() * 30 + 5), FLOOR(RANDOM() * 30 + 5), FLOOR(RANDOM() * 10 + 2),
            'https://picsum.photos/200/300?random=' || i, 
            FLOOR(RANDOM() * 50000 + 1000), FLOOR(RANDOM() * 5 + 1), NOW(), NOW())
    ON CONFLICT (id) DO NOTHING;
  END LOOP;
END $$;
