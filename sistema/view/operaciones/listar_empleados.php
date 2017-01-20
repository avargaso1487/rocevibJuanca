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
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="shortcut icon" href="../../default/assets/ico/favicon.png">
    <title>ROCEVIB HOTEL</title>
    
    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">

    <!-- bootstrap & fontawesome -->
    <link rel="stylesheet" href="../default/assets/css/bootstrap.min.css" />
    <link rel="stylesheet" href="../default/assets/font-awesome/4.2.0/css/font-awesome.min.css" />

    <!-- text fonts -->
    <link rel="stylesheet" href="../default/assets/fonts/fonts.googleapis.com.css" />

    <!-- ace styles -->
    <link rel="stylesheet" href="../default/assets/css/ace.min.css" class="ace-main-stylesheet" id="main-ace-style" />


    <!-- ace settings handler -->
    <script src="../default/assets/js/ace-extra.min.js"></script>
    <style type="text/css">
        .datepicker{z-index:1151 !important;}
    </style>

          
  </head>
  <body class="no-skin">
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

        <div class="sidebar-toggle sidebar-collapse" id="sidebar-collapse">
          <i class="ace-icon fa fa-angle-double-left" data-icon1="ace-icon fa fa-angle-double-left" data-icon2="ace-icon fa fa-angle-double-right"></i>
        </div>
        <ul class="nav nav-list" id="permisos">
        
        </ul><!-- /.nav-list -->


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
                                <i class="ace-icon fa fa-home home-icon"></i>Administrador
                            </li>
                            <li><a href="listar_empleados.php">Empleados</a></li>
                            <li>
                                <span class="invoice-info-label">Fecha:</span>
                                <span class="blue"><?php echo date('d-m-Y'); ?></span>
                            </li>                            
                            
                        </ul><!-- /.breadcrumb -->        
          </div>

          <div class="page-content">          
            <div class="page-header">
              <h1>
                Empleados Registrados
              </h1>
            </div><!-- /.page-header -->
            <div class="row">
              <div class="col-md-12">               
                <div class="table-header">
                  EMPLEADOS &nbsp;&nbsp;
                  <a href='#modal-form' data-toggle='modal' class='white' onclick="limpiar();">
                              <i class='ace-icon fa fa-plus-circle bigger-150'></i>
                          </a>
                </div>
                <div>
                  <table id="example" class="table table-striped table-bordered">
                    <thead>                     
                            <tr>
                                <th style="font-size: 12px; height: 10px; width: 5%;">ID</th>
                                    <th style="text-align: center; font-size: 12px; height: 10px; width: 20%;">Nombres</th> 
                                    <th style="text-align: center; font-size: 12px; height: 10px; width: 15%;">Apellido Paterno</th>
                                    <th style="text-align: center; font-size: 12px; height: 10px; width: 15%;">Apellido Materno</th>
                                    <th style="text-align: center; font-size: 12px; height: 10px; width: 7%;">Editar</th>
                                    <th style="text-align: center; font-size: 12px; height: 10px; width: 7%;">Eliminar</th>                
                            </tr>                      
                    </thead>
                    <tbody id="cuerpoTabla">                                  
                    </tbody>
                  </table>
                </div>


                
              <div id="modal-form" class="modal fade" tabindex="-1">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal">&times;</button>
                      <h4 class="blue bigger">Registro de Empleados</h4>
                    </div>

                    <div class="modal-body">
                      <div class="row">
                      <form class="form-horizontal form-bordered" method="post" action="../../controller/controlMantenedores/ambiente_controller.php" onsubmit="return validarCampos()">
                            
                            
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
                                        <input class="form-control" type="text" id="param_materno" name="param_materno" placeholder="Ingrese Apellido Materno">
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
                                    <label for="ruc" class="col-md-4 control-label">Celular</label>
                                    <div class="col-md-7">
                                        <input class="form-control" type="text" id="param_celular" name="param_celular" placeholder="Ingrese número de celular">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="ruc" class="col-md-4 control-label">Usuario</label>
                                    <div class="col-md-7">
                                        <input class="form-control" type="cel" id="param_usuario" name="param_usuario" placeholder="Ingrese usuario">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="ruc" class="col-md-4 control-label">Contraseña</label>
                                    <div class="col-md-7">
                                        <input class="form-control" type="password" id="param_clave" name="param_clave" placeholder="Ingrese clave">
                                    </div>
                                </div>

                            <div class="form-group">
                                
                                <div class="col-sm-1"></div>
                                <input type="hidden" value="registrar" name="param_opcion">
                                
                            </div>
                            <div class="form-group">
                                <div class="col-md-12">
                                  <center><button type="button" id="btn_cancelar_participante" class="btn btn-primary mr-xs mb-sm buttonform" data-dismiss="modal">Cancelar</button>
                                    <input type="submit" value="Registrar" class="btn btn-primary mr-xs mb-sm buttonform" ></center>
                                </div>
                            </div>
                            </form>

                        </div>
                      </div>

                      
                    </div>
                  </div>
                </div><!-- PAGE CONTENT ENDS -->







                <div id="modalEditarAmb" class="modal" tabindex="-1">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="blue bigger">Datos de Ambiente</h4>
                      </div>

                      <div class="modal-body">
                        <div class="row">
                          <form action="" method="POST" class="form-horizontal" id="form_nuevoUsuario">                                                                                 
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
                                        <input class="form-control" type="text" id="param_materno" name="param_materno" placeholder="Ingrese Apellido Materno">
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
                                    <label for="ruc" class="col-md-4 control-label">Celular</label>
                                    <div class="col-md-7">
                                        <input class="form-control" type="text" id="param_celular" name="param_celular" placeholder="Ingrese número de celular">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="ruc" class="col-md-4 control-label">Usuario</label>
                                    <div class="col-md-7">
                                        <input class="form-control" type="cel" id="param_usuario" name="param_usuario" placeholder="Ingrese usuario">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="ruc" class="col-md-4 control-label">Contraseña</label>
                                    <div class="col-md-7">
                                        <input class="form-control" type="text" id="param_clave" name="param_clave" placeholder="Ingrese clave">
                                    </div>
                                </div>

                            
                            <div class="form-group">
                                
                                <div class="col-sm-1"></div>
                                <input type="hidden" value="actualizar" name="param_opcion">
                               <!--  <input type="hidden" dissabled="true" value="Mantenedores" id="NombreGrupo">
                                <input type="hidden" dissabled="true" value="ambientes" id="NombreTarea"> -->
                            </div>
                            <div class="form-group">
                                <div class="col-md-12">
                                    <center><input type="submit" id="actualizar" value="Actualizar" class="btn btn-primary mr-xs mb-sm buttonform" ></center>
                                </div>
                            </div>
                            </form>

              </div>
              </div>

                      
              </div>
              </div>
              </div><!-- PAGE CONTENT ENDS -->
                


              </div>        
              <input type="hidden" dissabled="true" value="Administrador" id="NombreGrupo">
              <input type="hidden" dissabled="true" value="Listar Empleados" id="NombreTarea">     
              <!-- FIN DE CONTENIDO DE PAGINA -->                                  
            </div><!-- /.col -->
          </div>

                
        </div><!-- /.page-content -->             
        <div class="footer">
          <div class="footer-inner">
            <div class="footer-content">
              <span class="bigger-120">
                <span class="blue bolder">BSE Events</span>
                &copy; 2016
              </span>           
            </div>
          </div>          
        </div>
        
      </div>

      <a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse">
        <i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i>
      </a>
    </div><!-- /.main-container -->

    <!-- basic scripts -->

    <!--[if !IE]> -->
    

    <!-- <![endif]-->

    <!--[if IE]>
<script src="Recursos/js/jquery.1.11.1.min.js"></script>
<![endif]-->

    <!--[if !IE]> -->
    <script src="../default/assets/js/jquery.2.1.1.min.js"></script>
    <script src="../default/assets/js/ace-extra.min.js"></script>   
    
    <script type="text/javascript">
      window.jQuery || document.write("<script src='../default/assets/js/jquery.min.js'>"+"<"+"/script>");
    </script>

    <!-- <![endif]-->

    <!--[if IE]>
<script type="text/javascript">
 window.jQuery || document.write("<script src='Recursos/js/jquery1x.min.js'>"+"<"+"/script>");
</script>
<![endif]-->
    <script type="text/javascript">
      if('ontouchstart' in document.documentElement) document.write("<script src='../default/assets/js/jquery.mobile.custom.min.js'>"+"<"+"/script>");
    </script>   
    <script src="../default/assets/js/jquery.2.1.1.min.js"></script>
      <script src="../default/assets/js/bootstrap.min.js"></script>
      <script src="../default/assets/js/jquery.dataTables.min.js"></script>
      <script src="../default/assets/js/jquery.dataTables.bootstrap.min.js"></script>
      <script src="../default/assets/js/jquery.maskedinput.min.js"></script>
      <script src="../default/assets/js/jquery.autosize.min.js"></script>
      <script src="../default/assets/js/jquery.inputlimiter.1.3.1.min.js"></script>

    
    <!-- page specific plugin scripts -->
    <!-- ace scripts -->
    <script src="../default/assets/js/ace-elements.min.js"></script>
    <script src="../default/assets/js/ace.min.js"></script>
        
    <script src="../default/js/listar_empleados.js"></script>

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

          $('#id-input-file-1 , #id-input-file-2').ace_file_input({
                    no_file:'Ajuntar Cv...',
                    btn_choose:'Choose',
                    btn_change:'Change',
                    droppable:false,
                    onchange:null,
                    thumbnail:false //| true | large
                    //whitelist:'gif|png|jpg|jpeg'
                    //blacklist:'exe|php'
                    //onchange:''
                    //
                });
      </script>
      <script src="../default/assets/js/jquery.dataTables.min.js"></script>
    <script src="../default/assets/js/jquery.dataTables.bootstrap.min.js"></script>
    <!-- inline scripts related to this page -->
  </body>
</html>
<?php } ?>
