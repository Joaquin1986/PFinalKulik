//CLASES

//CLASE 'PRODUCTO' CON CONSTRUCTOR DE OBJETO

export class Producto {
    constructor(id, nombre, descripcion, categoria, precio, imgURL) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.precio = precio;
        this.imgURL = imgURL;
    }
    precioIVA() {
        return Math.round(this.precio * 1.23);
    }
}

//CLASE 'PEDIDO' CON CONSTRUCTOR DE OBJETO

export class Pedido {
    constructor(id, fecha, hora, productos, cantidadProductos, preciosProductos, precio, entregado) {
        this.id = id;
        this.fecha = fecha;
        this.hora = hora;
        this.productos = productos;
        this.cantidadProductos = cantidadProductos;
        this.preciosProductos = preciosProductos;
        this.precio = precio;
        this.entregado = entregado;
    }
    Iva() {
        return Math.round(this.precio * 0.23);
    }

    precioIva() {
        return Math.round(this.precio * 1.23);
    }

    cantidadDe(prod) {
        let indiceProd;
        //SE BUSCA EL INDICE DEL PRODUCTO
        for (let i = 0; i < this.productos.length; i++) {
           (prod.id == this.productos[i].id)? indiceProd = i:null;
        }
        //SE DEVUELVE LA CANTIDAD DE PRODUCTOS CON ESE MISMO INDICE
        return parseInt(this.cantidadProductos[indiceProd]);
    }

    esVacio() {
        //SE DEVUELVE TRUE SI EL PEDIDO NO TIENE PRODUCTOS AGREGADOS O FALSE EN CASO CONTRARIO
        let esVacio;
        const suma = this.cantidadProductos.reduce(
            (acumulador, valorActual) => acumulador + valorActual, 0
        );
        (suma < 1) ? esVacio = true : esVacio = false;
        return esVacio;
    }

    detalle() {
        //DEVUELVE UNA CADENA O STRING PARA PASARLE AL SWEET ALERT EL DETALLE DEL PEDIDO
        let detallePedido = "";
        for (let i = 0; i < this.productos.length; i++) {
            detallePedido += this.productos[i].nombre + " | Cantidad: " +
                this.cantidadProductos[i] + " | Precio: $" + this.preciosProductos[i] + "<br>";
        }
        return detallePedido;
    }

    yaEntregado() {
        let status;
        (this.entregado) ? status = "Ya entregado" : status = "Pendiente de entrega";
        return status;
    }
}