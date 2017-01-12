<?php
session_start();
include_once '../../model/modelventas/facturaTienda_model.php';


$param = array();
$param['param_opcion'] = '';

$param['param_numero'] =0; 
$param['param_nroPropio'] =0; 
$param['param_fecha'] =''; 
$param['param_serie'] =0; 
$param['param_tipo'] =''; 
$param['param_totalBI'] =0; 
$param['param_descuento'] =0; 
$param['param_montoDescuento'] =0; 
$param['param_descuentoPP'] =0; 
$param['param_montodescuentoPP'] =0; 
$param['param_total'] =0; 
$param['param_igv'] =0;
$param['param_neto'] =0;
$param['param_personaID'] =0;

if (isset($_POST['param_opcion'])) {
    $param['param_opcion'] = $_POST['param_opcion'];
}

if (isset($_POST['param_numero'])) {
    $param['param_numero'] = $_POST['param_numero'];
}

if (isset($_POST['param_nroPropio'])) {
    $param['param_nroPropio'] = $_POST['param_nroPropio'];
}

if (isset($_POST['param_fecha'])) {
    $param['param_fecha'] = $_POST['param_fecha'];
}

if (isset($_POST['param_serie'])) {
    $param['param_serie'] = $_POST['param_serie'];
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

if (isset($_POST['param_descuentoPP'])) {
    $param['param_descuentoPP'] = $_POST['param_descuentoPP'];
}

if (isset($_POST['param_montodescuentoPP'])) {
    $param['param_montodescuentoPP'] = $_POST['param_montodescuentoPP'];
}

if (isset($_POST['param_total'])) {
    $param['param_total'] = $_POST['param_total'];
}

if (isset($_POST['param_igv'])) {
    $param['param_igv'] = $_POST['param_igv'];
}

if (isset($_POST['param_neto'])) {
    $param['param_neto'] = $_POST['param_neto'];
}

if (isset($_POST['param_personaID'])) {
    $param['param_personaID'] = $_POST['param_personaID'];
}


$Facturas = new Facturas_Model();
echo $Facturas->gestionar($param);

?>
