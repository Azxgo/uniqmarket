use uniqmarket_db;

CREATE TABLE IF NOT EXISTS users(
user_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
name VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL,
password VARCHAR(255) NOT NULL,
role ENUM('customer', 'admin') DEFAULT 'customer',
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS vendors (
    vendor_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    brand VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    sku VARCHAR(255) NOT NULL UNIQUE,
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    stock INT NOT NULL CHECK (stock >= 0),
    category_id INT,
    vendor_id INT,
    image_url VARCHAR(2083), 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE SET NULL,
    FOREIGN KEY (vendor_id) REFERENCES vendors(vendor_id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS products_ratings(
	rating_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    rating TINYINT NOT NULL CHECK (rating >= 1 AND rating <=5),
    review TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_user_product (user_id, product_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);

CREATE TABLE cart_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NULL,
  session_id VARCHAR(255) NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  UNIQUE KEY unique_cart_item (user_id, session_id, product_id)
);

CREATE TABLE buy_orders (
order_id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT,
order_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
status VARCHAR(50) NOT NULL DEFAULT "pending",
total DECIMAL(10, 2) NOT NULL DEFAULT 0.00
);

CREATE TABLE order_items (
id INT AUTO_INCREMENT PRIMARY KEY,
order_id INT NOT NULL,
product_id INT NOT NULL, 
quantity INT NOT NULL DEFAULT 1,
price DECIMAL(10,2) NOT NULL,
FOREIGN KEY (order_id) REFERENCES buy_orders(order_id) ON DELETE CASCADE
);

INSERT INTO categories (name) VALUES
('Accesorios'),
('Alimentos'),
('Colección'),
('Hogar'),
('Literatura'),
('Mascotas'),
('Misceláneo'),
('Moda'),
('Música'),
('Tecnología');

INSERT INTO vendors (name) VALUES
('FashionAccesorios'), ('EleganciaPlus'), ('BuenVestir'),
('SaborExquisito'), ('NaturalFoods'), ('DeliciasGourmet'),
('ColeccionistasElite'), ('VintageWorld'), ('ArtículosÚnicos'),
('DecoHogar'), ('ConfortPlus'), ('EstiloCasa'),
('LibrosMilenio'), ('LecturasFantásticas'), ('BibliotecaPremium'),
('PetLove'), ('MascotaFeliz'), ('AnimalCare');

INSERT INTO products (brand, name, description, sku, price, stock, category_id, vendor_id, image_url) VALUES
('Cgnione', 'Lámpara Proyector de Mesa Estrellas OVNI', 
 'Sumérgete en un ambiente mágico con esta lámpara proyector que transforma cualquier habitación en un cielo estrellado. Ideal para relajarse, meditar o ambientar fiestas temáticas. Su diseño con forma de OVNI añade un toque futurista y decorativo.', 
 'NEB001', 34.99, 10, 1, 1, "https://i.ibb.co/m54ZnVkN/Lampara-Proyector-De-Mesa-Estrellas-Ovni-Cgnione.webp"),
('Glowify', 'Pulsera LED para Eventos y Conciertos', 
 'Dale vida a la noche con esta pulsera LED que cambia de color automáticamente o según el ritmo de la música. Perfecta para conciertos, fiestas y eventos especiales, asegurando que te destaques en la multitud con su iluminación vibrante.', 
 'GLW002', 19.99, 25, 1, 2, "https://i.ibb.co/M5h9VgKT/Pulsera-LED-para-eventos-y-conciertos.webp"), 
('ChronoWood', 'Reloj de Madera Solar', 
 'Este elegante reloj combina sostenibilidad y diseño artesanal, fabricado con madera reciclada y equipado con carga solar. No requiere baterías tradicionales y es perfecto para quienes buscan un estilo único y ecológico.', 
 'CWD003', 89.99, 15, 1, 3, "https://i.ibb.co/jkDKmXLf/Reloj-de-Madera-Solar.webp"),
('Cgnione', 'Anillo con Huella Digital', 
 'Un anillo de plata con un diseño minimalista que presenta una huella digital grabada. Ideal como accesorio elegante y personalizado, adecuado tanto para hombres como para mujeres. Una pieza sofisticada que simboliza identidad y exclusividad.', 
 'BIO004', 99.99, 8, 1, 1, "https://i.ibb.co/rf7Vdsv2/Anillo-con-Huella-Digital.webp"),
('Glowify', 'Mini Caballete para Llavero', 
 'Pequeño pero funcional, este caballete en miniatura es ideal para sostener fotos, tarjetas o pequeñas notas. Un accesorio creativo y decorativo que puedes llevar contigo o usar en tu escritorio.', 
 'PKT005', 14.99, 30, 1, 2, "https://i.ibb.co/wh2pffFc/Mini-Caballete-para-Llavero.webp"),
('ChronoWood', 'Cargador Portátil Oculto en Mochila', 
 'Una innovadora mini mochila que no solo es un accesorio de moda, sino que también incorpora un cargador portátil. Perfecta para quienes necesitan energía extra mientras viajan sin perder estilo.', 
 'ZAP006', 49.99, 20, 1, 3, "https://i.ibb.co/NgJb8S0r/Cargador-Port-til-Oculto-en-Mochila-2.webp"),
('Cgnione', 'Llavero con Luz UV', 
 'Un llavero multifuncional equipado con una potente luz ultravioleta. Útil para detectar billetes falsos, revisar seguridad en documentos o incluso para experimentar con materiales fluorescentes.', 
 'AURA007', 129.99, 5, 1, 1, "https://i.ibb.co/5W9FhYDy/Llavero-con-Luz-UV.webp"),
('Glowify', 'Cinta para Cabeza con Altavoz', 
 'Una diadema innovadora que integra altavoces Bluetooth, permitiéndote escuchar música o atender llamadas sin necesidad de auriculares tradicionales. Perfecta para deportes, yoga o relajación.', 
 'ECHO008', 39.99, 18, 1, 2, "https://i.ibb.co/67JX9v5R/Cinta-para-Cabeza-con-Altavoz.webp"),
('ChronoWood', 'Guantes con Calefacción de Invierno', 
 'Mantén tus manos cálidas incluso en temperaturas extremas con estos guantes térmicos. Diseñados para resistir el frío y la nieve, ideales para actividades al aire libre, senderismo o esquí.', 
 'TACT009', 59.99, 12, 1, 3, "https://i.ibb.co/VZGw7mf/Guantes-con-calefacci-n-de-invierno.webp"),
('Cgnione', 'Collar Humidificador Portátil', 
 'Un accesorio innovador que combina moda y bienestar. Este collar funciona como un mini humidificador personal, permitiéndote disfrutar de los beneficios de los aceites esenciales en cualquier momento del día.', 
 'MST010', 79.99, 10, 1, 1, "https://i.ibb.co/q34D3sgD/Collar-Humidificador-Port-til.webp");

INSERT INTO products (brand, name, description, sku, price, stock, category_id, vendor_id, image_url) VALUES
('SnackFusion', 'Chips de Alga Marina', 'Deliciosos y crujientes chips elaborados con alga marina natural de alta calidad. Estos chips tienen un sabor único que combina el umami de las algas con un toque de especias exóticas para un snack saludable y sabroso.', 'SNK001', 4.99, 50, 2, 4, "https://i.ibb.co/TxvPSgqy/Chips-de-Alga-Marina.webp"),
('BeeHarvest', 'Miel Infusionada con Lavanda', 'Miel orgánica de la más alta calidad, infusionada con flores de lavanda cultivadas de manera sostenible. El resultado es una miel suave, de sabor floral, con un toque relajante de lavanda, perfecta para endulzar infusiones, postres o disfrutar directamente.', 'BEE002', 12.99, 30, 2, 5, "https://i.ibb.co/JFgp47Bz/Miel-Infusionada-con-Lavanda.webp"),
('NutriDrinks', 'Quinoa Negra Premium', 'Quinoa negra orgánica de excelente calidad, cultivada en las regiones altas de los Andes. Esta quinoa se distingue por su sabor profundo, ligeramente terroso y su textura masticable, ideal para ensaladas, sopas y platos saludables.', 'GG003', 9.99, 20, 2, 6, "https://i.ibb.co/jkzKXCJx/Quinoa-Negra-Premium.webp"),
('GoldenSpice', 'Leche Dorada en Polvo', 'Una mezcla instantánea de cúrcuma, jengibre y especias seleccionadas para preparar leche dorada. Esta bebida tiene propiedades antiinflamatorias y antioxidantes, ideal para disfrutar en cualquier momento del día, especialmente en los días fríos o para relajarse antes de dormir.', 'GLD010', 14.49, 22, 2, 4, "https://i.ibb.co/DHK1r7gC/Leche-Dorada-en-Polvo.webp"),
('SnackFusion', 'Chocolate con Pimienta Rosa', 'Chocolate artesanal oscuro con un toque picante de pimienta rosa, creando un equilibrio perfecto entre el dulzor del cacao y el sabor especiado.', 'CHO004', 6.99, 40, 2, 4, "https://i.ibb.co/27JLC3xP/Chocolate-con-Pimienta-Rosa.webp"),
('NutriDrinks', 'Mermelada de Higo y Romero', 'Mermelada artesanal hecha con higos frescos, miel natural y un toque de romero. Ideal para untar en tostadas o acompañar quesos.', 'FRL005', 7.99, 25, 2, 5, "https://i.ibb.co/B2CSpdkN/Mermelada-de-Higo-y-Romero.webp"),
('NutriDrinks', 'Limonada Negra Detox', 'Bebida detox con carbón activado, jengibre y un toque de limón fresco. Perfecta para limpiar el cuerpo y revitalizar la piel.', 'NUT008', 3.99, 60, 2, 5, "https://i.ibb.co/mrLScMwb/Limonada-Negra-Detox.webp"),
('GoldenSpice', 'Hamburguesas Veganas de Remolacha', 'Hamburguesas veganas hechas con remolacha, avena, y especias, ricas en nutrientes y con un sabor profundo y terroso, ideal para una dieta saludable y sabrosa.', 'VGW009', 10.99, 18, 2, 4, "https://i.ibb.co/twJtNcQJ/Hamburguesas-Veganas-de-Remolacha.webp"),
('BeeHarvest', 'Barritas de Proteína de Grillo', 'Barritas energéticas de proteína de grillo, una fuente sostenible y de alta calidad de proteínas, ricas en fibra y antioxidantes, ideales para un snack nutritivo.', 'EXO006', 14.99, 15, 2, 6, "https://i.ibb.co/GQbCmVMv/Barritas-de-Prote-na-de-Grillo.webp"),
('BeeHarvest', 'Sal Ahumada con Hierbas', 'Sal marina ahumada combinada con una mezcla de hierbas frescas, ideal para dar un toque gourmet a tus platos favoritos, desde carnes hasta ensaladas.', 'SPC007', 8.49, 35, 2, 4, "https://i.ibb.co/cSvbrLcp/Sal-Ahumada-con-Hierbas.webp");


INSERT INTO products (brand, name, description, sku, price, stock, category_id, vendor_id, image_url) VALUES
('RetroVault', 'Consola Retro Pocket', 'Mini consola de videojuegos retro con más de 300 juegos clásicos.', 'RVT001', 79.99, 20, 3, 7, "https://i.ibb.co/Pbt7tgp/Consola-Retro-Pocket.webp"),
('CoinMasters', 'Moneda de Plata Antigua', 'Moneda auténtica de plata Real de Ocho primeras divisas mundiales, certificada.', 'CM002', 199.99, 5, 3, 8, "https://i.ibb.co/B51CYwx4/Moneda-de-Plata-Antigua.webp"),
('ArtLegacy', 'Póster Edición Limitada Van Gogh', 'Reproducción numerada y certificada del artista Vincent Van Gogh.', 'AL003', 49.99, 15, 3, 9, "https://i.ibb.co/GvRNrqYS/P-ster-Edici-n-Limitada-Van-Gogh.webp"),
('FigurineWorld', 'Figura de Acción Samurai', 'Figura articulada de samurái con detalles artesanales.', 'FW004', 129.99, 10, 3, 7, "https://i.ibb.co/238w3Lpp/Figura-de-Acci-n-Samurai.webp"),
('StampCollect', 'Set de Sellos Raros de Asia', 'Colección de sellos antiguos de varios países asiáticos.', 'SC005', 89.99, 8, 3, 8, "https://i.ibb.co/kgZF8s2j/Set-de-Sellos-Raros-de-Asia.webp"),
('VinylDreams', 'Figura Original de The Beatles', 'Figura de edición limitada original de "Paul".', 'VD006', 299.99, 3, 3, 9, "https://i.ibb.co/5W8YC45m/Figura-Original-de-The-Beatles.webp"),
('MiniaturesHub', 'Castillo Medieval en Miniatura', 'Miniatura pintada a mano con detalles históricos.', 'MH007', 149.99, 7, 3, 7, "https://i.ibb.co/vx5dY1hb/Castillo-Medieval-en-Miniatura.webp"),
('CardMasters', 'Cartas Coleccionables Edición Especial', 'Set de cartas coleccionables con hologramas exclusivos.', 'CM008', 59.99, 25, 3, 8, "https://i.ibb.co/pB8Y4CZP/Cartas-Coleccionables-Edici-n-Especial.webp"),
('TimeCapsule', 'Reloj de Bolsillo Victoriano', 'Reloj de bolsillo funcional con diseño del siglo XIX.', 'TC009', 109.99, 12, 3, 9, "https://i.ibb.co/LdMZGSrs/Reloj-de-Bolsillo-Victoriano.webp"),
('MysticRelics', 'Colgante con Fragmento de Meteorito', 'Colgante único con un fragmento real de meteorito.', 'MR010', 499.99, 2, 3, 7, "https://i.ibb.co/whGDw50X/Colgante-con-Fragmento-de-Meteorito.webp");


INSERT INTO products (brand, name, description, sku, price, stock, category_id, vendor_id, image_url) VALUES
('EcoGlow', 'Lámpara Solar Inteligente', 'Lámpara LED con energía solar y control remoto, ideal para exteriores. Esta lámpara no solo ahorra energía, sino que también es perfecta para iluminar jardines, terrazas o patios sin necesidad de electricidad, respetando el medio ambiente.', 'EGL001', 69.99, 15, 4, 10, "https://i.ibb.co/VYwzWjt1/L-mpara-Solar-Inteligente.webp"),
('ArtLegacy', 'Tabla de Corte Digital', 'Tabla de cocina avanzada con báscula integrada, pantalla digital y conexión Bluetooth para facilitar el registro de ingredientes. Ideal para chefs que buscan precisión y tecnología en su cocina.', 'SCH002', 89.99, 10, 4, 11, "https://i.ibb.co/xKxHDgFr/Tabla-de-Corte-Digital.webp"),
('CardMasters', 'Filtro de Agua con Mineralización', 'Filtro compacto que purifica el agua potable y añade minerales esenciales para mejorar el sabor y la calidad. Con tecnología avanzada, este filtro es fácil de instalar y garantiza agua limpia y saludable.', 'AQP003', 59.99, 25, 4, 12, "https://i.ibb.co/8nZ9mCqJ/Filtro-de-Agua-con-Mineralizaci-n.webp"),
('ZenDecor', 'Difusor de Aromas con Luz LED', 'Difusor ultrasónico que emite aceites esenciales con un suave vapor mientras cambia de color, creando un ambiente relajante. Ideal para el hogar, oficina o spa, mejorando el bienestar físico y emocional.', 'ZND004', 39.99, 30, 4, 10, "https://i.ibb.co/qLmwT3nd/Difusor-de-Aromas-con-Luz-LED.webp"),
('EcoGlow', 'Manta Eléctrica Inteligente', 'Manta eléctrica con control de temperatura ajustable mediante una aplicación móvil. Perfecta para mantenerte cómodo durante los fríos meses de invierno, garantizando un calor seguro y eficiente.', 'HTM005', 99.99, 8, 4, 11, "https://i.ibb.co/PGp01gJB/Manta-El-ctrica-Inteligente.webp"),
('ArtLegacy', 'Huerto Inteligente de Interior', 'Sistema de cultivo inteligente con iluminación LED y control automático de temperatura, humedad y nutrientes. Ideal para quienes desean cultivar hierbas, verduras o flores de manera fácil y sin necesidad de un jardín.', 'GRS006', 149.99, 12, 4, 12, "https://i.ibb.co/99SnHLLV/Huerto-Inteligente-de-Interior.webp"),
('CardMasters', 'Estantería Modular Personalizable', 'Estantería moderna y personalizable que se adapta a tus necesidades. Hecha de materiales reciclados, puedes ajustar su diseño y tamaño para organizar tu espacio de manera eficiente y ecológica.', 'STS007', 129.99, 10, 4, 10, "https://i.ibb.co/tVgZmKK/Estanter-a-Modular-Personalizable.webp"),
('ZenDecor', 'Ventilador Silencioso con Purificador', 'Ventilador de última generación sin aspas, que además de enfriar, purifica el aire gracias a su sistema de filtrado avanzado. Su funcionamiento ultra silencioso lo hace ideal para cualquier ambiente.', 'AF008', 199.99, 5, 4, 11, "https://i.ibb.co/twnTVYxC/Ventilador-Silencioso-con-Purificador.webp"),
('CardMasters', 'Almohada con Gel Refrigerante', 'Almohada ergonómica con gel refrigerante integrado que regula la temperatura mientras duermes, manteniéndote fresco durante la noche. Ideal para quienes sufren de calor o sudoración excesiva durante el sueño.', 'CLX009', 49.99, 20, 4, 12, "https://i.ibb.co/BHbpdHpv/Almohada-con-Gel-Refrigerante.webp"),
('ArtLegacy', 'Cerradura Inteligente Biométrica', 'Cerradura de alta seguridad que permite acceso mediante huella digital, teclado o control remoto. Esta cerradura inteligente garantiza protección avanzada y comodidad, ideal para hogares y oficinas.', 'SML010', 249.99, 6, 4, 10, "https://i.ibb.co/NgyRTVXL/Cerradura-Inteligente-Biom-trica.webp");


INSERT INTO products (brand, name, description, sku, price, stock, category_id, vendor_id, image_url) VALUES
('OldBooksCo', 'Libro Antiguo del Siglo XVIII', 'Edición original de una novela clásica del siglo XVIII. Este ejemplar raro es una joya literaria que transporta al lector a una época de gran riqueza cultural. Con encuadernación en cuero y páginas envejecidas, es perfecto para coleccionistas y amantes de la historia.', 'OLDB001', 499.99, 2, 5, 13, "https://i.ibb.co/j134Kkr/Libro-Antiguo-del-Siglo-XVIII.webp"),
('WriterGear', 'Pluma Fuente Edición Especial', 'Pluma fuente de diseño exclusivo, inspirada en los grandes autores clásicos. Su elegante cuerpo de acero inoxidable y su plumín de alta precisión la convierten en la herramienta perfecta para escritores y artistas de la caligrafía.', 'WG002', 99.99, 10, 5, 14, "https://i.ibb.co/TqFhYGK8/Pluma-Fuente-Edici-n-Especial.webp"),
('GoldenSpice', 'Colección de Relatos de Lovecraft', 'Libro de tapa dura con una cuidada edición especial que incluye ilustraciones exclusivas y una biografía detallada del autor. Perfecto para los aficionados a los relatos de terror y misterio, especialmente los seguidores de H.P. Lovecraft.', 'MP003', 59.99, 15, 5, 15, "https://i.ibb.co/cKjBP4VK/Colecci-n-de-Relatos-de-Lovecraft.webp"),
('CardMasters', 'Diario Artesanal de Cuero', 'Diario hecho a mano con una cubierta de cuero de alta calidad y páginas recicladas. Su diseño rústico y elegante lo convierte en el compañero perfecto para quienes disfrutan de escribir a mano, ya sea para diario personal o como bitácora de viajes.', 'FB004', 39.99, 20, 5, 13, "https://i.ibb.co/KpJcvbxv/Diario-Artesanal-de-Cuero.webp"),
('WriterGear', 'Tintero con Tinta Negra Premium', 'Tintero de alta calidad con tinta negra para plumas fuente. Ideal para quienes buscan una experiencia de escritura clásica y fluida, con tinta que no se corre y tiene una vibrante intensidad en cada palabra.', 'IV005', 24.99, 30, 5, 14, "https://i.ibb.co/yFxHTD2v/Tintero-con-Tinta-Negra-Premium.webp"),
('GoldenPages', 'Edición Numerada de El Quijote', 'Edición limitada y numerada de "El Quijote", con tapa dorada y una introducción histórica sobre la obra. Esta edición de lujo es un verdadero tesoro para los amantes de la literatura española y para quienes buscan un ejemplar único y coleccionable.', 'GP006', 299.99, 5, 5, 15, "https://i.ibb.co/Xr8NBwrZ/Edici-n-Numerada-de-El-Quijote.webp"),
('ArtLegacy', 'Reproducción de Manuscritos Antiguos', 'Reproducción exacta de manuscritos históricos, realizados con materiales de alta calidad que simulan el desgaste de los siglos. Esta edición es perfecta para los estudiosos de la historia y los coleccionistas de documentos antiguos.', 'MS007', 129.99, 8, 5, 13, "https://i.ibb.co/7dGYVCCM/Reproducci-n-de-Manuscritos-Antiguos.webp"),
('CardMasters', 'Lámpara LED para Lectura Nocturna', 'Lámpara portátil con tecnología LED, perfecta para leer cómodamente en la oscuridad sin dañar la vista. Su diseño compacto y eficiente la hace ideal para quienes disfrutan de la lectura nocturna.', 'BN008', 19.99, 50, 5, 14, "https://i.ibb.co/k62MMNdY/L-mpara-LED-para-Lectura-Nocturna.webp"),
('GoldenSpice', 'Libro de Poesía Personalizable', 'Libro en blanco para escribir y guardar tus propias poesías. Con un diseño elegante y tapas duraderas, este libro es el regalo ideal para quienes disfrutan de la poesía o desean crear su propio repertorio literario.', 'VV009', 29.99, 25, 5, 15, "https://i.ibb.co/spSWZbD9/Libro-de-Poes-a-Personalizable.webp"),
('WriterGear', 'Sujetalibros de Mármol Tallado', 'Juego de sujetalibros de mármol tallado a mano, con un diseño artístico y elegante. Perfecto para organizar tus libros mientras añades un toque de sofisticación a tu biblioteca o escritorio.', 'BE010', 89.99, 10, 5, 13, "https://i.ibb.co/KjJjZ0yr/Sujetalibros-de-M-rmol-Tallado.webp");


INSERT INTO products (brand, name, description, sku, price, stock, category_id, sold_by, image_url) VALUES
('WriterGear', 'Comedero Inteligente para Mascotas', 'Comedero automático que se puede programar y controlar desde una aplicación móvil. Perfecto para alimentar a tus mascotas mientras estás fuera de casa, con opciones para establecer horarios y porciones personalizadas.', 'PT001', 129.99, 12, 6, 16, "https://i.ibb.co/bj4QVhYz/Comedero-Inteligente-para-Mascotas.webp"),
('ArtLegacy', 'Cama Ortopédica para Perros', 'Cama ergonómica con espuma viscoelástica que ofrece un soporte excepcional para las articulaciones de tu perro, asegurando una mejor comodidad y descanso durante la noche.', 'FH002', 79.99, 15, 6, 17, "https://i.ibb.co/VYLDRcgV/Cama-Ortop-dica-para-Perros.webp"),
('CardMasters', 'Arenero Automático para Gatos', 'Caja de arena autolimpiable con sensor de movimiento que detecta cuando el gato ha utilizado la caja y la limpia automáticamente. Ideal para mantener la higiene sin esfuerzo.', 'WC003', 199.99, 8, 6, 18, "https://i.ibb.co/fYwRkG5m/Arenero-Autom-tico-para-Gatos.webp"),
('GoldenSpice', 'Fuente de Agua con Filtro', 'Fuente automática que mantiene el agua fresca y limpia gracias a su sistema de filtrado. Perfecta para asegurar que tu mascota tenga acceso a agua purificada durante todo el día.', 'PS004', 49.99, 25, 6, 16, "https://i.ibb.co/1HYxj1f/Fuente-de-Agua-con-Filtro.webp"),
('PurrPlay', 'Rascador Vertical', 'Rascador para gatos con juguetes integrados que permiten una mayor interacción y diversión para tu mascota, ayudando a mantener sus uñas saludables y a reducir el estrés.', 'PP005', 39.99, 20, 6, 17, "https://i.ibb.co/MxgNDDpP/Rascador-Vertical.webp"),
('ArtLegacy', 'Abrigo Reversible para Perros', 'Abrigo impermeable de diseño reversible, con un lado para climas fríos y otro para climas más cálidos, manteniendo a tu perro cómodo y elegante en todas las estaciones.', 'TT006', 29.99, 30, 6, 18, "https://i.ibb.co/MxLMtTMz/Abrigo-Reversible-para-Perros.webp"),
('CardMasters', 'Auriculares para Relajación Canina', 'Auriculares especialmente diseñados para perros, que emiten música relajante y sonidos especiales para calmar a tu mascota en situaciones estresantes, como viajes o visitas al veterinario.', 'BB007', 89.99, 10, 6, 16, "https://i.ibb.co/9PsGCyz/shadowxsonic.webp"),
('PurrPlay', 'Lanzador Automático de Pelotas', 'Lanzador de pelotas automático con múltiples niveles de distancia para mantener a tu mascota activa y entretenida. Ideal para juegos de lanzamiento y recuperación.', 'FM008', 149.99, 12, 6, 17, "https://i.ibb.co/qLQhQC8r/Lanzador-Autom-tico-de-Pelotas.webp"),
('PurrPlay', 'Kit de Huellas para Mascotas', 'Set para capturar y conservar huellas de las patas de tus mascotas, creando recuerdos personalizados que puedes enmarcar o utilizar como regalo especial para los amantes de los animales.', 'PP009', 19.99, 50, 6, 18, "https://i.ibb.co/LT4PLL1/Kit-de-Huellas-para-Mascotas.webp"),
('GoldenSpice', 'Casita para Mascotas con Calefacción', 'Casa portátil con calefacción integrada que mantiene a tu mascota caliente en los días fríos. Ideal para gatos y perros pequeños que disfrutan de un espacio acogedor y cálido.', 'CN010', 99.99, 8, 6, 16, "https://i.ibb.co/DPrRK6YP/Casita-para-Mascotas-con-Calefacci-n.webp");


INSERT INTO products (brand, name, description, sku, price, stock, category_id, vendor_id, image_url) VALUES
('CurioLamp', 'Lámpara de Nebulosa Espacial', 'Proyector LED que simula galaxias y nebulosas, creando un ambiente mágico y relajante en cualquier habitación. Ideal para crear una atmósfera cósmica en tu hogar o oficina.', 'ML001', 45.99, 20, 7, 18, "https://i.ibb.co/mQM0TFd/L-mpara-de-Nebulosa-Espacial.webp"),
('EcoTwist', 'Vaso Plegable de Silicona', 'Vaso portátil y ecológico, diseñado para ser compacto y fácil de llevar. Ideal para bebidas en movimiento y para reducir el uso de plásticos desechables.', 'ML002', 12.50, 50, 7, 6, "https://i.ibb.co/Kz0W3Jjk/Vaso-Plegable-de-Silicona.webp"),
('ArtLegacy', 'Esfera Flotante de Agua', 'Decoración única de mesa con agua flotante que refleja colores vibrantes, creando una atmósfera relajante y elegante para cualquier habitación.', 'ML003', 29.99, 15, 7, 6, "https://i.ibb.co/YBY6sPZM/Esfera-Flotante-de-Agua.webp"),
('MagniGlass', 'Lupa con Lámpara LED', 'Lupa práctica con lámpara LED integrada, ideal para leer textos pequeños o examinar detalles finos con facilidad y precisión, perfecta para adultos mayores o trabajos de precisión.', 'ML004', 18.99, 25, 7, 14, "https://i.ibb.co/spJXSJyN/Lupa-con-L-mpara-LED.webp"),
('GoldenSpice', 'Bloc de Notas Transparente', 'Bloc acrílico reutilizable con diseño transparente que permite escribir y borrar notas con facilidad. Ideal para dejar mensajes rápidos o anotaciones diarias.', 'ML005', 14.99, 30, 7, 12, "https://i.ibb.co/mCbKC6kf/Bloc-de-Notas-Transparente.webp"),
('MagniGlass', 'Lienzo Miniatura de Arte', 'Pequeño lienzo con paisajes pintados a mano, ideal para quienes desean una obra de arte única en miniatura para decorar su espacio.', 'ML006', 22.49, 10, 7, 12, "https://i.ibb.co/qLskLGqq/Lienzo-Miniatura-de-Arte.webp"),
('MagniGlass', 'Fuente Iluminada Portátil', 'Fuente de agua portátil con luces LED que crea un ambiente relajante, perfecta para oficinas o salas de estar, proporcionando sonidos suaves de agua que ayudan a la concentración.', 'ML007', 39.99, 10, 7, 12, "https://i.ibb.co/HfK0jnh0/Fuente-Iluminada-Port-til.webp"),
('SoundBox', 'Caja Musical Retro', 'Caja que reproduce melodías clásicas al girar una manivela, perfecta para regalar o para quienes aprecian la nostalgia de los objetos vintage.', 'ML008', 24.99, 18, 7, 11, "https://i.ibb.co/RTf6yMHN/Caja-Musical-Retro.webp"),
('ArtLegacy', 'Organizador de Viaje Antibacterial', 'Bolsa multiuso con tecnología que elimina bacterias, ideal para viajes o para quienes buscan mantener sus pertenencias limpias y organizadas durante el día.', 'ML009', 17.99, 40, 7, 11, "https://i.ibb.co/BVTtC847/Organizador-de-Viaje-Antibacterial.webp"),
('CardMasters', 'Llaveros Personalizados en 3D', 'Llaveros únicos personalizados con detalles 3D, hechos según las especificaciones del cliente. Perfectos para regalos o para crear un artículo exclusivo y original.', 'ML010', 19.50, 50, 7, 11, "https://i.ibb.co/0RFSshN9/Llaveros-Personalizados-en-3-D.webp");


INSERT INTO products (brand, name, description, sku, price, stock, category_id, sold_by, image_url) VALUES
('TrendFusion', 'Sombrero de Fibra Óptica', 'Sombrero innovador que emite destellos de luz en la oscuridad, perfecto para eventos nocturnos y festivales.', 'FM001', 34.99, 10, 8, 11, "https://i.ibb.co/5g4mKTKM/Sombrero-de-Fibra-ptica.webp"),
('VelvetSocks', 'Gafas de Sol con Lentes Cambiantes', 'Lentes de sol con tecnología que permite cambiar el color de los lentes según la luz ambiental, brindando una experiencia única.', 'FM002', 29.99, 20, 8, 11, "https://i.ibb.co/Rk5jYsWF/Gafas-de-Sol-con-Lentes-Cambiantes.webp"),
('EcoChic', 'Bolso de Piel de Piña', 'Accesorio ecológico elaborado con fibras de piña reciclada, ideal para quienes buscan un estilo sostenible y moderno.', 'FM003', 89.99, 5, 8, 14, "https://i.ibb.co/5xhmDqDk/Bolso-de-Piel-de-Pi-a.webp"),
('VelvetSocks', 'Zapatillas con Suela LED', 'Zapatos con suela iluminada, ideales para eventos nocturnos o como un accesorio de moda único.', 'FM004', 59.99, 8, 8, 1, "https://i.ibb.co/fYJH9y14/Zapatillas-con-Suela-LED.webp"),
('ArtLegacy', 'Bufanda de Lana Reversible', 'Bufanda de lana con un diseño versátil, que permite llevarla en dos colores contrastantes para adaptarse a tu estilo.', 'FM005', 19.99, 15, 8, 2, "https://i.ibb.co/93Y0gNH4/Bufanda-de-Lana-Reversible.webp"),
('CardMasters', 'Gorra con Ventilador Solar', 'Gorra equipada con un ventilador activado por luz solar, perfecta para mantenerte fresco en días calurosos.', 'FM006', 24.99, 30, 8, 3, "https://i.ibb.co/ZqjYHRk/Gorra-con-Ventilador-Solar.webp"),
('VelvetSocks', 'Cinturón Multifunción con Bolsillos', 'Cinturón práctico con varios bolsillos para guardar objetos pequeños, ideal para llevar tus esenciales de manera cómoda.', 'FM007', 22.50, 20, 8, 2, "https://i.ibb.co/Xf9ytB1n/Cintur-n-Multifunci-n-con-Bolsillos.webp"),
('VelvetSocks', 'Calcetines de Terciopelo', 'Calcetines suaves y lujosos, ideales para mantener tus pies cómodos y elegantes.', 'FM008', 12.49, 25, 8, 2, "https://i.ibb.co/VcShspQr/Calcetines-de-Terciopelo.webp"),
('VelvetSocks', 'Sombrero Decorado con Gemas', 'Sombrero único con gemas semipreciosas, perfecto para destacar en cualquier evento.', 'FM009', 45.50, 10, 8, 4, "https://i.ibb.co/JW3rLRHJ/Sombrero-Decorado-con-Gemas.webp"),
('GoldenSpice', 'Chaleco Reflectante de Noche', 'Chaleco diseñado para reflejar la luz en ambientes oscuros, ideal para seguridad nocturna o actividades al aire libre.', 'FM010', 27.49, 15, 8, 2, "https://i.ibb.co/dwMLLtgT/Chaleco-Reflectante-de-Noche.webp");

INSERT INTO products (brand, name, description, sku, price, stock, category_id, vendor_id, image_url) VALUES
('VinylHub', 'Porta Vinilos de Madera', 'Un elegante organizador de vinilos diseñado para proteger y exhibir tu colección de discos. Hecho de madera de alta calidad con acabados suaves para evitar rayones y daños en tus vinilos. Capacidad para hasta 30 discos de 12 pulgadas, ideal para los amantes de la música que valoran la estética y funcionalidad.', 'MS001', 54.99, 8, 9, 5, "https://i.ibb.co/FbMhkM94/Porta-Vinilos-de-Madera.webp"),
('BeatBracelet', 'Pulsera Controladora de Ritmo', 'Una innovadora pulsera que permite controlar la música mediante el movimiento de tu muñeca. Conectada por Bluetooth a tu dispositivo, ajusta ritmos, efectos y sonidos de manera intuitiva, convirtiéndote en el DJ de tu propia fiesta. Ideal para músicos y entusiastas de la tecnología interactiva.', 'MS002', 39.99, 12, 9, 6, "https://i.ibb.co/Y4QFXvcT/Pulsera-Controladora-de-Ritmo.webp"),
('ArtLegacy', 'Amplificador de Bolsillo', 'Este amplificador portátil y compacto es perfecto para guitarristas que necesitan amplificar su sonido de manera rápida y eficiente. Con una excelente calidad de sonido y un diseño fácil de transportar, es ideal para prácticas, actuaciones pequeñas o para tenerlo siempre a mano en cualquier momento.', 'MS003', 24.99, 15, 9, 7, "https://i.ibb.co/LhB5hYwJ/Amplificador-de-Bolsillo.webp"),
('CardMasters', 'Micrófono LED de Karaoke', 'Micrófono de karaoke con luces LED integradas que cambian de color al ritmo de la música. Con conectividad Bluetooth para disfrutar de tus canciones favoritas y un sonido claro y potente. Perfecto para fiestas, reuniones y cualquier evento donde quieras brillar mientras cantas.', 'MS004', 49.99, 20, 9, 5, "https://i.ibb.co/6RYp4tJy/Micr-fono-LED-de-Karaoke.webp"),
('GoldenSpice', 'Afinador Inteligente de Instrumentos', 'Este afinador digital de alta precisión detecta automáticamente el tono de tu instrumento musical. Compatible con guitarras, bajos, violines y más, es la herramienta ideal para músicos que buscan afinar sus instrumentos rápidamente y con exactitud, asegurando el mejor sonido posible en cada actuación.', 'MS005', 18.50, 30, 9, 6, "https://i.ibb.co/d0dYc36y/Afinador-Inteligente-de-Instrumentos.webp"),
('RetroWave', 'Radio Vintage Bluetooth', 'Una radio de estilo retro con tecnología Bluetooth moderna para que puedas disfrutar de la música de tus dispositivos sin sacrificar el encanto clásico. Con un diseño vintage que evoca la nostalgia de los años 50, esta radio es el complemento perfecto para cualquier habitación, oficina o espacio de descanso.', 'MS006', 79.99, 5, 9, 7, "https://i.ibb.co/rhSsXS3/Radio-Vintage-Bluetooth.webp"),
('VibeStrings', 'Cuerdas Luminosas para Guitarra', 'Estas cuerdas de guitarra especiales brillan en la oscuridad, ofreciendo un toque visual único mientras tocas. Perfectas para presentaciones nocturnas o para quienes buscan un toque distintivo en su instrumento. Hechas con materiales de alta resistencia, estas cuerdas son tanto funcionales como estéticamente sorprendentes.', 'MS007', 14.99, 20, 9, 5, "https://i.ibb.co/7dPbJmj5/Cuerdas-Luminosas-para-Guitarra.webp"),
('CardMasters', 'Altavoz Miniatura Portátil', 'Un altavoz portátil y compacto, ideal para llevar a cualquier lugar. Con sonido claro y potente, este altavoz te permite disfrutar de tu música favorita en movimiento. Conéctalo por Bluetooth a tu teléfono o dispositivo y lleva la música a todas partes, desde el parque hasta la playa.', 'MS008', 29.99, 25, 9, 6, "https://i.ibb.co/HDbhjT8Z/Altavoz-Miniatura-Port-til.webp"),
('SongBook', 'Diario Compositor', 'Un cuaderno especialmente diseñado para músicos y compositores. Con páginas de calidad para escribir letras, acordes y melodías, este diario es ideal para capturar ideas musicales en cualquier momento. Perfecto para quienes desean organizar sus composiciones y dar rienda suelta a su creatividad.', 'MS009', 9.99, 50, 9, 5, "https://i.ibb.co/b52442rT/Diario-Compositor.webp"),
('JamSticks', 'Baquetas Electrónicas de Aire', 'Innovadoras baquetas que simulan el sonido de los tambores sin necesidad de un set físico. Ideales para practicar en cualquier lugar, estas baquetas electrónicas detectan el aire y convierten el movimiento en sonido, permitiendo a los bateristas entrenar sin necesidad de espacio o equipo pesado.', 'MS010', 39.99, 12, 9, 7, "https://i.ibb.co/chhVKWvn/Baquetas-Electr-nicas-de-Aire.webp");


INSERT INTO products (brand, name, description, sku, price, stock, category_id, vendor_id, image_url) VALUES
('GoldenSpice', 'Proyector Holográfico de Escritorio', 'Convierte cualquier superficie en un holograma interactivo, ideal para presentaciones o entretenimiento.', 'TN001', 299.99, 3, 10, 8, "https://i.ibb.co/MkVk9GS1/Proyector-Hologr-fico-de-Escritorio.webp"),
('CardMasters', 'Cargador Solar de Bolsillo', 'Dispositivo compacto y ligero para cargar tus móviles mientras disfrutas del aire libre.', 'TN002', 49.99, 20, 10, 9, "https://i.ibb.co/dwSQqNbd/Cargador-Solar-de-Bolsillo.webp"),
('CubeDrone', 'Drone Plegable Compacto', 'Drone pequeño y práctico, ideal para grabaciones rápidas y portabilidad.', 'TN003', 89.99, 5, 10, 2, "https://i.ibb.co/vC2zdFFk/Drone-Plegable-Compacto.webp"),
('CardMasters', 'Auriculares Traductores', 'Auriculares con traducción en tiempo real para conversaciones en varios idiomas.', 'TN004', 159.99, 8, 10, 8, "https://i.ibb.co/F4qy3PBk/Auriculares-Traductores.webp"),
('SmartRing', 'Anillo Inteligente de Notificaciones', 'Anillo tecnológico que te permite recibir notificaciones directamente en tu dedo.', 'TN005', 129.99, 10, 10, 9, "https://i.ibb.co/9HfHLk9c/Anillo-Inteligente-de-Notificaciones.webp"),
('GoldenSpice', 'Pantalla Plegable Portátil', 'Pantalla compacta que se despliega fácilmente para presentaciones en cualquier lugar.', 'TN006', 199.99, 7, 10, 2, "https://i.ibb.co/JwYzFkrz/Pantalla-Plegable-Port-til.webp"),
('LaserKey', 'Teclado Virtual de Láser', 'Teclado láser que proyecta una superficie digital para escribir en cualquier lugar.', 'TN007', 149.99, 5, 10, 8, "https://i.ibb.co/XZSdKJBN/Teclado-Virtual-de-L-ser.webp"),
('GoldenSpice', 'Filtro de Aire USB', 'Purificador de aire portátil, ideal para mantener el ambiente limpio en la oficina o en casa.', 'TN008', 59.99, 15, 10, 9, "https://i.ibb.co/xSgcWJ5d/Filtro-de-Aire-USB.webp"),
('TrackBand', 'Pulsera de Monitoreo de Salud', 'Pulsera inteligente que monitoriza tu actividad física, ritmo cardíaco y patrones de sueño.', 'TN009', 99.99, 10, 10, 5, "https://i.ibb.co/JWZT2hzB/Pulsera-de-Monitoreo-de-Salud.webp"),
('SmartMirror', 'Espejo Inteligente con Pantalla Táctil', 'Espejo innovador con pantalla táctil para ver el clima, noticias y más mientras te preparas.', 'SM011', 149.99, 8, 3, 1, "https://i.ibb.co/tp0SCDrx/Espejo-Inteligente-con-Pantalla-T-ctil.webp");

