$(function(){
	require.config({ paths: { 'vs': 'monaco-editor/min/vs' }});
    require(['vs/editor/editor.main'], function() {
        window.editor = monaco.editor.create(document.getElementById('container'), {
            
            language: 'javascript'
        });
        
        $.get("/" + window.item + "/getScript", function(data) {
            console.log(data.data);
          window.scriptSRC = data.data;
          function htmlDecode(input){
              var e = document.createElement('div');
              e.innerHTML = input;
              return e.childNodes[0].nodeValue;
            }
            var x = htmlDecode(window.scriptSRC)
            window.editor.setValue(x);
        });
        
        
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