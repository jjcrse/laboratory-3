export interface Ability {
   slot: string;
   displayName: string;
   description: string;
   displayIcon: string;
 }
 
 export interface Role {
   uuid: string;
   displayName: string;
   description: string;
   displayIcon: string;
 }
 
 export interface Agent {
   uuid: string;
   displayName: string;
   description: string;
   developerName: string;
   displayIcon: string;
   fullPortrait: string;
   background: string;
   role: Role;
   abilities: Ability[];
   isPlayableCharacter: boolean;
 }
 
 export async function getCharactersFromValorantApi(): Promise<Agent[]> {
   try {
     const res = await fetch('https://valorant-api.com/v1/agents');
     const data = await res.json();
     return data.data.filter((agent: Agent) => agent.isPlayableCharacter);
   } catch (error) {
     console.error('Error al obtener los agentes:', error);
     return [];
   }
 }
 