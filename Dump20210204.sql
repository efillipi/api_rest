CREATE DATABASE  IF NOT EXISTS `ecommerce`
USE `ecommerce`;


DROP TABLE IF EXISTS `categorias`;
 
 
CREATE TABLE `categorias` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
 

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'1','2021-01-21 11:27:38','2021-01-21 11:27:38');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `knex_migrations`
--

DROP TABLE IF EXISTS `knex_migrations`;
 
 
CREATE TABLE `knex_migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `batch` int DEFAULT NULL,
  `migration_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
 

--
-- Dumping data for table `knex_migrations`
--

LOCK TABLES `knex_migrations` WRITE;
/*!40000 ALTER TABLE `knex_migrations` DISABLE KEYS */;
INSERT INTO `knex_migrations` VALUES (1,'20210114173536_create_categorias.js',1,'2021-01-21 14:24:50'),(2,'20210114173715_create_users.js',1,'2021-01-21 14:24:50'),(3,'20210114173955_create_produtos.js',1,'2021-01-21 14:24:50'),(4,'20210114174129_create_pedidos.js',1,'2021-01-21 14:24:50'),(5,'20210114174416_create_pedido_produto.js',1,'2021-01-21 14:24:50'),(7,'20210203154841_altertable_users.js',2,'2021-02-03 19:00:40');
/*!40000 ALTER TABLE `knex_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `knex_migrations_lock`
--

DROP TABLE IF EXISTS `knex_migrations_lock`;
 
 
CREATE TABLE `knex_migrations_lock` (
  `index` int unsigned NOT NULL AUTO_INCREMENT,
  `is_locked` int DEFAULT NULL,
  PRIMARY KEY (`index`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
 

--
-- Dumping data for table `knex_migrations_lock`
--

LOCK TABLES `knex_migrations_lock` WRITE;
 
INSERT INTO `knex_migrations_lock` VALUES (1,0);
 
UNLOCK TABLES;

--
-- Table structure for table `pedido_produtos`
--

DROP TABLE IF EXISTS `pedido_produtos`;
 
 
CREATE TABLE `pedido_produtos` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `pedido_id` int unsigned NOT NULL,
  `produto_id` int unsigned NOT NULL,
  `data` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `quantidade` decimal(10,3) NOT NULL,
  `valor_total_individual` decimal(10,2) NOT NULL,
  `observacao` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pedido_produtos_pedido_id_foreign` (`pedido_id`),
  KEY `pedido_produtos_produto_id_foreign` (`produto_id`),
  CONSTRAINT `pedido_produtos_pedido_id_foreign` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `pedido_produtos_produto_id_foreign` FOREIGN KEY (`produto_id`) REFERENCES `produtos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=193 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
 

--
-- Dumping data for table `pedido_produtos`
--

LOCK TABLES `pedido_produtos` WRITE;
 
INSERT INTO `pedido_produtos` VALUES (15,6,14,'2021-02-02 11:19:51',1.000,13.90,''),(16,6,15,'2021-02-02 11:19:51',1.000,13.90,''),(17,6,16,'2021-02-02 11:19:51',1.000,13.90,''),(18,6,17,'2021-02-02 11:19:51',1.000,13.90,''),(25,7,14,'2021-02-02 11:19:51',1.000,13.90,''),(26,7,15,'2021-02-02 11:19:51',1.000,13.90,''),(27,7,25,'2021-02-02 11:19:51',1.000,13.90,''),(28,7,17,'2021-02-02 11:19:51',1.000,13.90,''),(30,8,14,'2021-02-02 11:19:51',1.000,13.90,''),(31,8,15,'2021-02-02 11:19:51',2.000,13.90,''),(32,8,25,'2021-02-02 11:19:51',1.000,13.90,''),(33,8,17,'2021-02-02 11:19:51',1.000,13.90,''),(35,9,14,'2021-02-02 11:19:51',1.000,13.90,''),(36,9,15,'2021-02-02 11:19:51',2.000,27.80,''),(37,9,25,'2021-02-02 11:19:51',1.000,13.90,''),(38,9,17,'2021-02-02 11:19:51',1.000,13.90,''),(40,10,14,'2021-02-02 11:19:51',1.000,13.90,''),(41,10,15,'2021-02-02 11:19:51',2.000,27.80,''),(42,10,25,'2021-02-02 11:19:51',1.000,13.90,''),(43,10,17,'2021-02-02 11:19:51',1.000,13.90,''),(45,11,14,'2021-02-02 11:19:51',1.000,13.90,''),(46,11,15,'2021-02-02 11:19:51',2.000,27.80,''),(47,11,25,'2021-02-02 11:19:51',1.000,13.90,''),(48,11,17,'2021-02-02 11:19:51',1.000,13.90,''),(63,11,26,'2021-02-02 11:19:51',4.000,48.48,''),(65,13,26,'2021-02-02 11:19:51',4.000,48.48,''),(67,14,26,'2021-02-02 11:19:51',4.000,48.48,''),(69,14,27,'2021-02-02 11:19:51',4.000,48.48,''),(70,15,26,'2021-02-02 11:19:51',4.000,48.48,''),(72,15,27,'2021-02-02 11:19:51',4.000,48.48,''),(73,16,26,'2021-02-02 11:19:51',4.000,48.48,''),(75,16,27,'2021-02-02 11:19:51',4.000,48.48,''),(76,17,26,'2021-02-02 11:19:51',4.000,48.48,''),(78,17,27,'2021-02-02 11:19:51',4.000,48.48,''),(79,18,26,'2021-02-02 11:19:51',4.000,48.48,''),(81,18,27,'2021-02-02 11:19:51',4.000,48.48,''),(82,19,26,'2021-02-02 11:19:51',4.000,48.48,''),(84,19,27,'2021-02-02 11:19:51',4.000,48.48,''),(85,20,26,'2021-02-02 11:19:51',4.000,48.48,''),(87,20,27,'2021-02-02 11:19:51',4.000,48.48,''),(88,21,26,'2021-02-02 11:19:51',4.000,48.48,''),(91,22,26,'2021-02-02 11:19:51',4.000,48.48,''),(94,23,26,'2021-02-02 11:19:51',4.000,48.48,''),(97,24,26,'2021-02-02 11:19:51',4.000,48.48,''),(100,25,26,'2021-02-02 11:19:51',4.000,48.48,''),(103,26,26,'2021-02-02 11:19:51',4.000,48.48,'kakakakaaka'),(106,27,26,'2021-02-02 11:19:51',4.000,48.48,'kakakakaaka'),(109,28,26,'2021-02-02 11:19:51',4.000,48.48,'kakakakaaka'),(130,32,26,'2021-02-02 11:19:51',4.000,48.48,'kakakakaaka'),(132,32,15,'2021-02-02 11:19:51',1.000,12.12,'kakakakaaka'),(171,42,26,'2021-02-02 11:19:51',4.000,48.48,'kakakakaaka'),(172,42,27,'2021-02-02 11:19:51',2.000,24.24,'kakakakaaka'),(173,42,28,'2021-02-02 11:19:51',1.000,12.12,'kakakakaaka'),(180,44,26,'2021-02-02 11:19:51',4.000,48.48,'kakakakaaka'),(181,44,27,'2021-02-02 11:19:51',2.000,24.24,'kakakakaaka'),(182,44,28,'2021-02-02 11:19:51',1.000,12.12,'kakakakaaka'),(183,45,26,'2021-02-02 11:19:51',4.000,48.48,'kakakakaaka'),(184,45,27,'2021-02-02 11:19:51',2.000,24.24,'kakakakaaka'),(185,45,28,'2021-02-02 11:19:51',1.000,12.12,'kakakakaaka'),(186,46,26,'2021-02-02 11:19:51',4.000,48.48,'kakakakaaka'),(187,46,27,'2021-02-02 11:19:51',2.000,24.24,'kakakakaaka'),(188,46,28,'2021-02-02 11:19:51',1.000,12.12,'kakakakaaka'),(189,47,26,'2021-02-02 11:19:51',4.000,48.48,'kakakakaaka'),(190,47,27,'2021-02-02 11:19:51',2.000,24.24,'kakakakaaka'),(191,47,28,'2021-02-02 11:19:51',1.000,12.12,'kakakakaaka'),(192,43,26,'2021-02-02 11:19:51',1.000,12.12,'kakakakaaka');
 
UNLOCK TABLES;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
 
 
CREATE TABLE `pedidos` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `data` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `valor_total` decimal(8,2) NOT NULL DEFAULT '0.00',
  `observacao` text,
  `users_id` int unsigned DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `pedidos_users_id_foreign` (`users_id`),
  CONSTRAINT `pedidos_users_id_foreign` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
 

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
INSERT INTO `pedidos` VALUES (5,'2021-02-02 11:19:51',12.12,'bbbbbb',NULL,'2021-02-02 12:34:12','2021-02-02 12:34:12'),(6,'2021-02-02 11:19:51',12.12,'bbbbbb',2,'2021-02-02 12:43:59','2021-02-02 12:43:59'),(7,'2021-02-02 11:19:51',12.12,'bbbbbb',2,'2021-02-02 18:04:38','2021-02-02 18:04:38'),(8,'2021-02-02 11:19:51',12.12,'bbbbbb',2,'2021-02-02 18:05:50','2021-02-02 18:05:50'),(9,'2021-02-02 11:19:51',12.12,'bbbbbb',2,'2021-02-02 18:06:48','2021-02-02 18:06:48'),(10,'2021-02-02 11:19:51',12.12,'bbbbbb',2,'2021-02-02 18:18:42','2021-02-02 18:18:42'),(11,'2021-02-02 11:19:51',12.12,'bbbbbb',2,'2021-02-02 18:23:10','2021-02-02 18:23:10'),(12,'2021-02-02 11:19:51',12.12,'bbbbbb',2,'2021-02-02 18:28:04','2021-02-02 18:28:04'),(13,'2021-02-02 11:19:51',100.00,'',2,'2021-02-02 18:49:52','2021-02-02 18:49:52'),(14,'2021-02-02 11:19:51',100.00,'',2,'2021-02-02 18:51:19','2021-02-02 18:51:19'),(15,'2021-02-02 11:19:51',100.00,'',2,'2021-02-02 18:52:41','2021-02-02 18:52:41'),(16,'2021-02-02 11:19:51',100.00,'',2,'2021-02-02 18:52:43','2021-02-02 18:52:43'),(17,'2021-02-02 11:19:51',100.00,'',2,'2021-02-02 18:52:44','2021-02-02 18:52:44'),(18,'2021-02-02 11:19:51',100.00,'',2,'2021-02-02 18:52:44','2021-02-02 18:52:44'),(19,'2021-02-02 11:19:51',100.00,'',2,'2021-02-02 18:52:45','2021-02-02 18:52:45'),(20,'2021-02-02 11:19:51',100.00,'',2,'2021-02-02 19:00:18','2021-02-02 19:00:18'),(21,'2021-02-02 11:19:51',100.00,'',2,'2021-02-02 19:00:33','2021-02-02 19:00:33'),(22,'2021-02-02 11:19:51',100.00,'',2,'2021-02-02 20:16:12','2021-02-02 20:16:12'),(23,'2021-02-02 11:19:51',100.00,'',2,'2021-02-02 20:16:46','2021-02-02 20:16:46'),(24,'2021-02-02 11:19:51',100.00,'',2,'2021-02-02 20:19:19','2021-02-02 20:19:19'),(25,'2021-02-02 11:19:51',100.00,'',2,'2021-02-02 20:19:20','2021-02-02 20:19:20'),(26,'2021-02-02 11:19:51',100.00,'kakakakaaka',2,'2021-02-02 20:19:31','2021-02-02 20:19:31'),(27,'2021-02-02 11:19:51',100.00,'kakakakaaka',2,'2021-02-02 20:20:09','2021-02-02 20:20:09'),(28,'2021-02-02 11:19:51',100.00,'kakakakaaka',2,'2021-02-02 20:20:10','2021-02-02 20:20:10'),(32,'2021-02-02 11:19:51',200.00,'kakakakaaka',2,'2021-02-03 10:45:58','2021-02-03 10:45:58'),(33,'2021-02-02 11:19:51',200.00,'kakakakaaka',2,'2021-02-04 14:27:27','2021-02-04 14:27:27'),(34,'2021-02-02 11:19:51',200.00,'kakakakaaka',2,'2021-02-04 14:28:12','2021-02-04 14:28:12'),(35,'2021-02-02 11:19:51',200.00,'kakakakaaka',2,'2021-02-04 14:30:04','2021-02-04 14:30:04'),(36,'2021-02-02 11:19:51',200.00,'kakakakaaka',2,'2021-02-04 14:30:32','2021-02-04 14:30:32'),(42,'2021-02-02 11:19:51',200.00,'kakakakaaka',2,'2021-02-04 14:42:05','2021-02-04 14:42:05'),(43,'2021-02-02 11:19:51',80.00,'kakakakaaka',2,'2021-02-04 14:42:17','2021-02-04 15:04:39'),(44,'2021-02-02 11:19:51',200.00,'kakakakaaka',2,'2021-02-04 14:52:01','2021-02-04 14:52:01'),(45,'2021-02-02 11:19:51',200.00,'kakakakaaka',2,'2021-02-04 14:52:12','2021-02-04 14:52:12'),(46,'2021-02-02 11:19:51',200.00,'kakakakaaka',2,'2021-02-04 14:52:13','2021-02-04 14:52:13'),(47,'2021-02-02 11:19:51',200.00,'kakakakaaka',2,'2021-02-04 15:00:16','2021-02-04 15:00:16');
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produtos`
--

DROP TABLE IF EXISTS `produtos`;
 
 
CREATE TABLE `produtos` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `codigo` int NOT NULL,
  `nome` varchar(255) NOT NULL,
  `descricao` text NOT NULL,
  `descricao_curta` varchar(255) NOT NULL,
  `imagem` varchar(255) NOT NULL DEFAULT 'no-image.png',
  `valor` decimal(10,2) NOT NULL,
  `ativo` enum('ativo','inativo') NOT NULL,
  `categoria_id` int unsigned DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `produtos_categoria_id_foreign` (`categoria_id`),
  CONSTRAINT `produtos_categoria_id_foreign` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
 

--
-- Dumping data for table `produtos`
--

LOCK TABLES `produtos` WRITE;
 
INSERT INTO `produtos` VALUES (3,2,'SUCO UVA XANDO 900ML','SUCO UVA XANDO 900ML','SUCO UVA XANDO 900ML','http://cardapio.padariaportuense.com.br/SUCO_UVA_XANDO.jpg',13.70,'inativo',1,'2021-01-21 11:27:49','2021-01-21 11:35:36'),(4,2,'SUCO 1 XANDO 900ML','SUCO 1 XANDO 900ML','SUCO 1 XANDO 900ML','http://cardapio.padariaportuense.com.br/SUCO_UVA_XANDO.jpg',13.60,'inativo',1,'2021-01-21 11:35:27','2021-02-01 16:42:51'),(5,2,'SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','http://cardapio.padariaportuense.com.br/SUCO_MANGA_XANDO.jpg',13.70,'inativo',1,'2021-02-01 15:18:48','2021-02-01 15:21:34'),(6,2,'SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','http://cardapio.padariaportuense.com.br/SUCO_MANGA_XANDO.jpg',13.70,'inativo',1,'2021-02-01 15:18:48','2021-02-01 15:21:41'),(7,2,'SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','http://cardapio.padariaportuense.com.br/SUCO_MANGA_XANDO.jpg',13.70,'inativo',1,'2021-02-01 15:18:49','2021-02-01 15:23:53'),(8,2,'SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','http://cardapio.padariaportuense.com.br/SUCO_MANGA_XANDO.jpg',13.70,'inativo',1,'2021-02-01 16:26:40','2021-02-01 16:43:12'),(9,2,'SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','http://cardapio.padariaportuense.com.br/SUCO_MANGA_XANDO.jpg',13.70,'inativo',1,'2021-02-01 16:26:41','2021-02-01 16:43:14'),(10,2,'SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','http://cardapio.padariaportuense.com.br/SUCO_MANGA_XANDO.jpg',13.70,'inativo',1,'2021-02-01 16:26:41','2021-02-01 16:43:17'),(11,2,'AGUA de coco','SUCO 1 XANDO 900ML','SUCO 1 XANDO 900ML','uploads/2021-02-04T12:36:10.560Z_heroes.png',13.10,'inativo',1,'2021-02-01 16:26:42','2021-02-04 10:03:17'),(14,2,'AGUA de coco','SUCO 1 XANDO 900ML','SUCO 1 XANDO 900ML','http://cardapio.padariaportuense.com.br/SUCO_MANGA_XANDO.jpg',13.10,'inativo',1,'2021-02-01 16:49:15','2021-02-04 12:25:24'),(15,2,'SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','http://cardapio.padariaportuense.com.br/SUCO_MANGA_XANDO.jpg',13.70,'ativo',1,'2021-02-01 17:27:53','2021-02-01 17:27:53'),(16,2,'AGUA de coco','SUCO 1 XANDO 900ML','SUCO 1 XANDO 900ML','http://cardapio.padariaportuense.com.br/SUCO_UVA_XANDO.jpg',13.10,'inativo',1,'2021-02-01 17:28:35','2021-02-04 12:25:50'),(17,2,'AGUA de coco','SUCO 1 XANDO 900ML','SUCO 1 XANDO 900ML','http://cardapio.padariaportuense.com.br/SUCO_MANGA_XANDO.jpg',13.10,'ativo',1,'2021-02-01 17:29:23','2021-02-04 12:26:07'),(18,2,'SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','http://cardapio.padariaportuense.com.br/SUCO_MANGA_XANDO.jpg',13.70,'ativo',1,'2021-02-01 17:36:35','2021-02-01 17:36:35'),(19,2,'SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','http://cardapio.padariaportuense.com.br/SUCO_MANGA_XANDO.jpg',13.70,'ativo',1,'2021-02-01 17:37:02','2021-02-01 17:37:02'),(20,2,'SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','http://cardapio.padariaportuense.com.br/SUCO_MANGA_XANDO.jpg',13.70,'ativo',1,'2021-02-01 17:37:52','2021-02-01 17:37:52'),(21,2,'AGUA de coco','SUCO 1 XANDO 900ML','SUCO 1 XANDO 900ML','http://cardapio.padariaportuense.com.br/SUCO_MANGA_XANDO.jpg',13.10,'ativo',1,'2021-02-01 17:37:59','2021-02-03 11:54:42'),(23,2,'SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','no-image.png',13.70,'ativo',1,'2021-02-01 17:38:36','2021-02-01 17:38:36'),(24,2,'SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','no-image.png',13.70,'ativo',1,'2021-02-01 17:38:43','2021-02-01 17:38:43'),(25,2,'AGUA de coco','SUCO 1 XANDO 900ML','SUCO 1 XANDO 900ML','no-image.png',13.10,'ativo',1,'2021-02-01 17:38:44','2021-02-02 12:24:53'),(26,7,'SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','no-image.png',13.70,'ativo',1,'2021-02-02 09:52:14','2021-02-02 09:52:14'),(27,7,'SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','no-image.png',13.70,'ativo',1,'2021-02-02 09:57:34','2021-02-02 09:57:34'),(28,7,'SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','no-image.png',13.70,'ativo',1,'2021-02-02 10:00:13','2021-02-02 10:00:13'),(29,2,'AGUA de coco','SUCO 1 XANDO 900ML','SUCO 1 XANDO 900ML','no-image.png',13.10,'ativo',1,'2021-02-02 10:01:43','2021-02-02 11:52:21'),(30,7,'SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','no-image.png',13.70,'ativo',1,'2021-02-02 12:56:21','2021-02-02 12:56:21'),(31,7,'SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','no-image.png',13.70,'ativo',1,'2021-02-03 11:40:31','2021-02-03 11:40:31'),(32,7,'SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','no-image.png',13.70,'ativo',1,'2021-02-03 11:41:17','2021-02-03 11:41:17'),(33,7,'SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','no-image.png',13.70,'ativo',1,'2021-02-03 11:42:23','2021-02-03 11:42:23'),(34,2,'AGUA de coco','SUCO 1 XANDO 900ML','SUCO 1 XANDO 900ML','no-image.png',13.10,'inativo',1,'2021-02-03 11:45:10','2021-02-04 10:17:47'),(35,7,'SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','no-image.png',13.70,'ativo',1,'2021-02-03 12:00:14','2021-02-03 12:00:14'),(36,7,'SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','no-image.png',13.70,'ativo',1,'2021-02-03 12:00:14','2021-02-03 12:00:14'),(37,7,'SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','asddasdsddasd.png',13.70,'ativo',1,'2021-02-03 12:01:57','2021-02-03 12:01:57'),(38,7,'SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','asddasdsddasd.png',13.70,'ativo',1,'2021-02-03 12:29:37','2021-02-03 12:29:37'),(39,7,'SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','no-image.png',13.70,'ativo',1,'2021-02-03 14:17:51','2021-02-03 14:17:51'),(40,7,'SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','no-image.png',13.70,'ativo',1,'2021-02-03 14:19:05','2021-02-03 14:19:05'),(41,7,'SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','uploads/2021-02-03T17:32:25.800Zjaneiro_2021.pdf',13.70,'ativo',1,'2021-02-03 14:32:25','2021-02-03 14:32:25'),(43,7,'SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','uploads/2021-02-03T17:56:32.272Z_janeiro_2021.pdf',13.70,'ativo',1,'2021-02-03 14:56:32','2021-02-03 14:56:32'),(44,7,'SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','uploads/2021-02-03T18:00:11.986Z_janeiro_2021.pdf',13.70,'ativo',1,'2021-02-03 15:00:11','2021-02-03 15:00:11'),(45,7,'SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','uploads/2021-02-04T12:24:52.191Z_certificado-dowhile.pdf',13.44,'ativo',1,'2021-02-03 15:00:44','2021-02-04 09:24:52'),(46,7,'SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','uploads/2021-02-03T18:29:03.865Z_certificado-dowhile.pdf',13.70,'ativo',1,'2021-02-03 15:29:03','2021-02-03 15:29:03'),(47,7,'SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','uploads/2021-02-03T18:29:08.381Z_certificado-dowhile.pdf',13.70,'ativo',1,'2021-02-03 15:29:08','2021-02-03 15:29:08'),(48,7,'Edney','Edney','Edney','uploads/2021-02-04T12:47:36.390Z_maktub1.png',13.70,'ativo',1,'2021-02-04 09:47:36','2021-02-04 09:47:36'),(49,7,'Edney','Edney','Edney','uploads/2021-02-04T12:47:37.943Z_maktub1.png',13.70,'ativo',1,'2021-02-04 09:47:37','2021-02-04 09:47:37'),(50,2,'AGUA de coco','SUCO 1 XANDO 900ML','SUCO 1 XANDO 900ML','uploads/2021-02-04T12:47:38.472Z_maktub1.png',13.10,'inativo',1,'2021-02-04 09:47:38','2021-02-04 12:08:13'),(51,2,'AGUA de coco','SUCO 1 XANDO 900ML','SUCO 1 XANDO 900ML','uploads/2021-02-04T13:17:51.491Z_maktub1.png',13.10,'inativo',1,'2021-02-04 10:17:51','2021-02-04 12:08:09'),(52,2,'AGUA de coco','SUCO 1 XANDO 900ML','SUCO 1 XANDO 900ML','uploads/2021-02-04T13:17:52.240Z_maktub1.png',13.10,'inativo',1,'2021-02-04 10:17:52','2021-02-04 12:08:16'),(53,7,'Edney','Edney','Edney','uploads/2021-02-04T13:17:53.009Z_maktub1.png',13.70,'ativo',1,'2021-02-04 10:17:53','2021-02-04 10:17:53'),(54,7,'Edney','Edney','Edney','uploads/2021-02-04T15:18:01.569Z_maktub1.png',13.70,'ativo',1,'2021-02-04 12:18:01','2021-02-04 12:18:01'),(55,7,'Edney','Edney','Edney','uploads/2021-02-04T15:18:07.705Z_maktub1.png',13.70,'ativo',1,'2021-02-04 12:18:07','2021-02-04 12:18:07'),(56,7,'Edney','Edney','Edney','uploads/2021-02-04T15:18:21.773Z_maktub1.png',13.70,'ativo',1,'2021-02-04 12:18:21','2021-02-04 12:18:21'),(57,7,'Edney','Edney','Edney','uploads/2021-02-04T15:18:26.097Z_maktub1.png',13.70,'ativo',1,'2021-02-04 12:18:26','2021-02-04 12:18:26'),(58,7,'Edney','Edney','Edney','uploads/2021-02-04T15:46:19.411Z_maktub1.png',13.70,'ativo',1,'2021-02-04 12:46:19','2021-02-04 12:46:19'),(59,7,'Edney','Edney','Edney','uploads/2021-02-04T15:47:59.771Z_maktub1.png',13.70,'ativo',1,'2021-02-04 12:47:59','2021-02-04 12:47:59'),(60,7,'Edney','Edney','Edney','uploads/2021-02-04T15:48:36.600Z_maktub1.png',13.70,'ativo',1,'2021-02-04 12:48:36','2021-02-04 12:48:36'),(61,7,'Edney','Edney','Edney','uploads/2021-02-04T15:48:46.351Z_maktub1.png',13.70,'ativo',1,'2021-02-04 12:48:46','2021-02-04 12:48:46'),(62,7,'Edney','Edney','Edney','uploads/2021-02-04T17:51:45.018Z_maktub1.png',13.70,'ativo',1,'2021-02-04 14:51:45','2021-02-04 14:51:45');
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
 
 
CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `facebook_token` varchar(255) DEFAULT NULL,
  `nivel_acesso` int NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
 

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;

INSERT INTO `users` VALUES (2,'adm','adm@adm','$2b$05$qDGqI56sWQZAObFyCtJ4xu3oqVWLJPy5d3YBLytUYsj0ZZoo3vxVG','1',1,'2021-02-02 11:19:51','2021-02-02 11:19:51'),
(3,'Edney Fillipi','edneyed@hotmail.com','$2b$05$qDGqI56sWQZAObFyCtJ4xu3oqVWLJPy5d3YBLytUYsj0ZZoo3vxVG',NULL,1,'2021-02-03 16:31:16','2021-02-04 18:35:48'),(87,'Cristiano','cristiano@hotmail.com','$2b$05$Z6PZkMYWot3kHDmCTj8n6eglM4wh0Me4HGk9CLij54Svlo5vFubDK',NULL,1,'2021-02-04 17:57:28','2021-02-04 18:36:33');

UNLOCK TABLES;

