
window.cantidadE = [];


$(document).ready(function() {
    $('#tablaEntregas').DataTable(); 
    $('#tablaDetallesEntregas').DataTable(); 
    mostrarCabecera();
    mostrarDetalle();   
    mostrarMenu(); 
});



$(function() {
    $('#cancel_editar').on('click', function(){
       //alert('Agregar Proveeor');
       $('#editarProducto').modal('hide');     
    }); 

    $('#addRow').on('click', function(){
       //alert('Buscar Productos');
       var param_opcion = 'registro_bonificacion';
       var param_codProducto = document.getElementById('param_codProducto').value;
       var param_cantidad = document.getElementById('param_cantidad').value;
       var param_precio = document.getElementById('param_precio').value;
       var param_igv = document.getElementById('param_igv').value;
       var param_descuento = document.getElementById('param_descuento').value;
       var param_nroPedido = document.getElementById('param_pedido').value;

        var desc =  parseFloat(param_descuento);
        var precioBruto = parseFloat(param_precio) * parseFloat(param_cantidad);

        if (desc > 0)
        {                       
            desc  = precioBruto* (desc/100);
            var descontar = desc;           
        } else {
            param_descuento = 0;
        }

        importe = precioBruto - descontar;

       //alert(importe);
        if (param_cantidad == 0) {
            alert('Debe ingresar un cantidad mayor a 0.');
        } else {
            if (param_cantidad < 0) {
                alert('Debe ingresar una positiva.')
            } else {
                $.ajax({
                    type: 'POST',        
                    data:'param_opcion='+param_opcion+'&param_codProducto='+param_codProducto+'&param_precio='+param_precio+'&param_cantidad='+param_cantidad+'&param_igv='+param_igv+'&param_descuento='+param_descuento+'&param_pedido='+param_nroPedido+'&param_importe='+importe,
                    url: '../../Controller/ControlCompras/entregas_controller.php',
                    success: function(data){
                        mostrarDetalle();
                        document.getElementById('param_producto').value='';
                        document.getElementById('param_codProducto').value='';
                        document.getElementById('param_cantidad').value='1';
                        document.getElementById('param_precio').value='0.00';
                        document.getElementById('param_igv').value='';
                        document.getElementById('param_descuento').value=''; 
                        document.getElementById('addRow').disabled = true;                
                    },
                    error: function(data){
                               
                    }
                });
            }
        }
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

    $('#tablaProductos tbody').on('dblclick', 'tr', function () {seleccionDobleProductos(this);});

    $('#register_editar').on('click', function(){
       //alert('Registro de Cantidad');
        var param_pedido = document.getElementById('param_pedido').value;
        var param_producto = document.getElementById('param_codProductoEditar').value;
        var param_cantidadEditar = document.getElementById('param_cantidadEditar').value;
        var param_cantidadRecibida = document.getElementById('param_cantidadPedida').value;
        var param_precio = document.getElementById('param_precioEditar').value;
        var param_igv = document.getElementById('param_igvEditar').value;
        var param_descuento = document.getElementById('param_descuentoEditar').value;
        var param_opcion = 'modificar_detalle';

        var descuento = parseFloat(param_descuento);
       var desc= 0;
       var precioBruto= 0;
       var descontar= 0;
       var importe= 0;

        desc = descuento;
        precioBruto = (parseFloat(param_precio) * parseFloat(param_cantidadEditar));

       if (desc > 0) {
          desc  = precioBruto* (desc/100);
          descontar = desc;
       } else {
          param_descuento = 0;
       }

       importe = precioBruto - descontar;

       var param_importe = importe.toFixed(2);

        
        if (param_cantidadEditar == 0 || param_cantidadEditar < 0) {
            alert('Debe ingresar una cantidad mayor a 0');
        } else {           
            if (parseFloat(param_cantidadEditar) > parseFloat(param_cantidadRecibida)) {
                alert('La cantidad recibida es mayor a la cantidad pedida, por favor ingresar los productos adicionales manualmente.');
            } else {               
                $.ajax({
                    type: 'POST',        
                    data:'param_opcion='+param_opcion+'&param_pedido='+param_pedido+'&param_producto='+param_producto+'&param_precio='+param_precio+'&param_igv='+param_igv+'&param_descuento='+param_descuento+'&param_cantidadEditar='+param_cantidadEditar+'&param_importe='+param_importe,
                    url: '../../Controller/ControlCompras/entregas_controller.php',
                    success: function(data){
                        objeto=JSON.parse(data);
                        //$("#param_nroPedido").val(objeto[0]);
                        $('#editarProducto').modal('hide'); 
                        document.getElementById('param_codProductoEditar').value = '';         
                        document.getElementById('param_productoEditar').value = '';
                        document.getElementById('param_cantidadEditar').value = '';
                        document.getElementById('param_precioEditar').value = '';
                        document.getElementById('param_igvEditar').value = '';
                        document.getElementById('param_descuentoEditar').value = '';
                        //alert(totalNeto);
                        mostrarDetalle();   
                    },
                    error: function(data){
                               
                    }
                });
            }
        }
           
    });    

    $('#register_entrega').on('click', function(){
       //alert('Agregar Proveeor');
       $("#tablaDetallesEntregas tbody tr").each(function (index) {
            var codigo, descripcion, cantidadPedida, cantidadRecibida, precios, igv, descuento, importe;
            $(this).children("td").each(function (index2) 
            {
                switch (index2) 
                {
                    case 0: codigo = $(this).text();
                        break;
                    case 1: descripcion = $(this).text();
                        break;                    
                    case 2: cantidadPedida = $(this).text();
                        break; 
                    case 3: cantidadRecibida = $(this).text();
                        break;                    
                    case 4: precios = $(this).text();
                        break;
                    case 5: igv = $(this).text();
                        break;
                    case 6: descuento = $(this).text();
                        break;
                    case 7: importe = $(this).text();
                        break;
                } 
            })
            //alert(codigo + ' - ' + descripcion + ' - ' + cantidadUC);
            cantidadE.push(cantidadRecibida);           
        })

       if (cantidadE.indexOf('0') >= 0) {
            alert('Hay productos que no se han recibido, por favor eliminar esos productos y realizar las observaciones respectivas.');
            cantidadE = [];
       } else {
           var param_pedido = document.getElementById('param_pedido').value;
           var param_observaciones = document.getElementById('param_observaciones').value;
           var param_opcion = 'registro_recepcion';
            $.ajax({
                type: 'POST',        
                data:'param_opcion='+param_opcion+'&param_pedido='+param_pedido+'&param_observaciones='+param_observaciones,
                url: '../../Controller/ControlCompras/entregas_controller.php',
                success: function(data){
                    alert('Registre los productos recibidos en sus respectivos almacenes')
                    location.href = 'registroAlmacen.php?pedido='+param_pedido;
                },
                error: function(data){
                           
                }
            }); 
       }
       
    }); 

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
    document.getElementById('param_precio').value = $('#tablaProductos').DataTable().cell('.selected', 6).data(); 
    document.getElementById('param_igv').value = $('#tablaProductos').DataTable().cell('.selected', 7).data(); 
    document.getElementById('param_descuento').value = 100;
    $('#verProducto').modal('hide');
    document.getElementById('addRow').disabled = false; 
}

function facturar() { 
    //alert('Y ahora q pasa');
    open('facturar.php','','top=50,left=50,width=1200,height=500') ; 
    //window.open('nuevoPedido.php','','top=50,left=50,width=1200,height=500');
}

function cerrar() { 
    close('facturar.php') ; 
    //window.open('nuevoPedido.php','','top=50,left=50,width=1200,height=500');
}


function vencimientos() { 
    //alert('Y ahora q pasa');
    open('vencimientos.php','','top=50,left=50,width=700,height=600') ; 
    //window.open('nuevoPedido.php','','top=50,left=50,width=1200,height=500');
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
            document.getElementById('param_codigoProveedor').value = (objeto[12]); 
        },
        error: function(data){
                   
        }
    });
}

function mostrarDetalle() { 
    //alert('Detalle');
    var param_pedido = document.getElementById('param_pedido').value;
    var param_opcion = 'mostrar_detalle';
    //alert(param_pedido);
    $.ajax({
        type: 'POST',        
        data:'param_opcion='+param_opcion+'&param_pedido='+param_pedido,
        url: '../../Controller/ControlCompras/entregas_controller.php',
        success: function(data){
            $('#tablaDetallesEntregas').DataTable().destroy();
            $('#cuerpoDetallesEntregas').html(data);
            $('#tablaDetallesEntregas').DataTable();
           
        },
        error: function(data){
                   
        }
    });
}

function editar(producto) { 
    var param_pedido = document.getElementById('param_pedido').value;
    var param_opcion = 'editar_detalle';
    //alert(param_pedido+' '+produto); 
    $('#editarProducto').modal({
        show:true,
        backdrop:'static',
    });

    $.ajax({
        type: 'POST',        
        data:'param_opcion='+param_opcion+'&param_pedido='+param_pedido+'&param_producto='+producto,
        url: '../../Controller/ControlCompras/entregas_controller.php',
        success: function(data){
            objeto=JSON.parse(data);
            document.getElementById('param_codProductoEditar').value = (objeto[0]);         
            document.getElementById('param_productoEditar').value = (objeto[1]);
            document.getElementById('param_precioEditar').value = (objeto[2]);
            document.getElementById('param_igvEditar').value = (objeto[3]);
            document.getElementById('param_descuentoEditar').value = (objeto[4]);
            document.getElementById('param_cantidadPedida').value = (objeto[5]);
        },
        error: function(data){
                   
        }
    });   
}

function eliminar(producto) {    
    //alert(param_pedido,produto);
    var param_pedido = document.getElementById('param_pedido').value;
    var param_opcion = 'eliminar_detalle';
    //alert(param_pedido+' '+produto); 
    $.ajax({
        type: 'POST',        
        data:'param_opcion='+param_opcion+'&param_pedido='+param_pedido+'&param_producto='+producto,
        url: '../../Controller/ControlCompras/entregas_controller.php',
        success: function(data){
            mostrarDetalle();
        },
        error: function(data){
                   
        }
    });   
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