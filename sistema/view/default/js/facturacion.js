window.numeroDetalleFactura = [];
window.productoId = [];
window.cantidadUC = [];
window.cantidadUV = [];
window.productoPrecio = [];
window.impuestoIva = [];
window.productoDescuento = [];
window.importeProducto = [];

$(document).ready(function() {    
$('#tablaFacturas').DataTable(); //SIEMPREEEEEEEEEE
$('#tablaClientes').DataTable(); 
$('#tablaProductos').DataTable(); 
$('#tablaFacturaciones').DataTable(); 
listarFactura();
listarClientes();
listarProductos();
mostrarMenu();  
agregarDetalleFactura();
    
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
});

function OpenInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
}

function agregarProducto() {
    var serie = $('#serie_factura').val();
    var nro = $('#numero_factura').val();
    var fecha = $('#param_fecha').val();

    var codigoCliente = $('#codigoCliente').val();
    var nombreCliente = $('#nombre_cliente').val();

    var link = '../ventas/nuevaFacturaVentaTienda.php?serie='+serie
        + '&nro='+nro
        + '&fecha='+fecha
        + '&codigoCliente='+codigoCliente
        + '&nombreCliente='+nombreCliente
        + '&facturacionGeneral=1';
    OpenInNewTab(link);
}

function agregarSPA() {
    var serie = $('#serie_factura').val();
    var nro = $('#numero_factura').val();

    var codigoCliente = $('#codigoCliente').val();

    var link = '../spa/nuevoServicioSpa.php?serie='+serie
        + '&nro='+nro
        + '&codigoCliente='+codigoCliente
        + '&facturacionGeneral=1';
    OpenInNewTab(link);
}

function agregarConsulta() {
    var serie = $('#serie_factura').val();
    var nro = $('#numero_factura').val();
    var fecha = $('#param_fecha').val();

    var codigoCliente = $('#codigoCliente').val();
    var nombreCliente = $('#nombre_cliente').val();

    var link = '../clinica/consultaMedica.php?serie='+serie
        + '&nro='+nro
        + '&fecha='+fecha
        + '&codigoCliente='+codigoCliente
        + '&nombreCliente='+nombreCliente
        + '&facturacionGeneral=1';
    OpenInNewTab(link);
}

function generarFactura() {
    var serie = $('#serie_factura').val();
    var numero = $('#numero_factura').val();

    $.get('generar.php?serie='+serie+'&nro='+numero, function (data) {
        $('#cuerpoDetallesFactura').html(data);        
        //console.log(data);
    });

    $.ajax({
        type: 'POST',
        data:'serie='+serie+'&numero='+numero,
        url: 'calcularImporte.php', 
        success: function(data){            
            document.getElementById('monto_total').value = data;            
        },
        error: function(data){
            alert('error '+data);
        }
    });

}

$(function() {
    $('#agregar_producto').on('click', agregarProducto);
    $('#agregar_spa').on('click', agregarSPA);
    $('#agregar_consulta').on('click', agregarConsulta);
    $('#tipo_pago').on('change', mostrarBanco);    
    $('#registrar_factura').on('click', registrarFactura);    

    $('#btnGenerarFactura').on('click', generarFactura);


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
                    '&param_total='+param_total+
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
    // Cargar clientes usando AJAX
    $.ajax({
        type:'POST',
        data: {param_opcion:'listarClientes'},
        
        url: "../../controller/controlventas/facturaTienda_controller.php",
        success:function(data) {
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
    document.getElementById('nombre_cliente').value = $('#tablaClientes').DataTable().cell('.selected', 1).data();  
    $('#verCliente').modal('hide');
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
    document.getElementById('igv').value = $('#tablaProductos').DataTable().cell('.selected', 5).data();  
    $('#verProducto').modal('hide');
    document.getElementById('addRow').disabled = false; 
}


function agregarDetalleFactura() {
    var counter = 1;
    var t = $('#tablaDetallesFactura').DataTable();


    $('#addRow').on( 'click', function () {
        var codigo              = document.getElementById('codigoProducto').value;
        var descripcion         = document.getElementById('producto').value;
        var cantidad            = document.getElementById('cantidad').value;
        var precio              = document.getElementById('precio').value;
        var iva                 = document.getElementById('igv').value;
        var descuento           = document.getElementById('descuento').value;
        var desc= 0;
        var precioBruto= 0;
        var descontar= 0;
        var importe= 0;


        desc = descuento;
        precioBruto = (precio * cantidad);

        if (desc > 0)
        {                       
            desc  = precioBruto* (desc/100);
            descontar = desc;           
        } else {
            descuento = 0;
        }

        importe = precioBruto - descontar;

        t.row.add( [
            codigo,
            descripcion,
            cantidad,
            precio,
            iva,
            descuento,
            importe.toFixed(2),
            //'<button class="btn btn-danger btn-xs center" >Eliminar Producto</button>',
        ] ).draw( false );
        
        productoId.push(codigo);
        numeroDetalleFactura.push(counter);
        counter++;
        montoProductosDetalle = montoProductosDetalle + importe;
        
        totalNeto = montoProductosDetalle;

        //cantidadUC.push(cantidad);
        cantidadUV.push(cantidad);

        productoPrecio.push(precio);
        impuestoIva.push(iva);
        productoDescuento.push(descuento);
        importeProducto.push(importe);
        
        document.getElementById('codigoProducto').value="";
        document.getElementById('producto').value="";
        document.getElementById('cantidad').value="1";
        document.getElementById('precio').value="0"; 
        document.getElementById('igv').value="";
        document.getElementById('descuento').value="";             
        
        document.getElementById('param_total').value=montoProductosDetalle;
        
        document.getElementById('addRow').disabled=true;
     

    } );
}

function EliminarFac(codigo,cantidad,precio,iva,descuento,importe,counter) {  
    //alert(importe);
    //document.getElementById('param_totalBI').value=document.getElementById('param_totalBI').value - parseFloat(importe) ;
    montoProductosDetalle = montoProductosDetalle - importe;
    //descuentoPP = parseFloat(montoProductosDetalle) * (18/100);

    


    var pos = productoId.indexOf(codigo);
    var pos2 = numeroDetalleFactura.indexOf(counter);
    var pos3 = cantidadUC.indexOf(cantidad);
    var pos4 = cantidadUV.indexOf(cantidad);

    var pos5 = productoPrecio.indexOf(precio);
    var pos6 = impuestoIva.indexOf(iva);

    var pos7 = productoDescuento.indexOf(descuento);
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
function validarCampos()
{
    
    sucursal = document.getElementById("sucursal").selectedIndex;
    codigobarras = document.getElementById("codigobarras").value;
    concepto = document.getElementById("concepto").value;
    descripcion = document.getElementById("descripcion").value;
    referencia = document.getElementById("referencia").value;
    subfamilia = document.getElementById("subfamilia").selectedIndex;
    stock = document.getElementById("stock").value;
    stockminimo = document.getElementById("stockminimo").value;
    costocompra = document.getElementById("costocompra").value;
    precioventa = document.getElementById("precioventa").value;
    igv = document.getElementById("igv").value;

    if( sucursal == null || sucursal == 0 ) {
    return false;
    }

    if( codigobarras == null || codigobarras == 0 ) 
    {
    return false;
    }

    if( concepto == null || concepto == 0 ) {
    return false;
    }

    if( descripcion == null || descripcion == 0 ) 
    {
    return false;
    }
    if( referencia == null || referencia == 0 ) {
    return false;
    }

    if( subfamilia == null || subfamilia == 0 ) 
    {
    return false;
    }
    

    if( stock == null || stock == 0 ) 
    {
    return false;
    }
    if( stockminimo == null || stockminimo == 0 ) {
    return false;
    }

    if( costocompra == null || costocompra == 0 ) 
    {
    return false;
    }
    if( precioventa == null || precioventa == 0 ) {
    return false;
    }
    if( igv == null || igv == 0 ) {
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


function registrarFactura()
{
    var tipoPago = document.getElementById('tipo_pago').value;
    
    var monto = document.getElementById('monto_total').value;
    var pago = document.getElementById('monto_cancelado').value;

    //document.getElementById('cancelar').style.display = 'inline';       

    var banco = '';
    var operacion = '';

    if (monto !== pago)
    {        
        if (tipoPago === '1' || tipoPago === '2')
        {
            alert('Los montos no coinciden');
            return;
        }        
    }

    if (tipoPago === '2')
    {
        
        banco = document.getElementById('tarjeta_banco').value;
        
        operacion = document.getElementById('tarjeta_operacion').value;

        if (banco === '' || operacion === '')
        {
            alert('DEBE REGISTRAR EL BANCO Y EL NUMERO DE OPERACION!');
            return;
        }
    }

    //alert('factura registrada');

    var tipodocumento = document.getElementById('tipo_documento').value;
    var serie = $('#serie_factura').val();
    var numero = $('#numero_factura').val();
    var fecha = document.getElementById('param_fecha').value;
    var cliente = document.getElementById('codigoCliente').value;

    $.ajax({
        type: 'POST',
        data:'serie='+serie+'&numero='+numero+'&cliente='+cliente+'&fecha='+fecha+'&tipodoc='+tipodocumento+'&montopagado='+pago+'&tipoPago='+tipoPago+'&banco='+banco+'&operacion='+operacion+'&monto='+monto,
        url:"registrarFacturaGrupal.php",
        success: function(data)
        {               
            limpiar();
            alert('Factura Registrada');            
        }
    });    
}   

function mostrarBanco(){    
    var tipoPago = document.getElementById('tipo_pago').value;    
    if (tipoPago === '2')
    {
        document.getElementById('grupo_banco').style.display = 'inline';       
        document.getElementById('grupo_operacion').style.display = 'inline';       
    }
    else
    {
        document.getElementById('grupo_banco').style.display = 'none';       
        document.getElementById('grupo_operacion').style.display = 'none';          
    }
}

function limpiar()
{
    $('#tablaDetallesFactura').DataTable().destroy();
    $('#tablaDetallesFactura').DataTable();                     
    document.getElementById('monto_total').value = '';
    document.getElementById('monto_cancelado').value = '';
    document.getElementById('serie_factura').value = '';
    document.getElementById('numero_factura').value = '';
    document.getElementById('param_fecha').value = '';
    document.getElementById('codigoCliente').value = '';
    document.getElementById('nombre_cliente').value = '';
    document.getElementById('tarjeta_banco').value = '';
    document.getElementById('tarjeta_operacion').value = '';
}

