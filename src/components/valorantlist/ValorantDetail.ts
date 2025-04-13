import { Agent } from "../../services/ValorantService";

export class ValorantDetail extends HTMLElement {
    agent: Agent | null = null;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    set data(agent: Agent) {
        this.agent = agent;
        this.render();
    }

    render() {
        if (!this.shadowRoot || !this.agent) return;

        const { displayName, description, fullPortrait, role, abilities } = this.agent;
        

        this.shadowRoot.innerHTML = `
        <style>
          .overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0, 0, 0, 0.6);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
          }
          .agent-detail {
            background: #fff;
            padding: 20px;
            border-radius: 10px;
            max-width: 500px;
            box-shadow: 0 0 10px rgba(0,0,0,0.3);
            position: relative;
          }
          .close-btn {
            position: absolute;
            top: 10px;
            right: 15px;
            cursor: pointer;
            font-size: 20px;
          }
          img {
            max-width: 200px;
          }
        </style>
        <div class="overlay">
          <div class="agent-detail">
            <span class="close-btn">&times;</span>
            <h2>${displayName}</h2>
            <img src="${fullPortrait}" alt="${displayName}" />
            <p>${description}</p>
            <h3>Rol: ${role.displayName}</h3>
            <img src="${role.displayIcon}" width="30" />
            <h4>Habilidades:</h4>
            <ul>
              ${abilities.map(ability => `
                <li>
                  <strong>${ability.displayName}</strong>: ${ability.description}
                  <img src="${ability.displayIcon}" width="25"/>
                </li>
              `).join('')}
            </ul>
          </div>
        </div>
      `;

      this.shadowRoot.querySelector('.close-btn')?.addEventListener('click', () => {
        this.shadowRoot!.innerHTML = ""; //* Oculta el detalle
      });
      
      
    }
}


