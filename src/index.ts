import Header from "./components/header/Header";
import Root from "./components/root/Root";
import ValorantList from "./components/valorantlist/ValorantList";
import { ValorantDetail } from "./components/valorantlist/ValorantDetail";

//& Pues aqui exportamos todo y lo y lo definimos pa poder ponerlo en el root y asi poner solo el root en el html

customElements.define('header-component', Header);
customElements.define('root-component', Root);
customElements.define('valorant-list', ValorantList);
customElements.define('valorant-detail', ValorantDetail);
