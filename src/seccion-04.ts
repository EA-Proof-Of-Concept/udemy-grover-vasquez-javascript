/**
 * Copyright (c) 2023 Eazicom Servicios Profesionales
 * Derechos intelecutales reservados.
 */

/**
 * Imprim
 * @param message Mensaje a imprimir en consola.
 */
const log = ( message: string ): void => {
    console.log( message );
}
log( '¡Hola mundo!' );

/**
 * 
 * @param name 
 * @returns 
 */
const greeting = ( name: string ): string => {
    return `¡Hola ${name}!`;
}
let message = greeting( 'Pedro' );
log( message );

/** Colección de nombres. */
let names: string[] = ['Eric', 'Rodolfo', 'Eduardo', 'Luis'];
console.log( `El elemento de la posición 1 es "${names[1]}".` );

/** Colección de números. */
let numbers: Array<number> = new Array<number>( 1, 10, 5, 43 );
console.log();
