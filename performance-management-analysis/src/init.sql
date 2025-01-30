CREATE TABLE Clientes (
    IdCliente BIGINT AUTO_INCREMENT PRIMARY KEY,
    NombreApellido VARCHAR(60) NOT NULL
);

CREATE TABLE Productos (
    IdProducto BIGINT AUTO_INCREMENT PRIMARY KEY,
    Descripcion VARCHAR(60) NOT NULL,
    PrecioUnitario DECIMAL(10, 2) NOT NULL,
    Existencia BIGINT NOT NULL
);

CREATE TABLE Facturas (
    IdVenta BIGINT AUTO_INCREMENT PRIMARY KEY,
    FechaVenta DATETIME NOT NULL,
    IdCliente BIGINT NOT NULL,
    TotalVenta DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (IdCliente) REFERENCES Clientes(IdCliente)
);

CREATE TABLE DetalleFacturas (
    IdVenta BIGINT NOT NULL,
    IdDetalle INT NOT NULL AUTO_INCREMENT,
    Cantidad INT NOT NULL,
    IdProducto BIGINT NOT NULL,
    TotalProducto DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (IdVenta, IdDetalle),
    FOREIGN KEY (IdVenta) REFERENCES Facturas(IdVenta),
    FOREIGN KEY (IdProducto) REFERENCES Productos(IdProducto)
);
