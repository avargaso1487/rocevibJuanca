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

    <script language="javascript" type="text/javascript"> 
  var CronoID = null 
  var CronoEjecutandose = false 
  var decimas, segundos, minutos 

  function DetenerCrono (){ 
         if(CronoEjecutandose) 
             clearTimeout(CronoID) 
         CronoEjecutandose = false 
  } 

  function InicializarCrono () { 
      //inicializa contadores globales 
      decimas = 0 
      segundos = 0 
      minutos = 0 
       
      //pone a cero los marcadores 
      document.crono.display.value = '00:00:0' 
      document.crono.parcial.value = '00:00:0' 
  } 

  function MostrarCrono () { 
              
         //incrementa el crono 
         decimas++ 
      if ( decimas > 9 ) { 
          decimas = 0 
          segundos++ 
          if ( segundos > 59 ) { 
              segundos = 0 
              minutos++ 
              if ( minutos > 99 ) { 
                  alert('Fin de la cuenta') 
                  DetenerCrono() 
                  return true 
              } 
          } 
      } 

      //configura la salida 
      var ValorCrono = "" 
      ValorCrono = (minutos < 10) ? "0" + minutos : minutos 
      ValorCrono += (segundos < 10) ? ":0" + segundos : ":" + segundos 
      ValorCrono += ":" + decimas     
               
        document.crono.display.value = ValorCrono 

        CronoID = setTimeout("MostrarCrono()", 100) 
      CronoEjecutandose = true 
      return true 
  } 

  function IniciarCrono () { 
       DetenerCrono() 
       InicializarCrono() 
      MostrarCrono() 
  } 

  function ObtenerParcial() { 
      //obtiene cuenta parcial 
      document.crono.parcial.value = document.crono.display.value 
  } 




</script>
          
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
                                <i class="ace-icon fa fa-home home-icon"></i>
                                <a href="#">Registro</a>
                            </li>
                            <li><a href="pedidos.php">Nuevo Registro</a></li>
                            <li>
                                <span class="invoice-info-label">Fecha:</span>
                                <span class="blue"><?php echo date('d-m-Y'); ?></span>
                            </li>                            
                            <li>
                              <div class="form-group col-md-offset-2"> 
                                <form name="crono" class="form-horizontal"> 
                                
                                  <input type="text" size="8" name="display" value="00:00:0"> 
                                  <input type="button" name="Iniciar" value=" Iniciar " onClick="IniciarCrono()">
                                  <input type="button" name="Parar" value=" Parar " onClick="DetenerCrono()"> 
                                  <input type="button" name="Cero" value="  Cero  " onClick="DetenerCrono(); InicializarCrono()">
                                  <input type="text" size="8" name="parcial" value="00:00:0 " style="visibility: hidden;" > 
                                  <input type="button" name="Parcial" value="Parcial" onClick="ObtenerParcial()" style="visibility: hidden;">
                                </form> 
                              </div> 
                            </li>
                        </ul><!-- /.breadcrumb -->        
          </div>

          <div class="page-content">   

            <div class="page-header">
              <h1>
                Registro
              </h1>
            </div><!-- /.page-header -->

            <div class="row">
              <div class="col-md-12">
            
                <form role="form" id="frmNuevoRegistro" class="form-horizontal" method="POST">
                  <div class="row">
                    
                    <!-- Fechas -->
                    <div class="form-group">   
                       <label for="socio" class="col-md-2 control-label col-md-offset-1">N° Reg.: </label>
                       <div class="col-md-1">
                           <input disabled class="form-control" id="param_nroRegistro" name="param_nroRegistro" type="text" onkeypress="return solonumeros(event)">
                       </div>                                
                      <label for="socio" class="col-md-1 control-label">F. Entrada: </label>
                      <div class="col-md-2">
                        <input class="form-control date" id="param_fechaEntrada" name="param_fechaEntrada" type="text">
                      </div>

                      <label for="socio" class="col-md-1 control-label">F. Salida: </label>
                       <div class="col-md-2">
                           <input class="form-control" id="param_fechaSalida" name="param_fechaSalida" type="text" autofocus="">
                       </div>
                      </div>

                      <!-- Huesped --> 

                      <div class="form-group">                                   
                          <label for="" class="col-md-2 control-label col-md-offset-1">Huesped:</label>
                            <div class="input-group col-md-6">
                                <input class="form-control col-md-12 " type="text" name="param_huesped" id="param_huesped" placeholder="Busque al huesped" disabled/>
                                <span class="input-group-btn">
                                  <a id="buscarHuesped" class="btn btn-sm btn-default" data-toggle="modal">
                                      <i class="ace-icon fa fa-search bigger-110"></i>    
                                  </a>                                     
                                </span>
                            </div>

                            <div class="col-md-2">
                                <input class="form-control" type="hidden" name="param_idServicio" id="param_idServicio"/>
                                <input class="form-control" type="hidden" name="param_idHuesped" id="param_idHuesped"/>
                            </div>
                      </div>

                      <!--Servicios -->
                      <div class="widget-header widget-header-flat col-md-8 col-md-offset-2">                                
                              <h4 class="widget-title" style="font-size:18px;">Servicios</h4>
                      </div>

                      <br><br><br>

                      <div class="col-md-4 col-md-offset-2">                                   
                        <label for="">Servicio</label>
                        <div class="input-group">
                          <input class="form-control col-md-3 " type="text" name="param_servicio" id="param_servicio" placeholder="Seleccionar Servicio" />
                          <span class="input-group-btn">
                            <a id="buscarServicios" class="btn btn-sm btn-default" data-toggle="modal">
                            <i class="ace-icon fa fa-search bigger-110"></i>    
                              </a>                                     
                            </span>
                            </div>

                      </div>

                      <!-- Items -->

                      <div class="col-md-1">                                   
                          <label for="">Precio</label>
                          <div class="input-group">
                                <input class="form-control col-md-12 " type="text" name="param_precio" id="param_precio" value="0" />                                         
                            </div>                                                                      
                      </div>

                      <div class="col-md-3">                                   
                        <label for="">Obs.:</label>
                        <div class="input-group col-md-12">
                          <input class="form-control col-md-3 " type="text" name="param_obs" id="param_obs" placeholder="Observaciones" />
                        
                        </div>

                      </div>

                      <div class="col-md-2">                                   
                          <label for="">.</label>
                          <div class="input-group">
                                <button type="button" class="btn btn-success btn-lg ace-icon fa fa-plus" id="addRow">
                                </button>                                         
                            </div>                                                                      
                      </div>

                      <div class="col-md-2">                                                                      
                          <div class="input-group">
                            <input class="form-control col-md-12 " type="hidden" name="param_idServicio" id="param_idServicio"/>                                          
                            </div>                                                                      
                      </div>   

                      <br><br><br><br><br><br>
                      


                      <!--Tabla de Agregados -->    
                    <div class="col-md-10 col-md-offset-1">
                      <div class="table-header">
                      Lista de Servicios Agregados
                      </div>
                      <div>
                      <table id="tablaDetallesRegistro" class="table table-striped table-bordered">
                        <thead>                     
                          <tr>
                              <th style="text-align: center; font-size: 11px; height: 10px; width: 8%;">Código</th>
                              <th style="text-align: center; font-size: 11px; height: 10px; width: 25%;">Descripción</th> 
                              <th style="text-align: center; font-size: 11px; height: 10px; width: 8%;">Precio</th>
                              <th style="text-align: center; font-size: 11px; height: 10px; width: 10%;">Observaciones</th>
                              <th style="text-align: center; font-size: 11px; height: 10px; width: 10%;">Eliminar</th>
                          </tr>                      
                        </thead>
                        <tbody id="cuerpoDetallesRegistro">                       
                        </tbody>
                      </table>
                      <br>
                      </div>
                    </div>
        
                    <div class="col-md-11" align="right">                                   
                        <strong style="color:red">Total</strong>
                        <div class="input-group">
                            <input class="form-control" type="text" name="param_total" id="param_total" style="text-align:right;" disabled value="0.00" />
                        </div>
                    </div>

                   <br><br><br><br><br><br><br><br><br><br><br><br>
                  </div>             
                  <div class="row">
                    <div class="col-md-offset-4">
                      <!--button type="button" class="btn btn-primary " id="view_articulo"><i class="ace-icon fa fa-eye bigger-110"></i>Articulo</button> 
                      <button type="button" class="btn btn-primary offset-1" id="edit_articulo"><i class="ace-icon fa fa-pencil bigger-110"></i>Editar Articulo</button-->
                      <button type="button" class="btn btn-primary" id="registrar"><i class="ace-icon fa fa-plus bigger-110"></i>Registrar</button>
                      <button type="button" class="btn btn-primary" id="cancelar" onclick="cerrar();"><i class="ace-icon fa fa-close bigger-110"></i>Cancelar</button>            
                    </div>                            
                  </div>
                
                </form>
            
                 <!--ver modal Huesped -->
                <div class="modal fade" id="verHuesped" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                  <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title text-center" ><b>Huespedes</b></h4>
                      </div>
                      
                      <div class="modal-body">
                        <div class="row">
                          <div class="col-md-12">                       
                            <form role="form" id="frmHuespedes" class="form-horizontal" method="POST">

                              <div class="row">                                       
                                <div class="col-md-10 col-md-offset-1">
                                  <div class="table-header">
                                    Lista de Huespedes
                                  </div>
                                
                               <div>
                                
                                  <table id="tablaHuespedes" class="table table-striped table-bordered">
                                    <thead>                     
                                      <tr>
                                        <th style="text-align: center; font-size: 11px; height: 10px; width: 15%;">ID</th>
                                        <th style="text-align: center; font-size: 11px; height: 10px; width: 85%;">Huesped</th>         
                                      </tr>                      
                                    </thead>
                                    
                                    <tbody id="cuerpoHuespedes">                                  
                                    </tbody>
                                  </table>

                                </div>
                              </div>

                          </form>                                                
                        </div>              

                      </div><!-- /.col -->
                      </div>
                    </div>
                  </div>
                </div>
                <!--Fin de Modal Huesped -->
                                               
              </div>   <!--end col -->

               </div><!-- /.row -->


              <!--ver modal Servicios -->
            </div> <!--row -->

            <div class="modal fade" id="verServicios" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-lg">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title text-center"><b>Servicios</b></h4>
                  </div>
                  
                  <div class="modal-body">
                    <div class="row">
                      <div class="col-md-12">                       
                        <form role="form" id="frmServicios" class="form-horizontal" method="POST">
                          <div class="row">                                       
                            <div class="col-md-10 col-md-offset-1">
                              <div class="table-header">
                                Lista de Servicios
                              </div>
                            
                           <div>
                            
                              <table id="tablaServicios" class="table table-striped table-bordered">
                                <thead>                     
                                  <tr>
                                    <th style="text-align: center; font-size: 11px; height: 10px; width: 15%;">ID</th>
                                    <th style="text-align: center; font-size: 11px; height: 10px; width: 65%;">Servicio</th> 
                                    <th style="text-align: center; font-size: 11px; height: 10px; width: 15%;">Precio</th>        
                                  </tr>                      
                                </thead>
                                
                                <tbody id="cuerpoServicios">                                  
                                </tbody>
                              </table>

                            </div>
                          </div>                                   
                      </form>                                                
                    </div>              

                  </div><!-- /.col -->
                  </div>
                </div>
              </div>
            </div>
            <!-- Fin de Modal Servcios  -->


          </div> <!-- final de page content -->

           <input type="hidden" dissabled="true" value="Administrador" id="NombreGrupo">
            <input type="hidden" dissabled="true" value="Registrar" id="NombreTarea">    


    <div class="footer">
      <div class="footer-inner">
        <div class="footer-content">
            <span class="bigger-120">
                <span class="blue bolder">ROCEVIB</span>
                &copy; 2017
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
  </div>            

    

    <a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse">
        <i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i>
    </a>

       

    </div><!-- /.main-container -->

    <!-- basic scripts -->

    <!--[if !IE]> -->


    <!-- <![endif]-->

    <!--[if IE]>
    <script src="../Recursos/js/jquery.1.11.1.min.js"></script>
    <![endif]-->

    <!--[if !IE]> -->
    <script type="text/javascript">
        window.jQuery || document.write("<script src='../default/assets/js/jquery.min.js'>"+"<"+"/script>");
    </script>

    <!-- <![endif]-->

    <!--[if IE]>
    <script type="text/javascript">
        window.jQuery || document.write("<script src='../Recursos/js/jquery1x.min.js'>"+"<"+"/script>");
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

    <script src="../default/assets/js/bootstrap-datepicker.min.js"></script>
    <script src="../default/assets/js/bootstrap-timepicker.min.js"></script>
    <script src="../default/assets/js/moment.min.js"></script>
    <script src="../default/assets/js/daterangepicker.min.js"></script>
    <script src="../default/assets/js/bootstrap-datetimepicker.min.js"></script>

    <script src="../default/js/registros.js"></script> 
    <!-- <script src="../default/js/ventaTienda.js"></script> -->

    <!-- page specific plugin scripts -->
    <!-- ace scripts -->
    <script src="../default/assets/js/ace-elements.min.js"></script>
    <script src="../default/assets/js/ace.min.js"></script>
    <script type="text/javascript">

        $(document).ready(function () {
            $('#cboCategoriaEmail').change(function () {
                var id = $('#cboCategoriaEmail').val();
                $('#plantillaCategoria').load('../bd/cboplantilla.php?id='+id);
            })
            var objEditor;          
            
            $('#btnVer').on('click', function(){
                var opc = 'verPlantilla';
                var categoria = $('#cboCategoriaEmail').val();
                //var nombrePlantilla =$('#nombrePlantilla').val();
                //alert(categoria);
                 //alert(nombrePlantilla);
                 $.ajax({
                    type: 'POST',
                    dataType: "json",
                    data: 'opc='+opc+'&categoria='+categoria,
                    url: '../../view/bd/datosPlantilla.php',
                    success: function(rpta) {
                        if (rpta.success) {              
                            objEditor.setData(rpta.contenido);                
                        } else {
                            alert(rpta);
                        }
                    },
                    error: function(rpta){
                        alert(rpta);
                    }
                });   
            });

        })

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

        function validarEmail(field) {
            usuario = field.value.substring(0, field.value.indexOf("@"));
            dominio = field.value.substring(field.value.indexOf("@")+ 1, field.value.length);

            if ((usuario.length >=1) &&
                (dominio.length >=3) &&
                (usuario.search("@")==-1) &&
                (dominio.search("@")==-1) &&
                (usuario.search(" ")==-1) &&
                (dominio.search(" ")==-1) &&
                (dominio.search(".")!=-1) &&
                (dominio.indexOf(".") >=1)&&
                (dominio.lastIndexOf(".") < dominio.length - 1)) {
                document.getElementById("msgemail").innerHTML="E-mail válido";
                alert("E-mail valido");
            }
            else{
                document.getElementById("msgemail").innerHTML="<font color='red'>E-mail inválido </font>";
                alert("E-mail invalido");
            }
        }



        $.mask.definitions['~']='[+-]';
        $('.input-mask-date').mask('9999-99-99');
        $('.input-mask-phone').mask('999999999');
        $('.input-mask-dni').mask('99999999');
        $.mask.definitions['~']='[+-]';
        $('.input-mask-date').mask('99/99/9999');
        $('.input-mask-phone').mask('(999) 999-9999');
        $('.input-mask-eyescript').mask('~9.99 ~9.99 999');
        $(".input-mask-product").mask("a*-999-a999",{placeholder:" ",completed:function(){alert("You typed the following: "+this.val());}});
    </script>

    <!-- inline scripts related to this page -->
    </body>
    </html>
<?php } ?>