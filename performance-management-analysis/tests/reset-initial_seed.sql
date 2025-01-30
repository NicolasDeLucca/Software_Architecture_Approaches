-- Declaramos el nombre y apellido del cliente
SET @cliente_nombre = '{NombreApellido Cliente POST2}';

-- Eliminamos los registros de la tabla DetalleFacturas relacionados con el cliente
DELETE df
FROM `sales-db`.DetalleFacturas df
JOIN `sales-db`.Facturas f ON df.IdVenta = f.IdVenta
JOIN `sales-db`.Clientes c ON f.IdCliente = c.IdCliente
WHERE c.NombreApellido = @cliente_nombre;

-- Eliminamos los registros de la tabla Facturas relacionados con el cliente
DELETE f
FROM `sales-db`.Facturas f
JOIN `sales-db`.Clientes c ON f.IdCliente = c.IdCliente
WHERE c.NombreApellido = @cliente_nombre;
