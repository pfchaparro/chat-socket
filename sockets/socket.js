const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');
const { usuarioConectado, usuarioDeconectado} = require('../controllers/socket');

const bands = new Bands();

bands.addBand(new Band('Queen'));
bands.addBand(new Band('Bon jovi'));
bands.addBand(new Band('Heroes del silencio'));
bands.addBand(new Band('Metalica'));

// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);

    // verificar autenticacion
    // if (!valido) {
    //     return client.disconnect();
    // }

    // cliente autenticado
    // usuarioConectado(uid);

    // ingresar al usuario a una sala especifica
    // client.join(uid);

    // escuchar del cliente mensaje-personal
    client.on('mensaje-persona', (payload) => {
        io.to(payload.para).emit('mensaje-persona', payload);
    });

    // client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
        usuarioDeconectado(uid);
    });

    // client.on('mensaje', ( payload ) => {
    //     console.log('Mensaje', payload);

    //     io.emit( 'mensaje', { admin: 'Nuevo mensaje2' } );
    // });

    // client.on('nuevo-mensaje', (payload) => {
    //     // io.emit('nuevo-mensaje', payload);
    //     // console.log(payload);
    //     client.broadcast.emit('nuevo-mensaje', payload);
    // })

    // client.on('vote-band', (payload) => {
    //     bands.voteBand( payload.id );
    //     io.emit('active-bands', bands.getBands() );
    // });

    // client.on('add-band', (payload) => {
    //     const newBand = new Band( payload.name );
    //     bands.addBand( newBand );
    //     io.emit('active-bands', bands.getBands() );
    // });

});
