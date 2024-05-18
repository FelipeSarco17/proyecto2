let favoritos = [];
let listadoFavoritos = document.querySelector("#listadoFavoritos");
let listadoVacio = document.querySelector("#favoritosVacio");

favoritos = leerFavoritos();
console.log(favoritos);


if(favoritos.length != 0){
    listadoVacio.style.display = "none";
    actualizarLista();
}

function eliminarProductoFavorito(idProducto){
    
    let productoEliminar;
    let indice;
    let contadorFavorito = document.querySelector("#contadorFavs");
    favoritos.forEach((productoFavorito,index)=>{

        if(productoFavorito.id==idProducto){
            
            productoEliminar = productoFavorito;
            indice = index;
        }

    });
    
    favoritos.splice(indice,1);
   
    contadorFavorito.innerText = `${favoritos.length}`;

    cargarFavoritos(favoritos);
    actualizarLista(); 

}




function actualizarLista(){

    listadoFavoritos.innerHTML = "";

    if(favoritos.length==0){
        listadoFavoritos.innerHTML = `

        <div id="favoritosVacio">
            <img src="./img/heartFill.svg" alt="logoCorazonLleno">
            <h4>Todavia no tienes ningun producto en Favoritos</h4>
            <a href="./index.html" id="botonDescubrirProducto">Descubrir productos</a>
        </div> 

        `;
    }
    else{
        favoritos.forEach((productoFavorito)=>{

            listadoFavoritos.innerHTML += `

            <article class="productoFavorito">
                <div class="textoProductoFavorito">
                    <img class="imgProductoFavorito" src="${productoFavorito.imagen}" alt="">
                    <a href="${productoFavorito.link}"><h4 class="nombreProducto">${productoFavorito.nombre}</h4></a>
                </div>
    
                <div class="botonesProductosFavoritos">
            
                    <button class="quitarProducto" onclick="eliminarProductoFavorito(${productoFavorito.id})">Quitar</button>
                                
                    <p class="precioProductoFavorito">$${productoFavorito.precio}</p>
                </div>
    
            </article>
            
            
            `;




        });
    }

}

function leerFavoritos(){
    
    let favoritosLocalStorage = JSON.parse(localStorage.getItem("favoritos"));
    if(favoritosLocalStorage){
        return favoritosLocalStorage;
    }
}

function cargarFavoritos(data){
    localStorage.setItem("favoritos",JSON.stringify(data));
}






