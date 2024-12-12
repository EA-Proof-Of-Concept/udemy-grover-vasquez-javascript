//@ts-check

/**
 * Udemy: Introducción a la Programación con Javascript.
 * @copyright Grover Vásquez
 * Todos los derechos reservados.
 */

'use strict';

import compression from 'compression';
import { default as express } from 'express';
import { engine } from 'express-handlebars';

/**
 * @typedef {import('express').Express} Express
 * @typedef {import('express').Router} Router
 */

export default class Server {
    /**
     * @type {Express}
     */
    #app;

    /**
     * Crea una nueva instancia de la clase 
     */
    constructor() {
        this.#app = express();
        this.#config();
    }

    /**
     * 
     */
    #config = () => {
        this.#app.engine( 'handlebars', engine( {
            partialsDir: './views/partials'
        }) );
        
        this.#app.set( 'view engine', 'handlebars' );
        this.#app.set( 'views', './views');

        this.#app.use( compression() );
        this.#app.use( '/', express.static( 'public' ) );
        this.#app.use( '/stylesheets',
            express.static( 'node_modules/bootstrap/dist/css' ) );
        this.#app.use( '/stylesheets',
            express.static( 'node_modules/bootstrap-icons/font' ) );
        this.#app.use( '/javascripts',
            express.static( 'node_modules/bootstrap/dist/js' ) );
    }

    /**
     * 
     * @param {express.Router} router 
     */
    addModule = ( router ) => {
        this.#app.use( router );
    }

    /**
     * 
     * @param {number} port 
     * @returns {void} Este método no retorna ningún valor.
     */
    listen = ( port ) => {
        this.#app.listen( port, () => {
            console.clear();
            console.log( `Aplicación en línea, puerto ${port}` );
        } );
    }
}
