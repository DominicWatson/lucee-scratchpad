window.serverFactory = ( function( java ){
    "use strict";

    var ServerFactory = function (){
    	java.classpath.push( "./lib/lucee-undertow-server-factory.jar" );
    };

    ServerFactory.prototype.newServer = function( port, libDirList, webroot, webXmlPath, webInfDir ){
        return java.newInstanceSync(
              "org.lucee.LuceeUndertowServer"
            , port
            , "localhost"
            , libDirList
            , webroot
            , webXmlPath
            , webInfDir
        );
    };

    return new ServerFactory;

} )( require( 'java' ) );