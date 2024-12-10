//@ts-check

/**
 * Udemy: Introducción a la Programación con Javascript.
 * @copyright 2025 Eazicom Servicios Profesionales.
 * Todos los derechos reservados.
 */

'use strict';

import Variables from 'dotenv';

/**
 * Contiene los valores establecidos para las variables de entorno
 */
export default class AppConfig {

    /**
     * Constructor estático de la clase.
     */
    static {
        Variables.config();
    }
    
    /**
     * Obtiene el puerto establecido en el archivo de configuración para
     * recibir solicitudes del cliente.
     * @returns {number}
     */
    static get port() {
        let value = ( process.env.PORT || '80' );
        return parseInt( value );
    }
}
