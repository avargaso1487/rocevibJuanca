window.onload = function(){
    mostrarMenu(); 
}

$(document).ready(function() {  



mostrarMenu();  

    
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

   $('#cancelarApertura').on('click', function(){        
        $('#verAperturaCaja').modal('hide');                                            
    }); 

   $('#cancelarCierre').on('click', function(){        
        $('#verCierreCaja').modal('hide'); 
        document.getElementById('montoCaja').value = '';
        document.getElementById('saldo').value = '';                                          
    });   

   $('#cancelar_ingreso_saldo').on('click', function(){ 
        $('#ingresar_saldo').modal('hide');       
        document.getElementById('contraseña').value = '';                                       
    });

   $('#confirmar_contraseña').on('click', function(){ 
      
      var param_password = document.getElementById('contraseña').value;
      var param_horaCierre = document.getElementById('horaCierre').value;
      var param_fechaCierre = document.getElementById('fechaCierre').value;
      var param_montoCierre = parseFloat(document.getElementById('montoCierre').value);
      var param_montoCaja = parseFloat(document.getElementById('montoCaja').value);
      var param_operacion = document.getElementById('operacion').value;
      if (param_operacion == 'MAYOR') {
        var param_opcion = 'cierre_caja_observaciones_mas';
        $.ajax({
          type:'POST',
          data: 'opcion='+param_opcion+'&param_password='+param_password+'&param_horaCierre='+param_horaCierre+'&param_fechaCierre='+param_fechaCierre+
          '&param_montoCierre='+param_montoCierre+'&param_montoCaja='+param_montoCaja,        
          url: "../../controller/controlCaja/movimiento_caja_controller.php",
          success:function(data){   
            if (data == '1') {
              alert('Se realizo el cierre de caja.');
              location.reload();
            } else {
              if (data == '0') {
                alert('Contraseña Incorrecta');
              }
            }
          },
          error: function(data){
              alert('OCURRIÓ UN PROBLEMA INESPERADO');
          }
        });
      } else {
        if (param_operacion == 'MENOR') {
          var param_opcion = 'cierre_caja_observaciones_falta';
          $.ajax({
            type:'POST',
            data: 'opcion='+param_opcion+'&param_password='+param_password+'&param_horaCierre='+param_horaCierre+'&param_fechaCierre='+param_fechaCierre+
            '&param_montoCierre='+param_montoCierre+'&param_montoCaja='+param_montoCaja,        
            url: "../../controller/controlCaja/movimiento_caja_controller.php",
            success:function(data){   
              if (data == '1') {
                alert('Se realizo el cierre de caja.');
                location.reload();
              } else {
                if (data == '0') {
                  alert('Contraseña Incorrecta');
                }
              }
            },
            error: function(data){
                alert('OCURRIÓ UN PROBLEMA INESPERADO');
            }
          });

        }
      }
      

    });

   $('#confirmarCierre').on('click', function(){        
        //alert('PROBEMOS A VER QUE PASA');  
        var param_opcion = 'cierre_caja';
        var param_horaCierre = document.getElementById('horaCierre').value;
        var param_fechaCierre = document.getElementById('fechaCierre').value;
        var param_montoCierre = parseFloat(document.getElementById('montoCierre').value);
        var param_montoCaja = document.getElementById('montoCaja').value;
        //var param_saldo = document.getElementById('saldo').value;
        //var param_operacion = document.getElementById('operacion').value;

        if (param_montoCaja == '') {
          alert('Ingrese monto de caja.');
        } else {
            if (param_montoCierre == parseFloat(param_montoCaja) ) {
              $.ajax({
                type:'POST',
                data: 'opcion='+param_opcion+'&param_horaCierre='+param_horaCierre+'&param_fechaCierre='+param_fechaCierre+
                '&param_montoCierre='+param_montoCierre+'&param_montoCaja='+param_montoCaja,        
                url: "../../controller/controlCaja/movimiento_caja_controller.php",
                success:function(data){   
                  $('#verCierreCaja').modal('hide'); 
                  location.reload();                                     
                },
                error: function(data){
                    alert('OCURRIÓ UN PROBLEMA INESPERADO');
                }
              });
            } else {
              if (param_montoCierre < param_montoCaja) {
                  $('#ingresar_saldo').modal({
                    show:true,
                    backdrop:'static'
                  });
                  document.getElementById('operacion').value = 'MAYOR';
              } else {
                if (param_montoCierre > param_montoCaja) {
                  $('#ingresar_saldo').modal({
                    show:true,
                    backdrop:'static'
                  });
                  document.getElementById('operacion').value = 'MENOR';
                }
              }
            } 
        }
                                             
    });

   $('#confirmarApertura').on('click', function(){
        var horaApertura = document.getElementById('horaApertura').value;        
        var fecha = document.getElementById('fecha').value; 
        var saldoInicial = document.getElementById('monto').value;            
        if (saldoInicial == '') {
          alert('Debe ingresar el monto Inicial');
        } else {
            $.ajax({
              type:'POST',
              data: 'horaApertura='+horaApertura+'&fecha='+fecha+'&saldoInicial='+saldoInicial,        
              url: "../../controller/controlCaja/aperturarCaja.php",
              dataType : 'json',
              encode : true,
              success:function(data){                              
                  alert('SE ABRIÓ LA CAJA CORRECTAMENTE');        
                  location.reload(true);       
              },
              error: function(data){
                  alert('OCURRIÓ UN PROBLEMA INESPERADO');
              }
          });
        }
        
                                              
    });

});




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
