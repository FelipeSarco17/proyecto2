let productosHomePage = [];
let favoritosHomePage = [];
let carritoHomePage = [];
let productoElegido;

fetch("./js/productos.json")
    .then(response => response.json())
    .then((data) => {

        productosHomePage = data;

        let seccionProductos = document.querySelector("#seccionProductos");
        let seccionNuevos = document.querySelector("#seccionNuevos");
        
        cargarProductos();
        productosHomePage.forEach((producto,index) => {
           
           

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
                    <img src="${producto.imagen}" alt="" >
 
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

        

        

    })
    .catch((error) => console.error("No se pudo conseguir la data:", error));

window.onload = () => {

    let usuarioLogin = leerUsuarioLogueado();
    let favoritosHomePage= leerFavoritos();
    let botonesFav = document.querySelectorAll("#corazonVacio");
    let carritoHomePage= leerCarrito();
    let botonesCarrito = document.querySelectorAll("#carritoAñadir");

    if (usuarioLogin) {

        let perfil = document.querySelector("#botonLogIn");
        perfil.innerHTML = `<img src="./img/user.svg" alt="LogoUser">${usuarioLogin.nombre}`;

    }

    

    let contadoresCarrito = document.querySelectorAll("#contadorCarrito");
    contadoresCarrito.forEach((contadorCarrito) => {
        contadorCarrito.innerText = `${carritoHomePage.length}`;
    });

    

    
    

    let contadoresFavoritos = document.querySelectorAll("#contadorFavs");
    contadoresFavoritos.forEach((contadorFavoritos) => {
        contadorFavoritos.innerText = `${favoritosHomePage.length}`;
    });

    favoritosHomePage.forEach((producto)=>{
        botonesFav[producto.id-1].classList.add("logoFavCardActive");
    });

    carritoHomePage.forEach((producto)=>{
        botonesCarrito[producto.id-1].classList.add("logoCartCardActive");
    });

};




let usuarios = [{
    email: "felipe@gmail.com",
    password: "1234",
    nombre: "Felipe",
    apellido: "sarco",
    telefono: "38123123",
    domicilio: "bascary 4365"
}
    , {
    email: "gustavo@gmail.com",
    password: "4324",
    nombre: "Gustavo",
    apellido: "sarco",
    telefono: "38123123",
    domicilio: "bascary 4365"
}
];



// LOCAL STORAGE

function leerCarrito() {
    let carritoLocalStorage = JSON.parse(localStorage.getItem("carrito"));
    if (carritoLocalStorage) {

        return carritoLocalStorage;
    }

}

function leerUsuarioLogueado() {
    let usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
    if (usuarioLogueado) {
        return usuarioLogueado;
    }
}

function leerFavoritos() {

    let favoritosLocalStorage = JSON.parse(localStorage.getItem("favoritos"));
    if (favoritosLocalStorage) {
        return favoritosLocalStorage;
    }

}

function cargarFavoritos(data) {
    localStorage.setItem("favoritos", JSON.stringify(data));
}

function cargarProductos() {
    localStorage.setItem("productos", JSON.stringify(productosHomePage));
}

function cargarCarrito(data) {
    localStorage.setItem("carrito", JSON.stringify(data));
}

function cargarUsuario(data) {
    localStorage.setItem("usuarioLogueado", JSON.stringify(data));
}

function cargarProductoElegido(data) {
    localStorage.setItem("productoElegido", JSON.stringify(data))
}

// ****************************


// BOTON LOGIN

const botonLogin = document.querySelector("#botonModalLogin");
botonLogin.setAttribute("data-bs-dismiss", " ");
botonLogin.addEventListener("click", (e) => {

    const email = document.querySelector("#inputEmail").value;
    const password = document.querySelector("#inputPass").value;
    let login = false;


    for (let i = 0; i < usuarios.length; i++) {

        if (usuarios[i].email == email && usuarios[i].password == password) {
            let perfil = document.querySelector("#botonLogIn");
            botonLogin.setAttribute("data-bs-dismiss", "modal");
            cargarUsuario(usuarios[i]);
            perfil.innerHTML = `<img src="./img/user.svg" alt="LogoUser">${usuarios[i].nombre}`;
            login = true;

        }
        else {

            let modalBodyLogin = document.querySelector("#modalBodyLogin");
            modalBodyLogin.innerHTML = `
            <form action="" id="formLogin">

            <label for="inputEmail"><img src="./img/user.svg" alt="logoUser">Email</label>
            <input type="text" name="email" id="inputEmail" required>
            <label for="inputPass"><img src="./img/logoPassword.svg" alt="logoPassword">Contraseña</label>
            <input type="password" name="pass" id="inputPass" required>
            </form>
            <p style="color:red; text-align:center; margin-top:5px;">La contraseña o el correo ingresados son incorrectos</p>
            <p id="linksModal"><a href="" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">¿No tienes una cuenta?</a> <a href="">¿Olvidaste tu contraseña?</a></p>
            `;

        }

        if (login) break;

    }



});

// ****************************

// BOTON REGISTRARSE
const botonRegistro = document.querySelector("#botonRegistrarse");
const inputsRegistro = document.querySelectorAll(".inputRegistro");
botonRegistro.setAttribute("data-bs-dismiss", " ");


botonRegistro.addEventListener("click", () => {


    inputsRegistro.forEach((input) => {
        if (!input.value) {
            return
        }

    });

    usuarios.push(usuarioNuevo);
    let perfil = document.querySelector("#botonLogIn");

    perfil.innerHTML = `<img src="./img/user.svg" alt="LogoUser">${usuarioNuevo.nombre}`;
    botonRegistro.setAttribute("data-bs-dismiss", "modal");
});

// ****************************


// BOTON CARRITO

function funcionesCarrito(idProducto,elemento){
    añadirProductoAlCarrito(idProducto);
     carritoCheck(elemento);
 }


function añadirProductoAlCarrito(idProducto) {

    console.log(2);
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

function carritoCheck(elemento){
    let carritoAñadir = elemento.querySelector("#carritoAñadir");
    carritoAñadir.classList.add("logoCartCardActive");
}

// ****************************

// BOTON FAVORITOS

function funcionesFavorito(idProducto,elemento){
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

function llenarCorazon(elemento){
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


//ACORDEON CATEGORIAS


function cargarCategoria(data) {
    console.log(data);
    localStorage.setItem("categoriaBuscada", JSON.stringify(data));
}


//CARGAR PRODUCTO ELEGIDO

function subirProductoElegido(idProducto) {
    productosHomePage.forEach((producto) => {
        if (producto.id == idProducto) {
            cargarProductoElegido(producto);
        }
    });
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

        listaSugerencias.forEach(li=>{
            li.setAttribute("onclick","select(this)");
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
    botonBusqueda.setAttribute("onclick",`cargarCategoria('${selectUserData}')`);
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

botonCollapse.addEventListener("click",()=>{

    if(navBar.classList.contains("inActive")){
        navBar.classList.remove("inActive");
        navBar.classList.add("visible");
    }
    else{
        navBar.classList.remove("visible");
        navBar.classList.add("inActive");
    }

})