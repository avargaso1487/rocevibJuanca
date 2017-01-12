window.numeroDetalleServicio = [];
window.servicioId = [];
window.servicioPrecio = [];
window.importeProducto = [];


window.onload = function(){    
    $('#dataTables-example').DataTable(); //SIEMPREEEEEEEEEE
    $('#tablaSpa').DataTable(); 
    $('#tablaProductos').DataTable(); 
    $('#tablaR').DataTable();
        agregarDetalleFactura();
    funcionPrincipal();
    mostrarMenu();  
    $('#param_fechainicio').datetimepicker({
      pickTime: false,
      format: 'YYYY-MM-DD',
      language: 'es'
});


}


$(document).ready(function(){    

montoProductosDetalle = 0;
descuentoPP = 0;
total = 0;
descPorcentaje = 0;
totalBI = 0;
neto = 0;
descPP = 0;

    $('#param_fechainicio').datetimepicker({
      pickTime: true,
      format: 'YYYY-MM-DD HH:mm',
      language: 'es'

  });
    $('#param_fechafinal').datetimepicker({
      pickTime: true,
      format: 'YYYY-MM-DD HH:mm',
      language: 'es'
    
  });
    $('#proxServ').datetimepicker({
      pickTime: false,
      format: 'YYYY-MM-DD',
      language: 'es'
    
  });
});

$(function() {
    
    $('#tablaProductos tbody').on('dblclick', 'tr', function () {seleccionDobleProducto(this);});

    $('#register_pedido').on('click', function(){
       //alert('Listo para realizar el registro');
      
       var param_opcion = 'registrar';
       

       var param_cliente_id = document.getElementById('comboCliente').value;
       var param_mascota_id = document.getElementById('comboMascota').value;
       var param_fechainicio = document.getElementById('param_fechainicio').value;
       var param_fechafinal = document.getElementById('param_fechafinal').value;
       var param_llegada = document.getElementById('param_llegada').value;
       var param_entrega = document.getElementById('param_entrega').value;
        var param_proxServ = document.getElementById('proxServ').value;

        
       var table = $('#tablaSpa').DataTable();

       var respuesta = confirm('¿Desea registrar el servicio?');
       if (respuesta == true) {
            //alert('Registrar');
            $.ajax({
                type: 'POST',
                data:'param_opcion='+param_opcion+'&param_cliente_id='+param_cliente_id+'&param_mascota_id='+param_mascota_id+
                    '&param_fechainicio='+param_fechainicio+'&param_proxServ='+param_proxServ+
                    '&param_fechafinal='+param_fechafinal+'&param_numeroDetalleServicio='+numeroDetalleServicio+
                    '&param_servicio_id='+servicioId+'&param_servicio_precio='+servicioPrecio+
                    '&param_llegada='+param_llegada+'&param_entrega='+param_entrega,
                    
                url: '../../controller/controlspa/spa_controller.php', 
                success: function(data){
                    alert('Servicio registrado correctamente');
                    //mostrarProveedores();
                    document.getElementById('comboCliente').value = '';
                    document.getElementById('comboMascota').value = '';
                    document.getElementById('param_fechainicio').value = '';
                    document.getElementById('param_fechafinal').value = '';
                    document.getElementById('proxServ').value = '0';
                    location.href='spa.php';
                   
                   
                   table
                        .clear()
                        .draw(); 
                    numeroDetalleServicio = [];
                    servicioId = [];
                    servicioPrecio = [];


                },
                error: function(data){
                    //$('#cuerpoTabla').html(respuesta);
                }
            });
       } else {
        if (respuesta == false) {
          alert('Se cancelo el registro');
        }

      } 
    });

});




//Declarar variables globales

function funcionPrincipal()
{
	//asignar eventos a componentes html
	//EJM (combo) : $("#idDelCombobox").change(nombreDeLaFuncion);
	listarSpa();
	mostrarCliente();
    mostrarServicio();
    listarRecordatorio();
    //limpiar();

}

function activarBoton()
{
     document.getElementById("addRow").disabled=false;
}

function facturar(servicio){ 
  //alert(pedido); 
  location.href='facturarServicio.php?servicio=' + servicio;
}

function listarSpa()
{
    $.ajax({
        type:'POST',
        data: {param_opcion:'listar'},
        
        url: "../../controller/controlspa/spa_controller.php",
        success:function(data){
        		
        
            $('#dataTables-example').DataTable().destroy();
            $('#cuerpoTabla').html(data);
            $('#dataTables-example').DataTable();
          
                                                                    
        }
    });
}


function listarRecordatorio()
{
    $.ajax({
        type:'POST',
        data: {param_opcion:'listarR'},
        
        url: "../../controller/controlspa/spa_controller.php",
        success:function(data){
                
        
            $('#tablaR').DataTable().destroy();
            $('#cuerpoTablaR').html(data);
            $('#tablaR').DataTable();
          
                                                                    
        }
    });
}


function listarDetalleServicio(servicio){ 
    var param_opcion = 'listarDetalle';    
    $.ajax({
        type: 'POST',        
        data:'param_opcion='+param_opcion+'&param_spa_id=' +servicio,
        url: '../../controller/controlspa/spa_controller.php',
        success: function(data){
            $('#tablaDetalleServicio').DataTable().destroy();
            $('#cuerpoDetalleServicio').html(data);
            $('#tablaDetalleServicio').DataTable();
        },
        error: function(data){
                   
        }
    });    
}

function mostrarCliente(){ 
    var param_opcion = 'comboCliente';
    
    $.ajax({
        type: 'POST',        
        data:'param_opcion='+param_opcion,
        url: "../../controller/controlspa/spa_controller.php",
        success: function(data){
            $('#cliente').html(data);
            
        },
        error: function(data){
                   
        }
    });    
}

function mostrarMascota(){ 

    var cliente = document.getElementById('comboCliente').value;
    var param_opcion = "comboMascota";
    $.ajax({
        type:'POST',
        data:'param_opcion='+param_opcion+'&param_cliente_id='+cliente,
        url:"../../controller/controlspa/spa_controller.php",
        success:function(respuesta)
        {           
            $('#comboMascota').html(respuesta);
        },
        error: function(respuesta)
        {
            alert("ERROR AL MOSTRAR DATOS");
        }
    }); 
}

function mostrarServicio(){ 
    var param_opcion = 'comboServicio';
    
    $.ajax({
        type: 'POST',        
        data:'param_opcion='+param_opcion,
        url: "../../controller/controlspa/spa_controller.php",
        success: function(data){
            
             $('#tablaProductos').DataTable().destroy();
            $('#cuerpoProductos').html(data);
            $('#tablaProductos').DataTable();
          
            

        },
        error: function(data){
                   
        }
    });    
}



function seleccionDobleProducto(e){
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
    document.getElementById('precio').value = $('#tablaProductos').DataTable().cell('.selected', 2).data();
    document.getElementById('producto').value = $('#tablaProductos').DataTable().cell('.selected', 1).data();
    document.getElementById('codigo').value = $('#tablaProductos').DataTable().cell('.selected', 0).data();
   
    $('#verProducto').modal('hide');
    document.getElementById('addRow').disabled = false; 
}

function mostrarCabecera() { 
    var param_spa_id = document.getElementById('param_spa_id').value;
    var param_opcion = 'mostrar_cabecera';
    //alert(param_pedido);
    $.ajax({
        type: 'POST',       
        //dataType: 'json', 
        data:'param_opcion='+param_opcion+'&param_spa_id='+param_spa_id,
        url: '../controller/controlspa/spa_controller.php',
        success: function(data){
            objeto=JSON.parse(data);
            //alert("holaaaa");
            //$("#param_nroPedido").val(objeto[0]);
            document.getElementById('cliente').value = "holi";         
            document.getElementById('codigoCliente').value = (objeto[2]);      
            //document.getElementById('param_codigoProveedor').value = (objeto[12]); 
        },
        error: function(data){
                   
        }
    });
}
function mostrarCliente_e(){ 
    var param_opcion = 'combo_e';
    
    $.ajax({
        type: 'POST',        
        data:'param_opcion='+param_opcion,
        url: "../controller/controlSpa/Spa_controller.php",
        success: function(data){
            $('#sub_e').html(data);
            
            

        },
        error: function(data){
                   
        }
    });    
}

// function editarSpa(idSpa)
// {
//     $.ajax({
//         type:'POST',
//         data: {param_opcion:'buscar',param_Spa_id:idSpa},
//         dataType: 'json',
//         url: "../controller/controlSpa/Spa_controller.php",
//         success:function(data){
//                 if(data.length > 0)
//                 {
//                    $.each(data, function (i, value) 
//                         {
//                             $("#codigo_e").val(value["ART_codigo"]);
//                             $("#codigobarras_e").val(value["ART_codigoBarras"]);
//                             $("#concepto_e").val(value["ART_concepto"]);
//                             $("#descripcion_e").val(value["ART_descripcion"]);
//                             $("#referencia_e").val(value["ART_referencia"]);
//                             $("#subfamilia_e").val(value["SFAM_codigo"]);
//                             $("#observaciones_e").val(value["ART_observaciones"]);
//                             $("#stock_e").val(value["ART_stockActual"]);
//                             $("#stockminimo_e").val(value["ART_stockMinimo"]);
//                             $("#costocompra_e").val(value["ART_costoCompra"]);
//                             $("#precioventa_e").val(value["ART_Precioventa"]);
//                             $("#igv_e").val(value["ART_IVA"]);
                            
                            
//                         });

//                 }
                            
//         }
//     });
//     document.getElementById("codigo_e").disabled=false;
//     document.getElementById("codigobarras_e").disabled=false;
//     document.getElementById("concepto_e").disabled=false;
//     document.getElementById("codigo_e").disabled=false;
//     document.getElementById("descripcion_e").disabled=false;
//     document.getElementById("referencia_e").disabled=false;
//     document.getElementById("subfamilia_e").disabled=false;
//     document.getElementById("observaciones_e").disabled=false;
//     document.getElementById("stock_e").disabled=false;
//     document.getElementById("stockminimo_e").disabled=false;
//     document.getElementById("costocompra_e").disabled=false;
//     document.getElementById("precioventa_e").disabled=false;
//     document.getElementById("igv_e").disabled=false;
// document.getElementById("actualizar").style.display='block';
// }


// function mostrarSpa(idSpa)
// {
//     $.ajax({
//         type:'POST',
//         data: {param_opcion:'buscar',param_Spa_id:idSpa},
//         dataType: 'json',
//         url: "../controller/controlSpa/Spa_controller.php",
//         success:function(data){
//                 if(data.length > 0)
//                 {
//                    $.each(data, function (i, value) 
//                         {
//                             $("#codigo_e").val(value["ART_codigo"]);
//                             $("#codigobarras_e").val(value["ART_codigoBarras"]);
//                             $("#concepto_e").val(value["ART_concepto"]);
//                             $("#descripcion_e").val(value["ART_descripcion"]);
//                             $("#referencia_e").val(value["ART_referencia"]);
//                             $("#subfamilia_e").val(value["SFAM_codigo"]);
//                             $("#observaciones_e").val(value["ART_observaciones"]);
//                             $("#stock_e").val(value["ART_stockActual"]);
//                             $("#stockminimo_e").val(value["ART_stockMinimo"]);
//                             $("#costocompra_e").val(value["ART_costoCompra"]);
//                             $("#precioventa_e").val(value["ART_Precioventa"]);
//                             $("#igv_e").val(value["ART_IVA"]);
                            
                            
//                         });

//                 }
                            
//         }
//     });
//     document.getElementById("codigo_e").disabled=true;
//     document.getElementById("codigobarras_e").disabled=true;
//     document.getElementById("concepto_e").disabled=true;
//     document.getElementById("codigo_e").disabled=true;
//     document.getElementById("descripcion_e").disabled=true;
//     document.getElementById("referencia_e").disabled=true;
//     document.getElementById("subfamilia_e").disabled=true;
//     document.getElementById("observaciones_e").disabled=true;
//     document.getElementById("stock_e").disabled=true;
//     document.getElementById("stockminimo_e").disabled=true;
//     document.getElementById("costocompra_e").disabled=true;
//     document.getElementById("precioventa_e").disabled=true;
//     document.getElementById("igv_e").disabled=true;
//     document.getElementById("actualizar").style.display='none';
    

// }


function agregarDetalleFactura() {
    var counter = 1;
    var t = $('#tablaSpa').DataTable();


    $('#addRow').on( 'click', function () {
        var codigo              = document.getElementById('codigo').value;
        var descripcion         = document.getElementById('producto').value;
        
        var precio              = document.getElementById('precio').value;

        var importe= 0;


        precioBruto = (precio);


        importe = precioBruto ;

        t.row.add( [
            codigo,
            descripcion,
           
            precio,
           
            //importe.toFixed(2),
            //'<button class="btn btn-danger btn-xs center" >Eliminar Producto</button>',
        ] ).draw( false );
        
        servicioId.push(codigo);
        servicioPrecio.push(precio);
        numeroDetalleServicio.push(counter);
        counter++;
        montoProductosDetalle = montoProductosDetalle + importe;
        
        totalNeto = montoProductosDetalle;

        //cantidadUC.push(cantidad);



        importeProducto.push(importe);
        
       
        
       
        document.getElementById('precio').value="0"; 
        
        
        
        
        document.getElementById('addRow').disabled=true;
     

    } );
}

function anularSpa(idSpa)
{
    

    $.ajax({
        type:'POST',
        data: {param_opcion:'eliminar',param_spa_id: idSpa},
        url: "../../controller/controlspa/spa_controller.php",
        success:function(data)
        {
             	listarSpa();
                            
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
// function limpiar()
// {
    
//     document.getElementById("codigobarras").value='';
//     document.getElementById("concepto").value='';
//     document.getElementById("descripcion").value='';
//     document.getElementById("referencia").value='';
//     document.getElementById("subfamilia").selectedIndex=0;
//     document.getElementById("observaciones").value='';
//     document.getElementById("stock").value='';
//     document.getElementById("stockminimo").value='';
//     document.getElementById("costocompra").value='';
//     document.getElementById("precioventa").value='';
//     document.getElementById("igv").value='';
// }


// function validarCampos()
// {
    
//     cliente = document.getElementById("comboCliente").selectedIndex;
//     comboMascota = document.getElementById("comboMascota").value;
//     servicio = document.getElementById("comboServicio").value;
    


//     if( cliente == null || cliente == 0 ) {
//     return false;
//     }

//     if( comboMascota == null || comboMascota == 0 ) 
//     {
//     return false;
//     }

//     if( servicio == null || servicio == 0 ) {
//     return false;
//     }


   

 

    
// }