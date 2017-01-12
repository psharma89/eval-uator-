$(function(){
	console.log('hi');
	require.config({ paths: { 'vs': 'monaco-editor/min/vs' }});
    require(['vs/editor/editor.main'], function() {
        window.editor = monaco.editor.create(document.getElementById('container'), {
            value: [
                'function x() {',
                '\tconsole.log("Hello world!");',
                '}'
            ].join('\n'),
            language: 'javascript'
        });
    });

    $('#submitScript').click(function(){
    	var value = window.editor.getValue();
    	$(this).hide();
    	var _this = this;
    	$.post( "/uploadScript", {script: btoa(encodeURIComponent(value))}, function() {
    	  window.location = "/";
		  $(_this).show();
		}).fail(function() {
			alert('Failed to upload. Try again.');
			$(_this).show();
		});
    	return false;
    })
});