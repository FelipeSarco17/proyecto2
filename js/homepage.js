let productosHomePage = [];
let favoritosHomePage = [];
let carritoHomePage = [];

fetch("./js/productos.json")
.then(response => response.json())
.then((data)=>{
    
        productosHomePage = data;
     
        let seccionProductos = document.querySelector("#seccionProductos");
        let seccionNuevos = document.querySelector("#seccionNuevos");
        productosHomePage.forEach((producto)=>{
            cargarProductos();
        
        if(producto.destacado){
            seccionProductos.innerHTML += `

            <article class="tarjeta" id="producto${producto.id}">
                <div class="tarjeta-img-top">
                    <img src="${producto.imagen}" alt="" >
 
                </div>
          
                <div class="card-body">

                    <a href=" ">
                    <h5 class="card-title">${producto.nombre}</h5>
                    </a>
                    <div class="cardPrice">
                        <p class="tarjeta-text">
                        $${producto.precio}
                        </p>

                        <button href="" id="botonFavoritoAñadir${producto.id}" class="botonFavoritos"
                         onclick="añadirProductoFavoritos(${producto.id})"><img src="./img/heartBlack.svg" alt="LogoFavoritos"
                        class="logoFavCards"></button>
                        <button href="" id="botonCarritoAñadir${producto.id}" class="botonCarritoAñadir"
                        onclick="añadirProductoAlCarrito(${producto.id})"><img src="./img/addCart.svg"
                        alt="CarritoAñadir"></button>

                    </div>
                </div>
            </article>
        
            `;
        }
        
        if(producto.nuevo){

            console.log("hola");

            seccionNuevos.innerHTML += `

            <article class="tarjeta" id="producto${producto.id}">
                <div class="tarjeta-img-top">
                    <img src="${producto.imagen}" alt="" >
 
                </div>
          
                <div class="card-body">

                    <a href=" ">
                    <h5 class="card-title">${producto.nombre}</h5>
                    </a>
                    <div class="cardPrice">
                        <p class="tarjeta-text">
                        $${producto.precio}
                        </p>

                        <button href="" id="botonFavoritoAñadir${producto.id}" class="botonFavoritos"
                         onclick="añadirProductoFavoritos(${producto.id})"><img src="./img/heartBlack.svg" alt="LogoFavoritos"
                        class="logoFavCards"></button>
                        <button href="" id="botonCarritoAñadir${producto.id}" class="botonCarritoAñadir"
                        onclick="añadirProductoAlCarrito(${producto.id})"><img src="./img/addCart.svg"
                        alt="CarritoAñadir"></button>

                    </div>
                </div>
            </article>
        
            `;
        }
        
        
    });
   

})
.catch((error) => console.error("No se pudo conseguir la data:", error));

window.onload = ()=>{
    
        let usuarioLogin = leerUsuarioLogueado();

        if(usuarioLogin){

        let perfil = document.querySelector("#botonLogIn");
        perfil.innerHTML = `<img src="./img/user.svg" alt="LogoUser">${usuarioLogin.nombre}`;

        }
        
        leerCarrito();
         
        let contadoresCarrito = document.querySelectorAll("#contadorCarrito");
        contadoresCarrito.forEach((contadorCarrito)=>{
            contadorCarrito.innerText = `${carritoHomePage.length}`;
        });
    

    
        
        leerFavoritos();
        let contadoresFavoritos = document.querySelectorAll("#contadorFavs");
        contadoresFavoritos.forEach((contadorFavoritos)=>{
        contadorFavoritos.innerText = `${favoritosHomePage.length}`;
        });

        
    
};




let usuarios = [{email:"felipe@gmail.com",
                 password:"1234",
                 nombre: "Felipe",
                 apellido:"sarco",
                 telefono:"38123123",
                 domicilio: "bascary 4365"
                }
                ,{
                    email:"gustavo@gmail.com",
                    password:"4324",
                    nombre: "Gustavo",
                    apellido:"sarco",
                    telefono:"38123123",
                    domicilio: "bascary 4365"
                }
];



// LOCAL STORAGE

function leerCarrito(){
    let carritoLocalStorage = JSON.parse(localStorage.getItem("carrito"));
    if(carritoLocalStorage){
        
        carritoHomePage = carritoLocalStorage;
    }
    
}

function leerUsuarioLogueado(){
    let usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
    if(usuarioLogueado){
        return usuarioLogueado;
    }
}

function leerFavoritos(){
    
    let favoritosLocalStorage = JSON.parse(localStorage.getItem("favoritos")); 
    if(favoritosLocalStorage){
        favoritosHomePage = favoritosLocalStorage;
    }
    
}

function cargarFavoritos(data){
    localStorage.setItem("favoritos",JSON.stringify(data));
}

function cargarProductos(){
    localStorage.setItem("productos",JSON.stringify(productosHomePage));
}

function cargarCarrito(data){
    localStorage.setItem("carrito",JSON.stringify(data));
}

function cargarUsuario(data){
    localStorage.setItem("usuarioLogueado",JSON.stringify(data));
}

// ****************************


// BOTON LOGIN

const botonLogin = document.querySelector("#botonModalLogin");
botonLogin.setAttribute("data-bs-dismiss"," ");
botonLogin.addEventListener("click",(e)=>{

    const email = document.querySelector("#inputEmail").value;
    const password = document.querySelector("#inputPass").value;
    let login = false;
    
 
    for(let i=0;i<usuarios.length;i++){

        if(usuarios[i].email==email && usuarios[i].password==password){
            let perfil = document.querySelector("#botonLogIn");
            botonLogin.setAttribute("data-bs-dismiss","modal");
            cargarUsuario(usuarios[i]);
            perfil.innerHTML = `<img src="./img/user.svg" alt="LogoUser">${usuarios[i].nombre}`;
            login=true;
            
         }
        else
        {

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

         if(login) break;

    }



});

// ****************************

// BOTON REGISTRARSE
const botonRegistro = document.querySelector("#botonRegistrarse");
const inputsRegistro = document.querySelectorAll(".inputRegistro");
botonRegistro.setAttribute("data-bs-dismiss"," ");


botonRegistro.addEventListener("click",()=>{
    
  
    inputsRegistro.forEach((input)=>{
        if(!input.value){
            return
         }
        
    });

    usuarios.push(usuarioNuevo);
    let perfil = document.querySelector("#botonLogIn");

    perfil.innerHTML = `<img src="./img/user.svg" alt="LogoUser">${usuarioNuevo.nombre}`;
    botonRegistro.setAttribute("data-bs-dismiss","modal");
});

// ****************************


// BOTON CARRITO

function añadirProductoAlCarrito(idProducto){

    console.log(2);
    let productoCarrito;
    productosHomePage.forEach((producto)=>{

        if(idProducto == producto.id && producto.enCarrito == false){
            
            productoCarrito = producto;
        }
        else{
            return;
        }
    });
    

    productoCarrito.enCarrito = true;
    productoCarrito.cantidadEnCarrito = 1;
    carritoHomePage.push(productoCarrito);
    cargarCarrito(carritoHomePage);
    let contadoresCarrito = document.querySelectorAll("#contadorCarrito");
   
    contadoresCarrito.forEach((contadorCarrito)=>{
        contadorCarrito.innerText = `${carritoHomePage.length}`;
    });
    

}

// ****************************

// BOTON FAVORITOS

function añadirProductoFavoritos(idProducto){

    let productoFavorito;
    productosHomePage.forEach((producto)=>{

        if(idProducto == producto.id && producto.enFavoritos == false){
            
            productoFavorito = producto;
        }
        else{
            return;
        }
    });

    productoFavorito.enFavoritos = true;
    favoritosHomePage.push(productoFavorito);
    cargarFavoritos(favoritosHomePage);
    let contadoresFavoritos = document.querySelectorAll("#contadorFavs");
    contadoresFavoritos.forEach((contadorFavoritos)=>{
        contadorFavoritos.innerText = `${favoritosHomePage.length}`;
    });

}

// ****************************

//SLIDER DESTACADOS

let botonesSlider = document.querySelectorAll(".botonSlider");
let product = document.getElementsByClassName("tarjeta");
let seccionProductos = document.querySelector("#seccionProductos");
let seccionNuevos = document.querySelector("#seccionNuevos");


let right_moverDestacados = ()=>{
    seccionProductos.scrollLeft += 1435;
}

let left_moverDestacados = ()=>{
   seccionProductos.scrollLeft -= 1435;
}

let right_moverNuevos = ()=>{
    seccionNuevos.scrollLeft += 1435;
}

let left_moverNuevos = ()=>{
   seccionNuevos.scrollLeft -= 1435;
}

