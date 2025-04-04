fetch('https://api.artic.edu/api/v1/artworks')
  .then(response => response.json()) 
  .then(data => {
    console.log(data); 
  })
  .catch(error => {
    console.error('Error al obtener los datos:', error);
  });
