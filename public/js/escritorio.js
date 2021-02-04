const socket = io()
const searchParams = new URLSearchParams(window.location.search)
const button = document.querySelector('button')
const h1 = document.querySelector('h1')

if (!searchParams.has('escritorio')){
    window.location = 'index.html'
    throw new Error ('el escritorio es necesario')
}

const escritorio = searchParams.get('escritorio')


socket.on('connect', () => {
    
    console.log('conectado al servidor');
    proximoTicket(escritorio)
    
})


socket.on('disconnect', () => {
    console.log('desconectado del servidor');
})



h1.innerText = `escritorio ${escritorio}`

button.addEventListener('click', () => {proximoTicket(escritorio)})

const proximoTicket = (escritorio) => {

    socket.emit('atenderTickert', {escritorio}, (ticketAtender) => {
    
        const h4 = document.querySelector('h4')
    
        ticketAtender === 'no hay tickes pendientes' ? h4.innerText = ticketAtender 
            : h4.innerHTML = `Atendiendo a <small>${ticketAtender.numero}</small>`
    
    })
}
