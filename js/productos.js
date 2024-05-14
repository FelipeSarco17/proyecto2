let categoriaBuscada = leerCategoriaBuscada();
let seccionProductosCategoria = document.querySelector("#productosCategoria");
let productosPaginaCategoria = leerProductos(); 
console.log(categoriaBuscada);
console.log(productosPaginaCategoria);
window.onload = ()=>{

    productosPaginaCategoria.forEach((producto)=>{
        console.log("hola");
        if(producto.categoria == categoriaBuscada){
            console.log("hola");
            seccionProductosCategoria.innerHTML +=`

            <article class="tarjetaProductoCategoria" id="producto${producto.id}">
            <div class="imgProductoCategoria">
                <img src="${producto.imagen}"
                    alt="">

            </div>

            <div class="card-body-categoria">

                <a href="${producto.link}">
                    <h5 class="card-title-categoria">${producto.nombre}</h5>
                </a>
                <div class="cardPrice-categoria">
                    <p class="tarjeta-text-categoria">
                        $${producto.precio}
                    </p>
                    <div class="contenedorBotonesCardsCategoria">

                        <button href="" id="botonFavoritoAñadir${producto.id}" class="botonFavoritos"
                            onclick="añadirProductoFavoritos(${producto.id})"><img src="./img/heartBlack.svg"
                                alt="LogoFavoritos" class="logoFavCards"></button>
                        <button href="" id="botonCarritoAñadir${producto.id}" class="botonCarritoAñadir"
                            onclick="añadirProductoAlCarrito(${producto.id})"><img src="./img/addCart.svg"
                                alt="CarritoAñadir"></button>

                    </div>
                </div>
            </div>
        </article>

            `;
        }



    });
    




}


function leerProductos(){
    let productos  = JSON.parse(localStorage.getItem("productos"));
    if(productos){
        return productos;
    }
}

function leerCategoriaBuscada(){
    let categoria = JSON.parse(localStorage.getItem("categoriaBuscada"));

    if(categoria){
        return categoria;
    }

}