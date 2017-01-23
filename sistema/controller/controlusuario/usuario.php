<?php 
session_start();
include_once '../../model/controlusuario/usuario_model.php';

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
$param['param_idtipo'] = 1;
$param['param_empresa']=null;
$param['param_razonSocial']='';
$param['param_aComercial']='';
$param['param_ruc']='';
$param['param_direccionLegal']='';

$param['param_id']='';
$param['param_id2']='';


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

if (isset($_POST['idtipo']))
    $param['param_idtipo'] = $_POST['param_idtipo'];

if (isset($_POST['param_empresa']))
    $param['param_empresa'] = $_POST['param_empresa'];

if (isset($_POST['id']))
    $param['param_id'] = $_POST['id'];

if (isset($_POST['param_id']))
    $param['param_id2'] = $_POST['param_id'];

if (isset($_POST['id']))
    $param['param_id2'] = $_POST['id'];

if (isset($_POST['param_razonSocial']))
    $param['param_razonSocial'] = $_POST['param_razonSocial'];

if (isset($_POST['param_aComercial']))
    $param['param_aComercial'] = $_POST['param_aComercial'];

if (isset($_POST['param_direccionLegal']))
    $param['param_direccionLegal'] = $_POST['param_direccionLegal'];

if (isset($_POST['param_ruc']))
    $param['param_ruc'] = $_POST['param_ruc'];



$Usuario = new Usuario_model();
echo $Usuario->gestionar($param);


 ?>