import { getCharactersFromValorantApi, Agent } from "../../services/ValorantService";

class ValorantList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
    }

    async connectedCallback() {
        if (!this.shadowRoot) return;

        const agents: Agent[] = await getCharactersFromValorantApi();

        this.shadowRoot.innerHTML = `
        <style>
          .agent-card {
              cursor: pointer;
              margin: 10px;
              border: 1px solid #ccc;
              border-radius: 10px;
              padding: 10px;
              display: inline-block;
              text-align: center;
              width: 200px;
          }
          .agent-card img {
              width: 100px;
              height: 100px;
              object-fit: contain;
          }
          .abilities-list {
              list-style: none;
              padding: 0;
          }
        </style>
        <h2>Agentes de Valorant</h2>
        <div class="agents-container">
          ${agents.map(agent => {
            const abilities = agent.abilities.filter(a => a.displayName);
            const ultimate = abilities.find(a => a.slot === "Ultimate");
      
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
      

        this.shadowRoot.querySelectorAll('.agent-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const uuid = (e.currentTarget as HTMLElement).dataset.uuid;
                const selectedAgent = agents.find(agent => agent.uuid === uuid);
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

export default ValorantList;
