document.addEventListener('DOMContentLoaded', () => {
    const map = L.map('map').setView([20, 0], 2);

    // Cambiar la capa base del mapa por una más colorida
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors, Tiles courtesy of HOT',
    }).addTo(map);

    // Agregar marcadores personalizados con íconos navideños
    const santaIcon = L.icon({
        iconUrl: 'images/santa-hat.png', // Reemplaza con un ícono de gorro de Papá Noel
        iconSize: [50, 50], // Tamaño del ícono
        iconAnchor: [25, 50], // Punto de anclaje (la base del ícono)
    });

    const countries = [
        { id: 'japan', name: 'Japón', coords: [35.6895, 139.6917], description: 'Como lo lees. En Japón, el principal protagonista de la Navidad es el restaurante de pollo frito KFC. Aunque pueda parecerte una locura, la realidad es que nuestra tradición de cenar un gran banquete por Navidad está muy ligado a la religión cristiana, simbolizando la celebración del nacimiento de Jesucristo. Por lo tanto, no debe sorprendernos que un país en el que solamente el 1% de la población es católica, no siga esta costumbre.' },
        { id: 'germany', name: 'Alemania', coords: [51.1657, 10.4515], description: 'Krampus castiga a los niños traviesos.' },
        { id: 'mexico', name: 'México', coords: [23.6345, -102.5528], description: 'Las Posadas representan el peregrinaje de María y José.' },
        { id: 'canada', name: 'Canadá', coords: [56.1304, -106.3468], description: 'Los desfiles de luces iluminan la Navidad.' },
        { id: 'philippines', name: 'Filipinas', coords: [12.8797, 121.7740], description: 'En Filipinas, la Navidad dura cinco meses.' },
        { id: 'australia', name: 'Australia', coords: [-25.2744, 133.7751], description: 'Se celebra la Navidad en la playa.' },
        { id: 'ireland', name: 'Irlanda', coords: [53.4129, -8.2439], description: 'Papá Noel recibe pudding con Guinness.' },
        { id: 'colombia', name: 'Colombia', coords: [4.5709, -74.2973], description: 'El Día de las Velitas ilumina los hogares.' },
    ];

    function moveSantaAndShowModal(coords, name, description) {
        const santaCoords = map.latLngToLayerPoint(coords);
        santa.style.transform = `translate(${santaCoords.x - 30}px, ${santaCoords.y - 30}px) rotate(720deg)`;

        setTimeout(() => {
            document.getElementById('modal-title').textContent = name;
            document.getElementById('modal-description').textContent = description;
            document.getElementById('description-modal').style.display = 'flex';
        }, 4000);
    }

    countries.forEach((country) => {
        L.marker(country.coords, { icon: santaIcon })
            .addTo(map)
            .on('click', () => {
                moveSantaAndShowModal(country.coords, country.name, country.description);
            });
    });

    document.querySelector('.close').addEventListener('click', () => {
        document.getElementById('description-modal').style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === document.getElementById('description-modal')) {
            document.getElementById('description-modal').style.display = 'none';
        }
    });
});
