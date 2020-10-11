const { io } = require('../index');

const Bands = require("../models/bands");
const Band = require("../models/band");


const bands = new Bands();

bands.addBand( new Band( 'Queen' ) );
bands.addBand( new Band( 'Pink Sweat' ) );
bands.addBand( new Band( 'Nirvana' ) );
bands.addBand( new Band( 'Coldplay' ) );


// Mensajes de Scokets
io.on('connection', client => {
    console.log('Cliente conectado');  
    
    client.emit('active-bands', bands.getBands() );
 
    client.on('disconnect', () => {
       console.log('Cliente desconectado');
    });
 
    client.on('mensaje', ( payload ) =>{
       console.log('mensaje!!!', payload);
       io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );
    });

    client.on('vote-band', (payload) => {

      bands.voteBand( payload.id );
      io.emit('active-bands', bands.getBands() );

    });

    client.on('add-band', ( payload ) => {

     const newBand = new Band( payload.name )
     bands.addBand( newBand );
     io.emit('active-bands', bands.getBands());

    });

    client.on('delete-band', (payload) => {

     bands.deleteBand( payload.id );
     io.emit('active-bands', bands.getBands());
      
    });

   //  client.on('emitir-mensaje',( payload ) => {
   //    //  io.emit('nuevo-mensaje', payload); // esto emite a todos
   //    client.broadcast.emit('nuevo-mensaje', payload); // para emitir a todos menos al que lo está emitiendo
   //  });
 
  });