component {
	function onRequest() {
		var scratchFile = "/tmp/" & ( url.scratchFile ?: "" );

		if ( FileExists( scratchFile ) ) {
			include template=scratchFile;
		} else {
			WriteOutput( 'nothing doing...' );
		}
	}
}