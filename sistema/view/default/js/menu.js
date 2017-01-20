window.onload = function()
{	
	mostrarMenu();	
};


function mostrarMenu()
{
	var grupo = document.getElementById('NombreGrupo').value;
    var tarea = document.getElementById('NombreTarea').value;

	$.ajax({
        type:'POST',
        data: 'param_opcion=listarMenu&grupo='+grupo+'&tarea='+tarea,
        url: "../../controller/controlusuario/tree.php",
        success:function(data){        		                 
            $('#permisos').html(data);                
        }
    });
}