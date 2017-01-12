<?php 

class Conexion_Model{
	public static function getConexion(){
		$conexion = mysqli_connect('localhost','root','','rocevibdb');
		return $conexion;
	}
}

 ?>