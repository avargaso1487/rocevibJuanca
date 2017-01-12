
$(document).ready(function() {    
    $('#tablaProductos').DataTable();    
    mostrarMenu();
});

$(function() {
    $('#buscarProductos').on('click', function(){
       //alert('MOstrar productos');
       $('#verProducto').modal({
            show:true,
            backdrop:'static',
        });
       var param_opcion = 'productos_transformar';
       $.ajax({
          type: 'POST',        
          data:'param_opcion='+param_opcion,
          url: '../../controller/controlCompras/almacen_controller.php',          
          success: function(data){
            $('#tablaProductos').DataTable().destroy();
            $('#cuerpoProductos').html(data);
            $('#tablaProductos').DataTable();
          },
          error: function(data){
                     
          }
        });
    });

    $('#btn_transformar').on('click', function(){
       var param_opcion = 'transformacion_producto';
       var param_producto1 = parseFloat(document.getElementById('param_codProducto').value);
       var param_almacen = document.getElementById('param_codAlmacen').value;
       var param_stock = parseFloat(document.getElementById('param_stock').value);
       var param_cantidad = parseFloat(document.getElementById('param_cantidad').value);
       var param_proporcion = parseFloat(document.getElementById('param_proporcion').value);

       var param_stockFinal = param_proporcion * param_cantidad;
       var param_stockAlmacen = param_stock - param_cantidad;
       var param_producto2 = param_producto1 + 1 ;

       if (param_cantidad < 0 || param_proporcion < 0) {
            alert('Ingresa valores positivos.');
            document.getElementById('param_codProducto').val = '';
            document.getElementById('param_producto').val = '';
            document.getElementById('param_almacen').val = '';
            document.getElementById('param_codAlmacen').val = '';
            document.getElementById('param_stock').val = '';
            document.getElementById('param_cantidad').val = '1';
            document.getElementById('param_proporcion').val = '1';
       } else {
            if (param_stock == 0) {
            alert('No hay stock para realizar la transformación.');
           } else {
                $.ajax({
                  type: 'POST',        
                  data:'param_opcion='+param_opcion+'&param_producto1='+param_producto1+'&param_almacen='+param_almacen+'&param_producto2='+param_producto2+
                  '&param_cantidadT='+param_cantidad+'&param_proporcion='+param_proporcion+'&param_stockFinal='+param_stockFinal+'&param_stockAlmacen='+param_stockAlmacen,
                  url: '../../controller/controlCompras/almacen_controller.php',          
                  success: function(data){
                    alert('Se realizo la transformacion correctamente.');
                    document.getElementById('param_codProducto').val = '';
                    document.getElementById('param_producto').val = '';
                    document.getElementById('param_almacen').val = '';
                    document.getElementById('param_codAlmacen').val = '';
                    document.getElementById('param_stock').val = '';
                    document.getElementById('param_cantidad').val = '1';
                    document.getElementById('param_proporcion').val = '1';
                  },
                  error: function(data){
                             
                  }
                });
           }
       }
    });

    $('#tablaProductos tbody').on('dblclick', 'tr', function () {seleccionDobleProductos(this);});

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
    document.getElementById('param_codAlmacen').value = $('#tablaProductos').DataTable().cell('.selected', 2).data();
    document.getElementById('param_almacen').value = $('#tablaProductos').DataTable().cell('.selected', 3).data();
    document.getElementById('param_stock').value = $('#tablaProductos').DataTable().cell('.selected', 5).data();
    document.getElementById('param_proporcion').value = $('#tablaProductos').DataTable().cell('.selected', 6).data();
    $('#verProducto').modal('hide');
    document.getElementById('addRow').disabled = false; 
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

