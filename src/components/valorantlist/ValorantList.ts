import getCharactersFromValorantApi from "../../services/ValorantService";

class ValorantList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"})
    }

    async connectedCallback() {
        if (this.shadowRoot) {
            const respuestaDeMiApi = await getCharactersFromValorantApi();
            console.log(respuestaDeMiApi)
            this.shadowRoot.innerHTML = `
                <h2>Funciona o que?</h2>
                <div>
                     ${respuestaDeMiApi.agents.map(()=>{
                        //aqui saco la informacion de agents del API de valorant
                                                
                     })}
                </div>
            `
        }
    }
}

export default ValorantList