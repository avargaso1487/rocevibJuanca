window.onload = function()
{	
	mostrarMenu();	
};


function mostrarMenu()
{
	$.ajax({
        type:'POST',
        data: {opcion:'mostrarMenu'},        
        url: "../../controller/controlusuario/usuario.php",
        success:function(data){        		                 
            $('#permisos').html(data);                
        }
    });
}