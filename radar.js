// Tu clave API de OpenWeatherMap
const apiKey = 'ba3ab0b5af3579534f0f1cd19b88b1a4';

// Inicializa el mapa centrado en una ubicación específica (coordenadas, en este caso España)
const map = L.map('map').setView([40, -3], 5);

// Cargar mapa base de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Crear una capa de radar usando OpenWeatherMap (capa de nubes)
let radarLayer = L.tileLayer(`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${apiKey}`, {
    attribution: '© OpenWeatherMap'
}).addTo(map);

// Agregar otras capas opcionales como precipitación, viento, etc.
let precipitationLayer = L.tileLayer(`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${apiKey}`, {
    attribution: '© OpenWeatherMap'
});



// Alternar entre capas (opcional)
L.control.layers({
    "Nubes": radarLayer,
    "Precipitación": precipitationLayer
    
}).addTo(map);



// Intervalo para actualizar el radar cada 10 minutos (tiempo real)
setInterval(() => {
    updateRadar();
}, 8000000); // 600000 milisegundos = 10 minutos

// Función para actualizar el radar en tiempo real
function updateRadar() {
    // Quitar la capa existente
    map.removeLayer(radarLayer);

    // Volver a agregar la capa de radar actualizada
    radarLayer = L.tileLayer(`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${apiKey}`, {
        attribution: '© OpenWeatherMap'
    }).addTo(map);
}

// Función para animar la capa con intervalos más cortos
function animateRadar(interval = 5000) {
    setInterval(() => {
        // Quitar la capa de radar actual y cargar una nueva
        map.removeLayer(radarLayer);

        // Cambiar entre diferentes capas (puedes cambiar a precipitación o cualquier otro tipo de datos)
        radarLayer = L.tileLayer(`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${apiKey}`, {
            attribution: '© OpenWeatherMap'
        }).addTo(map);
    }, interval);  // Actualizar cada 5 segundos para animación suave
}

// Iniciar la animación del radar en tiempo real
animateRadar();