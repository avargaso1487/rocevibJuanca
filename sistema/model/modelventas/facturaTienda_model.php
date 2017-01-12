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
                echo $this->listar();
                break;
            case 'listarClientes':
                echo $this->listarClientes();
                break;
            case 'listarProductos':
                echo $this->listarProductos();
                break;
            case 'registrar':
                echo $this->registroFactura();
                break;
            case "listarDetalle":
                echo $this->listarDetalle();
                break;
            case "get":break;
        }
    }

    function registroFactura() {
            $this->prepararConsultaFactura('opc_grabar');
            
            for($i=0; $i<count($this->param['param_numeroDetalleFactura']); $i++) {                        
                $producto                   = $this->param['param_codProducto'][$i];
                $cantidad                 = $this->param['param_cantidad'][$i];
                $precios                    = $this->param['param_precio'][$i];
                $iva                        = $this->param['param_iva'][$i];
                $descuento                  = $this->param['param_descuentoD'][$i];
                $importe                    = $this->param['param_importe'][$i];
                $almacen                    = $this->param['param_almacen'][$i];
                $this->prepararConsultaDetalleFactura('opc_grabar_detalle_factura', $producto, $cantidad, $precios, $iva,$descuento, $importe,$almacen);
            }
        }
    function prepararConsultaDetalleFactura($opcion, $producto, $cantidad, $precios, $iva,$descuento, $importe,$almacen) {
            $consultaSql = "call sp_controlDetalleFactura(";
            $consultaSql.="'".$opcion . "',";
            $consultaSql.= "'".$producto."',";
            $consultaSql.= "'".$cantidad."',";
            $consultaSql.= "'".$precios."',";
            $consultaSql.= "'".$iva."',";
            $consultaSql.= "'".$descuento."',";
            $consultaSql.= "'".$importe."',";
            $consultaSql.= "'".$almacen."')";
            //echo $consultaSql;
            $this->result = mysqli_query($this->conexion,$consultaSql);    
        }


    private function getArrayFactura() {
        $datos = array();
        while ($fila = mysqli_fetch_array($this->result)) {
            array_push($datos, array(
                "persona" => $fila["persona"],
                "FAC_habitacion" => $fila["FAC_habitacion"],
                "FAC_num" => $fila["FAC_num"],
                "FAC_Total" => $fila["FAC_Total"],
                "FAC_fechaEntrada" => $fila["FAC_fechaEntrada"],
                "FAC_fechaSalida" => $fila["FAC_fechaSalida"]
                
                ));
        }
        return $datos;
    }

    private function getArrayDetalleFactura() {
        $datos = array();
        while ($fila = mysqli_fetch_array($this->result)) {
            array_push($datos, array(
                
                "idRegDetalle" => $fila["idRegDetalle"],
                "descripcion" => $fila["descripcion"],
                "tarifa" => $fila["tarifa"]
                
                ));
        }
        return $datos;
    }
    
    
    function prepararConsultaFactura($opcion = '') {
        $consultaSql = "call sp_controlFactura(";
        $consultaSql.="'" . $opcion . "',";
        $consultaSql.=$this->param['param_numero'] . ",";
            $consultaSql.=$this->param['param_nroFactura'] . ",";
            $consultaSql.="'".$this->param['param_fecha'] . "',";
            $consultaSql.="'".$this->param['param_nroSerie'] . "',";
            $consultaSql.="'".$this->param['param_tipo'] . "',";
            $consultaSql.=$this->param['param_totalBI'] . ",";
            $consultaSql.=$this->param['param_descuento'] . ",";
            $consultaSql.=$this->param['param_montoDescuento'] . ",";
            $consultaSql.=$this->param['param_descuentoPP'] . ",";
            $consultaSql.=$this->param['param_montodescuentoPP'] . ",";
            $consultaSql.=$this->param['param_total'] . ",";
           
            $consultaSql.=$this->param['param_neto'] . ",";
            $consultaSql.=$this->param['param_personaID'] . ",";
            $consultaSql.=$this->param['param_codigoCliente'] . ")";
        
        //echo $consultaSql;
        $this->result = mysqli_query($this->conexion,$consultaSql);
    }
    
    

    function listar() {

                    $datos =array();
            
                    $this->cerrarAbrir();
                    $this->prepararConsultaFactura('opc_listar');
                    $datos = $this->getArrayFactura();
                    
                    for($i=0; $i<count($datos); $i++)
            {
                     

                
                echo "<tr>  
                    <td style='text-align: center; font-size: 11px; height: 10px; '>".($datos[$i]["FAC_num"])."</td>                                
                    <td style='text-align: center; font-size: 11px; height: 10px; '>".($datos[$i]["persona"])."</td>
                    <td style='text-align: center; font-size: 11px; height: 10px; '>".($datos[$i]["FAC_habitacion"])."</td>
                    <td style='text-align: center; font-size: 11px; height: 10px; '>".($datos[$i]["FAC_fechaEntrada"])."</td>      
                    <td style='text-align: center; font-size: 11px; height: 10px; '>".($datos[$i]["FAC_fechaSalida"])."</td>                                
                    <td style='text-align: center; font-size: 11px; height: 10px; '>".($datos[$i]["FAC_Total"])."</td>                    
                    
                    <td style='text-align: center' class='hidden-sm hidden-xs action-buttons'>
                    <a class='blue' >
                    <i  class='ace-icon fa fa-search bigger-130' onclick='listarDetalleFactura(".$datos[$i]["FAC_num"].")' href='#'' type='button' data-toggle='modal' data-target='#modalEditarArti' value='Editar'></i>  
                    </a>
                    ";
                        
                echo "</tr>";
            }
            // }else{
            //         echo '{total:' . $total . ',datos:' . json_encode($datos) . '}';
            // }
            
    }

    function listarClientes() {

                    $datos =array();
            
                    $this->cerrarAbrir();
                    $this->prepararConsultaFactura('opc_listarClientes');
                    $datos = $this->getArrayCliente();
                    
                    for($i=0; $i<count($datos); $i++)
            {
                     

                
                echo "<tr>                                  
                    <td style='text-align: center; font-size: 11px; height: 10px; '>".($datos[$i]["clienteID"])."</td>
                    <td style='text-align: center; font-size: 11px; height: 10px; '>".($datos[$i]["cliente"])."</td>                    
                    ";
                        
                echo "</tr>";
            }
            // }else{
            //         echo '{total:' . $total . ',datos:' . json_encode($datos) . '}';
            // }
            
    }
    

    private function getArrayCliente() {
        $datos = array();
        while ($fila = mysqli_fetch_array($this->result)) {
            array_push($datos, array(
                "clienteID" => $fila["clienteID"],
                "cliente" => $fila["cliente"]
                
                ));
        }
        return $datos;
    }

        function listarProductos() {

                    $datos =array();
            
                    $this->cerrarAbrir();
                    $this->prepararConsultaFactura('opc_listarProductos');
                    $datos = $this->getArrayProducto();
                    
                    for($i=0; $i<count($datos); $i++)
            {
                     

                
                echo "<tr>                                  
                    <td style='text-align: center; font-size: 11px; height: 10px; '>".($datos[$i]["idServicio"])."</td>
                    <td style='text-align: center; font-size: 11px; height: 10px; '>".($datos[$i]["descripcion"])."</td>
                    
                    <td style='text-align: center; font-size: 11px; height: 10px; '>".($datos[$i]["tarifa"])."</td>
                    ";

                    //<td style='text-align: center; font-size: 11px; height: 10px; '>".($datos[$i]["ART_stockActual"])."</td>
                    //<td style='text-align: center; font-size: 11px; height: 10px; '>".($datos[$i]["ART_stockMinimo"])."</td>
                    //<td style='text-align: center; font-size: 11px; height: 10px; '>".($datos[$i]["ART_IVA"])."</td> 
                    //<td style='text-align: center; font-size: 11px; height: 10px; '>".($datos[$i]["ALMA_id"])."</td>                   
                    
                        
                echo "</tr>";
            }
            // }else{
            //         echo '{total:' . $total . ',datos:' . json_encode($datos) . '}';
            // }
            
    }
    

    private function getArrayProducto() {
        $datos = array();
        while ($fila = mysqli_fetch_array($this->result)) {
            array_push($datos, array(
                "idServicio" => $fila["idServicio"],
                "descripcion" => $fila["descripcion"],
                //"ALMA_id" => $fila["ALMA_id"],
                "tarifa" => $fila["tarifa"],
                ));
        }
        return $datos;
    }

     function grabar() {
        $this->prepararConsultaFactura('opc_grabar');
        if($this->result)
        header("Location:../../view/articulo.php");
        //echo '{"success":true,"message":{"reason": "Grabado Correctamente"}}';
    }


    function actualizar() {
        $this->prepararConsultaFactura('opc_actualizar');
        if($this->result)
        header("Location:../../view/articulo.php");
    }
    



    function eliminar() {
        $this->prepararConsultaFactura('opc_eliminar');
        $this->cerrarAbrir();
        echo 1;
    }

    function listarDetalle()
    {
        $datos =array();
        $this->prepararConsultaFactura('opc_buscar');
        $datos = $this->getArrayDetalleFactura();
        for($i=0; $i<count($datos); $i++)
            {
                     

                
                echo "<tr>                                  
                    <td style='text-align: center; font-size: 11px; height: 10px; '>".($datos[$i]["idRegDetalle"])."</td>
                    <td style='text-align: center; font-size: 11px; height: 10px; '>".($datos[$i]["descripcion"])."</td>
                    <td style='text-align: center; font-size: 11px; height: 10px; '>".($datos[$i]["tarifa"])."</td>                    
                    ";
                        
                echo "</tr>";
            }                  
        
    }

    
}

?>