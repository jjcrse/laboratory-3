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
            background: rgba(0, 0, 0, 0.85);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            font-family: 'Valorant', sans-serif;
          }
          .agent-detail {
            background: #1f1f1f;
            color: #fff;
            padding: 25px;
            border-radius: 12px;
            max-width: 600px;
            box-shadow: 0 0 20px #fa4454;
            position: relative;
            text-align: center;
          }
          .close-btn {
            position: absolute;
            top: 10px;
            right: 15px;
            cursor: pointer;
            font-size: 24px;
            color: #fa4454;
            font-weight: bold;
          }
          h2, h3, h4 {
            color: #fa4454;
          }
          ul {
            list-style: none;
            padding: 0;
          }
          li {
            margin-bottom: 10px;
            text-align: left;
          }
          img {
            max-width: 200px;
            border-radius: 10px;
            margin: 10px auto;
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
        this.shadowRoot!.innerHTML = ""; // Cierra el pop-up
      });
    }
}
