//@ts-check

/**
 * @copyright 2025 - Eazicom Servicios Profesionales.
 * @author Eric Adalberto Rodríguez Sánchez <eazicomservicios@gmail.com>
 * Todos los derechos reservados.
 */

'use strict';

import express from 'express';

/**
 * @description Define la clase base para los controladores y las operaciones
 * mínimas que debe realizar cada uno.
 */
export default class Controller {

    /**
     * @description Almacena la solicitud HTTP que se está procesando.
     * @protected
     * @type {express.Request}
     */
    _request;

    /**
     * @description Almacena la respuesta HTTP que se enviará al cliente.
     * @protected
     * @type {express.Response}
     */
    _response;

    /**
     * @description Crea una nueva instancia de la clase {@link Controller}.
     * @param {express.Request} request 
     * @param {express.Response} response 
     */
    constructor( request, response ) {
        this._request = request;
        this._response = response;
    }

    /**
     * @description Método que se debe implementar en cada controlador para
     * realizar las operaciones específicas de cada uno.
     */
    home = () => { }
}
