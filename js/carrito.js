let carrito = leerCarrito();
let listaCarrito = document.querySelector("#listadoCarrito");
let carritoVacio = document.querySelector("#carritoVacio");


if(carrito.length!=0){
    carritoVacio.style.display = "none";
}

carrito.forEach((productoCarrito)=>{

    listaCarrito.innerHTML += `

    <article class="productoCarrito">
        <div class="textoProductoCarrito">
            <img class="imgProductoCarrito" src="${productoCarrito.imagen}" alt="">
   
            <h4 class="nombreProducto">${productoCarrito.nombre}</h4>
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



function actualizarLista(){

    listaCarrito.innerHTML = "";

    
    if(carrito.length == 0){
        
        listaCarrito.innerHTML = `
        <div id="carritoVacio">
            <img src="../img/shoppingBag.svg" alt="logoBolsaCompras">
            <h4>¡Empieza un carrito de compras!</h4>
            <a href="../index.html" id="botonDescubriProductos">Descubrir productos</a>
        </div>`;    
        
    }
    else{
        carrito.forEach((productoCarrito)=>{

            listaCarrito.innerHTML += `
        
            <article class="productoCarrito">
                <div class="textoProductoCarrito">
                    <img class="imgProductoCarrito" src="${productoCarrito.imagen}" alt="">
           
                    <h4 class="nombreProducto">${productoCarrito.nombre}</h4>
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
    }
    
}





