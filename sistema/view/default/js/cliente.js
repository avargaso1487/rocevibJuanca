
window.onload = function(){
    mostrarDepartamento();
    mostrarMenu();  
    $('#tablaClientes').DataTable();
    mostrarClientes();
    
    $('#dataTables-example').DataTable();
    /*$('#tablaClientes tbody').on( 'dblclick', 'tr', function () {
        mostrarMascotas(this);
    } );*/
}

$(function() {
    $('#new_cliente').on('click', function(){
        //alert('Agregar Cliente');
        $('#cabeceraRegistro').html(".:: Nuevo Cliente ::.");
        $('#modalCliente').modal({
            show:true,
            backdrop:'static'
        });
        //$('#estado').show();
        $('#estado').hide();
    });

    $('#cancel_cliente').on('click', function(){
        //alert('Agregar Cliente');

        $('#modalCliente').modal('hide');
        mostrarClientes();
        document.getElementById('param_abreviatura').value= '';
        document.getElementById('param_nombres').value= '';
        document.getElementById('param_apellidos').value= '';
        document.getElementById('param_dni').value= '';
        document.getElementById('param_departamento').value= '';
        document.getElementById('param_provincia').value= '';
        document.getElementById('param_distrito').value= '';
        document.getElementById('param_direccion').value= '';
        document.getElementById('param_fechaNacimiento').value= '';
        document.getElementById('param_telefonoFijo').value= '';
        document.getElementById('param_celular').value= '';
        document.getElementById('param_notificacion').value= '';
        document.getElementById('param_email').value= '';
        document.getElementById('param_idioma').value= '';        
        document.getElementById('param_tipoCliente').value= '';
        document.getElementById('param_estadoCliente').value= '';
        document.getElementById('param_fechaAlta').value= '';
        document.getElementById('param_fechaModificacion').value= '';
        document.getElementById('param_fechaBaja').value= '';
        document.getElementById('param_tipoFactura').value= '';
        document.getElementById('param_tarifa').value= '';
        document.getElementById('param_descuento').value= '';
        document.getElementById('param_observaciones').value= '';
    });

    $('#register_cliente').on('click', function(){
        var param_funcion = document.getElementById('param_funcion').value;


        if (param_funcion == 'Nuevo') {
            //alert('Nuevo Cliente');
            //alert(param_estadoCliente);
            var estado = '';
            var param_opcion = 'nuevo_cliente';
            var param_abreviatura = document.getElementById('param_abreviatura').value;
            var param_nombres = document.getElementById('param_nombres').value;
            var param_apellidos = document.getElementById('param_apellidos').value;
            var param_dni = document.getElementById('param_dni').value;
            var param_departamento = document.getElementById('param_departamento').value;
            var param_provincia = document.getElementById('param_provincia').value;
            var param_distrito = document.getElementById('param_distrito').value;
            var param_direccion = document.getElementById('param_direccion').value;
            var param_fechaNacimiento = document.getElementById('param_fechaNacimiento').value;
            var param_telefonoFijo = document.getElementById('param_telefonoFijo').value;
            var param_celular = document.getElementById('param_celular').value;
            var param_notificacion = document.getElementById('param_notificacion').value;
            var param_email = document.getElementById('param_email').value;
            var param_idioma = document.getElementById('param_idioma').value;            
            var param_tipoCliente = document.getElementById('param_tipoCliente').value;
            var param_estadoCliente = document.getElementById('param_estado').value = 1;
            var param_fechaAlta = document.getElementById('param_fechaAlta').value;
            var param_fechaModificacion = document.getElementById('param_fechaModificacion').value;
            var param_fechaBaja = document.getElementById('param_fechaBaja').value;
            var param_tipoFactura = document.getElementById('param_tipoFactura').value;
            var param_tarifa = document.getElementById('param_tarifa').value;
            var param_descuento = document.getElementById('param_descuento').value;
            var param_observaciones = document.getElementById('param_observaciones').value;
            //alert(param_tipo);

            //alert(param_estado);

            $.ajax({
                type: 'POST',
                data:'param_opcion='+param_opcion+'&param_abreviatura='+param_abreviatura+'&param_nombres=' +param_nombres+
                    '&param_apellidos='+param_apellidos+'&param_dni=' +param_dni+
                    '&param_departamento='+param_departamento+'&param_provincia=' +param_provincia+
                    '&param_distrito='+param_distrito+'&param_direccion='+param_direccion+'&param_fechaNacimiento=' +param_fechaNacimiento+
                    '&param_telefonoFijo='+param_telefonoFijo+'&param_celular=' +param_celular+
                    '&param_notificacion='+param_notificacion+'&param_email=' +param_email+
                    '&param_idioma='+param_idioma+'&param_tipoCliente=' +param_tipoCliente+
                    '&param_estadoCliente='+param_estadoCliente+'&param_fechaAlta=' +param_fechaAlta+'&param_fechaModificacion='+param_fechaModificacion+
                    '&param_fechaBaja=' +param_fechaBaja+'&param_tipoFactura=' +param_tipoFactura+'&param_tarifa=' +param_tarifa+
                    '&param_descuento='+param_descuento+'&param_observaciones=' +param_observaciones,
                url: '../../controller/controlcliente/cliente_controller.php',
                success: function(data){
                    alert('Cliente registrado correctamente');
                    document.getElementById('param_abreviatura').value= '';
                    document.getElementById('param_nombres').value= '';
                    document.getElementById('param_apellidos').value= '';
                    document.getElementById('param_dni').value= '';
                    document.getElementById('param_departamento').value= '';
                    document.getElementById('param_provincia').value= '';
                    document.getElementById('param_distrito').value= '';
                    document.getElementById('param_direccion').value= '';
                    document.getElementById('param_fechaNacimiento').value= '';
                    document.getElementById('param_telefonoFijo').value= '';
                    document.getElementById('param_celular').value= '';
                    document.getElementById('param_notificacion').value= '';
                    document.getElementById('param_email').value= '';
                    document.getElementById('param_idioma').value= '';            
                    document.getElementById('param_tipoCliente').value= '';
                    document.getElementById('param_estado').value= '';
                    document.getElementById('param_fechaAlta').value= '';
                    document.getElementById('param_fechaModificacion').value= '';
                    document.getElementById('param_fechaBaja').value= '';
                    document.getElementById('param_tipoFactura').value= '';
                    document.getElementById('param_tarifa').value= '';
                    document.getElementById('param_descuento').value= '';
                    document.getElementById('param_observaciones').value= '';
                    $('#modalCliente').modal('hide');
                    mostrarClientes();
                    
                },
                error: function(data){

                }
            });

        } else {
            if (param_funcion = 'editar') {
                //var estadoEditar = '';
                var param_opcion = 'editarCliente';
                var param_codigo = document.getElementById('param_codigo').value;
                var param_abreviatura = document.getElementById('param_abreviatura').value;
                var param_nombres = document.getElementById('param_nombres').value;
                var param_apellidos = document.getElementById('param_apellidos').value;
                var param_dni = document.getElementById('param_dni').value;
                var param_departamento = document.getElementById('param_departamento').value;
                var param_provincia = document.getElementById('param_provincia').value;
                var param_distrito = document.getElementById('param_distrito').value;
                var param_direccion = document.getElementById('param_direccion').value;
                var param_fechaNacimiento = document.getElementById('param_fechaNacimiento').value;
                var param_telefonoFijo = document.getElementById('param_telefonoFijo').value;
                var param_celular = document.getElementById('param_celular').value;
                var param_notificacion = document.getElementById('param_notificacion').value;
                var param_email = document.getElementById('param_email').value;
                var param_idioma = document.getElementById('param_idioma').value;                
                var param_tipoCliente = document.getElementById('param_tipoCliente').value;
                var param_estadoCliente = document.getElementById('param_estado').value;
                var param_fechaAlta = document.getElementById('param_fechaAlta').value;
                var param_fechaModificacion = document.getElementById('param_fechaModificacion').value;
                var param_fechaBaja = document.getElementById('param_fechaBaja').value;
                var param_tipoFactura = document.getElementById('param_tipoFactura').value;
                var param_tarifa = document.getElementById('param_tarifa').value;
                var param_descuento = document.getElementById('param_descuento').value;
                var param_observaciones = document.getElementById('param_observaciones').value;

                //alert(param_tipo);

                $.ajax({
                    type: 'POST',
                    data:'param_opcion='+param_opcion+'&param_codigo='+param_codigo+'&param_abreviatura='+param_abreviatura+
                        '&param_nombres='+param_nombres+'&param_apellidos='+param_apellidos+'&param_dni='+param_dni+
                        '&param_departamento='+param_departamento+'&param_provincia='+param_provincia+
                        '&param_distrito='+param_distrito+'&param_direccion='+param_direccion+'&param_fechaNacimiento='+param_fechaNacimiento+
                        '&param_telefonoFijo='+param_telefonoFijo+'&param_celular=' +param_celular+
                        '&param_notificacion='+param_notificacion+'&param_email=' +param_email+
                        '&param_idioma='+param_idioma+'&param_tipoCliente=' +param_tipoCliente+
                        '&param_estadoCliente='+param_estadoCliente+'&param_fechaAlta=' +param_fechaAlta+'&param_fechaModificacion='+param_fechaModificacion+
                        '&param_fechaBaja=' +param_fechaBaja+'&param_tipoFactura=' +param_tipoFactura+'&param_tarifa=' +param_tarifa+
                        '&param_descuento='+param_descuento+'&param_observaciones=' +param_observaciones,
                    url: '../../controller/controlcliente/cliente_controller.php',
                    success: function(data){
                        alert('Cliente modificado Correctamente');
                        document.getElementById('param_abreviatura').value= '';
                        document.getElementById('param_nombres').value= '';
                        document.getElementById('param_apellidos').value= '';
                        document.getElementById('param_dni').value= '';
                        document.getElementById('param_departamento').value= '';
                        document.getElementById('param_provincia').value= '';
                        document.getElementById('param_distrito').value= '';
                        document.getElementById('param_direccion').value= '';
                        document.getElementById('param_fechaNacimiento').value= '';
                        document.getElementById('param_telefonoFijo').value= '';
                        document.getElementById('param_celular').value= '';
                        document.getElementById('param_notificacion').value= '';
                        document.getElementById('param_email').value= '';
                        document.getElementById('param_idioma').value= '';                        
                        document.getElementById('param_tipoCliente').value= '';
                        document.getElementById('param_estado').value= '';
                        document.getElementById('param_fechaAlta').value= '';
                        document.getElementById('param_fechaModificacion').value= '';
                        document.getElementById('param_fechaBaja').value= '';
                        document.getElementById('param_tipoFactura').value= '';
                        document.getElementById('param_tarifa').value= '';
                        document.getElementById('param_descuento').value= '';
                        document.getElementById('param_observaciones').value= '';
                        $('#modalCliente').modal('hide');
                        mostrarClientes();
                    },
                    error: function(data){

                    }
                });
            }

        }
    });
});



function mostrarDepartamento(){
    var param_opcion = 'comboDepartamento';
    var codigo = 0;
    $.ajax({
        type: 'POST',
        data:'param_opcion='+param_opcion+'&codigo=' +codigo,
        url: '../../controller/controlcliente/cliente_controller.php',
        success: function(data){
            $('#departamento').html(data);

        },
        error: function(data){

        }
    });
}

function agregarProvincia(){
    var param_opcion = 'comboProvincia';
    var codigo = document.getElementById('param_departamento').value;
    //var codigo = 0;  
    $.ajax({
        type: 'POST',
        data:'param_opcion='+param_opcion+'&codigo=' +codigo,
        url: '../../controller/controlcliente/cliente_controller.php',
        success: function(data){
            $('#provincia').html(data);

        },
        error: function(data){

        }
    });
}

function agregarDistrito(){
    var param_opcion = 'comboDistrito';
    var codigo = document.getElementById('param_provincia').value;
    //var codigo = 0;  
    $.ajax({
        type: 'POST',
        data:'param_opcion='+param_opcion+'&codigo=' +codigo,
        url: '../../controller/controlcliente/cliente_controller.php',
        success: function(data){
            $('#distrito').html(data);

        },
        error: function(data){

        }
    });
}

function mostrarClientes(){
    var param_opcion = 'mostrarClientes';
    var codigo = 0;
    $.ajax({
        type: 'POST',
        data:'param_opcion='+param_opcion+'&codigo=' +codigo,
        url: '../../controller/controlcliente/cliente_controller.php',
        success: function(data){
            $('#tablaClientes').DataTable().destroy();
            $('#cuerpoClientes').html(data);
            $('#tablaClientes').DataTable();

        },
        error: function(data){

        }
    });
}


function eliminar(cliente){
    var respuesta = confirm('¿Desea dar de baja al Cliente?');
    if (respuesta == true) {
        //alert('Acepto');
        var param_opcion = 'modificarEstado';
        $.ajax({
            type: 'POST',
            data:'param_opcion='+param_opcion+'&param_codigo='+cliente,
            url: '../../controller/controlcliente/cliente_controller.php',
            success: function(data){
                alert('Cliente fue dado de baja');
                mostrarClientes();
            },
            error: function(data){
                $('#cuerpoClientes').html(respuesta);
            }
        });
    } else {
        if (respuesta == false) {
            mostrarClientes();
        }

    }

}

function ver(cliente){
    $('#cabeceraRegistro').html(".:: Detalle Cliente ::.");
    $('#estado').show();

    $('#modalCliente').modal({
        show:true,
        backdrop:'static'
    });
    var param_opcion = 'verDatos';

    $.ajax({
        type: 'POST',
        data:'param_opcion='+param_opcion+'&param_codigo='+cliente,
        url: '../../controller/controlcliente/cliente_controller.php',
        success: function(data){
            objeto=JSON.parse(data);
            $("#param_codigo").val(objeto[6]);
            document.getElementById('param_abreviatura').value = (objeto[8]);
            $("#param_nombres").val(objeto[2]);
            $("#param_apellidos").val(objeto[3]);
            $("#param_dni").val(objeto[1]);
            $("#param_direccion").val(objeto[4]);
            $("#param_fechaNacimiento").val(objeto[5]);
            $("#param_telefonoFijo").val(objeto[6]);
            $("#param_celular").val(objeto[9]);
            $("#param_notificacion").val(objeto[10]);
            $("#param_email").val(objeto[11]);
            document.getElementById('param_idioma').value = (objeto[12]);            
            document.getElementById('param_tipoCliente').value = (objeto[14]);
            document.getElementById('param_estado').value = (objeto[15]);
            $("#param_fechaAlta").val(objeto[16]);
            $("#param_fechaModificacion").val(objeto[17]);
            $("#param_fechaBaja").val(objeto[18]);
            document.getElementById('param_tipoFactura').value = (objeto[19]);
            $("#param_tarifa").val(objeto[20]);
            $("#param_descuento").val(objeto[21]);
            $("#param_observaciones").val(objeto[22]);            
            document.getElementById('param_fechaAlta').disabled=true;
            document.getElementById('param_abreviatura').disabled=true;
            document.getElementById('param_nombres').disabled=true;
            document.getElementById('param_apellidos').disabled=true;
            document.getElementById('param_dni').disabled=true;
            document.getElementById('param_direccion').disabled=true;
            document.getElementById('param_fechaNacimiento').disabled=true;
            document.getElementById('param_telefonoFijo').disabled=true;
            document.getElementById('param_celular').disabled=true;
            document.getElementById('param_notificacion').disabled=true;
            document.getElementById('param_email').disabled=true;
            document.getElementById('param_idioma').disabled=true;
            document.getElementById('param_tipoCliente').disabled=true;
            document.getElementById('param_estado').disabled=true;
            document.getElementById('param_fechaBaja').disabled=true;
            document.getElementById('param_tipoFactura').disabled=true;
            document.getElementById('param_tarifa').disabled=true;
            document.getElementById('param_descuento').disabled=true;
            document.getElementById('param_observaciones').disabled=true;
            document.getElementById('register_cliente').style.display = 'none';
            document.getElementById('cancel_cliente').style.display = 'none';
        },
        error: function(data){

        }
    });
}



function editar(cliente){
    $('#cabeceraRegistro').html(".:: Editar Cliente ::.");
    document.getElementById('param_funcion').value= 'Editar';
    //$('#param_estado').disabled = true;
    $('#estado').show();
    $('#param_fechaBaja').attr('disabled',false);

    $('#modalCliente').modal({
        show:true,
        backdrop:'static'
    });

    var param_opcion = 'recuperarDatos';
    $.ajax({
        type: 'POST',
        data:'param_opcion='+param_opcion+'&param_codigo='+cliente,
        url: '../../controller/controlcliente/cliente_controller.php',
        success: function(data){
            objeto=JSON.parse(data);
            $("#param_codigo").val(objeto[6]);
            document.getElementById('param_abreviatura').value = (objeto[8]);
            $("#param_nombres").val(objeto[2]);
            $("#param_apellidos").val(objeto[3]);
            $("#param_dni").val(objeto[1]);
            $("#param_direccion").val(objeto[4]);
            $("#param_fechaNacimiento").val(objeto[5]);
            $("#param_telefonoFijo").val(objeto[6]);
            $("#param_celular").val(objeto[9]);
            $("#param_notificacion").val(objeto[10]);
            $("#param_email").val(objeto[11]);
            document.getElementById('param_idioma').value = (objeto[12]);            
            document.getElementById('param_tipoCliente').value = (objeto[14]);
            document.getElementById('param_estado').value = (objeto[15]);
            $("#param_fechaAlta").val(objeto[16]);
            $("#param_fechaModificacion").val(objeto[17]);
            $("#param_fechaBaja").val(objeto[18]);
            document.getElementById('param_tipoFactura').value = (objeto[19]);
            $("#param_tarifa").val(objeto[20]);
            $("#param_descuento").val(objeto[21]);
            $("#param_observaciones").val(objeto[22]);
            
            document.getElementById('param_fechaAlta').disabled=true;
            document.getElementById('param_abreviatura').disabled=false;
            document.getElementById('param_nombres').disabled=false;
            document.getElementById('param_apellidos').disabled=false;
            document.getElementById('param_dni').disabled=false;
            document.getElementById('param_direccion').disabled=false;
            document.getElementById('param_fechaNacimiento').disabled=false;
            document.getElementById('param_telefonoFijo').disabled=false;
            document.getElementById('param_celular').disabled=false;
            document.getElementById('param_notificacion').disabled=false;
            document.getElementById('param_email').disabled=false;
            document.getElementById('param_idioma').disabled=false;
            document.getElementById('param_tipoCliente').disabled=false;
            document.getElementById('param_estado').disabled=false;
            document.getElementById('param_fechaBaja').disabled=false;
            document.getElementById('param_tipoFactura').disabled=false;
            document.getElementById('param_tarifa').disabled=false;
            document.getElementById('param_descuento').disabled=false;
            document.getElementById('param_observaciones').disabled=false;
            document.getElementById('register_cliente').style.display = 'inline';
            document.getElementById('cancel_cliente').style.display = 'inline';


        },
        error: function(data){

        }
    });   

}


function abrirEmail(cliente){
    $('#modalEmail').modal({
        show:true,
        backdrop:'static'

    });   
        $.ajax({
            type: 'POST',
            data:'param_codigo='+cliente,
            url: '../bd/datosCliente.php',
            success: function(data){
                objeto=JSON.parse(data);          
                $("#nombreCliente").val(objeto[0]);
                $("#correoCliente").val(objeto[1]);                   

            },
            error: function(data){

            }
        });
}

function abrirSMS(cliente){
    $('#modalSMS').modal({
        show:true,
        backdrop:'static'

    });   
        $.ajax({
            type: 'POST',
            data:'param_codigo='+cliente,
            url: '../bd/datosCliente.php',
            success: function(data){
                objeto=JSON.parse(data);          
                $("#celular").val(objeto[2]);                                  

            },
            error: function(data){

            }
        });

}

function mostrarMascotas(cliente){
    
    var clienteCodigo = cliente;            
    llenarMascotas(clienteCodigo);
}


function llenarMascotas(codigoCliente){
    var param_opcion = "mostrarMascotasCliente";
    var cliente = codigoCliente;
    $.ajax({
        type: 'POST',
        data: 'param_opcion='+param_opcion+'&param_codigo='+cliente+'&param_opcion='+param_opcion,
        url: '../../controller/controlcliente/cliente_controller.php',
        success: function(data){
            $('#dataTables-example').DataTable().destroy();
            $('#cuerpoTabla').html(data);
            $('#dataTables-example').DataTable();

        },
        error: function(respuesta)
        {
            alert("ERROR AL MOSTRAR DATOS");
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