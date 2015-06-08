module.exports = function (grunt) {
	'use strict';

	grunt.loadNpmTasks( 'grunt-node-webkit-builder' );
	grunt.loadNpmTasks( 'grunt-exec'                );
	grunt.loadNpmTasks( 'grunt-wget'                );
	grunt.loadNpmTasks( 'grunt-zip'                 );
	grunt.loadNpmTasks( 'grunt-contrib-clean'       );
	grunt.loadNpmTasks( 'grunt-contrib-copy'        );

	grunt.registerTask( 'default', [ 'wget:undertowserverjar', 'wget:luceejars', 'exec:nwgyp', 'nodewebkit' ] );
	grunt.registerTask( 'zip'    , [ 'exec:zip_linux_32' , 'exec:zip_linux_64', 'exec:zip_windows_32' , 'exec:zip_windows_64', 'exec:zip_osx_32' , 'exec:zip_osx_64', 'copy:zips' ] );
	grunt.registerTask( 'jars'   , [ 'wget:undertowserverjar', 'wget:luceejars', 'unzip', 'clean' ] );
	grunt.registerTask( 'linux'  , [ 'nodewebkit:linux'                                           ] );
	grunt.registerTask( 'win'    , [ 'nodewebkit:win'                                             ] );
	grunt.registerTask( 'osx'    , [ 'nodewebkit:osx'                                             ] );
	grunt.registerTask( 'nwgyp'  , [ 'exec:nwgyp'                                                 ] );

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
			},
			zip_linux_32 : {
				command : 'zip -r linux32.zip *',
				cwd     : './builds/lucee-scratchpad/linux32',
				stdout  : true,
				stderr  : true
			},
			zip_linux_64 : {
				command : 'zip -r linux64.zip *',
				cwd     : './builds/lucee-scratchpad/linux64',
				stdout  : true,
				stderr  : true
			},
			zip_osx_32 : {
				command : 'zip -r osx32.zip *',
				cwd     : './builds/lucee-scratchpad/osx32',
				stdout  : true,
				stderr  : true
			},
			zip_osx_64 : {
				command : 'zip -r osx64.zip *',
				cwd     : './builds/lucee-scratchpad/osx64',
				stdout  : true,
				stderr  : true
			},
			zip_windows_32 : {
				command : 'zip -r win32.zip *',
				cwd     : './builds/lucee-scratchpad/win32',
				stdout  : true,
				stderr  : true
			},
			zip_windows_64 : {
				command : 'zip -r win64.zip *',
				cwd     : './builds/lucee-scratchpad/win64',
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

		clean: [ "lucee-4.5.1.000-jars.zip" ],

		copy: {
			zips: {
				files: [
					{ src: [ 'builds/lucee-scratchpad/linux32/linux32.zip' ], dest: 'builds/lucee-scratchpad/zips/linux32.zip' },
					{ src: [ 'builds/lucee-scratchpad/linux64/linux64.zip' ], dest: 'builds/lucee-scratchpad/zips/linux64.zip' },
					{ src: [ 'builds/lucee-scratchpad/win32/win32.zip'     ], dest: 'builds/lucee-scratchpad/zips/win32.zip'   },
					{ src: [ 'builds/lucee-scratchpad/win64/win64.zip'     ], dest: 'builds/lucee-scratchpad/zips/win64.zip'   },
					{ src: [ 'builds/lucee-scratchpad/osx32/osx32.zip'     ], dest: 'builds/lucee-scratchpad/zips/osx32.zip'   },
					{ src: [ 'builds/lucee-scratchpad/osx64/osx64.zip'     ], dest: 'builds/lucee-scratchpad/zips/osx64.zip'   }
				]
			},
		}
	} );
};