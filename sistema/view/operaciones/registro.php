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
                <li>Clientes</li>
            </ul><!-- /.breadcrumb -->

        </div>

        <div class="page-content">
            <div class="page-header">
                <h1>
                    <b>CLIENTES</b>
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
                              
                <!-- PAGE CONTENT BEGINS -->
                <div class="table-header">
                  FACTURAS REGISTRADAS &nbsp;&nbsp;
                  <a href='nuevo_registro.php'  class='white' >
                              <i class='ace-icon fa fa-plus-circle bigger-150'></i>
                          </a>
                        </div>
                
                  <div>
                    <table class="table table-striped table-bordered" id="tablaFacturas">
                      <thead>
                        <tr>
                        <th style="text-align: center; font-size: 11px; height: 10px; width: 15%;">Código</th>
                        <th style="text-align: center; font-size: 11px; height: 10px; width: 15%;">Cliente</th>
                                <th style="text-align: center; font-size: 11px; height: 10px; width: 10%;">Habitacion</th>
                                <th style="text-align: center; font-size: 11px; height: 10px; width: 10%;">Fecha Entrada</th> 
                                <th style="text-align: center; font-size: 11px; height: 10px; width: 10%;">Fecha Salida</th>  
                                <th style="text-align: center; font-size: 11px; height: 10px; width: 10%;">Total</th>
                                <th style="text-align: center; font-size: 11px; height: 10px; width: 15%;">Operaciones</th>
                        </tr>
                      </thead>

                      <tbody id="cuerpoFacturas">
                        
                        
                        
                      </tbody>
                    </table>
                  </div><!-- /.span -->
                  <br><br>
                  <div class="col-md-8 col-md-offset-2" id="detalle_factura">
                
                <div class="table-header">
                  DETALLE DE FACTURA &nbsp;&nbsp;                 
                </div>
                <div>
                  <table id="tablaDetalleFactura" class="table table-striped table-bordered">
                    <thead>                     
                            <tr>                              
                                <th style="text-align: center; font-size: 11px; height: 10px; width: 10%;">Codigo</th>
                                <th style="text-align: center; font-size: 11px; height: 10px; width: 10%;">Descripción</th>  
                                <th style="text-align: center; font-size: 11px; height: 10px; width: 10%;">Importe</th> 
                            </tr>                      
                    </thead>
                    <tbody id="cuerpoDetalleFactura">                                 
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



    <div class="footer">
      <div class="footer-inner">
        <div class="footer-content">
            <span class="bigger-120">
                <span class="blue bolder">BSE</span>
                &copy; All Rights Reserved
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

    <--!<script src="../default/js/listar_registro.js"></script>    -->
    <script src="../default/js/ventaTienda.js"></script>

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