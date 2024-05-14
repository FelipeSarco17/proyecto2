let mensajeCliente;

let botonEnviar = document.querySelector("#botonEnviarMensaje");
botonEnviar.addEventListener("click",()=>{
    mensajeCliente = {
        nombreCliente: document.querySelector("#inputNombreClienteContacto").value,
        emailCliente: document.querySelector("#inputEmailContacto").value,
        mensaje: document.querySelector("#text-area-contacto").value
    }

    cargarMensajeCliente(mensajeCliente);
})

function cargarMensajeCliente(data){
    localStorage.setItem("mensajeCliente",JSON.stringify(data));
}
