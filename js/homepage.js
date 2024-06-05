let productosHomePage = [];
let favoritosHomePage = [];
let carritoHomePage = [];
let usuariosHomePage = [];
let productoElegido;

fetch("./js/productos.json")
    .then(response => response.json())
    .then((data) => {
        productosHomePage = data;
        if(JSON.parse(localStorage.getItem("productos")) == null){
            cargarProductos(productosHomePage);
        }
        
    })
    .catch((error) => console.error("No se pudo conseguir la data:", error));

fetch("./js/usuarios.json")
.then(response => response.json())
.then((data)=>{
    usuariosHomePage = data;
    if(JSON.parse(localStorage.getItem("usuarios")) == null){
        cargarUsuarios(usuariosHomePage);
    }
})
.catch((error) => console.error("No se pudo conseguir la data:", error));


window.onload = () => {

    productosHomePage = leerProductos();
    let favoritosHomePage = leerFavoritos();
    let botonesFav = document.querySelectorAll("#corazonVacio");
    let carritoHomePage = leerCarrito();
    let botonesCarrito = document.querySelectorAll("#carritoAñadir");

    let seccionProductos = document.querySelector("#seccionProductos");
    seccionProductos.innerHTML = ``;

    let seccionNuevos = document.querySelector("#seccionNuevos");
    seccionNuevos.innerHTML = ``;

    // cargarProductos(productosHomePage);
    productosHomePage.forEach((producto, index) => {

        

        if (producto.destacado) {
            seccionProductos.innerHTML += `

            <article class="tarjeta" id="producto${producto.id}">
                <div class="tarjeta-img-top">
                    <a href="${producto.link}" onclick="subirProductoElegido(${producto.id})">
                    <img src="${producto.imagen}" alt="" >
                    </a>
                </div>
          
                <div class="card-body">

                    <a href="${producto.link}" onclick="subirProductoElegido(${producto.id})">
                    <h5 class="card-title">${producto.nombre}</h5>
                    </a>
                    <div class="cardPrice">
                        <p class="tarjeta-text">
                        $${producto.precio}
                        </p>
                        <div class="contenedorBotonesCards">
                        <button href="" id="botonFavoritoAñadir${producto.id}" class="botonFavoritos"
                         onclick="funcionesFavorito(${producto.id},this)"><img src="./img/heartBlack.svg" alt="LogoFavoritos"
                        class="logoFavCartCards" id="corazonVacio"><img class="logoFavCartCards" src="./img/heartFill.svg" alt="logoFavoritosCheck"></button>
                        
                        <button href="" id="botonCarritoAñadir${producto.id}" class="botonCarritoAñadir"
                        onclick="funcionesCarrito(${producto.id},botonCarritoAñadir${producto.id})"><img src="./img/addCart.svg"
                        alt="CarritoAñadir" id="carritoAñadir" class="logoFavCartCards" ><img class="logoFavCartCards" src="./img/cartCheck.svg" alt="cartCheckLogo"></button>
                        </div>
                    </div>
                </div>
            </article>
        
            `;
        }

        if (producto.nuevo) {



            seccionNuevos.innerHTML += `

            <article class="tarjeta" id="producto${producto.id}">
                <div class="tarjeta-img-top">
                    <a href="${producto.link}" onclick="subirProductoElegido(${producto.id})">
                        <img src="${producto.imagen}" alt="" >
                    </a>
                </div>
          
                <div class="card-body">

                    <a href="${producto.link}" onclick="subirProductoElegido(${producto.id})">
                    <h5 class="card-title">${producto.nombre}</h5>
                    </a>
                    <div class="cardPrice">
                        <p class="tarjeta-text">
                        $${producto.precio}
                        </p>
                        <div class="contenedorBotonesCards">
                        <button  id="botonFavoritoAñadir${producto.id}" class="botonFavoritos"
                         onclick="funcionesFavorito(${producto.id},botonFavoritoAñadir${producto.id})"><img src="./img/heartBlack.svg" alt="LogoFavoritos"
                        class="logoFavCards" id="corazonVacio"><img src="./img/heartFill.svg" alt="logoFavoritosCheck" class="logoFavFill" id="corazonLleno"></button>
                        
                        <button  id="botonCarritoAñadir${producto.id}" class="botonCarritoAñadir"
                        onclick="funcionesCarrito(${producto.id},botonCarritoAñadir${producto.id})"><img src="./img/addCart.svg"
                        alt="CarritoAñadir" id="carritoAñadir" class=" "><img src="./img/cartCheck.svg" alt="cartCheckLogo"></button>
                        </div>
                    </div>
                </div>
            </article>
        
            `;
        }


    });


    let contadoresCarrito = document.querySelectorAll("#contadorCarrito");
    contadoresCarrito.forEach((contadorCarrito) => {
        contadorCarrito.innerText = `${carritoHomePage.length}`;
    });


    let contadoresFavoritos = document.querySelectorAll("#contadorFavs");
    contadoresFavoritos.forEach((contadorFavoritos) => {
        contadorFavoritos.innerText = `${favoritosHomePage.length}`;
    });

    favoritosHomePage.forEach((producto) => {
        botonesFav[producto.id - 1].classList.add("logoFavCardActive");
    });

    carritoHomePage.forEach((producto) => {
        botonesCarrito[producto.id - 1].classList.add("logoCartCardActive");
    });

};








// LOCAL STORAGE


// BOTON CARRITO

function funcionesCarrito(idProducto, elemento) {
    añadirProductoAlCarrito(idProducto);
    carritoCheck(elemento);
}


function añadirProductoAlCarrito(idProducto) {

    
    let productoCarrito;
    productosHomePage.forEach((producto) => {

        if (idProducto == producto.id && producto.enCarrito == false) {

            productoCarrito = producto;
        }
        else {
            return;
        }
    });


    productoCarrito.enCarrito = true;
    productoCarrito.cantidadEnCarrito = 1;
    carritoHomePage.push(productoCarrito);
    cargarCarrito(carritoHomePage);
    let contadoresCarrito = document.querySelectorAll("#contadorCarrito");

    contadoresCarrito.forEach((contadorCarrito) => {
        contadorCarrito.innerText = `${carritoHomePage.length}`;
    });


}

function carritoCheck(elemento) {
    let carritoAñadir = elemento.querySelector("#carritoAñadir");
    carritoAñadir.classList.add("logoCartCardActive");
}

// ****************************

// BOTON FAVORITOS

function funcionesFavorito(idProducto, elemento) {
    añadirProductoFavoritos(idProducto);
    llenarCorazon(elemento);
}

function añadirProductoFavoritos(idProducto) {

    let productoFavorito;
    productosHomePage.forEach((producto) => {

        if (idProducto == producto.id && producto.enFavoritos == false) {

            productoFavorito = producto;
        }
        else {
            return;
        }
    });

    productoFavorito.enFavoritos = true;
    favoritosHomePage.push(productoFavorito);
    cargarFavoritos(favoritosHomePage);
    let contadoresFavoritos = document.querySelectorAll("#contadorFavs");
    contadoresFavoritos.forEach((contadorFavoritos) => {
        contadorFavoritos.innerText = `${favoritosHomePage.length}`;
    });

}

function llenarCorazon(elemento) {
    let corazonVacio = elemento.querySelector("#corazonVacio");
    corazonVacio.classList.add("logoFavCardActive");
}

// ****************************

//SLIDER DESTACADOS

let botonesSlider = document.querySelectorAll(".botonSlider");
let product = document.getElementsByClassName("tarjeta");
let seccionProductos = document.querySelector("#seccionProductos");
let seccionNuevos = document.querySelector("#seccionNuevos");


let right_moverDestacados = () => {
    seccionProductos.scrollLeft += 920;
}

let left_moverDestacados = () => {
    seccionProductos.scrollLeft -= 920;
}

let right_moverNuevos = () => {
    seccionNuevos.scrollLeft += 920;
}

let left_moverNuevos = () => {
    seccionNuevos.scrollLeft -= 920;
}




//BUSCADOR

let sugerencias = [
    "Placas de Video Radeon AMD",
    "Placas de Video GeForce",
    "Fuentes",
    "Procesadores Intel",
    "Procesadores AMD",
    "Mothers AMD",
    "Mothers Intel",
    "Monitores y pantallas",
    "Sillas Gamers",
    "Auriculares",
    "Teclados",
    "Mouses",
    "Mouse Pads",
    "Microfonos",
    "Webcam",
    "Joystick",
    "Parlantes",
    "Memorias",
    "Memorias Notebook",
    "Discos Rigidos",
    "Discos Externos",
    "Discos Solidos SSD",
    "Gabinetes"
];

let contenedorBusqueda = document.querySelector(".contenedorBusqueda");
let inputSearch = contenedorBusqueda.querySelector("input");
let botonBusqueda = contenedorBusqueda.querySelector("a");
let contenedorSugerencias = contenedorBusqueda.querySelector(".sugerencias");

inputSearch.onkeyup = e => {

    let busqueda = e.target.value
    let emptyArray = [];

    if (busqueda) {

        emptyArray = sugerencias.filter(data => {
            return data.toLocaleLowerCase().startsWith(busqueda.toLocaleLowerCase());
        });

        emptyArray = emptyArray.map(data => {
            return data = `<li>${data}</li>`;
        });

        contenedorBusqueda.classList.add("active");
        mostrarSugerencias(emptyArray);

        let listaSugerencias = contenedorBusqueda.querySelectorAll("li");

        listaSugerencias.forEach(li => {
            li.setAttribute("onclick", "select(this)");
        });


    } else {
        contenedorBusqueda.classList.remove("active");
    }





};

function select(elemento) {

    let selectUserData = elemento.textContent;
    console.log(selectUserData);
    inputSearch.value = selectUserData;
    botonBusqueda.href = "./productos.html";
    botonBusqueda.setAttribute("onclick", `cargarCategoria('${selectUserData}')`);
    contenedorBusqueda.classList.remove("active");
}


function mostrarSugerencias(list) {
    let listData;

    if (!list.length) {
        userValue = inputSearch.value;
        listData = `<li>${userValue}</li>`
    }
    else {
        listData = list.join(" ");
    }

    contenedorSugerencias.innerHTML = listData;


}

//BOTON COLLAPSE NAV

let botonCollapse = document.querySelector("#botonCollapse");
let navBar = document.querySelector("nav");
console.log(navBar.classList);

botonCollapse.addEventListener("click", () => {

    if (navBar.classList.contains("inActive")) {
        navBar.classList.remove("inActive");
        navBar.classList.add("visible");
    }
    else {
        navBar.classList.remove("visible");
        navBar.classList.add("inActive");
    }

})