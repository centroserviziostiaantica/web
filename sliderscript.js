let sliderInterval;
let idleTimeout;

const sliderElement = document.querySelector('#container-slider');

// Función para ejecutar el slide
function fntExecuteSlide(direction) {
    // Aquí va el código para mover el slider en la dirección indicada
    console.log('Ejecutando slide en dirección:', direction);
}

// Función para iniciar el slider
function startSlider() {
    sliderInterval = setInterval(() => {
        fntExecuteSlide('next');
    }, 5000);
}

// Función para detener el slider
function stopSlider() {
    clearInterval(sliderInterval);
}

// Función para reiniciar el timeout de inactividad
function resetIdleTimeout() {
    clearTimeout(idleTimeout);
    idleTimeout = setTimeout(() => {
        startSlider();
    }, 10000); // 10 segundos de inactividad
}

// Iniciar el slider al cargar la página
if (sliderElement) {
    startSlider();

    // Pausar el slider cuando el usuario interactúa (mouse over)
    sliderElement.addEventListener('mouseover', () => {
        stopSlider(); // Pausar el slider
    });

    // Reiniciar el slider después de 10 segundos de inactividad
    sliderElement.addEventListener('mouseout', () => {
        resetIdleTimeout(); // Reiniciar el temporizador de inactividad
    });

    // Cuando el slider comienza a moverse, se resetea el tiempo de inactividad
    sliderElement.addEventListener('mousemove', () => {
        resetIdleTimeout(); // Reiniciar el temporizador si hay movimiento del ratón
    });
}

if (document.querySelector('.listslider')) {
    let link = document.querySelectorAll(".listslider li a");
    link.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            let item = this.getAttribute('itlist');
            let arrItem = item.split("_");
            fntExecuteSlide(arrItem[1]);
            return false;
        });
    });
}

function fntExecuteSlide(side) {
    let parentTarget = document.getElementById('slider');
    let elements = parentTarget.getElementsByTagName('li');
    let curElement, nextElement;

    for (var i = 0; i < elements.length; i++) {

        if (elements[i].style.opacity == 1) {
            curElement = i;
            break;
        }
    }
    if (side == 'prev' || side == 'next') {

        if (side == "prev") {
            nextElement = (curElement == 0) ? elements.length - 1 : curElement - 1;
        } else {
            nextElement = (curElement == elements.length - 1) ? 0 : curElement + 1;
        }
    } else {
        nextElement = side;
        side = (curElement > nextElement) ? 'prev' : 'next';

    }
    //RESALTA LOS PUNTOS
    let elementSel = document.getElementsByClassName("listslider")[0].getElementsByTagName("a");
    elementSel[curElement].classList.remove("item-select-slid");
    elementSel[nextElement].classList.add("item-select-slid");
    elements[curElement].style.opacity = 0;
    elements[curElement].style.zIndex = 0;
    elements[nextElement].style.opacity = 1;
    elements[nextElement].style.zIndex = 1;
}