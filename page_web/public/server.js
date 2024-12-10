// const express = require('express');
// const http = require('http');
// const WebSocket = require('ws');
// const path = require('path');

// const app = express();
// const port = 3000;

// const server = http.createServer(app);
// const wss = new WebSocket.Server({ server });

// wss.on('connection', (ws) => {
//   console.log('Client connected');
  
//   ws.on('message', (message) => {
//     // Diffuser le message à tous les clients connectés
//     wss.clients.forEach((client) => {
//       if (client.readyState === WebSocket.OPEN) {
//         client.send(message);
//       }
//     });
//   });

//   ws.on('close', () => {
//     console.log('Client disconnected');
//   });
// });

// app.use(express.static(path.join(__dirname, 'public')));

// server.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3001 });

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });
    ws.send('Welcome to WebSocket server');
});

console.log('Server running on ws://192.168.1.39:3001');

