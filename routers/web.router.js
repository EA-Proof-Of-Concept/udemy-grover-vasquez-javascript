//@ts-check

/**
 * Udemy: Introducción a la Programación con Javascript.
 * @copyright Grover Vásquez
 * Todos los derechos reservados.
 */

'use strict';

import express from 'express';

export const web = express.Router();
web.get( '/', ( req, res ) => {
    res.render( 'home' );
} );

web.get( '/calculator', ( req, res ) => {
    res.render( 'calculator' );
} );