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
                    <a href="../home/home.php">Home</a>
                </li>
                <li>Mantenedor</li>
                <li>Registro</li>
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
                    <b>HUÉSPEDES</b>
                    <small>
                        <i class="ace-icon fa fa-angle-double-right"></i>
                        Registro / Actualización de Datos
                    </small>
                </h1>
                <div class="widget-header widget-header-large">
                    <div class="widget-toolbar no-border invoice-info">
                        <span class="invoice-info-label">Fecha:</span>
                        <span class="blue"><?php echo date('d-m-Y'); ?></span>
                    </div>
                </div>



            </div><!-- /.page-header -->
            <div class="row">
              <div class="col-xs-12">

                <!--Antes de.... -->
                <div class="col-md-offset-5" align="right">
                    <a id="modalEmpresa" class="btn btn-sm btn-warning" data-target='#modal-form-empresa' data-toggle='modal' onclick="limpiarEmpresa();">
                        <i class="ace-icon fa fa-plus bigger-110"></i> NUEVA EMPRESA 
                    </a> 

                   <a id="modalHuesped" class="btn btn-sm btn-warning" data-target='#modal-form-huesped' data-toggle='modal' onclick="limpiarHuesped();">
                        <i class="ace-icon fa fa-plus bigger-110"></i> NUEVO HUÉSPED 
                    </a> 
                </div><br>

                <!-- PAGE CONTENT BEGINS -->
                <div class="table-header">
                  LISTA DE REGISTROS &nbsp;&nbsp;
                  <a href='nuevo_registro.php'  class='white' >
                              <i class='ace-icon fa fa-plus-circle bigger-150'></i>
                          </a>
                        </div>
                
                  <div>
                    <table class="table table-striped table-bordered" id="reg">
                      <thead>
                        <tr>
                        <th style="text-align: center; font-size: 11px; height: 10px; width: 10%;">ID</th>
                        <th style="text-align: center; font-size: 11px; height: 10px; width: 40%;">Huésped</th>
                                <th style="text-align: center; font-size: 11px; height: 10px; width: 15%;">Fecha Entrada</th> 
                                <th style="text-align: center; font-size: 11px; height: 10px; width: 15%;">Fecha Salida</th>  
                                <th style="text-align: center; font-size: 11px; height: 10px; width: 10%;">Total</th>
                                <th style="text-align: center; font-size: 11px; height: 10px; width: 10%;">Servicios</th>
                        </tr>
                      </thead>

                      <tbody id="cuerpoReg">
                        
                        
                        
                      </tbody>
                    </table>
                  </div><!-- /.span -->
                  <br><br>
                  <div class="col-md-8 col-md-offset-2" id="detalle_factura">
                
                <div class="table-header">
                  DETALLE DE SERVICIOS &nbsp;&nbsp;                 
                </div>
                <div>
                  <table id="regDetalle" class="table table-striped table-bordered">
                    <thead>                     
                            <tr>                              
                                <th style="text-align: center; font-size: 11px; height: 10px; width: 10%;">ID</th>
                                <th style="text-align: center; font-size: 11px; height: 10px; width: 30%;">Descripción</th>  
                                <th style="text-align: center; font-size: 11px; height: 10px; width: 10%;">Importe x Día</th> 
                                <th style="text-align: center; font-size: 11px; height: 10px; width: 20%;">Comentarios</th> 
                            </tr>                      
                    </thead>
                    <tbody id="cuerpoRegDetalle">                                 
                    </tbody>
                  </table>
                </div><br><br>
              </div>          
              </div><!-- /.col -->
              <input type="hidden" dissabled="true" value="Huésped" id="NombreGrupo">
              <input type="hidden" dissabled="true" value="Registrar" id="NombreTarea">     
            </div><!-- /.row -->
        </div>


    </div><!-- /.page-content -->



<!-- Modal Registro HUESPEDES-->
              <div id="modal-form-huesped" class="modal fade" tabindex="-1">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal">&times;</button>
                      <h4 class="blue bigger" id="cabecera">
                      NUEVO HUÉSPED
                      </h4>
                    </div>

                    <div class="modal-body">
                      <div class="row">
                      <div id="mensajeHuesped">
                      </div>

                      <!--Formulario de Registro -->
                      <form class="form-horizontal form-bordered" method="post" id="frm_huesped">

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
                                    <label for="nombreEmpresa" class="col-md-4 control-label">DNI</label>
                                    <div class="col-md-7">
                                        <input class="form-control" type="text" id="param_dni" name="param_dni" placeholder="DNI o Carnet de Extranjería" maxlength="8">
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
                                <label for="param_empresa" class="col-md-4 control-label">Empresa</label>
                                <div id="empresa" class="col-md-7">
                                    <!--Reemplazar-->
                                  <div class="input-group">                           
                                    <select class="form-control" id="param_empresa" name="param_empresa">
                                      <option value="" disabled selected style="display: none;">Seleccionar empresa</option>
                                    </select>
                                  </div>
                                </div>
                              </div>

                             <div>
                                <input type="hidden" id="param_id" name="param_id">
                                </div>
                              <div class="form-group">
                              <div class="col-md-12">
                                <center>
                                <button type="button" class="btn btn-primary mr-xs mb-sm buttonform" data-dismiss="modal">CANCELAR</button>
                                <button type="button" class="btn btn-primary mr-xs mb-sm buttonform" id="nuevoHuesped">REGISTRAR</button>
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



            <!-- Modal Registro empresa -->
              <div id="modal-form-empresa" class="modal fade" tabindex="-1">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal">&times;</button>
                      <h4 class="blue bigger" id="cabecera"> NUEVA EMPRESA
                      </h4>
                    </div>

                    <div class="modal-body">
                      <div class="row">

                      <div id="mensajeEmpresa">
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
                                        <input class="form-control" type="text" id="param_direccionLegal" name="param_direccion" placeholder="Ingrese Dirección Legal">
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



<br><br><br>
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

    <script src="../default/js/listar_registro.js"></script> 
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