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
