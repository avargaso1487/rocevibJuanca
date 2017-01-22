<?php 
  include('../facturacion/parametros_factura.php');
  session_start();

  if (isset($_GET['serie']))
    $param_serie = $_GET['serie'];
    else $param_serie = '0001';

  if (isset($_GET['nro']))
    $param_nro = $_GET['nro'];
    else $param_nro = getNumero();

  if (isset($_GET['fechaEntrada']))
    $param_fechaEntrada = $_GET['fechaEntrada'];
    else $param_fechaEntrada = '';

  if (isset($_GET['fechaSalida']))
    $param_fechaSalida = $_GET['fechaSalida'];
    else $param_fechaSalida = '';
    //
    if (isset($_GET['codigoCliente']))
        $param_codigoCliente = $_GET['codigoCliente'];
    else $param_codigoCliente = '';

    if (isset($_GET['nombreCliente']))
        $param_nombreCliente = $_GET['nombreCliente'];
    else $param_nombreCliente = '';

    if (isset($_GET['facturacionGeneral']))
        $param_facturacionGeneral = $_GET['facturacionGeneral'];
    else $param_facturacionGeneral = '0';


  if (!isset($_SESSION['usuario']))
  {
    header("Location:view/controlusuario/login.php");
  } else {
?>
<!DOCTYPE html>
<html>
  <head>
       <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="shortcut icon" href="../../../assets/ico/favicon.png">
    <title>ROCEVIB HOTEL</title>

    <script src="../../assets/plugins/jQuery/jQuery-2.1.4.min.js"></script>

    <script src="../../js/treemodulo.js"></script>

 <script src="../default/assets/js/ace-extra.min.js"></script>
    
    <script src="../../js/listar_registro.js"></script>



    <!-- Bootstrap 3.3.5 -->

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
    <!-- Ionicons -->
    <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
    <!-- Theme style -->
    <link rel="stylesheet" href="../../assets/dist/css/AdminLTE.min.css">
    <!-- AdminLTE Skins. Choose a skin from the css/skins
         folder instead of downloading all of them to reduce the load. -->





    <link rel="stylesheet" href="../../assets/dist/css/skins/_all-skins.min.css">
    <!-- iCheck -->
    <link rel="stylesheet" href="../../assets/plugins/iCheck/flat/blue.css">
    <!-- Morris chart -->
    <link rel="stylesheet" href="../../assets/plugins/morris/morris.css">
    <!-- jvectormap -->
    <link rel="stylesheet" href="../../assets/plugins/jvectormap/jquery-jvectormap-1.2.2.css">

    <!-- Daterange picker -->
    <link rel="stylesheet" href="../../assets/plugins/daterangepicker/daterangepicker-bs3.css">
    <!-- bootstrap wysihtml5 - text editor -->
    <link rel="stylesheet" href="../../assets/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css">






 <link rel="stylesheet" href="../../assets/dist/css/skins/_all-skins.min.css">
    <!-- iCheck -->
    <link rel="stylesheet" href="../../assets/plugins/iCheck/flat/blue.css">
    <!-- Morris chart -->
    <link rel="stylesheet" href="../../assets/plugins/morris/morris.css">
    <!-- jvectormap -->
    <link rel="stylesheet" href="../../assets/plugins/jvectormap/jquery-jvectormap-1.2.2.css">
    <!-- Date Picker -->
    <link rel="stylesheet" href="../../assets/plugins/datepicker/datepicker3.css">
    <!-- Daterange picker -->
    <link rel="stylesheet" href="../../assets/plugins/daterangepicker/daterangepicker-bs3.css">
    <!-- bootstrap wysihtml5 - text editor -->
    <link rel="stylesheet" href="../../assets/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css">













  <link rel="stylesheet" href="../default/assets/css/bootstrap.min.css" />
  <link rel="stylesheet" href="../default/assets/font-awesome/4.2.0/css/font-awesome.min.css" />
  
  <link rel="stylesheet" href="../default/assets/fonts/fonts.googleapis.com.css" />
  <link rel="stylesheet" href="../default/assets/css/ace.min.css" class="ace-main-stylesheet" id="main-ace-style" />

  <link rel="stylesheet" href="../default/assets/css/ace.min.css" class="ace-main-stylesheet" id="main-ace-style" />
    

 







  </head>
  <body class="hold-transition skin-blue sidebar-mini">
    <div class="wrapper">

      <header class="main-header">
        <!-- Logo -->
        <a href="../controlusuario/principal.php" class="logo">
          <!-- mini logo for sidebar mini 50x50 pixels -->
          <span class="logo-mini"><b>R</b></span>
          <!-- logo for regular state and mobile devices -->
          <span class="logo-lg"><b>ROCEVIB</b> HOTEL</span>
        </a>
        <!-- Header Navbar: style can be found in header.less -->
         <nav class="navbar navbar-static-top" role="navigation">
          <!-- Sidebar toggle button-->
          <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
            <span class="sr-only">Toggle navigation</span>
          </a>
          <div class="navbar-custom-menu">
            <ul class="nav navbar-nav">
              <!-- User Account: style can be found in dropdown.less -->
              <li class="dropdown user user-menu">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">                
                  <span class="hidden-xs"><?php echo $_SESSION['usuario']; ?></span>
                </a>
                <ul class="dropdown-menu">
                  <!-- User image -->
                  <li class="user-header">
                    <img src="../../assets/dist/img/user1-160x160.jpg" class="img-circle" alt="User Image">
                    <p>
                      <?php echo $_SESSION['usuarioNombre']; ?> 
                    </p>
                  </li>
                  <!-- Menu Body -->
                  <!-- Menu Footer-->
                  <li class="user-footer">
                    <div class="pull-right">
                      <a href="../../view/controlusuario/logout.php" class="btn btn-default btn-flat">Cerrar Sesión</a>
                    </div>
                  </li>
                </ul>
              </li>
              <!-- Control Sidebar Toggle Button -->
              <li>
                <a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <!-- Left side column. contains the logo and sidebar -->
      <aside class="main-sidebar">

        <!-- sidebar: style can be found in sidebar.less -->
        <section class="sidebar">            
          <div id="tree" class="sidebar-nav navbar-collapse">
            
          </div>
                  
        </section>
        <!-- /.sidebar -->
      </aside>

 <div class="content-wrapper">       
        

    <section class="content">


                <div class="main-content-inner">
          <div class="breadcrumbs" id="breadcrumbs">
            <script type="text/javascript">
              try{ace.settings.check('breadcrumbs' , 'fixed')}catch(e){}
            </script>

            <ul class="breadcrumb">
                            <li>
                                <i class="ace-icon fa fa-home home-icon"></i>
                                <a href="#">REGISTRO DE HUESPED Y HABITACION</a>
                            </li>
                            <li><a href="../pedidos.php">Tienda</a></li>
                            <li>
                                <span class="invoice-info-label">Fecha:</span>
                                <span class="blue"><?php echo date('d-m-Y'); ?></span>
                            </li>                            
                            
                        </ul><!-- /.breadcrumb -->        
          </div>

          <div class="page-content">          
            <div class="page-header">
              <h1>
                REGISTRO
              </h1>
            </div><!-- /.page-header -->
            <div class="row">
              <div class="col-md-12">
              
                
                            <form role="form" id="frmRegistroFacturas" class="form-horizontal">
                            <div class="row">           
                            <input class="form-control" id="param_facturacionGeneral" name="param_facturacionGeneral" type="hidden" disabled type="text" value="<?= $param_facturacionGeneral ?>">
                                <div class="form-group">                                  
                                   <label for="socio" class="col-md-2 control-label col-md-offset-1">N° Documento: </label>
                                   <div class="col-md-1">
                                       <input class="form-control" id="param_nroFactura" name="param_nroFactura" type="text"  onkeypress="return solonumeros(event)" disabled="disabled" value="<?= $param_nro ?>">
                                   </div>

                                   <label for="socio" class="col-md-1 control-label">Fecha de Entrada: </label>
                                   <div class="col-md-2">
                                       <input class="form-control date" id="param_fechaEntrada" name="param_fechaEntrada" type="text" autofocus="" value="<?= $param_fechaEntrada ?>">
                                   </div>

                                    <label for="socio" class="col-md-1 control-label">Fecha de Salida: </label>
                                   <div class="col-md-2">
                                       <input class="form-control date" id="param_fechaSalida" name="param_fechaSalida" type="text" autofocus="" value="<?= $param_fechaSalida ?>">
                                   </div>

                                  <!-- <label for="socio" class="col-md-1 control-label col-md-offset-1">Nro. Serie: </label>
                                   <div class="col-md-2">
                                       <input class="form-control" id="param_nroSerie" name="param_nroSerie" type="text" autofocus="" onkeypress="return solonumeros(event)" disabled="disabled" value="<?= $param_serie ?>">
                                   </div>-->
                                </div>
                                <div class="form-group">                                   
                                    <label for="" class="col-md-2 control-label col-md-offset-1">Cliente:</label>
                                      <div class="input-group col-md-6">
                                          <input class="form-control col-md-12 " type="text" name="param_cliente" id="cliente" value="<?= $param_nombreCliente ?>" placeholder="Busque cliente" disabled/>
                                          <span class="input-group-btn">
                                              <a id="buscarProveedor" class="btn btn-sm btn-default" href="#verCliente" data-toggle='modal'>
                                                  <i class="ace-icon fa fa-search bigger-110"></i>    
                                              </a>                                     
                                          </span>
                                      </div>
                                      <div class="col-md-2">
                                          <input class="form-control" type="hidden" name="param_codigoCliente" id="codigoCliente" value="<?= $param_codigoCliente ?>" />
                                      </div>
                                </div>
                                <div class="widget-header widget-header-flat col-md-8 col-md-offset-2">                                
                                        <h4 class="widget-title" style="font-size:18px;">Servicios</h4>
                                    </div><br><br><br>
                                <div class="col-md-3 col-md-offset-3">                                   
                                    <label for="">Servicio</label>
                                    <div class="input-group">
                                          <input class="form-control col-md-12 " type="text" name="param_producto" id="producto" placeholder="Seleccionar Servicio" />
                                          <span class="input-group-btn">
                                              <a id="buscarProductos" class="btn btn-sm btn-default" href="#verProducto" data-toggle='modal'>
                                                  <i class="ace-icon fa fa-search bigger-110"></i>    
                                              </a>                                     
                                          </span>
                                      </div>

                                      

                                </div>
                                <div class="col-md-1">                                   
                                    <label for="">Precio</label>
                                    <div class="input-group">
                                          <input class="form-control col-md-12 " type="text" name="param_precio" id="precio" value="0" onkeypress="return solonumeros(event)"/>                                         
                                      </div>                                                                      
                                </div>
                               ¿
                                <div class="col-md-1">                                   
                                    <label for="">.</label>
                                    <div class="input-group">
                                          <button disabled type="button" class="btn btn-success btn-lg ace-icon fa fa-plus" id="addRow">
                                          </button>                                         
                                      </div>                                                                      
                                </div>
                                <div class="col-md-1">                                                                      
                                    <div class="input-group">
                                    
                                          <input class="form-control col-md-12 " type="hidden" name="param_codProducto" id="codigoProducto"/>                                         
                                      </div>                                                                      
                                </div>                                
                                <br><br><br><br>
                                
                                <div class="col-md-10 col-md-offset-1">
                                  <div class="table-header">
                      Lista de Productos a pedir.
                    </div>
                    <div>
                      <table id="tablaDetallesFactura" class="table table-striped table-bordered">
                        <thead>                     
                                <tr>
                                    <th style="text-align: center; font-size: 11px; height: 10px; width: 15%;">Código</th>
                                    <th style="text-align: center; font-size: 11px; height: 10px; width: 10%;">Descripción</th> 
                                    <th style="text-align: center; font-size: 11px; height: 10px; width: 10%;">Servicio</th>
                                    <th style="text-align: center; font-size: 11px; height: 10px; width: 10%;">Precio</th>
                                </tr>                      
                        </thead>
                        <tbody id="cuerpoDetallesFactura">                        
                        </tbody>
                      </table><br>
                    </div>
                                </div>
                              
                                <div class="col-md-12" align="center">                                   
                                    <strong style="color:red">Total Neto</strong>
                                    <div class="input-group">
                                        <input class="form-control" type="text" name="param_neto" id="param_total" style="text-align:right;" disabled value="0.00" />
                                    </div>
                                    <br><br>
                               
                                </div>
                               
                                <div class="row">
                                  <div class="col-md-12" align="center">
                                    <!--button type="button" class="btn btn-primary " id="view_articulo"><i class="ace-icon fa fa-eye bigger-110"></i>Articulo</button> 
                                    <button type="button" class="btn btn-primary offset-1" id="edit_articulo"><i class="ace-icon fa fa-pencil bigger-110"></i>Editar Articulo</button-->
                                    <button type="button" class="btn btn-primary" id="register_pedido"><i class="ace-icon fa fa-plus bigger-110"></i>Registrar</button>
                                    <button type="button" class="btn btn-primary" id="cancel_proveedor" onclick="cerrar();"><i class="ace-icon fa fa-close bigger-110"></i>Cancelar</button>            
                                  </div> 
                                  <div class="form-group">
                                
                                <div class="col-sm-1"></div>
                                
                                
                            </div>                            
                              </div><br><br><br><br><br><br>
                        </form>
                                                                    
              </div>              
                <!-- FIN DE CONTENIDO DE PAGINA -->
              <div class="modal fade" id="verCliente" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                          <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                              <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                <h4 class="modal-title text-center" id="cabeceraRegistro"><b>Clientes</b></h4>
                              </div>
                              <div class="modal-body">
                                <div class="row">
                      <div class="col-md-12">                       
                                    <form role="form" id="frmRegistroEgresados" class="form-horizontal" >
                                    <div class="row">                                       
                                        <div class="col-md-10 col-md-offset-1">
                                          <div class="table-header">
                              Lista de Clientes registrados.
                            </div>
                            <div>
                              <table id="tablaClientes" class="table table-striped table-bordered">
                                <thead>                     
                                        <tr>
                                            <th style="text-align: center; font-size: 11px; height: 10px; width: 20%;">Código</th>
                                            <th style="text-align: center; font-size: 11px; height: 10px; width: 60%;">Cliente</th>         
                                        </tr>                      
                                </thead>
                                <tbody id="cuerpoClientes">                                 
                                </tbody>
                              </table>
                            </div>
                                        </div>                                   
                                </form>
                                                                            
                      </div>              
                        <!-- FIN DE CONTENIDO DE PAGINA -->
                    </div><!-- /.col -->
                              </div>
                            </div>
                          </div>
                      </div>


            </div><!-- /.col -->
          </div>
          <div class="modal fade" id="verProducto" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                          <div class="modal-dialog" style="width:90% !important">
                            <div class="modal-content">
                              <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                <h4 class="modal-title text-center" id="cabeceraRegistro"><b>Productos</b></h4>
                              </div>
                              <div class="modal-body">
                                <div class="row">
                      <div class="col-md-12">                       
                                    <form role="form" id="frmRegistroEgresados" class="form-horizontal" >
                                    <div class="row">                                       
                                        <div class="col-md-12">
                                          <div class="table-header">
                              Lista de Productos.
                            </div>
                            <div>
                              <table id="tablaProductos" class="table table-striped table-bordered">
                                <thead>
                                        <tr>
                                            <th style="text-align: center; font-size: 11px; height: 10px; width: 20%;">Código</th>  
                                            <th style="text-align: center; font-size: 11px; height: 10px; width: 15%;">Descripción</th>
                                            
                                            <th style="text-align: center; font-size: 11px; height: 10px; width: 8%;">P.V.P</th>
                                            <!---
                                            <th style="text-align: center; font-size: 11px; height: 10px; width: 3%;">Stock(UV)</th>            
                                            <th style="text-align: center; font-size: 11px; height: 10px; width: 3%;">Stock(UC)</th>
                                       
                                       
                                            <th style="text-align: center; font-size: 11px; height: 10px; width: 5%;">IVA</th>  
                                             <th style="text-align: center; font-size: 11px; height: 10px; width: 15%;">Almacén</ -->th>                    
                                        </tr>                      
                                </thead>
                                <tbody id="cuerpoProductos">                                  
                                </tbody>
                              </table>
                            </div>
                                        </div>                                   
                                </form>
                                                                            
                      </div>              
                        <!-- FIN DE CONTENIDO DE PAGINA -->
                    </div><!-- /.col -->
                              </div>
                            </div>
                          </div>
                      </div>                      
                
        </div><!-- /.page-content -->

        
      <input type="hidden" dissabled="true" value="Ventas" id="NombreGrupo">
      <input type="hidden" dissabled="true" value="Tienda" id="NombreTarea">
        
        



















  </section>
</div>
















      <footer class="main-footer">
        <div class="pull-right hidden-xs">
          <b>Version</b> 2.3.0
        </div>
        <strong>Copyright &copy; 2016 <a >Hotel ROCEVIB - Trujillo</a>.</strong> All rights reserved.
      </footer>
    </div><!-- ./wrapper -->

    <!-- jQuery 2.1.4 -->
        <script src="../../assets/plugins/jQuery/jQuery-2.1.4.min.js"></script>
    <!-- jQuery UI 1.11.4 -->
    <script src="https://code.jquery.com/ui/1.11.4/jquery-ui.min.js"></script>
    <!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip -->
    <script>
      $.widget.bridge('uibutton', $.ui.button);
    </script>
    <!-- Bootstrap 3.3.5 -->
      <script src="../../assets/bootstrap/js/bootstrap.min.js"></script>
    <!-- Morris.js charts -->    
    <!--<script src="../../assets/plugins/morris/morris.min.js"></script>-->

    <!--Data Tables -->
    <script src="../../assets/plugins/datatables/jquery.dataTables.min.js"></script>
    <script src="../../assets/plugins/datatables/dataTables.bootstrap.min.js"></script>
        
    

    
    <script type="text/javascript">
      $(function () {
        $('#example').DataTable({
          "paging": true,
          "lengthChange": true,
          "searching": true,
          "ordering": true,
          "info": true,
          "autoWidth": true
        });
      });
    </script>
    
    <script src="../default/assets/js/jquery.2.1.1.min.js"></script>
    <script src="../default/assets/js/bootstrap.min.js"></script>
    <script src="../default/assets/js/jquery.dataTables.min.js"></script>
    <script src="../default/assets/js/jquery.dataTables.bootstrap.min.js"></script>  

    <script src="../default/js/ventaTienda.js"></script>
    
    <!-- page specific plugin scripts -->
    <!-- ace scripts -->
    <script src="../default/assets/js/ace-elements.min.js"></script>
    <script src="../default/assets/js/ace.min.js"></script>   

    <!-- Validaciones solonumeros(), telefonovalidation(), sololetras() -->
    <script type="text/javascript">        
          function solonumeros(e) {
              key = e.keyCode || e.which;
              teclado = String.fromCharCode(key);
              numeros = "0123456789";
              especiales = "8-37-38-46"
              teclado_especial=false;
              for (var i in especiales) {
                  if (key == especiales[i]) {
                      teclado_especial= true;
                  }
              }
              if (numeros.indexOf(teclado)==-1 && !teclado_especial) {
                  return false;
              }
          }

          function telefonovalidation(e) {
              var unicode = e.charCode ? e.charCode : e.keyCode            
              if (unicode != 45 && unicode != 32) {
                  if (unicode < 48 || unicode > 57) //if not a number
                  { return false } //disable key press                
              }
          }

          function soloLetras(e){
             key = e.keyCode || e.which;
             tecla = String.fromCharCode(key).toLowerCase();
             letras = " áéíóúabcdefghijklmnñopqrstuvwxyz";
             especiales = "8-37-39-46";
             tecla_especial = false
             for(var i in especiales){
                  if(key == especiales[i]){
                      tecla_especial = true;
                      break;
                  }
              }
              if(letras.indexOf(tecla)==-1 && !tecla_especial){
                  return false;
              }
          }
    </script>

  </body>
</html>

<?php } ?>





