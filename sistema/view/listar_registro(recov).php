<?php 
  session_start();
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
    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">

    <script src="../../assets/plugins/jQuery/jQuery-2.1.4.min.js"></script>

    <script src="../../js/treemodulo.js"></script>


    
    <script src="../../js/listar_registro.js"></script>

    <!-- Bootstrap 3.3.5 -->
    <link rel="stylesheet" href="../../assets/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="../../assets/plugins/datatables/dataTables.bootstrap.css">
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
    <!-- Date Picker -->
    <link rel="stylesheet" href="../../assets/plugins/datepicker/datepicker3.css">
    <!-- Daterange picker -->
    <link rel="stylesheet" href="../../assets/plugins/daterangepicker/daterangepicker-bs3.css">
    <!-- bootstrap wysihtml5 - text editor -->
    <link rel="stylesheet" href="../../assets/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css">

          
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
        <div class='box'>
          <div id="cabecera">
              <div class="row"><br>
                <center><h1 class="box-title"><strong>LISTA DE REGISTRO</strong></h1></center><br>
              </div>
              <input type="button" id="new_usuario" class="btn btn-success letra col-md-offset-1" value="Nuevo"/>
              <div class="row">
                <div class="col-md-1"></div>
                    <div class=" col-md-10 table-responsive">
                        <table id="example" class="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th style="font-size: 12px; height: 10px; width: 4%;">ID</th>
                                    <th style="font-size: 12px; height: 10px; width: 20%;">Nombres</th> 
                                    <th style="font-size: 12px; height: 10px; width: 20%;">Apellido Paterno</th> 
                                    <th style="font-size: 12px; height: 10px; width: 20%;">Apellido Materno</th> 
                                    <th style="font-size: 12px; height: 10px; width: 20%;">Habitación</th> 
                                    <th style="font-size: 12px; height: 10px; width: 20%;">Fecha Ingreso</th> 
                                    <th style="font-size: 12px; height: 10px; width: 20%;">Fecha Salida</th> 
                                    <th style="font-size: 12px; height: 10px; width: 5%;">Editar</th>
                                    <th style="font-size: 12px; height: 10px; width: 5%;">Eliminar</th>                
                                </tr>
                            </thead>
                            
                            <tbody id="cuerpoTabla">
                            
                            </tbody><br>
                        </table>
                    </div>                                            
                <div class="col-md-1"></div>
          <div>
        </div>
          
              
          </div>           
          
              
          </div><br>
          <div class="modal fade" id="modalUsuario" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-keyboard="false" data-backdrop="static">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          
                          <h4 class="modal-title text-center letra1" id="cabeceraRegistro"><b>.:: Mantenedor Usuario ::.</b></h4>
                        </div>
                        <div class="modal-body">
                        <form action="" method="POST" class="form-horizontal" id="form_nuevoUsuario">   
                            <fieldset>
                                <div id="mensaje"></div>

                                <!--<input type="hidden" name="param_id" id="param_id"> -->

                                <div class="form-group">
                                    <label for="ruc" class="col-md-4 control-label">Nombres</label>
                                    <div class="col-md-7">
                                        <input class="form-control" type="text" id="param_nombres" name="param_nombres" placeholder="Ingrese Nombres">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="ruc" class="col-md-4 control-label">Apellido Paterno</label>
                                    <div class="col-md-7">
                                        <input class="form-control" type="text" id="param_paterno" name="param_paterno" placeholder="Ingrese Apellido Paterno">
                                    </div>

                                </div>

                                <div class="form-group">
                                    <label for="giro" class="col-md-4 control-label">Apellido Materno</label>
                                    <div class="col-md-7">
                                        <input class="form-control" type="text" id="param_materno" name="param_materno" placeholder="Ingrese Apellido MAterno">
                                    </div>

                                </div>                              
                                
                                <div class="form-group">
                                    <label for="ruc" class="col-md-4 control-label">Nombres</label>
                                    <div class="col-md-7">
                                        <input class="form-control" type="text" id="param_nombres" name="param_nombres" placeholder="Ingrese Nombres">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="nombreEmpresa" class="col-md-4 control-label">Dni</label>
                                    <div class="col-md-7">
                                        <input class="form-control" type="text" id="param_dni" name="param_dni" placeholder="Nombre Dni" maxlength="8" onkeypress="return solonumeros(event)">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="ruc" class="col-md-4 control-label">Dirección</label>
                                    <div class="col-md-7">
                                        <input class="form-control" type="text" id="param_direccion" name="param_direccion" placeholder="Ingrese Dirección">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="ruc" class="col-md-4 control-label">Usuario</label>
                                    <div class="col-md-7">
                                        <input class="form-control" type="cel" id="param_usuUsuario" name="param_usuUsuario" placeholder="Ingrese usuario">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="ruc" class="col-md-4 control-label">Contraseña</label>
                                    <div class="col-md-7">
                                        <input class="form-control" type="text" id="param_usuClave" name="param_usuClave" placeholder="Ingrese clave">
                                    </div>
                                </div>

                                <input type="hidden" value="nuevoUsuario" name="param_opcion" id="param_opcion">
                                <div class="form-group">
                                    <input type="button" id="registroUsuario" class="btn btn-success col-md-offset-4" value="Guardar"/>
                                    <input type="button" id="registroCancelar" class="btn btn-danger col-md-offset-1" value="Cancelar"/>
                                </div>
                            </fieldset>
                        </form>
                        </div>
                      </div>
                    </div>
            </div>



        </section><!-- /.content -->
      </div><!-- /.content-wrapper -->
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
    <script src="https://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js"></script>
    <!--<script src="../../assets/plugins/morris/morris.min.js"></script>-->

    <!--Data Tables -->
    <script src="../../assets/plugins/datatables/jquery.dataTables.min.js"></script>
    <script src="../../assets/plugins/datatables/dataTables.bootstrap.min.js"></script>

    <!-- Sparkline -->
    <script src="../../assets/plugins/sparkline/jquery.sparkline.min.js"></script>
    <!-- jvectormap -->
    <script src="../../assets/plugins/jvectormap/jquery-jvectormap-1.2.2.min.js"></script>
    <script src="../../assets/plugins/jvectormap/jquery-jvectormap-world-mill-en.js"></script>
    <!-- jQuery Knob Chart -->
    <script src="../../assets/plugins/knob/jquery.knob.js"></script>
    <!-- daterangepicker -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script>
    <script src="../../assets/plugins/daterangepicker/daterangepicker.js"></script>
    <!-- datepicker -->
    <script src="../../assets/plugins/datepicker/bootstrap-datepicker.js"></script>
    <!-- Bootstrap WYSIHTML5 -->
    <script src="../../assets/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js"></script>
    <!-- Slimscroll -->
    <script src="../../assets/plugins/slimScroll/jquery.slimscroll.min.js"></script>
    <!-- FastClick -->
    <script src="../../assets/plugins/fastclick/fastclick.min.js"></script>
    <!-- AdminLTE App -->
    <script src="../../assets/dist/js/app.min.js"></script>
    <!-- AdminLTE dashboard demo (This is only for demo purposes) -->
    <script src="../../assets/dist/js/pages/dashboard.js"></script>
    <!-- AdminLTE for demo purposes -->
    <script src="../../assets/dist/js/demo.js"></script>

    
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

    </script>

  </body>
</html>

<?php } ?>





