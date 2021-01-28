const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
        origin: 'http://192.168.0.141:8080', //'http://localhost:4000', //'https://amritb.github.io', //'http://192.168.0.112:8080',
        methods: ["GET", "POST"],
        credentials: true
    }
});
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookie = require('cookie');

const accessTokenSecret = 'somerandomaccesstoken';

app.use(bodyParser.json());

io.use((socket, next) => {
    try {
        console.log("mdw - oieeeeeee....");
        //const token = socket.handshake.auth.token;
    
        const cookies = cookie.parse(socket.request.headers.cookie || '');
        //const authHeader = req.cookies.Authorization;
        console.log('mdw - cookie: ' + Object.entries(cookies));
    
        const tk = socket.handshake.auth.aaa;
        console.log('mdw - ativo 11...' + tk);
        
        //const token = socket.handshake.auth.token;
        const user = socket.handshake.auth.user;
        console.log('mdw - mdw web ativo 22...' + user);
        const passw = socket.handshake.auth.passw;
        console.log('mdw - mdw web ativo 22...' + passw);
        if (user != 'admin') {
            console.log('mdw - erroooooooo');
            next(new Error("9998 - erro autenticacao"));
        } else {
            console.log('mdw - ident ok!!!');
            next();
        }    
    } catch(error) {
        console.log('mdw erro: ' + error);
        next(new Error("9997 - erro aplicação"));
    }
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.broadcast.emit('hi');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('logRequest', (msg) => {
        console.log('logRequest okkkkkkkkkk');
        const cookies = cookie.parse(socket.request.headers.cookie || '');
        console.log('logRequest cookie: ' + Object.entries(cookies));
        const token = socket.handshake.auth.token;
        console.log('logRequest token: ' + token);
        });

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});