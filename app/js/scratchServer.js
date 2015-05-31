
window.scratchServer = ( function( $, serverFactory ) {
    'use strict';

    var rootFolder = "/home/dom/.lucee-scratch/"
      , webroot    = rootFolder + "application/"
      , libDirs    = rootFolder + "lucee4/lib/"
      , webxml     = rootFolder + "lucee4/web.xml"
      , webInf     = webroot    + "WEB-INF/";

    return serverFactory.newServer(
          4040
        , libDirs
        , webroot
        , webxml
        , webInf
    );

})( jQuery, window.serverFactory );