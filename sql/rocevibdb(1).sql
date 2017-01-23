-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-01-2017 a las 01:11:21
-- Versión del servidor: 5.6.17
-- Versión de PHP: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `rocevibdb`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_combos`(IN `opcion` VARCHAR(100))
BEGIN
IF opcion = 'combo_empresa' THEN
      SELECT idEmpresa,nombre from empresa order by nombre asc;
    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_controlFactura`(IN `opcion` VARCHAR(200), IN `numero` INT, IN `nroPropio` INT, IN `fecha` DATE, IN `serie` VARCHAR(100), IN `tipo` VARCHAR(100), IN `totalBI` DOUBLE, IN `descuento` DOUBLE, IN `montoDescuento` DOUBLE, IN `descuentoPP` DOUBLE, IN `montoDescuentoPP` DOUBLE, IN `total` DOUBLE, IN `neto` DOUBLE, IN `personaID` INT, IN `clienteID` INT)
BEGIN
IF opcion = 'opc_listar' THEN
SELECT R.idregistro as FAC_num, concat(U.appaterno, ' ', U.apmaterno) as persona, H.descripcion as FAC_habitacion, R.fechaIngreso as FAC_fechaEntrada, R.fechaSalida as FAC_fechaSalida, R.total as FAC_Total 
from registro R 
inner join usuario U on R.idusuario = U.idusuario 
inner join habitacion H on R.idhabitacion = H.idhabitacion; 

end if;

IF opcion = 'opc_buscar' THEN
SELECT DR.idRegDetalle, DR.descripcion, S.tarifa
from registro_detalle DR
inner join servicios S on DR.idServicio = S.idServicio
where DR.idRegistro=numero;

end if;

IF opcion = 'opc_listarClientes' THEN
      SELECT U.idUsuario as clienteID, concat(U.appaterno, ' ', U.apmaterno,' ',U.nombres) as cliente FROM usuario U;

end if;
IF opcion = 'opc_listarProductos' THEN
SELECT S.idServicio, S.descripcion, S.tarifa from servicios S;
end if;

IF opcion = 'opc_grabar' THEN
	INSERT INTO factura_venta (FAC_nroPropio,FAC_fecha,FAC_serie,
    FAC_tipo,FAC_totalBI,FAC_descuento,FAC_montoDescuento,
    FAC_descuentoPP,FAC_montoDescuentoPP,FAC_total,FAC_igv,FAC_neto,personaID,clienteID) 
    VALUES (nroPropio,fecha,serie,tipo,totalBI,descuento,montoDescuento,
    descuentoPP,montoDescuentoPP,total,18,neto,personaID,clienteID);
end if;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_control_usuario`(IN `ve_opcion` VARCHAR(50), IN `ve_usuId` INT, IN `ve_usuUsuario` VARCHAR(20), IN `ve_usuClave` VARCHAR(60))
BEGIN
if ve_opcion = 'opc_login_respuesta' then            
  SET @CORRECTO = (SELECT COUNT(*) FROM  usuario usu 
        WHERE 
          usu.usuario = ve_usuUsuario AND usu.clave = ve_usuClave);
  IF @CORRECTO>0 then
     select '1' as 'respuesta';
  ELSE
     select 'Usuario o clave incorrectos' as 'respuesta';
  END IF;
end if;  
IF ve_opcion='opc_login_listar' THEN
  select u.idusuario, u.usuario, u.nombres, u.appaterno
  from usuario u         
  where u.usuario = ve_usuUsuario and u.clave = ve_usuClave;
END IF;

IF ve_opcion='opc_listar_menu' THEN
  SELECT DISTINCT 
      men.men_id,
      men.men_idpadre,
      men.men_nombre,
      men.men_url,      
      men.men_titulo
    FROM usuario usu
    JOIN perfil perf  ON usu.idusuario=perf.idusuario
    JOIN rol rol      ON rol.rol_id=perf.rol_id
    JOIN permiso perm ON perm.rol_id=rol.rol_id
    JOIN menu  men    ON men.men_id=perm.men_id
    WHERE usu.idusuario=ve_usuId AND rol.rolActivo=1 and men.men_estado=1
    ;
END IF;

IF ve_opcion = 'opc_usuario_listar' THEN            
      SELECT idusuario, nombres, appaterno, apmaterno FROM usuario where idtipo=2;
    END IF;
  

IF ve_opcion = 'opc_huesped_listar' THEN
		SELECT idusuario, nombres, appaterno, apmaterno FROM usuario where idtipo=3;
	END IF;
    
IF ve_opcion = 'opc_empleado_buscar' THEN
		SELECT idusuario, nombres, appaterno, apmaterno FROM usuario where idusuario=ve_usuId;
	END IF;
    
IF ve_opcion = 'opc_habitaciones_listar' THEN
		SELECT s.idservicio, s.descripcion, 
		case 
		when s.idEstado=1 then 'LIBRE' 
		when s.idEstado=2 then 'OCUPADA' 
		end 
		as estado FROM servicios s
		where idTipoServicio=1;
			END IF;
    
IF ve_opcion = 'opc_ambientes_listar' THEN
		SELECT h.idhabitacion, h.descripcion, case when h.idEstado=0 then 'SIN ESTADO' when h.idEstado=1 then 'LIBRE' when h.idEstado=2 then 'OCUPADA' end as idEstado FROM habitacion h where idTipoHab=6;
	END IF;
    
IF ve_opcion = 'opc_registro_listar' THEN
		SELECT r.idregistro, CONCAT(u.nombres, ' ',u.appaterno,' ', u.apmaterno), r.fechaIngreso, r.fechaSalida, r.total
FROM registro r 
INNER JOIN usuario u on u.idusuario = r.idusuario;
	END IF;
    
IF ve_opcion = 'opc_registroDetalle_listar' THEN
SELECT rd.idRegDetalle, s.descripcion, rd.precioxDia,rd.comentarios
from reg_detalle rd
inner join servicios s on s.idServicio = rd.idServicio
where idRegistro=ve_usuId;
	END IF;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_gestionar_usuario`(IN `opcion` VARCHAR(200), IN `nombres` VARCHAR(100), IN `paterno` VARCHAR(100), IN `materno` VARCHAR(100), IN `dni` VARCHAR(08), IN `direccion` VARCHAR(11), IN `celular` VARCHAR(100), IN `usuario` VARCHAR(100), IN `clave` VARCHAR(100), IN `empresa` INT, IN `id` INT )
BEGIN
if opcion = 'opc_usuario_respuesta' THEN            
      SET @CORRECTO = (SELECT COUNT(*) FROM  usuario usu WHERE 
              usu.usuario = usuario AND
              usu.clave = clave AND usu.dni = dni);
      IF @CORRECTO>0 then
         select '1' as 'respuesta';
      ELSE
         select '0' as 'respuesta';
    END IF;
    END IF;
    IF opcion = 'opc_usuario_registrar' THEN            
      INSERT INTO usuario (nombres, appaterno, apmaterno, dni, direccion, celular, usuario, clave) VALUES (nombres, paterno, materno, dni, direccion, celular, usuario, clave);
    END IF;
    /*IF opcion = 'opc_usuario_registrar2' THEN            
      INSERT INTO usuario( nombres, appaterno, apmaterno, dni, fecharegistro, email) VALUES (nombres, paterno, materno, dni, now(), email);
    SET @USUARIO = (SELECT MAX(idusuario) AS id FROM usuario);  
    INSERT INTO inscripcion (idusuario, fecha, idevento, certificado, pagado) VALUES (@USUARIO, now(), evento, certificado,0);
    END IF;*/
    IF opcion = 'opc_usuario_modificar' THEN            
      UPDATE usuario SET nombres = nombres, appaterno = paterno, apmaterno = materno, dni = dni ,direccion=direccion, celular=celular, usuario=usuario, clave=clave WHERE idusuario = id;
    END IF;
    IF opcion = 'opc_usuario_eliminar' THEN            
      DELETE FROM usuario WHERE idusuario = id;
    END IF;

   IF opcion = 'opc_nuevoEmpleado' THEN  
	INSERT INTO 
	usuario(nombres, appaterno, apmaterno, dni, direccion, celular, usuario, clave, idtipo) 
	VALUES (nombres, paterno, materno, dni, direccion,celular, usuario, clave, '2');	
    END IF;

   IF opcion = 'opc_usuario_registrar2' THEN  
		INSERT INTO usuario(nombres, appaterno, apmaterno, dni, direccion, celular, usuario, clave, idtipo, idEmpresa) VALUES (nombres, paterno, materno, dni, direccion,celular, usuario, clave, '2', empresa);
    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_mostrar_usuario`(IN `opcion` VARCHAR(200), IN `id` INT)
BEGIN
IF opcion = 'opc_usuario_mostrar' THEN            
      SELECT u.idusuario, u.nombres, u.appaterno, u.apmaterno, u.dni FROM usuario u;
    END IF;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresa`
--

CREATE TABLE IF NOT EXISTS `empresa` (
  `idEmpresa` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` mediumtext,
  `ruc` char(11) DEFAULT NULL,
  `direccion` mediumtext,
  PRIMARY KEY (`idEmpresa`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Volcado de datos para la tabla `empresa`
--

INSERT INTO `empresa` (`idEmpresa`, `nombre`, `ruc`, `direccion`) VALUES
(1, 'CONSERMET S.A.C.', '12345678901', 'Evitamiento');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado`
--

CREATE TABLE IF NOT EXISTS `estado` (
  `idEstado` int(11) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  PRIMARY KEY (`idEstado`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `estado`
--

INSERT INTO `estado` (`idEstado`, `descripcion`) VALUES
(0, 'Sin Estado'),
(1, 'Libre'),
(2, 'Ocupada');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `menu`
--

CREATE TABLE IF NOT EXISTS `menu` (
  `men_id` int(11) NOT NULL AUTO_INCREMENT,
  `men_idpadre` int(11) DEFAULT NULL,
  `men_nombre` varchar(100) DEFAULT NULL,
  `men_url` varchar(500) DEFAULT NULL,
  `men_titulo` varchar(100) DEFAULT NULL,
  `men_estilo` varchar(100) DEFAULT NULL,
  `men_estado` smallint(6) DEFAULT NULL,
  PRIMARY KEY (`men_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;

--
-- Volcado de datos para la tabla `menu`
--

INSERT INTO `menu` (`men_id`, `men_idpadre`, `men_nombre`, `men_url`, `men_titulo`, `men_estilo`, `men_estado`) VALUES
(1, NULL, 'folder', NULL, 'Administrador', 'img_computer', 1),
(2, 1, 'lista_empleados', '../../view/operaciones/listar_empleados.php', 'Listar empleados', 'img_computer', 1),
(3, 1, 'listar_huespedes', '../../view/operaciones/listar_huespedes.php', 'Listar huespedes', 'img_computer', 1),
(4, 1, 'listar_habitaciones', '../../view/operaciones/listar_habs.php\r\n', 'Listar habitaciones', 'img_computer', 1),
(5, 1, 'listar_ambientes', '../../view/operaciones/listar_ambientes.php\r\n', 'Listar Ambientes', 'img_computer', 0),
(6, NULL, 'folder', NULL, 'Huésped', 'img_computer', 1),
(7, 6, 'registrar_huesped', '../../view/operaciones/registro.php', 'Registrar', 'img_computer', 1),
(8, 6, 'actualizar_datos', NULL, 'Actualizar', 'img_computer', 0),
(9, 6, 'reservas', NULL, 'Reservar', 'img_computer', 1),
(10, NULL, 'folder', NULL, 'Reportes', 'img_computer', 1),
(11, 10, 'rep_huespedes', NULL, 'Reporte de huéspedes', 'img_computer', 1),
(12, 10, 'rep_habs', NULL, 'Reporte de habitaciones', 'img_computer', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfil`
--

CREATE TABLE IF NOT EXISTS `perfil` (
  `rol_id` int(11) NOT NULL,
  `idusuario` int(11) DEFAULT NULL,
  KEY `FK_perfil_rol` (`rol_id`),
  KEY `FK_perfil_usuario1` (`idusuario`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `perfil`
--

INSERT INTO `perfil` (`rol_id`, `idusuario`) VALUES
(1, 1),
(2, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permiso`
--

CREATE TABLE IF NOT EXISTS `permiso` (
  `rol_id` int(11) NOT NULL,
  `men_id` int(11) NOT NULL,
  KEY `FK_permiso_menu1` (`men_id`),
  KEY `FK_permiso_rol` (`rol_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `permiso`
--

INSERT INTO `permiso` (`rol_id`, `men_id`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(1, 8),
(1, 9),
(1, 10),
(1, 11),
(1, 12),
(2, 5),
(2, 6),
(2, 7),
(2, 8),
(2, 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro`
--

CREATE TABLE IF NOT EXISTS `registro` (
  `idregistro` int(11) NOT NULL AUTO_INCREMENT,
  `idusuario` int(11) DEFAULT NULL,
  `fechaIngreso` datetime DEFAULT NULL,
  `fechaSalida` datetime DEFAULT NULL,
  `total` decimal(10,0) NOT NULL,
  PRIMARY KEY (`idregistro`),
  KEY `FK_registro_usuario` (`idusuario`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Volcado de datos para la tabla `registro`
--

INSERT INTO `registro` (`idregistro`, `idusuario`, `fechaIngreso`, `fechaSalida`, `total`) VALUES
(1, 3, '2016-10-04 00:00:00', '2016-10-07 00:00:00', '65');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reg_detalle`
--

CREATE TABLE IF NOT EXISTS `reg_detalle` (
  `idRegDetalle` int(11) NOT NULL AUTO_INCREMENT,
  `idRegistro` int(11) NOT NULL,
  `idServicio` int(11) NOT NULL,
  `precioxDia` int(11) DEFAULT NULL,
  `comentarios` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idRegDetalle`),
  KEY `idRegistro` (`idRegistro`),
  KEY `idServicio` (`idServicio`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `reg_detalle`
--

INSERT INTO `reg_detalle` (`idRegDetalle`, `idRegistro`, `idServicio`, `precioxDia`, `comentarios`) VALUES
(1, 1, 201, 80, NULL),
(2, 1, 3, 5, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE IF NOT EXISTS `rol` (
  `rol_id` int(11) NOT NULL AUTO_INCREMENT,
  `rol_nombre` varchar(50) DEFAULT NULL,
  `rolActivo` smallint(6) DEFAULT NULL,
  PRIMARY KEY (`rol_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`rol_id`, `rol_nombre`, `rolActivo`) VALUES
(1, 'Administrador', 1),
(2, 'Empleado', 1),
(3, 'Huesped', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios`
--

CREATE TABLE IF NOT EXISTS `servicios` (
  `idServicio` int(11) NOT NULL,
  `servicio` varchar(32) DEFAULT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  `idEstado` int(1) NOT NULL,
  `tarifa` decimal(10,0) NOT NULL,
  `idTipoServicio` int(11) DEFAULT NULL,
  PRIMARY KEY (`idServicio`),
  KEY `idTipoHab` (`descripcion`),
  KEY `idEstado` (`idEstado`),
  KEY `idTipoServicio` (`idTipoServicio`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `servicios`
--

INSERT INTO `servicios` (`idServicio`, `servicio`, `descripcion`, `idEstado`, `tarifa`, `idTipoServicio`) VALUES
(1, 'Cochera', 'Cochera Interior', 1, '0', 2),
(2, 'Lavandería', 'Lavandería', 1, '10', 2),
(3, 'Desayuno', 'Desayuno', 1, '5', 2),
(4, 'Consumo', 'Consumo', 1, '0', 2),
(5, 'Cochera', 'Cochera Exterior', 1, '0', 2),
(102, 'Sala Hall', 'Sala Hall', 0, '0', 3),
(103, 'Almacén', 'Almacén', 0, '0', 3),
(104, 'Comedor', 'Comedor', 0, '0', 3),
(105, 'Cocina', 'Cocina', 0, '0', 3),
(201, 'Habitación 201', 'Habitación 201 - Habitación Simple', 1, '80', 1),
(202, 'Habitación 202', 'Habitación 202 - Suite Junior', 1, '130', 1),
(203, 'Habitación 203', 'Habitación 203 - Habitación Matrimonial', 1, '100', 1),
(204, 'Habitación 204', 'Habitación 204 - Habitación Matrimonial', 1, '100', 1),
(205, 'Habitación 205', 'Habitación 205 - Habitación Matrimonial', 1, '100', 1),
(301, 'Habitación 301', 'Habitación 301 - Habitación Simple', 1, '80', 1),
(302, 'Habitación 302', 'Habitación 302 - Habitación Simple', 1, '80', 1),
(303, 'Habitación 303', 'Habitación 303 - Habitación Doble', 1, '130', 1),
(304, 'Habitación 304', 'Habitación 304 - Habitación Simple', 1, '80', 1),
(305, 'Habitación 305', 'Habitación 305 - Habitación Doble', 1, '130', 1),
(401, 'Habitación 401', 'Habitación 404 - Habitación Triple', 1, '160', 1),
(402, 'Habitación 402', 'Habitación 402 - Habitación Simple', 1, '80', 1),
(403, 'Habitación 403', 'Habitación 403 - Habitación Simple', 1, '80', 1),
(404, 'Habitación 404', 'Habitación 404 - Habitación Simple', 1, '80', 1),
(405, 'Habitación 405', 'Habitación 405 - Habitación Simple', 1, '80', 1),
(501, 'Cuarto de Trabajadores', 'Cuarto de Empleados', 0, '0', 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_servicio`
--

CREATE TABLE IF NOT EXISTS `tipo_servicio` (
  `idTipoServicio` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(100) NOT NULL,
  PRIMARY KEY (`idTipoServicio`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Volcado de datos para la tabla `tipo_servicio`
--

INSERT INTO `tipo_servicio` (`idTipoServicio`, `descripcion`) VALUES
(1, 'habitacion'),
(2, 'ambiente'),
(3, 'servicio'),
(4, 'vip'),
(5, 'otro');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE IF NOT EXISTS `usuario` (
  `idusuario` int(11) NOT NULL AUTO_INCREMENT,
  `nombres` varchar(50) DEFAULT NULL,
  `appaterno` varchar(50) DEFAULT NULL,
  `apmaterno` varchar(50) DEFAULT NULL,
  `dni` varchar(15) DEFAULT NULL,
  `direccion` text,
  `celular` varchar(15) DEFAULT NULL,
  `usuario` varchar(50) DEFAULT NULL,
  `clave` varchar(50) DEFAULT NULL,
  `idtipo` int(11) DEFAULT NULL,
  `idEmpresa` int(11) DEFAULT NULL,
  PRIMARY KEY (`idusuario`),
  KEY `FK_usuario_empresa` (`idEmpresa`),
  KEY `FK_usuario_tipo_usuario` (`idtipo`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=22 ;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idusuario`, `nombres`, `appaterno`, `apmaterno`, `dni`, `direccion`, `celular`, `usuario`, `clave`, `idtipo`, `idEmpresa`) VALUES
(1, 'Juan Carlos', 'Cabrera', 'Díaz', '72543150', 'Trujillo', '963335717', 'admin', '123123', 1, NULL),
(2, 'Nombre', 'Paterno', 'Materno', '72543150', 'direccion', 'celular', 'usuario', 'clave', 1, NULL),
(3, 'Huesped', 'Echevarria', 'Pinedo', NULL, NULL, NULL, NULL, NULL, 1, NULL),
(9, 'Olinda', 'Goicochea', 'Mauricio', '75694930', 'Av. 28 de Julio 703', '993011793', '', '', 3, 1),
(20, 'Matilde', 'Rojas', 'GarcÃ­a', '17817510', 'Trujillo', '987325625', 'mrojas', 'mrojas', 2, NULL),
(21, 'Edwin', 'Sakin', 'Ortega', '74568987', 'Bagua Chica', '978564236', 'esakin', 'esakin', 2, NULL);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `perfil`
--
ALTER TABLE `perfil`
  ADD CONSTRAINT `FK_perfil_rol` FOREIGN KEY (`rol_id`) REFERENCES `rol` (`rol_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_perfil_usuario1` FOREIGN KEY (`idusuario`) REFERENCES `usuario` (`idusuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `permiso`
--
ALTER TABLE `permiso`
  ADD CONSTRAINT `FK_permiso_menu1` FOREIGN KEY (`men_id`) REFERENCES `menu` (`men_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_permiso_rol` FOREIGN KEY (`rol_id`) REFERENCES `rol` (`rol_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `registro`
--
ALTER TABLE `registro`
  ADD CONSTRAINT `FK_registro_usuario` FOREIGN KEY (`idusuario`) REFERENCES `usuario` (`idusuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `reg_detalle`
--
ALTER TABLE `reg_detalle`
  ADD CONSTRAINT `reg_detalle_ibfk_2` FOREIGN KEY (`idServicio`) REFERENCES `servicios` (`idServicio`),
  ADD CONSTRAINT `reg_detalle_ibfk_1` FOREIGN KEY (`idRegistro`) REFERENCES `registro` (`idregistro`);

--
-- Filtros para la tabla `servicios`
--
ALTER TABLE `servicios`
  ADD CONSTRAINT `serv_tipoServ` FOREIGN KEY (`idTipoServicio`) REFERENCES `tipo_servicio` (`idTipoServicio`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `servicios_ibfk_2` FOREIGN KEY (`idEstado`) REFERENCES `estado` (`idEstado`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `FK_usuario_tipo_usuario` FOREIGN KEY (`idtipo`) REFERENCES `rol` (`rol_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_usuario_empresa` FOREIGN KEY (`idEmpresa`) REFERENCES `empresa` (`idEmpresa`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
