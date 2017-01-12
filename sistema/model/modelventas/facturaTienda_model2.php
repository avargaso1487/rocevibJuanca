<?php 
    include_once '../../model/conexion_model.php';
    class Facturas_Model {

    private $param = array();
    private $conexion = null;
    private $result = null;

    function __construct() {
        $this->conexion = Conexion_Model::getConexion();
    }
    function cerrarAbrir()
    {
        mysqli_close($this->conexion);
        $this->conexion = Conexion_Model::getConexion();
    }

        function gestionar($param) {
            $this->param = $param;
            switch ($this->param['param_opcion']) {               
                case "listar":
                echo $this->listarm();
                break;
                   
                case "get":break; 
            }
        }

        function prepararConsultaFactura($opcion='') {
            $consultaSql = "call sp_controlFactura(";
            $consultaSql.="'".$opcion . "',";
            $consultaSql.=$this->param['param_numero'] . ",";
            $consultaSql.=$this->param['param_nroPropio'] . ",";
            $consultaSql.="'".$this->param['param_fecha'] . "',";
            $consultaSql.=$this->param['param_serie'] . ",";
            $consultaSql.="'".$this->param['param_tipo'] . "',";
            $consultaSql.=$this->param['param_totalBI'] . ",";
            $consultaSql.=$this->param['param_descuento'] . ",";
            $consultaSql.=$this->param['param_montoDescuento'] . ",";
            $consultaSql.=$this->param['param_descuentoPP'] . ",";
            $consultaSql.=$this->param['param_montodescuentoPP'] . ",";
            $consultaSql.=$this->param['param_total'] . ",";
            $consultaSql.=$this->param['param_igv'] . ",";
            $consultaSql.=$this->param['param_neto'] . ",";
            $consultaSql.=$this->param['param_personaID'] . ")";

            echo $consultaSql;
            $this->result = mysqli_query($this->conexion,$consultaSql);    
        }

        private function getArrayFactura() {
        $datos = array();
        while ($fila = mysqli_fetch_array($this->result)) {
            array_push($datos, array(
                "persona" => $fila["persona"],
                "FAC_nroPropio" => $fila["FAC_nroPropio"],
                "FAC_totalBI" => $fila["FAC_totalBI"],
                "FAC_montoDescuento" => $fila["FAC_montoDescuento"],
                "FAC_Total" => $fila["FAC_Total"],
                "FAC_igv" => $fila["FAC_igv"],
                "FAC_neto" => $fila["FAC_neto"]
                               
                ));
        }
        return $datos;
    }

        function listar() {
            
                    $datos =array();
            
                    $this->cerrarAbrir();
                    $this->prepararConsultaFactura('opc_listar');
                    $datos = $this->getArrayFacturas();
                    
                    for($i=0; $i<count($datos); $i++)
            {
                     

                echo "<tr>                                  
                    <td style='text-align: center; font-size: 11px; height: 10px; '>".($datos[$i]["persona"])."</td>
                    <td style='text-align: center; font-size: 11px; height: 10px; '>".($datos[$i]["FAC_nroPropio"])."</td>                    
                    <td style='text-align: center; font-size: 11px; height: 10px; '>".($datos[$i]["FAC_totalBI"])."</td>                    
                    <td style='text-align: center; font-size: 11px; height: 10px; '>".($datos[$i]["FAC_montoDescuento"])."</td>
                    <td style='text-align: center; font-size: 11px; height: 10px; '>".($datos[$i]["FAC_Total"])."</td>                    
                    <td style='text-align: center; font-size: 11px; height: 10px; '>".($datos[$i]["FAC_igv"])."</td>                    
                    <td style='text-align: center; font-size: 11px; height: 10px; '>".($datos[$i]["FAC_neto"])."</td>                    
                    
                    <td style='text-align: center' class='hidden-sm hidden-xs action-buttons'>
                    <a class='blue' >
                    <i  class='ace-icon fa fa-search bigger-130' onclick='mostrarArticulo(".$datos[$i]["FAC_nroPropio"].")' href='#'' type='button' data-toggle='modal' data-target='#modalEditarArti' value='Editar'></i>  
                    </a>
                    <a class='green' href='#'>
                    <i  class='ace-icon fa fa-pencil bigger-130' onclick='editarArticulo(".$datos[$i]["FAC_nroPropio"].")' href='#'' type='button' data-toggle='modal' data-target='#modalEditarArti' value='Eliminar'></i>
                    ";
                        
                echo "</tr>";
            }

    }
}

?>