SELECT SUM(amount) AS total_sales_march
FROM orders
WHERE order_date BETWEEN '2024-03-01' AND '2024-03-31';