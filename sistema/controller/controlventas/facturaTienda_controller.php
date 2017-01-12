<?php
session_start();
include_once '../../model/modelventas/facturaTienda_model.php';


$param = array();
$param['param_opcion'] = '';

$param['param_numero'] =0; 
$param['param_nroFactura'] =0; 
$param['param_fecha'] =''; 
$param['param_nroSerie'] =''; 
$param['param_tipo'] =''; 
$param['param_totalBI'] =0; 
$param['param_descuento'] =0; 
$param['param_montoDescuento'] =0; 
$param['param_descuentoPP'] =0; 
$param['param_montodescuentoPP'] =0; 
$param['param_total'] =0; 

$param['param_neto'] =0;
$param['param_codigoCliente'] =0;
$param['param_personaID'] =0;

$param['param_numeroDetalleFactura'] ='';
$param['param_precio'] =0;
$param['param_cantidad'] =0;
$param['param_codProducto'] =0;
$param['param_descuentoD'] =0;
$param['param_importe'] =0;
$param['param_iva'] =0;
$param['param_almacen'] =0;

if (isset($_SESSION['personaID'])) {
    $param['param_personaID'] = $_SESSION['personaID'];
}

if (isset($_POST['param_opcion'])) {
    $param['param_opcion'] = $_POST['param_opcion'];
}

if (isset($_POST['param_numero'])) {
    $param['param_numero'] = $_POST['param_numero'];
}

if (isset($_POST['param_nroFactura'])) {
    $param['param_nroFactura'] = $_POST['param_nroFactura'];
}

if (isset($_POST['param_fecha'])) {
    $param['param_fecha'] = $_POST['param_fecha'];
}

if (isset($_POST['param_nroSerie'])) {
    $param['param_nroSerie'] = $_POST['param_nroSerie'];
}

if (isset($_POST['param_tipo'])) {
    $param['param_tipo'] = $_POST['param_tipo'];
}

if (isset($_POST['param_totalBI'])) {
    $param['param_totalBI'] = $_POST['param_totalBI'];
}

if (isset($_POST['param_descuento'])) {
    $param['param_descuento'] = $_POST['param_descuento'];
}

if (isset($_POST['param_montodescuento'])) {
    $param['param_montodescuento'] = $_POST['param_montodescuento'];
}


if (isset($_POST['param_total'])) {
    $param['param_total'] = $_POST['param_total'];
}


if (isset($_POST['param_neto'])) {
    $param['param_neto'] = $_POST['param_neto'];
}

if (isset($_POST['param_codigoCliente'])) {
    $param['param_codigoCliente'] = $_POST['param_codigoCliente'];
}




if (isset($_POST["param_numeroDetalleFactura"])) {
    $param['param_numeroDetalleFactura'] = explode(",",$_POST['param_numeroDetalleFactura']);
}

if (isset($_POST['param_precio'])) {
    $param['param_precio'] = explode(",",$_POST['param_precio']);
}

if (isset($_POST['param_cantidad'])) {
    $param['param_cantidad'] = explode(",",$_POST['param_cantidad']);
}

if (isset($_POST['param_codProducto'])) {
    $param['param_codProducto'] = explode(",",$_POST['param_codProducto']);
}

if (isset($_POST['param_descuentoD'])) {
    $param['param_descuentoD'] = explode(",",$_POST['param_descuentoD']);
}

if (isset($_POST['param_importe'])) {
    $param['param_importe'] = explode(",",$_POST['param_importe']);
}
if (isset($_POST['param_iva'])) {
    $param['param_iva'] = explode(",",$_POST['param_iva']);
}
if (isset($_POST['param_almacen'])) {
    $param['param_almacen'] = explode(",",$_POST['param_almacen']);
}

$Facturas = new Facturas_Model();
echo $Facturas->gestionar($param);

?>
