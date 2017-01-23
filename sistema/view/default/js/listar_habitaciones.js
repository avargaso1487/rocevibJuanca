window.onload = function(){
	mostrarDatos();	
	mostrarMenu();
}

$(function() {
	$('#new_usuario').on('click', function(){
		$('#modalUsuario').modal({
			show:true,
			backdrop:'static',
		});
		$('#cabeceraRegistro').html(".:: Nuevo Usuario ::.");
		$('#param_opcion').val('nuevoUsuario');
		$("#param_dni").val('');
		$("#param_paterno").val('');
		$("#param_materno").val('');
		$("#param_nombres").val('');
	});

	$('#registroUsuario').on('click', function(){
		//alert('HOLA Xd');
		var nombres = $('#param_nombres').val();
		var paterno = $('#param_paterno').val();
		var materno = $('#param_materno').val();
		var dni = $('#param_dni').val();
		var direccion = $('#param_direccion').val();
		var usuario = $('#param_usuUsuario').val();
		var clave = $('#param_usuClave').val();
        
		if (dni.length == 0 || paterno.length == 0 || materno.length == 0 || nombres.length == 0 || usuario.length == 0 || clave.length == 0 ) {           
            $("#mensaje").html('<p class="alert alert-danger text-center"> Por favor, ingrese todos los datos.</p>').show(200).delay(3500).hide(200);
        } else {
        	$.ajax({
		        type: 'POST',        
		        data: $('#form_nuevoUsuario').serialize(),
		        url: '../../controller/controlusuario/usuario.php',
		        success: function(data){
		            $("#mensaje").html('<p class="alert alert-success text-center">Registro Correcto</p>').show()
		                        //window.location = "../index.php";
		            $('#param_opcion').val('nuevoUsuario');
					$("#param_dni").val('');
					$("#param_id").val('');
					$("#param_paterno").val('');
					$("#param_materno").val('');
					$("#param_nombres").val('');
					setTimeout("location.href='../operaciones/listar_empleados.php'",1000)        

		        },
		        error: function(data){
		                   
		        } 
			});
        }
		
	});

	$('#registroCancelar').on('click', function(){
		//alert('HOLA Xd');
		setTimeout("location.href='../operaciones/listar_empleados.php'",1)
	});

});

function mostrarDatos(){
	$.ajax({
		type: 'POST',
		data:{param_opcion: 'listarHabitaciones'},
		url: '../../controller/controlusuario/usuario.php',
		success: function(respuesta){
			$('#habs').DataTable().destroy();
			$('#cuerpoHabs').html(respuesta);
			$('#habs').DataTable();
		},
		error: function(respuesta){
			$('#cuerpoHabs').html(respuesta);
		}
	});	
}

function editar(id){	
	
	var param_opcion = 'mostrar';
	$.ajax({
		type: 'POST',
		data:'param_opcion='+param_opcion+'&id='+id,
		url: '../../controller/controlusuario/usuario.php',
		success: function(data){
			console.log(data);
			$('#param_opcion').val('modificarUsuario');
			$('#cabeceraRegistro').html(".:: Modificar Usuario ::.");		
		  	$('#modalUsuario').modal({
		  		show:true,
		  		backdrop:'static',
		  	});
			objeto=JSON.parse(data);
			$("#param_dni").val(objeto[0]);
			$("#param_paterno").val(objeto[1]);
			$("#param_materno").val(objeto[2]);
			$("#param_nombres").val(objeto[3]);		  	
		},
		error: function(data){
			
		}
	});
}

function eliminar(id){	
	
	var param_opcion = 'eliminarUsuario';
	var r = confirm("¿Esta seguro que desea eliminar esta información?");
	if (r == true) {
	    $.ajax({
			type: 'POST',
			data:'param_opcion='+param_opcion+'&id='+id,
			url: '../../controller/controlusuario/usuario.php',
			success: function(data){
				mostrarDatos();		  	
			},
			error: function(data){
				
			}
		});
	} else {
	   mostrarDatos();
	} 	
}

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