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
      case "mostrar";
        echo $this->mostrarUsuario();
        break;
      case "comboEmpresa";
        echo $this->comboEmpresa();
        break;
      case "nuevoUsuario";
        echo $this->nuevoUsuario();
        break;
      case "modificarUsuario";
        echo $this->modificarUsuario();
        break;
      case "eliminarUsuario";
        echo $this->eliminarUsuario();
        break;
    }
  }

  function prepararConsultaUsuario($opcion) 
  {
    $consultaSql = "call sp_control_usuario(";
    $consultaSql.="'".$opcion."',";
    $consultaSql.="'',";
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
    if ($this->param['param_institucion'] == '') {
              $universidad = 'NULL';
      } else {
        $universidad=$this->param['param_institucion'];
      }

    $consultaSql = "call sp_gestionar_usuario(";
    $consultaSql.="'".$opcion."',";
    $consultaSql.="'".$this->param['param_dni']."',";
    $consultaSql.="'".$this->param['param_paterno']."',";
    $consultaSql.="'".$this->param['param_materno']."',";
    $consultaSql.="'".$this->param['param_nombres']."',";
    $consultaSql.="'".$this->param['param_email']."',";
    $consultaSql.="'".$this->param['param_celular']."',";
    $consultaSql.="".$universidad.",";
    $consultaSql.="'".$this->param['param_otra_institucion']."',";
    $consultaSql.="'".$this->param['param_usuario']."',";
    $consultaSql.="'".$this->param['param_clave']."',";
    $consultaSql.="'".$this->param['param_evento']."',";
    $consultaSql.="'".$this->param['param_certificado']."',";
    $consultaSql.="'".$this->param['param_id2']."')";
    //echo $consultaSql;  // FALTA VER AKI EL REGISTRO PREGUNTAR A MILUSKA  
    $this->result = mysqli_query($this->conexion,$consultaSql);
    }


    function prepararConsultaCombo($opcion) {
        $consultaSql = "call sp_combos(";
        $consultaSql.="'" .$opcion. "')";     
        echo $consultaSql;
        $this->result = mysqli_query($this->conexion,$consultaSql);
    }


    function ejecutarConsultaRespuesta() {
        $respuesta = '';
        while ($fila = mysqli_fetch_array($this->result)) {
            $respuesta = $fila['respuesta'];
        }
        return $respuesta;
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
          header("Location:../../view/controlusuario/login.php");
      }
    }

    function comboEmpresa() {
        $this->prepararConsultaCombo('combo_empresa');
        $this->cerrarAbrir();
        echo '<div class="input-group">                                                                 
                        <select class="form-control" id="param_empresa" data-placeholder="Seleccione ..." name="param_empresa">
                        <option value="0" disabled selected style="display: none;">Seleccione empresa</option>';
         while ($fila = mysqli_fetch_row($this->result)) {
            echo'<option value="'.$fila[0].'">'.utf8_encode($fila[1]).'</option>';
        }
        echo '</select>
        </div>';

        $this->cerrarAbrir();
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

    function nuevoUsuario() {
    $this->prepararRegistroUsuario('opc_usuario_registrar2');
    echo 1;
    }


  function modificarUsuario() {
    $this->prepararRegistroUsuario('opc_usuario_modificar');
    echo 1;
    }

    function eliminarUsuario() {
    $this->prepararRegistroUsuario('opc_usuario_eliminar');
    echo 1;
    }

  function listarUsuario() {
      $this->prepararConsultaUsuario('opc_usuario_listar');     
      while($row = mysqli_fetch_row($this->result)){
      echo '<tr>          
          <td style="font-size: 12px; height: 10px; width: 4%;">'.$row[0].'</td>          
          <td style="font-size: 12px; height: 10px; width: 20%;">'.$row[1].'</td>
          <td style="font-size: 12px; height: 10px; width: 15%;">'.$row[2].'</td>
          <td style="font-size: 12px; height: 10px; width: 15%;">'.$row[3].'</td>
          <td style="font-size: 12px; height: 10px;">'.$row[4].'</td>
          <td style="font-size: 12px; height: 10px;">'.$row[5].'</td>
          <td syle="height: 10px; width: 5%;">
          <a class="btn btn-link btn-xs col-md-offset-4"><span class="glyphicon glyphicon-pencil" title="Editar" onclick="editar('.$row[0].');" /></span></a>
                
          </td>
          <td syle="height: 10px; width: 5%;">
            <a id="eliminar_usuario" class="btn btn-link btn-xs col-md-offset-4"><span class="glyphicon glyphicon-remove-circle" title="Eliminar" onclick="eliminar('.$row[0].');"/></span></a>       
          </td>  

          <td syle="height: 10px; width: 5%;">
            <a id="nueva_asistencia" class="btn btn-link btn-xs col-md-offset-4"><span class="glyphicon glyphicon-check" title="Asistencia" onclick="asistencia('.$row[0].');"/></span></a>       
          </td>         
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

