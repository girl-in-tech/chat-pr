const net = require('net');

let clienti = [];



const server = net.createServer(socket => {

    clienti.push(socket);
    console.log('Client Connectat.');
    
    socket.on('data', data => {
        console.log(`${data.toString()}`)
        broadcast(data, socket);
    });

    socket.on('error', err => {
        console.log('Clientul s-a deconectat');
    });

    socket.on('close', () => {
        console.log("Clientul a parasit chat-ul.");
    });

});

server.listen(4000);



function broadcast(mesaj, socketSent) {
    if (mesaj === 'ies') {
        const index = clienti.indexOf(socketSent);
        clienti.splice(index, 1);
    } else {
        clienti.forEach(client => {
            client.write(mesaj);
        });
    }
}