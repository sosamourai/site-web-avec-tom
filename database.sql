
CREATE DATABASE compashop;
USE compashop;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE,
  password VARCHAR(50)
);

CREATE TABLE prix (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT,
  store_id INT,
  price DECIMAL(10,2)
);
SELECT magasins.name, SUM(prix.prix) AS total
FROM prix
JOIN magasins ON prix.store_id = magasins.id
WHERE prix.product_id IN (1,2,3)
GROUP BY magasins.id
ORDER BY total ASC
LIMIT 1;