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
		echo '<div class="user-panel">
            <div class="pull-left image">
              <img src="../../assets/dist/img/user1-160x160.jpg" class="img-circle" alt="User Image">
            </div>
            <div class="pull-left info">
              <p>'; echo $_SESSION['usuarioNombre'].' '.$_SESSION['usuarioApPaterno']; echo '</p>
              <a href="#"><i class="fa fa-circle text-success"></i> En línea</a>
            </div>
          </div>

          <!-- /.search form -->
          <!-- sidebar menu: : style can be found in sidebar.less -->
          <ul class="sidebar-menu">
            <li class="header">MENU</li>
            ';

		$padre=0;
		$vinculo=0;
		$estado=0;		
        for($i=0; $i<count($datos);$i++)
        {
        	$padre= $datos[$i]['idParent'];
        	if($padre==0 && $datos[$i]['est']==0)
        	{
        		$vinculo=$datos[$i]['id'];
        		echo '
        			<li class="treeview active">
              		<a href="#">                	
                	<span>'.$datos[$i]['text'].'</span>
                	<i class="fa fa-angle-left pull-right"></i>
              					</a>
              					<ul class="treeview-menu">';
                $datos[$i]['est']=1;
                for($j=0; $j<count($datos);$j++)
                {
                	$padrej =$datos[$j]['idParent'];
                	if($padrej!=0 && $datos[$j]['est']==0)
                	{
                		if($datos[$j]['idParent']==$vinculo)
                		{
                			echo '
                				<li>
                				<a href="'.$datos[$j]['url'].'"><i class="fa fa-circle-o"></i> '.$datos[$j]['text'].'</a></li>
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























