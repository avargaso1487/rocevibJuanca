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
                            <li><a href="listar_empresas.php">Empresas</a></li>
                            <li>
                                <span class="invoice-info-label">Fecha:</span>
                                <span class="blue"><?php echo date('d-m-Y'); ?></span>
                            </li>                            
                            
                        </ul><!-- /.breadcrumb -->        
          </div>

          <div class="page-content">          
            <div class="page-header">
              <h1>
                Empresas
              </h1>
            </div><!-- /.page-header -->
            <div class="row">
              <div class="col-md-12">               
                <div class="table-header">
                  EMPRESAS &nbsp;&nbsp;
                  <a href='#modal-form' data-toggle='modal' class='white' onclick="limpiarDatos();">
                              <i class='ace-icon fa fa-plus-circle bigger-150'></i>
                          </a>
                </div>
                <div>
                  <table id="empresas" class="table table-striped table-bordered">
                    <thead>                     
                            <tr>
                                <th style="text-align: center; font-size: 12px; height: 10px; width: 10%;">ID</th> 
                                <th style="text-align: center; font-size: 12px; height: 10px; width: 30%;">Razón Social</th> 
                                <th style="text-align: center; font-size: 12px; height: 10px; width: 10%;">RUC</th>
                                <th style="text-align: center; font-size: 12px; height: 10px; width: 30%;">Dirección Legal</th>
                                <th style="text-align: center; font-size: 12px; height: 10px; width: 10%;">Actividad Comercial</th>  
                                <th style="text-align: center; font-size: 12px; height: 10px; width: 5%;">Editar</th>
                                <th style="text-align: center; font-size: 12px; height: 10px; width: 5%;">Eliminar</th>                
                            </tr>                      
                    </thead>
                    <tbody id="cuerpoEmpresas">                                  
                    </tbody>
                  </table>
                </div>


            <!-- Modal Registro -->
              <div id="modal-form" class="modal fade" tabindex="-1">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal">&times;</button>
                      <h4 class="blue bigger" id="cabecera">
                      </h4>
                    </div>

                    <div class="modal-body">
                      <div class="row">
                      <div id="mensaje">
                      </div>

                      <!--Formulario de Registro -->
                      <form class="form-horizontal form-bordered" method="post" id="frm_empresa">

                            <div class="form-group">
                                    <label for="ruc" class="col-md-4 control-label">Razón Social</label>
                                    <div class="col-md-7">
                                        <input class="form-control" type="text" id="param_razonSocial" name="param_razonSocial" placeholder="Ingrese Razón Social">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="ruc" class="col-md-4 control-label">RUC</label>
                                    <div class="col-md-7">
                                        <input class="form-control" type="text" id="param_ruc" name="param_ruc" placeholder="Ingrese Apellido Paterno" maxlength="11">
                                    </div>

                                </div>

                                <div class="form-group">
                                    <label for="giro" class="col-md-4 control-label">Dirección Legal</label>
                                    <div class="col-md-7">
                                        <input class="form-control" type="text" id="param_direccion" name="param_direccion" placeholder="Ingrese Apellido Materno">
                                    </div>

                                </div>                              
                                
                                <div class="form-group">
                                    <label for="nombreEmpresa" class="col-md-4 control-label">Actividad Comercial</label>
                                    <div class="col-md-7">
                                        <input class="form-control" type="text" id="param_aComercial" name="param_aComercial" placeholder="Ingrese Actividad Comercial">
                                    </div>
                                </div>

                                <div>
                                <input type="hidden" id="param_id" name="param_id">
                                </div>

                              <div class="form-group">
                              <div class="col-md-12">
                                <center>
                                <button type="button" class="btn btn-primary mr-xs mb-sm buttonform" id="actualizarEmpresa">ACTUALIZAR</button>
                                <button type="button" class="btn btn-primary mr-xs mb-sm buttonform" data-dismiss="modal">CANCELAR</button>
                                <button type="button" class="btn btn-primary mr-xs mb-sm buttonform" id="nuevaEmpresa">REGISTRAR</button>
                                  </center>
                              </div>
                            </div>
                            </form>

                        </div>
                      </div>                      
                    </div>
                  </div>
                </div><!-- PAGE CONTENT ENDS -->


                <!--Fin de Modal Registro -->

                     
              </div>
              </div>
              </div><!-- PAGE CONTENT ENDS -->
                


              </div>        
              <input type="hidden" dissabled="true" value="Administrador" id="NombreGrupo">
              <input type="hidden" dissabled="true" value="Listar Empresas" id="NombreTarea">     
              <!-- FIN DE CONTENIDO DE PAGINA -->                                  
            </div><!-- /.col -->
          </div>

          <BR><BR><BR>      
        </div><!-- /.page-content -->             
        <div class="footer">
          <div class="footer-inner">
            <div class="footer-content">
              <span class="bigger-120">
                <span class="blue bolder">ROCEVIB</span>
                &copy; 2017
              </span>           
            </div>
          </div>          
        </div>
        
      </div>

      <a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse">
        <i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i>
      </a>
    </div>

    
    <script src="../default/assets/js/jquery.2.1.1.min.js"></script>
    <script src="../default/assets/js/ace-extra.min.js"></script>   
    
    <script type="text/javascript">
      window.jQuery || document.write("<script src='../default/assets/js/jquery.min.js'>"+"<"+"/script>");
    </script>

    
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

        
    <script src="../default/assets/js/ace-elements.min.js"></script>
    <script src="../default/assets/js/ace.min.js"></script>
        
    <script src="../default/js/listar_empresas.js"></script>

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
                    thumbnail:false 
                });
      </script>
      <script src="../default/assets/js/jquery.dataTables.min.js"></script>
    <script src="../default/assets/js/jquery.dataTables.bootstrap.min.js"></script>    
  </body>
</html>
<?php } ?>