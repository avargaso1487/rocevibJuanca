<?php 

include_once '../../model/controlusuario/conexion_model.php';

class Usuario_model{

	private $param = array();
	private $conexion = null;
	private $result = null;

	function __construct()
	{
		$this->conexion = Conexion_Model::getConexion();
	}

	function cerrarAbrir()
	{
        mysqli_close($this->conexion);
        $this->conexion = Conexion_Model::getConexion();
	}

	function gestionar($param)
	{
		$this->param = $param;		
		switch($this->param['param_opcion'])
		{
			case "login";
				echo $this->login();
				break;
			case "new_usuario";
				echo $this->new_usuario();
				break;
			case "listarUsuario";
				echo $this->listarUsuario();
				break;


		//Funciones Registro
			case "nuevoEmpleado";
				echo $this->nuevoEmpleado();
				break;

			case "nuevoUsuario";
				echo $this->nuevoUsuario();
				break;



			case "editarEmpleado";
				echo $this->editarEmpleado();
				break;
			case "eliminarUsuario";
				echo $this->eliminarUsuario();
				break;

		//Funciones Listar
			case "listarHuespedes";
				echo $this->listarHuespedes();
				break;
			case "listarHabitaciones";
				echo $this->listarHabitaciones();
				break;
			case "listarAmbientes";
				echo $this->listarAmbientes();
				break;
			case "listarRegistro";
				echo $this->listarRegistro();
				break;
			case "mostrarDetalle";
				echo $this->mostrarDetalle();
				break;
		}
	}

	function ejecutarConsultaRespuesta() {
        $respuesta = '';
        while ($fila = mysqli_fetch_array($this->result)) {
            $respuesta = $fila['respuesta'];
        }
        return $respuesta;
    }

    function prepararConsultaUsuario($opcion) 
	{
		$consultaSql = "call sp_control_usuario(";
		$consultaSql.="'".$opcion."',";
		$consultaSql.="'".$this->param['param_id2']."',";
		$consultaSql.="'".$this->param['param_usuUsuario']."',";
		$consultaSql.="'".$this->param['param_usuClave']."')";
		echo $consultaSql;		
		$this->result = mysqli_query($this->conexion,$consultaSql);
    }

    function prepararEditarUsuario($opcion) 
	{
		$consultaSql = "call sp_mostrar_usuario(";
		$consultaSql.="'".$opcion."',";
		$consultaSql.="".$this->param['param_id'].")";
		//echo $consultaSql;		
		$this->result = mysqli_query($this->conexion,$consultaSql);
    }

     function prepararRegistroUsuario($opcion) 
	{

		$consultaSql = "call sp_gestionar_usuario(";
		$consultaSql.="'".$opcion."',";
		$consultaSql.="'".$this->param['param_nombres']."',";
		$consultaSql.="'".$this->param['param_paterno']."',";
		$consultaSql.="'".$this->param['param_materno']."',";
		$consultaSql.="'".$this->param['param_dni']."',";
		$consultaSql.="'".$this->param['param_direccion']."',";
		$consultaSql.="'".$this->param['param_celular']."',";
		$consultaSql.="'".$this->param['param_usuario']."',";
		$consultaSql.="'".$this->param['param_clave']."',";
		$consultaSql.="'".$this->param['param_empresa']."',";
		$consultaSql.="'".$this->param['param_id2']."')";
		//echo $consultaSql;
		$this->result = mysqli_query($this->conexion,$consultaSql);

    }


	function login() 
	{
        $this->prepararConsultaUsuario('opc_login_respuesta');
        $respuesta = $this->ejecutarConsultaRespuesta();
        //echo $respuesta;
        if($respuesta == '1')
        {        	
        	$this->cerrarAbrir();
        	$this->prepararConsultaUsuario('opc_login_listar');        	
        	while($fila = mysqli_fetch_array($this->result))
        	{
				$_SESSION['idusuario'] = $fila['idusuario'];
				$_SESSION['usuario']   = $fila['usuario'];
				$_SESSION['usuarioNombre'] = $fila['nombres'];
				$_SESSION['usuarioApPaterno'] = $fila['appaterno'];
        	}
        	header("Location:../../view/controlusuario/principal.php");
        }
        else
        {	 
        	//header("Location:../../view/controlusuario/login.php");
        	?>


        	<script language="javascript">
        	alert("Usuario o clave incorrecta");
        	window.location.href='../../view/controlusuario/login.php';
        	</script>';

        	<?php
    	}
    }

 function new_usuario() {
        $this->prepararRegistroUsuario('opc_usuario_respuesta');
        $respuesta = $this->ejecutarConsultaRespuesta();
        //echo $respuesta;
        if($respuesta == '1') {        	
        	echo 1;
        } else {	
        	$this->cerrarAbrir();
        	$this->prepararRegistroUsuario('opc_usuario_registrar');
        	echo 0;
        	//header("Location:../../view/controlusuario/login.php");
    	}
    }


    function nuevoEmpleado() {
		$this->prepararRegistroUsuario('opc_nuevoEmpleado');
		echo 1;
    }

    function nuevoUsuario() {
		$this->prepararRegistroUsuario('opc_usuario_registrar2');
		echo 1;
    }



	function editarEmpleado() {
		$this->prepararConsultaUsuario('opc_empleado_buscar');
		$row = mysqli_fetch_row($this->result);
		echo $row;
		
    }

    function eliminarUsuario() {
		$this->prepararRegistroUsuario('opc_usuario_eliminar');
		echo 1;
    }

	function listarUsuario() {
    	$this->prepararConsultaUsuario('opc_usuario_listar');    	
    	while($row = mysqli_fetch_row($this->result)){
			echo '<tr>					
					<td style="font-size: 12px; height: 10px; width: 5%;">'.$row[0].'</td>					
					<td style="font-size: 12px; height: 10px; width: 25%;">'.$row[1].'</td>
					<td style="font-size: 12px; height: 10px; width: 25%;">'.$row[2].'</td>
					<td style="font-size: 12px; height: 10px; width: 25%;">'.$row[3].'</td>
					<td syle="text-align: center; height: 10px; width: 7%;">
					<a class="btn btn-link btn-xs col-md-offset-4"><span class="glyphicon glyphicon-pencil" title="Editar" onclick="editar('.$row[0].');" /></span></a>
								
					</td>
					<td syle="height: 10px; width: 7%;">
						<a id="eliminar_usuario" class="btn btn-link btn-xs col-md-offset-4"><span class="glyphicon glyphicon-remove-circle" title="Eliminar" onclick="eliminar('.$row[0].');"/></span></a>				
					</td>					
				</tr>';
		}
	}

	function listarHuespedes() {
    	$this->prepararConsultaUsuario('opc_huesped_listar');    	
    	while($row = mysqli_fetch_row($this->result)){
			echo '<tr>					
					<td style="font-size: 12px; height: 10px; width: 4%;">'.$row[0].'</td>					
					<td style="font-size: 12px; height: 10px; width: 20%;">'.$row[1].'</td>
					<td style="font-size: 12px; height: 10px; width: 15%;">'.$row[2].'</td>
					<td style="font-size: 12px; height: 10px; width: 15%;">'.$row[3].'</td>
					<td syle="height: 10px; width: 5%;">
					<a class="btn btn-link btn-xs col-md-offset-4"><span class="glyphicon glyphicon-pencil" title="Editar" onclick="editarh('.$row[0].');" /></span></a>
								
					</td>
					<td syle="height: 10px; width: 5%;">
						<a id="eliminar_usuario" class="btn btn-link btn-xs col-md-offset-4"><span class="glyphicon glyphicon-remove-circle" title="Eliminar" onclick="eliminarh('.$row[0].');"/></span></a>				
					</td>					
				</tr>';
		}
	}

	function listarHabitaciones() {
    	$this->prepararConsultaUsuario('opc_habitaciones_listar');    	
    	while($row = mysqli_fetch_row($this->result)){
			echo '<tr>					
					<td style="font-size: 12px; height: 10px; width: 10%;">'.$row[0].'</td>					
					<td style="font-size: 12px; height: 10px; width: 50%;">'.$row[1].'</td>
					<td style="font-size: 12px; height: 10px; width: 20%;">'.$row[2].'</td>
					<td syle="height: 10px; width: 10%;">
					<a class="btn btn-link btn-xs col-md-offset-4"><span class="glyphicon glyphicon-pencil" title="Editar" onclick="editar('.$row[0].');" /></span></a>
								
					</td>
					<td syle="height: 10px; width: 10%;">
						<a id="eliminar_usuario" class="btn btn-link btn-xs col-md-offset-4"><span class="glyphicon glyphicon-remove-circle" title="Eliminar" onclick="eliminar('.$row[0].');"/></span></a>				
					</td>					
				</tr>';
		}
	}


	function listarAmbientes() {
    	$this->prepararConsultaUsuario('opc_ambientes_listar');    	
    	while($row = mysqli_fetch_row($this->result)){
			echo '<tr>					
					<td style="font-size: 12px; height: 10px; width: 4%;">'.$row[0].'</td>					
					<td style="font-size: 12px; height: 10px; width: 20%;">'.$row[1].'</td>
					<td style="font-size: 12px; height: 10px; width: 15%;">'.$row[2].'</td>

					<td syle="height: 10px; width: 5%;">
					<a class="btn btn-link btn-xs col-md-offset-4"><span class="glyphicon glyphicon-pencil" title="Editar" onclick="editar('.$row[0].');" /></span></a>
								
					</td>
					<td syle="height: 10px; width: 5%;">
						<a id="eliminar_usuario" class="btn btn-link btn-xs col-md-offset-4"><span class="glyphicon glyphicon-remove-circle" title="Eliminar" onclick="eliminar('.$row[0].');"/></span></a>				
					</td>					
				</tr>';
		}
	}

	function listarRegistro() {
    	$this->prepararConsultaUsuario('opc_registro_listar');    	
    	while($row = mysqli_fetch_row($this->result)){
			echo '<tr>					
					<td style="font-size: 12px; height: 10px; width: 10%;">'.$row[0].'</td>					
					<td style="font-size: 12px; height: 10px; width: 40%;">'.$row[1].'</td>
					<td style="font-size: 12px; height: 10px; width: 15%;">'.$row[2].'</td>
					<td style="font-size: 12px; height: 10px; width: 15%;">'.$row[3].'</td>
					<td style="font-size: 12px; height: 10px; width: 10%;">'.$row[4].'</td>

					<td syle="height: 10px; width: 10%;">
						<a id="eliminar_usuario" class="btn btn-link btn-xs col-md-offset-4"><span class="glyphicon glyphicon-file" title="Eliminar" onclick="mostrarDetalle('.$row[0].');"/></span></a>				
					</td>					
				</tr>';
		}
	}


	function mostrarDetalle() {
    	$this->prepararConsultaUsuario('opc_registroDetalle_listar');    	
    	while($row = mysqli_fetch_row($this->result)){
			echo '<tr>					
					<td style="font-size: 12px; height: 10px; width: 10%;">'.$row[0].'</td>					
					<td style="font-size: 12px; height: 10px; width: 40%;">'.$row[1].'</td>
					<td style="font-size: 12px; height: 10px; width: 15%;">'.$row[2].'</td>
					<td style="font-size: 12px; height: 10px; width: 15%;">'.$row[3].'</td>				
				</tr>';
		}
	}


	function mostrarUsuario() {
    	$this->prepararEditarUsuario('opc_usuario_mostrar');    	
    	$row = mysqli_fetch_row($this->result);
		echo json_encode($row);
		
	}   

}

 ?>

