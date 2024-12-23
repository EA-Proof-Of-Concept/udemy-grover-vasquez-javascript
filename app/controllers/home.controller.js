//@ts-check

/**
 * @copyright 2025 - Eazicom Servicios Profesionales.
 * @author Eric Adalberto Rodríguez Sánchez <eazicomservicios@gmail.com>
 * Todos los derechos reservados.
 */

'use strict';

import Controller from "./controller.js";

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 */

/**
 * @description Controlador para la página de inicio.
 */
export default class HomeController extends Controller {

    /**
     * @description Crea una nueva instancia de la clase {@link Controller}.
     * @param {Request} request Solicitud HTTP.
     * @param {Response} response Respuesta HTTP.
     */
    constructor( request, response ) {
        super( request, response );
    }

    /**
     * @description Método que se debe implementar en cada controlador para la
     * página de inicio.
     * @returns {void} Este método no retorna ningún valor.
     */
    home = () => {
        this._response.status( 200 ).render( 'home' );
    }
}
