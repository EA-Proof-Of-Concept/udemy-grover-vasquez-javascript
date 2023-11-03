/**
 * Copyright (c) 2023 Eazicom Servicios Profesionales
 * Derechos intelecutales reservados.
 */

/**
 * Representa una tecla de la calculadora.
 */
type Key = JQuery<HTMLButtonElement>;

type Container = JQuery<HTMLDivElement>;

type ResolvedKey = ( value: JQuery<HTMLDivElement> |
    PromiseLike<JQuery<HTMLDivElement>> ) => void;

/**
 * Contiene los dígitos y operadores que deben 
 * @type {string[]}
 */
const keys: string[] = ['CE', 'DEL', '%', '/', '7', '8', '9', 'x', '4', '5', '6', '-', '1', '2', '3', '+', '+/-', '0', '.', '='];

const asDigit = ( button: Key ): void => {
    button.addClass( 'btn-primary' );
    button.data( 'role', 'digit' );
}

const asCommand = ( button: Key ): void => {

    let symbol: string = button.text();
    let className: string = 'btn-'

    if ( '=' == symbol )
        className += 'danger';
    else
        className += 'success';

    button.addClass( className );
    button.data( 'role', 'command' );
}

/**
 * 
 * @param symbol 
 * @returns 
 */
const createKey = ( symbol: string ): Key => {

    let key: Key = $( '<button/>', { 'type': 'button' } );
    key.addClass( 'fw-semibold btn' ).text( symbol );

    // Si es un número...
    if ( !isNaN( <any>symbol ) || symbol == '+/-' || symbol == '.' )
        asDigit( key );
    else
        asCommand( key );

    return key;
}

const buildKeyboard = async ( keys: Array<string> ): Promise<void> => {
    await ( new Promise<void>( ( resolve ) => {
        let currentColumn = 0;
        let row: JQuery<HTMLDivElement>;

        keys.forEach( ( symbol: string ) => {
            if ( currentColumn === 0 )
                row = $( '<div>', { class: 'row mt-3' } );

            let key = createKey( symbol );
            row.append( $( '<div>', { class: 'col-3 d-grid' } ).append( key ) );
            currentColumn++;

            if ( currentColumn === 4 ) {
                $( '#keyboard' ).append( row );
                currentColumn = 0;
            }
        } );
        resolve();
    } ) );
}

const configure = async () => {
    const result = <HTMLInputElement>document.querySelector( '.ea-result' );
    result?.addEventListener( 'focus', ( ev: FocusEvent ): void => {
        if ( ev.target !== null )
            ( <HTMLInputElement>ev.target ).blur();
    } );
}

// Este evento de dispara al finalizar la carga completa del documento HTML.
document.addEventListener( 'DOMContentLoaded', ( ev: Event ): void => {
    buildKeyboard( keys ).then();
} );