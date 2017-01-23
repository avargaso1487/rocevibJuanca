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
				echo $this->nuevoUsuario2();
				break;

			case "nuevoHuesped";
				echo $this->nuevoUsuario3();
				break;

			case "nuevaEmpresa";
				echo $this->nuevaEmpresa();
				break;



			case "editarEmpleado"; //Mostrar los datos del Empleado al editar
				echo $this->editarEmpleado();
				break;
			case "actualizarUsuario"; //Actualizar los datos 
				echo $this->actualizarUsuario();
				break;
			case "eliminarUsuario";
				echo $this->eliminarUsuario();
				break;
			case "eliminarEmpresa";
				echo $this->eliminarEmpresa();
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
			case "listarEmpresas";
				echo $this->listarEmpresas();
				break;


			//Mostrar
			case "mostrarDetalle";
				echo $this->mostrarDetalle();
				break;

			case "mostrarHuespedes";
				echo $this->mostrarHuespedes();
				break;
			case "mostrarServicios";
				echo $this->mostrarServicios();
				break;

			case "comboEmpresa";
				echo $this->comboEmpresa();
				break;

			case "numero_registro";
				echo $this->numero_registro();
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
		//echo $consultaSql;		
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

    function prepararRegistroEmpresa($opcion) 
	{

		$consultaSql = "call sp_gestionar_empresa(";
		$consultaSql.="'".$opcion."',";
		$consultaSql.="'".$this->param['param_razonSocial']."',";
		$consultaSql.="'".$this->param['param_ruc']."',";
		$consultaSql.="'".$this->param['param_direccion']."',";
		$consultaSql.="'".$this->param['param_aComercial']."',";
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


    function nuevoUsuario2() {
		$this->prepararRegistroUsuario('opc_nuevoUsuario2');
		echo 1;
    }

    function nuevoUsuario3() {
		$this->prepararRegistroUsuario('opc_nuevoUsuario3');
		echo 1;
    }

    function nuevaEmpresa() {
		$this->prepararRegistroEmpresa('opc_nuevaEmpresa');
		echo 1;
    }

	function editarEmpleado() {
		$this->prepararConsultaUsuario('opc_empleado_buscar');
		 while ($row = mysqli_fetch_row($this->result)) {
                        echo json_encode($row);
        	}
		
    }

    function actualizarUsuario() {
		$this->prepararRegistroUsuario('opc_usuario_actualizar');
    }

    function eliminarUsuario() {
		$this->prepararRegistroUsuario('opc_usuario_eliminar');
		echo 1;
    }

    function eliminarEmpresa() {
		$this->prepararRegistroEmpresa('opc_empresa_eliminar');
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
					<td style="font-size: 12px; height: 10px; width: 5%;">'.$row[0].'</td>					
					<td style="font-size: 12px; height: 10px; width: 15%;">'.$row[1].'</td>					
					<td style="font-size: 12px; height: 10px; width: 20%;">'.$row[2].'</td>
					<td style="font-size: 12px; height: 10px; width: 20%;">'.$row[3].'</td>
					<td style="font-size: 12px; height: 10px; width: 5%;">'.$row[4].'</td>
					<td style="font-size: 12px; height: 10px; width: 20%;">'.$row[5].'</td>
					<td syle="height: 10px; width: 15%;">
					<a class="btn btn-link btn-xs col-md-offset-4"><span class="glyphicon glyphicon-pencil" title="Editar" onclick="editarh('.$row[0].');" /></span></a>
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


	function listarEmpresas() {
    	$this->prepararConsultaUsuario('opc_empresas_listar');    	
    	while($row = mysqli_fetch_row($this->result)){
			echo '<tr>					
					<td style="font-size: 12px; height: 10px; width: 10%;">'.$row[0].'</td>					
					<td style="font-size: 12px; height: 10px; width: 30%;">'.$row[1].'</td>
					<td style="font-size: 12px; height: 10px; width: 10%;">'.$row[2].'</td>
					<td style="font-size: 12px; height: 10px; width: 30%;">'.$row[3].'</td>
					<td style="font-size: 12px; height: 10px; width: 10%;">'.$row[4].'</td>

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








	function prepararConsultasMostrar($opcion) 
	{
		$consultaSql = "call sp_mostrar(";
		$consultaSql.="'".$opcion."',";
		$consultaSql.="'".$this->param['param_id2']."',";
		$consultaSql.="'".$this->param['param_usuUsuario']."',";
		$consultaSql.="'".$this->param['param_usuClave']."')";
		//echo $consultaSql;		
		$this->result = mysqli_query($this->conexion,$consultaSql);
    }

	function mostrarUsuario() {
    	$this->prepararEditarUsuario('opc_usuario_mostrar');    	
    	$row = mysqli_fetch_row($this->result);
		echo json_encode($row);
		
	}

	function mostrarHuespedes() {
        $this->prepararConsultasMostrar('opc_mostrar_huespedes');
        $this->cerrarAbrir();            
        while($row = mysqli_fetch_row($this->result)){                              
            echo '<tr>
                <td style="font-size: 12px; height: 10px; width: 15%;">'.$row[0].'</td> 
                <td style="font-size: 12px; height: 10px; width: 85%;">'.$row[1].'</td>';                     
        }
    }


	function mostrarServicios() {
        $this->prepararConsultasMostrar('opc_mostrar_servicios');
        $this->cerrarAbrir();            
        while($row = mysqli_fetch_row($this->result)){                              
            echo '<tr>
                <td style="font-size: 12px; height: 10px; width: 15%;">'.$row[0].'</td>
                <td style="font-size: 12px; height: 10px; width: 65%;">'.$row[1].'</td> 
                <td style="font-size: 12px; height: 10px; width: 15%;">'.$row[2].'</td>';                     
        }
    }

	function numero_registro() {
            $this->prepararConsultasMostrar('opc_reg_respuesta');
            $respuesta = $this->ejecutarConsultaRespuesta();
            echo $respuesta;
        }










	function comboEmpresa()
    {
            $this->prepararConsultaUsuario('opc_combo_empresa');
            $this->cerrarAbrir();
            $datos = $this->getArrayEmpresa();
            echo    '<div class="input-group col-md-8">                        
                        <select class="form-control" name="param_empresa" id="param_empresa">
                            <option value=""  disabled selected style="display: none;">Seleccionar empresa</option>';
            for($i=0; $i<count($datos); $i++)
            {
                     echo "<option value='".utf8_decode($datos[$i]["idEmpresa"])."'>".($datos[$i]["razonSocial"])."</option>";
            }
                 echo '</select>
                    </div>';
        
    }   

    private function getArrayEmpresa()
    {
        $datos = array();
        while($fila = mysqli_fetch_array($this->result))
        {
            array_push($datos, array(
                "idEmpresa" => $fila["idEmpresa"],
                "razonSocial" => $fila["razonSocial"]));
        }
        return $datos;
    }










}

 ?>

