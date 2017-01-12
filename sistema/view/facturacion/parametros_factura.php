<?php

$conexion = null;

function abrirConexion()
{
	global $conexion;
	// Conexión con el servidor de base de datos MySQL
	$conexion = mysqli_connect('localhost', 'root', '', 'rocevibdb');
	mysqli_set_charset($conexion, 'utf8');
}

function getNumero()
{
	abrirConexion();	
	global $conexion;
	$resultSet = mysqli_query($conexion, "SELECT MAX(idregistro) FROM registro");
	$row = mysqli_fetch_row($resultSet);
    $numero = trim($row[0]);
    if ($numero == NULL) {
        $numero = 1; 
        return $numero;
    } else {
        if ($numero < 10 ){
        return $numero; 
        } else {
            if ($numero < 100){
                $resultSet1 = mysqli_query($conexion, "SELECT MAX(idregistro)+1 FROM registro");
                $row1 = mysqli_fetch_row($resultSet1);
                $numero1 = trim($row1[0]);  
                return $numero1;    
            } else {
                if ($numero < 1000){
                    $resultSet2 = mysqli_query($conexion, "SELECT MAX(idregistro)+1 FROM registro");
                    $row2 = mysqli_fetch_row($resultSet2);
                    $numero2 = trim($row2[0]);  
                    return $numero2;
                } else {
                    $resultSet3 = mysqli_query($conexion, "SELECT MAX(idregistro)+1 FROM registro");
                    $row3 = mysqli_fetch_row($resultSet3);
                    $numero3 = trim($row3[0]);  
                    return $numero3;
                }
            }
        }
    }
   	
}


