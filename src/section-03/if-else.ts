/**
 * Copyright (c) 2023 Eazicom Servicios Profesionales
 * Derechos intelecutales reservados.
 */

// Evento disparado al terminar de cargar completamente el documento HTML.
document.addEventListener( 'DOMContentLoaded', ( ev: Event ): void => {

    const age: number = 15;
    age >= 18
        ? console.log( `Mayor de edad con ${age} años.` )
        : console.log( `Menor de edad, falta cumplir ${18 - age} año(s) más.` );

} );