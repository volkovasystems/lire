const lire = require( "./lire.js" );

console.log( lire( "./package.json", true ) )

lire( "./package.json" )
	( function done( error, result ){
		console.log( arguments );
	} );
