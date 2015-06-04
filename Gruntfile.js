module.exports = function (grunt) {
	'use strict';

	grunt.loadNpmTasks( 'grunt-node-webkit-builder' );
	grunt.loadNpmTasks( 'grunt-exec'                );
	grunt.loadNpmTasks( 'grunt-wget'                );
	grunt.loadNpmTasks( 'grunt-zip'                 );
	grunt.loadNpmTasks( 'grunt-contrib-clean'       );

	grunt.registerTask( 'default', [ 'wget:undertowserverjar', 'exec:nwgyp', 'nodewebkit'         ] );
	grunt.registerTask( 'jars'   , [ 'wget:undertowserverjar', 'wget:luceejars', 'unzip', 'clean' ] );
	grunt.registerTask( 'linux'  , [ 'nodewebkit:linux'                                     ] );
	grunt.registerTask( 'win'    , [ 'nodewebkit:win'                                       ] );
	grunt.registerTask( 'osx'    , [ 'nodewebkit:osx'                                       ] );
	grunt.registerTask( 'nwgyp'  , [ 'exec:nwgyp'                                           ] );

	grunt.initConfig( {
		nodewebkit: {
			linux: { src: ['./app/**/*'], options : { platforms : [ 'linux' ], buildDir: './builds', version: '0.11.6' } },
			win  : { src: ['./app/**/*'], options : { platforms : [ 'win'   ], buildDir: './builds', version: '0.11.6' } },
			osx  : { src: ['./app/**/*'], options : { platforms : [ 'osx'   ], buildDir: './builds', version: '0.11.6' } }
		},

		exec : {
			nwgyp : {
				command : 'nw-gyp configure --target=0.11.6 && nw-gyp build',
				cwd     : './app/node_modules/java',
				stdout  : true,
				stderr  : true
			}
		},

		wget : {
			undertowserverjar : {
				files : {
					'./app/lib/lucee-undertow-server-factory.jar' : 'http://downloads.domwatson.codes/embedded-lucee-undertow-factory/embedded-lucee-undertow-factory-1.0.0.jar'
				}
			},
			luceejars : {
				files : {
					'./lucee-4.5.1.000-jars.zip' : 'http://bitbucket.org/lucee/lucee/downloads/lucee-4.5.1.000-jars.zip'
				}
			}
		},

		unzip: {
			'./app/server-resources/lucee4-lib/' : 'lucee-4.5.1.000-jars.zip'
		},

		clean: [ "lucee-4.5.1.000-jars.zip" ]
	} );
};