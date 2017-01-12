function enviarMensaje()
{
	$.ajax({
        type: 'POST',
        data: $('#frmRegistroEgresados').serialize(),        
        url: 'enviar.php',
        success: function(data){                                    
        	window.close();
        },
        error: function(respuesta)
        {
            alert("ERROR AL MOSTRAR DATOS");
        }
    });
}