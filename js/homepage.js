let productosHomePage = [];
let favoritosHomePage = [];
let carritoHomePage = [];

fetch("./js/productos.json")
.then(response => response.json())
.then((data)=>{
    
        productosHomePage = data;
     
        let seccionProductos = document.querySelector("#seccionProductos");
        productosHomePage.forEach((producto)=>{
            cargarProductos();
        seccionProductos.innerHTML += `

        <article class="card"  id="producto${producto.id}">
            <img src="${producto.imagen}" alt="" class="card-img-top">
            <div class="card-body">

                <h5 class="card-title">${producto.nombre}</h5> 
                <div class="cardPrice"> 
                    <p class="card-text">
                        $${producto.precio}
                    </p>

                    <button href="" class="botonFavoritos" onclick="añadirProductoFavoritos(${producto.id})"><img src="./img/heartBlack.svg" alt="LogoFavoritos" class="logoFavCards"></button>
                    <button href="" class="botonCarritoAñadir" onclick="añadirProductoAlCarrito(${producto.id})"><img src="./img/addCart.svg" alt="CarritoAñadir" ></button>
          
                </div>
            </div>
        </article>
        
        `;

    });
   
    

})
.catch((error) => console.error("No se pudo conseguir la data:", error));

window.onload = ()=>{
    leerCarrito();
    leerFavoritos();
    let contadoresFavoritos = document.querySelectorAll("#contadorFavs");
    contadoresFavoritos.forEach((contadorFavoritos)=>{
        contadorFavoritos.innerText = `${favoritosHomePage.length}`;
    });
    let contadoresCarrito = document.querySelectorAll("#contadorCarrito");
    contadoresCarrito.forEach((contadorCarrito)=>{
        contadorCarrito.innerText = `${carritoHomePage.length}`;
    });
};


const botonesFav = document.querySelectorAll(".botonFavoritos");

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
    carritoHomePage = JSON.parse(localStorage.getItem("carrito"));
}

function leerFavoritos(){
    
    favoritosHomePage = JSON.parse(localStorage.getItem("favoritos"));
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

// ****************************


// BOTON LOGIN

const botonLogin = document.querySelector("#botonModalLogin");
const pagina = document.getElementsByTagName("title");
botonLogin.setAttribute("data-bs-dismiss"," ");
botonLogin.addEventListener("click",(e)=>{

    const email = document.querySelector("#inputEmail").value;
    const password = document.querySelector("#inputPass").value;

    usuarios.forEach((usuario)=>{

        if(usuario.email==email && usuario.password==password){
            let perfil = document.querySelector("#botonLogIn");

                perfil.innerHTML = `<img src="./img/user.svg" alt="LogoUser">${usuario.nombre}`;
                botonLogin.setAttribute("data-bs-dismiss","modal");
            
        }
        else{

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

    });

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

    let productoCarrito;
    productosHomePage.forEach((producto)=>{

        if(idProducto == producto.id){
            productoCarrito = producto;
        }
    });
    
    carritoHomePage.push(productoCarrito);
    cargarCarrito(carritoHomePage);
    let contadoresCarrito = document.querySelectorAll("#contadorCarrito");
    console.log(contadoresCarrito);
    contadoresCarrito.forEach((contadorCarrito)=>{
        contadorCarrito.innerText = `${carritoHomePage.length}`;
    });
    

}


function añadirProductoFavoritos(idProducto){

    let productoFavorito;
    productosHomePage.forEach((producto)=>{

        if(idProducto == producto.id){
            productoFavorito = producto;
        }
    });

    favoritosHomePage.push(productoFavorito);
    cargarFavoritos(favoritosHomePage);
    let contadoresFavoritos = document.querySelectorAll("#contadorFavs");

    contadoresFavoritos.forEach((contadorFavoritos)=>{
        console.log(favoritosHomePage.length);
        contadorFavoritos.innerText = `${favoritosHomePage.length}`;
    });
    
}








