actualizarBotonLogin();

function actualizarBotonLogin(){
    let usuarioLogin = leerUsuarioLogueado();
    let navLinks = document.querySelector("#navParteIzquierda");

    if (usuarioLogin) {

        let perfil = document.querySelector("#botonLogIn");
        perfil.innerHTML = `<img src="./img/user.svg" alt="LogoUser">${usuarioLogin.nombre}`;
        if(usuarioLogin.rango == "admin"){
            navLinks.innerHTML += `<a href="./adminPage.html">Administrador</a>`;
        }
    }
}

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

function leerProductos(){
   let productos = JSON.parse(localStorage.getItem("productos"));
   if(productos){
        return productos;
   }
}

function cargarProductos(data) {
    localStorage.setItem("productos", JSON.stringify(data));
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
    let navLinks = document.querySelector("#navParteIzquierda");
    let login = false;


    for (let i = 0; i < usuarios.length; i++) {

        

        if (usuarios[i].email == email && usuarios[i].password == password) {
            let perfil = document.querySelector("#botonLogIn");
            botonLogin.setAttribute("data-bs-dismiss", "modal");
            cargarUsuario(usuarios[i]);
            perfil.innerHTML = `<img src="./img/user.svg" alt="LogoUser">${usuarios[i].nombre}`;
            login = true;
            if(usuarios[i].rango == "admin"){
                navLinks.innerHTML += `<a href="./adminPage.html">Administrador</a>`
            }
            let usuarioLogueado = {
                email: usuarios[i].email,
                rango: usuarios[i].rango,
                nombre: usuarios[i].nombre
            }

            cargarUsuario(usuarioLogueado);

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






//ACORDEON CATEGORIAS


function cargarCategoria(data) {
    console.log(data);
    localStorage.setItem("categoriaBuscada", JSON.stringify(data));
}


//CARGAR PRODUCTO ELEGIDO

function subirProductoElegido(idProducto) {
    let productos = leerProductos();
    productos.forEach((producto) => {
        if (producto.id == idProducto) {
            cargarProductoElegido(producto);
        }
    });
}