class Root extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"})
    }
    connectedCallback() {
        if (this.shadowRoot){
            this.shadowRoot.innerHTML=`
                <h1>Mi componente Root</h1>
                <div>
                     <valorant-list></valorant-list>
                </div>
                <p> Si funciona</p>
            `
        }
        }
}

customElements.define("root-component", Root)

export default Root;