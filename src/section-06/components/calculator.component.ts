/**
 * Copyright (c) 2023 Eazicom Servicios Profesionales
 * Derechos intelecutales reservados.
 */

/**
 *
 */
export default abstract class Calculator {

    /**
     * Contiene todos los elementos HTML que conforman la calculadora.
     * @type {HTMLDivElement}
     */
    protected _calculator: HTMLDivElement;

    protected _keys: Array<string>;

    /**
     * Crea una nueva instancia de la clase {@link Calculator}.,
     */
    constructor() {
        this._calculator = document.createElement( 'div' );
        this._calculator.classList.add( 'card' );
        this._keys = [];
    }

    protected abstract build(): void;

    protected abstract buildScreen(): HTMLDivElement;

    protected abstract buildScreen(): HTMLDivElement;


    protected buildKey( symbol: string ): HTMLDivElement {

        let key: HTMLButtonElement = document.createElement( 'button' );
        key.type = 'button';
        key.innerText = symbol;
        key.classList.add( 'fw-semibold btn' );

        // Si es un número...
        if ( !isNaN( <any>symbol ) || symbol == '+/-' || symbol == '.' )
            this.keyAsDigit( key );
        else
            this.keyAsOperator( key );

        let container = document.createElement( 'div' );
        container.classList.add( 'col-3', 'd-grid' );
        container.append( key );

        return container;
    }

    /**
     * Configura una tecla de la calculadora como dígito.
     * @param {Key} key Tecla de la calculadora.
     * @returns {void}
     */
    protected keyAsDigit( key: HTMLButtonElement ): void {
        key.classList.add( 'btn-primary' );
        key.addEventListener( 'click', e => writeDigit( $( e.target ).text() ) );
    }

    /**
     * Configura una tecla de la calculadora como comando.
     * @param {Key} key Tecla de la calculador.
     * @returns {void}
     */
    protected keyAsOperator( key: HTMLButtonElement ): void {
        let className: string = 'btn-'
        if ( '=' == key.innerText )
            className += 'danger';
        else
            className += 'success';
        key.classList.add( className );
        key.addEventListener( 'click', e => resolveOperator( $( e.target ).text() ) );
    }

    /**
     *
     * @param container
     */
    public appendTo( container: string ): void {
        document.querySelector<HTMLDivElement>( container )
            ?.append( this._calculator );
    }
}