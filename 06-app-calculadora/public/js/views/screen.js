'use strict';

/**
 * Udemy: Introducción a la Programación con Javascript.
 * @copyright 2025 Eazicom Servicios Profesionales.
 * Todos los derechos reservados.
 */

/**
 * Representa la pantalla de la calculadora donde el usuario visualiza el
 * valor ingresado y el resultado de la operación.
 * @class
 */
export default class Screen {

    /**
     * Define el símbolo del punto.
     * @type {string}
     * @constant
     */
    #DECIMAL_POINT = '.';

    /**
     * Define el valor de cero.
     * @type {string}
     * @constant
     */
    #ZERO = '0.';
    
    /**
     * Establece si el valor de la pantalla es un número decimal.
     * @type {boolean}
     */
    #isDecimal = false;

    /**
     * Representa el componente con los elementos HTML para la pantalla de la
     * calculadora.
     * @type {HTMLDivElement}
     */
    #htmlComponent;

    /**
     * Obtiene el elemento HTMLIntputElement que corresponde a la pantalla de 
     * la calculadora.
     * @returns {HTMLInputElement} El elemento HTMLInputElement.
     */
    get #screen() {
        return ( /** @type {HTMLInputElement} */ (
            this.#htmlComponent.querySelector( '#screen' )
        ) );
    }

    /**
     * Obtiene el componente con los elementos HTML que conforman la pantalla
     * de la calculadora.
     * @returns {HTMLDivElement} El componente con los elementos HTML que conforman
     * la pantalla.
     */
    get htmlComponent() {
        return this.#htmlComponent;
    }

    /**
     * Obtiene el valor numérico de la pantalla.
     * @return {number} El valor numérico que contiene la pantalla.
     */
    get value() {
        let value = this.#screen.value;
        if ( value.endsWith( this.#DECIMAL_POINT ) ) {
            value = value.replace( this.#DECIMAL_POINT, '' );
            return parseInt( value );
        } else {
            return parseFloat( value );
        }
    }

    /**
     * Crea una nueva instancia de la clase {@link Screen}.
     * @constructor
     */
    constructor() {
        this.#onInit();
    }

    /**
     * Inicializa el componente de la pantalla de la calculadora.
     * @returns {void}
     */
    #onInit() {
        let led = document.createElement( 'input' );
        led.classList.add( 'form-control', 'fs-1', 'text-end', 'app-result' );
        led.setAttribute( 'id', 'screen' );
        led.setAttribute( 'readOnly', 'true' );
        led.setAttribute( 'type', 'input' );
        led.setAttribute( 'value', this.#ZERO );
        led.addEventListener( 'focus', ( ev ) => {
            ev.preventDefault();
            ( /** @type {HTMLInputElement} */ ( ev.target ) ).blur();
        } );

        let glass = document.createElement( 'div' );
        glass.classList.add( 'row', 'mt-2', 'mb-2' );
        glass.appendChild( document.createElement( 'div' ) );
        glass.querySelector( 'div' )?.classList.add( 'col' );
        glass.querySelector( 'div' )?.appendChild( led );
        
        this.#htmlComponent = document.createElement( 'div' );
        this.#htmlComponent.classList.add( 'card-header', 'container' );
        this.#htmlComponent.appendChild( glass );
    }

    /**
     * Retorna una cadena de números sin el punto decimal.
     * @param {string} number Cadena de números con punto decimal.
     * @returns {string} La cadena de números sin punto decimal.
     */
    #removeDecimalPoint( number ) {
        return number.replace( this.#DECIMAL_POINT, '' );
    }

    /**
     * Establece un nuevo valor en la pantalla usando un efecto de parpadeao.
     * @param {string} [value] Valor nuevo de la pantalla.
     * @returns {void}
     */
    #setValueWithAnimation( value = '' ) {
        if ( value === '' ) {
            value = this.#screen.value;
        }
        this.#screen.value = '';
        setTimeout( () => this.#screen.value = value, 100 );
    }

    /**
     * Escribe un dígito en la pantalla.
     * @param {string} digit Dígito a escribir.
     * @returns {void}
     */
    writeDigit( digit ) {
        let value = this.#screen.value;
        if ( this.#ZERO === value ) {
            value = `${digit}.`;
        } else if ( ( digit === '+/-' ) && ( this.#ZERO !== value ) ) {
            ( value.includes( '-' ) )
                ? value = value.replace( '-', '' )
                : value = '-' + value;
        } else if ( this.#DECIMAL_POINT === digit ) {
            this.#isDecimal = true;
        } else if ( this.#isDecimal ) {
            value += digit;
        } else {
            value = this.#removeDecimalPoint( value );
            value += `${digit}.`;
        }
        this.#setValueWithAnimation( value );
    }

    /**
     * Borra un dígito de la pantalla.
     * @returns {void}
     */
    deleteDigit() {
        let value = this.#screen.value;
        if ( ( value.length === 2 ) && ( this.#ZERO !== value ) ) {
            value = this.#ZERO;
        } else if ( ( value.length === 3 ) && value.includes( '-' ) ) {
            value = this.#ZERO;
        } else if ( this.#isDecimal ) {
            value = value.substring( 0, value.length - 1 );
        } else if ( this.#isDecimal && value.endsWith( '.' ) ) {
            this.#isDecimal = false;
        } else {
            value = this.#removeDecimalPoint( value );
            value = value.substring( 0, value.length - 1 ) + '.';
        }
        this.#setValueWithAnimation( value );
    }

    /**
     * Establece la pantalla en cero.
     * @returns {void}
     */
    zero() {
        this.#setValueWithAnimation( this.#ZERO );
    }

    /**
     * Produce un efecto de parpadeo en la pantalla.
     * @returns {void}
     */
    blink() {
        this.#setValueWithAnimation();
    }
}
