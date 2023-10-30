/**
 * Copyright (c) 2023 Eazicom Servicios Profesionales
 * Derechos intelecutales reservados.
 */

/**
 * Imprime un saludo en la consola.
 * @param {string} message Saludo a imprimir en consola.
 * @returns {void}
 */
const sayHello = ( message: string = '¡Hola mundo!' ): void => {
    console.log( message );
}

/**
 * Crea un saludo con el nombre del usuario.
 * @param {string} name Nombre del usuario.
 * @returns {string}
 */
const greeting = ( name: string ): string => {
    return `¡Hola ${name}!`;
}

/**
 * Suma dos números.
 * @param {number} a Primer sumando.
 * @param {number} b Segundo sumando.
 * @returns {number}
 */
const add = ( a: number, b: number ): number => {
    return ( a + b );
}

// Evento que se dispara cuando se ha terminado de cargar el documento HTML.
document.addEventListener( 'DOMContentLoaded', (): void => {

    sayHello();
    sayHello( '¡Soy una función de JavaScript!' );

    let message: string = greeting( 'Eric' );
    sayHello( message );

    let addition = add( 10, 5 );
    console.log( `La suma de 10 + 5 = ${addition}.` );

} );
