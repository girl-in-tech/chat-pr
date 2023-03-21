const net = require('net');

const readLine = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const asteaptaNumeleDeUtilizator = new Promise(resolve => {
    readLine.question('Scrie numele de Utilizator pe chat: ', raspuns => {
        resolve(raspuns);
    });
});

asteaptaNumeleDeUtilizator.then((username) => {

    const client = net.connect({
        port: 4000
    });

    readLine.on('line', data => {
        if (data === 'ies') {
            client.write(`${username} a parsit chat-ul.`);
            client.setTimeout(1000);
        } else {
            client.write(username + ': ' + data);
        }
    });

    client.on('connect', () => {
        client.write(username + ' s-a laturat pe chat.');
    });

    client.on('data', data => {
        console.log(`${data}`);
    });

    client.on('timeout', () => {
        client.write('ies');
        client.end();
    });

    client.on('end', () => {
        process.exit();
    });

    client.on('error', () => {
        console.log('Serverul pare sa fi fost inchis...');
    });
});