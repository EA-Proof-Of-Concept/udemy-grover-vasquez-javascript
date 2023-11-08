/**
 * Copyright (c) 2023 Eazicom Servicios Profesionales
 * Derechos intelecutales reservados.
 */

import Calculator from "./calculator.component";

/**
 * Representa una calculadora con operaciones básicas para el usuario.
 * @since v1.0
 */
export default class BasicCalculator extends Calculator {
    /**
     * Crea una nueva instancia de la clase {@link BasicCalculator}.
     */
    constructor() {
        super();
        this._keys = ['CE', 'DEL', '%', '/', '7', '8', '9', 'x', '4', '5', '6', '-', '1', '2', '3', '+', '+/-', '0', '.', '='];
        this.build();
    }

    /**
     * Construye el componente de la calculadora.
     */
    protected build(): void {

    }

    protected buildScreen(): HTMLDivElement {

        let display: HTMLInputElement = document.createElement( 'input' );
        display.id = 'display';
        display.readOnly = true;
        display.type = 'text';
        display.value = '0';
        display.classList.add( 'ea-result', 'form-control', 'fs-1', 'text-end' );
        display.addEventListener( 'focus', ( ev: FocusEvent ): void => {
            ( ev.target as HTMLInputElement ).blur()
        } );

        let glass: HTMLDivElement = document.createElement( 'div' );
        glass.classList.add( 'col' );
        glass.append( display );

        let container: HTMLDivElement = document.createElement( 'div' );
        container.classList.add( 'row', 'mt-2', 'mb-2' );
        container.append( glass );

        let screen: HTMLDivElement = document.createElement( 'div' );
        screen.classList.add( 'card-header', 'container' );
        screen.append( container );

        return screen;
    }

    /**
     *
     */
    protected buildKeyboard(): HTMLDivElement {

        const symbols = ['CE', 'DEL', '%', '/', '7', '8', '9', 'x', '4', '5', '6', '-', '1', '2', '3', '+', '+/-', '0', '.', '='];

        let keyboard: HTMLDivElement = document.createElement( 'div' );
        keyboard.classList.add( 'card-body' );

        let container: HTMLDivElement = document.createElement( 'div' );
        container.classList.add( 'row', 'mt-3' );

        let column = 0;

        symbols.forEach( ( symbol: string ) => {

            let key: HTMLDivElement = this.buildKey( symbol );
            container.append( key );
            column++;

            if ( column === 4 ) {
                keyboard.append( container );
                container = document.createElement( 'div' );
                container.classList.add( 'row', 'mt-3' );
                column = 0;
            }
        } );

        return keyboard;
    }
}