import { Agent } from "../../services/ValorantService";
import  {ValorantDetail} from "../valorantlist/ValorantDetail";
import "../valorantlist/ValorantList";

class Root extends HTMLElement {
    detailComponent: ValorantDetail | null = null;

    constructor() {
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        if (!this.shadowRoot) return;

        this.shadowRoot.innerHTML = `
            <valorant-list></valorant-list>
            <valorant-detail></valorant-detail>
        `;

        this.detailComponent = this.shadowRoot.querySelector('valorant-detail');

        this.shadowRoot.querySelector('valorant-list')?.addEventListener('agent-selected', (e: Event) => {
            const customEvent = e as CustomEvent<Agent>;
            if (this.detailComponent) {
                this.detailComponent.data = customEvent.detail;
            }
        });
    }
}

export default Root;
