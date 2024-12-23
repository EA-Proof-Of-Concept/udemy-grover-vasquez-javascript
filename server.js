//@ts-check

/**
 * @copyright 2025 - Eazicom Servicios Profesionales.
 * @author Eric Adalberto Rodríguez Sánchez <eazicomservicios@gmail.com>
 * Todos los derechos reservados.
 */

'use strict';

import compression from 'compression';
import express from 'express';
import { engine } from 'express-handlebars';

/**
 * @description Provee las funciones necesarias para configurar e iniciar el
 * servidor de Express.
 */
export default class Server {

    /**
     * Referencia a la aplicación de Express.
     * @type {express.Express}
     */
    #app;

    /**
     * @description Crea una nueva instancia de la clase {@link Server}.
     */
    constructor() {
        this.#config();
    }

    /**
     * Realiza la configuración del servidor.
     * @returns {void} Este método no retorna ningún valor.
     */
    #config = () => {
        this.#app = express();
        
        this.#app.engine( 'handlebars', engine( {
            extname: '.handlebars',
            partialsDir: './app/views/partials/'
        } ) );
        this.#app.set( 'view engine', 'handlebars' );
        this.#app.set( 'views', './app/views/' );

        this.#app.use( compression() );
        this.#app.use( express.json() );

        this.#app.use( '/', express.static( './public/' ) );
        this.#app.use( '/css',
            express.static( 'node_modules/bootstrap-icons/font/' ) );
        this.#app.use( '/css',
            express.static( 'node_modules/bootstrap/dist/css/' ) );
        this.#app.use( '/js',
            express.static( 'node_modules/bootstrap/dist/js/' ) );
    }

    /**
     * Agrega la configuración de rutas para un recurso especificado.
     * @param {express.Router} router
     * @returns {void}
     */
    addRouter = ( router ) => {
        this.#app.use( router );
    }

    /**
     * Inicia el servidor de Express en el puerto especificado.
     * @param {number} port Puerto en el que se iniciará el servidor.
     * @returns {void} Este método no retorna ningún valor.
     */
    listen = ( port ) => {
        this.#app.listen( port, () => {
            console.clear();
            console.log( `Aplicación en línea, puerto ${port}.` );
        } );
    }
}
