$(document).ready(function() {
  $('#tablaHuespedes').DataTable();
  $('#tablaServicios').DataTable();
  mostrarMenu(); 
  agregarDetalleRegistro();
  mostrarNroReg();
  //editarCabecera(); 
  montoServiciosDetalle = 0;
  descuentoPP = 0;
  total = 0;
  descPorcentaje = 0;
  totalBI = 0;
  neto = 0;
  descPP = 0;
  $('#param_fechaEntrada').datetimepicker({
      pickTime: false,
      format: 'YYYY-MM-DD',
      language: 'es'
  }); 
  
  $('#param_fechaSalida').datetimepicker({
      pickTime: false,
      format: 'YYYY-MM-DD',
      language: 'es',
  });

});


$(function() {
  $('#buscarHuesped').on('click', function(){
       //alert('Agregar Proveeor');
       $('#verHuesped').modal({
            show:true,
            backdrop:'static',
        });
        var param_opcion = 'mostrarHuespedes'
        $.ajax({
          type: 'POST',        
          data:'param_opcion='+param_opcion,
          url: '../../controller/controlUsuario/usuario.php',          
          success: function(data){
            $('#tablaHuespedes').DataTable().destroy();
            $('#cuerpoHuespedes').html(data);
            $('#tablaHuespedes').DataTable();
          },
          error: function(data){
                     
          }
        });     
     
    });  

   $('#buscarServicios').on('click', function(){
       //alert('Agregar Proveeor');
       $('#verServicios').modal({
            show:true,
            backdrop:'static',
        });
        var param_opcion = 'mostrarServicios'
        $.ajax({
          type: 'POST',        
          data:'param_opcion='+param_opcion,
          url: '../../controller/controlUsuario/usuario.php',          
          success: function(data){
            $('#tablaServicios').DataTable().destroy();
            $('#cuerpoServicios').html(data);
            $('#tablaServicios').DataTable();
          },
          error: function(data){
                     
          }
        });     
     
    });  

});


//Los DOble Click
$('#tablaHuespedes tbody').on('dblclick', 'tr', function () {seleccionDobleHuesped(this);});
$('#tablaServicios tbody').on('dblclick', 'tr', function () {seleccionDobleServicios(this);});

function seleccionDobleHuesped(e){

    if ($('#tablaHuespedes tbody tr td').length == 1){
       return false;
    }
    
    if ( $(e).hasClass('selected')){
        $(e).removeClass('selected');
    }

    else {
        $('#tablaHuespedes').DataTable().$('tr.selected').removeClass('selected');
        $(e).addClass('selected');
    }
    document.getElementById('param_idHuesped').value = $('#tablaHuespedes').DataTable().cell('.selected', 0).data();
    document.getElementById('param_huesped').value = $('#tablaHuespedes').DataTable().cell('.selected', 1).data();  
    $('#verHuesped').modal('hide');
}

function seleccionDobleServicios(e){

    if ($('#tablaServicios tbody tr td').length == 1){
       return false;
    }
    
    if ( $(e).hasClass('selected')){
        $(e).removeClass('selected');
    }

    else {
        $('#tablaServicios').DataTable().$('tr.selected').removeClass('selected');
        $(e).addClass('selected');
    }
    document.getElementById('param_idServicio').value = $('#tablaServicios').DataTable().cell('.selected', 0).data();
    document.getElementById('param_servicio').value = $('#tablaServicios').DataTable().cell('.selected', 1).data();
      document.getElementById('param_precio').value = $('#tablaServicios').DataTable().cell('.selected', 2).data();
    $('#verServicios').modal('hide');
}


function agregarDetalleRegistro() {

    var counter = 1;
    var t = $('#tablaDetallesRegistro').DataTable();


    $('#addRow').on( 'click', function () {
        var codigo              = document.getElementById('param_idServicio').value;
        var servicio         = document.getElementById('param_servicio').value;
        var precio              = document.getElementById('param_precio').value;
        var obs             = document.getElementById('param_obs').value;
        precioTotal = precio * 1;
        t.row.add( [
          '<center>'+codigo+'</center>',
          servicio,
          '<center>'+precioTotal.toFixed(2)+'</center>',
          '<center>'+obs+'</center>',
          '<button class="btn btn-danger btn-xs center deleteValid col-md-offset-2" onclick="Eliminar('+"'"+codigo+"'"+','+"'"+precio+"'"+'>Eliminar</button>',
        ] ).draw( false );
        
              /*cursoId.push(codigo);
              productoId.push(codigo);
              numeroDetallePedido.push(counter);
              counter++;
              montoProductosDetalle = montoProductosDetalle + importe;
              descuentoPP = montoProductosDetalle * (18/100);
              totalNeto = montoProductosDetalle + descuentoPP;
              cantidadUC.push(cantidad);
              cantidadUV.push(cantidad);
              pedidosPrecios.push(precio);
              impuestoIva.push(iva);
              pedidoDescuento.push(descuento);
              importeProducto.push(importe);*/

              montoServiciosDetalle = montoServiciosDetalle + precioTotal;

              document.getElementById('param_idServicio').value="";
              document.getElementById('param_servicio').value="";
              document.getElementById('param_precio').value=0; 
              document.getElementById('param_total').value=montoServiciosDetalle;
       

              
              // para el descuento normal
              //alert(descPorc);
              var varTotal = document.getElementById('param_total').value;  

    } );

    $('#tablaDetallesRegistro tbody').on( 'click', 'button', function () {
        t
            .row( $(this).parents('tr') )
            .remove()
            .draw();
    });

    
}

function Eliminar(codigo,precio) {  
    //alert(importe);
    montoProductosDetalle = montoProductosDetalle ;
    document.getElementById('param_total').value=deleteTotal.toFixed(2);
    //alert(descPorc);

    document.getElementById('param_descuentoPP16').value=descuentoPP.toFixed(2);


    var varTotalEli = document.getElementById('param_total').value;
    neto = parseFloat(varTotalEli)+parseFloat(descuentoPP);
    document.getElementById('param_totalNeto').value=neto.toFixed(2);


    var pos = productoId.indexOf(codigo);
    var pos2 = numeroDetallePedido.indexOf(counter);
    var pos3 = cantidadUC.indexOf(cantidad);
    var pos4 = cantidadUV.indexOf(cantidad);

    var pos5 = pedidosPrecios.indexOf(precio);
    var pos6 = impuestoIva.indexOf(iva);

    var pos7 = pedidoDescuento.indexOf(descuento);
    var pos8 = importeProducto.indexOf(importe);
 
    
    
    productoId.splice(pos, 1);
    numeroDetallePedido.splice(pos2, 1);
    cantidadUC.splice(pos, 1);
    cantidadUV.splice(pos, 1);
    pedidosPrecios.splice(pos, 1);
    impuestoIva.splice(pos, 1);
    pedidoDescuento.splice(pos, 1);
    importeProducto.splice(pos, 1);
}


function mostrarNroReg() {   
     var param_opcion = 'numero_registro';
     $.ajax({
        type: 'POST',        
        data:'param_opcion='+param_opcion,
        url: '../../controller/controlUsuario/usuario.php', 
        success: function(data){
          //$('#permisos').html(data);
          document.getElementById('param_nroRegistro').value= data;
        },
        error: function(data){
                   
        }
    });
}

function mostrarMenu()
{
  var grupo = document.getElementById('NombreGrupo').value;
    var tarea = document.getElementById('NombreTarea').value;

  $.ajax({
        type:'POST',
        data: 'param_opcion=listarMenu&grupo='+grupo+'&tarea='+tarea,
        url: "../../controller/controlusuario/tree.php",
        success:function(data){                            
            $('#permisos').html(data);                
        }
    });
}

