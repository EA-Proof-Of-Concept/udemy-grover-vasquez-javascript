/**
 * Copyright (c) 2023 Eazicom Servicios Profesionales
 * Derechos intelecutales reservados.
 */

/**
 * Muesta en consola el contenido de una colección.
 * @param {Array} array Colección de elementos.
 * @returns {void}
 */
const show = <T>( array: Array<T> ): void => {
    array.forEach( ( value: T, index: number ): void => {
        console.log( `${index}: ${value}` );
    } );
}

// Evento disparado al terminar de cargar completamente el documento HTML.
document.addEventListener( 'DOMContentLoaded', ( ev: Event ): void => {
    /** Colección de nombres. */
    let names: string[] = ['Eric', 'Rodolfo', 'Eduardo', 'Luis'];
    console.log( `Longitud de la colección de nombres: ${names.length}.` );
    show( names );
    console.log( `El elemento de la posición 1 es "${names[1]}".` );

    /** Colección de números. */
    let numbers: Array<number> = new Array<number>( 1, 10, 5, 43 );
    console.log( 'Este es la colección de números original:' );
    show( numbers );

    numbers[0] = 200;
    numbers[4] = 6;
    numbers.push( 150 );

    console.log( 'Después de las modificaciones tenemos...' );
    show( numbers );

} );
