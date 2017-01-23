window.onload = function(){
	//comboEvento();
	mostrarMenu();
	$('#example').DataTable();
	mostrarDatos();	
}

$(function() {
	$('#nuevaEmpresa').on('click', function(){
		//alert('HOLA Xd');

		var razonSocial= $('#param_razonSocial').val();
		var direccion= $('#param_direccionLegal').val();
		var ruc= $('#param_ruc').val();
		var aComercial= $('#param_aComercial').val();

		//$('#param_id').val(idecito);
		//alert(idecito);
		//alert(nombres+paterno+materno+dni+direccion+celular+usuario+clave);
      
		if (razonSocial.length==0 || direccion.length==0 || ruc.length==0) 
		{           
        	$("#mensajeEmpresa").html('<p class="alert alert-danger text-center"> Ingrese todos los datos necesarios.</p>').show(100).delay(1500).hide(100);
        } else {

        	$.ajax({
		        type: 'POST',        
		        data: $('#frm_empresa').serialize()+'&param_opcion=nuevaEmpresa',
		        url: '../../controller/controlusuario/usuario.php',
		        success: function(data){
		            $("#mensajeEmpresa").html('<p class="alert alert-success text-center">Registro Correcto</p>').show(100).delay(1500).hide(100);
		                        //window.location = "../index.php";
		            $('#param_opcion').val('nuevoEmpresa');
		            $('#param_razonSocial').val('');
		            $('#param_direccionLegal').val('');
		            $('#param_ruc').val('');
		            $('#param_aComercial').val('');

					setTimeout(function () {$("#modal-form-empresa").modal("hide");},1000)        

		        },
		        error: function(data){
		                   
		        } 
			});
        }
		
	});

});

$(function() {
	
	//MODA NUEVO HUESPED
	$('#nuevoHuesped').on('click', function(){
		//alert('HOLA Xd');

		var id = $('#param_id2').val();
		var nombres = $('#param_nombres').val();
		var paterno = $('#param_paterno').val();
		var materno = $('#param_materno').val();
		var dni = $('#param_dni').val();
		var direccion = $('#param_direccion').val();
		var celular = $('#param_celular').val();

		var empresa = $('#param_empresa').val();

		//$('#param_id').val(idecito);
		//alert(idecito);
		//alert(nombres+paterno+materno+dni+direccion+celular+usuario+clave);
      
		if (dni.length == 0 || paterno.length == 0 || materno.length == 0 || nombres.length == 0) 
		{           
        	$("#mensajeHuesped").html('<p class="alert alert-danger text-center"> Ingrese todos los datos necesarios.</p>').show(100).delay(1500).hide(100);
        } else {

        	$.ajax({
		        type: 'POST',        
		        data: $('#frm_huesped').serialize()+'&param_opcion=nuevoHuesped',
		        url: '../../controller/controlusuario/usuario.php',
		        success: function(data){
		            $("#mensajeHuesped").html('<p class="alert alert-success text-center">Registro Correcto</p>').show(100).delay(1500).hide(100);
		                        //window.location = "../index.php";
		            $('#param_opcion').val('nuevoHuesped');
		            $("#param_nombres").val('');					
					$("#param_paterno").val('');
					$("#param_materno").val('');
					$("#param_dni").val('');
					$("#param_direccion").val('');
					$("#param_celular").val('');
					$("#param_empresa").val('');
					setTimeout(function () {$("#modal-form-huesped").modal("hide");},1000)      

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
		data:{param_opcion: 'listarRegistro'},
		url: '../../controller/controlusuario/usuario.php',
		success: function(respuesta){
			$('#reg').DataTable().destroy();
			$('#cuerpoReg').html(respuesta);
			$('#reg').DataTable();
		},
		error: function(respuesta){
			$('#cuerpoReg').html(respuesta);
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

function mostrarDetalle(id){
	var param_opcion = 'mostrarDetalle';
	$.ajax({
		type: 'POST',
		data:'param_opcion='+param_opcion+'&id='+id,
		url: '../../controller/controlusuario/usuario.php',
		success: function(respuesta){
			$('#regDetalle').DataTable().destroy();
			$('#cuerpoRegDetalle').html(respuesta);
			$('#regDetalle').DataTable();
		},
		error: function(respuesta){
			$('#cuerpoRegDetalle').html(respuesta);
		}
	});	
}


function comboEmpresa(){ 	
    var param_opcion = 'comboEmpresa'; 
    $.ajax({
        type: 'POST',        
        data:'param_opcion='+param_opcion,
        url: '../../controller/controlUsuario/usuario.php',
        success: function(data){
            $('#param_empresa').html(data);         

        },
        error: function(data){
                   
        }
    });    
}


function limpiarHuesped()
{
	comboEmpresa();
	$("#param_id").val('');
	$("#param_nombres").val('');
	$("#param_paterno").val('');
	$("#param_materno").val('');
	$("#param_dni").val('');
	$("#param_direccion").val('');
	$("#param_celular").val('');
}

function limpiarEmpresa()
{
	$("#param_id").val('');
	$("#param_razonSocial").val('');
	$("#param_ruc").val('');
	$("#param_direccion").val('');
	$("#param_aComercial").val('');
  	$("#nuevaEmpresa").css('visibility','visible');
}