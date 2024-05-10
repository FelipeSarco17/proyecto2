let productos = [];
fetch('./js/productos.json')
.then(response => response.json())
.then((data)=>{
    
    console.log(data);
    productos = data;
    let seccionProductos = document.querySelector("#seccionProductos");
    productos.forEach((producto)=>{

        
        
        seccionProductos.innerHTML += `

        <article class="card"  id="producto${producto.id}">
            <img src="${producto.imagen}" alt="" class="card-img-top">
            <div class="card-body">

                <h5 class="card-title">${producto.nombre}</h5> 
                <div class="cardPrice"> 
                    <p class="card-text">
                        $${producto.precio}
                    </p>

                    <button href="" class="botonFavoritos"><img src="./img/heartBlack.svg" alt="LogoFavoritos" class="logoFavCards"></button>
                    <button href="" class="botonCarritoAñadir"><img src="./img/addCart.svg" alt="CarritoAñadir"></button>
          
                </div>
            </div>
        </article>
        
        `;

    });


})
.catch((error) => console.error("No se pudo conseguir la data:", error));



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

let favoritos = [];


const botonLogin = document.querySelector("#botonModalLogin");
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


const leerUsuarios = () =>{
    localStorage.getItem(JSON.parse("usuarios"));
}









