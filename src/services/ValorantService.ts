function getCharactersFromValorantApi() {
    //Para obetner la info del API osea Get
    return fetch('https://valorant-api.com/v1/agents')
         .then((res) =>{
            return res.json()
         })
         .catch((error) =>{
            console.error('Estoy mas perdido buscando el error xd', error)

         })

}

export default getCharactersFromValorantApi

//se realizaron cambios asi que si algo te retrocedes