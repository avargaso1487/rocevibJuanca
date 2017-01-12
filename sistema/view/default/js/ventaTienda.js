window.numeroDetalleFactura = [];
window.productoId = [];
window.cantidadUC = [];
window.cantidadUV = [];
window.productoPrecio = [];
window.impuestoIva = [];
window.productoDescuento = [];
window.importeProducto = [];
window.almacen = [];

$(document).ready(function(){    
$('#tablaFacturas').DataTable(); //SIEMPREEEEEEEEEE
$('#tablaClientes').DataTable(); 
$('#tablaProductos').DataTable(); 
listarFactura();
listarClientes();
listarProductos();
//mostrarMenu();  
agregarDetalleFactura();
    
montoProductosDetalle = 0;
total = 0;



    $('#param_fechaEntrada').datetimepicker({
      pickTime: false,
      format: 'YYYY-MM-DD',
      language: 'es'
  });

    $('#param_fechaSalida').datetimepicker({
      pickTime: false,
      format: 'YYYY-MM-DD',
      language: 'es'
  });

});

$(function() {
    $('#tablaClientes tbody').on('dblclick', 'tr', function () {seleccionDobleCliente(this);});
    $('#tablaProductos tbody').on('dblclick', 'tr', function () {seleccionDobleProducto(this);});

    $('#register_pedido').on('click', function(){
       //alert('Listo para realizar el registro');
      
       var param_opcion = 'registrar';
       var param_nroFactura = document.getElementById('param_nroFactura').value;
       var param_fecha = document.getElementById('param_fecha').value;
       var param_nroSerie = document.getElementById('param_nroSerie').value;
       var param_codigoCliente = document.getElementById('codigoCliente').value;
       var param_total = document.getElementById('param_total').value;

       var table = $('#tablaDetallesFactura').DataTable();

       var respuesta = confirm('¿Desea registrar la factura?');
       if (respuesta == true) {
            //alert('Registrar');
            $.ajax({
                type: 'POST',
                data:'param_opcion='+param_opcion+'&param_nroFactura='+param_nroFactura+'&param_fecha='+param_fecha+
                    '&param_codigoCliente='+param_codigoCliente+'&param_nroSerie='+param_nroSerie+
                    '&param_total='+param_total+'&param_almacen='+almacen+
                    '&param_numeroDetalleFactura='+numeroDetalleFactura+'&param_codProducto='+productoId+
                    '&param_cantidad='+cantidadUV+'&param_precio='+productoPrecio+'&param_iva='+impuestoIva+
                    '&param_descuentoD='+productoDescuento+'&param_importe='+importeProducto,
                url: '../../controller/controlventas/facturaTienda_controller.php', 
                success: function(data){
                    alert('Factura registrada correctamente');
                    //mostrarProveedores();
                    document.getElementById('codigoCliente').value = '';
                    document.getElementById('param_nroFactura').value = '';
                    document.getElementById('param_fecha').value = '';
                    document.getElementById('param_nroSerie').value = '';
                    document.getElementById('param_total').value = '';
                    document.getElementById('almacen').value = '';
                    
                    var fgeneral = document.getElementById('param_facturacionGeneral').value;                    
                    if (fgeneral === '1')
                        window.close();
                    else
                        location.href='facturasVentaTienda.php';
                    
                    table
                        .clear()
                        .draw(); 
                    numeroDetalleFactura = [];
                    productoId = [];
                    cantidadUC = [];
                    cantidadUV = [];
                    productoPrecio = [];
                    impuestoIva = [];
                    productoDescuento = [];
                    importeProducto = [];
                    almacen=[];

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


function listarDetalleFactura(factura){ 
    var param_opcion = 'listarDetalle';    
    $.ajax({
        type: 'POST',        
        data:'param_opcion='+param_opcion+'&param_numero=' +factura,
        url: '../../controller/controlventas/facturaTienda_controller.php',
        success: function(data){
            $('#tablaDetalleFactura').DataTable().destroy();
            $('#cuerpoDetalleFactura').html(data);
            $('#tablaDetalleFactura').DataTable();
        },
        error: function(data){
                   
        }
    });    
}


function listarFactura()
{
    $.ajax({
        type:'POST',
        data: {param_opcion:'listar'},
        
        url: "../../controller/controlventas/facturaTienda_controller.php",
        success:function(data){
            
        
            $('#tablaFacturas').DataTable().destroy();
            $('#cuerpoFacturas').html(data);
            $('#tablaFacturas').DataTable();
          
                                                                    
        }
    });
}

function listarClientes()
{
    $.ajax({
        type:'POST',
        data: {param_opcion:'listarClientes'},
        
        url: "../../controller/controlventas/facturaTienda_controller.php",
        success:function(data){
            
        
            $('#tablaClientes').DataTable().destroy();
            $('#cuerpoClientes').html(data);
            $('#tablaClientes').DataTable();
          
                                                                    
        }
    });
}

function listarProductos()
{
    $.ajax({
        type:'POST',
        data: {param_opcion:'listarProductos'},
        
        url: "../../controller/controlventas/facturaTienda_controller.php",
        success:function(data){
            
        
            $('#tablaProductos').DataTable().destroy();
            $('#cuerpoProductos').html(data);
            $('#tablaProductos').DataTable();
          
                                                                    
        }
    });
}
function seleccionDobleCliente(e){
    if ($('#tablaClientes tbody tr td').length == 1){
       return false;
    }
    

    if ( $(e).hasClass('selected')){
        $(e).removeClass('selected');
    }
    else {
        $('#tablaClientes').DataTable().$('tr.selected').removeClass('selected');
        $(e).addClass('selected');
    }
    document.getElementById('codigoCliente').value = $('#tablaClientes').DataTable().cell('.selected', 0).data();
    document.getElementById('cliente').value = $('#tablaClientes').DataTable().cell('.selected', 1).data();  
    //$('#verCliente').modal('hide');
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
    document.getElementById('codigoProducto').value = $('#tablaProductos').DataTable().cell('.selected', 0).data();
    document.getElementById('producto').value = $('#tablaProductos').DataTable().cell('.selected', 1).data();
    document.getElementById('precio').value = $('#tablaProductos').DataTable().cell('.selected', 2).data(); 
    //$('#verProducto').modal('hide');
    document.getElementById('addRow').disabled = false; 
}


function agregarDetalleFactura() {
    var counter = 1;
    var t = $('#tablaDetallesFactura').DataTable();


    $('#addRow').on( 'click', function () {
        var codigo              = document.getElementById('codigoProducto').value;
        var producto        = document.getElementById('producto').value;
        var precio              = document.getElementById('precio').value;
        var descripcion = ' ';
        var importe = precio *1;

        

        t.row.add( [
            codigo,
            descripcion,
            producto,
            precio,
            importe.toFixed(2),
          
        ] ).draw( false );
        
        productoId.push(codigo);
        numeroDetalleFactura.push(counter);
        counter++;
        montoProductosDetalle = montoProductosDetalle + importe;
        
        totalNeto = montoProductosDetalle;

        productoPrecio.push(precio);
 
        importeProducto.push(importe);
        
        document.getElementById('codigoProducto').value="";
        document.getElementById('producto').value="";
        document.getElementById('precio').value="0"; 
        
        document.getElementById('param_total').value=montoProductosDetalle;
        
        document.getElementById('addRow').disabled=true;
     

    } );
}
function EliminarFac(codigo,precio,importe,counter) {  
    //alert(importe);
    //document.getElementById('param_totalBI').value=document.getElementById('param_totalBI').value - parseFloat(importe) ;
    montoProductosDetalle = montoProductosDetalle - importe;
    //descuentoPP = parseFloat(montoProductosDetalle) * (18/100);

    


    var pos = productoId.indexOf(codigo);
    var pos2 = numeroDetalleFactura.indexOf(counter);
    var pos5 = productoPrecio.indexOf(precio);

    var pos8 = importeProducto.indexOf(importe);
 
    
    
    productoId.splice(pos, 1);
    numeroDetalleFactura.splice(pos2, 1);
    cantidadUC.splice(pos, 1);
    cantidadUV.splice(pos, 1);
    productoPrecio.splice(pos, 1);
    impuestoIva.splice(pos, 1);
    productoDescuento.splice(pos, 1);
    importeProducto.splice(pos, 1);
}

function solonumeros(e) {
    key = e.keyCode || e.which;
    teclado = String.fromCharCode(key);
    numeros = "0123456789";
    especiales = "8-37-38-46"
    teclado_especial=false;

    for (var i in especiales) {
        if (key == especiales[i]) {
            teclado_especial= true;
        }
    }

    if (numeros.indexOf(teclado)==-1 && !teclado_especial) {
        return false;
    }
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