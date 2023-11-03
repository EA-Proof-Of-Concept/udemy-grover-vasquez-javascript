/**
 * Copyright (c) 2023 Eazicom Servicios Profesionales
 * Derechos intelecutales reservados.
 */

type Led = JQuery<HTMLInputElement>;
/**
 * Representa un conjunto de elementos HTML que conforman un componente de la
 * pantalla que mira el usuario.
 */
type Key = JQuery<HTMLDivElement>;

type ResolvedKey = ( value: JQuery<HTMLDivElement> |
    PromiseLike<JQuery<HTMLDivElement>> ) => void;

/**
 * Contiene los dígitos y operadores que deben 
 * @type {string[]}
 */
const keys: string[] = ['CE', 'DEL', '%', '/', '7', '8', '9', 'x', '4', '5', '6', '-', '1', '2', '3', '+', '+/-', '0', '.', '='];

const digitButton = ( button: JQuery<HTMLButtonElement> ): void => {
    button.addClass( 'btn-primary' );
    button.data( 'role', 'digit' );
}

const commandButton = ( button: JQuery<HTMLButtonElement>, className: string = 'success' ): void => {
    button.addClass( `btn-${className}` );
    button.data( 'role', 'command' );
}

const createKey = ( symbol: string ): Key => {

    let key: Key = $( '<div>', { class: 'col-3 d-grid' } );
    key.append( $( '<button>', {
        class: 'fw-semibold btn',
        text: symbol,
        type: 'button'
    } ) );
    let button: JQuery<HTMLButtonElement> = key.find( 'button' );
    if ( isNaN( <any>symbol ) ) {
        switch ( symbol ) {
            case '+/-':
            case '.':
                digitButton( button );
                break;
            case '=':
                commandButton( button, 'danger' );
                break;
            default:
                commandButton( button );
                break;
        }
    } else {
        digitButton( button );
    }
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
            row.append( key );
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