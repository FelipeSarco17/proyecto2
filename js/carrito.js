function leerCarrito(){
    let carrito = localStorage.getItem("carrito");
    return JSON.parse(carrito);
}


let carrito = leerCarrito();

