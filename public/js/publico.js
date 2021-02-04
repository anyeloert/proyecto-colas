const socket = io()


socket.on('connect', () => {
    
    console.log('conectado al servidor');
    
})


socket.on('disconnect', () => {
    console.log('desconectado del servidor');
})

socket.on('ultimos4', (data) => {
    console.log(data);
    actualizarHTML(data.ultimos4)
})

socket.on('ultimos4EnVivo', (data) => {
    const audio = new Audio('audio/new-ticket.mp3')
    audio.play()
    actualizarHTML(data.ultimos4)
})

const actualizarHTML = (ultimos4) => {
    if(ultimos4.length !== 0){

        for (let i = 1; i <= ultimos4.length; i++){
            const labelTicket = document.querySelector(`#lblTicket${i}`)
            const labelEscritorio = document.querySelector(`#lblEscritorio${i}`)
            labelTicket.innerText = `Ticket ${ultimos4[i-1].numero}`
            labelEscritorio.innerText = `Escritorio ${ultimos4[i-1].escritorio}`
        }
    }
}