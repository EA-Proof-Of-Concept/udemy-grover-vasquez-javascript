/**
 * Copyright (c) 2023 Eazicom Servicios Profesionales
 * Derechos intelecutales reservados.
 */

// Evento disparado al terminar de cargar completamente el documento HTML.
document.addEventListener( 'DOMContentLoaded', ( ev: Event ): void => {

    let text: any = 'ABC';
    if ( isNaN( text ) ) {
        console.log( `${text} no es un número, su tipo es ${typeof ( text )}.` );
    }

    let number: any = 105;
    if ( !isNaN( number ) ) {
        let result = parseInt( number ) + 5;
        console.log( `${number} es un número que sumando 5 da como resultado ${result}, su tipo es ${typeof ( parseInt( number ) )}.` );
    }
} );
