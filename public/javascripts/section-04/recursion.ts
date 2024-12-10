/**
 * Copyright (c) 2023 Eazicom Servicios Profesionales
 * Derechos intelecutales reservados.
 */

/**
 * Cuenta hasta un determinado número.
 * @param {number} top Límite del conteo.
 * @param {number} current Número actual.
 * @returns {void}
 */
const count = ( top: number, current: number = 1 ): void => {
    if ( current > top ) {
        console.log( '¡Ya acabé!' );
        return;
    }
    console.log( `¡Y dice ${current}...!` );
    count( top, current + 1 );
}

/**
 * Calcula el factorial de un número.
 * @param {number} number Número a obtener su factorial.
 * @returns {number}
 */
const factorial = ( number: number ): number => {
    if ( number == 0 || number == 1 )
        return 1;
    return number * factorial( number - 1 );
}

// Evento disparado al terminar de cargar completamente el documento HTML.
document.addEventListener( 'DOMContentLoaded', ( ev: Event ): void => {

    // Cuenta hasta 10.
    count( 10 );

    //Obtiene el factorial de un número.
    let result = factorial( 5 );
    console.log( `El factorial de 5 es ${result}.` );

} );
