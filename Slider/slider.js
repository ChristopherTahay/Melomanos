/* =====================================================================
   SLIDER - Logica del carrusel de la pagina principal
   ---------------------------------------------------------------------
   Este archivo controla el movimiento del slider:
   - Cambia de slide con las flechas
   - Cambia de slide al hacer click en los puntos
   - Cambia de slide automaticamente cada 5 segundos
   No usa ninguna libreria externa, es JavaScript puro.
   ===================================================================== */

// Esperamos a que toda la pagina cargue antes de ejecutar el codigo
document.addEventListener("DOMContentLoaded", function () {

    // Tomamos los elementos del HTML que vamos a usar
    const pista   = document.querySelector(".slider-pista");
    const slides  = document.querySelectorAll(".slide");
    const puntos  = document.querySelectorAll(".punto");
    const flechaIzq = document.querySelector(".flecha-izq");
    const flechaDer = document.querySelector(".flecha-der");

    let indiceActual = 0;                  // En que slide estamos (empieza en 0)
    const totalSlides = slides.length;     // Cuantas slides hay en total

    // Funcion que mueve la pista para mostrar el slide indicado
    function mostrarSlide(indice) {
        // Si nos pasamos del final, volvemos al inicio (y viceversa)
        if (indice >= totalSlides) indice = 0;
        if (indice < 0) indice = totalSlides - 1;

        indiceActual = indice;

        // Movemos la pista hacia la izquierda usando translateX
        // Cada slide mide 100%, asi que el slide 2 esta a -200%, etc.
        pista.style.transform = "translateX(-" + (indice * 100) + "%)";

        // Actualizamos cual punto se ve "activo"
        puntos.forEach(function (punto, i) {
            punto.classList.remove("activo");
            if (i === indice) {
                punto.classList.add("activo");
            }
        });
    }

    // Botones de flecha
    flechaDer.addEventListener("click", function () {
        mostrarSlide(indiceActual + 1);
        reiniciarAuto();
    });

    flechaIzq.addEventListener("click", function () {
        mostrarSlide(indiceActual - 1);
        reiniciarAuto();
    });

    // Click en los puntos indicadores
    puntos.forEach(function (punto, i) {
        punto.addEventListener("click", function () {
            mostrarSlide(i);
            reiniciarAuto();
        });
    });

    // Cambio automatico cada 5 segundos
    let intervalo = setInterval(function () {
        mostrarSlide(indiceActual + 1);
    }, 5000);

    // Reinicia el contador automatico cuando el usuario interactua
    function reiniciarAuto() {
        clearInterval(intervalo);
        intervalo = setInterval(function () {
            mostrarSlide(indiceActual + 1);
        }, 5000);
    }

    // Mostramos el primer slide al cargar
    mostrarSlide(0);
});
