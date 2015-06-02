
window.luceeScratch = ( function( $, scratchServer, fs, nw ) {
    'use strict';

    var codeEditor = CodeMirror.fromTextArea( document.getElementById( "code" ) )
      , $iframe;

    scratchServer.start( function(){
        $iframe = $( '<iframe src="http://localhost:4040" frameborder="0" width="100%" height="700" style="background-color:white;"></iframe>' );

        $( '#iframe-container' ).append( $iframe );
    });

    $( "#submit" ).click( function( e ){
        e.preventDefault();

        var code = codeEditor.getValue();

        fs.writeFile( nw.App.dataPath + "/server/application/index.cfm", code, null, function(){
            $iframe.get(0).contentWindow.location.reload();
        } );
    } );

})( jQuery, window.scratchServer, require( "fs" ), require( "nw.gui" ) );