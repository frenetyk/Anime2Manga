const searchInput = document.getElementById('search-input');
const animeListContainer = document.getElementById('anime-list');

// Function to display the anime list
function displayAnime(animeArray) {
    animeListContainer.innerHTML = '';
    animeArray.forEach(anime => {
        const item = document.createElement('div');
        item.classList.add('anime-item');

        const title = document.createElement('h2');
        title.classList.add('anime-title');
        title.textContent = anime.titulo;

        const details = document.createElement('div');
        details.classList.add('anime-details');
        details.innerHTML = `
            <p><strong>Fecha de Emisión:</strong> ${anime.fechaemision}</p>
            <p><strong>Episodios:</strong> ${anime.desde} - ${anime.hasta}</p>
            <p><strong>Comentario:</strong> ${anime.comentario}</p>
        `;

        // Add click event to the title
        title.addEventListener('click', () => {
            details.classList.toggle('visible');
        });

        item.appendChild(title);
        item.appendChild(details);
        animeListContainer.appendChild(item);
    });
}

// Fetch the data from the JSON file
fetch('AnimeDatos.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Display all anime initially
        displayAnime(data);

        // Add event listener for the search bar
        searchInput.addEventListener('input', (event) => {
            const searchTerm = event.target.value.toLowerCase();
            const filteredAnime = data.filter(anime => 
                anime.titulo.toLowerCase().includes(searchTerm)
            );
            displayAnime(filteredAnime);
        });
    })
    .catch(error => {
        console.error('There was a problem fetching the data:', error);
        animeListContainer.innerHTML = `<p>Error al cargar los datos. Por favor, asegúrate de que el archivo AnimeDatos.json está en la misma carpeta.</p>`;
    });