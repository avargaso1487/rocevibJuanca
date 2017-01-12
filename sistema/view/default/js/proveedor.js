window.codigoLinea = [];
window.onload = function(){
    mostrarDepartamento();
    mostrarSeccion();
    mostrarMenu();  
    mostrarDepartamento2();
    $('#tablaProveedores').DataTable();    
    //$('#tablaDetalleLineas').DataTable();

    $('#tablaDetalleLineas').dataTable({
        "bPaginate": false,
        "bFilter": false,
        "bInfo": false
    });

    $('#tablaProveedorLinea').dataTable();
    
    mostrarProveedores();
    $('#detalle_linea').hide();
    agregarDetalleLinea();
}

$(function() {
   $('#new_proveedor').on('click', function(){
       //alert('Agregar Proveeor');
       $('#cabeceraRegistro').html(".:: Nuevo Proveedor ::.");
       $('#modalProveedor').modal({
            show:true,
            backdrop:'static',
        });  
        $('#addLinea2').hide(); 
        $('#addLinea').show();  
      //$('#estado').show();
      $('#estado').hide();
    });

    $('#cancel_proveedor').on('click', function(){
       //alert('Agregar Proveeor');
       
        $('#modalProveedor').modal('hide');
        mostrarProveedores();
        document.getElementById('param_nombres').value= '';
        document.getElementById('param_contacto').value= '';
        document.getElementById('param_tipo').value= '';
        document.getElementById('param_ruc').value= '';
        document.getElementById('param_dni').value= '';
        document.getElementById('param_fechaAlta').value= '';
        document.getElementById('param_direccion').value= '';
        document.getElementById('param_departamento').value= '';
        document.getElementById('param_provincia').value= '';
        document.getElementById('param_distrito').value= '';
        document.getElementById('param_fechaBaja').value= '';
        document.getElementById('param_fechaModificado').value= '';
        document.getElementById('param_telefono1').value= '';
        document.getElementById('param_telefono2').value= '';
        document.getElementById('param_email').value= '';
        document.getElementById('param_estadoProveedor').value= '';
        document.getElementById('param_observaciones').value= ''; 
        document.getElementById('param_codigo').value= '';
        document.getElementById('param_linea').value= '';
        document.getElementById('param_seccion').value= '';
        var table = $('#tablaDetalleLineas').DataTable();
        table
            .clear()
            .draw(); 
    });

    $('#accept_proveedor').on('click', function(){
       //alert('Agregar Proveeor');
        $('#VerProveedor').modal('hide');
        mostrarProveedores();        
    });

  $('#tablaProveedores tbody').on('click', 'tr', function () {seleccionSimple(this);});

   $('#register_proveedor').on('click', function(){
      var param_funcion = document.getElementById('param_funcion').value;
      
      
      if (param_funcion == 'Nuevo') {
        //alert('Nuevo Proveedor');
         //alert(param_estadoProveedor);
           var param_opcion = 'nuevo_proveedor';       
           var param_nombres = document.getElementById('param_nombres').value;
           var param_contacto = document.getElementById('param_contacto').value;
           
           var param_estadoProveedor = document.getElementById('param_estadoProveedor').value = 1;
           var param_tipo = document.getElementById('param_tipo').value;
           var param_ruc = document.getElementById('param_ruc').value;
           var param_dni = document.getElementById('param_dni').value;
           var param_fechaAlta = document.getElementById('param_fechaAlta').value;
           var param_direccion = document.getElementById('param_direccion').value;
           var param_departamento = document.getElementById('param_departamento').value;
           var param_provincia = document.getElementById('param_provincia').value;
           var param_distrito = document.getElementById('param_distrito').value;
           var param_fechaBaja = document.getElementById('param_fechaBaja').value;
           var param_fechaModificado = document.getElementById('param_fechaModificado').value;
           var param_telefono1 = document.getElementById('param_telefono1').value;
           var param_telefono2 = document.getElementById('param_telefono2').value;
           var param_email = document.getElementById('param_email').value;
           
           var param_observaciones = document.getElementById('param_observaciones').value;
           //alert(param_tipo);

           //alert(param_estado);
           if (param_nombres == '') {
            alert('Ingreses los nombres del Proveedor.');
           } else {
               $.ajax({
                  type: 'POST',        
                  data:'param_opcion='+param_opcion+'&param_nombres='+param_nombres+'&param_contacto=' +param_contacto+
                  '&param_tipo='+param_tipo+'&param_ruc=' +param_ruc+
                  '&param_fechaAlta='+param_fechaAlta+'&param_direccion=' +param_direccion+
                  '&param_departamento='+param_departamento+'&param_provincia=' +param_provincia+
                  '&param_distrito='+param_distrito+'&param_fechaBaja=' +param_fechaBaja+
                  '&param_fechaModificado='+param_fechaModificado+'&param_telefono1=' +param_telefono1+
                  '&param_telefono2='+param_telefono2+'&param_email=' +param_email+
                  '&param_estado='+param_estadoProveedor+'&param_observaciones=' +param_observaciones+'&param_dni=' +param_dni+'&codigoLinea='+codigoLinea,
                  url: '../../controller/controlproveedor/proveedor_controller.php',
                  success: function(data){
                      alert('Registro Correcto');
                      document.getElementById('param_nombres').value= '';
                      document.getElementById('param_contacto').value= '';
                      document.getElementById('param_tipo').value= '';
                      document.getElementById('param_ruc').value= '';
                      document.getElementById('param_fechaAlta').value= '';
                      document.getElementById('param_direccion').value= '';
                      document.getElementById('param_departamento').value= '';
                      document.getElementById('param_provincia').value= '';
                      document.getElementById('param_distrito').value= '';
                      document.getElementById('param_fechaBaja').value= '';
                      document.getElementById('param_fechaModificado').value= '';
                      document.getElementById('param_telefono1').value= '';
                      document.getElementById('param_telefono2').value= '';
                      document.getElementById('param_email').value= '';
                      document.getElementById('param_estadoProveedor').value= '';
                      document.getElementById('param_observaciones').value= '';
                      document.getElementById('param_linea').value= '';
                      document.getElementById('param_seccion').value= '';
                      $('#modalProveedor').modal('hide');
                      mostrarProveedores();
                      var table = $('#tablaDetalleLineas').DataTable();
                      table
                          .clear()
                          .draw(); 
                  },
                  error: function(data){
                             
                  }
              });
           }
      } else {
        if (param_funcion = 'editar') {
          var estadoEditar = '';
           var param_opcion = 'editarProveedor'; 
           var param_codigo = document.getElementById('param_codigo').value;      
           var param_nombres = document.getElementById('param_nombres').value;
           var param_contacto = document.getElementById('param_contacto').value;
           //$('input:checkbox[name=param_tipo]:checked').val()
           //var param_tipo = $('#param_tipo:checked').val();
          
           var param_tipo = document.getElementById('param_tipo').value;
           var param_ruc = document.getElementById('param_ruc').value;
           var param_dni = document.getElementById('param_dni').value;
           var param_fechaAlta = document.getElementById('param_fechaAlta').value;
           var param_direccion = document.getElementById('param_direccion').value;
           var param_departamento = document.getElementById('param_departamento').value;
           var param_provincia = document.getElementById('param_provincia').value;
           var param_distrito = document.getElementById('param_distrito').value;
           var param_fechaBaja = document.getElementById('param_fechaBaja').value;
           var param_fechaModificado = document.getElementById('param_fechaModificado').value;
           var param_telefono1 = document.getElementById('param_telefono1').value;
           var param_telefono2 = document.getElementById('param_telefono2').value;
           var param_email = document.getElementById('param_email').value;
           var param_estadoProveedor = document.getElementById('param_estadoProveedor').value;
           var param_observaciones = document.getElementById('param_observaciones').value;
           //alert(param_tipo);

           $.ajax({
              type: 'POST',        
              data:'param_opcion='+param_opcion+'&param_nombres='+param_nombres+'&param_contacto=' +param_contacto+
              '&param_tipo='+param_tipo+'&param_ruc=' +param_ruc+
              '&param_fechaAlta='+param_fechaAlta+'&param_direccion=' +param_direccion+
              '&param_departamento='+param_departamento+'&param_provincia=' +param_provincia+
              '&param_distrito='+param_distrito+'&param_fechaBaja=' +param_fechaBaja+
              '&param_fechaModificado='+param_fechaModificado+'&param_telefono1=' +param_telefono1+
              '&param_telefono2='+param_telefono2+'&param_email=' +param_email+
              '&param_estado='+param_estadoProveedor+'&param_observaciones=' +param_observaciones+'&param_codigo='+param_codigo+'&param_dni='+param_dni,
              url: '../../controller/controlproveedor/proveedor_controller.php',
              success: function(data){
                  alert('Registro Correcto');
                  document.getElementById('param_nombres').value = '';
                  document.getElementById('param_contacto').value= '';
                   //$('input:checkbox[name=param_tipo]:checked').val()
                  
                   //var param_tipo = document.getElementById('param_tipo').checked;
                  document.getElementById('param_tipo').value= '';
                  document.getElementById('param_ruc').value= '';
                  document.getElementById('param_fechaAlta').value= '';
                  document.getElementById('param_direccion').value= '';
                  document.getElementById('param_departamento').value= '';
                  document.getElementById('param_provincia').value= '';
                  document.getElementById('param_distrito').value= '';
                  document.getElementById('param_fechaBaja').value= '';
                  document.getElementById('param_fechaModificado').value= '';
                  document.getElementById('param_telefono1').value= '';
                  document.getElementById('param_telefono2').value= '';
                  document.getElementById('param_email').value= '';
                  document.getElementById('param_estadoProveedor').value= '';
                  document.getElementById('param_observaciones').value= '';
                  document.getElementById('param_linea').value= '';
                  document.getElementById('param_seccion').value= '';
                  $('#modalProveedor').modal('hide');
                  mostrarProveedores();
                  var table = $('#tablaDetalleLineas').DataTable();
                  table
                      .clear()
                      .draw(); 
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
        url: '../../controller/controlproveedor/proveedor_controller.php',
        success: function(data){
            $('#departamento').html(data);

        },
        error: function(data){
                   
        }
    });    
}

function mostrarLinea(){ 
  var seccion = document.getElementById('param_seccion').value;   
  var param_opcion = 'comboLinea';
  var codigo = 0;  
  //alert(seccion);
  $.ajax({
      type: 'POST',        
      data:'param_opcion='+param_opcion+'&codigo=' +seccion,
      url: '../../controller/controlproveedor/proveedor_controller.php',
      success: function(data){
          $('#linea').html(data);

      },
      error: function(data){
                 
      }
  });
}

function mostrarSeccion(){ 
    var param_opcion = 'combo_seccion';
    var codigo = 0;  
    $.ajax({
        type: 'POST',        
        data:'param_opcion='+param_opcion+'&codigo=' +codigo,
        url: '../../controller/controlproveedor/proveedor_controller.php',
        success: function(data){
            $('#seccion').html(data);

        },
        error: function(data){
                   
        }
    });    
}

function mostrarDepartamento2(){ 
    var param_opcion = 'comboDepartamento';
    var codigo = 0;  
    $.ajax({
        type: 'POST',        
        data:'param_opcion='+param_opcion+'&codigo=' +codigo,
        url: '../../controller/controlproveedor/proveedor_controller.php',
        success: function(data){
            $('#departamento2').html(data);

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
        url: '../../controller/controlproveedor/proveedor_controller.php',
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
        url: '../../controller/controlproveedor/proveedor_controller.php',
        success: function(data){
            $('#distrito').html(data);

        },
        error: function(data){
                   
        }
    });
}

function agregarLinea(){
    var param_opcion = 'seleccionarLinea';
    var codigo = document.getElementById('param_linea').value;
    $.ajax({
      type: 'POST',        
      data:'param_opcion='+param_opcion+'&codigo=' +codigo,
      url: '../../controller/controlproveedor/proveedor_controller.php',
      success: function(data){
          objeto=JSON.parse(data);
          $("#param_codLinea").val(objeto[0]);
          $("#param_descLinea").val(objeto[1]);

      },
      error: function(data){
                 
      }
    }); 
}

function agregarDetalleLinea() {
    var counter = 1;
    var t = $('#tablaDetalleLineas').DataTable();

    $('#addLinea').on( 'click', function () {
        var linea              = document.getElementById('param_linea').value;
        var codigo              = document.getElementById('param_codLinea').value;
        var descripcion         = document.getElementById('param_descLinea').value;
  
      if (linea == '') {
        alert('Seleccione un linea.');
      } else {
        if (codigoLinea.indexOf(codigo) >= 0) {
          alert('Ya se ha agregado esa linea.');
        } else {
          t.row.add( [
            codigo,
            descripcion,            
            '<button class="btn btn-danger btn-xs center deleteValid" onclick="Eliminar('+"'"+codigo+"'"+')">Eliminar</button>',
          ] ).draw( false );
          
          //cursoId.push(codigo);
          codigoLinea.push(codigo);
          document.getElementById('param_linea').value = '';
          document.getElementById('param_seccion').value = '';
          console.log(codigoLinea.toString());
        }      
      }       
    });

    $('#addLinea2').on( 'click', function () {
      var param_opcion = 'edicion_linea';
      var linea              = document.getElementById('param_linea').value;
      var codigo              = document.getElementById('param_codLinea').value;
      var descripcion         = document.getElementById('param_descLinea').value;
      var proveedor         = document.getElementById('param_codigo').value;
  
      if (linea == '') {
        alert('Seleccione un linea.');
      } else {
        $.ajax({
          type: 'POST',        
          data:'param_opcion='+param_opcion+'&param_codigo='+proveedor+'&param_linea='+codigo,
          url: '../../controller/controlproveedor/proveedor_controller.php',
          success: function(data){
            if (data == 1) {
              alert('Ya se registro la linea.');
            } else {
              mostrarDetallesLinea(proveedor);
              document.getElementById('param_linea').value = '';
              document.getElementById('param_seccion').value = '';
            }
          },
          error: function(data){
                     
          }
      });    
    }             
    });

    $('#tablaDetalleLineas tbody').on( 'click', 'button', function () {
        t
            .row( $(this).parents('tr') )
            .remove()
            .draw();
    });    
}

function seleccionSimple(e){
    if ( $(e).hasClass('selected')){
    $(e).removeClass('selected');
    $("#detalle_linea").hide();
  }
  else {
      $('#tablaProveedores').DataTable().$('tr.selected').removeClass('selected');
      $(e).addClass('selected');
      $("#detalle_linea").show();
      var codigoProveedor = $('#tablaProveedores').DataTable().cell('.selected', 0).data();             
      llenarDatosLinea(codigoProveedor);
    }
}

function llenarDatosLinea(proveedor){ 
    var param_opcion = 'mostrarLineas';    
    $.ajax({
        type: 'POST',        
        data:'param_opcion='+param_opcion+'&param_codigo=' +proveedor,
        url: '../../controller/controlproveedor/proveedor_controller.php',
        success: function(data){
            $('#tablaProveedorLinea').DataTable().destroy();
            $('#cuerpoProveedorLinea').html(data);
            $('#tablaProveedorLinea').DataTable();

        },
        error: function(data){
                   
        }
    });    
}

function mostrarProveedores(){ 
    var param_opcion = 'mostrarProveedores'; 
    var codigo = 0;
    $.ajax({
        type: 'POST',        
        data:'param_opcion='+param_opcion+'&codigo=' +codigo,
        url: '../../controller/controlproveedor/proveedor_controller.php',
        success: function(data){
            $('#tablaProveedores').DataTable().destroy();
            $('#cuerpoProveedores').html(data);
            $('#tablaProveedores').DataTable();

        },
        error: function(data){
                   
        }
    });    
}

function Eliminar(codigo) {  
    //alert(codigo);
    var pos = codigoLinea.indexOf(codigo);
    codigoLinea.splice(pos, 1);
}

function eliminarLinea(codigo) {  
    //alert(codigo);
    var param_opcion = 'eliminar_linea_proveedor';
    var proveedor = document.getElementById('param_codigo').value;
   $.ajax({
    type: 'POST',
    data:'param_opcion='+param_opcion+'&param_codigo='+proveedor+'&param_linea='+codigo,
    url: '../../controller/controlproveedor/proveedor_controller.php',
    success: function(data){
        mostrarDetallesLinea(proveedor);
    },
    error: function(data){
        $('#cuerpoTabla').html(respuesta);
    }
  });
}

function gestionarRuc(){ 
    var tipo = document.getElementById('param_tipo').value;
    //alert(tipo);
    if (tipo == 'J') {
      document.getElementById('param_ruc').disabled=false;
      document.getElementById('param_dni').disabled=true;
      document.getElementById('param_dni').value= '';
    } else {
      if (tipo == 'N') {
        document.getElementById('param_ruc').disabled=true;
        document.getElementById('param_dni').disabled=false;
        document.getElementById('param_ruc').value= '';
      }
    }
}

function eliminar(proveedor){
  var respuesta = confirm('¿Desea dar de baja al Proveedor?');
  if (respuesta == true) {
    //alert('Acepto');
        var param_opcion = 'modificarEstado';
        $.ajax({
            type: 'POST',
            data:'param_opcion='+param_opcion+'&param_codigo='+proveedor,
            url: '../../controller/controlproveedor/proveedor_controller.php',
            success: function(data){
                alert('Proveedor fue dado de baja');
                mostrarProveedores();
            },
            error: function(data){
                $('#cuerpoTabla').html(respuesta);
            }
          });
  } else {
    if (respuesta == false) {
      mostrarProveedores();
    }
  }   
}

function activar(proveedor){
  var respuesta = confirm('¿Desea que este proveedor este activo?');
  if (respuesta == true) {
    //alert('Acepto');
        var param_opcion = 'activarProveedor';
        $.ajax({
            type: 'POST',
            data:'param_opcion='+param_opcion+'&param_codigo='+proveedor,
            url: '../../controller/controlproveedor/proveedor_controller.php',
            success: function(data){
                alert('Proveedor con estado activo');
                mostrarProveedores();
            },
            error: function(data){
                $('#cuerpoTabla').html(respuesta);
            }
          });
  } else {
    if (respuesta == false) {
      mostrarProveedores();
    }
  }   
}


function ver(proveedor){
  $('#VerProveedor').modal({
      show:true,
      backdrop:'static',
  });
  
  var param_opcion = 'recuperarDatos';
    $.ajax({
      type: 'POST',
      data:'param_opcion='+param_opcion+'&param_codigo='+proveedor,
      url: '../../controller/controlproveedor/proveedor_controller.php',
      success: function(data){
          objeto=JSON.parse(data);
          //$("#param_codigo").val(objeto[0]);
          $("#param_verNombres").val(objeto[1]);
          $("#param_verContacto").val(objeto[2]);
          document.getElementById('param_vertipo').value = (objeto[3]);
          //$('#param_tipo > option[value="'+objeto[3]+'"]').attr('selected', 'selected');
          if (objeto[3] == 'N') {
            $('#ruc').hide();
            $('#dni').show();
            document.getElementById('param_verdni').value = (objeto[15]);
            //$("#param_verdni").val(objeto[15]);
          } else {
            if (objeto[3] == 'J') {
              $('#dni').hide();
              $('#ruc').show();
              $('#param_verruc').parent().parent().attr("class", "col-md-offset-1");
              document.getElementById('param_verruc').value = (objeto[4]);
              //$("#param_verruc").val(objeto[4]);
            }
          }
          
          $("#param_verfechaAlta").val(objeto[5]);
          $("#param_verdireccion").val(objeto[6]);
              
          $("#param_verfechaBaja").val(objeto[8]);

          $("#param_verfechaModificado").val(objeto[9]);
          $("#param_vertelefono1").val(objeto[10]);
          $("#param_vertelefono2").val(objeto[11]);

          $("#param_veremail").val(objeto[12]);
          //$("#param_estado").val(objeto[2]);
          document.getElementById('param_verestadoProveedor').value = (objeto[13]);
         

          $("#param_verobservaciones").val(objeto[14]);


      },
      error: function(data){
          
      }
    });
}



function editar(proveedor){
  $('#cabeceraRegistro').html(".:: Editar Proveedor ::.");
  document.getElementById('param_funcion').value= 'Editar';
  $('#departamento_ocultar').hide();
  $('#ocultar_div').hide();
  //$('#param_estado').disabled = true;
  $('#estado').show();
  $('#param_estado').attr('disabled',true);
  $('#modalProveedor').modal({
      show:true,
      backdrop:'static',
  });
  $('#addLinea').hide();
  $('#addLinea2').show();
  mostrarDetallesLinea(proveedor);
  var param_opcion = 'recuperarDatos';
    $.ajax({
        type: 'POST',
        data:'param_opcion='+param_opcion+'&param_codigo='+proveedor,
        url: '../../controller/controlproveedor/proveedor_controller.php',
        success: function(data){
            objeto=JSON.parse(data);
            $("#param_codigo").val(objeto[0]);
            $("#param_nombres").val(objeto[1]);
            $("#param_contacto").val(objeto[2]);
            document.getElementById('param_tipo').value = (objeto[3]);
            //$('#param_tipo > option[value="'+objeto[3]+'"]').attr('selected', 'selected'); 
            $("#param_ruc").val(objeto[4]);
            $("#param_fechaAlta").val(objeto[5]);
            $("#param_direccion").val(objeto[6]);
                
            $("#param_fechaBaja").val(objeto[8]);

            $("#param_fechaModificado").val(objeto[9]);
            $("#param_telefono1").val(objeto[10]);
            $("#param_telefono2").val(objeto[11]);

            $("#param_email").val(objeto[12]);
            //$("#param_estado").val(objeto[2]);
            document.getElementById('param_estadoProveedor').value = (objeto[13]);
           

            $("#param_observaciones").val(objeto[14]);
            $("#param_dni").val(objeto[15]);
            document.getElementById('param_ruc').disabled=true;
            document.getElementById('param_ruc').disabled=true;


        },
        error: function(data){
            
        }
      });
    
}

function mostrarDetallesLinea(proveedor) {
  //alert(proveedor);
  var param_opcion = 'mostrarDetallesLinea';
    $.ajax({
        type: 'POST',
        data:'param_opcion='+param_opcion+'&param_codigo='+proveedor,
        url: '../../controller/controlproveedor/proveedor_controller.php',
        success: function(data){
            $('#cuerpoLineas').html(data);
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