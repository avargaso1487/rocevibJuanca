window.onload = function(){
	mostrarDatosTabla();
	mostrarMenu();	
	cargarClientes();
	$('#dataTables-example').DataTable(); //SIEMPREEEEEEEEEE
	cargarEspecie();
};


function mostrarDatosTabla(){
	var param_opcion = "mostrar";
	$.ajax({
		type: 'POST',
		data: 'param_opcion='+param_opcion,
		url:"../../controller/controlmascota/mascota_controller.php",
		success: function(respuesta)
		{
			$('#dataTables-example').DataTable().destroy();
			$('#cuerpoTabla').html(respuesta);
			$('#dataTables-example').DataTable();
		},
		error: function(respuesta)
		{
			alert("ERROR AL MOSTRAR DATOS");
		}
	});
};

function limpiar()
{
	$('#exito').hide();
	$('#error').hide();	
	
	$('#param_mascotaCliente').parent().parent().attr("class", "input-group col-md-12");
	$('#param_mascotaNombre').parent().parent().attr("class", "form-group col-md-7");
	$('#param_mascotaHC').parent().parent().attr("class", "form-group col-md-5");	
	$('#param_mascotaRaza').parent().parent().attr("class", "input-group col-md-12");	
	$('#param_mascotaSexo').parent().parent().attr("class", "form-group col-md-5");	

	document.getElementById('param_mascotaCodigo').value = "";
	document.getElementById('param_mascotaCliente').value = "";
	document.getElementById('param_mascotaNombre').value = "";
	document.getElementById('param_mascotaHC').value = "";
	document.getElementById('param_mascotaEspecie').value = "";
	document.getElementById('param_mascotaRaza').value = "";
	document.getElementById('param_mascotaCaracter').value = "";
	document.getElementById('param_mascotaSexo').value = "";
	document.getElementById('param_mascotaPelo').value = "";
	document.getElementById('param_mascotaCapa').value = "";
	document.getElementById('param_mascotaDieta').value = "";
	document.getElementById('param_mascotaHabitat').value = "";
	document.getElementById('param_mascotaOjos').value = "";	
	document.getElementById('param_mascotaAltura').value = "";	
	document.getElementById('param_mascotaNacimiento').value = "";	
	document.getElementById('param_mascotaRegistro').value = "";	
	document.getElementById('param_mascotaEliminacion').value = "";	
	document.getElementById('param_mascotaObservaciones').value = "";	
}

function deshabilitar(estado)
{		
	if (estado==false)
	{
		document.getElementById('cancelar').style.display = 'inline';		
	}
	else
	{
		document.getElementById('cancelar').style.display = 'none';		
	}
	
	document.getElementById('param_mascotaCodigo').disabled = estado;
	document.getElementById('param_mascotaCliente').disabled = estado;
	document.getElementById('param_mascotaNombre').disabled = estado;	
	document.getElementById('param_mascotaEspecie').disabled = estado	
	document.getElementById('param_mascotaRaza').disabled = estado;
	document.getElementById('param_mascotaCaracter').disabled = estado;
	document.getElementById('param_mascotaSexo').disabled = estado;
	document.getElementById('param_mascotaPelo').disabled = estado;
	document.getElementById('param_mascotaCapa').disabled = estado;
	document.getElementById('param_mascotaDieta').disabled = estado;
	document.getElementById('param_mascotaHabitat').disabled = estado;
	document.getElementById('param_mascotaOjos').disabled = estado;
	document.getElementById('param_mascotaAltura').disabled = estado;
	document.getElementById('param_mascotaNacimiento').disabled = estado;	
	document.getElementById('param_mascotaObservaciones').disabled = estado;
}

function obtenerDatosDetalle(codigo)
{
	var param_opcion = "mostrarDetalle";
	$.ajax({
		type: 'POST',
		data: 'param_opcion='+param_opcion+'&param_mascotaCodigo='+codigo,
		url:"../../controller/controlmascota/mascota_controller.php",		
		success: function(datos)
		{			
			objeto = JSON.parse(datos);
						
			document.getElementById('param_mascotaCodigo').value = objeto[0];
			document.getElementById('param_mascotaCliente').value = (objeto[1]);
			document.getElementById('param_mascotaNombre').value = objeto[2];
			document.getElementById('param_mascotaHC').value = objeto[3];
			document.getElementById('param_mascotaEspecie').value = objeto[4];			

			cargarRaza();

			document.getElementById('param_mascotaRaza').value = objeto[5];
			document.getElementById('param_mascotaCaracter').value = objeto[6];
			document.getElementById('param_mascotaSexo').value = objeto[7];
			document.getElementById('param_mascotaPelo').value = objeto[8];
			document.getElementById('param_mascotaCapa').value = objeto[9];
			document.getElementById('param_mascotaDieta').value = objeto[10];
			document.getElementById('param_mascotaHabitat').value = objeto[11];
			document.getElementById('param_mascotaOjos').value = objeto[12];
			document.getElementById('param_mascotaAltura').value = objeto[13];
			document.getElementById('param_mascotaNacimiento').value = objeto[14];
			document.getElementById('param_mascotaRegistro').value = objeto[15];		
			document.getElementById('param_mascotaEliminacion').value = objeto[16];		
			document.getElementById('param_mascotaObservaciones').value = objeto[17];
		},
		error: function(data)
		{
			alert('ERROR AL OBTENER LOS DATOS');
		}
	});
}


function mostrarDetalle(codigo)
{	
	limpiar();
	obtenerDatosDetalle(codigo);		
	document.getElementById('eliminacion').style.display = 'inline';
	document.getElementById('registro').style.display = 'inline';
	document.getElementById('editarMascota').style.display = 'none';
	document.getElementById('guardarMascota').style.display = 'none';
	deshabilitar(true);
}

function editarDetalle(codigo)
{
	limpiar();
	obtenerDatosDetalle(codigo);		
	document.getElementById('eliminacion').style.display = 'none';
	document.getElementById('registro').style.display = 'none';
	document.getElementById('editarMascota').style.display = 'inline';
	document.getElementById('guardarMascota').style.display = 'none';
	deshabilitar(false);
}


function eliminar(codigo, valor)
{	
	var param_opcion = "eliminar";		
	$.ajax({
		type:'POST',
		data:'param_opcion='+param_opcion+'&param_mascotaCodigo='+codigo+'&param_mascotaEstado='+valor,
		url:"../../controller/controlmascota/mascota_controller.php",
		success: function(respuesta)
		{						
			mostrarDatosTabla();
		},
		error: function(respuesta)
		{
			alert("ERROR AL ELIMINAR EL REGISTRO");
		}
	});
}


function nuevo()
{
	limpiar();
	deshabilitar(false);			
	document.getElementById('eliminacion').style.display = 'none';
	document.getElementById('registro').style.display = 'none';
	document.getElementById('guardarMascota').style.display = 'inline';
	document.getElementById('editarMascota').style.display = 'none';
}


function guardar()
{
	var param_opcion = 'grabar';
	var v1=0; v2=0; v3=0; v4=0; v5=0;

	v1 = validacion('param_mascotaCliente');
	v2 = validacion('param_mascotaNombre');	
	v4 = validacion('param_mascotaRaza');
	v5 = validacion('param_mascotaSexo');	

	if(v1===false||v2===false||v3===false||v4===false||v5===false)
	{		
		$('#exito').hide();
		$('#error').html('<strong>Adventencia: </strong>Los campos resaltados deben ser llenados de forma obligatoria.').show(500).delay(8500).hide(500);
	}
	else
	{
		$.ajax({
			type: 'POST',
			data: $('#form_mascota').serialize()+'&param_opcion='+param_opcion,
			url:"../../controller/controlmascota/mascota_controller.php",
			success: function(data)
			{				
				$("#error").hide();
                $("#exito").html('<p>Los datos de la mascota han sido registrados de forma exitosa.</p>').show(500).delay(8500).hide(500);
                mostrarDatosTabla();
			}
		});
	}
}	


function editar()
{
	var param_opcion = 'editar';
	var v1=0; v2=0; v3=0; v4=0; v5=0;

	v1 = validacion('param_mascotaCliente');
	v2 = validacion('param_mascotaNombre');	
	v4 = validacion('param_mascotaRaza');
	v5 = validacion('param_mascotaSexo');	


	if(v1===false||v2===false||v3===false||v4===false||v5===false)
	{		
		$('#exito').hide();
		$('#error').html('<strong>Adventencia: </strong>Los campos resaltados deben ser llenados de forma obligatoria.').show(500).delay(8500).hide(500);
	}
	else
	{
		$.ajax({
			type: 'POST',
			data: $('#form_mascota').serialize()+'&param_opcion='+param_opcion,
			url:"../../controller/controlmascota/mascota_controller.php",
			success: function(data)
			{				
				$("#error").hide();
                $("#exito").html('<p>Los datos de la mascota han sido actualizados de forma exitosa.</p>').show(500).delay(8500).hide(500);
                mostrarDatosTabla();
			}
		});
	}
}	


function validacion(campo)
{
	var a=0;
	if(campo === 'param_mascotaCliente')
	{
		codigo = document.getElementById(campo).value;
		if(codigo ==null || codigo.length ==0)
		{						
			$('#'+campo).parent().parent().attr("class", "input-group col-md-12 has-error");            
            return false;
		}
		else 
		{			
			$('#'+campo).parent().parent().attr("class", "input-group col-md-12 has-success");            
			return true;
		}
	}


	if(campo === 'param_mascotaNombre')
	{
		codigo = document.getElementById(campo).value;
		if(codigo ==null || codigo.length ==0)
		{						
			$('#'+campo).parent().parent().attr("class", "form-group col-md-7 has-error");            
            return false;
		}
		else 
		{						
			$('#'+campo).parent().parent().attr("class", "form-group col-md-7 has-success");            
			return true;
		}
	}


	if(campo === 'param_mascotaRaza')
	{
		codigo = document.getElementById(campo).value;
		if(codigo ==null || codigo.length ==0)
		{			
			
			$('#'+campo).parent().parent().attr("class", "input-group col-md-12 has-error");            
            return false;
		}
		else 
		{						
			$('#'+campo).parent().parent().attr("class", "input-group col-md-12 has-success");            
			return true;
		}
	}


	if(campo === 'param_mascotaSexo')
	{
		codigo = document.getElementById(campo).value;
		if(codigo ==null || codigo.length ==0)
		{						
			$('#'+campo).parent().parent().attr("class", "form-group col-md-5 has-error");            
            return false;
		}
		else 
		{						
			$('#'+campo).parent().parent().attr("class", "form-group col-md-5 has-success");            
			return true;
		}
	}		
}


function cargarClientes()
{
	var param_opcion = "comboCliente";
	$.ajax({
		type:'POST',
		data:'param_opcion='+param_opcion,
		url:"../../controller/controlmascota/mascota_controller.php",
		success:function(respuesta)
		{			
			$('#cliente').html(respuesta);
		},
		error: function(respuesta)
		{
			alert("ERROR AL MOSTRAR DATOS");
		}
	});
}

function cargarEspecie()
{
	var param_opcion = "comboEspecie";
	$.ajax({
		type:'POST',
		data:'param_opcion='+param_opcion,
		url:"../../controller/controlmascota/mascota_controller.php",
		success:function(respuesta)
		{			
			$('#especie').html(respuesta);
		},
		error: function(respuesta)
		{
			alert("ERROR AL MOSTRAR DATOS");
		}
	});
}

function cargarRaza()
{
	var especie = document.getElementById('param_mascotaEspecie').value;
	var param_opcion = "comboRaza";
	$.ajax({
		type:'POST',
		data:'param_opcion='+param_opcion+'&param_mascotaEspecie='+especie,
		url:"../../controller/controlmascota/mascota_controller.php",
		success:function(respuesta)
		{			
			$('#raza').html(respuesta);
		},
		error: function(respuesta)
		{
			alert("ERROR AL MOSTRAR DATOS");
		}
	});	
}


function mostrarMenu()
{    
    var grupo = document.getElementById('NombreGrupo').value;
    var tarea = document.getElementById('NombreTarea').value;
    //alert(grupo);
    $.ajax({
        type:'POST',
        data: 'opcion=mostrarMenu&grupo='+grupo+'&tarea='+tarea,        
        url: "../../controller/controlusuario/usuario.php",
        success:function(data){                              
            $('#permisos').html(data);                
        }
    });
    //alert("kjb");
}