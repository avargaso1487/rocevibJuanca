<?php
    $status = array(
        'type'=>'false',
        'message'=>''
    );


    $emailto = "reservas@hotelrocevib.com";//EMAILTO; 
    $nombres = @trim(stripslashes($_POST['nombres'])); 
    $apellidos = @trim(stripslashes($_POST['apellidos']));
    $dni = @trim(stripslashes($_POST['dni']));
    $email = @trim(stripslashes($_POST['email']));
    $celular = @trim(stripslashes($_POST['celular']));
    $empresa =  @trim(stripslashes($_POST['empresa'])); 


    $fEntrada = @trim(stripslashes($_POST['fEntrada'])); 
    $fsalida = @trim(stripslashes($_POST['fsalida'])); 
    $hsimple = @trim(stripslashes($_POST['hsimple'])); 
    $hmatrimonial = @trim(stripslashes($_POST['hmatrimonial'])); 
    $hdoble = @trim(stripslashes($_POST['hdoble'])); 
    $htriple = @trim(stripslashes($_POST['htriple'])); 
    $hsuite = @trim(stripslashes($_POST['hsuite'])); 
    


    $message =  'Nombres: ' . $nombres . "\n\n" . 
                'Apellidos: ' . $apellidos . "\n\n" .
                'DNI: ' . $dni . "\n\n" .
                'Email: ' . $email . "\n\n" . 
                'Celular: ' . $celular . "\n\n" . 
                'Empresa: ' . $empresa . "\n\n" .
                'Fecha Entrada: ' . $fEntrada . "\n\n" .
                'Fecha Salida: ' . $fsalida . "\n\n" .
                'Número de Habitaciones Simples : ' . $hsimple . "\n\n" .
                'Número de Habitaciones Matrimoniales: ' . $hmatrimonial . "\n\n" .
                'Número de Habitaciones Dobles: ' . $hdoble . "\n\n" . 
                'Número de Habitaciones Triples: ' . $htriple . "\n\n" . 
                'Suite: ' . $hsuite;

    $subject = "Reserva de habitación";//TEMA

    $email_to = $emailto;
    $email_from = $email;

    $separator = md5(time());

    $eol = PHP_EOL;
    $estado_imagen = "";
        $fichero_subido = 'uploads/' . basename($_FILES['archivo']['name']);
        if(move_uploaded_file($_FILES['archivo']['tmp_name'], $fichero_subido)) { 
            $estado_imagen = "El voucher ha sido adjuntado exitosamente";
        } else{
            $estado_imagen = "Ha ocurrido un error al adjuntar el voucher, trate de nuevo.";
        } 
        $filename = $fichero_subido;

    $pdfdoc = file_get_contents($filename);
    $attachment = chunk_split(base64_encode($pdfdoc));

    $headers  = "From: \"Coreo>>\"<" . $email_from . ">".$from.$eol;
    $headers .= "MIME-Version: 1.0".$eol; 
    $headers .= "Content-Type: multipart/mixed; boundary=\"".$separator."\"";

    $body = "--".$separator.$eol;

    $body .= "Content-Type: text/html; charset=\"utf-8\"".$eol;
    $body .= "Content-Transfer-Encoding: 8bit".$eol.$eol;
    $body .= $message.$eol;

    // adjunto
    $body .= "--".$separator.$eol;
    $body .= "Content-Type: application/octet-stream; name=\"".$filename."\"".$eol;
    $body .= "Content-Transfer-Encoding: base64".$eol;
    $body .= "Content-Disposition: attachment".$eol.$eol;
    $body .= $attachment.$eol;
    $body .= "--".$separator."--";

    $status_exito = "";

    $error_ocurred = mail($email_to, $subject, $body, $headers);
    if(!$error_ocurred){
        $status["type"]="false";
        $status_exito="OCURRIÓ UN PROBLEMA AL MOMENTO DE REALIZAR LA RESERVA. VUELVA A INTENTARLO. <a href='reservation.html'>Volver</a>";
    }else{
        $status["type"]="true";
        $status_exito="SU RESERVA HA SIDO REALIZADA.";    
    }
    
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>Reservas | ROCEVIB</title>
    
    <!-- core CSS -->
    <link href="assets/css/bootstrap.min.css" rel="stylesheet">
    <link href="assets/css/font-awesome.min.css" rel="stylesheet">
    <link href="assets/css/prettyPhoto.css" rel="stylesheet">
    <link href="assets/css/animate.min.css" rel="stylesheet">
    <link href="assets/css/main.css" rel="stylesheet">
    <link href="assets/css/responsive.css" rel="stylesheet">
    
    <!--[if lt IE 9]>
    <script src="assets/js/html5shiv.js"></script>
    <script src="assets/js/respond.min.js"></script>
    <![endif]-->       
    <link rel="shortcut icon" href="assets/images/ico/favicon.png">
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="assets/images/ico/apple-touch-icon-144-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="assets/images/ico/apple-touch-icon-114-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="assets/images/ico/apple-touch-icon-72-precomposed.png">
    <link rel="apple-touch-icon-precomposed" href="assets/images/ico/apple-touch-icon-57-precomposed.png">
</head><!--/head-->

<body>

    <header id="header">
        <div class="top-bar">
            <div class="container">
                <div class="row">
                    <div class="col-sm-6 col-xs-4">
                       
                    </div>
                    <div class="col-sm-6 col-xs-8">
                       <div class="social">
                            <ul class="social-share">
                                
                                <li><div class="top-number"><p><i class="fa fa-phone"></i>  +51 044 322 165 &nbsp; </p></div></li>
                                <li><div class="top-number"><p><i class="fa fa-mobile-phone"></i>  +51 949 970 872</p></div></li>
                                <li><a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
                                <li><a href="sistema/index.php"><i class="fa fa-sign-in"></i></a></li>
                            </ul>
                           <!--<div class="search">
                                <form role="form">
                                    <input type="text" class="search-form" autocomplete="off" placeholder="Search">
                                    <i class="fa fa-search"></i>
                                </form>
                           </div>-->
                       </div>
                    </div>
                </div>
            </div><!--/.container-->
        </div><!--/.top-bar-->

        <nav class="navbar navbar-inverse" role="banner">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="index.html"><img src="assets/images/logo.png" alt="logo"></a>
                </div>
                
                <div class="collapse navbar-collapse navbar-right">
                    <ul class="nav navbar-nav">
                        <li><a href="index.html">Inicio</a></li>
                        <!--<li><a href="about-us.html">About Us</a></li>-->
                        <li><a href="services.html">Servicios</a></li>
                        <li><a href="portfolio.html">Galería</a></li>
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">Habitaciones <i class="fa fa-angle-down"></i></a>
                            <ul class="dropdown-menu">
                                <li><a href="simple.html">Simple</a></li>
                                <li><a href="matrimonial.html">Matrimonial</a></li>
                                <li><a href="doble.html">Doble</a></li>
                                <li><a href="triple.html">Triple</a></li>
                                <li><a href="suite.html">Suite</a></li>
                            </ul>
                        </li>
                        <li class="active"><a href="reservation.html">Reservas</a></li> 
                        <li><a href="contact-us.html">Contacto</a></li>                         
                    </ul>
                </div>
            </div><!--/.container-->
        </nav><!--/nav-->
        
    </header><!--/header-->



   <section id="blog" class="container">
        <div class="center">
            <h2>RESULTADO DE LA RESERVA</h2>
            <p class="lead">
                <li><b><?php echo $estado_imagen ?></b></li>

                <li><b><?php echo $status_exito ?></li></b>
                </p>
            <a href="index.html" class="leadf">INICIO</a>
        </div>           
        </div><!--/.container-->
    </section><!--/#contact-page-->
    
    <section id="bottom">
        <div class="container wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="600ms">
            <!--<div class="row">
                <div class="col-md-3 col-sm-6">
                    <div class="widget">
                        <h3>Company</h3>
                        <ul>
                            <li><a href="#">About us</a></li>
                            <li><a href="#">We are hiring</a></li>
                            <li><a href="#">Meet the team</a></li>
                            <li><a href="#">Copyright</a></li>
                            <li><a href="#">Terms of use</a></li>
                            <li><a href="#">Privacy policy</a></li>
                            <li><a href="#">Contact us</a></li>
                        </ul>
                    </div>    
                </div>

                <div class="col-md-3 col-sm-6">
                    <div class="widget">
                        <h3>Support</h3>
                        <ul>
                            <li><a href="#">Faq</a></li>
                            <li><a href="#">Blog</a></li>
                            <li><a href="#">Forum</a></li>
                            <li><a href="#">Documentation</a></li>
                            <li><a href="#">Refund policy</a></li>
                            <li><a href="#">Ticket system</a></li>
                            <li><a href="#">Billing system</a></li>
                        </ul>
                    </div>    
                </div>

                <div class="col-md-3 col-sm-6">
                    <div class="widget">
                        <h3>Developers</h3>
                        <ul>
                            <li><a href="#">Web Development</a></li>
                            <li><a href="#">SEO Marketing</a></li>
                            <li><a href="#">Theme</a></li>
                            <li><a href="#">Development</a></li>
                            <li><a href="#">Email Marketing</a></li>
                            <li><a href="#">Plugin Development</a></li>
                            <li><a href="#">Article Writing</a></li>
                        </ul>
                    </div>    
                </div>

                <div class="col-md-3 col-sm-6">
                    <div class="widget">
                        <h3>Our Partners</h3>
                        <ul>
                            <li><a href="#">Adipisicing Elit</a></li>
                            <li><a href="#">Eiusmod</a></li>
                            <li><a href="#">Tempor</a></li>
                            <li><a href="#">Veniam</a></li>
                            <li><a href="#">Exercitation</a></li>
                            <li><a href="#">Ullamco</a></li>
                            <li><a href="#">Laboris</a></li>
                        </ul>
                    </div>    
                </div>
            </div>
        --></div>
    </section><!--/#bottom-->

    <footer id="footer" class="midnight-blue">
        <div class="container">
            <div class="row">
                <div class="col-sm-6">
                    
                    Elaborado por <img src="assets/images/st+.png"> <a style="color:skyblue;" href="http://www.facebook.com/sodatechplus"> SodaTech+ </a>
                &nbsp &nbsp| &nbsp &nbsp    Hotel ROCEVIB ® 2017. 
                    
                </div>
                <div class="col-sm-6">
                    <ul class="pull-right">
                        <li><a href="index.html">Inicio</a></li>
                        <li><a href="services.html">Servicios</a></li>
                        <li><a href="portfolio.html">Galería</a></li>
                        <li><a href="reservation.html">Reservaciones</a></li>
                        <li><a href="contact-us.html">Contáctanos</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </footer><!--/#footer-->

    <script src="assets/js/jquery.js"></script>
    <script src="assets/js/bootstrap.min.js"></script>
    <script src="assets/js/jquery.prettyPhoto.js"></script>
    <script src="assets/js/jquery.isotope.min.js"></script>
    <script src="assets/js/main.js"></script>
    <script src="assets/js/wow.min.js"></script>
</body>
</html>
