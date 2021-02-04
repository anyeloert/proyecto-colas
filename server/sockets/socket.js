const { io } = require('../server');
const {NewTicket} = require('../classes/new-ticket')

const newTicket = new NewTicket()





io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.on('ultimoTicket', (data, callback) => {

        let ultimo = newTicket.ultimoTicket()

        callback(ultimo)
    })


    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    client.on('nuevoTicket', (data, callback) => {
        
        let siguiente = newTicket.nuevoTicket()

        callback(siguiente)
    })

    client.on('atenderTickert', (data, callback) => {
        const ticketAtender = newTicket.atenderTicket(data.escritorio)
        client.broadcast.emit('ultimos4EnVivo', {ultimos4 : newTicket.getUltimos4()})
        callback(ticketAtender)
    })

    client.emit('ultimos4', {ultimos4 : newTicket.getUltimos4(),}


        
        )


    
});