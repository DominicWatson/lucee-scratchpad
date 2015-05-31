
window.scratchServer = ( function( $, serverFactory, nw, fs, ncp ) {
    'use strict';
    var start = function( callback ){
        var rootFolder    = nw.App.dataPath + "/server/"
          , webroot       = rootFolder      + "application/"
          , lucee4Dir     = rootFolder      + "lucee4/"
          , libDir        = rootFolder      + "lucee4/lib/"
          , webConfDir    = rootFolder      + "lucee4/web/"
          , serverConfDir = rootFolder      + "lucee4/server/"
          , webxml        = rootFolder      + "lucee4/web.xml"
          , webInf        = webroot         + "WEB-INF/";

        if ( !fs.existsSync( rootFolder ) ) {
            fs.mkdirSync( rootFolder );
        }
        if ( !fs.existsSync( lucee4Dir ) ) {
            fs.mkdirSync( lucee4Dir );
        }
        if ( !fs.existsSync( libDir ) ) {
            fs.mkdirSync( libDir );
        }
        if ( !fs.existsSync( webroot ) ) {
            fs.mkdirSync( webroot );
        }
        if ( !fs.existsSync( webInf ) ) {
            fs.mkdirSync( webInf );
        }
        if ( !fs.existsSync( webConfDir ) ) {
            fs.mkdirSync( webConfDir );
        }
        if ( !fs.existsSync( serverConfDir ) ) {
            fs.mkdirSync( serverConfDir );
        }

        var webxmlContent = fs.readFileSync( "./server-resources/web.xml", { encoding : "UTF-8" } );
        fs.writeFileSync( webxml, webxmlContent.replace( /\{data\-dir\}/g, rootFolder ) );
        ncp( "./server-resources/lucee4-lib/", libDir, function(){
            ncp( "./scratchpad/", webroot, function(){
                serverFactory.newServer(
                    4040
                  , libDir
                  , webroot
                  , webxml
                  , webInf
                ).start( callback );
            } );
        } );
    }

    return { start : start };

})( jQuery, window.serverFactory, require( "nw.gui" ), require( "fs" ), require( "ncp" ).ncp );