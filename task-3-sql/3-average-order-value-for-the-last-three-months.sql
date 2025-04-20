-- Assuming “last three months” from the latest date in the dataset (2024-03-30), so range is Jan 1 to Mar 31, 2024:
SELECT AVG(amount) AS average_order_value
FROM orders
WHERE order_date BETWEEN '2024-01-01' AND '2024-03-31';

-- Alternatively, if you want to show total sales and order count too:
SELECT COUNT(*)              AS order_count,
       SUM(amount)           AS total_sales,
       ROUND(AVG(amount), 2) AS average_order_value
FROM orders
WHERE order_date BETWEEN '2024-01-01' AND '2024-03-31';
