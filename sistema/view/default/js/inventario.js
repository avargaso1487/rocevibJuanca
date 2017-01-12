


$(document).ready(function() {
    $('#tablaInventario').DataTable();   
    mostrarMenu();
    mostrarInventario();
});

$(function() {    
  $('#inventario_pdf').on('click', function(){                   
     open("../../Reportes/reporteInventarioPDF.php", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes, top=100,left=300, width: 800,height: 400");
  }); 
  $('#inventario_excel').on('click', function(){ 
    location.href = '../../reportes/reporteInventarioExcel.php';
  });     
  
});
   

function mostrarInventario() {    
    var param_opcion = 'mostrar_inventario';
    $.ajax({
        type: 'POST',        
        data:'param_opcion='+param_opcion,
        url: '../../controller/controlCompras/almacen_controller.php', 
        success:function(data){                              
            $('#tablaInventario').DataTable().destroy();
            $('#cuerpoInventario').html(data);
            $('#tablaInventario').DataTable();            
        }
    });
    //alert("kjb");
}

function mostrarMenu() {    
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
