
window.numeroDetallePedido = [];
window.productoId = [];
window.almacenId = [];
window.cantidadUC = [];
window.cantidadUV = [];
window.pedidosPrecios = [];
window.impuestoIva = [];
window.pedidoDescuento = [];
window.importeProducto = [];

$(document).ready(function() {
    $('#tablaFacturas').DataTable();
    //$('#tablaDetalleEntrega').DataTable();
    $('#tablaDetalleEntrega').dataTable({
        "bPaginate": false,
        "bFilter": false,
        "bInfo": false
    });
    
    mostrarCabecera();
    mostrarBI();
    mostrarDetalle();
    llenarDetalle();
    mostrarMenu();  
    agregarDetalleFactura();
    mostrarFacturas();
    montoProductosDetalle = 0;
    descuentoPP = 0;
    total = 0;
    descPorcentaje = 0;
    totalBI = 0;
    neto = 0;
    descPP = 0;
    obtenerCaja();
    
});


function llenarDetalle() {
  
}

function imprimir(factura){ 
  //alert(factura); 
  open("../../Reportes/facturaPDF.php?factura=" + factura + "", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes, top=100,left=300, width: 800,height: 400");
}

$(function() {
    $('#register_factura').on('click', function(){
       //alert('Agregar Factura');
       $("#tablaDetalleEntrega tbody tr").each(function (index) {
            var codigo, descripcion, cantUC, cantUV, precios, igv, descuento, importe, almacen;
            $(this).children("td").each(function (index2) 
            {
                switch (index2) 
                {
                    case 0: codigo = $(this).text();
                        break;
                    case 1: descripcion = $(this).text();
                        break;                    
                    case 2: cantUC = $(this).text();
                        break;                    
                    case 3: precios = $(this).text();
                        break;
                    case 4: igv = $(this).text();
                        break;
                    case 5: descuento = $(this).text();
                        break;
                    case 6: importe = $(this).text();
                        break;
                    case 7: almacen = $(this).text();
                        break;
                } 
            })
            //alert(codigo + ' - ' + descripcion + ' - ' + cantidadUC);
            productoId.push(codigo);           
            cantidadUC.push(cantUC);
            cantidadUV.push(cantUC);
            pedidosPrecios.push(precios);
            impuestoIva.push(igv);
            pedidoDescuento.push(descuento);
            importeProducto.push(importe);
            almacenId.push(almacen);
        })
       
        var param_opcion = 'registroFactura';
        var param_nroFactura = document.getElementById('param_nroFactura').value;
        var param_tipo = document.getElementById('param_tipo').value;
        var param_serie = document.getElementById('param_serie').value;
        //alert();
        //alert();
        var respuesta = confirm('¿Desea registrar el pedido?');
        if (respuesta == true) {
            //alert('Registrar');
            registroCaberaFactura();

            if (param_serie != '' || param_nroFactura != '') {
                if (param_tipo == 'BOLETA' || param_tipo == 'FACTURA') {
                var numeroFactura = param_serie + '-' +param_nroFactura;
                //alert(numeroFactura);
                $.ajax({
                    type: 'POST',
                    data:'param_opcion='+param_opcion+'&param_productoId='+productoId+'&param_nroFactura='+numeroFactura+'&param_almacenId='+almacenId+'&param_cantidadUC='+cantidadUC+
                        '&param_cantidadUV='+cantidadUV+'&param_pedidosPrecios='+pedidosPrecios+'&param_impuestoIva='+impuestoIva+
                        '&param_pedidoDescuento='+pedidoDescuento+'&param_importeProducto='+importeProducto,
                    url: '../../controller/controlCompras/facturas_controller.php', 
                    success: function(data){
                        alert('Pedido Registrado Correctamente');
                        location.href='facturas.php';
                        //mostrarProveedores();                                    
                    },
                    error: function(data){
                        //$('#cuerpoTabla').html(respuesta);
                    }
                });
            } else {
               $.ajax({
                    type: 'POST',
                    data:'param_opcion='+param_opcion+'&param_productoId='+productoId+'&param_nroFactura='+param_nroFactura+'&param_almacenId='+almacenId+'&param_cantidadUC='+cantidadUC+
                        '&param_cantidadUV='+cantidadUV+'&param_pedidosPrecios='+pedidosPrecios+'&param_impuestoIva='+impuestoIva+
                        '&param_pedidoDescuento='+pedidoDescuento+'&param_importeProducto='+importeProducto,
                    url: '../../controller/controlCompras/facturas_controller.php', 
                    success: function(data){
                        alert('Pedido Registrado Correctamente');
                        location.href='entregas.php';
                        //mostrarProveedores();                                    
                    },
                    error: function(data){
                        //$('#cuerpoTabla').html(respuesta);
                    }
                });
            }  
            }
            
        } else {
            if (respuesta == false) {
                alert('Se cancelo el registro')
            }
        }
    });





   /*$('#register_factura').on('click', function(){
       //alert('Agregar Factura');
       var param_opcion = 'registroFactura'; 
       registroCaberaFactura(param_opcion);
    });*/


    $('#buscarProductos').on('click', function(){
       //alert('Agregar Proveeor');
       $('#verProducto').modal({
            show:true,
            backdrop:'static',
        });
       var param_opcion = 'mostrarProductos';
       var param_codigoProveedor = document.getElementById('param_codProveedor').value;
        $.ajax({
          type: 'POST',        
          data:'param_opcion='+param_opcion+'&param_codigoProveedor='+param_codigoProveedor,
          url: '../../controller/controlCompras/pedidos_controller.php', 
          success: function(data){
            $('#tablaProductos').DataTable().destroy();
            $('#cuerpoProductos').html(data);
            $('#tablaProductos').DataTable();
          },
          error: function(data){
                     
          }
        });  
     
    }); 

    $('#buscarFacturas').on('click', function(){
       //alert('Agregar Proveeor');
       var param_desde = document.getElementById('param_desde').value;
       var param_hasta = document.getElementById('param_hasta').value;
       var param_opcion = 'buscarFacturas'
        $.ajax({
          type: 'POST',        
          data:'param_opcion='+param_opcion+'&param_desde='+param_desde+'&param_hasta='+param_hasta,
          url: '../../controller/controlCompras/facturas_controller.php', 
          success: function(data){
            $('#tablaFacturas').DataTable().destroy();
            $('#cuerpoFacturas').html(data);
            $('#tablaFacturas').DataTable();
          },
          error: function(data){
                     
          }
        });  
     
    });

    $('#confirmar_pago').on('click', function(){
       //alert('Agregar Proveeor');
       var param_opcion = 'registrar_pago'
       var param_detalleCaja =      document.getElementById('param_detalleId').value;
       var param_saldo =            parseFloat(document.getElementById('param_montoSaldo').value);
       var param_monto =            parseFloat(document.getElementById('param_montoPagar').value);
       var param_numeroFactura =    document.getElementById('param_numeroPagar').value;
       var param_factura =          document.getElementById('param_factura').value;

       if (param_monto > param_saldo) {
            alert('No se cuenta con el monto para realizar el pago.');
       } else {
            $.ajax({
                type: 'POST',        
                data:'param_opcion='+param_opcion+'&param_detalleCaja='+param_detalleCaja+'&param_saldo='+param_saldo+
                '&param_monto='+param_monto+'&param_numeroFactura='+param_numeroFactura+'&param_factura='+param_factura,
                url: '../../controller/controlCompras/facturas_controller.php', 
                success: function(data){
                    alert('Se realizo el pago correctamente.');
                    $('#pagar_factura').modal('hide');
                    mostrarFacturas();
                },
                error: function(data){
                         
                }
            });  
       }
     
    });

    $('#cancelar_pago').on('click', function(){
       //alert('Agregar Proveeor');
       document.getElementById('param_proveedorPagar').value="";
       document.getElementById('param_factura').value="";
       document.getElementById('param_numeroPagar').value="";
       document.getElementById('param_montoSaldo').value="";
       document.getElementById('param_detalleId').value="";
        $('#pagar_factura').modal('hide');
     
    });

    
    $('#tablaProductos tbody').on('dblclick', 'tr', function () {seleccionDobleProductos(this);}); 

    $('body').on('click', ".btn-danger", deleteFila);


    function deleteFila()
    {
        $(this).parent().parent().remove();
    }
    
});

function seleccionDobleProductos(e){
    if ($('#tablaProductos tbody tr td').length == 1){
       return false;
    }
    

    if ( $(e).hasClass('selected')){
        $(e).removeClass('selected');
    }
    else {
        $('#tablaProductos').DataTable().$('tr.selected').removeClass('selected');
        $(e).addClass('selected');
    }
    document.getElementById('param_producto').value = $('#tablaProductos').DataTable().cell('.selected', 0).data();
    document.getElementById('param_codProducto').value = $('#tablaProductos').DataTable().cell('.selected', 1).data();
    document.getElementById('param_precio').value = $('#tablaProductos').DataTable().cell('.selected', 7).data(); 
    document.getElementById('param_iva').value = $('#tablaProductos').DataTable().cell('.selected', 8).data();  
    $('#verProducto').modal('hide');
    document.getElementById('addRow').disabled = false; 
}



function agregarDetalleFactura() {    
    var t = $('#tablaDetalleEntrega');


    $('#addRow').on( 'click', function () {
        var codigo              = document.getElementById('param_codProducto').value;
        var descripcion         = document.getElementById('param_producto').value;
        var cantidad            = document.getElementById('param_cantidad').value;
        var precio              = document.getElementById('param_precio').value;
        var iva                 = document.getElementById('param_iva').value;
        var descuento           = document.getElementById('param_descuento').value;
        var desc= 0;
        var precioBruto= 0;
        var descontar= 0;
        var importe= 0;


        desc = descuento;
        precioBruto = (precio * cantidad);

        if (desc > 0)
        {                       
            desc  = precioBruto* (desc/100);
            descontar = desc;           
        } else {
            descuento = 0;
        }

        importe = precioBruto - descontar;

        var fila  = '<tr><td style="text-align: left; font-size: 11px; height: 10px; width: 5%;">'+codigo+'</td><td style="text-align: center; font-size: 11px; height: 10px; width: 15%;">'+descripcion+'</td><td style="text-align: center; font-size: 11px; height: 10px; width: 8%;">'+cantidad+'</td><td style="text-align: center; font-size: 11px; height: 10px; width: 8%;">'+cantidad+'</td><td style="text-align: center; font-size: 11px; height: 10px; width: 8%;">'+precio+'</td><td style="text-align: center; font-size: 11px; height: 10px; width: 6%;">'+iva+'</td><td style="text-align: center; font-size: 11px; height: 10px; width:6%;">'+descuento+'</td><td style="text-align: center; font-size: 11px; height: 10px; width: 8%;">'+importe.toFixed(2)+'</td><td class="text-center"><div class="btn btn-danger btn-xs center deleteValid">Eliminar</div></td>';

        $('#tablaDetalleEntrega').append(fila);

        
        
     
        montoProductosDetalle = document.getElementById('param_totalBI').value;
        
        montoProductosDetalle = parseFloat(montoProductosDetalle) + importe;
        descuentoPP = montoProductosDetalle * (18/100);
        totalNeto = montoProductosDetalle + descuentoPP;
        
        document.getElementById('param_codProducto').value="";
        document.getElementById('param_producto').value="";
        document.getElementById('param_cantidad').value="1";
        document.getElementById('param_precio').value="0"; 
        document.getElementById('param_iva').value="";
        document.getElementById('param_descuento').value="";             
        document.getElementById('param_totalBI').value=montoProductosDetalle.toFixed(2);
        document.getElementById('param_total').value=montoProductosDetalle.toFixed(2);
        document.getElementById('param_descuentoPP16').value=descuentoPP.toFixed(2);
        
        document.getElementById('addRow').disabled=true;
        // para el descuento normal
        var montoBI = document.getElementById('param_totalBI').value;
        var descPorc = document.getElementById('param_descPorcentaje').value;
        descPorcentaje = parseFloat(montoBI) * parseFloat(descPorc/100);
        document.getElementById('param_montodescuento').value= descPorcentaje.toFixed(2);
        //document.getElementById('param_total').value=parseFloat(montoBI)-parseFloat(descPorcentaje);

        // para el descuento PP        
        var descPorcPP = document.getElementById('param_descuentoPP').value;
        descPorcentajePP = parseFloat(montoBI) * parseFloat(descPorcPP/100);
        document.getElementById('param_montodescuentoPP').value=descPorcentajePP.toFixed(2);
        addTotal = parseFloat(montoBI)-parseFloat(descPorcentaje)-parseFloat(descPorcentajePP)
        document.getElementById('param_total').value= addTotal.toFixed(2);
        //alert(descPorc);
        var varTotal = document.getElementById('param_total').value;
        neto = parseFloat(varTotal)+parseFloat(descuentoPP);
        document.getElementById('param_totalNeto').value=neto.toFixed(2);        

    } );


    $('#param_descPorcentaje').on('blur', function () {
        /*var total = 0;
        var descPorcentaje = 0;
        var totalBI = 0;*/
        var desc = document.getElementById('param_descPorcentaje').value;
        var desPP = document.getElementById('param_descuentoPP16').value;
        var subtotal = document.getElementById('param_totalBI').value;
        var montodescuentoPP = document.getElementById('param_montodescuentoPP').value;
        descPorcentaje = desc;
        totalBI = subtotal;
        descPP = desPP;
        var montodescuento = totalBI * (descPorcentaje/100);
        respuesta = parseFloat(totalBI) - parseFloat(montodescuento) - parseFloat(montodescuentoPP);
        //alert(desPP);
        neto = parseFloat(desPP) + parseFloat(respuesta);
        //totalBI = montodescuento+totalBI;
        //alert(totalBI);
        document.getElementById('param_montodescuento').value=montodescuento.toFixed(2);
        document.getElementById('param_total').value= respuesta.toFixed(2);
        document.getElementById('param_totalNeto').value=neto.toFixed(2);

    });


    $('#param_descuentoPP').on('blur', function () {
        var descuentoPP = document.getElementById('param_descuentoPP').value;
        var montoDescuento = document.getElementById('param_montodescuento').value;        
        var totalPP = document.getElementById('param_total').value;
        var desPP16 = document.getElementById('param_descuentoPP16').value;
        var subtotal = document.getElementById('param_totalBI').value;

        descPorcentaje = descuentoPP;
        totalBI = subtotal;
        //descPP = desPP;

        var montodescuentoPP = totalBI * (descPorcentaje/100);
        respuesta2 = parseFloat(subtotal)-parseFloat(montodescuentoPP)-parseFloat(montoDescuento);
        neto2 = parseFloat(respuesta2) + parseFloat(desPP16);
        document.getElementById('param_montodescuentoPP').value=montodescuentoPP.toFixed(2);
        document.getElementById('param_total').value= respuesta2.toFixed(2);
        document.getElementById('param_totalNeto').value=neto2.toFixed(2);

    });        
    
}

function mostrarCabecera() {
  var param_nroPedido = document.getElementById('param_nroPedido').value;

  //alert(param_nroPedido);
  var param_opcion = 'mostrarCabecera';  
  $.ajax({
        type: 'POST',        
        data:'param_opcion='+param_opcion+'&param_nroPedido='+param_nroPedido,
        url: '../../controller/controlCompras/pedidos_controller.php', 
        success: function(data){
            objeto=JSON.parse(data);
            $("#param_nroPedido").val(objeto[0]);         
            $("#param_fechaEntrega").val(objeto[2]);
            $("#param_proveedor").val(objeto[3]);            
            $("#param_totalBI").val(objeto[5]);
            $("#param_descuento").val(objeto[6]);
            $("#param_montodescuento").val(objeto[7]);
            $("#param_descuentoPP").val(objeto[8]);
            $("#param_montodescuentoPP").val(objeto[9]);
            $("#param_total").val(objeto[10]);
            $("#param_descuentoPP16").val(objeto[11]);
            $("#param_totalNeto").val(objeto[12]);
            $("#param_codProveedor").val(objeto[13]);
        },
        error: function(data){
                   
        }
    });
}


function mostrarBI() {
  var param_nroPedido = document.getElementById('param_nroPedido').value;

  //alert(param_nroPedido);
  var param_opcion = 'mostrar_montoBI';  
  $.ajax({
        type: 'POST',        
        data:'param_opcion='+param_opcion+'&param_nroPedido='+param_nroPedido,
        url: '../../controller/controlCompras/facturas_controller.php', 
        success: function(data){
            objeto=JSON.parse(data);                   
            $("#param_totalBI").val(objeto[0]);
            var desc = document.getElementById('param_descPorcentaje').value;
            var desPP = document.getElementById('param_descuentoPP16').value;
            var subtotal = document.getElementById('param_totalBI').value;
            var montodescuentoPP = document.getElementById('param_montodescuentoPP').value;
            descPorcentaje = desc;
            totalBI = subtotal;
            descPP = desPP;
            var montodescuento = totalBI * (descPorcentaje/100);
            respuesta = parseFloat(totalBI) - parseFloat(montodescuento) - parseFloat(montodescuentoPP);
            //alert(desPP);
            neto = parseFloat(desPP) + parseFloat(respuesta);
            //totalBI = montodescuento+totalBI;
            //alert(totalBI);
            document.getElementById('param_montodescuento').value=montodescuento.toFixed(2);
            document.getElementById('param_total').value= respuesta.toFixed(2);
            document.getElementById('param_totalNeto').value=neto.toFixed(2);

        },
        error: function(data){
                   
        }
    });
}


function mostrarDetalle() {
    var param_nroPedido = document.getElementById('param_nroPedido').value;
  //alert(param_nroPedido);
    var param_opcion = 'mostrar_detalle_entrega';  
    $.ajax({
        type: 'POST',        
        data:'param_opcion='+param_opcion+'&param_nroPedido='+param_nroPedido,
        url: '../../controller/controlCompras/facturas_controller.php', 
        success: function(data){
            $('#tablaDetalleEntrega').DataTable().destroy();
            $('#cuerpoDetalleEntrega').html(data);
            $('#tablaDetalleEntrega').DataTable();
        },
        error: function(data){
                   
        }
    });
}

function registroCaberaFactura() {
    var param_opcion = 'registro_cabecera'
    var param_nroPedido = document.getElementById('param_nroPedido').value;
    var param_tipo = document.getElementById('param_tipo').value;
    var param_nroFactura = document.getElementById('param_nroFactura').value;
    var param_serie = document.getElementById('param_serie').value;
    var param_fecha = document.getElementById('param_fecha').value;
    var param_codProveedor = document.getElementById('param_codProveedor').value;
    var param_totalBI = document.getElementById('param_totalBI').value;
    var param_descPorcentaje = document.getElementById('param_descPorcentaje').value;
    var param_montodescuento = document.getElementById('param_montodescuento').value;
    var param_descuentoPP = document.getElementById('param_descuentoPP').value;
    var param_montodescuentoPP = document.getElementById('param_montodescuentoPP').value;
    var param_total = document.getElementById('param_total').value;
    var param_descuentoPP16 = document.getElementById('param_descuentoPP16').value;
    var param_totalNeto = document.getElementById('param_totalNeto').value;

    if (param_tipo == '' || param_nroFactura == '') {
        alert('Ingrese el número de factura.');
    } else {
        if (param_tipo == 'BOLETA' || param_tipo == 'FACTURA') {
            var numeroFactura = param_serie + '-' +param_nroFactura;
            $.ajax({
                type: 'POST',        
                data:'param_opcion='+param_opcion+'&param_nroPedido='+param_nroPedido+'&param_nroFactura='+numeroFactura+'&param_tipo='+param_tipo+'&param_fecha='+param_fecha+'&param_codProveedor='+param_codProveedor+'&param_totalBI='+param_totalBI+'&param_descPorcentaje='+param_descPorcentaje+
                        '&param_montodescuento='+param_montodescuento+'&param_descuentoPP='+param_descuentoPP+'&param_montodescuentoPP='+param_montodescuentoPP+'&param_total='+param_total+
                        '&param_descuentoPP16='+param_descuentoPP16+'&param_totalNeto='+param_totalNeto,
                url: '../../controller/controlCompras/facturas_controller.php', 
                success: function(data){
                    //alert('registro correcto');
                },
                error: function(data){
                           
                }
            });
            //alert(numeroFactura);
        } else {
            //alert('REGISTRO NOTA DE VENTA');
            $.ajax({
                type: 'POST',        
                data:'param_opcion='+param_opcion+'&param_nroPedido='+param_nroPedido+'&param_nroFactura='+param_nroFactura+'&param_tipo='+param_tipo+'&param_fecha='+param_fecha+'&param_codProveedor='+param_codProveedor+'&param_totalBI='+param_totalBI+'&param_descPorcentaje='+param_descPorcentaje+
                        '&param_montodescuento='+param_montodescuento+'&param_descuentoPP='+param_descuentoPP+'&param_montodescuentoPP='+param_montodescuentoPP+'&param_total='+param_total+
                        '&param_descuentoPP16='+param_descuentoPP16+'&param_totalNeto='+param_totalNeto,
                url: '../../controller/controlCompras/facturas_controller.php', 
                success: function(data){
                    alert('registro correcto');
                },
                error: function(data){
                           
                }
            });
        }
    }
  
}

function vencimientos() { 
    //alert('Y ahora q pasa');
    var montoNeto = document.getElementById('param_totalNeto').value;
    open('vencimientos.php?montoNeto='+montoNeto,'','top=50,left=50,width=700,height=600') ; 
    //window.open('nuevoPedido.php','','top=50,left=50,width=1200,height=500');
}


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

function mostrarFacturas() {
    var param_opcion = 'mostrarFacturas';     
    $.ajax({
        type: 'POST',        
        data:'param_opcion='+param_opcion,
        url: '../../controller/controlCompras/facturas_controller.php', 
        success: function(data){
            $('#tablaFacturas').DataTable().destroy();
            $('#cuerpoFacturas').html(data);
            $('#tablaFacturas').DataTable();

        },
        error: function(data){
                   
        }
    });  
}

function agregarNumero() {
    //alert('jgfhsdjgdf');
    var param_tipoDoc = document.getElementById('param_tipo').value;
    if (param_tipoDoc == 'BOLETA') {
        document.getElementById('param_serie').disabled=false;
        document.getElementById('param_descuentoPP16').value='0';
        var total = document.getElementById('param_totalBI').value;
        var igv = document.getElementById('param_descuentoPP16').value;
        var final = parseFloat(total) + parseFloat(igv);
        document.getElementById('param_totalNeto').value=final;
        $('#descuento').hide();
        $('#descuentoPP').hide();
        $('#total').hide();
        $('#igv').hide();
    } else {
        if (param_tipoDoc == "FACTURA") {
            document.getElementById('param_serie').disabled=false;     
            var total = document.getElementById('param_total').value;
            var igv = (18/100)*parseFloat(total);
            var calculoIgv = parseFloat(igv).toFixed(2);
            document.getElementById('param_descuentoPP16').value= calculoIgv;
            var totalBI = document.getElementById('param_totalBI').value;
            final = parseFloat(totalBI)+parseFloat(calculoIgv);
            document.getElementById('param_totalNeto').value=final;   
            $('#descuento').show();
            $('#descuentoPP').show();
            $('#total').show();
            $('#igv').show();
        } else {
            document.getElementById('param_serie').disabled=true;
            document.getElementById('param_serie').value='';
            document.getElementById('param_nroFactura').value='';
            document.getElementById('param_descuentoPP16').value='0';
            var total = document.getElementById('param_totalBI').value;
            var igv = document.getElementById('param_descuentoPP16').value;
            var final = parseFloat(total) + parseFloat(igv);
            document.getElementById('param_totalNeto').value=final;
            $('#descuento').hide();
            $('#descuentoPP').hide();
            $('#total').hide();
            $('#igv').hide();
        }
    }
}



function cancelar(factura, estado) {    
    //alert("Listo para cancelar");
    var param_saldo = document.getElementById('param_saldo').value;
    if (estado == '1') {
        alert('La factura ya ha sido cancelada.')
    } else {
        if (param_saldo == '0') {
            alert('Usted no puede realizar el pago, la caja no esta abierta actualmente.')
        } else {
            $('#pagar_factura').modal({
                show:true,
                backdrop:'static',
            });
            obtenerSaldo();
            obtenerDatosFactura(factura);
        }
    }
    
}

function obtenerSaldo(){
    var opcion = 'mostrar_saldo';  
    $.ajax({
        type: 'POST',
        data:'param_opcion='+opcion,
        url: '../../controller/controlCompras/facturas_controller.php', 
        success: function(data){
            objeto=JSON.parse(data);
            $("#param_montoSaldo").val(objeto[1]);
            $("#param_detalleId").val(objeto[0]);
        },
        error: function(data){

        }
    });
}

function obtenerDatosFactura(factura){
    var opcion = 'mostrar_cabecera_factura';  
    $.ajax({
        type: 'POST',
        data:'param_opcion='+opcion+'&param_facturaId='+factura,
        url: '../../controller/controlCompras/facturas_controller.php', 
        success: function(data){
            objeto=JSON.parse(data);
            $("#param_numeroPagar").val(objeto[0]);
            $("#param_proveedorPagar").val(objeto[1]);
            $("#param_montoPagar").val(objeto[2]);
            document.getElementById('param_factura').value= factura;
        },
        error: function(data){

        }
    });
}

function obtenerCaja() {    
    //alert("Listo para cancelar");
    var param_opcion = 'obtener_caja';
    $.ajax({
        type: 'POST',        
        data:'param_opcion='+param_opcion,
        url: '../../controller/controlCompras/facturas_controller.php', 
        success: function(data){
            document.getElementById('param_saldo').value= data;   
        },
        error: function(data){
                   
        }
    });
}


function eliminarFactura(factura) {    
    //alert(factura);
    var param_opcion = 'anular_factura';
    var respuesta = confirm('¿Desea anular la factura?');
        if (respuesta == true) {
             $.ajax({
                type: 'POST',        
                data:'param_opcion='+param_opcion+'&param_facturaId='+factura,
                url: '../../controller/controlCompras/facturas_controller.php', 
                success: function(data){
                    mostrarFacturas();
                },
                error: function(data){
                           
                }
            });
        } else {
            if (respuesta == false) {
                alert('Se cancelo el registro')
            }
        }
}


function mostrarMenu()
{    
    var grupo = document.getElementById('NombreGrupo').value;
    var tarea = document.getElementById('NombreTarea').value;
    //alert(grupo);
    $.ajax({
        type:'POST',
        data: 'opcion=mostrarMenu&grupo='+grupo+'&tarea='+tarea,        
        url: "../../controller/controlusuario/usuario.php",
        success:function(data){                              
            $('#permisos').html(data);                
        }
    });
    //alert("kjb");
}



