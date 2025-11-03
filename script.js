// script.js (modificado)
const searchInput = document.getElementById('search-input');
const animeListContainer = document.getElementById('anime-list');
const loadingMessage = document.getElementById('loading-message');
let animeData = [];

// Función para renderizar los animes en la página
function renderAnimeList(animeArray) {
    animeListContainer.innerHTML = '';
    
    if (animeArray.length === 0) {
        animeListContainer.innerHTML = '<p>No se encontraron animes con ese título.</p>';
        return;
    }

    animeArray.forEach(anime => {
        const item = document.createElement('div');
        item.classList.add('anime-item');

        const titleButton = document.createElement('button');
        titleButton.classList.add('anime-title-button');
        titleButton.setAttribute('aria-expanded', 'false');
        titleButton.setAttribute('aria-controls', `details-${anime.titulo.replace(/\s/g, '-')}`);

        const titleText = document.createElement('span');
        titleText.textContent = anime.titulo;

        const toggleIcon = document.createElement('span');
        toggleIcon.classList.add('toggle-icon');
        toggleIcon.textContent = '>';

        titleButton.appendChild(titleText);
        titleButton.appendChild(toggleIcon);

        const details = document.createElement('div');
        details.classList.add('anime-details');
        details.setAttribute('id', `details-${anime.titulo.replace(/\s/g, '-')}`);

        let estudioInfo = anime.estudio ? `<p><strong>Estudio:</strong> ${anime.estudio}</p>` : '';

        // 🔹 Añadir la imagen dentro de los detalles (si existe)
        let imagenHTML = '';
        if (anime.imagen) {
            imagenHTML = `
                <img src="${anime.imagen}" alt="${anime.titulo}" class="anime-cover">
            `;
        }

        details.innerHTML = `
    <div class="anime-details-content">
        ${imagenHTML}
        <p><strong>Fecha de Emisión:</strong> ${anime.fechaemision}</p>
        <p><strong>Comentario:</strong> ${anime.comentario}</p>
        <button class="view-details-btn" data-id="${anime.id}">Ver página completa</button>
    </div>
`;

        // Evento de clic para expandir/contraer
        titleButton.addEventListener('click', () => {
            const isExpanded = titleButton.getAttribute('aria-expanded') === 'true';
            titleButton.setAttribute('aria-expanded', String(!isExpanded));
            details.classList.toggle('visible');
            toggleIcon.classList.toggle('rotated');
        });

        item.appendChild(titleButton);
        item.appendChild(details);
        animeListContainer.appendChild(item);
    });

    // Agregar evento a los botones "Ver página completa"
    document.querySelectorAll('.view-details-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation(); // Evitar que se active el evento del título
            const animeId = button.getAttribute('data-id');
            window.location.href = `anime.html?id=${animeId}`;
        });
    });
}

// Cargar los datos desde el archivo JSON
fetch('AnimeDatos.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        animeData = data;
        loadingMessage.style.display = 'none'; // Hide loading message
        renderAnimeList(animeData);

        // Agrega el evento de escucha a la barra de búsqueda
        searchInput.addEventListener('input', (event) => {
            const searchTerm = event.target.value.toLowerCase();
            const filteredAnime = animeData.filter(anime =>
                anime.titulo.toLowerCase().includes(searchTerm)
            );
            renderAnimeList(filteredAnime);
        });
    })
    .catch(error => {
        console.error('There was a problem fetching the data:', error);
        loadingMessage.textContent = 'Error al cargar los datos. Por favor, asegúrate de que el archivo AnimeDatos.json está en la misma carpeta.';
        loadingMessage.style.color = 'red';
    });