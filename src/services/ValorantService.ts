//* Esta interfaz representa una habilidad de un agente (como su granada, muro, humo, etc.)
export interface Ability {
   slot: string;            //? El tipo de habilidad (por ejemplo: "Ability1", "Ability2", "Ultimate")
   displayName: string;     //? El nombre visible de la habilidad (por ejemplo: "Cortina Tóxica")
   description: string;     //? Una descripción de lo que hace esa habilidad
   displayIcon: string;     //? La URL del icono que representa la habilidad
}

//* Esta interfaz describe el rol que tiene un agente (Duelista, Centinela, etc.)
export interface Role {
   uuid: string;            //? Identificador único del rol
   displayName: string;     // ?Nombre del rol (por ejemplo: "Duelista")
   description: string;     //? Qué significa ese rol, su función
   displayIcon: string;     // ?Icono que representa el rol
}

//* Esta interfaz representa todo lo que define a un agente de Valorant
export interface Agent {
   uuid: string;                 //? ID único del agente
   displayName: string;          //? Nombre visible (como "Jett", "Sova", etc.)
   description: string;          //? Descripción del personaje
   developerName: string;        //? Nombre usado internamente por los desarrolladores
   displayIcon: string;          //? Icono del agente, usualmente una imagen cuadrada pequeña
   fullPortrait: string;         //? Imagen grande del agente (usada en detalles o pop-ups)
   background: string;           //? Imagen de fondo que representa al agente
   role: Role;                   //? El rol al que pertenece este agente (usa la interfaz de arriba)
   abilities: Ability[];         //? Lista de habilidades que tiene el agente (usa la interfaz de arriba)
   isPlayableCharacter: boolean; //? Si este agente está disponible para jugar (algunos pueden ser NPCs o testers)
}

//! Esta función se conecta a la API pública de Valorant y obtiene todos los agentes disponibles
export async function getCharactersFromValorantApi(): Promise<Agent[]> {
   try {
     //* Hacemos la llamada a la API de agentes de Valorant
     const res = await fetch('https://valorant-api.com/v1/agents');
     const data = await res.json(); // Convertimos la respuesta a formato JSON

     //* Retornamos solo los agentes que sí se pueden jugar (ignoramos NPCs, testers, etc.)
     return data.data.filter((agent: Agent) => agent.isPlayableCharacter);
   } catch (error) {
     //& Si algo falla (no hay internet, la API no responde, etc.), lo mostramos en consola
     console.error('Error al obtener los agentes:', error);

     //& Retornamos una lista vacía para evitar que se caiga la app
     return [];
   }
}
