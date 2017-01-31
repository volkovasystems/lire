/*;
	@module-license:
		The MIT License (MIT)
		@mit-license

		Copyright (@c) 2017 Richeve Siodina Bebedor
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
			"contributors": [
				"John Lenon Maghanoy <johnlenonmaghanoy@gmail.com>"
			],
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
			"falzy": "falzy",
			"fs": "fs",
			"kept": "kept",
			"letgo": "letgo",
			"protype": "protype",
			"zelf": "zelf"
		}
	@end-include
*/

const falzy = require( "falzy" );
const fs = require( "fs" );
const kept = require( "kept" );
const letgo = require( "letgo" );
const protype = require( "protype" );
const zelf = require( "zelf" );

const lire = function lire( path, synchronous ){
	/*;
		@meta-configuration:
			{
				"path:required": "string",
				"synchronous": "boolean"
			}
		@end-meta-configuration
	*/

	if( !protype( path, STRING ) || falzy( path ) ){
		throw new Error( "invalid path" );
	}

	if( synchronous ){
		try{
			if( kept( path, READ, synchronous ) ){
				try{
					return fs.readFileSync( path, "utf8" );

				}catch( error ){
					throw new Error( `error reading file, ${ error }` );
				}

			}else{
				return "";
			}

		}catch( error ){
			throw new Error( `cannot read file, ${ error }` );
		}

	}else{
		let self = zelf( this );

		let catcher = letgo.bind( self )( function later( cache ){
			kept( path, READ )
				( function done( error, readable ){
					if( error ){
						error = new Error( `cannot read file, ${ error }` );
						
						cache.callback( error, "" );

					}else if( readable ){
						fs.readFile( path, "utf8",
							function done( error, result ){
								if( error ){
									error = new Error( `error reading file, ${ error }` );

									cache.callback( error, "" );

								}else{
									cache.callback( null, result );
								}
							} );

					}else{
						cache.callback( null, "" );
					}
				} );
		} );

		return catcher;
	}
};

module.exports = lire;
