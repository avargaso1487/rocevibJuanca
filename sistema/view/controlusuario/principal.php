<?php 
    session_start();
    if (!isset($_SESSION['usuario']))
    {
        header("Location:view/controlusuario/login.php");
    } 
    else 
    {
        date_default_timezone_set('America/Lima');
?>
<!DOCTYPE html>
<html lang = "en">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta charset="utf-8">
    <link rel="shortcut icon" href="../../../assets/ico/favicon.png">
    <title>ROCEVIB HOTEL</title>
    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">

  <link rel="stylesheet" href="../default/assets/css/bootstrap.min.css" />
  <link rel="stylesheet" href="../default/assets/font-awesome/4.2.0/css/font-awesome.min.css" />
  
  <link rel="stylesheet" href="../default/assets/fonts/fonts.googleapis.com.css" />
  <link rel="stylesheet" href="../default/assets/css/ace.min.css" class="ace-main-stylesheet" id="main-ace-style" />
    
  <link rel="stylesheet" href="../default/css/home.css" />

  <script src="../default/assets/js/ace-extra.min.js"></script>

  </head>
  <body class="no-skin" >
    <?php 
    require('../sup_layout.php');
     ?>

    <div class="main-container" id="main-container">
      <script type="text/javascript">
        try{ace.settings.check('main-container' , 'fixed')}catch(e){}
      </script>

      <div id="sidebar" class="sidebar                  responsive">
        <script type="text/javascript">
          try{ace.settings.check('sidebar' , 'fixed')}catch(e){}
        </script>              

        <!--Inicia la parte modificable-->

        <ul class="nav nav-list" id="permisos">                  
    
        </ul><!-- /.nav-list -->      

        <div class="sidebar-toggle sidebar-collapse" id="sidebar-collapse">
          <i class="ace-icon fa fa-angle-double-left" data-icon1="ace-icon fa fa-angle-double-left" data-icon2="ace-icon fa fa-angle-double-right"></i>
        </div>
        
        <script type="text/javascript">
          try{ace.settings.check('sidebar' , 'collapsed')}catch(e){}
        </script>
      </div>

      <div class="main-content">
        <div class="main-content-inner">
          <div class="breadcrumbs" id="breadcrumbs">
            <script type="text/javascript">
              try{ace.settings.check('breadcrumbs' , 'fixed')}catch(e){}
            </script>

            <ul class="breadcrumb">
              <li>
                <i class="ace-icon fa fa-home home-icon"></i>
                <a href="../bienvenido.php">Home</a>
              </li>
              
            </ul><!-- /.breadcrumb -->          
          </div>

          <div class="page-content">
            

            <div class="page-header">
              <h1>
                BIENVENIDO(A) A LA PLATAFORMA DE <b>HOTEL ROCEVIB</b>
              </h1>
            </div><!-- /.page-header -->
                        
            <!--<div id="logocentral">
              <img src="../../image/logo2.png" alt="">
            </div>-->
                  
                <!-- PAGE CONTENT ENDS -->
              </div><!-- /.col -->
            </div><!-- /.row -->
          </div><!-- /.page-content -->
        </div>
        <input type="hidden" dissabled="true" value="" id="NombreGrupo">
              <input type="hidden" dissabled="true" value="" id="NombreTarea">     
      </div><!-- /.main-content -->

      <div class="footer">
        <div class="footer-inner">
          <div class="footer-content">
            <span class="bigger-120">
              <strong>Copyright &copy; 2016 <a >Hotel ROCEVIB - Trujillo</a>.</strong> All rights reserved.
            </span>

            &nbsp;
            <span class="action-buttons">             
              <a href="../https://www.facebook.com/bse.com.pe/?fref=ts">
                <i class="ace-icon fa fa-facebook-square text-primary bigger-150"></i>
              </a>            
            </span>
          </div>
        </div>
      </div>

      <a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse">
        <i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i>
      </a>
    </div><!-- /.main-container -->

    <!-- basic scripts -->

    <!--[if !IE]> -->
    <script src="../default/assets/js/jquery.2.1.1.min.js"></script>

    <!-- <![endif]-->

    <!--[if IE]>
<script src="../assets/js/jquery.1.11.1.min.js"></script>
<![endif]-->

    <!--[if !IE]> -->
    <script type="text/javascript">
      window.jQuery || document.write("<script src='../default/assets/js/jquery.min.js'>"+"<"+"/script>");
    </script>

    <!-- <![endif]-->

    <!--[if IE]>
<script type="text/javascript">
 window.jQuery || document.write("<script src='../assets/js/jquery1x.min.js'>"+"<"+"/script>");
</script>
<![endif]-->
    <script type="text/javascript">
      if('ontouchstart' in document.documentElement) document.write("<script src='../default/assets/js/jquery.mobile.custom.min.js'>"+"<"+"/script>");
    </script>
    <script src="../default/assets/js/bootstrap.min.js"></script>

    <!-- page specific plugin scripts -->

    <!--[if lte IE 8]>
      <script src="../assets/js/excanvas.min.js"></script>
    <![endif]-->
    <script src="../default/assets/js/jquery-ui.custom.min.js"></script>
    <script src="../default/assets/js/jquery.ui.touch-punch.min.js"></script>
    <script src="../default/assets/js/jquery.easypiechart.min.js"></script>
    <script src="../default/assets/js/jquery.sparkline.min.js"></script>
    <script src="../default/assets/js/jquery.flot.min.js"></script>
    <script src="../default/assets/js/jquery.flot.pie.min.js"></script>
    <script src="../default/assets/js/jquery.flot.resize.min.js"></script>

    <!-- ace scripts -->
    <script src="../default/assets/js/ace-elements.min.js"></script>
    <script src="../default/assets/js/ace.min.js"></script>
    <script src="../default/js/menu.js"></script>
    <!-- inline scripts related to this page -->
   
  </body>
</html>
<?php } ?>
