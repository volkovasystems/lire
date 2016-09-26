"use strict";

/*;
	@module-license:
		The MIT License (MIT)
		@mit-license

		Copyright (@c) 2016 Richeve Siodina Bebedor
		@email: richeve.bebedor@gmail.com

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.
	@end-module-license

	@module-configuration:
		{
			"package": "lire",
			"path": "lire/lire.js",
			"file": "lire.js",
			"module": "lire",
			"author": "Richeve S. Bebedor",
			"eMail": "richeve.bebedor@gmail.com",
			"repository": "https://github.com/volkovasystems/lire.git",
			"test": "lire-test.js",
			"global": true
		}
	@end-module-configuration

	@module-documentation:
		Read file.
	@end-module-documentation

	@include:
		{
			"fs": "fs",
			"kept": "kept",
			"letgo": "letgo"
		}
	@end-include
*/

var fs = require( "fs" );
var kept = require( "kept" );
var letgo = require( "letgo" );

var lire = function lire( path, synchronous ){
	/*;
		@meta-configuration:
			{
				"path:required": "string",
				"synchronous": "boolean"
			}
		@end-meta-configuration
	*/

	if( typeof path != "string" || !path ){
		throw new Error( "invalid path" );
	}

	if( synchronous ){
		try{
			if( kept( path, READ, synchronous ) ){
				try{
					return fs.readFileSync( path, "utf8" );

				}catch( error ){
					throw new Error( "error reading file, " + error.message );
				}

			}else{
				return "";
			}

		}catch( error ){
			throw new Error( "error checking file if readable, " + error.message );
		}

	}else{
		var catcher = letgo.bind( this )( );

		kept( path, READ )
			( function ifReadable( error, readable ){
				if( error ){
					error = new Error( "error checking file readability, " + error.message );

					catcher.cache.callback( error, "" );

				}else if( readable ){
					fs.readFile( path, "utf8",
						function onRead( error, result ){
							if( error ){
								error = new Error( "error reading file, " + error.message );

								catcher.cache.callback( error, "" );

							}else{
								catcher.cache.callback( null, result );
							}
						} );

				}else{
					catcher.cache.callback( null, "" );
				}
			} );

		return catcher;
	}
};

module.exports = lire;
