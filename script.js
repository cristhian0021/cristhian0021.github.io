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
        { id: 'japan', name: 'Japan', coords: [35.6895, 139.6917], description: 'En Japón, la cena de Navidad se sirve de KFC.' },
        { id: 'germany', name: 'Germany: Krampus, the Christmas Villain', coords: [51.1657, 10.4515], description: 'In Germany, Christmas has a dark side with Krampus, a folklore figure who punishes naughty children. On December 5, many cities hold parades where adults dress up in terrifying masks to represent this demon. While spooky, this tradition adds a unique element to the holiday season.' },
        { id: 'mexico', name: ' Mexico: Las Posadas and the Christmas Piñata', coords: [23.6345, -102.5528], description: 'In Mexico, Las Posadas are a Christmas tradition that reenacts the journey of Mary and Joseph searching for a place to rest before Jesus’s birth. These celebrations begin on December 16 and continue until Christmas Eve. Families and communities join processions with songs, prayers, and the breaking of a piñata shaped like a star, symbolizing faith and hope. The celebration ends with a festive dinner featuring tamales, ponche, and other traditional dishes.' },
        { id: 'canada', name: 'Canada: The Cavalcade of Lights in Toronto', coords: [56.1304, -106.3468], description: 'In Toronto, Canada, the Christmas season begins with the spectacular "Cavalcade of Lights." This event lights up the city with over 525,000 LED lights, live music, a sparkling ice-skating rink, and a giant Christmas tree. It is a magical event that attracts both locals and tourists.' },
        { id: 'Philippines', name: 'Philippines: The Longest Christmas Season in the World', coords: [12.8797, 121.7740], description: 'In the Philippines, the Christmas season starts in September and officially ends on January 6, making it the longest Christmas celebration in the world. This tradition reflects the family-centered values of Filipino society. Many families have members working in other provinces or abroad, so this extended period allows them to plan their return home. During these months, streets and homes are filled with lights, carols, and decorations that showcase an unparalleled festive spirit.' },
        { id: 'australia', name: 'Australia and New Zealand: Christmas at the Beach', coords: [-25.2744, 133.7751], description: 'In the Southern Hemisphere, Christmas arrives in the middle of summer. In Australia, families enjoy barbecues and days at the beach, while in New Zealand, they celebrate with family gatherings in gardens or by the sea. Despite the warm weather, cities and streets are decorated with Christmas trees and lights, maintaining the festive spirit.' },
        { id: 'ireland', name: 'Ireland: A Toast for Santa Claus', coords: [53.4129, -8.2439], description: 'In Ireland, Santa Claus gets a different kind of treat: instead of milk and cookies, families leave him a traditional pudding made with Guinness beer or Irish whiskey. This gesture adds a unique and humorous touch to the Christmas festivities.' },
        { id: 'colombia', name: 'Colombia: The Day of the Little Candles', coords: [4.5709, -74.2973], description: 'In Colombia, December 7 marks the start of the Christmas season with the "Day of the Little Candles." Families place candles and lanterns on streets and windows, creating a unique display of light. This tradition honors the Virgin Mary and the Immaculate Conception, and while it has religious origins, it is now a cultural event that brings communities together around light and hope.' },
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
