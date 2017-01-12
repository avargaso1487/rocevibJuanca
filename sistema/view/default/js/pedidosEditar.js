
window.numeroDetallePedido = [];
window.productoId = [];
window.cantidadUC = [];
window.cantidadUV = [];
window.pedidosPrecios = [];
window.impuestoIva = [];
window.pedidoDescuento = [];
window.importeProducto = [];

$(document).ready(function() {
  $('#tablaDetallesPedidoEditar').DataTable();
  $('#tablaDetalles').DataTable();
  $('#tablaProveedores').DataTable();        
  $('#tablaProductos').DataTable();
  $('#tablaEntregas').DataTable();
  mostrarMenu(); 
  mostrarCabecera();
  mostrarDetalle();
  agregarDetallePedido();
  //editarCabecera(); 
  montoProductosDetalle = 0;
  descuentoPP = 0;
  total = 0;
  descPorcentaje = 0;
  totalBI = 0;
  neto = 0;
  descPP = 0;
  
});

$(function() {
  
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

    $('#register_editar').on('click', function(){
       //alert('Agregar Proveeor');
       var param_producto = document.getElementById('param_codProductoEditar').value;
       var param_cantidad = document.getElementById('param_cantidadEditar').value;
       var param_precios = document.getElementById('param_precioEditar').value;
       var param_igv = document.getElementById('param_igvEditar').value;
       var param_descuento = document.getElementById('param_descuentoEditar').value;
       var param_pedido = document.getElementById('param_nroPedidoEditar').value;
       var param_opcion = 'editar_detalle_pedido'
       var descuento = parseFloat(param_descuento);
       var desc= 0;
       var precioBruto= 0;
       var descontar= 0;
       var importe= 0;

        desc = descuento;
        precioBruto = (parseFloat(param_precios) * parseFloat(param_cantidad));

       if (desc > 0) {
          desc  = precioBruto* (desc/100);
          descontar = desc;
       } else {
          param_descuento = 0;
       }

       importe = precioBruto - descontar;

       var param_importe = importe.toFixed(2);

       if (param_cantidad == '0') {
          alert('Ingrese una cantidad mayor a cero.');
       } else {
          $.ajax({
            type: 'POST',        
            data:'param_opcion='+param_opcion+'&param_producto='+param_producto+'&param_cantidad='+param_cantidad+'&param_precios='+param_precios+'&param_igv='+param_igv+'&param_descuento='+param_descuento+'&param_importe='+param_importe+'&param_nroPedido='+param_pedido,
            url: '../../controller/controlCompras/pedidos_controller.php', 
            url: '../../controller/controlCompras/pedidos_controller.php', 
            success: function(data){
              $('#editarDetalle').modal('hide'); 
              mostrarDetalle();
            },
            error: function(data){
                       
            }
          });  
       }
    }); 

    $('#cancel_editar').on('click', function(){
       //alert('Agregar Proveeor');
       $('#editarDetalle').modal('hide');
       document.getElementById('param_codProductoEditar').val= '';
       document.getElementById('param_cantidadEditar').val= '';
       document.getElementById('param_precioEditar').val= '';
       document.getElementById('param_igvEditar').val= '';
       document.getElementById('param_descuentoEditar').val= '';
       document.getElementById('param_nroPedidoEditar').val= '' 
    }); 

   $('#tablaProveedores tbody').on('dblclick', 'tr', function () {seleccionDobleProveedor(this);});
   $('#tablaProductos tbody').on('dblclick', 'tr', function () {seleccionDobleProductos(this);});

   $('#register_pedido').on('click', function(){
       alert('Se modifico correctamente el pedido.');
       window.close();
    });


   
});

function abrir() { 
  open('nuevoPedido.php','','top=50,left=50,width=1200,height=500') ; 
  //window.open('nuevoPedido.php','','top=50,left=50,width=1200,height=500');    
    
}

function cerrar() { 
  window.close();
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

function mostrarCabecera() {    
    var param_opcion = 'mostrar_cabecera';
    var param_pedido = document.getElementById('param_nroPedidoEditar').value;
    $.ajax({
        type:'POST',
        data:'param_opcion='+param_opcion+'&param_pedido='+param_pedido,      
        url: '../../Controller/ControlCompras/entregas_controller.php',
        success:function(data){                              
            objeto=JSON.parse(data);
            //$("#param_nroPedido").val(objeto[0]);
            document.getElementById('param_fecha').value = (objeto[1]);
            document.getElementById('param_fechaEntrega').value = (objeto[13]);         
            document.getElementById('param_proveedor').value = (objeto[2]);      
            document.getElementById('param_codigoProveedor').value = (objeto[12]);
            document.getElementById('param_observaciones').value = (objeto[3]);
            document.getElementById('param_totalBI').value = (objeto[4]);              
            document.getElementById('param_descPorcentaje').value = (objeto[5]);
            document.getElementById('param_montodescuento').value = (objeto[6]);
            document.getElementById('param_descuentoPP').value = (objeto[7]);
            document.getElementById('param_montodescuentoPP').value = (objeto[8]);
            document.getElementById('param_total').value = (objeto[9]);
            document.getElementById('param_descuentoPP16').value = (objeto[10]);
            document.getElementById('param_totalNeto').value = (objeto[11]);
        }
    });
    
}

function mostrarDetalle() {    
    var param_opcion = 'mostrarDetalle2';
    var param_pedido = document.getElementById('param_nroPedidoEditar').value;
    $.ajax({
        type:'POST',
        data:'param_opcion='+param_opcion+'&param_nroPedido='+param_pedido,      
        url: '../../Controller/ControlCompras/pedidos_controller.php',
        success:function(data){                              
            $('#tablaDetallesPedidoEditar').DataTable().destroy();
            $('#cuerpoDetallesPedidoEditar').html(data);
            $('#tablaDetallesPedidoEditar').DataTable();
        }
    });
    
}

function editarDetallePedido(producto) {    
    var param_pedido = document.getElementById('param_nroPedidoEditar').value;
    var param_opcion = 'editar_detalle';
    //alert(param_pedido+' '+produto); 
    $('#editarDetalle').modal({
        show:true,
        backdrop:'static',
    });

    $.ajax({
        type: 'POST',        
        data:'param_opcion='+param_opcion+'&param_nroPedido='+param_pedido+'&param_producto='+producto,
        url: '../../Controller/ControlCompras/pedidos_controller.php',
        success: function(data){
            objeto=JSON.parse(data);
            document.getElementById('param_codProductoEditar').value = (objeto[0]);         
            document.getElementById('param_productoEditar').value = (objeto[1]);
            document.getElementById('param_precioEditar').value = (objeto[4]);
            document.getElementById('param_igvEditar').value = (objeto[5]);
            document.getElementById('param_descuentoEditar').value = (objeto[6]); 
            document.getElementById('param_cantidadEditar').value = (objeto[2]);            
        },
        error: function(data){
                   
        }
    });
    
}



function mostrarMenu() {    
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