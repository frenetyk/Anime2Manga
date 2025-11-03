// anime-details.js (modificado)
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const animeId = urlParams.get('id');
    const animeDetailsContainer = document.getElementById('anime-details');
    const loadingMessage = document.getElementById('loading-message');
    const animeTitle = document.getElementById('anime-title');
    const backButton = document.getElementById('back-button');

    // Función para volver a la página principal
    backButton.addEventListener('click', function() {
        window.location.href = 'index.html';
    });

    // Cargar los datos del anime específico
    fetch('AnimeDatos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const anime = data.find(item => item.id === animeId);
            
            if (anime) {
                loadingMessage.style.display = 'none';
                animeTitle.textContent = `🎌 ${anime.titulo}`;
                
                let estudioInfo = anime.estudio ? `<p><strong>Estudio:</strong> ${anime.estudio}</p>` : '';
                let sinopsisInfo = anime.sinopsis ? `<p class="sinopsis-line"><strong>Sinopsis:</strong> ${anime.sinopsis}</p>` : '';
                
                animeDetailsContainer.innerHTML = `
                    <div class="anime-full-details">
                        <div class="anime-header">
                            ${anime.imagen ? `<img src="${anime.imagen}" alt="${anime.titulo}" class="anime-full-cover">` : ''}
                            <div class="anime-basic-info">
                                <p><strong>Fecha de Emisión:</strong> ${anime.fechaemision}</p>
                                <p><strong>Episodios:</strong> ${anime.episodios}</p>
                                ${estudioInfo}
                                ${sinopsisInfo}
                                <p><strong>Capítulos adaptados:</strong> ${anime.desde} - ${anime.hasta}</p>
                            </div>
                        </div>
                        <div class="anime-manga-info">
                            
                            <div class="continuation-box">
                                <h4>Continuación</h4>
                                <p>${anime.comentario}</p>
                            </div>
                        </div>
                    </div>
                `;
            } else {
                loadingMessage.textContent = 'Anime no encontrado.';
                loadingMessage.style.color = 'red';
            }
        })
        .catch(error => {
            console.error('There was a problem fetching the data:', error);
            loadingMessage.textContent = 'Error al cargar los datos.';
            loadingMessage.style.color = 'red';
        });
});