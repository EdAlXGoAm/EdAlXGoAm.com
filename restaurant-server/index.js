require('dotenv').config(); // Cargar variables de entorno
const http = require('http');
const { Server } = require('socket.io');
const app = require('./src/app'); // Importando app.js

const server = http.createServer(app);
const io = new Server(server,
    {
        cors: {
            origin: 'http://localhost:3000',
        }
    }
);

const connectDB = require('./src/db'); // Importando la función para conectar a la base de datos
connectDB(); // Conectar a la base de datos

io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado');

    socket.on('nuevaOrden', (orden) => {
        io.emit('ordenActualizada', orden);
    });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});