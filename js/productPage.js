let productoMostrar = leerProductoElegido();
let productPage = document.querySelector("#contenedorEspecificaciones");
console.log(productoMostrar);

window.onload = () =>{
    productPage.innerHTML = `

    <div id="contenedorPrecioImagen">
        <img id="imagenProducto"
            src="${productoMostrar.imagen}"
            alt="">
        <article>
            <h2>${productoMostrar.nombre}</h2>
            <h3 id="precioContado"><img src="./img/totalLogo.svg" alt=""> Precio: <div>$${productoMostrar.precio}</div>
            </h3>
            <p id="precioFinanciado">12 cuotas sin interes de <strong>$${(productoMostrar.precio/12).toFixed(2)}</strong></p>
            <div id="tarjetasCreditoAceptadas">Pagando con:
                <img class="logoTarjeta"
                    src="https://static.vecteezy.com/system/resources/previews/020/335/998/original/visa-logo-visa-icon-free-free-vector.jpg"
                    alt="logoVisa">
                <img class="logoTarjeta"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/1200px-MasterCard_Logo.svg.png"
                    alt="logoMasterCard">
                <img class="logoTarjeta" src="https://www.e-fmc.com.ar/assets/images/01.jpg"
                    alt="logoTarjetaNaranja">
                <img class="logoTarjeta"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVqAIpvqV6G6pOi1ynvh-RUlLheyYuPCFdcWHRJROJrw&s"
                    alt="logoICBC">
            </div>
            <button id="botonAgregarCarrito"  onclick="añadirProductoAlCarrito(${productoMostrar.id})">Sumar al carrito</button>
        </article>
        
    </div>
    <article id="descripcion">
    <h3>Descripcion</h3>
    <p>${productoMostrar.descripcion}</p>
    </article>

`;
}







function leerProductoElegido(){
    let producto = JSON.parse(localStorage.getItem("productoElegido"));
    if(producto){
        return producto;
    }
}