//!Aquí definimos una clase llamada Header que extiende de HTMLElement, lo que significa
//!que estamos creando un nuevo componente personalizado que será un elemento HTML.

class Header extends HTMLElement {
    //!El constructor se llama cuando se crea una nueva instancia del Header
    constructor() {
        super(); //&Llamamos al constructor de HTMLElement para asegurarnos de que se inicialice correctamente
        this.attachShadow({ mode: "open" }); //&  Esto crea un Shadow DOM para este componente, lo que significa que el estilo y el HTML estarán encapsulados.
    }
//* Este método se ejecuta cuando el componente se conecta al DOM
    connectedCallback() {
        //* Si el Shadow DOM existe, podemos proceder a manipularlo.
        if (this.shadowRoot) {
            //* Aquí definimos el contenido HTML y los estilos del componente.
            this.shadowRoot.innerHTML = `
                <style>
                    header {
                        background-color: #0f1923;
                        color: #fff;
                        padding: 1rem 2rem;
                        font-family: 'Valorant', sans-serif;
                        font-size: 24px;
                        border-bottom: 2px solid #fa4454;
                        text-transform: uppercase;
                        letter-spacing: 2px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }

                    .search-box {
                        background-color: #1f1f1f;
                        border: 2px solid #fa4454;
                        border-radius: 8px;
                        padding: 0.5rem 1rem;
                        font-size: 16px;
                        color: #fff;
                        font-family: inherit;
                        width: 200px;
                        transition: all 0.2s ease-in-out;
                    }

                    .search-box:focus {
                        outline: none;
                        box-shadow: 0 0 8px #fa4454;
                    }

                    .logo {
                    width:4%
                    }
                </style>

                <header>
                    Laboratorio 3 XD
                    <img class="logo" src="https://upload.wikimedia.org/wikipedia/commons/f/fc/Valorant_logo_-_pink_color_version.svg" alt="Logo" />
                    <input type="text" class="search-box" placeholder="Buscar agente..." />
                </header>
            `;
//! Aquí seleccionamos el campo de búsqueda dentro del Shadow DOM
            const input = this.shadowRoot.querySelector('.search-box') as HTMLInputElement;

            //*, Añadimos un event listener para escuchar los cambios en el campo de búsqueda
            input.addEventListener('input', () => {
                 //? Cada vez que el usuario escribe algo, emitimos un evento personalizado 'search-agent'
                //? Este evento contiene el texto ingresado por el usuario, en minúsculas.
                //? El evento burbujea y se compone para permitir que se maneje fuera del componente.
                this.dispatchEvent(new CustomEvent('search-agent', {
                    detail: input.value.toLowerCase(),
                    bubbles: true, //*Permite que el evento burbujee
                    composed: true //* El evento puede atravesar límites de Shadow DOM
                }));
            });
        }
    }
}

//* Exportamos la clase Header para poder usarla en otras partes del proyecto
export default Header;

