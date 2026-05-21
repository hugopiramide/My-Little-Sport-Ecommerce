-- ============================================================
--  SEED DATA - App de Zapatillas / Tienda Deportiva
--  Generado para desarrollo y pruebas
-- ============================================================

-- ============================================================
-- USUARIOS (18 usuarios: 1 admin + 17 usuarios normales)
-- Passwords:
--   Admin: AdminAa1!23dmin
--   Users: AdminAa1!23dmin
-- ============================================================
INSERT INTO `user` (`name`, `surname`, `user_name`, `email`, `profile_img_url`, `date`, `password`, `role`) VALUES
  ('Admin',    'Test',       'admin',    'admin@example.com',    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100', '1975-03-15', '$2a$10$lKS4sIwdmasRHYBe30LyvO.8nugzhXP8quK1vOeaGCHFuODYLf1hq', 'ADMIN'),
  ('Hugo',     'Piramide',   'hugo',     'hugo@example.com',     'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100', '1998-07-22', '$2a$10$7lxYwKA.GSsuVYEFP2uznOJwqkaNB.NuWXpyvaunQHm5czT4gh3wm', 'USER'),
  ('María',    'García',     'mgarcia',  'maria@example.com',    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', '1996-11-08', '$2a$10$7lxYwKA.GSsuVYEFP2uznOJwqkaNB.NuWXpyvaunQHm5czT4gh3wm', 'USER'),
  ('Carlos',   'Martínez',   'carlosmtz','carlos@example.com',   'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', '1993-05-14', '$2a$10$7lxYwKA.GSsuVYEFP2uznOJwqkaNB.NuWXpyvaunQHm5czT4gh3wm', 'USER'),
  ('Laura',    'López',      'laural',   'laura@example.com',    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100', '1999-02-28', '$2a$10$7lxYwKA.GSsuVYEFP2uznOJwqkaNB.NuWXpyvaunQHm5czT4gh3wm', 'USER'),
  ('Andrés',   'Sánchez',    'andres',   'andres@example.com',   'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', '1994-09-03', '$2a$10$7lxYwKA.GSsuVYEFP2uznOJwqkaNB.NuWXpyvaunQHm5czT4gh3wm', 'USER'),
  ('Sofía',    'Fernández',  'sofiaf',   'sofia@example.com',    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100', '1997-12-19', '$2a$10$7lxYwKA.GSsuVYEFP2uznOJwqkaNB.NuWXpyvaunQHm5czT4gh3wm', 'USER'),
  ('Pablo',    'Ruiz',       'pabloruiz','pablo@example.com',    'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=100', '1992-06-10', '$2a$10$7lxYwKA.GSsuVYEFP2uznOJwqkaNB.NuWXpyvaunQHm5czT4gh3wm', 'USER'),
  ('Elena',    'Torres',     'elenat',   'elena@example.com',    'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100', '2000-01-25', '$2a$10$7lxYwKA.GSsuVYEFP2uznOJwqkaNB.NuWXpyvaunQHm5czT4gh3wm', 'USER'),
  ('Diego',    'Ramírez',    'diegor',   'diego@example.com',    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100', '1995-04-17', '$2a$10$7lxYwKA.GSsuVYEFP2uznOJwqkaNB.NuWXpyvaunQHm5czT4gh3wm', 'USER'),
  ('Valentina','Moreno',     'vale',     'valentina@example.com','https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100', '1998-10-05', '$2a$10$7lxYwKA.GSsuVYEFP2uznOJwqkaNB.NuWXpyvaunQHm5czT4gh3wm', 'USER'),
  ('Javier',   'Jiménez',    'javierjm', 'javier@example.com',   'https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=100', '1991-08-12', '$2a$10$7lxYwKA.GSsuVYEFP2uznOJwqkaNB.NuWXpyvaunQHm5czT4gh3wm', 'USER'),
  ('Camila',   'Álvarez',    'camilaa',  'camila@example.com',   'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100', '1999-03-30', '$2a$10$7lxYwKA.GSsuVYEFP2uznOJwqkaNB.NuWXpyvaunQHm5czT4gh3wm', 'USER'),
  ('Sergio',   'Romero',     'sergioro', 'sergio@example.com',   'https://images.unsplash.com/photo-1545996124-0501ebae84d0?w=100', '1997-07-21', '$2a$10$7lxYwKA.GSsuVYEFP2uznOJwqkaNB.NuWXpyvaunQHm5czT4gh3wm', 'USER'),
  ('Natalia',  'Díaz',       'nataliad', 'natalia@example.com',  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100', '1994-12-07', '$2a$10$7lxYwKA.GSsuVYEFP2uznOJwqkaNB.NuWXpyvaunQHm5czT4gh3wm', 'USER'),
  ('Miguel',   'Herrera',    'miguelh',  'miguel@example.com',   'https://images.unsplash.com/photo-1463453091185-61582044d556?w=100', '1996-09-18', '$2a$10$7lxYwKA.GSsuVYEFP2uznOJwqkaNB.NuWXpyvaunQHm5czT4gh3wm', 'USER'),
  ('Isabella', 'Muñoz',      'isabellam','isabella@example.com', 'https://images.unsplash.com/photo-1548142813-c348350df52b?w=100', '2001-05-11', '$2a$10$7lxYwKA.GSsuVYEFP2uznOJwqkaNB.NuWXpyvaunQHm5czT4gh3wm', 'USER'),
  ('Rodrigo',  'Castro',     'rodrigoc', 'rodrigo@example.com',  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100', '1993-11-26', '$2a$10$7lxYwKA.GSsuVYEFP2uznOJwqkaNB.NuWXpyvaunQHm5czT4gh3wm', 'USER');

-- ============================================================
-- CATEGORÍAS (6 categorías)
-- ============================================================
INSERT INTO `category` (`name`, `description`) VALUES
('Running',    'Equipamiento de alto rendimiento para corredores de todos los niveles.'),
('Training',   'Calzado y ropa diseñada para entrenamientos intensos en el gimnasio.'),
('Lifestyle',  'Moda deportiva para el día a día con el máximo confort.'),
('Basketball', 'Zapatillas y accesorios para jugadores de baloncesto.'),
('Hiking',     'Calzado resistente para rutas de montaña y trail.'),
('Football',   'Botas y equipación para fútbol indoor y césped natural.');

-- ============================================================
-- PRODUCTOS (20 productos)
-- ============================================================
INSERT INTO `product` (`name`, `description`, `base_price`, `image_url`, `active`, `category_id`) VALUES
-- Running (cat 1)
('Swift Runner Pro',       'Zapatilla ligera con amortiguación premium para maratones.',                     129.99, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', 1, 1),
('AeroStep 360',           'Tecnología de retorno de energía para runners de larga distancia.',             119.00, 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400', 1, 1),
('SpeedTrack Elite',       'Plantilla ergonómica y suela de carbono para tiempos récord.',                  145.00, 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400', 1, 1),
('CloudRun Flex',          'Diseño ultraligero con malla transpirable ideal para calor.',                    99.99, 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400', 1, 1),

-- Training (cat 2)
('Grit Master X',          'Construidas para resistir los entrenamientos de crossfit más duros.',           110.00, 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=400', 1, 2),
('IronGrip Pro',           'Suela multidireccional para levantamiento de pesas y funcional.',               105.50, 'https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=400', 1, 2),
('FlexCore V2',            'Máxima estabilidad lateral para HIIT y entrenamientos en circuito.',             95.00, 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400', 1, 2),

-- Lifestyle (cat 3)
('Urban Glide',            'Estilo minimalista perfecto para la ciudad y caminatas largas.',                 85.50, 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400', 1, 3),
('Neo Classic',            'Clásico reinventado: cuero vegano y suela vulcanizada moderna.',                 79.99, 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400', 1, 3),
('Drift Low',              'Silueta baja con colorways exclusivos para destacar en la calle.',               89.00, 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400', 1, 3),
('Retro Wave',             'Inspirada en los 90s con tecnología de amortiguación actual.',                   92.00, 'https://images.unsplash.com/photo-1584735175315-9d5df23be7be?w=400', 1, 3),

-- Basketball (cat 4)
('Elite Basketball',       'Máxima tracción y soporte para jugadores explosivos.',                          150.00, 'https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=400', 1, 4),
('Court King Mid',         'Tobillera alta reforzada y amortiguación reactiva para el pivote.',             135.00, 'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?w=400', 1, 4),
('Slam Dunk Low',          'Perfil bajo para jugadores de perímetro que priorizan velocidad.',              125.00, 'https://images.unsplash.com/photo-1556906781-9a412961a28c?w=400', 1, 4),

-- Hiking (cat 5)
('TrailBlazer GTX',        'Membrana impermeable Gore-Tex y puntera reforzada para trail duro.',            159.99, 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=400', 1, 5),
('Summit X Low',           'Ligera y con suela Vibram para senderos mixtos y roca.',                       139.00, 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400', 1, 5),
('Mudrunner 2.0',          'Agarre extremo en barro con sistema de drenaje rápido.',                       115.00, 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400', 1, 5),

-- Football (cat 6)
('Strike Force FG',        'Bota de tacos para césped natural con zona de golpeo reforzada.',              120.00, 'https://images.unsplash.com/photo-1511886929837-354d827aae26?w=400', 1, 6),
('Futsal Flash IN',        'Suela lisa de goma de alta adherencia para fútbol sala.',                       89.99, 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400', 1, 6),
('Turf Rocket TF',         'Suela multitaco para superficies sintéticas y tierra.',                         98.00, 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=400', 0, 6); -- producto inactivo

-- ============================================================
-- VARIANTES DE PRODUCTO (tallas / stock / modificador precio)
-- ============================================================
INSERT INTO `product_variant` (`product_id`, `size`, `stock`, `price_modifier`) VALUES
-- Swift Runner Pro (id 1)
(1, '38', 5, 0.0), (1, '39', 8, 0.0), (1, '40', 10, 0.0),
(1, '41', 12, 0.0), (1, '42', 15, 0.0), (1, '43', 7, 0.0), (1, '44', 5, 5.0),

-- AeroStep 360 (id 2)
(2, '39', 6, 0.0), (2, '40', 9, 0.0), (2, '41', 11, 0.0),
(2, '42', 10, 0.0), (2, '43', 4, 0.0), (2, '44', 3, 5.0),

-- SpeedTrack Elite (id 3)
(3, '40', 4, 0.0), (3, '41', 6, 0.0), (3, '42', 8, 0.0),
(3, '43', 5, 0.0), (3, '44', 2, 5.0), (3, '45', 1, 5.0),

-- CloudRun Flex (id 4)
(4, '37', 7, 0.0), (4, '38', 9, 0.0), (4, '39', 12, 0.0),
(4, '40', 15, 0.0), (4, '41', 10, 0.0), (4, '42', 8, 0.0),

-- Grit Master X (id 5)
(5, 'S', 10, -5.0), (5, 'M', 20, 0.0), (5, 'L', 12, 0.0), (5, 'XL', 6, 0.0),

-- IronGrip Pro (id 6)
(6, 'S', 8, -5.0), (6, 'M', 14, 0.0), (6, 'L', 10, 0.0), (6, 'XL', 5, 0.0), (6, 'XXL', 2, 5.0),

-- FlexCore V2 (id 6)
(7, 'S', 6, 0.0), (7, 'M', 18, 0.0), (7, 'L', 9, 0.0), (7, 'XL', 4, 0.0),

-- Urban Glide (id 8)
(8, '38', 8, 0.0), (8, '39', 12, 0.0), (8, '40', 25, 0.0),
(8, '41', 20, 0.0), (8, '42', 10, 0.0), (8, '43', 5, 0.0),

-- Neo Classic (id 9)
(9, '37', 10, 0.0), (9, '38', 15, 0.0), (9, '39', 18, 0.0),
(9, '40', 20, 0.0), (9, '41', 12, 0.0), (9, '42', 8, 0.0),

-- Drift Low (id 10)
(10, '38', 9, 0.0), (10, '39', 11, 0.0), (10, '40', 14, 0.0),
(10, '41', 10, 0.0), (10, '42', 7, 0.0), (10, '43', 3, 0.0),

-- Retro Wave (id 11)
(11, '38', 6, 0.0), (11, '39', 8, 0.0), (11, '40', 10, 0.0),
(11, '41', 9, 0.0), (11, '42', 5, 0.0),

-- Elite Basketball (id 12)
(12, '40', 5, 0.0), (12, '41', 7, 0.0), (12, '42', 9, 0.0),
(12, '43', 4, 0.0), (12, '44', 3, 0.0), (12, '45', 2, 10.0),

-- Court King Mid (id 13)
(13, '40', 4, 0.0), (13, '41', 6, 0.0), (13, '42', 8, 0.0),
(13, '43', 5, 0.0), (13, '44', 2, 0.0),

-- Slam Dunk Low (id 14)
(14, '39', 5, 0.0), (14, '40', 7, 0.0), (14, '41', 9, 0.0),
(14, '42', 6, 0.0), (14, '43', 3, 0.0),

-- TrailBlazer GTX (id 15)
(15, '39', 4, 0.0), (15, '40', 6, 0.0), (15, '41', 8, 0.0),
(15, '42', 5, 0.0), (15, '43', 3, 0.0), (15, '44', 2, 10.0),

-- Summit X Low (id 16)
(16, '38', 5, 0.0), (16, '39', 7, 0.0), (16, '40', 9, 0.0),
(16, '41', 7, 0.0), (16, '42', 4, 0.0), (16, '43', 2, 0.0),

-- Mudrunner 2.0 (id 17)
(17, '39', 6, 0.0), (17, '40', 8, 0.0), (17, '41', 10, 0.0),
(17, '42', 7, 0.0), (17, '43', 3, 0.0),

-- Strike Force FG (id 18)
(18, '38', 7, 0.0), (18, '39', 9, 0.0), (18, '40', 11, 0.0),
(18, '41', 8, 0.0), (18, '42', 5, 0.0), (18, '43', 2, 0.0),

-- Futsal Flash IN (id 19)
(19, '38', 8, 0.0), (19, '39', 10, 0.0), (19, '40', 12, 0.0),
(19, '41', 9, 0.0), (19, '42', 6, 0.0),

-- Turf Rocket TF (id 20) - producto inactivo, poco stock
(20, '40', 2, 0.0), (20, '41', 1, 0.0), (20, '42', 1, 0.0);

-- ============================================================
-- PEDIDOS (33 pedidos con distintos estados y usuarios)
-- ============================================================
INSERT INTO `orders` (`user_id`, `order_date`, `status`, `total_price`, `recipient_name`, `company_name`, `street`, `address_line2`, `city`, `state`, `postal_code`, `country_code`, `phone_number`, `delivery_instructions`) VALUES
-- admin (user 1)
(1,  '2024-01-05 09:00:00', 'DELIVERED',  299.99, 'Admin Test', 'Test Company', 'Avenida Principal 1, Madrid', NULL, 'Madrid', 'Madrid', '28001', 'ES', '666000000', NULL),
(1,  '2024-02-15 11:30:00', 'SENDING', 189.50, 'Admin Test', 'Test Company', 'Calle Admin 5, Barcelona', NULL, 'Barcelona', 'Barcelona', '08001', 'ES', '666000000', NULL),
-- hugo (user 2)
(2,  '2024-01-15 10:30:00', 'DELIVERED',  129.99, 'Hugo Piramide', NULL, 'Calle Falsa 123, Madrid', NULL, 'Madrid', 'Madrid', '28001', 'ES', '666555444', 'Entregar en portería'),
(2,  '2024-03-20 14:15:00', 'SENDING', 195.50, 'Hugo Piramide', NULL, 'Avenida Siempre Viva 742, Barcelona', NULL, 'Barcelona', 'Barcelona', '08001', 'ES', '666555444', NULL),
(2,  '2024-02-28 09:45:00', 'SENDING',    150.00, 'Hugo Piramide', NULL, 'Calle Gran Vía 10, Madrid', NULL, 'Madrid', 'Madrid', '28001', 'ES', '666555444', NULL),
-- mgarcia (user 3)
(3,  '2024-01-08 11:20:00', 'DELIVERED',  264.99, 'María García', NULL, 'Paseo de la Castellana 88, Madrid', NULL, 'Madrid', 'Madrid', '28001', 'ES', '666111222', NULL),
(3,  '2024-01-22 15:50:00', 'CANCELLED',   85.50, 'María García', NULL, 'Calle Serrano 45, Madrid', NULL, 'Madrid', 'Madrid', '28001', 'ES', '666111222', NULL),
-- carlosmtz (user 4)
(4,  '2024-02-05 13:30:00', 'DELIVERED',  220.00, 'Carlos Martínez', NULL, 'Avenida Diagonal 350, Barcelona', NULL, 'Barcelona', 'Barcelona', '08001', 'ES', '666222333', NULL),
(4,  '2024-03-18 10:00:00', 'SENDING', 145.00, 'Carlos Martínez', NULL, 'Carrer de Balmes 78, Barcelona', NULL, 'Barcelona', 'Barcelona', '08001', 'ES', '666222333', NULL),
-- laural (user 5)
(5,  '2024-02-14 16:45:00', 'SENDING',    179.98, 'Laura López', NULL, 'Plaza Mayor 1, Salamanca', NULL, 'Salamanca', 'Salamanca', '37001', 'ES', '666333444', NULL),
(5,  '2024-01-30 12:15:00', 'DELIVERED',   99.99, 'Laura López', NULL, 'Calle Rúa 5, Santiago de Compostela', NULL, 'Santiago', 'Galicia', '15701', 'ES', '666333444', NULL),
-- andres (user 6)
(6,  '2024-03-22 09:30:00', 'SENDING', 310.00, 'Andrés Sánchez', NULL, 'Gran Vía 1, Bilbao', NULL, 'Bilbao', 'Vizcaya', '48001', 'ES', '666444555', NULL),
(6,  '2024-02-10 14:20:00', 'DELIVERED',  159.99, 'Andrés Sánchez', NULL, 'Calle Ercilla 14, Bilbao', NULL, 'Bilbao', 'Vizcaya', '48001', 'ES', '666444555', NULL),
-- sofiaf (user 7)
(7,  '2024-02-25 11:10:00', 'SENDING',    169.99, 'Sofía Fernández', NULL, 'Calle Colón 20, Valencia', NULL, 'Valencia', 'Valencia', '46001', 'ES', '666555666', NULL),
(7,  '2024-01-20 15:40:00', 'DELIVERED',  105.50, 'Sofía Fernández', NULL, 'Avenida del Puerto 33, Valencia', NULL, 'Valencia', 'Valencia', '46001', 'ES', '666555666', NULL),
-- pabloruiz (user 8)
(8,  '2024-01-12 10:05:00', 'CANCELLED',  139.00, 'Pablo Ruiz', NULL, 'Calle Larios 7, Málaga', NULL, 'Málaga', 'Málaga', '29001', 'ES', '666777888', NULL),
(8,  '2024-02-20 13:25:00', 'DELIVERED',  240.00, 'Pablo Ruiz', NULL, 'Paseo del Parque 2, Málaga', NULL, 'Málaga', 'Málaga', '29001', 'ES', '666777888', NULL),
-- elenat (user 9)
(9,  '2024-03-19 08:50:00', 'SENDING', 89.00,  'Elena Torres', NULL, 'Calle Real 11, Valladolid', NULL, 'Valladolid', 'Castilla y León', '47001', 'ES', '666888999', NULL),
(9,  '2024-02-03 12:35:00', 'DELIVERED',  215.50, 'Elena Torres', NULL, 'Paseo de Zorrilla 90, Valladolid', NULL, 'Valladolid', 'Castilla y León', '47001', 'ES', '666888999', NULL),
-- diegor (user 10)
(10, '2024-03-05 14:15:00', 'SENDING',    274.99, 'Diego Ramírez', NULL, 'Calle Alfonso I 20, Zaragoza', NULL, 'Zaragoza', 'Zaragoza', '50001', 'ES', '666999000', NULL),
(10, '2024-01-25 10:40:00', 'DELIVERED',  120.00, 'Diego Ramírez', NULL, 'Paseo de la Independencia 5, Zaragoza', NULL, 'Zaragoza', 'Zaragoza', '50001', 'ES', '666999000', NULL),
-- vale (user 11)
(11, '2024-02-12 16:20:00', 'DELIVERED',  184.99, 'Valentina Moreno', NULL, 'Calle Tetuán 8, Sevilla', NULL, 'Sevilla', 'Sevilla', '41001', 'ES', '666000111', NULL),
(11, '2024-03-17 11:55:00', 'SENDING', 145.00, 'Valentina Moreno', NULL, 'Avenida de la Constitución 1, Sevilla', NULL, 'Sevilla', 'Sevilla', '41001', 'ES', '666000111', NULL),
-- javierjm (user 12)
(12, '2024-01-18 09:30:00', 'DELIVERED',  299.99, 'Javier Jiménez', NULL, 'Passeig de Gràcia 100, Barcelona', NULL, 'Barcelona', 'Barcelona', '08001', 'ES', '666111000', NULL),
-- camilaa (user 13)
(13, '2024-03-10 13:45:00', 'SENDING',    110.00, 'Camila Álvarez', NULL, 'Calle Preciados 3, Madrid', NULL, 'Madrid', 'Madrid', '28001', 'ES', '666222000', NULL),
-- sergioro (user 14)
(14, '2024-02-07 15:10:00', 'DELIVERED',  175.50, 'Sergio Romero', NULL, 'Gran Vía de Colón 10, Granada', NULL, 'Granada', 'Granada', '18001', 'ES', '666333000', NULL),
-- miguelh (user 16)
(16, '2024-03-21 10:25:00', 'SENDING', 259.99, 'Miguel Herrera', NULL, 'Calle Marqués de Larios 1, Málaga', NULL, 'Málaga', 'Málaga', '29001', 'ES', '666444000', NULL),
-- nataliad (user 15)
(15, '2024-02-18 14:50:00', 'DELIVERED',  169.00, 'Natalia Díaz', NULL, 'Paseo de la Castellana 45, Madrid', NULL, 'Madrid', 'Madrid', '28001', 'ES', '666555555', NULL),
(15, '2024-03-25 10:15:00', 'SENDING', 95.00,  'Natalia Díaz', NULL, 'Calle Princesa 15, Madrid', NULL, 'Madrid', 'Madrid', '28001', 'ES', '666555555', NULL),
-- isabellam (user 17)
(17, '2024-01-28 16:20:00', 'DELIVERED',  245.50, 'Isabella Muñoz', NULL, 'Ronda de Atocha 8, Madrid', NULL, 'Madrid', 'Madrid', '28012', 'ES', '666666666', NULL),
(17, '2024-03-08 13:00:00', 'SENDING', 125.00, 'Isabella Muñoz', NULL, 'Calle de Alcalá 25, Madrid', NULL, 'Madrid', 'Madrid', '28014', 'ES', '666666666', NULL),
-- rodrigoc (user 18)
(18, '2024-02-22 12:30:00', 'DELIVERED',  199.99, 'Rodrigo Castro', NULL, 'Avenida de América 10, Madrid', NULL, 'Madrid', 'Madrid', '28002', 'ES', '666777777', NULL),
(18, '2024-03-12 15:45:00', 'SENDING', 115.50, 'Rodrigo Castro', NULL, 'Calle Serrano 88, Madrid', NULL, 'Madrid', 'Madrid', '28001', 'ES', '666777777', NULL);

-- ============================================================
-- ORDER ITEMS
-- Referencia de variantes más usadas (IDs aproximados según orden de inserción):
--  Swift Runner 40=1, 42=3  | AeroStep 39=8 | SpeedTrack 42=15
--  CloudRun 40=22 | GritMaster M=29 | IronGrip M=33 | FlexCore M=37
--  UrbanGlide 40=42 | NeoCla 40=48 | DriftLow 40=53 | RetroWave 40=57
--  EliteBasket 42=62 | CourtKing 42=67 | SlamDunk 41=72 | TrailBlazer 41=77
--  SummitX 40=83 | Mudrunner 41=89 | StrikeForce 40=94 | Futsal 40=99
-- ============================================================
INSERT INTO `order_items` (`order_id`, `product_variant_id`, `quantity`, `price_at_purchase`, `product_name`, `product_size`, `product_image_url`, `base_price`, `price_modifier`) VALUES
-- Pedido 1: hugo - DELIVERED
(1, 1,  1, 129.99, 'Swift Runner Pro', '40', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', 129.99, 0.0),
-- Pedido 2: hugo - SENDING
(2, 29, 1, 110.00, 'Grit Master X', 'M', 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=400', 115.00, -5.0),
(2, 42, 1,  85.50, 'Urban Glide', '40', 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400', 85.50, 0.0),
-- Pedido 3: hugo - SENDING
(3, 62, 1, 150.00, 'Elite Basketball', '42', 'https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=400', 150.00, 0.0),
-- Pedido 4: mgarcia - DELIVERED
(4, 1,  1, 129.99, 'Swift Runner Pro', '40', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', 129.99, 0.0),
(4, 57, 1,  92.00, 'Retro Wave', '40', 'https://images.unsplash.com/photo-1584735175315-9d5df23be7be?w=400', 92.00, 0.0),
(4, 53, 1,  89.00, 'Drift Low', '40', 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400', 89.00, 0.0),  -- 264.99 aprox (con descuentos hipotéticos)
-- Pedido 5: mgarcia - CANCELLED
(5, 42, 1,  85.50, 'Urban Glide', '40', 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400', 85.50, 0.0),
-- Pedido 6: carlosmtz - DELIVERED
(6, 29, 1, 110.00, 'Grit Master X', 'M', 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=400', 115.00, -5.0),
(6, 33, 1, 105.50, 'IronGrip Pro', 'M', 'https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=400', 110.50, -5.0),
-- Pedido 7: carlosmtz - SENDING
(7, 15, 1, 145.00, 'SpeedTrack Elite', '42', 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400', 145.00, 0.0),
-- Pedido 8: laural - SENDING
(8, 48, 1,  79.99, 'Neo Classic', '40', 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400', 79.99, 0.0),
(8, 22, 1,  99.99, 'CloudRun Flex', '40', 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400', 99.99, 0.0),
-- Pedido 9: laural - DELIVERED
(9, 22, 1,  99.99, 'CloudRun Flex', '40', 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400', 99.99, 0.0),
-- Pedido 10: andres - SENDING
(10, 62, 1, 150.00, 'Elite Basketball', '42', 'https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=400', 150.00, 0.0),
(10, 67, 1, 135.00, 'Court King Mid', '42', 'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?w=400', 135.00, 0.0),
(10, 83, 1,  25.00, 'Summit X Low', '40', 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400', 139.00, 0.0),  -- accesorio add-on
-- Pedido 11: andres - DELIVERED
(11, 77, 1, 159.99, 'TrailBlazer GTX', '41', 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=400', 159.99, 0.0),
-- Pedido 12: sofiaf - SENDING
(12, 53, 1,  89.00, 'Drift Low', '40', 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400', 89.00, 0.0),
(12, 48, 1,  79.99, 'Neo Classic', '40', 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400', 79.99, 0.0),
-- Pedido 13: sofiaf - DELIVERED
(13, 33, 1, 105.50, 'IronGrip Pro', 'M', 'https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=400', 110.50, -5.0),
-- Pedido 14: pabloruiz - CANCELED
(14, 83, 1, 139.00, 'Summit X Low', '40', 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400', 139.00, 0.0),
-- Pedido 15: pabloruiz - DELIVERED
(15, 62, 1, 150.00, 'Elite Basketball', '42', 'https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=400', 150.00, 0.0),
(15, 15, 1,  90.00, 'SpeedTrack Elite', '42', 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400', 145.00, 0.0),
-- Pedido 16: elenat - SENDING
(16, 53, 1,  89.00, 'Drift Low', '40', 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400', 89.00, 0.0),
-- Pedido 17: elenat - DELIVERED
(17, 29, 2, 110.00, 'Grit Master X', 'M', 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=400', 115.00, -5.0),
(17, 42, 1,  85.50, 'Urban Glide', '40', 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400', 85.50, 0.0),  -- 2x110 + 85.50 ≈ 305.50
-- Pedido 18: diegor - SENDING
(18, 1,  1, 129.99, 'Swift Runner Pro', '40', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', 129.99, 0.0),
(18, 57, 1,  92.00, 'Retro Wave', '40', 'https://images.unsplash.com/photo-1584735175315-9d5df23be7be?w=400', 92.00, 0.0),
(18, 48, 1,  79.99, 'Neo Classic', '40', 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400', 79.99, 0.0),  -- 301.98 aprox
-- Pedido 19: diegor - DELIVERED
(19, 94, 1, 120.00, 'Strike Force FG', '40', 'https://images.unsplash.com/photo-1511886929837-354d827aae26?w=400', 120.00, 0.0),
-- Pedido 20: vale - DELIVERED
(20, 53, 1,  89.00, 'Drift Low', '40', 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400', 89.00, 0.0),
(20, 48, 1,  79.99, 'Neo Classic', '40', 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400', 79.99, 0.0),
-- Pedido 21: vale - SENDING
(21, 15, 1, 145.00, 'SpeedTrack Elite', '42', 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400', 145.00, 0.0),
-- Pedido 22: javierjm - DELIVERED
(22, 77, 1, 159.99, 'TrailBlazer GTX', '41', 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=400', 159.99, 0.0),
(22, 83, 1, 139.00, 'Summit X Low', '40', 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400', 139.00, 0.0),
-- Pedido 23: camilaa - SENDING
(23, 29, 1, 110.00, 'Grit Master X', 'M', 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=400', 115.00, -5.0),
-- Pedido 24: sergioro - DELIVERED
(24, 42, 1,  85.50, 'Urban Glide', '40', 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400', 85.50, 0.0),
(24, 57, 1,  92.00, 'Retro Wave', '40', 'https://images.unsplash.com/photo-1584735175315-9d5df23be7be?w=400', 92.00, 0.0),
-- Pedido 25: miguelh - SENDING
(25, 1,  1, 129.99, 'Swift Runner Pro', '40', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', 129.99, 0.0),
(25, 67, 1, 135.00, 'Court King Mid', '42', 'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?w=400', 135.00, 0.0),
-- Pedido 26: admin - DELIVERED
(26, 62, 1, 150.00, 'Elite Basketball', '42', 'https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=400', 150.00, 0.0),
(26, 48, 1,  79.99, 'Neo Classic', '40', 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400', 79.99, 0.0),
(26, 57, 1,  70.00, 'Retro Wave', '40', 'https://images.unsplash.com/photo-1584735175315-9d5df23be7be?w=400', 92.00, 0.0),
-- Pedido 27: admin - SENDING
(27, 29, 1, 110.00, 'Grit Master X', 'M', 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=400', 115.00, -5.0),
(27, 22, 1,  79.50, 'CloudRun Flex', '40', 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400', 99.99, 0.0),
-- Pedido 28: nataliad - DELIVERED
(28, 8,  1,  85.50, 'Urban Glide', '40', 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400', 85.50, 0.0),
(28, 15, 1,  83.50, 'SpeedTrack Elite', '41', 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400', 145.00, 0.0),
-- Pedido 29: nataliad - SENDING
(29, 7,  1,  95.00, 'FlexCore V2', 'M', 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400', 95.00, 0.0),
-- Pedido 30: isabellam - DELIVERED
(30, 12, 1, 150.00, 'Elite Basketball', '42', 'https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=400', 150.00, 0.0),
(30, 10, 1,  89.00, 'Drift Low', '40', 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400', 89.00, 0.0),
(30, 9,  1,  6.50,  'Neo Classic', '39', 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400', 79.99, 0.0),
-- Pedido 31: isabellam - SENDING
(31, 1,  1, 129.99, 'Swift Runner Pro', '40', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', 129.99, 0.0),
-- Pedido 32: rodrigoc - DELIVERED
(32, 19, 1,  99.99, 'Futsal Flash IN', '40', 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400', 89.99, 0.0),
(32, 53, 1,  89.00, 'Drift Low', '40', 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400', 89.00, 0.0),
(32, 48, 1,  11.00, 'Neo Classic', '38', 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400', 79.99, 0.0),
-- Pedido 33: rodrigoc - SENDING
(33, 11, 1, 115.50, 'Retro Wave', '40', 'https://images.unsplash.com/photo-1584735175315-9d5df23be7be?w=400', 92.00, 0.0);

-- ============================================================
-- FAVORITOS (35 registros en distintas combinaciones)
-- ============================================================
INSERT INTO `user_favorites` (`user_id`, `product_id`, `notify_when_in_stock`) VALUES
-- hugo (2)
(2,  4,  1),
(2,  1,  0),
(2,  12, 1),
-- mgarcia (3)
(3,  8,  0),
(3,  9,  0),
(3,  11, 1),
(3,  3,  1),
-- carlosmtz (4)
(4,  5,  0),
(4,  6,  1),
(4,  12, 0),
(4,  15, 1),
-- laural (5)
(5,  9,  0),
(5,  10, 1),
(5,  8,  0),
-- andres (6)
(6,  12, 1),
(6,  13, 1),
(6,  15, 0),
(6,  17, 1),
-- sofiaf (7)
(7,  10, 0),
(7,  11, 1),
(7,  9,  0),
-- pabloruiz (8)
(8,  15, 1),
(8,  16, 1),
(8,  1,  0),
-- elenat (9)
(9,  8,  0),
(9,  10, 1),
-- diegor (10)
(10, 18, 1),
(10, 19, 0),
(10, 1,  1),
-- vale (11)
(11, 9,  0),
(11, 11, 1),
-- javierjm (12)
(12, 12, 1),
(12, 13, 0),
-- sergioro (14)
(14, 8,  0),
(14, 3,  1);

-- ============================================================
-- PRODUCT REVIEWS (Datos de prueba para endpoints)
-- ============================================================
INSERT INTO `product_review` (`user_id`, `product_id`, `order_id`, `title`, `body`, `rating`, `status`, `created_at`) VALUES
  (2, 1, 1, 'Excelentes zapatillas', 'Muy cómodas para correr maratones. El agarre es increíble.', 5, 'APPROVED', NOW()),
  (3, 1, 4, 'Buenas pero caras', 'La amortiguación es genial, pero el precio es un poco elevado.', 4, 'APPROVED', NOW()),
  (10, 1, 18, 'Perfectas', 'El tamaño es correcto y los materiales se ven duraderos.', 5, 'APPROVED', NOW()),
  (16, 1, 25, 'Muy ligeras', 'Me sorprendió lo ligeras que son. Perfectas para velocidad.', 5, 'APPROVED', NOW()),
  (6, 15, 11, 'Imprescindibles para trail', 'Resistentes y totalmente impermeables. Las mejores que he tenido.', 5, 'APPROVED', NOW()),
  (14, 8, 24, 'Estilo y comodidad', 'Perfectas para el día a día. Las uso para ir al trabajo.', 4, 'APPROVED', NOW()),
  (11, 10, 20, 'Se ensucian rápido', 'El diseño es bonito pero el material atrae mucho polvo.', 3, 'APPROVED', NOW()),
  (8, 12, 15, 'Buen agarre', 'Se agarran a la pista que da gusto. Recomendadas para jugar en interior.', 4, 'APPROVED', NOW()),
  (12, 16, 22, 'Suela dura', 'Para senderos mixtos va bien, pero suela algo rígida al principio.', 3, 'APPROVED', NOW()),
  (9, 5, 17, 'Normalitas', 'Esperaba más durabilidad para crossfit.', 3, 'PENDING',  NOW()),
  (2, 5, 2, 'Increíbles', 'Soportan el peso perfectamente, el agarre es de otro nivel.', 5, 'APPROVED', NOW()),
  (2, 12, 3, 'Un poco decepcionado', 'Se sienten pesadas después del primer cuarto.', 2, 'APPROVED', NOW()),
  (3, 11, 4, 'Me encantan', 'Estéticamente son geniales, rollo retro total.', 5, 'APPROVED', NOW()),
  (3, 10, 4, 'Correctas', 'Para el día a día están bien, aunque la suela resbala un poco con lluvia.', 3, 'APPROVED', NOW()),
  (4, 5, 6, 'Resistentes', 'Las uso a diario para el box de crossfit y aguantan como unas campeonas.', 5, 'APPROVED', NOW()),
  (4, 3, 7, 'Vuelo con ellas', 'He mejorado mis tiempos gracias a la placa de carbono. Imprescindibles.', 5, 'APPROVED', NOW()),
  (5, 4, 8, 'Fresquitas', 'La malla transpira muy bien. Ideales para verano.', 4, 'APPROVED', NOW()),
  (6, 13, 10, 'Buena sujeción', 'Protegen muy bien los tobillos en los rebotes.', 4, 'APPROVED', NOW()),
  (7, 9, 12, 'Clásicas', 'Nunca fallan, el cuero vegano se ve de buena calidad.', 4, 'APPROVED', NOW()),
  (7, 6, 13, 'Demasiado rígidas', 'Me cuestan un poco en los movimientos laterales rápidos.', 2, 'APPROVED', NOW()),
  (8, 3, 15, 'Las mejores', 'Sin duda valen cada céntimo. Súper reactivas.', 5, 'APPROVED', NOW()),
  (9, 8, 17, 'Cómodas', 'Las llevo para andar por ciudad todo el día y el pie no se resiente.', 5, 'APPROVED', NOW()),
  (10, 11, 18, 'Bonitas pero ajustadas', 'El diseño me flipa, pero apretan un poco al principio.', 3, 'APPROVED', NOW()),
  (11, 9, 20, 'Las recomiendo', 'Son tal cual se ven en la foto. Talla perfecta.', 5, 'APPROVED', NOW()),
  (12, 15, 22, 'Gore-Tex cumple', 'Me he metido en charcos y el pie seco. Un 10.', 5, 'APPROVED', NOW()),
  (13, 5, 23, 'Bien para el precio', 'Cumplen su función sin destacar demasiado.', 3, 'REJECTED', NOW()),
  (16, 13, 25, 'Sólidas', 'Muy buena estabilidad en la cancha.', 4, 'REJECTED', NOW());

-- ============================================================
-- CARRITOS (Carts para todos los usuarios)
-- ============================================================
INSERT INTO `cart` (`user_id`, `update_at`) VALUES
(1, NOW()), (2, NOW()), (3, NOW()), (4, NOW()), (5, NOW()),
(6, NOW()), (7, NOW()), (8, NOW()), (9, NOW()), (10, NOW()),
(11, NOW()), (12, NOW()), (13, NOW()), (14, NOW()), (15, NOW()),
(16, NOW()), (17, NOW()), (18, NOW());

-- ============================================================
-- ARTÍCULOS EN CARRITO (Cart Items)
-- ============================================================
INSERT INTO `cart_items` (`cart_id`, `product_variant_id`, `quantity`) VALUES
-- Carrito 1 (Admin)
(1, 1, 1), (1, 42, 1),
-- Carrito 2 (Hugo)
(2, 3, 2), (2, 29, 1),
-- Carrito 3 (María)
(3, 10, 1), (3, 22, 1),
-- Carrito 4 (Carlos)
(4, 33, 1), (4, 15, 1),
-- Carrito 5 (Laura)
(5, 57, 1), (5, 48, 2),
-- Carrito 6 (Andrés)
(6, 62, 1), (6, 83, 1),
-- Carrito 7 (Sofía)
(7, 53, 1), (7, 48, 1),
-- Carrito 8 (Pablo)
(8, 67, 1), (8, 1, 1),
-- Carrito 9 (Elena)
(9, 29, 2), (9, 42, 1),
-- Carrito 10 (Diego)
(10, 94, 1), (10, 57, 1),
-- Carrito 11 (Valentina)
(11, 48, 1), (11, 15, 1),
-- Carrito 12 (Javier)
(12, 77, 1), (12, 83, 1),
-- Carrito 13 (Camila)
(13, 29, 1), (13, 42, 1),
-- Carrito 14 (Sergio)
(14, 57, 1), (14, 1, 1),
-- Carrito 15 (Natalia)
(15, 22, 2), (15, 33, 1),
-- Carrito 16 (Miguel)
(16, 62, 1), (16, 67, 1),
-- Carrito 17 (Isabella)
(17, 10, 1), (17, 53, 1),
-- Carrito 18 (Rodrigo)
(18, 15, 1), (18, 29, 1);

