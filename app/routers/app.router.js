//@ts-check

/**
 * @copyright 2025 - Eazicom Servicios Profesionales.
 * @author Eric Adalberto Rodríguez Sánchez <eazicomservicios@gmail.com>
 * Todos los derechos reservados.
 */

'use strict';

import express from 'express';
import HomeController from '../controllers/home.controller.js';

/**
 * @description Rutas de la aplicación.
 * @type {express.Router}
 */
export const appRouter = express.Router();

appRouter.get( '/', ( req, res ) => {
    const controller = new HomeController( req, res );
    controller.home();
} );

appRouter.get( '/home', ( req, res ) => {
    const controller = new HomeController( req, res );
    controller.home();
} );