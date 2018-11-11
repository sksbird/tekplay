
// Module dependencies.
 const app = require('./app');
 const http = require('http');

 const port = normalizePort(process.env.port || '3000');
 app.set('port', port);

 const server = http.createServer(app, (req, res) => { /*todo*/ });

 server.listen(port);
 server.on('error', onError);
 server.on('listening', onListening);

 function normalizePort(val) {
     let port = parseInt(val, 10);

     if (isNaN(port)) {
         return val;
     }

     if (port >= 0 ) {
         return port;
     }

     return false;
 }


 function onError (error, req, res) {
    
    if (error.syscall != 'listen') {
        throw error;
    }

    let bind = typeof(port) === 'string' ? 'Pipe ' + port : 'Port ' + port;

    switch(error.code) {
        case 'EACCES':
            console.log(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.log(bind + ' already in use');
            process.exit(1);
            break;
        default: 
            throw error;
    }
 }

 function onListening() {
    let addr = server.address();
    let bind = typeof(addr) === 'string' ? 'pipe ' + port : 'port ' + addr.port;
    console.log('Listening on ' + bind);
}