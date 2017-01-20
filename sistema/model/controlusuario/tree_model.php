<?php 

session_start();

include_once '../../model/controlusuario/conexion_model.php';

class Tree_Model
{
	private $array = array();
	private $tree = array();

	function __construct() {
        $this->conexion = Conexion_Model::getConexion();
        $this->usuId = $_SESSION['idusuario'];
    }

    function cerrarAbrir() {
        mysql_close($this->conexion);
        $this->conexion = Conexion_Model::getConexion();
    }

	function gestionar($datos){
		$this->param = $datos;
		switch($this->param['param_opcion'])
		{
			case "listarMenu":
				echo $this->listarMenu();
				break;
		}
		mysqli_close($this->conexion);
	}

	function prepararConsultaUsuario($opcion = '') {
        $consultaSql = "call sp_control_usuario(";
        $consultaSql.="'" . $opcion . "',";
        $consultaSql.="'" . $_SESSION['idusuario'] . "',";
        $consultaSql.="'" . $_SESSION['usuario'] . "',";
        $consultaSql.="'" . $this->param['param_usuClave'] . "')";
        //echo $consultaSql;
        $this->result = mysqli_query($this->conexion,$consultaSql);
    }

	function listarMenu()
	{
		$this->prepararConsultaUsuario('opc_listar_menu');
		$total = mysqli_num_rows($this->result);

		$datos = array();
		while($fila = mysqli_fetch_array($this->result))
		{
			array_push($datos, array(
				"id" =>$fila['men_id'],
				"est"=>0,
				"idParent" =>$fila['men_idpadre'],
				"text"=>$fila['men_titulo'],
				"url"=>$fila['men_url']				
				));
		}		
//.$datos[$i]['text'].
		$padre=0;
		$vinculo=0;
		$estado=0;		
        for($i=0; $i<count($datos);$i++)
        {
        	$padre= $datos[$i]['idParent'];
        	if($padre==0 && $datos[$i]['est']==0)
        	{
        		$vinculo=$datos[$i]['id'];            
            if($datos[$i]['text'] == $this->param['grupo'])
              echo '<li class="open">';
            else
              echo '<li class="">';
        		echo '                      
                <a href="#" class="dropdown-toggle">
                  <i class="menu-icon fa fa-list-alt"></i>
                  <span class="menu-text">
                    '.$datos[$i]['text'].'
                  </span>

                <b class="arrow fa fa-angle-down"></b>
                </a>

                <b class="arrow"></b>

                <ul class="submenu">';

                $datos[$i]['est']=1;
                for($j=0; $j<count($datos);$j++)
                {
                	$padrej =$datos[$j]['idParent'];
                	if($padrej!=0 && $datos[$j]['est']==0)
                	{
                		if($datos[$j]['idParent']==$vinculo)
                		{
                      if($datos[$j]['text'] == $this->param['tarea'])
                        echo '<li class="active">';
                      else
                        echo '<li class="">';
                			echo '                				
                				<a href="'.$datos[$j]['url'].'">
                          <i class="menu-icon fa fa-caret-right"></i>
                          '.$datos[$j]['text'].'
                      </a>
                      <b class="arrow"></b>                           
                  </li>
              					';
              					$datos[$j]['est']=1;
                		}
                	}
                	
                }
                echo'</ul>';

        	}
        }
            
          echo '</ul>';
	}
}
 ?>