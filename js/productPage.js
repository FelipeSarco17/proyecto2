let productoMostrar = leerProductoElegido();
let productPage = document.querySelector("#contenedorEspecificaciones");


switch(productoMostrar.categoria){
    case "Placas de Video Radeon AMD":
        let especificaciones = Object.keys(productoMostrar.especificaciones);
        let conectividadKeys = Object.keys(productoMostrar.especificaciones.Conectividad);
        productPage.innerHTML +=`
        
        <div id="contenedorPrecioImagen">
        <img id="imagenProducto"
            src="${productoMostrar.imagen}"
            alt="">
        <article>
            <h2>${productoMostrar.nombre}</h2>
            <h3 id="precioContado"><img src="./img/totalLogo.svg" alt=""> Precio: <div>$${productoMostrar.precio}</div>
            </h3>
            <p id="precioFinanciado">12 cuotas sin interes de <strong>$${(productoMostrar.precio/12).toFixed(2)}</strong></p>
            <div id="tarjetasCreditoAceptadas">Pagando con:
                <img class="logoTarjeta"
                    src="https://static.vecteezy.com/system/resources/previews/020/335/998/original/visa-logo-visa-icon-free-free-vector.jpg"
                    alt="logoVisa">
                <img class="logoTarjeta"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/1200px-MasterCard_Logo.svg.png"
                    alt="logoMasterCard">
                <img class="logoTarjeta" src="https://www.e-fmc.com.ar/assets/images/01.jpg"
                    alt="logoTarjetaNaranja">
                <img class="logoTarjeta"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVqAIpvqV6G6pOi1ynvh-RUlLheyYuPCFdcWHRJROJrw&s"
                    alt="logoICBC">
            </div>
            <button id="botonAgregarCarrito"  onclick="añadirProductoAlCarrito(${productoMostrar.id})">Sumar al carrito</button>
        </article>
    </div>
    <article id="especificaciones">
        <div id="especificacionesGenerales">
            <h3>Especificaciones Generales</h3>
        <ul id="detalleEspecificaciones">
            <li>${especificaciones[0]}: ${productoMostrar.especificaciones.Tipo}</li>
            <li>${especificaciones[1]}: ${productoMostrar.especificaciones.Ancho}</li>
            <li>${especificaciones[2]}: ${productoMostrar.especificaciones.Largo}</li>
            <li>${especificaciones[3]}: ${productoMostrar.especificaciones.Espesor}</li>
        </ul>
        </div>
        <div id="conectividad">
            <h3>${especificaciones[4]}</h3>
            <ul>
                <li>${conectividadKeys[0]}: ${productoMostrar.especificaciones.Conectividad.Dvi}</li>
                <li>${conectividadKeys[1]}: ${productoMostrar.especificaciones.Conectividad.HDMI}</li>
                <li>${conectividadKeys[2]}: ${productoMostrar.especificaciones.Conectividad.DisplayPorts}</li>
            </ul>
        </div>
        
    </article>
        
        `;

    
        break;
    case "Placas de Video GeForce": break;
    case "Fuentes": break;
    case "Procesadores Intel": break;
    case "Procesadores AMD": break;
    case "Mothers AMD": break;
    case "Mothers Intel": break;
    case "Monitores y pantallas": break;
    case "Sillas Gamers": break;
    case "Auriculares": break;
    case "Teclados": break;
    case "Mouses": break;
    case "Mouse Pads": break;
    case "Microfonos": break;
    case "Webcam": break;
    case "Joystick": break;
    case "Parlantes": break;
    case "Memorias": break;
    case "Memorias Notebook": break;
    case "Discos Rigidos": break;
    case "Discos Externos": break;
    case "Discos Solidos SSD": break;
    case "Gabinetes": break;
    default: break;
    
}




function leerProductoElegido(){
    let producto = JSON.parse(localStorage.getItem("productoElegido"));
    if(producto){
        return producto;
    }
}