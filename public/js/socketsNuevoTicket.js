

const socket = io()
const button = document.querySelector('button')

const label = document.getElementById('lblNuevoTicket')

socket.on('connect', () => {
    
    console.log('conectado al servidor');

    socket.emit('ultimoTicket', null, (ultimoTicket) => {
        
        label.innerText = ultimoTicket

    })

})


socket.on('disconnect', () => {
    console.log('desconectado del servidor');
})



const mostrarNuevoTicket = () => {

    socket.emit('nuevoTicket', null, (siguiente) => {


        label.innerText = siguiente

    })
}

button.addEventListener('click', mostrarNuevoTicket, false)

