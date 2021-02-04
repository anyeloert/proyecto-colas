const fs = require('fs')


class Ticket {

    constructor(numero, escritorio){
        this.numero = numero
        this.escritorio = escritorio
    }

}

class  NewTicket {
    constructor() {
        let data = require('../data/data.json')

        this.ultimo = data.ultimo
        this.ultimoFecha = data.hoy
        this.pendientes = data.pendientes
        this.ultimos4 = data.ultimos4
        this.hoy = new Date().getDate()

        this.hoy === this.ultimoFecha ? null : this.reiniciarTickets()

    }

    nuevoTicket(){
        this.ultimo += 1
        const ticket = new Ticket(this.ultimo, null)
        this.pendientes.push(ticket)

        this.guardarData(this.ultimo, this.ultimoFecha, this.pendientes, this.ultimos4)

        return `Ticket Nro ${this.ultimo}`
    }

    ultimoTicket(){
        return `Ticket Nro ${this.ultimo}`
    }

    getUltimos4(){
        return this.ultimos4
        
    }

    reiniciarTickets(){
        this.ultimo = 0
        this.ultimoFecha = this.hoy
        this.pendientes = [{"numero": 0, "escritorio": 0}]
        this.ultimos4= []
        this.guardarData(this.ultimo, this.ultimoFecha, this.pendientes, this.ultimos4)
    }

    atenderTicket(escritorio){

        if (!escritorio){
            return 'El escritorio es obligatorio'
        }

        let ticketAtender
        if (this.pendientes.length === 0)  {
            return 'no hay tickes pendientes'
        } 
        
        ticketAtender = this.pendientes[0] 
        ticketAtender.escritorio = escritorio
        this.pendientes.shift()

        this.ultimos4.unshift(ticketAtender)

        this.ultimos4.length > 4 ? this.ultimos4.splice(-1,1) : null

        this.guardarData(this.ultimo, this.ultimoFecha, this.pendientes, this.ultimos4)

        return ticketAtender


    }

    guardarData(numeroTicket, fechaDia, pendientes, ultimos4){
        const data = {
            ultimo: numeroTicket,
            hoy: fechaDia,
            pendientes,
            ultimos4
        }

        const dataJson = JSON.stringify(data)
        fs.writeFileSync('./server/data/data.json', dataJson)
    }

} 

module.exports = {
    NewTicket
}