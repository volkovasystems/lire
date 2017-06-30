
const assert = require( "assert" );
const lire = require( "./lire.js" );

assert.equal( lire( "./test.txt", true ), "hello world", "should be equal" );

lire( "./test.txt" )
	( function done( error, result ){
		assert.equal( result, "hello world", "should be equal" );

		console.log( "Finished reading file" );
	} );

console.log( "ok" );
