<?php
	header('Content-type: application/json');
	$status = array(
		'type'=>'success',
		'message'=>'Gracias por contactarnos. Nos comunicaremos con usted lo más pronto posible.'
	);

    $name = @trim(stripslashes($_POST['name'])); 
    $email = @trim(stripslashes($_POST['email'])); 
    $subject = @trim(stripslashes($_POST['subject'])); 
    $message = @trim(stripslashes($_POST['message'])); 
    $celular = @trim(stripslashes($_POST['celular'])); 
    $company =  @trim(stripslashes($_POST['company']));

    //File
    $nombre_archivo = $_FILES['archivo']['name'];
    $tipo_archivo = $_FILES['archivo']['type'];
    $tamano_archivo = $_FILES['archivo']['size']; 
    $nombref    = $_FILES["archivo"]["name"];


    $email_from = $email;
    $email_to = 'informes@hotelrocevib.com';//replace with your email

    $body = 'Nombre: ' . $name . "\n\n" . 'Email: ' . $email . "\n\n" . 'Celular: ' . $celular . "\n\n" . 'Empresa: ' . $company . "\n\n" . 'Asunto: ' . $subject . "\n\n" . 'Mensaje: ' . $message;

    $success = @mail($email_to, $subject, $body, 'From: <'.$email_from.'>');

    //echo $body;
    echo json_encode($status);
    die;