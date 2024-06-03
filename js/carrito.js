let carrito = leerCarrito();
let listaCarrito = document.querySelector("#listadoCarrito");
let carritoVacio = document.querySelector("#carritoVacio");
let resumen = document.querySelector("#resumenCarrito");
let productosResumen = document.querySelector("#resumenCarrito");


if(carrito.length!=0){
    carritoVacio.style.display = "none";
    actualizarLista();
}




function leerCarrito(){
    let carrito = localStorage.getItem("carrito");
    return JSON.parse(carrito);
}



function cargarCarrito(data){
    localStorage.setItem("carrito",JSON.stringify(data));
}


function eliminarProductoCarrito(idProducto){
    
    let productoEliminar;
    let indice;
    let contadorCarrito = document.querySelector("#contadorCarrito");


    carrito.forEach((productoCarrito,index)=>{

        if(productoCarrito.id==idProducto){
            
            productoEliminar = productoCarrito;
            indice = index;
        }

    });
    
    if(productoEliminar.cantidadEnCarrito == 1){
        
        carrito.splice(indice,1);
        
    }
    else{
        productoEliminar.cantidadEnCarrito--;
        carrito[indice] = productoEliminar;
    }

    contadorCarrito.innerText = `${carrito.length}`;

    cargarCarrito(carrito);
    actualizarLista();
    

}

function agregarProductoCarrito(idProducto){
    let productoAgregar;
    let indice;
    carrito.forEach((productoCarrito,index)=>{

        if(productoCarrito.id == idProducto){
            productoAgregar = productoCarrito;
            indice = index;
        }
    });

    productoAgregar.cantidadEnCarrito++;
    carrito[indice] = productoAgregar;
    cargarCarrito(carrito);
    actualizarLista();
}

function actualizarLista(){

    listaCarrito.innerHTML = "";
    let subTotalProductos = 0;
    let cantidadProductos = 0;
    let total = 0;

    if(carrito.length == 0){
        
        listaCarrito.innerHTML = `
        <div id="carritoVacio">
            <img src="../img/shoppingBag.svg" alt="logoBolsaCompras">
            <h4>¡Empieza un carrito de compras!</h4>
            <a href="../index.html" class="botonesGrandesCarrito">Descubrir productos</a>
        </div>`; 
        
        productosResumen.innerHTML = `
        
        <h4 id="tituloResumen"><img src="./img/resumenCompra.svg" alt="">  Resumen de compras</h4>
        <hr>
        <p id="textoResumenVacio">Aqui veras los importes de tu compra una vez que agregues productos.</p>
        
        
        `;
        
    }
    else{
        carrito.forEach((productoCarrito)=>{

            subTotalProductos += (productoCarrito.cantidadEnCarrito * productoCarrito.precio);
            cantidadProductos +=  productoCarrito.cantidadEnCarrito; 
            listaCarrito.innerHTML += `
        
            <article class="productoCarrito">
                <div class="textoProductoCarrito">
                    <img class="imgProductoCarrito" src="${productoCarrito.imagen}" alt="">
           
                    <a href="${productoCarrito.link}"><h4 class="nombreProducto">${productoCarrito.nombre}</h4></a>
                 </div>
        
                <div class="botonesCarrito">
                
                    <button class="restarProducto" onclick="eliminarProductoCarrito(${productoCarrito.id})">-</button>
                    <p class="cantidadProducto">${productoCarrito.cantidadEnCarrito}</p>
                    <button class="sumarProducto" onclick="agregarProductoCarrito(${productoCarrito.id})">+</button>
                
                    <p class="precioProductoLista">$${productoCarrito.precio*productoCarrito.cantidadEnCarrito}</p>
                </div>
        
            </article>
            
            
            `;
        

        });
        
        total = subTotalProductos + 10000;
        productosResumen.innerHTML = `
        
        <h4 id="tituloResumen"><img src="./img/resumenCompra.svg" alt="">  Resumen de compras</h4>
        <hr>
        <p id="textoResumenVacio" style="display:none;">Aqui veras los importes de tu compra una vez que agregues productos.</p>
        <div id="contenedorListaResumen">
            
            <div id="listaResumenCarrito">
           <ul id="titulosPrecios">
              <li><h5><img src="./img/shoppingBag.svg" alt="">  Productos (${cantidadProductos}):</h5></li>
              <li><h5><img src="./img/envioLogo.svg" alt="">  Envío:</h5></li>
              <li><h5><img src="./img/totalLogo.svg" alt="">  Total:</h5></li>
            </ul>
          
            <ul id="sumaPrecios">
              <li><h5 id="preciosProductos">$${subTotalProductos}</h5></li>
              <li><h5 id="precioEnvio">$10000</h5></li>
              <li><h5 id="precioTotal">$${total}</h5></li>
            </ul>
          
          </div>
          <a href="" class="botonesGrandesCarrito">Continuar Compra</a>


        </div>
        
        `;

    }
    
}





