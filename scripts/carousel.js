let currentIndex = 0;
let intervalId;
const intervalTime = 3000; // Time in milliseconds (3 seconds)

function startAutoplay() {
    intervalId = setInterval(() => moveSlide(1), intervalTime);
}

function stopAutoplay() {
    clearInterval(intervalId);
}

function moveSlide(step) {
    const slides = document.querySelectorAll('.carousel-images .carousel-slides');
    const totalSlides = slides.length;

    currentIndex = (currentIndex + step + totalSlides) % totalSlides;

    const offset = -currentIndex * 100;
    document.querySelector('.carousel-images').style.transform = `translateX(${offset}%)`;
}

startAutoplay()