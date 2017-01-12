
$(document).ready(function() {
    $('#tablaMovimientos').DataTable(); 
    mostrarAlmacen();
    mostrarMenu();
});

$(function() {
    $('#buscarMovimientos').on('click', function(){
       mostrarKardex();
    });
});


function mostrarKardex(){ 
    var param_opcion = 'mostrar_kardex';
    var param_almacen = document.getElementById('param_almacen').value;
    var producto = document.getElementById('param_producto').value;
    //alert(producto);
    $.ajax({
        type: 'POST',        
        data:'param_opcion='+param_opcion+'&param_almacen='+param_almacen+'&param_producto='+producto,
        url: '../../controller/controlmovimiento/movimiento_controller.php',
        success: function(data){
            $('#tablaMovimientos').DataTable().destroy();
            $('#cuerpoMovimientos').html(data);
            $('#tablaMovimientos').DataTable();
        },
        error: function(data){
                   
        }
    });    
}

function mostrarAlmacen(){ 
    var param_opcion = 'combo_almacen';
    var codigo = 0;  
    $.ajax({
        type: 'POST',        
        data:'param_opcion='+param_opcion+'&codigo=' +codigo,
        url: '../../controller/controlmovimiento/movimiento_controller.php',
        success: function(data){
            $('#almacen').html(data);

        },
        error: function(data){
                   
        }
    });    
}


function agregarProducto(){
    var param_opcion = 'combo_producto';
    var param_almacen = document.getElementById('param_almacen').value;
    //var codigo = 0;  
    $.ajax({
        type: 'POST',        
        data:'param_opcion='+param_opcion+'&param_almacen=' +param_almacen,
        url: '../../controller/controlmovimiento/movimiento_controller.php',
        success: function(data){
            $('#producto').html(data);

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

