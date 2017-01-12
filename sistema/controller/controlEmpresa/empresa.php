<?php 
session_start();
include_once '../../model/controlEmpresa/empresa_model.php';
$param = array();
$param['param_opcion']='';
$param['param_usuId']=0;
$param['param_nombres'] = '';
$param['param_paterno'] = '';
$param['param_materno'] = '';
$param['param_dni'] = '';
$param['param_direccion'] = '';
$param['param_celular'] = '';
$param['param_usuario'] = '';
$param['param_clave'] = '';

$param['param_usuUsuario']='';
$param['param_usuClave']='';
$param['param_empresa'] = '';
$param['param_idEmpresa'] = '';


if (isset($_SESSION['usuarioId']))
    $param['param_usuId'] = $_SESSION['usuarioId'];
    
if (isset($_POST['param_opcion']))
    $param['param_opcion'] = $_POST['param_opcion'];

if (isset($_POST['param_usuId']))
    $param['param_usuId'] = $_POST['param_usuId'];

if (isset($_POST['param_usuUsuario']))
    $param['param_usuUsuario'] = $_POST['param_usuUsuario'];

if (isset($_POST['param_usuClave']))
    $param['param_usuClave'] = $_POST['param_usuClave'];


if (isset($_POST['param_dni']))
    $param['param_dni'] = $_POST['param_dni'];

if (isset($_POST['param_paterno']))
    $param['param_paterno'] = $_POST['param_paterno'];

if (isset($_POST['param_materno']))
    $param['param_materno'] = $_POST['param_materno'];

if (isset($_POST['param_nombres']))
    $param['param_nombres'] = $_POST['param_nombres'];

if (isset($_POST['param_direccion']))
    $param['param_direccion'] = $_POST['param_direccion'];

if (isset($_POST['param_celular']))
    $param['param_celular'] = $_POST['param_celular'];

if (isset($_POST['param_usuario']))
    $param['param_usuario'] = $_POST['param_usuario'];

if (isset($_POST['param_clave']))
    $param['param_clave'] = $_POST['param_clave'];  

if (isset($_POST['empresa']))
    $param['param_empresa'] = $_POST['param_empresa'];

if (isset($_POST['idEmpresa']))
    $param['param_idEmpresa'] = $_POST['param_idEmpresa'];

$Usuario = new Usuario_model();
echo $Usuario->gestionar($param);


 ?>