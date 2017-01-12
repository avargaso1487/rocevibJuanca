
window.productoId = [];
window.cantidadA = [];
window.precioA = [];
window.stockA = [];
window.igvA = [];


$(document).ready(function() {
    $('#tablaEntregas').DataTable(); 
    $('#tablaDetallesEntregas').DataTable();   
    $('#tablaDetalleEnvio').DataTable(); 
    $('#tablaDetalleProductoAlmacen').DataTable(); 
    $('#tablaProductos').DataTable(); 
    $('#tablaAlmacen').DataTable(); 
    mostrarCabecera();
    mostrarMenu();
    motrarAlmacenOrigen();
    //motrarAlmacenDestino();
    agregarDetalleAlmacen();
});



$(function() {
    $('#buscarProductos').on('click', function(){
       //alert('Agregar Proveeor');
       var almacen = document.getElementById('param_almacen').value;
       var pedido = document.getElementById('param_pedido').value;
       //alert(almacen);
       if (almacen == '') {
        alert('Seleccionar un Almacen');
       } else {
          $('#verProducto').modal({
            show:true,
            backdrop:'static',
          });
         
         var param_opcion = 'mostrar_productos'
          $.ajax({
            type: 'POST',        
            data:'param_opcion='+param_opcion+'&param_pedido='+pedido,
            url: '../../controller/controlCompras/almacen_controller.php', 
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

    $('#buscarProductosEnviar').on('click', function(){
       //alert('Agregar Proveeor');
       var param_almacen = document.getElementById('param_almacen').value;
       //alert(almacen);
       if (param_almacen == '') {
        alert('Seleccionar un Almacen');
       } else {
          $('#verProductoEnviar').modal({
            show:true,
            backdrop:'static',
          });
         
         var param_opcion = 'mostrar_productos_enviar'
          $.ajax({
            type: 'POST',        
            data:'param_opcion='+param_opcion+'&param_almacen='+param_almacen,
            url: '../../controller/controlCompras/almacen_controller.php', 
            success: function(data){
              $('#tablaProductosEnviar').DataTable().destroy();
              $('#cuerpoProductosEnviar').html(data);
              $('#tablaProductosEnviar').DataTable();
            },
            error: function(data){
                       
            }
          }); 
       }            
    });

    $('#buscarProductosAlmacen').on('click', function(){
        var param_almacen = document.getElementById('param_almacen').value;
        var param_opcion = 'gestion_almacen'
        if (param_almacen == '') {
            alert('Seleccione un Almacén.');
        } else {
            $.ajax({
                type: 'POST',        
                data:'param_opcion='+param_opcion+'&param_almacen='+param_almacen,
                url: '../../controller/controlCompras/almacen_controller.php', 
                success: function(data){
                  $('#tablaAlmacen').DataTable().destroy();
                  $('#cuerpoAlmacen').html(data);
                  $('#tablaAlmacen').DataTable();
                },
                error: function(data){
                           
                }
              }); 
        }
        
             
    });

    $('#buscarProductosAlmacenManual').on('click', function(){
        var param_almacen = document.getElementById('param_almacen').value;
       //alert(almacen);
       if (param_almacen == '') {
        alert('Seleccionar un Almacen');
       } else {
          $('#verProductoAlmacen').modal({
            show:true,
            backdrop:'static',
          });
         
         var param_opcion = 'mostrar_productos_manual'
          $.ajax({
            type: 'POST',        
            data:'param_opcion='+param_opcion,
            url: '../../controller/controlCompras/almacen_controller.php', 
            success: function(data){
              $('#tablaProductosAlmacen').DataTable().destroy();
              $('#cuerpoProductosAlmacen').html(data);
              $('#tablaProductosAlmacen').DataTable();
            },
            error: function(data){
                       
            }
          }); 
       }            
    });




    $('#register_almacen').on('click', function(){
       //alert('Listo para realizar el registro');
       var param_opcion = 'registro_producto_almacen';
       var param_nroPedido = document.getElementById('param_pedido').value;
       var param_fecha = document.getElementById('param_fechaEntrega').value;
       var param_proveedor = document.getElementById('param_codProveedor').value;
       var param_cantidad = document.getElementById('param_cantidad').value;
       var param_almacen = document.getElementById('param_almacen').value;
        
       var table = $('#tablaDetallesEntregas').DataTable();
        if (productoId.length == 0) {
            alert('Debe seleccionar un producto')
        } else {
            var respuesta = confirm('¿Desea registrar los producto? \n Los el stock se actualizara.');
           if (respuesta == true) {
                //alert('Registrar');
                $.ajax({
                    type: 'POST',
                    data:'param_opcion='+param_opcion+'&param_nroPedido='+param_nroPedido+'&param_fecha='+param_fecha+
                        '&param_codigoProveedor='+param_proveedor+'&param_productoId='+productoId+'&param_stock='+stockA+
                        '&param_precio='+precioA+'&param_cantidad='+cantidadA+'&param_almacen='+param_almacen,
                    url: '../../controller/controlCompras/almacen_controller.php', 
                    success: function(data){
                        alert('Se ha modificado el stock de los productos.');
                        //location.href='pedidos.php'
                        //mostrarProveedores();
                       document.getElementById('param_cantidad').value = '';
                       document.getElementById('param_familia').value = '';
                       document.getElementById('param_almacen').value = '';    
                       document.getElementById('param_almacen').disabled = false;             
                       table
                            .clear()
                            .draw(); 

                        productoId = [];
                        cantidadA = [];
                        precioA = [];
                        stockA = [];
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
        }
       
    });

     $('#transferir_productos').on('click', function(){
       //alert('Listo para realizar el registro');
       var param_opcion = 'registro_transferencia_almacen';
       var param_origen = document.getElementById('param_almacen').value;
       var destino = document.getElementById('param_destino').value;       
        
       var table2 = $('#tablaDetalleEnvio').DataTable();

        if (productoId.length == 0) {
            alert('Debe seleccionar un producto')
        } else {
            var respuesta = confirm('¿Desea realizar la transferencia de los productos?');
           if (respuesta == true) {
                //alert('Registrar');
                $.ajax({
                    type: 'POST',
                    data:'param_opcion='+param_opcion+'&param_almacen='+param_origen+'&param_destino='+destino+
                        '&param_productoId='+productoId+'&param_stock='+stockA+
                        '&param_precio='+precioA+'&param_cantidad='+cantidadA+'&param_igv='+igvA,
                    url: '../../controller/controlCompras/almacen_controller.php', 
                    success: function(data){
                        alert('Se ha modificado el stock de los productos.');
                        //location.href='pedidos.php'
                        //mostrarProveedores();
                       document.getElementById('param_cantidad').value = '';
                       document.getElementById('param_destino').value = '';
                       document.getElementById('param_almacen').value = '';     
                       table2
                            .clear()
                            .draw(); 

                        productoId = [];
                        cantidadA = [];
                        precioA = [];
                        stockA = [];
                        igvA = [];
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
        }
       
    });

     $('#enviar_productos_almacen').on('click', function(){
       //alert('Listo para realizar el registro');
       var param_opcion = 'registro_producto_almacen_manual';
       var param_almacen = document.getElementById('param_almacen').value;
        
       var table3 = $('#tablaDetalleProductoAlmacen').DataTable();
        if (productoId.length == 0) {
            alert('Debe seleccionar un producto')
        } else {
            var respuesta = confirm('¿Desea registrar los producto? \n Los el stock se actualizara.');
           if (respuesta == true) {
                //alert('Registrar');
                $.ajax({
                    type: 'POST',
                    data:'param_opcion='+param_opcion+'&param_almacen='+param_almacen+'&param_productoId='+productoId+'&param_stock='+stockA+
                        '&param_precio='+precioA+'&param_cantidad='+cantidadA,
                    url: '../../controller/controlCompras/almacen_controller.php', 
                    success: function(data){
                        alert('Se ha registrado los productos en el almacen');
                        //location.href='pedidos.php'
                        //mostrarProveedores();
                       document.getElementById('param_cantidad').value = '0';
                       document.getElementById('param_almacen').value = '';    
                       document.getElementById('param_almacen').disabled = false;             
                       table3
                            .clear()
                            .draw(); 

                        productoId = [];
                        cantidadA = [];
                        precioA = [];
                        stockA = [];
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
        }
       
    });

    $('#tablaProductos tbody').on('dblclick', 'tr', function () {seleccionDobleProductos(this);});
    $('#tablaProductosEnviar tbody').on('dblclick', 'tr', function () {seleccionDobleProductosEnviar(this);});
    $('#tablaProductosAlmacen tbody').on('dblclick', 'tr', function () {seleccionDobleProductosManual(this);});

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
    document.getElementById('param_producto').value = $('#tablaProductos').DataTable().cell('.selected', 1).data();
    document.getElementById('param_codProducto').value = $('#tablaProductos').DataTable().cell('.selected', 0).data();
    document.getElementById('param_familia').value = $('#tablaProductos').DataTable().cell('.selected', 2).data(); 
    document.getElementById('param_cantidad').value = $('#tablaProductos').DataTable().cell('.selected', 3).data();  
    document.getElementById('param_precio').value = $('#tablaProductos').DataTable().cell('.selected', 4).data();
    document.getElementById('param_stock').value = $('#tablaProductos').DataTable().cell('.selected', 5).data();
    $('#verProducto').modal('hide');
    document.getElementById('addRow').disabled = false; 
    document.getElementById('param_almacen').disabled = true; 
}

function seleccionDobleProductosEnviar(e){
    if ($('#tablaProductosEnviar tbody tr td').length == 1){
       return false;
    }
    

    if ( $(e).hasClass('selected')){
        $(e).removeClass('selected');
    }
    else {
        $('#tablaProductosEnviar').DataTable().$('tr.selected').removeClass('selected');
        $(e).addClass('selected');
    }
    document.getElementById('param_producto').value = $('#tablaProductosEnviar').DataTable().cell('.selected', 1).data();
    document.getElementById('param_codProducto').value = $('#tablaProductosEnviar').DataTable().cell('.selected', 0).data();
    document.getElementById('param_precio').value = $('#tablaProductosEnviar').DataTable().cell('.selected', 4).data();
    document.getElementById('param_igv').value = $('#tablaProductosEnviar').DataTable().cell('.selected', 5).data();
    document.getElementById('param_stock').value = $('#tablaProductosEnviar').DataTable().cell('.selected', 3).data();
    $('#verProductoEnviar').modal('hide');
    document.getElementById('addRow2').disabled = false; 
    
}

function seleccionDobleProductosManual(e){
    if ($('#tablaProductosAlmacen tbody tr td').length == 1){
       return false;
    }
    

    if ( $(e).hasClass('selected')){
        $(e).removeClass('selected');
    }
    else {
        $('#tablaProductosAlmacen').DataTable().$('tr.selected').removeClass('selected');
        $(e).addClass('selected');
    }
    document.getElementById('param_producto').value = $('#tablaProductosAlmacen').DataTable().cell('.selected', 1).data();
    document.getElementById('param_codProducto').value = $('#tablaProductosAlmacen').DataTable().cell('.selected', 0).data();
    document.getElementById('param_precio').value = $('#tablaProductosAlmacen').DataTable().cell('.selected', 3).data();   
    $('#verProductoAlmacen').modal('hide');
    document.getElementById('addRow3').disabled = false; 
    
}

function agregarDetalleAlmacen() {
    var counter = 1;
    var t = $('#tablaDetallesEntregas').DataTable();   
    var t2 = $('#tablaDetalleEnvio').DataTable(); 
    var t3 = $('#tablaDetalleProductoAlmacen').DataTable(); 


    $('#addRow').on( 'click', function () {
        var codigo              = document.getElementById('param_codProducto').value;
        var descripcion         = document.getElementById('param_producto').value;
        var cantidad            = document.getElementById('param_cantidad').value;
        var precio              = document.getElementById('param_precio').value;
        var stock                 = document.getElementById('param_stock').value;
        var stockActual= 0;
        stockActual = parseFloat(stock)+parseFloat(cantidad);


        t.row.add( [
            '<center>'+codigo+'</center>',
            descripcion,
            '<center>'+cantidad+'</center>',
            '<center>'+stockActual+'</center>',
            '<center>'+precio+'</center>',
            '<button class="btn btn-danger btn-xs center deleteValid col-md-offset-2" onclick="Eliminar('+"'"+codigo+"'"+')">Eliminar</button>',
        ] ).draw( false );
        
        //cursoId.push(codigo);
        productoId.push(codigo);
        cantidadA.push(cantidad);
        precioA.push(precio);
        stockA.push(stockActual);
        
        //cantidadUC.push(cantidad);
        //cantidadUV.push(cantidad);

        document.getElementById('param_familia').value="";
        document.getElementById('param_codProducto').value="";
        document.getElementById('param_producto').value="";
        document.getElementById('param_cantidad').value="";
        document.getElementById('param_precio').value="";   
        document.getElementById('param_stock').value="";
    } );

    $('#tablaDetallesEntregas tbody').on( 'click', 'button', function () {
        t
            .row( $(this).parents('tr') )
            .remove()
            .draw();
    });


    $('#addRow2').on( 'click', function () { 
        var codigo              = document.getElementById('param_codProducto').value;
        var descripcion         = document.getElementById('param_producto').value;
        var cantidad            = document.getElementById('param_cantidad').value;
        var precio              = document.getElementById('param_precio').value;
        var stock                 = document.getElementById('param_stock').value;
        var igv                 = document.getElementById('param_igv').value;
        
        t2.row.add( [
            '<center>'+codigo+'</center>',
            descripcion,
            '<center>'+cantidad+'</center>',
            '<center>'+precio+'</center>',
            '<center>'+stock+'</center>',
            '<button class="btn btn-danger btn-xs center deleteValid col-md-offset-2" onclick="Eliminar2('+"'"+codigo+"'"+')">Eliminar</button>',
        ] ).draw( false );
        
        //cursoId.push(codigo);
        productoId.push(codigo);
        cantidadA.push(cantidad);
        precioA.push(precio);
        stockA.push(stock);
        igvA.push(igv);

        document.getElementById('param_codProducto').value="";
        document.getElementById('param_producto').value="";
        document.getElementById('param_cantidad').value="1";
        document.getElementById('param_precio').value="0.00";   
        document.getElementById('param_stock').value="";
        document.getElementById('param_igv').value="";
    } );

    $('#tablaDetalleEnvio tbody').on( 'click', 'button', function () {
        t2
            .row( $(this).parents('tr') )
            .remove()
            .draw();
    });

    $('#addRow3').on( 'click', function () { 
        var codigo              = document.getElementById('param_codProducto').value;
        var descripcion         = document.getElementById('param_producto').value;
        var cantidad            = document.getElementById('param_cantidad').value;
        var precio              = document.getElementById('param_precio').value;
        var stock                 = document.getElementById('param_stock').value;      
        
        t3.row.add( [
            '<center>'+codigo+'</center>',
            descripcion,
            '<center>'+cantidad+'</center>',
            '<center>'+precio+'</center>',
            '<center>'+cantidad+'</center>',
            '<button class="btn btn-danger btn-xs center deleteValid col-md-offset-2" onclick="Eliminar2('+"'"+codigo+"'"+')">Eliminar</button>',
        ] ).draw( false );
        
        //cursoId.push(codigo);
        productoId.push(codigo);
        cantidadA.push(cantidad);
        precioA.push(precio);
        stockA.push(cantidad);       

        document.getElementById('param_codProducto').value="";
        document.getElementById('param_producto').value="";
        document.getElementById('param_cantidad').value="0";
        document.getElementById('param_precio').value="0.00";  
    } );

    $('#tablaDetalleProductoAlmacen tbody').on( 'click', 'button', function () {
        t3
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

function motrarAlmacenOrigen()
{    
    var param_opcion = 'almacen_origen';
    var param_codigo = 0;
    $.ajax({
        type:'POST',
        data: 'param_opcion='+param_opcion+'&param_codigo='+param_codigo,
        url: '../../controller/controlCompras/almacen_controller.php', 
        success:function(data){                              
            $('#origen').html(data);                
        }
    });
    //alert("kjb");
}

function motrarAlmacenDestino()
{    
    var param_origen = document.getElementById('param_almacen').value;
    var param_opcion = 'almacen_destino';
    //alert(param_origen);
    $.ajax({
        type:'POST',
        data: 'param_opcion='+param_opcion+'&param_codigo='+param_origen,
        url: '../../controller/controlCompras/almacen_controller.php', 
        success:function(data){                              
            $('#destino').html(data);                
        }
    });
    //alert("kjb");
}


function mostrarCabecera() { 
    var param_pedido = document.getElementById('param_pedido').value;
    var param_opcion = 'mostrar_cabecera';
    //alert(param_pedido);
    $.ajax({
        type: 'POST',        
        data:'param_opcion='+param_opcion+'&param_pedido='+param_pedido,
        url: '../../Controller/ControlCompras/entregas_controller.php',
        success: function(data){
            objeto=JSON.parse(data);
            var totalBI = parseFloat(objeto[4]);
            //$("#param_nroPedido").val(objeto[0]);
            document.getElementById('param_fecha').value = (objeto[1]);         
            document.getElementById('param_proveedor').value = (objeto[2]);
            document.getElementById('param_codProveedor').value = (objeto[12]);       
        },
        error: function(data){
                   
        }
    });
}

function Eliminar(codigo) {  
    var pos = productoId.indexOf(codigo);    
    productoId.splice(pos, 1);
    cantidadA.splice(pos, 1);
    precioA.splice(pos, 1);
    stockA.splice(pos, 1);   
}

function Eliminar2(codigo) {  
    var pos = productoId.indexOf(codigo);    
    productoId.splice(pos, 1);
    cantidadA.splice(pos, 1);
    precioA.splice(pos, 1);
    stockA.splice(pos, 1); 
    igvA.splice(pos, 1);   
}

function mostrar() {
    console.log(productoId.toString());
    console.log(cantidadA.toString());
    console.log(precioA.toString());
    console.log(stockA.toString());
    console.log(igvA.toString());
    //console.log(cursoId.length);
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
