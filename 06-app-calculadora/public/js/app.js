/**
 * @copyright 2025 - Eazicom Servicios Profesionales.
 * Todos los derechos reservados.
 */

/**
 * @typedef {JQuery<HTMLButtonElement>} Key Representa una tecla numérica o 
 * un comando de la calculadora.
 * 
 * @typedef {JQuery<HTMLDivElement>} Container Representa la carcasa entera de
 * la calculadora.
 * 
 * @typedef {JQuery<HTMLDivElement>} Component Representa un componente dentro
 * de la carcasa de la calculadora.
 * 
 * @typedef {(value: Component|PromiseLike<Component>) => void} ResolvedComponent
 * Representa una función que devuelve un componente de la calculadora.
 */

//#region -- Declaración de variables --
/**
* Contiene los dígitos y operadores que deben
* @type {string[]}
*/
const keys = ['CE', 'DEL', '%', '/', '7', '8', '9', 'x', '4', '5', '6', '-', '1', '2', '3', '+', '+/-', '0', '.', '='];

/**
 * Contiene el primer operando escrito antes presionar una tecla de comando.
 * @type {string}
 */
let firstOperand = '';

/**
 * @type {string}
 */
let arithmeticOperation = '';

const ZERO = '0.';

/**
 * Determina si se ha pulsado la tecla del punto decimal ('.').
 * @type {boolean}
 */
let dot = false;

//#endregion

//#region -- Funciones de construcción --
/**
 * Construye de manera asíncrona el componente visual de una calculadora.
 * @param {string[]} keys Teclas de la calculadora.
 * @returns {Promise<Component>}
 */
async function buildCalculator( keys ) {
    return /** @type {Promise<Component>} */ ( new Promise(
        
        ( /** @type {ResolvedComponent} */ resolve ) => {    
            /** @type {Component} */
            let calculator = $( "<div>", { class: "card" } );

            /** @type {Component} */
            const screen = buildScreen();
            calculator.append( screen );

            /** @type {Component} */
            const keyboard = buildKeyboard( keys );
            calculator.append( keyboard );

            resolve( calculator );
        }
    ) );
}

/**
 * Construye la pantalla de la calculadora.
 * @returns {Component}
 */
function buildScreen() {

    let led = $( '<input>', { type: 'text', id: 'screen', 'readonly': '' } );
    led.addClass( 'ea-result form-control fs-1 text-end' ).val( ZERO );
    led.on( 'focus', ( e ) => {
        e.preventDefault();
        e.target.blur();
        return false;
    } );

    /** @type {Component} */
    let screen = $( "<div>", { "class": "card-header container" } );
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
function buildKeyboard( keys ) {
    let currentColumn = 0;
    
    /** @type { Component } */
    let row;

    /** @type { Component }*/
    let keyboard = $( "<div>", { "class": "card-body" } );

    keys.forEach( ( symbol ) => {
        if ( currentColumn === 0 ) {
            row = $( '<div>', { class: 'row mt-3' } );
        }
        
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
function buildKey( symbol ) {
    /** @type { Key } */
    let key = $( '<button/>', { 'type': 'button' } );
    key.addClass( 'fw-semibold btn' ).text( symbol );

    // Si es un número...
    if ( !isNaN( /** @type { any }*/( symbol ) ) ||
        symbol == '+/-' || symbol == '.' ) {
        asDigit( key );
    }
    else
        asCommand( key );

    return key;
}

/**
 * Configura una tecla de la calculadora como dígito.
 * @param {Key} button Tecla de la calculadora.
 * @returns {void}
 */
function asDigit( button ) {
    button.addClass( 'btn-primary' );
    button.on( 'click', e => writeDigit( $( e.target ).text() ) );
}

/**
 * Configura una tecla de la calculadora como comando.
 * @param {Key} button Tecla de la calculador.
 * @returns {void}
 */
function asCommand( button ) {
    let symbol = button.text();
    let className = 'btn-';

    if ( '=' == symbol )
        className += 'danger';
    else
        className += 'success';

    button.addClass( className );
    button.on( 'click', e => setCommand( $( e.target ).text() ) );
}
//#endregion

//#region -- Métodos de comportamiento --

/**
 * Retorna una cadena de números sin el punto decimal.
 * @param {string} number Cadena de números con punto decimal.
 * @returns {string}
 */
const removeDecimalPoint = ( number ) => {
    return number.replace( '.', '' );
}

//#endregion

//#region -- Eventos de la aplicación --
/**
 * Escribe el dígito pulsado en pantalla.
 * @param {string} digit Dígito a escribir en la pantalla.
 * @returns {void}
 */
function writeDigit( digit ) {

    /** @type {Component} */
    let screen = $( '#screen' );
    let content = /** @type { string } */ ( screen.val() );

    switch ( digit ) {
        case '+/-':
            if ( ZERO !== content )
                ( content.includes( '-' ) )
                    ? content = content.replace( '-', '' )
                    : content = '-' + content;
            break;
        case '.':
            dot = true;
            break;
        default:
            if ( ZERO === content ) {
                content = `${digit}.`;
            } else {
                if ( dot ) {
                    content += digit
                } else {
                    content = removeDecimalPoint( content );
                    content += `${digit}.`;
                }
            }
            break;
    }
    screen.val( content );
}

/**
 *
 * @param { string } command
 */
function setCommand( command ){
    switch ( command ) {
        case 'CE':
            ce();
            break;
        case 'DEL':
            setContentScreen( del() );
            break;
        default:
            firstOperand = /** @type {string} */ (
                $( '#screen' ).val()
            );
            arithmeticOperation = command;
            blink();
            break;
    }
}

/**
 * Establece la pantalla de la calculadora en cero.
 * @returns {string}
 */
function ce() {
    setContentScreen( ZERO );
    dot = false;
    
    return ZERO;
}

/**
 * Borra un dígito tecleado por el usuario.
 * @returns {string}
 */
function del() {
    
    let content = /** @type {string} */ ( $( '#screen' ).val() );
    
    if ( ZERO !== content ) {
        if ( 2 === content.length ) {
            content = ce();
        } else {
            if ( content.includes( '-' ) && content.length === 3 ) {
                content = ce();
            } else {
                if ( content.endsWith( '.' ) && dot ) {
                    dot = false;
                } else {
                    if ( dot ) {
                        content = content.substring( 0, content.length - 1 );
                    } else {
                        content = removeDecimalPoint( content );
                        content = content.substring( 0, content.length - 1 );
                        content += '.';
                    }
                }
            }
        }
    }
    return content;
}
/**
 * 
 * @param {string} newContent Contenido nuevo de la pantalla.
 */
function setContentScreen( newContent ) {
    let screen = $( '#screen' );
    screen.val( newContent );
}
//#endregion

//#region -- Comandos --

/**
 * 
 */
function module() {
    const number = /** @type {number} */ (
        $( '#screen' ).val()
    );
    
}

/**
 * 
 * @param {string} operator 
 * @returns {void}
 */
function resolve( operator ) {
    
}

function addition() {

}

/**
 *
 * @returns {void}
 */
function blink() {
    /** @type {JQuery<HTMLInputElement>} */
    let screen = $( '#screen' );
    let content = /** @type {string} */ ( screen.val() );
    screen.val( '' );
    setTimeout( () => screen.val( content ), 100 );
}
//#endregion

// Este evento de dispara al finalizar la carga completa del documento HTML.
document.addEventListener( 'DOMContentLoaded', ( ev ) => {
    buildCalculator( keys ).then( calculator =>
        $( ".col-sm-12" ).append( calculator ) );
} );