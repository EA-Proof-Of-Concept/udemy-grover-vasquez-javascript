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

//#region -- Funciones de construcción --
/**
 * Construye de manera asíncrona el componente visual de una calculadora.
 * @param {string[]} keys Teclas de la calculadora.
 * @returns {Promise<Component>}
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
 * Construye la pantalla de la calculadora.
 * @returns {Component}
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

/**
 * Construye el teclado de la calculadora.
 * @param {string[]} keys Teclas de la calculadora.
 * @returns {Component}
 */
function buildKeyboard( keys: string[] ): Component {
    let currentColumn = 0;
    let row: JQuery<HTMLDivElement>;

    let keyboard: Component = $( "<div>", { "class": "card-body" } );

    keys.forEach( ( symbol: string ) => {
        if ( currentColumn === 0 )
            row = $( '<div>', { class: 'row mt-3' } );

        let key = buildKey( symbol );
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
 * Crea una tecla con el símbolo especificado.
 * @param {string} symbol Símbolo de la tecla.
 * @returns {Key}
 */
function buildKey( symbol: string ): Key {

    let key: Key = $( '<button/>', { 'type': 'button' } );
    key.addClass( 'fw-semibold btn' ).text( symbol );

    // Si es un número...
    if ( !isNaN( <any>symbol ) || symbol == '+/-' || symbol == '.' )
        asDigit( key );
    else
        asCommand( key );

    return key;
}

/**
 * Configura una tecla de la calculadora como dígito.
 * @param {Key} button Tecla de la calculadora.
 * @returns {void}
 */
function asDigit( button: Key ): void {
    button.addClass( 'btn-primary' );
    button.data( 'role', 'digit' );
}

/**
 * Configura una tecla de la calculadora como comando.
 * @param {Key} button Tecla de la calculador.
 * @returns {void}
 */
function asCommand( button: Key ): void {
    let symbol: string = button.text();
    let className: string = 'btn-'

    if ( '=' == symbol )
        className += 'danger';
    else
        className += 'success';

    button.addClass( className );
    button.data( 'role', 'command' );
}
//#endregion

//#region -- Eventos de la aplicación --
/**
 * Agrega los eventos a los controles de la aplicación.
 * @returns {void}
 */
function addEventListeners(): void {
    $( '#screen' ).on( 'focus', event => {
        event.target.blur();
    } );

    $( 'button' ).on( 'click', event => {
        let key: Key = <Key>$( event.target );
        ( 'digit' == key.data( 'role' ) )
            ? writeDigit( key.text() )
            : resolveCommand( key.text() );
    } );
}

/**
 * Escribe el dígito pulsado en pantalla.
 * @param {string} digit Dígito a escribir en la pantalla.
 * @returns {void}
 */
function writeDigit( digit: string ): void {
    let screen = $( '#screen' );
    let content: string = <string>screen.val();

    switch ( digit ) {
        case '+/-':
            if ( '0' !== content )
                ( content.includes( '-' ) )
                    ? content = content.replace( '-', '' )
                    : content = '-' + content;
            break;
        case '.':
        default:
            ( '0' === content )
                ? content = digit
                : content += digit;
            break;
    }
    screen.val( content );
}

/**
 *
 * @param button
 */
function resolveCommand( command: string ): void {
    switch ( command ) {
        case 'CE':
            setContentScreen( '0' );
            break;
        case 'DEL':
            setContentScreen( del() );
            break;
        default:
            animateScreen( '#screen' );
            break;
    }
}

/**
 * Borra un dígito tecleado por el usuario.
 * @param {string} content
 * @returns {string}
 */
function del(): string {
    let content: string = <string>$( '#screen' ).val();
    if ( '0' !== content ) {
        if ( 1 === content.length ) {
            content = '0';
        } else {
            if ( content.includes( '-' ) && content.length === 2 ) {
                content = '0';
            } else {
                content = content.substring( 0, content.length - 1 );
            }
        }
    }
    return content;
}

function setContentScreen( newContent: string ): void {
    let screen = $( '#screen' );
    screen.val( newContent );
}
//#endregion

//#region -- Comandos --
/**
 *
 * @param id
 */
function animateScreen( id: string ): void {
    let display = $( id );
    let value = <string>display.val();
    display.val( '' );
    setTimeout( () => display.val( value ), 100 );
}
//#endregion

// Este evento de dispara al finalizar la carga completa del documento HTML.
document.addEventListener( 'DOMContentLoaded', ( ev: Event ): void => {

    buildCalculator( keys ).then( ( calculator: Component ): void => {
        $( ".col-sm-12" ).append( calculator );
        addEventListeners();
    } );

} );