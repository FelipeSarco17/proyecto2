let productos = leerProductos();
let productosAdminPage = document.querySelector("#productosAdminPage");
window.onload = () => {
    
    actualizarBotonLogin();
    productos = leerProductos();
    console.log(productos);
    productos.forEach((producto) => {

        productosAdminPage.innerHTML += `

            <article class="tarjetaProductoCategoria" id="producto${producto.id}">
                <div class="imgProductoCategoria">
                    <img src="${producto.imagen}"
                     alt="">

                </div>

                 <div class="card-body-categoria">

                    <a href="${producto.link}">
                        <h5 class="card-title-categoria">${producto.nombre}</h5>
                    </a>
                    <div class="cardPrice-categoria">
                        <p class="tarjeta-text-categoria">
                            $${producto.precio}
                        </p>
                        <div class="contenedorBotonesCardsCategoria">

                        <button href="" id="botonEliminarProducto${producto.id}" class="botonFavoritos"
                            onclick="eliminarProducto(${producto.id})"><img src="./img/deleteButton.svg"
                                alt="LogoFavoritos" class="logoFavCards"></button>
                        <button href="" id="botonModificarProducto${producto.id}" class="botonCarritoAñadir"
                            onclick="mostrarModalEditar(${producto.id})" data-bs-toggle="modal" data-bs-target="#modalEditarProducto"><img src="./img/editButton.svg"
                                alt="CarritoAñadir"></button>
                        </div>
                    </div>
                </div>
            </article>

            `;
    }
    );
}


function eliminarProducto(idProducto){

    let productosActualizado;

    productos.forEach((producto)=>{

        if(producto.id == idProducto){
            productosActualizado = productos.filter((producto)=>{
               return producto.id != idProducto;
            });
        }



    });
    console.log(productosActualizado);
    cargarProductos(productosActualizado);
    window.location.reload();

}


function mostrarModalEditar(idProducto){
    let modalBody = document.querySelector("#modalBodyProductos");
    let destacado1 = "true";
    let destacado2 = "false";
    let nuevo1 = "true";
    let nuevo2 = "false";
    productos.forEach((producto)=>{

        if(producto.id == idProducto){
            
        let especificacionesProducto = producto.especificaciones;
            if(!producto.destacado){
                destacado1 = "false";
                destacado2 = "true";
            }

            if(!producto.nuevo){
                nuevo1 = "false";
                nuevo2 = "true";
            }
            modalBody.innerHTML = `
            <form action="" class="formDatosProducto">

            <div>
                <label for="nombreProducto">Producto</label>
                <input type="text" name="inpProducto" id="nombreProducto" value="${producto.nombre}" required>
            </div>

            <div>
                <label for="precioProducto">Precio</label>
                <input type="number" name="inpPrecio" id="precioProducto" value="${producto.precio}">
            </div>

            <div>
                <label for="cbProductoDestacado">Destacado</label>
                <select name="" id="cbProductoDestacado">
                    <option value="${destacado1}">${destacado1}</option>
                    <option value="${destacado2}">${destacado2}</option>
                </select>
            </div>

            <div>
                <label for="cbProductoNuevo">Nuevo</label>
                <select name="" id="cbProductoNuevo">
                    <option value="${nuevo1}">${nuevo1}</option>
                    <option value="${nuevo2}">${nuevo2}</option>
                </select>
            </div>

            <div>
                <label for="linkImagen">Imagen</label>
                <input type="text" name="" id="linkImagen" value="${producto.imagen}">
            </div>

            

        </form>
            `;
            let formDatosProducto = document.querySelector(".formDatosProducto");
           switch(producto.categoria){
            case "Placas de Video Radeon AMD":
                
                formDatosProducto.innerHTML +=  `
                <div>
                <label for="categoriaProducto">Categoria</label>
                <select id="categoriaProducto">
                    <option value="Placas de Video Radeon AMD">Placas de Video Radeon AMD</option>    
                    <option value="Procesadores Intel">Procesadores Intel</option>
                    <option value="Procesadores AMD">Procesadores AMD</option>
                    <option value="Mothers Intel">Mothers Intel</option>
                    <option value="Mothers AMD">Mothers AMD</option>
                    <option value="Placas de Video GeForce">Placas de Video GeForce</option>
                    <option value="Memorias">Memorias</option>
                    <option value="Memorias Notebook">Memorias Notebook</option>
                    <option value="Discos Externos">Discos Externos</option>
                    <option value="Discos Rigidos">Discos Rigidos</option>
                    <option value="Discos Solidos SSD">Discos Solidos SSD</option>
                    <option value="Auriculares">Auriculares</option>
                    <option value="Teclados">Teclados</option>
                    <option value="Mouses">Mouses</option>
                    <option value="Mouse Pads">Mouse Pads</option>
                    <option value="Microfonos">Microfonos</option>
                    <option value="Webcam">Webcam</option>
                    <option value="Joystick">Joystick</option>
                    <option value="Parlantes">Parlantes</option>
                    <option value="Gabinetes">Gabinetes</option>
                    <option value="Fuentes">Fuentes</option>
                    <option value="Monitores y pantallas">Monitores y pantallas</option>
                    <option value="Sillas Gamers">Sillas Gamers</option>
                </select>
            </div>

                <div>
                <label>Especificaciones</label>
                <div>
                    <label for="tipoPlaca">Tipo</label>
                    <input type="text" name="" id="tipoPlaca" value="${especificacionesProducto.Tipo}">
                    <label for="anchoPlaca">Ancho</label>
                    <input type="number" name="" id="anchoPlaca" value="${especificacionesProducto.Ancho}">
                    <label for="largoPlaca">Largo</label>
                    <input type="number" name="" id="largoPlaca" value="${especificacionesProducto.Largo}">
                    <label for="espesorPlaca">Espesor (Slots)</label>
                    <input type="number" id="espesorPlaca" value="${especificacionesProducto.Espesor}">
                    <label>Conectividad</label>
                    <div>
                        <label for="puertosDviPlaca">Dvi</label>
                        <input type="number" name="" id="puertosDviPlaca" value="${especificacionesProducto.Conectividad.Dvi}">
                        <label for="puertosHDMIPlaca">HDMI</label>
                        <input type="number" name="" id="puertosHDMIPlaca" value="${especificacionesProducto.Conectividad.HDMI}">
                        <label for="puertosDpPlaca">DisplayPorts</label>
                        <input type="number" name="" id="puertosDpPlaca" value="${especificacionesProducto.Conectividad.DisplayPorts}">
                    </div>
                </div>
            </div>
                `;
            
                break;
            case "Placas de Video GeForce":
                formDatosProducto.innerHTML +=  `
                <div>
                <label for="categoriaProducto">Categoria</label>
                <select id="categoriaProducto">
                    <option value="Placas de Video GeForce">Placas de Video GeForce</option>    
                    <option value="Procesadores Intel">Procesadores Intel</option>
                    <option value="Procesadores AMD">Procesadores AMD</option>
                    <option value="Mothers Intel">Mothers Intel</option>
                    <option value="Mothers AMD">Mothers AMD</option>
                    <option value="Placas de Video Radeon AMD">Placas de Video Radeon AMD</option>   
                    <option value="Memorias">Memorias</option>
                    <option value="Memorias Notebook">Memorias Notebook</option>
                    <option value="Discos Externos">Discos Externos</option>
                    <option value="Discos Rigidos">Discos Rigidos</option>
                    <option value="Discos Solidos SSD">Discos Solidos SSD</option>
                    <option value="Auriculares">Auriculares</option>
                    <option value="Teclados">Teclados</option>
                    <option value="Mouses">Mouses</option>
                    <option value="Mouse Pads">Mouse Pads</option>
                    <option value="Microfonos">Microfonos</option>
                    <option value="Webcam">Webcam</option>
                    <option value="Joystick">Joystick</option>
                    <option value="Parlantes">Parlantes</option>
                    <option value="Gabinetes">Gabinetes</option>
                    <option value="Fuentes">Fuentes</option>
                    <option value="Monitores y pantallas">Monitores y pantallas</option>
                    <option value="Sillas Gamers">Sillas Gamers</option>
                </select>
            </div>

                <div>
                <label>Especificaciones</label>
                <div>
                    <label for="tipoPlaca">Tipo</label>
                    <input type="text" name="" id="tipoPlaca">
                    <label for="anchoPlaca">Ancho</label>
                    <input type="number" name="" id="anchoPlaca">
                    <label for="largoPlaca">Largo</label>
                    <input type="number" name="" id="largoPlaca">
                    <label for="espesorPlaca">Espesor</label>
                    <select name="" id="espesorPlaca">
                        <option value="1 slot">1 slot</option>
                        <option value="2 slots">2 slots</option>
                        <option value="3 slots">3 slots</option>
                    </select>
                    <label>Conectividad</label>
                    <div>
                        <label for="puertosDviPlaca">Dvi</label>
                        <input type="number" name="" id="puertosDviPlaca">
                        <label for="puertosHDMIPlaca">HDMI</label>
                        <input type="number" name="" id="puertosHDMIPlaca">
                        <label for="puertosDpPlaca">DisplayPorts</label>
                        <input type="number" name="" id="puertosDpPlaca">
                    </div>
                </div>
            </div>
                `;
            
                break;
            case "Fuentes":
                let modular1 = "true";
                let modular2 = "false";
                if(!especificacionesProducto.modular){
                     modular1 = "false";
                     modular2 = "true";
                }
                formDatosProducto.innerHTML +=  `
                <div>
                <label for="categoriaProducto">Categoria</label>
                <select id="categoriaProducto">
                    <option value="Fuentes">Fuentes</option>
                    <option value="Placas de Video GeForce">Placas de Video GeForce</option>    
                    <option value="Procesadores Intel">Procesadores Intel</option>
                    <option value="Procesadores AMD">Procesadores AMD</option>
                    <option value="Mothers Intel">Mothers Intel</option>
                    <option value="Mothers AMD">Mothers AMD</option>
                    <option value="Placas de Video Radeon AMD">Placas de Video Radeon AMD</option>   
                    <option value="Memorias">Memorias</option>
                    <option value="Memorias Notebook">Memorias Notebook</option>
                    <option value="Discos Externos">Discos Externos</option>
                    <option value="Discos Rigidos">Discos Rigidos</option>
                    <option value="Discos Solidos SSD">Discos Solidos SSD</option>
                    <option value="Auriculares">Auriculares</option>
                    <option value="Teclados">Teclados</option>
                    <option value="Mouses">Mouses</option>
                    <option value="Mouse Pads">Mouse Pads</option>
                    <option value="Microfonos">Microfonos</option>
                    <option value="Webcam">Webcam</option>
                    <option value="Joystick">Joystick</option>
                    <option value="Parlantes">Parlantes</option>
                    <option value="Gabinetes">Gabinetes</option>
                    <option value="Monitores y pantallas">Monitores y pantallas</option>
                    <option value="Sillas Gamers">Sillas Gamers</option>
                </select>
                </div>

                <div>
                <label for="">Especificaciones</label>
                <div>
                    <label for="">Certificaion</label>
                    <input type="text" name="" id="" value="${especificacionesProducto.certificacion}">
                    <label for="">Modular</label>
                    <select name="" id="">
                        <option value="${modular1}">${modular1}</option>
                        <option value="${modular2}">${modular2}</option>
                    </select>
                </div>
                </div>
                `;    
                break;
            case "Procesadores Intel":
                formDatosProducto.innerHTML += ``;
                 break;
            case "Procesadores AMD": 
            formDatosProducto.innerHTML += ``;
                break;
            case "Mothers AMD": 
            formDatosProducto.innerHTML += ``;
                break;
            case "Mothers Intel":
                formDatosProducto.innerHTML += ``;    
                break;
            case "Monitores y pantallas":
            
                formDatosProducto.innerHTML +=  `
                <div>
                <label for="categoriaProducto">Categoria</label>
                <select id="categoriaProducto">
                    <option value="Monitores y pantallas">Monitores y pantallas</option>
                    <option value="Fuentes">Fuentes</option>
                    <option value="Placas de Video GeForce">Placas de Video GeForce</option>    
                    <option value="Procesadores Intel">Procesadores Intel</option>
                    <option value="Procesadores AMD">Procesadores AMD</option>
                    <option value="Mothers Intel">Mothers Intel</option>
                    <option value="Mothers AMD">Mothers AMD</option>
                    <option value="Placas de Video Radeon AMD">Placas de Video Radeon AMD</option>   
                    <option value="Memorias">Memorias</option>
                    <option value="Memorias Notebook">Memorias Notebook</option>
                    <option value="Discos Externos">Discos Externos</option>
                    <option value="Discos Rigidos">Discos Rigidos</option>
                    <option value="Discos Solidos SSD">Discos Solidos SSD</option>
                    <option value="Auriculares">Auriculares</option>
                    <option value="Teclados">Teclados</option>
                    <option value="Mouses">Mouses</option>
                    <option value="Mouse Pads">Mouse Pads</option>
                    <option value="Microfonos">Microfonos</option>
                    <option value="Webcam">Webcam</option>
                    <option value="Joystick">Joystick</option>
                    <option value="Parlantes">Parlantes</option>
                    <option value="Gabinetes">Gabinetes</option>
                    <option value="Sillas Gamers">Sillas Gamers</option>
                </select>
                </div>
                <div>
                <label>Especificaciones</label>
                <div>

                    <label for="panelMonitor">Panel</label>
                    <select name="" id="panelMonitor">
                        <option value="TN">TN</option>
                        <option value="IPS">IPS</option>
                        <option value="VA">VA</option>
                        <option value="PLS">PLS</option>
                        <option value="IGZO">IGZO</option>
                        <option value="WLED">WLED</option>
                    </select>
                    <label for="frecuenciaMonitor">Frecuencia</label>
                    <input type="number" name="" id="frecuenciaMonitor">
                    <label for="tamañoMonitor">Tamaño (Pulgadas)</label>
                    <input type="number" name="" id="tamañoMonitor">
                    <label for="">Conectividad</label>
                    <div>
                        <label for="puertosDviPlaca">Dvi</label>
                        <input type="number" name="" id="puertosDviPlaca">
                        <label for="puertosHDMIPlaca">HDMI</label>
                        <input type="number" name="" id="puertosHDMIPlaca">
                        <label for="puertosDpPlaca">DisplayPorts</label>
                        <input type="number" name="" id="puertosDpPlaca">
                    </div>
                </div>
                </div>
                `;
            
            break;
            case "Sillas Gamers": 
                formDatosProducto.innerHTML += `
                <div>
                <label for="categoriaProducto">Categoria</label>
                <select id="categoriaProducto">
                    <option value="Sillas Gamers">Sillas Gamers</option>
                    <option value="Fuentes">Fuentes</option>
                    <option value="Placas de Video GeForce">Placas de Video GeForce</option>    
                    <option value="Procesadores Intel">Procesadores Intel</option>
                    <option value="Procesadores AMD">Procesadores AMD</option>
                    <option value="Mothers Intel">Mothers Intel</option>
                    <option value="Mothers AMD">Mothers AMD</option>
                    <option value="Placas de Video Radeon AMD">Placas de Video Radeon AMD</option>   
                    <option value="Memorias">Memorias</option>
                    <option value="Memorias Notebook">Memorias Notebook</option>
                    <option value="Discos Externos">Discos Externos</option>
                    <option value="Discos Rigidos">Discos Rigidos</option>
                    <option value="Discos Solidos SSD">Discos Solidos SSD</option>
                    <option value="Auriculares">Auriculares</option>
                    <option value="Teclados">Teclados</option>
                    <option value="Mouses">Mouses</option>
                    <option value="Mouse Pads">Mouse Pads</option>
                    <option value="Microfonos">Microfonos</option>
                    <option value="Webcam">Webcam</option>
                    <option value="Joystick">Joystick</option>
                    <option value="Parlantes">Parlantes</option>
                    <option value="Gabinetes">Gabinetes</option>
                    <option value="Monitores y pantallas">Monitores y pantallas</option>  
                </select>
                </div>
                <div>
                <label>Especificaciones</label>
                <div>
                   <label for="pesoMaximoSilla">Peso Maximo (KG)</label>
                   <input type="number" name="" id="pesoMaximoSilla" value="${especificacionesProducto.pesoMaximo}">
                </div>
                </div>

                `;
                break;
            case "Auriculares": 
                formDatosProducto.innerHTML += ``;
                break;
            case "Teclados": 
                formDatosProducto.innerHTML += ``;
                break;
            case "Mouses": 
                formDatosProducto.innerHTML += ``;
                break;
            case "Mouse Pads": 
                formDatosProducto.innerHTML += ``;
                break;
            case "Microfonos": 
                formDatosProducto.innerHTML += ``;
                break;
            case "Webcam": 
                formDatosProducto.innerHTML += ``;
                break;
            case "Joystick": 
                formDatosProducto.innerHTML += ``;
                break;
            case "Parlantes": 
                formDatosProducto.innerHTML += ``;
                break;
            case "Memorias": 
                formDatosProducto.innerHTML += ``;
                break;
            case "Memorias Notebook": 
                formDatosProducto.innerHTML += ``;
                break;
            case "Discos Rigidos": 
                formDatosProducto.innerHTML += ``;
                break;
            case "Discos Externos": 
                formDatosProducto.innerHTML += ``;
                break;
            case "Discos Solidos SSD": 
                formDatosProducto.innerHTML += ``;
                break;
            case "Gabinetes":
                formDatosProducto.innerHTML += `
                <div>
                <label for="categoriaProducto">Categoria</label>
                <select id="categoriaProducto">
                    <option value="Gabinetes">Gabinetes</option>
                    <option value="Fuentes">Fuentes</option>
                    <option value="Placas de Video GeForce">Placas de Video GeForce</option>    
                    <option value="Procesadores Intel">Procesadores Intel</option>
                    <option value="Procesadores AMD">Procesadores AMD</option>
                    <option value="Mothers Intel">Mothers Intel</option>
                    <option value="Mothers AMD">Mothers AMD</option>
                    <option value="Placas de Video Radeon AMD">Placas de Video Radeon AMD</option>   
                    <option value="Memorias">Memorias</option>
                    <option value="Memorias Notebook">Memorias Notebook</option>
                    <option value="Discos Externos">Discos Externos</option>
                    <option value="Discos Rigidos">Discos Rigidos</option>
                    <option value="Discos Solidos SSD">Discos Solidos SSD</option>
                    <option value="Auriculares">Auriculares</option>
                    <option value="Teclados">Teclados</option>
                    <option value="Mouses">Mouses</option>
                    <option value="Mouse Pads">Mouse Pads</option>
                    <option value="Microfonos">Microfonos</option>
                    <option value="Webcam">Webcam</option>
                    <option value="Joystick">Joystick</option>
                    <option value="Parlantes">Parlantes</option>
                    <option value="Monitores y pantallas">Monitores y pantallas</option>
                    <option value="Sillas Gamers">Sillas Gamers</option>
                </select>
                </div>
                <div>
                <label>Especificaciones</label>
                <div>
                    <label for="">Ancho</label>
                    <input type="number" name="" id="" value="${especificacionesProducto.Ancho}">
                    <label for="">Alto</label>
                    <input type="number" name="" id="" value="${especificacionesProducto.Alto}">
                    <label for="">Profundidad</label>
                    <input type="number" name="" id="" value="${especificacionesProducto.Profundidad}">
                    <label for="">Factor Mother</label>
                    <select name="" id="">
                        <option value="ITX">ITX</option>
                        <option value="M-ATX">M-ATX</option>
                        <option value="ATX">ATX</option>
                        <option value="E-ATX">E-ATX</option>
                    </select>
                    <label for="">USB</label>
                    <input type="number" name="" id="" value="${especificacionesProducto.USB}">
                    <label for="">Capacidad Coolers</label>
                    <input type="number" name="" id="" value="${especificacionesProducto.capacidadCoolers}">
                    
                </div>
                </div>

                `;
                break;
            default: break;
           }
           
            
        }

    });

}

function editarProducto(){

}

