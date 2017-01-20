<?php 
  session_start();
  if (isset($_SESSION['usuario']))
  {
    header("Location:principal.php");
  } else {
?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>ROCEVIB | Iniciar Sesión</title>
    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <!-- Bootstrap 3.3.5 -->
    <link rel="stylesheet" href="../../assets_login/bootstrap/css/bootstrap.min.css">
    <!-- Theme style -->
    <link rel="stylesheet" href="../../assets_login/dist/css/AdminLTE.min.css">
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body class="hold-transition login-page">
    <div class="login-box">
      <div class="login-logo">
        <b>ROCEVIB</b> HOTEL
      </div><!-- /.login-logo -->
      <div class="login-box-body">
        <p class="login-box-msg">Inicia sesión para ingresar</p>
        <form action="../../controller/controlusuario/usuario.php" method="post">
          <div class="form-group has-feedback">
            <input type="text" name="param_usuUsuario" class="form-control" placeholder="Usuario">
            <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
          </div>
          <div class="form-group has-feedback">
            <input type="password" name="param_usuClave" class="form-control" placeholder="Contraseña">
            <span class="glyphicon glyphicon-lock form-control-feedback"></span>
          </div>
          <div class="row">
            <div class="col-xs-8">
            </div><!-- /.col -->
            <div class="col-xs-4">
              <input type="hidden" value="login" name="param_opcion">
              <input type="submit" value="Ingresar" class="btn btn-primary btn-block btn-flat">
            </div><!-- /.col -->
          </div>
        </form>              

      </div><!-- /.login-box-body -->
    </div><!-- /.login-box -->    
  </body>
</html>
<?php } ?>