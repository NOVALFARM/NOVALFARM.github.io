// Tiempo en milisegundos entre repeticiones (puedes cambiarlo)
const INTERVALO_REPETICION = 6000;

function reiniciarAnimaciones() {
    const elementos = document.querySelectorAll('.texto-lanzamiento, .gato, .telefono, .cohete');

    elementos.forEach(el => {
        el.style.animation = 'none';
        el.offsetHeight; // Forzar reflow
        if (el.classList.contains('texto-lanzamiento')) {
            el.style.animation = 'fadeIn 2s ease-in forwards';
        } else if (el.classList.contains('gato')) {
            el.style.animation = 'entrada-gato 1.5s ease-out forwards';
        } else if (el.classList.contains('telefono')) {
            el.style.animation = 'entrada-telefono 2s ease-out forwards';
        } else if (el.classList.contains('cohete')) {
            el.style.animation = 'despegar 3s ease-in forwards';
        }
    });
}

// Iniciar animación cíclica
setInterval(reiniciarAnimaciones, INTERVALO_REPETICION);