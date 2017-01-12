window.numeroDetalleFactura = [];
window.servicioId = [];
window.importeServicio = [];

window.onload = function(){    
    
    mostrarMenu();  

}
$(document).ready(function() {
    $('#tablaDetallesFactura').DataTable();
    mostrarCabecera();
    mostrarDetalle();
    mostrarTotal();
     $('#param_fecha').datetimepicker({
      pickTime: false,
      format: 'YYYY-MM-DD',
      language: 'es'

  });
});

$(function() {
    $('#register_servicio').on('click', function(){
       //alert('Agregar Factura');
       $("#tablaDetallesFactura tbody tr").each(function (index) {
            var codigo, descripcion,   importe;
            $(this).children("td").each(function (index2) 
            {
                switch (index2) 
                {
                    case 0: codigo = $(this).text();
                        break;
                    case 1: descripcion = $(this).text();
                        break;
                    case 2: importe = $(this).text();
                        break;
                    
                } 
            })
            //alert(codigo + ' - ' + descripcion + ' - ' + cantidadUC);
            servicioId.push(codigo);
            importeServicio.push(importe);
        })
       var param_opcion = 'registrar';
       var param_nroPropio = document.getElementById('param_nroFactura').value;
       var param_clienteID = document.getElementById('codigoCliente').value;
       var param_fecha = document.getElementById('param_fecha').value;
       var param_serie = document.getElementById('param_nroSerie').value;
       var param_neto = document.getElementById('param_total').value;
       var param_spa_id = document.getElementById('param_spa_id').value;
       var respuesta = confirm('¿Desea facturar el servicio?');
       if (respuesta == true) {
            //alert('Registrar');

            $.ajax({
                type: 'POST',
                data:'param_opcion='+param_opcion+'&param_spa_id='+param_spa_id+'&param_fecha='+param_fecha+
                    '&param_nroPropio='+param_nroPropio+'&param_clienteID='+param_clienteID+
                    '&param_serie='+param_serie+
                    '&param_neto='+param_neto+
                    '&param_servicioID='+servicioId+
                    '&param_precio='+importeServicio,
                url: '../../controller/controlspa/factura_controller.php', 
                success: function(data){
                    alert('Servicio facturado');
                    location.href='spa.php';
                    //mostrarProveedores();
                    
                   

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



function mostrarCabecera() { 
    var param_spa_id = document.getElementById('param_spa_id').value;
    var param_opcion = 'mostrar_cabecera';
    
    $.ajax({
        type: 'POST',       
        data:'param_opcion='+param_opcion+'&param_spa_id='+param_spa_id,
        url: "../../controller/controlspa/factura_controller.php",

        success: function(data){
            
            objeto=JSON.parse(data);
            document.getElementById('cliente').value = (objeto[1]);         
            document.getElementById('codigoCliente').value = (objeto[2]);      
            
        },
        error: function(data){
        
        }
    });
}

function mostrarDetalle() { 
    //alert('Detalle');
    var param_spa_id = document.getElementById('param_spa_id').value;
    var param_opcion = 'mostrar_detalle';
    //alert(param_pedido);
    $.ajax({
        type: 'POST',        
        data:'param_opcion='+param_opcion+'&param_spa_id='+param_spa_id,
         url: "../../controller/controlspa/factura_controller.php",
        success: function(data){
            $('#cuerpoDetallesFactura').html(data);
        },
        error: function(data){
                   
        }
    });
}



function mostrarTotal() { 
    //alert('Detalle');
    var param_spa_id = document.getElementById('param_spa_id').value;
    var param_opcion = 'mostrar_total';
    //alert(param_pedido);
    $.ajax({
        type: 'POST',        
        data:'param_opcion='+param_opcion+'&param_spa_id='+param_spa_id,
         url: "../../controller/controlspa/factura_controller.php",
        success: function(data){
            objeto=JSON.parse(data);
            document.getElementById('param_total').value = (objeto[0]);
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