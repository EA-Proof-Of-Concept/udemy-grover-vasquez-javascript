'use strict';

/**
 * Udemy: Introducción a la Programación con Javascript.
 * @copyright 2025 Eazicom Servicios Profesionales.
 * Todos los derechos reservados.
 */

export default class Key {

    /**
     * Contiene el componente con los elementos HTML que conforman un botón de
     * la calculadora.
     * @type {HTMLButtonElement}
     */
    #htmlComponent;

    get isDigit() {
        const symbol = this.#htmlComponent.innerText;
        return !isNaN(symbol) || symbol === ".";
    }

    /**
     * 
     * @param {Screen} screen 
     */
    constructor( symbol ) {
        this.#onInit( symbol );
    }

    /**
     * Inicializa el componente de una tecla.
     * @param {string} symbol 
     * @returns {void}
     */
    #onInit( symbol ) {
        this.#htmlComponent = document.createElement( 'button' );
    }
}
