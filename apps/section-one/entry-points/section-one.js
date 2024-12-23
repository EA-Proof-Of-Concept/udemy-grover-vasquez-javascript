//@ts-check

/**
 * @copyright 2025 - Eazicom Servicios Profesionales.
 * @author Eric Adalberto Rodríguez Sánchez <eazicomservicios@gmail.com>
 * Todos los derechos reservados.
 */

'use strict';

import express from 'express';

/**
 * @description Ejercicios de la sección uno.
 * @type {express.Router}
 */
export const sectionOne = express.Router();

sectionOne.get( '/', ( req, res ) => {
    res.render( 'section-one' );
} );

sectionOne.get( '/section-one', ( req, res ) => {
    res.render( 'section-one' );
} );
