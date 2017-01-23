window.onload = function(){
	//$('#example').DataTable();
	mostrarMenu();
	mostrarDatos();	
}

$(function() {
	$('#nuevaEmpresa').on('click', function(){
		//alert('HOLA Xd');

		var razonSocial= $('#param_razonSocial').val();
		var direccion= $('#param_direccion').val();
		var ruc= $('#param_ruc').val();
		var aComercial= $('#param_aComercial').val();

		//$('#param_id').val(idecito);
		//alert(idecito);
		//alert(nombres+paterno+materno+dni+direccion+celular+usuario+clave);
      
		if (razonSocial.length==0 || direccion.length==0 || ruc.length==0) 
		{           
        	$("#mensaje").html('<p class="alert alert-danger text-center"> Ingrese todos los datos necesarios.</p>').show(200).delay(3500).hide(200);
        } else {

        	$.ajax({
		        type: 'POST',        
		        data: $('#frm_empresa').serialize()+'&param_opcion=nuevaEmpresa',
		        url: '../../controller/controlusuario/usuario.php',
		        success: function(data){
		            $("#mensaje").html('<p class="alert alert-success text-center">Registro Correcto</p>').show()
		                        //window.location = "../index.php";
		            $('#param_opcion').val('nuevoEmpresa');
		            $('#param_razonSocial').val('');
		            $('#param_direccion').val('');
		            $('#param_ruc').val('');
		            $('#param_aComercial').val('');

					setTimeout("location.href='listar_empresas.php'",1000)        

		        },
		        error: function(data){
		                   
		        } 
			});
        }
		
	});

	$('#actualizarEmpleado').on('click', function(){
		//alert('HOLA Xd');
		var id = $('#param_id2').val();
		var nombres = $('#param_nombres').val();
		var paterno = $('#param_paterno').val();
		var materno = $('#param_materno').val();
		var dni = $('#param_dni').val();
		var direccion = $('#param_direccion').val();
		var celular = $('#param_celular').val();
		var empresa = $('#param_empresa').val();
		var usuario = $('#param_usuario').val();
		var clave = $('#param_clave').val();


		//$('#param_id').val(idecito);
		//alert(idecito);
		//alert(nombres+paterno+materno+dni+direccion+celular+usuario+clave);
      
		if (dni.length == 0 || paterno.length == 0 || materno.length == 0 || nombres.length == 0 ) 
		{           
        	$("#mensaje").html('<p class="alert alert-danger text-center"> Ingrese todos los datos necesarios.</p>').show(200).delay(3500).hide(200);
        } else {
        	$.ajax({
		        type: 'POST',        
		        data: $('#frm_empresa').serialize()+'&param_opcion=actualizarUsuario',
		        url: '../../controller/controlusuario/usuario.php',
		        success: function(data){
		            $("#mensaje").html('<p class="alert alert-success text-center">Datos actualizados correctamente</p>').show()
		                        //window.location = "../index.php";
		            $('#param_opcion').val('actualizarUsuario');
		            $("#param_nombres").val('');					
					$("#param_paterno").val('');
					$("#param_materno").val('');
					$("#param_dni").val('');
					$("#param_direccion").val('');
					$("#param_celular").val('');
					$("#param_usuario").val('');
					$("#param_clave").val('');

					//setTimeout("location.href='listar_empleados.php'",1000)        

		        },
		        error: function(data){
		                   
		        } 
			});
        }
		
	});










});

function mostrarDatos(){
	$.ajax({
		type: 'POST',
		data:{param_opcion: 'listarEmpresas'},
		url: '../../controller/controlusuario/usuario.php',
		success: function(respuesta){
			$('#empresas').DataTable().destroy();
			$('#cuerpoEmpresas').html(respuesta);
			$('#empresas').DataTable();
		},
		error: function(respuesta){
			$('#cuerpoEmpresas').html(respuesta);
		}
	});	
}

function editar(id){

	var param_opcion = 'editarEmpleado';
	//var id = $("#param_id").val(objeto[0]);
	$.ajax({
		type: 'POST',
		data:'param_opcion='+param_opcion+'&id='+id,
		url: '../../controller/controlusuario/usuario.php',

		success: function(respuesta){
			//console.log(data);
			$('#param_opcion').val('editarEmpleado');	

		  	$('#modal-form').modal({
		  		show:true,
		  		backdrop:'static',
		  	});

		  	$('#cabecera').html('EDITAR EMPLEADO');
		  	$("#nuevoEmpleado").css('visibility','hidden');
		  	$("#actualizarEmpleado").css('visibility','visible');
			$("#lbl_usuario").css('visibility','hidden');
			$("#lbl_pass").css('visibility','hidden');
			$("#param_usuario").css('visibility','hidden');
			$("#param_clave").css('visibility','hidden');


		  	//console.log(respuesta);
			objeto=JSON.parse(respuesta);
			$("#param_id").val(objeto[0]);
			$("#param_nombres").val(objeto[1]);
			$("#param_paterno").val(objeto[2]);
			$("#param_materno").val(objeto[3]);
			$("#param_dni").val(objeto[4]);
			$("#param_direccion").val(objeto[5]);
			$("#param_celular").val(objeto[6]);




		},
		error: function(data){
			
		}
	});
}

function eliminar(id){	
	
	var param_opcion = 'eliminarEmpresa';
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

function limpiarDatos()
{
	$("#param_id").val('');
	$("#param_razonSocial").val('');
	$("#param_ruc").val('');
	$("#param_direccion").val('');
	$("#param_aComercial").val('');

	$('#cabecera').html('NUEVO EMPRESA');
  	$("#nuevaEmpresa").css('visibility','visible');
  	$("#actualizarEmpresa").css('visibility','hidden');
}