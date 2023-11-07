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
    button.addClass( 'btn-primary' );
    button.data( 'role', 'digit' );
}

const asCommand = ( button: Key ): void => {

    let symbol: string = button.text();
    let className: string = 'btn-'

    if ( '=' == symbol )
        className += 'danger';
    else
        className += 'warning';

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

    let led = $( '<input>', { type: 'text', id: 'screen', 'readonly': '' } );
    led.addClass( 'ea-result form-control fs-1 text-end' ).val( '0' );

    let screen: Component = $( "<div>", {
        "class": "card-header container"
    } );
    screen.append( $( "<div>", { "class": "row mt-2 mb-2" } )
        .append( $( "<div>", { "class": "col" } )
            .append( led ) ) );

    return screen;
}

function addEvents() {
    const result = <HTMLInputElement>document.querySelector( '.ea-result' );
    result?.addEventListener( 'focus', ( ev: FocusEvent ): void => {
        if ( ev.target !== null )
            ( <HTMLInputElement>ev.target ).blur();
    } );

    $( 'button' ).on( 'click', event => {
        let button = <JQuery<HTMLButtonElement>>$( event.target );

        let keyType = $( event.target ).data( 'role' );
        if ( 'digit' == keyType )
            resolveDigit( button );
        else
            resolveCommand( button );
    } );
}

/**
 *
 * @param button
 */
function resolveDigit( button: JQuery<HTMLButtonElement> ): void {

    let screen: JQuery<HTMLInputElement> = $( '#screen' );
    let content: string = <string>screen.val();
    const digit: string = button.text();

    switch ( digit ) {
        case '+/-':
            if ( '0' !== content ) {
                if ( content.includes( '-' ) )
                    content = content.replace( '-', '' );
                else
                    content = '-' + content;
            }
            break;
        case '.':
        default:
            if ( '0' === content )
                content = digit;
            else
                content += digit;
            break;
    }
    screen.val( content );
}

function resolveCommand( button: JQuery<HTMLButtonElement> ) {

}

/**
 * Establece el contenido de la pantalla de la calculadora.
 * @param content
 */
function setContentScreen( content: string ): void {
    let screen = <JQuery<HTMLInputElement>>$( '#screen' );
    if ( '0' === screen.val() )
        screen.val( content );
    else
        screen.val( `${screen.val()}${content}` );
}

// Este evento de dispara al finalizar la carga completa del documento HTML.
document.addEventListener( 'DOMContentLoaded', ( ev: Event ): void => {

    buildCalculator( keys ).then( ( calculator: Component ): void => {
        $( ".col-sm-12" ).append( calculator );
        addEvents();
    } );

} );