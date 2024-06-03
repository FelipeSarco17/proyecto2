let productos = leerProductos();
let productosAdminPage = document.querySelector("#productosAdminPage");
let categorias = [

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

window.onload = () => {

    
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


function eliminarProducto(idProducto) {

    let productosActualizado;

    productos.forEach((producto) => {

        if (producto.id == idProducto) {
            productosActualizado = productos.filter((producto) => {
                return producto.id != idProducto;
            });
        }



    });
    console.log(productosActualizado);
    cargarProductos(productosActualizado);
    window.location.reload();

}


function mostrarModalEditar(idProducto) {
    let modalBody = document.querySelector("#modalBodyEditarProductos");
    let modalFooter = document.querySelector("#modalFooterEditarProductos");
    let tituloModal = document.querySelector("#tituloModal");

    tituloModal.innerText = "Modificar Producto"
    console.log(modalFooter);
    let destacado1 = "true";
    let destacado2 = "false";
    let nuevo1 = "true";
    let nuevo2 = "false";
    productos.forEach((producto) => {

        if (producto.id == idProducto) {

            if (!producto.destacado) {
                destacado1 = "false";
                destacado2 = "true";
            }

            if (!producto.nuevo) {
                nuevo1 = "false";
                nuevo2 = "true";
            }

            modalFooter.innerHTML = `
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-primary" onclick="editarProducto(${producto.id})">Guardar cambios</button>
            `;

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

            <div>
            <label for="categoriaProducto">Categoria</label>
            <select id="categoriaProducto">
            </select>
            </div>

            <div id="contenedorDescripcion">
            <label>Descripcion</label>
            <textarea id="descripcionProducto" name="descripcionProducto" rows="10"></textarea>
            </div>
            
        </form>
            `;

            categorias.forEach((categoria)=>{
                let cbCategoria = document.querySelector("#categoriaProducto");

                if(categoria == producto.categoria){
                    cbCategoria.innerHTML += `
                        <option selected value="${categoria}">${categoria}</option>
                    `;
                }
                else{
                    cbCategoria.innerHTML += `
                    <option value="${categoria}">${categoria}</option>
                    `;
                }
                

            });
                

        }

    });

    
}




function editarProducto(idProducto) {

    let nombreProducto = document.querySelector("#nombreProducto").value;
    let precioProducto = document.querySelector("#precioProducto").value;
    let cbDestacado = document.querySelector("#cbProductoDestacado").value;
    let cbNuevo = document.querySelector("#cbProductoNuevo").value;
    let imagen = document.querySelector("#linkImagen").value;
    let categoria = document.querySelector("#categoriaProducto").value;
    let descripcion = document.querySelector("#descripcionProducto").value;
    
    console.log(nombreProducto);

    console.log(precioProducto);

    console.log(cbDestacado);

    console.log(cbNuevo);

    console.log(imagen);

    console.log(categoria);

    console.log(descripcion);


    productos.forEach((producto)=>{

        if(producto.id == idProducto){

            producto.nombre = nombreProducto;
            producto.precio = precioProducto;
            producto.categoria = categoria;
            producto.descripcion = descripcion;
            producto.imagen = imagen;
            if(cbDestacado=="false"){
                producto.destacado = false;
            }
            else{
                producto.destacado = true;
            }

            if(cbNuevo=="false"){
                producto.nuevo = false;
            }
            else{
                producto.nuevo = true;
            }
            
        }
        
    });
    
    cargarProductos(productos);


}


function agregarProducto(){

    let nombreProducto = document.querySelector("#nombreProducto").value;
    let precioProducto = document.querySelector("#precioProducto").value;
    let cbDestacado = document.querySelector("#cbProductoDestacado").value;
    let cbNuevo = document.querySelector("#cbProductoNuevo").value;
    let imagenLink = document.querySelector("#linkImagen").value;
    let categoriaProducto = document.querySelector("#categoriaProducto").value;
    let descripcionProducto = document.querySelector("#descripcionProducto").value;
    idnuevo = Date.now();

    productoNuevo = {

        id: idnuevo ,
        nombre: nombreProducto,
        precio: precioProducto,
        categoria: categoriaProducto,
        descripcion: descripcionProducto,
        imagen: imagenLink,
        enCarrito: false,
        enFavoritos: false,
        destacado: cbDestacado,
        nuevo: cbNuevo,
        cantidadEnCarrito: "0",
        link: "./productPage.html",
    }

    productos.push(productoNuevo);
    cargarProductos(productos);

}


function mostrarModalAgregar(){

    let modalBody = document.querySelector("#modalBodyEditarProductos");
    let modalFooter = document.querySelector("#modalFooterEditarProductos");
    let tituloModal = document.querySelector("#tituloModal");

    tituloModal.innerText = "Agregar Producto"
    
            modalFooter.innerHTML = `
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-primary" onclick="agregarProducto()">Agregar</button>
            `;

            modalBody.innerHTML = `
            <form action="" class="formDatosProducto">

            <div>
                <label for="nombreProducto">Producto</label>
                <input type="text" name="inpProducto" id="nombreProducto" required>
            </div>

            <div>
                <label for="precioProducto">Precio</label>
                <input type="number" name="inpPrecio" id="precioProducto" required>
            </div>

            <div>
                <label for="cbProductoDestacado">Destacado</label>
                <select name="" id="cbProductoDestacado">
                    <option value="true">true</option>
                    <option value="false">false</option>
                </select>
            </div>

            <div>
                <label for="cbProductoNuevo">Nuevo</label>
                <select name="" id="cbProductoNuevo">
                    <option value="true">true</option>
                    <option value="false">false</option>
                </select>
            </div>

            <div>
                <label for="linkImagen">Imagen</label>
                <input type="text" name="linkImagen" id="linkImagen" required>
            </div>

            <div>
            <label for="categoriaProducto">Categoria</label>
            <select id="categoriaProducto">
                <option>Placas de Video Radeon AMD</option>
                <option>Placas de Video GeForce</option>
                <option>Fuentes</option>
                <option>Auriculares</option>
                <option>Gabinetes</option>
                <option>Sillas Gamers</option>
                <option>Procesadores Intel</option>
                <option>Procesadores AMD</option>
                <option>Mothers Intel</option>
                <option>Mothers AMD</option>
                <option>Memorias</option>
                <option>Memorias Notebook</option>
                <option>Discos Externos</option>
                <option>Discos Rigidos</option>
                <option>Discos Solidos SSD</option>
                <option>Teclados</option>
                <option>Mouses</option>
                <option>Mouse Pads</option>
                <option>Microfonos</option>
                <option>Webcam</option>
                <option>Joystick</option>
                <option>Parlantes</option>
                <option>Monitores y pantallas</option>
            </select>
            </div>

            <div id="contenedorDescripcion">
            <label>Descripcion</label>
            <textarea id="descripcionProducto" name="descripcionProducto" rows="10" required></textarea>
            </div>
            
        </form>
            `;



}
