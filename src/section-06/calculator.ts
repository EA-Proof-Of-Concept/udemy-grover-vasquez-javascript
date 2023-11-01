/**
 * Copyright (c) 2023 Eazicom Servicios Profesionales
 * Derechos intelecutales reservados.
 */

/**
 * Contiene los dígitos y operadores que deben 
 * @type {string[]}
 */
const keys: string[] = ['/', 'X', '+', '-', '='];

const configure = async () => {
    const result = <HTMLInputElement>document.querySelector( '.ea-result' );
    result?.addEventListener( 'focus', ( ev: FocusEvent ): void => {
        if ( ev.target !== null )
            ( <HTMLInputElement>ev.target ).blur();
    } );
}

// Este evento de dispara al finalizar la carga completa del documento HTML.
document.addEventListener( 'DOMContentLoaded', ( ev: Event ): void => {
    configure().then();
} );