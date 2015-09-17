
	$(document).ready(function(){
	    $("button").click(function(){

		    // pega dados do formulario
		    var data = {};
		    for (var i = 0; i < form.length; ++i) {
		        var input = form[i];
		        if (input.name) {
		          data[input.name] = input.value;
		        }
		     }

		    //Chama API 
	        $.ajax({
             type: "POST",
             url: "/api/:model",
             data: JSON.stringify(data), //manda dados do form
             contentType: "application/json; charset=utf-8",
             crossDomain: true,
             dataType: "json",
             success: function (data, status, jqXHR) {
                 alert(success);
             },

             error: function (jqXHR, status) {
                 // error handler
                 console.log(jqXHR);
                 alert('fail' + status.code);
             }
	    });
	})