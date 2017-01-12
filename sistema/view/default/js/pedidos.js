
window.numeroDetallePedido = [];
window.productoId = [];
window.cantidadUC = [];
window.cantidadUV = [];
window.pedidosPrecios = [];
window.impuestoIva = [];
window.pedidoDescuento = [];
window.importeProducto = [];

$(document).ready(function() {
  $('#tablaPedidos').DataTable();
  $('#tablaDetalles').DataTable();
  $('#tablaProveedores').DataTable();        
  $('#tablaProductos').DataTable();
  $('#tablaEntregas').DataTable();
  mostrarPedidos();
  mostrarNumeroPedido();
  mostrarMenu(); 
  mostrarEntregas();
  agregarDetallePedido();
  //editarCabecera(); 
  montoProductosDetalle = 0;
  descuentoPP = 0;
  total = 0;
  descPorcentaje = 0;
  totalBI = 0;
  neto = 0;
  descPP = 0;
  $('#param_fecha').datetimepicker({
      pickTime: false,
      format: 'YYYY-MM-DD',
      language: 'es'
  }); 
  
  $('#param_fechaEntrega').datetimepicker({
      pickTime: false,
      format: 'YYYY-MM-DD',
      language: 'es',
  });

  $('#param_desde').datetimepicker({
      pickTime: false,
      format: 'YYYY-MM-DD',
      language: 'es'
  });

  $('#param_hasta').datetimepicker({
      pickTime: false,
      format: 'YYYY-MM-DD',
      language: 'es'
  });

});

$(function() {
   $('#buscarProveedor').on('click', function(){
       //alert('Agregar Proveeor');
       $('#verProveedor').modal({
            show:true,
            backdrop:'static',
        });
        var param_opcion = 'mostrarProveedores'
        $.ajax({
          type: 'POST',        
          data:'param_opcion='+param_opcion,
          url: '../../controller/controlCompras/pedidos_controller.php',          
          success: function(data){
            $('#tablaProveedores').DataTable().destroy();
            $('#cuerpoProveedores').html(data);
            $('#tablaProveedores').DataTable();
          },
          error: function(data){
                     
          }
        });     
     
    });  

   $('#buscarProductos').on('click', function(){
       //alert('Agregar Proveeor');
       var Proveedor = document.getElementById('param_proveedor').value;
       if (Proveedor == '') {
        alert('Seleccionar un Proveedor');
       } else {
          $('#verProducto').modal({
            show:true,
            backdrop:'static',
          });
         var param_codigoProveedor = document.getElementById('param_codigoProveedor').value;
         var param_opcion = 'mostrarProductos'
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
       }
        
     
    }); 

    $('#buscarPedidos').on('click', function(){
       //alert('Agregar Proveeor');
       var param_desde = document.getElementById('param_desde').value;
       var param_hasta = document.getElementById('param_hasta').value;
       var param_opcion = 'buscarPedidos'
       if (param_desde == ''  && param_hasta == '') {
          //alert('fsgdfg');
          mostrarEntregas();
       } else {
          $.ajax({
            type: 'POST',        
            data:'param_opcion='+param_opcion+'&param_desde='+param_desde+'&param_hasta='+param_hasta,
            url: '../../controller/controlCompras/pedidos_controller.php', 
            success: function(data){
              $('#tablaEntregas').DataTable().destroy();
              $('#cuerpoEntregas').html(data);
              $('#tablaEntregas').DataTable();
            },
            error: function(data){
                       
            }
          });  
       }
    }); 

   $('#tablaProveedores tbody').on('dblclick', 'tr', function () {seleccionDobleProveedor(this);});
   $('#tablaProductos tbody').on('dblclick', 'tr', function () {seleccionDobleProductos(this);});

   $('#register_pedido').on('click', function(){
       //alert('Listo para realizar el registro');
       var param_opcion = 'registroPedido';
       var param_nroPedido = document.getElementById('param_nroPedido').value;
       var param_fecha = document.getElementById('param_fecha').value;
       var param_fechaEntrega = document.getElementById('param_fechaEntrega').value;
       var param_codigoProveedor = document.getElementById('param_codigoProveedor').value;
       var param_observaciones = document.getElementById('param_observaciones').value;
       var param_totalBI = document.getElementById('param_totalBI').value;
       var param_descPorcentaje = document.getElementById('param_descPorcentaje').value;
       var param_montodescuento = document.getElementById('param_montodescuento').value;
       var param_descuentoPP = document.getElementById('param_descuentoPP').value;
       var param_montodescuentoPP = document.getElementById('param_montodescuentoPP').value;
       var param_total = document.getElementById('param_total').value;      
       var param_descuentoPP16 = document.getElementById('param_descuentoPP16').value;
       var param_totalNeto = document.getElementById('param_totalNeto').value;

        
       var table = $('#tablaDetallesPedido').DataTable();

       var respuesta = confirm('¿Desea registrar el pedido?');
       if (respuesta == true) {
            //alert('Registrar');
            $.ajax({
                type: 'POST',
                data:'param_opcion='+param_opcion+'&param_nroPedido='+param_nroPedido+'&param_fecha='+param_fecha+'&param_fechaEntrega='+param_fechaEntrega+
                    '&param_codigoProveedor='+param_codigoProveedor+'&param_observaciones='+param_observaciones+'&param_totalBI='+param_totalBI+'&param_descPorcentaje='+param_descPorcentaje+
                    '&param_montodescuento='+param_montodescuento+'&param_descuentoPP='+param_descuentoPP+'&param_montodescuentoPP='+param_montodescuentoPP+'&param_total='+param_total+
                    '&param_descuentoPP16='+param_descuentoPP16+'&param_totalNeto='+param_totalNeto+
                    '&param_numeroDetallePedido='+numeroDetallePedido+'&param_productoId='+productoId+'&param_cantidadUC='+cantidadUC+
                    '&param_cantidadUV='+cantidadUV+'&param_pedidosPrecios='+pedidosPrecios+'&param_impuestoIva='+impuestoIva+
                    '&param_pedidoDescuento='+pedidoDescuento+'&param_importeProducto='+importeProducto,
                url: '../../controller/controlCompras/pedidos_controller.php', 
                success: function(data){
                    alert('Pedido Registrado Correctamente');
                    location.href='pedidos.php'
                    //mostrarProveedores();
                   document.getElementById('param_proveedor').value = '';
                   document.getElementById('param_nroPedido').value = '';
                   document.getElementById('param_fecha').value = '';
                   document.getElementById('param_fechaEntrega').value = '';
                   document.getElementById('param_codigoProveedor').value = '';
                   document.getElementById('param_observaciones').value = '';
                   document.getElementById('param_totalBI').value = '';
                   document.getElementById('param_descPorcentaje').value = '0';
                   document.getElementById('param_montodescuento').value = '0';
                   document.getElementById('param_descuentoPP').value = '0';
                   document.getElementById('param_montodescuentoPP').value = '0';
                   document.getElementById('param_total').value = '';
                   document.getElementById('param_descuento7').value = '0.00';
                   document.getElementById('param_descuentoPP16').value = '0.00';
                   document.getElementById('param_totalNeto').value = '';
                   table
                        .clear()
                        .draw(); 
                    numeroDetallePedido = [];
                    productoId = [];
                    cantidadUC = [];
                    cantidadUV = [];
                    pedidosPrecios = [];
                    impuestoIva = [];
                    pedidoDescuento = [];
                    importeProducto = [];

                },
                error: function(data){
                    //$('#cuerpoTabla').html(respuesta);
                }
            });
       } else {
        if (respuesta == false) {
          alert('Se cancelo el registro')
        }
      } 
    });


   
});

function abrir() { 
  open('nuevoPedido.php','','top=50,left=50,width=1200,height=500') ; 
  //window.open('nuevoPedido.php','','top=50,left=50,width=1200,height=500');    
    
}

function cerrar() { 
  location.href='pedidos.php';
}

function seleccionDobleProveedor(e){
    if ($('#tablaProveedores tbody tr td').length == 1){
       return false;
    }
    

    if ( $(e).hasClass('selected')){
        $(e).removeClass('selected');
    }
    else {
        $('#tablaProveedores').DataTable().$('tr.selected').removeClass('selected');
        $(e).addClass('selected');
    }
    document.getElementById('param_codigoProveedor').value = $('#tablaProveedores').DataTable().cell('.selected', 0).data();
    document.getElementById('param_proveedor').value = $('#tablaProveedores').DataTable().cell('.selected', 1).data();  
    $('#verProveedor').modal('hide');
}

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
    document.getElementById('param_precio').value = $('#tablaProductos').DataTable().cell('.selected', 6).data(); 
    document.getElementById('param_iva').value = $('#tablaProductos').DataTable().cell('.selected', 7).data();  
    $('#verProducto').modal('hide');
    document.getElementById('addRow').disabled = false; 
}

function agregarDetallePedido() {
    var counter = 1;
    var t = $('#tablaDetallesPedido').DataTable();


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

        if (cantidad == '0') {
          alert('Debe ingresar una cantidad mayor a cero.');
        } else {
          if (cantidad < 0) {
            alert('Debe ingrese una cantidad positiva.');
          } else {
            if (productoId.indexOf(codigo) >= 0) {
              alert('El producto ya ha sido agregado.');
            } else {
              t.row.add( [
                '<center>'+codigo+'</center>',
                descripcion,
                '<center>'+cantidad+'</center>',
                '<center>'+cantidad+'</center>',
                '<center>'+precio+'</center>',
                '<center>'+iva+'</center>',
                '<center>'+descuento+'</center>',
                '<center>'+importe.toFixed(2)+'</center>',
                '<button class="btn btn-danger btn-xs center deleteValid col-md-offset-2" onclick="Eliminar('+"'"+codigo+"'"+','+"'"+cantidad+"'"+','+"'"+precio+"'"+','+"'"+iva+"'"+','+"'"+descuento+"'"+','+importe+','+counter+')">Eliminar</button>',
              ] ).draw( false );
              
              //cursoId.push(codigo);
              productoId.push(codigo);
              numeroDetallePedido.push(counter);
              counter++;
              montoProductosDetalle = montoProductosDetalle + importe;
              descuentoPP = montoProductosDetalle * (18/100);
              totalNeto = montoProductosDetalle + descuentoPP;
              cantidadUC.push(cantidad);
              cantidadUV.push(cantidad);
              pedidosPrecios.push(precio);
              impuestoIva.push(iva);
              pedidoDescuento.push(descuento);
              importeProducto.push(importe);

              document.getElementById('param_codProducto').value="";
              document.getElementById('param_producto').value="";
              document.getElementById('param_cantidad').value="1";
              document.getElementById('param_precio').value="0"; 
              document.getElementById('param_iva').value="";
              document.getElementById('param_descuento').value="";             
              document.getElementById('param_totalBI').value=montoProductosDetalle;
              document.getElementById('param_total').value=montoProductosDetalle;
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
            }
          }
        }        

    } );

    $('#tablaDetallesPedido tbody').on( 'click', 'button', function () {
        t
            .row( $(this).parents('tr') )
            .remove()
            .draw();
    });

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


function Eliminar(codigo,cantidad,precio,iva,descuento,importe,counter) {  
    //alert(importe);
    document.getElementById('param_totalBI').value=document.getElementById('param_totalBI').value - parseFloat(importe) ;
    montoProductosDetalle = montoProductosDetalle - importe;
    descuentoPP = parseFloat(montoProductosDetalle) * (18/100);

    var varTotalBI = document.getElementById('param_totalBI').value;


    //var montoBI = document.getElementById('param_totalBI').value;
    var descPorcEli = document.getElementById('param_descPorcentaje').value;
    descPorcentaje = parseFloat(varTotalBI) * parseFloat(descPorcEli/100);
    document.getElementById('param_montodescuento').value= descPorcentaje.toFixed(2);
    //document.getElementById('param_total').value=parseFloat(montoBI)-parseFloat(descPorcentaje);

    // para el descuento PP        
    var descPorcPPEli = document.getElementById('param_descuentoPP').value;
    descPorcentajePP = parseFloat(varTotalBI) * parseFloat(descPorcPPEli/100);
    document.getElementById('param_montodescuentoPP').value=descPorcentajePP.toFixed(2);
    var deleteTotal = parseFloat(varTotalBI)-parseFloat(descPorcentaje)-parseFloat(descPorcentajePP);
    document.getElementById('param_total').value=deleteTotal.toFixed(2);
    //alert(descPorc);

    document.getElementById('param_descuentoPP16').value=descuentoPP.toFixed(2);


    var varTotalEli = document.getElementById('param_total').value;
    neto = parseFloat(varTotalEli)+parseFloat(descuentoPP);
    document.getElementById('param_totalNeto').value=neto.toFixed(2);


    var pos = productoId.indexOf(codigo);
    var pos2 = numeroDetallePedido.indexOf(counter);
    var pos3 = cantidadUC.indexOf(cantidad);
    var pos4 = cantidadUV.indexOf(cantidad);

    var pos5 = pedidosPrecios.indexOf(precio);
    var pos6 = impuestoIva.indexOf(iva);

    var pos7 = pedidoDescuento.indexOf(descuento);
    var pos8 = importeProducto.indexOf(importe);
 
    
    
    productoId.splice(pos, 1);
    numeroDetallePedido.splice(pos2, 1);
    cantidadUC.splice(pos, 1);
    cantidadUV.splice(pos, 1);
    pedidosPrecios.splice(pos, 1);
    impuestoIva.splice(pos, 1);
    pedidoDescuento.splice(pos, 1);
    importeProducto.splice(pos, 1);
}


function mostrarPedidos(){ 
    var param_opcion = 'mostrarPedidos';     
    $.ajax({
        type: 'POST',        
        data:'param_opcion='+param_opcion,
        url: '../../controller/controlCompras/pedidos_controller.php', 
        success: function(data){
            $('#tablaPedidos').DataTable().destroy();
            $('#cuerpoPedidos').html(data);
            $('#tablaPedidos').DataTable();

        },
        error: function(data){
                   
        }
    });    
}

function entregar(pedido){ 
  //alert(pedido); 
  location.href='realizarEntrega.php?pedido=' + pedido;
}

function imprimir(pedido){ 
  //alert(pedido); 
  open("../../Reportes/pedidoPDF.php?pedido=" + pedido + "", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes, top=100,left=300, width: 800,height: 400");
}

/*function entregar(pedido){ 
    //alert('entrega');
    var resp = confirm('Si deea realizar la entrega TOTAL del pedido, pulse SI.\nCaso contrario, pulse NO');
       if (resp == true) {
            var param_nroPedido = pedido; 
            var param_opcion = 'entregarPedido';     
                $.ajax({
                    type: 'POST',        
                    data:'param_opcion='+param_opcion+'&param_nroPedido='+param_nroPedido,
                    url: '../controller/controlCompras/pedidos_controller.php', 
                    success: function(data){
                        mostrarPedidos();
                        //alert(param_nroPedido);

                    },
                    error: function(data){
                               
                    }
                });    
       } else {
        if (resp == false) {
            mostrarPedidos();
        }
       }
}*/

function mostrarNumeroPedido() {   
     var param_opcion = 'numero_pedido';
     $.ajax({
        type: 'POST',        
        data:'param_opcion='+param_opcion,
        url: '../../controller/controlCompras/pedidos_controller.php', 
        success: function(data){
          //$('#permisos').html(data);
          document.getElementById('param_nroPedido').value= data;
        },
        error: function(data){
                   
        }
    });
}

function editar(pedido){ 
    //alert('Listo para editar');
  open("editar_pedido.php?pedido=" + pedido + "","","top=50,left=50,width=1200,height=500"); 
  //open('nuevoPedido.php','','top=50,left=50,width=1200,height=500') ;     
     
}

function cancelarPedido(pedido, estado){ 
  //alert(pedido);
  //alert(estado);
  if (estado == '2' || estado == '1') {
    alert('No se puede anular el pedido porque ya ha sido recibido.')
  } else {
    if (estado == '0') {
      var param_opcion = 'anular_pedido';
      $.ajax({
        type: 'POST',        
        data:'param_opcion='+param_opcion+'&param_nroPedido='+pedido,
        url: '../../controller/controlCompras/pedidos_controller.php', 
        success: function(data){
          mostrarPedidos();
        },
        error: function(data){
                   
        }
    });
    }
  }
 
  
  //open('nuevoPedido.php','','top=50,left=50,width=1200,height=500') ;     
     
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


function cerrarFactura() { 
    close('facturar.php') ; 
    //window.open('nuevoPedido.php','','top=50,left=50,width=1200,height=500');
}


function vencimientos() { 
    //alert('Y ahora q pasa');
    open('vencimientos.php','','top=50,left=50,width=700,height=600') ; 
    //window.open('nuevoPedido.php','','top=50,left=50,width=1200,height=500');
}

function mostrarEntregas(){ 
    var param_opcion = 'mostrarEntregas';     
    $.ajax({
        type: 'POST',        
        data:'param_opcion='+param_opcion,
        url: '../../controller/controlCompras/pedidos_controller.php', 
        success: function(data){
            $('#tablaEntregas').DataTable().destroy();
            $('#cuerpoEntregas').html(data);
            $('#tablaEntregas').DataTable();

        },
        error: function(data){
                   
        }
    });    
}

/*function editarCabecera() {
  var param_nroPedido = document.getElementById('param_operacion').value;
  var param_opcion = 'mostrarCabecera'; 
  //alert(param_nroPedido);
  $.ajax({
        type: 'POST',        
        data:'param_opcion='+param_opcion+'&param_nroPedido='+param_nroPedido,
        url: '../controller/controlCompras/pedidos_controller.php', 
        success: function(data){
            objeto=JSON.parse(data);
            $("#param_nroPedido").val(objeto[0]);
            $("#param_fecha").val(objeto[1]);
            $("#param_fechaEntrega").val(objeto[2]);
            $("#param_proveedor").val(objeto[3]);
            $("#param_observaciones").val(objeto[4]);
            $("#param_totalBI").val(objeto[5]);
            $("#param_descPorcentaje").val(objeto[6]);
            $("#param_montodescuento").val(objeto[7]);
            $("#param_descuentoPP").val(objeto[8]);
            $("#param_montodescuentoPP").val(objeto[9]);
            $("#param_total").val(objeto[10]);
            $("#param_descuento7").val(objeto[11]);
            $("#param_descuentoPP16").val(objeto[12]);
            $("#param_totalNeto").val(objeto[13]);
        },
        error: function(data){
                   
        }
    });
}*/

function mostrar() {
    console.log(productoId.toString());
    console.log(numeroDetallePedido.toString());
    console.log(cantidadUC.toString());
    console.log(cantidadUV.toString());
    console.log(pedidosPrecios.toString());
    console.log(impuestoIva.toString());
    console.log(pedidoDescuento.toString());
    console.log(importeProducto.toString());
    //console.log(cursoId.length);
}
//onclick="Eliminar('+"'"+codigo+"'"+','+counter+','+total+', '+"'"+idHorario+"'"+')"

function mostrarMenu()
{    
    var grupo = document.getElementById('NombreGrupo').value;
    var tarea = document.getElementById('NombreTarea').value;
    
    $.ajax({
        type:'POST',
        data: 'opcion=mostrarMenu&grupo='+grupo+'&tarea='+tarea,        
        url: "../../controller/controlusuario/usuario.php",
        success:function(data){                              
            $('#permisos').html(data);                
        }
    });
    
}