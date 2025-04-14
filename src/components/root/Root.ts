//? Importamos el tipo Agent para usarlo cuando se selecciona un agente
import { Agent } from "../../services/ValorantService";

//? Importamos el componente que muestra el detalle del agente (el pop-up)
import { ValorantDetail } from "../valorantlist/ValorantDetail";

//? Importamos el componente de la lista de agentes (tarjetas)
import "../valorantlist/ValorantList";

//? Importamos el componente del header con la barra de búsqueda
import "../header/Header";

//* Creamos el componente raíz que va a juntar todo: header, lista y detalle
class Root extends HTMLElement {
    //* Aquí guardamos referencias al componente de detalle y lista
    detailComponent: ValorantDetail | null = null;
    listComponent: HTMLElement | null = null;

    constructor() {
        super();
        //* Le decimos que vamos a usar Shadow DOM para encapsular los estilos
        this.attachShadow({ mode: "open" });
    }

    //! Este método se ejecuta cuando el componente se agrega al DOM
    connectedCallback() {
        if (!this.shadowRoot) return;

        //! Renderizamos los tres componentes principales dentro del shadowRoot pa poner solo 1 en el html
        this.shadowRoot.innerHTML = `
            <header-component></header-component>
            <valorant-list></valorant-list>
            <valorant-detail></valorant-detail>
        `;

        //? Guardamos una referencia al componente de detalle para usarlo más adelante
        this.detailComponent = this.shadowRoot.querySelector('valorant-detail');

        //? También guardamos referencia a la lista para poder enviarle eventos
        this.listComponent = this.shadowRoot.querySelector('valorant-list');

        //? Escuchamos cuando alguien selecciona un agente en la lista
        this.shadowRoot.querySelector('valorant-list')?.addEventListener('agent-selected', (e: Event) => {
            const customEvent = e as CustomEvent<Agent>;

            //* Cuando eso pasa, le pasamos la info al componente de detalle
            if (this.detailComponent) {
                this.detailComponent.data = customEvent.detail;
            }
        });

        //* También escuchamos cuando se escribe algo en la barra de búsqueda
        this.shadowRoot.querySelector('header-component')?.addEventListener('search-agent', (e: Event) => {
            const searchEvent = e as CustomEvent<string>;

            //* Y reenviamos ese valor a la lista para que filtre los agentes
            if (this.listComponent) {
                this.listComponent.dispatchEvent(new CustomEvent('filter-agents', {
                    detail: searchEvent.detail, //? El texto que se escribió
                    bubbles: true,              //? Burbujear para que llegue a quien lo escuche
                    composed: true              //? Permite que pase fuera del shadow DOM
                }));
            }
        });
    }
}

// Exportamos este componente para que pueda usarse en otros archivos
export default Root;
