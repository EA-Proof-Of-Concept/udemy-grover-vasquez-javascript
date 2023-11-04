/**
 * Copyright (c) 2023 Eazicom Servicios Profesionales
 * Derechos intelecutales reservados.
 */

/**
 * Representa una tecla de la calculadora.
 */
type Key = JQuery<HTMLButtonElement>;

type Container = JQuery<HTMLDivElement>;

type Component = JQuery<HTMLDivElement>;

type ResolvedComponent = ( value: Component |
    PromiseLike<Component> ) => void;

/**
 * Contiene los dígitos y operadores que deben
 * @type {string[]}
 */
const keys: string[] = ['CE', 'DEL', '%', '/', '7', '8', '9', 'x', '4', '5', '6', '-', '1', '2', '3', '+', '+/-', '0', '.', '='];

const asDigit = ( button: Key ): void => {
    button.addClass( 'btn-info' );
    button.data( 'role', 'digit' );
}

const asCommand = ( button: Key ): void => {

    let symbol: string = button.text();
    let className: string = 'btn-'

    if ( '=' == symbol )
        className += 'danger';
    else
        className += 'secondary';

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

function buildKeyboard( keys: string[] ): Component {
    let currentColumn = 0;
    let row: JQuery<HTMLDivElement>;

    let keyboard: Component = $( "<div>", { "class": "card-body" } );

    keys.forEach( ( symbol: string ) => {
        if ( currentColumn === 0 )
            row = $( '<div>', { class: 'row mt-3' } );

        let key = createKey( symbol );
        row.append( $( '<div>', { class: 'col-3 d-grid' } ).append( key ) );
        currentColumn++;

        if ( currentColumn === 4 ) {
            keyboard.append( row );
            currentColumn = 0;
        }
    } );

    return keyboard;
}

/**
 *
 * @param keys
 * @returns
 */
async function buildCalculator( keys: string[] ): Promise<Component> {
    return ( new Promise<Component>(
        ( resolve: ResolvedComponent ) => {

            let calculator: Component = $( "<div>", { "class": "card" } );

            const screen: Component = buildScreen();
            calculator.append( screen );

            const keyboard: Component = buildKeyboard( keys );
            calculator.append( keyboard );

            resolve( calculator );
        }
    ) );
}

/**
 *
 * @param keys
 */
function buildScreen(): Component {

    let led = $( '<input>', { type: 'text', id: 'result' } );
    led.addClass( 'ea-result form-control fs-1 text-end' )
        .attr( 'readonly', 'true' ).val( '0' );

    let screen: Component = $( "<div>", {
        "class": "card-header container"
    } );
    screen.append( $( "<div>", { "class": "row mt-2 mb-2" } )
        .append( $( "<div>", { "class": "col" } )
            .append( led ) ) );

    return screen;
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
} );