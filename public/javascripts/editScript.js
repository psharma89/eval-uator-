$(function(){
	require.config({ paths: { 'vs': 'monaco-editor/min/vs' }});
    require(['vs/editor/editor.main'], function() {
        window.editor = monaco.editor.create(document.getElementById('container'), {
            
            language: 'javascript'
        });
        function htmlDecode(input){
          var e = document.createElement('div');
          e.innerHTML = input;
          return e.childNodes[0].nodeValue;
        }
        var x = htmlDecode(window.scriptSRC)
        window.editor.setValue(x.substring(1, x.length - 1));
        
    });
    $('#editScript').click(function(){
        var value = window.editor.getValue();
        $(this).hide();
        var _this = this;
        $.post( "/" + window.item + "/editScript", {script: btoa(encodeURIComponent(value))}, function() {
          $(_this).show();
          alert('saved!');
          window.location.reload();
        }).fail(function() {
            alert('Failed to upload. Try again.');
            $(_this).show();
        });
        return false;
    });

    $('#deleteScript').click(function(){
        var value = window.editor.getValue();
        $(this).hide();
        var _this = this;
        $.post( "/" + window.item + "/deleteScript", {script: btoa(encodeURIComponent(value))}, function() {
          $(_this).show();
          alert('saved!');
          window.location = '/'
        }).fail(function() {
            alert('Failed. Try again.');
            $(_this).show();
        });
        return false;
    });
});