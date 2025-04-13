class Header extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        if (this.shadowRoot){
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
                    }
                </style>
                <header>
                    Valorant Agents
                </header>
            `;
        }
    }
}

export default Header;
