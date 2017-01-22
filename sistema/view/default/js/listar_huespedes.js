var idecito=0;

window.onload = function(){
	$('#example').DataTable();
	comboEmpresa();
	mostrarDatos();	
	mostrarMenu();
}

$(function() {
	$('#new_huesped').on('click', function(){
		$('#modalUsuario').modal({
			show:true,
			backdrop:'static',
		});
		$('#cabeceraRegistro').html(" - NUEVO HUÉSPED - ");
		$('#param_opcion').val('nuevoUsuario');
		$('#param_nombres').val('');
		$('#param_paterno').val('');
		$('#param_materno').val('');
		$('#param_dni').val('');
		$('#param_direccion').val('');
		$('#param_celular').val('');
		$('#param_usuario').val('');
		$('#param_clave').val('');
		
	});

	$('#registroUsuario').on('click', function(){
		//alert('HOLA Xd');

		var nombres = $('#param_nombres').val();
		var paterno = $('#param_paterno').val();
		var materno = $('#param_materno').val();
		var dni = $('#param_dni').val();
		var direccion = $('#param_direccion').val();
		var celular = $('#param_celular').val();
		var usuario = $('#param_usuario').val();
		var clave = $('#param_clave').val();
		$('#param_id').val(idecito);

        
		if (dni.length == 0 || paterno.length == 0 || materno.length == 0 || nombres.length == 0 ) {           
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
					$("#param_direccion").val('');
					$("#param_celular").val('');
					$("#param_empresa").val('0');
					setTimeout("location.href='../operaciones/listar_huespedes.php'",1000)        

		        },
		        error: function(data){
		                   
		         } 
			});
        }
		
	});

	$('#registroCancelar').on('click', function(){
		//alert('HOLA Xd');
		setTimeout("location.href='../operaciones/listar_huespedes.php'",1)
	});

});

function mostrarDatos(){
	$.ajax({
		type: 'POST',
		data:{param_opcion: 'listarHuespedes'},
		url: '../../controller/controlusuario/usuario.php',
		success: function(respuesta){
			$('#example').DataTable().destroy();
			$('#cuerpoTabla').html(respuesta);
			$('#example').DataTable();
		},
		error: function(respuesta){
			$('#cuerpoTabla').html(respuesta);
		}
	});	
}

function editarh(id){	
	$('#param_id').val(id);
	var param_opcion = 'modificarUsuario';
	idecito = id;

	$.ajax({
		type: 'POST',
		data:'param_opcion='+param_opcion+'&id='+id,
		url: '../../controller/controlusuario/usuario.php',
		success: function(data){
			console.log(data);
			$('#param_opcion').val('modificarUsuario');
			$('#cabeceraRegistro').html("- EDITAR HUESPED - ");		
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

function eliminarh(id){	
	
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


	function comboEmpresa(){ 	
    var param_opcion = 'comboEmpresa'; 
    $.ajax({
        type: 'POST',        
        data:'param_opcion='+param_opcion,
        url: '../../controller/controlEmpresa/empresa.php',
        success: function(data){
            $('#param_empresa').html(data);         

        },
        error: function(data){
                   
        }
    });    
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