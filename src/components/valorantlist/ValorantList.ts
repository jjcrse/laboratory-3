import { getCharactersFromValorantApi, Agent } from "../../services/ValorantService";

//* Componente personalizado que representa la lista de agentes de Valorant
class ValorantList extends HTMLElement {
    //* Arreglo para almacenar todos los agentes recuperados de la API
    private allAgents: Agent[] = [];

    constructor() {
        super();
        //! Habilita Shadow DOM para encapsular estilos y estructura
        this.attachShadow({mode: "open"});
    }

    //! Método que se ejecuta cuando el componente se agrega al DOM
    async connectedCallback() {
        if (!this.shadowRoot) return;

        //! Llama a la API para obtener todos los agentes y los guarda
        this.allAgents = await getCharactersFromValorantApi();

        //* Muestra todos los agentes en pantalla
        this.renderAgents(this.allAgents);

        //* Escucha el evento personalizado 'filter-agents' (desde Header)
        this.addEventListener('filter-agents', (e: Event) => {
            const customEvent = e as CustomEvent<string>;
            const searchTerm = customEvent.detail;

            //* Filtra agentes por el término de búsqueda (ignorando mayúsculas)
            const filtered = this.allAgents.filter(agent =>
                agent.displayName.toLowerCase().includes(searchTerm.toLowerCase())
            );

            //* Vuelve a renderizar la lista solo con los agentes filtrados
            this.renderAgents(filtered);
        });
    }

    //* Método para renderizar los agentes en la interfaz
    renderAgents(agents: Agent[]) {
        if (!this.shadowRoot) return;

        //* Genera el HTML de cada tarjeta de agente y aplica estilos
        this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            padding: 2rem;
            background: #0f1923;
            color: #fff;
            font-family: 'Valorant', sans-serif;
          }
          h2 {
            text-align: center;
            color: #fa4454;
            font-size: 32px;
            margin-bottom: 2rem;
          }
          .agents-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
          }
          .agent-card {
              cursor: pointer;
              background: #1f1f1f;
              border: 2px solid #fa4454;
              border-radius: 12px;
              padding: 1rem;
              width: 250px;
              text-align: center;
              transition: transform 0.2s;
          }
          .agent-card:hover {
              transform: scale(1.05);
              box-shadow: 0 0 12px #fa4454;
          }
          .agent-card img {
              width: 100px;
              height: 100px;
              object-fit: contain;
              border-radius: 8px;
              margin-bottom: 0.5rem;
          }
          h3 {
              color: red;
              margin: 0.5rem 0;
          }
          .abilities-list {
              list-style: none;
              padding: 0;
              margin: 0.5rem 0;
              font-size: 14px;
          }
          .abilities-list li {
              margin-bottom: 5px;
          }
        </style>
        <h2>Agentes de Valorant</h2>
        <div class="agents-container">
          ${agents.map(agent => {
            //? Filtra habilidades que tengan nombre
            const abilities = agent.abilities.filter(a => a.displayName);
            //*Busca la habilidad ultimate
            const ultimate = abilities.find(a => a.slot === "Ultimate");

            //? Genera la tarjeta HTML del agente
            return `
              <div class="agent-card" data-uuid="${agent.uuid}">
                <img src="${agent.displayIcon}" alt="${agent.displayName}" />
                <h3>${agent.displayName}</h3>
                <p><strong>Rol:</strong> ${agent.role.displayName}</p>
                <p><strong>Habilidades:</strong></p>
                <ul class="abilities-list">
                  ${abilities.map(ability => `<li>${ability.displayName}</li>`).join('')}
                </ul>
                <p><strong>Ultimate:</strong> ${ultimate ? ultimate.displayName : "N/A"}</p>
              </div>
            `;
          }).join('')}
        </div>
      `;

        //! Agrega evento a cada tarjeta para detectar clics en agentes
        this.shadowRoot.querySelectorAll('.agent-card').forEach(card => {
            card.addEventListener('click', (e) => {
                //! Obtiene el UUID del agente clicado
                const uuid = (e.currentTarget as HTMLElement).dataset.uuid;

                //* Encuentra al agente con ese UUID
                const selectedAgent = this.allAgents.find(agent => agent.uuid === uuid);

                //* Lanza un evento personalizado para que otro componente muestre sus detalles
                if (selectedAgent) {
                    this.dispatchEvent(new CustomEvent('agent-selected', {
                        detail: selectedAgent,
                        bubbles: true,
                        composed: true
                    }));
                }
            });
        });
    }
}

//! Exporta el componente para que se pueda usar en otros archivos
export default ValorantList;
