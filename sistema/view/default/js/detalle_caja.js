window.onload = function(){   
    mostrarMovimientos(); 
    mostrarMenu(); 
}


$(function(){

     $('#btn_nuevo_movimiento').on('click', function(){ 
        var id_detalle =     document.getElementById('detalleID').value; 
        var opcion =        'verificar_estado_caja';
        $.ajax({
            type : 'POST',
            data : 'opcion='+opcion+'&id_detalle_caja='+id_detalle,
            url  : '../../controller/controlCaja/movimiento_caja_controller.php',
            success : function(data){
                if (data == '1') {
                    document.getElementById('idDetalleCaja').value;
                    document.getElementById('tipo_movimiento').value;
                    document.getElementById('razon').value= '';
                    document.getElementById('importe').value= '';
                    document.getElementById('operacion').value= 'Registrar';
                    $('#modal_movimiento_caja').modal({
                        show:true,
                        backdrop:'static'
                    });
                    obtenerSaldo();
                } else {
                    alert('La ya ha sido cerrada.');
                }
            },
            error : function(data){
               
                   
            }
        });
        
    });


    $('#btn_registrar_movimiento').on('click', function(){
        //event.preventDefault();
        var tipo_movimiento =       document.getElementById("tipo_movimiento").value;
        var razon           =       document.getElementById("razon").value;
        var importe         =       parseFloat(document.getElementById("importe").value);
        if(tipo_movimiento == '' || razon == '' || importe == ''){
            alert('Debe completar todos los campos.')
            return;                                          
        } else {
            $('#verificar_movimiento').modal({
                show:true,
                backdrop:'static'
            });
        }
        
     });

    $('#cancelar_contraseña').on('click', function(){ 
        $('#verificar_movimiento').modal('hide');       
        document.getElementById('contraseña').value = '';                                       
    });

    $('#confirmar_contraseña').on('click', function(){ 
      
        var operacion = document.getElementById('operacion').value;
        var opcion = 'registrar_movimiento';
        var id_detalle_caja =       document.getElementById('idDetalleCaja').value;
        var tipo_movimiento =       document.getElementById("tipo_movimiento").value;
        var razon           =       document.getElementById("razon").value;
        var importe         =       parseFloat(document.getElementById("importe").value);
        var saldo           =       parseFloat(document.getElementById("saldo").value); 
        var param_password  =       document.getElementById('contraseña').value;           
        
        if (tipo_movimiento == 'I') {
            $.ajax({
                type : 'POST',
                data : 'opcion='+opcion+'&id_detalle_caja='+id_detalle_caja+'&tipo_movimiento='+tipo_movimiento+'&razon='+razon+'&importe='+importe+'&param_password='+param_password,
                url  : '../../controller/controlCaja/movimiento_caja_controller.php',
                dataType : 'json',
                encode : true,
                success : function(data){
                    if (data == '1') {
                        alert('Registro satisfactorio'); 
                    /*setTimeout(function(){location.href="../views/datos_empresa.php"} , 2000);*/                            
                        document.getElementById("tipo_movimiento").value = '';    
                        document.getElementById("razon").value = '';
                        document.getElementById("importe").value = '';
                        document.getElementById("contraseña").value = '';
                        $('#verificar_movimiento').modal('hide');
                        $('#modal_movimiento_caja').modal('hide');
                        mostrarMovimientos();
                    } else {
                      if (data == '0') {
                        alert('Contraseña Incorrecta');
                      }
                    }
                    
                },
                error : function(data){
                         
                }
            });
        } else {
            if (importe > saldo) {
                alert('No se puede realizar la salida, no hay suficientemente saldo en caja.');
            } else {
                $.ajax({
                    type : 'POST',
                    data : 'opcion='+opcion+'&id_detalle_caja='+id_detalle_caja+'&tipo_movimiento='+tipo_movimiento+'&razon='+razon+'&importe='+importe+'&param_password='+param_password,
                    url  : '../../controller/controlCaja/movimiento_caja_controller.php',
                    dataType : 'json',
                    encode : true,
                    success : function(data){
                        if (data == '1') {
                            alert('Registro satisfactorio'); 
                        /*setTimeout(function(){location.href="../views/datos_empresa.php"} , 2000);*/                            
                            document.getElementById("tipo_movimiento").value = '';    
                            document.getElementById("razon").value = '';
                            document.getElementById("importe").value = '';
                            document.getElementById("contraseña").value = '';
                            $('#verificar_movimiento').modal('hide');
                            $('#modal_movimiento_caja').modal('hide');
                            mostrarMovimientos();
                        } else {
                          if (data == '0') {
                            alert('Contraseña Incorrecta');
                          }
                        }
                        
                    },
                    error : function(data){
                             
                    }
                });
            }
        }

    });

    
});

function mostrarMovimientos(){
    var opcion = 'mostrar_movimiento';   
    var id_detalle_caja = document.getElementById('idDetalleCaja').value;
    $.ajax({
        type: 'POST',
        data:'opcion='+opcion+'&id_detalle_caja='+id_detalle_caja,
        url: '../../controller/controlCaja/movimiento_caja_controller.php',
        success: function(data){
            $('#tabla_movimiento').DataTable().destroy();
            $('#cuerpo_movimiento').html(data);
            $('#tabla_movimiento').DataTable();
           

        },
        error: function(data){

        }
    });
}

function obtenerSaldo(){
    var opcion = 'mostrar_saldo';   
    var id_detalle_caja = document.getElementById('idDetalleCaja').value;
    $.ajax({
        type: 'POST',
        data:'opcion='+opcion+'&id_detalle_caja='+id_detalle_caja,
        url: '../../controller/controlCaja/movimiento_caja_controller.php',
        success: function(data){
            document.getElementById('saldo').value= data;     
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
