import { Agent } from "../../services/ValorantService";

//*Creamos una clase llamada `ValorantDetail` que representa el pop-up de detalles del agente
export class ValorantDetail extends HTMLElement {
    //*Aquí vamos a guardar el agente que se va a mostrar
    agent: Agent | null = null;

    constructor() {
        super();
        //*Usamos Shadow DOM para encapsular estilos y evitar conflictos con el resto de la app
        this.attachShadow({ mode: "open" });
    }

    //*Este setter se ejecuta cuando otro componente nos pasa la información de un agente
    set data(agent: Agent) {
        this.agent = agent; //*Guardamos los datos del agente
        this.render();      //*Y llamamos a render() para mostrarlo en pantalla
    }

    //*Función que se encarga de generar el HTML del componente
    render() {
        //*Si por alguna razón no hay `shadowRoot` o no hay un agente cargado, salimos de la función
        if (!this.shadowRoot || !this.agent) return;

        //!Extraemos solo los datos que vamos a usar del agente
        const { displayName, description, fullPortrait, role, abilities } = this.agent;

        //!Aquí generamos todo el HTML del pop-up con estilos incluidos
        this.shadowRoot.innerHTML = `
        <style>
          /* Fondo oscuro que cubre toda la pantalla */
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

          /* Caja central con los detalles del agente */
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

          /* Botón para cerrar el pop-up */
          .close-btn {
            position: absolute;
            top: 10px;
            right: 15px;
            cursor: pointer;
            font-size: 24px;
            color: #fa4454;
            font-weight: bold;
          }

          /* Colores y estilos para los textos */
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

        <!-- Aquí empieza el contenido visual del detalle -->
        <div class="overlay">
          <div class="agent-detail">
            <span class="close-btn">&times;</span> <!-- Botón de cerrar -->
            <h2>${displayName}</h2> <!-- Nombre del agente -->
            <img src="${fullPortrait}" alt="${displayName}" /> <!-- Imagen grande -->
            <p>${description}</p> <!-- Descripción del personaje -->
            <h3>Rol: ${role.displayName}</h3> <!-- Nombre del rol -->
            <img src="${role.displayIcon}" width="30" /> <!-- Icono del rol -->
            
            <!-- Sección de habilidades -->
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

      //*Agregamos funcionalidad al botón de cerrar: al hacer clic, se borra todo el contenido del componente
      this.shadowRoot.querySelector('.close-btn')?.addEventListener('click', () => {
        this.shadowRoot!.innerHTML = ""; //*Básicamente cierra el pop-up
      });
    }
}
