drop database ecommerce;
create database ecommerce;
use ecommerce;
INSERT INTO `categorias` VALUES (1,'todos','2021-01-21 11:27:38','2021-01-21 11:27:38');

INSERT INTO `users` 
VALUES (1,'adm','adm@adm','$2b$05$qDGqI56sWQZAObFyCtJ4xu3oqVWLJPy5d3YBLytUYsj0ZZoo3vxVG','1',1,'2021-02-02 11:19:51','2021-02-02 11:19:51');

INSERT INTO `pedidos` 
VALUES 
(1,'2021-02-02 11:19:51',12.12,'bbbbbb',1,'2021-02-02 12:43:59','2021-02-02 12:43:59'),
(2,'2021-02-02 11:19:51',12.12,'bbbbbb',1,'2021-02-02 18:04:38','2021-02-02 18:04:38'),
(3,'2021-02-02 11:19:51',12.12,'bbbbbb',1,'2021-02-02 18:05:50','2021-02-02 18:05:50'),
(4,'2021-02-02 11:19:51',12.12,'bbbbbb',1,'2021-02-02 18:06:48','2021-02-02 18:06:48');
  
INSERT INTO `produtos` VALUES 
(1,2,'SUCO UVA XANDO 900ML','SUCO UVA XANDO 900ML','SUCO UVA XANDO 900ML','http://cardapio.padariaportuense.com.br/SUCO_UVA_XANDO.jpg',13.70,'ativo',1,'2021-01-21 11:27:49','2021-01-21 11:35:36'),
(2,2,'SUCO 1 XANDO 900ML','SUCO 1 XANDO 900ML','SUCO 1 XANDO 900ML','http://cardapio.padariaportuense.com.br/SUCO_UVA_XANDO.jpg',13.60,'ativo',1,'2021-01-21 11:35:27','2021-02-01 16:42:51'),
(3,2,'SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','http://cardapio.padariaportuense.com.br/SUCO_MANGA_XANDO.jpg',13.70,'ativo',1,'2021-02-01 15:18:48','2021-02-01 15:21:34'),
(4,2,'SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','http://cardapio.padariaportuense.com.br/SUCO_MANGA_XANDO.jpg',13.70,'ativo',1,'2021-02-01 15:18:48','2021-02-01 15:21:41'),
(5,2,'SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','SUCO MANGA XANDO 900ML','http://cardapio.padariaportuense.com.br/SUCO_MANGA_XANDO.jpg',13.70,'ativo',1,'2021-02-01 15:18:49','2021-02-01 15:23:53');
 
INSERT INTO `pedido_produtos` VALUES 
(1,1,1,'2021-02-02 11:19:51',1.000,13.90,''),
(2,1,3,'2021-02-02 11:19:51',1.000,13.90,''),
(3,4,4,'2021-02-02 11:19:51',1.000,13.90,''),
(4,1,5,'2021-02-02 11:19:51',1.000,13.90,''),
(5,2,1,'2021-02-02 11:19:51',1.000,13.90,''),
(6,2,3,'2021-02-02 11:19:51',1.000,13.90,''),
(7,3,2,'2021-02-02 11:19:51',1.000,13.90,''),
(8,2,5,'2021-02-02 11:19:51',1.000,13.90,''),
(9,3,1,'2021-02-02 11:19:51',1.000,13.90,''),
(10,4,3,'2021-02-02 11:19:51',2.000,13.90,'');

