class Carousel extends HTMLElement {
    attrs = {
        images: [
            [
                { src: 'assets/house_1.jpg', alt: 'Image 1', location: 'Arlington, VA', link: '#' },
                { src: 'assets/house_2.jpg', alt: 'Image 2', location: 'Rockville, MD', link: '#' },
            ],
            [
                { src: 'assets/house_3.jpg', alt: 'Image 3', location: 'Indianapolis, IN', link: '#' },
                { src: 'assets/house_4.jpg', alt: 'Image 4', location: 'Bethesda, MD', link: '#' },
            ],
            [
                { src: 'assets/house_5.jpg', alt: 'Image 5', location: 'Los Angeles, CA', link: '#' },
                { src: 'assets/house_6.jpg', alt: 'Image 6', location: 'Las Vegas, NV', link: '#' },
            ],
        ],
    }


    constructor() {
        super();
        this.attachShadow({ mode: 'open' })
        this.currentSlideIndex = 0;
        this.interval = setInterval(() => this.moveSlideSoon(1), 3000);
    }

    connectedCallback() {
        this.validateId();
        this.getAttributes();
        this.style();
        this.render();
    }

    validateId() {
        if (!this.hasAttribute('id')) {
            throw new Error('The "id" attribute is required for <custom-carousel>.');
        }
    }

    getAttributes() {
        Array.from(this.attributes).map(a => {
            if (a.name === "images") {
                this.attrs[a.name] = JSON.parse(a.value);
            } else {
                this.attrs[a.name] = a.value
            }
        });
    }
    style() {
        this.shadowRoot.innerHTML = `
        <style>
        /*carousel*/
.carousel {
    position: relative;
    width: 100%;
    margin: auto;
    overflow: hidden;
    border-radius: 40px;
}
.carousel-images {
    display: flex;
    flex-direction: row;
    transition: transform 0.5s ease-in-out;
    will-change: transform;
    height: 100%;
    object-fit: cover;
    border-radius: 40px;
}

/* Individual slide containing multiple images */
.carousel-slides {
    display: flex;
    flex-direction: row;
    min-width: 100%;
    height: 300px;
    border-radius: 40px;
    gap: 10px;
}

.img-carousel-slide {
    position: relative;
    width: 100%;
    height: 100%;
}

.img-carousel-slide img {
    width: 100%;
    height: auto;
    /* Mantiene la proporción de la imagen */
    display: block;
    /* Elimina el espacio blanco debajo de la imagen */
}

.carousel-slides a {
    width: 100%;
}

.carousel-slides img {
    width: 100%;
    /* Adjust based on the number of images to be displayed at a time */
    flex: 1 0 auto;
    /* Ensure images do not stretch and maintain aspect ratio */
    height: 100%;
    border-radius: 40px;
    object-fit: cover;
}

.hover {
    display: none;
    top: 0;
    position: absolute;
    background-color: var(--cta);
    opacity: 0.4;
    width: 100%;
    height: 100%;
    border-radius: 40px;
}

.carousel-slides a:hover {
    .hover {
        display: block;
    }
}

.scroll {
    position: absolute;
    top: 50%;
    background-color: var(--primary);
    opacity: var(--opacity);
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    font-size: 18px;
    z-index: 1;
}

.prev {
    left: 10px;
}

.next {
    right: 10px;
}

.image-tag {
    position: absolute;
    bottom: 10px;
    /* Ajusta según sea necesario */
    right: 10px;
    /* Ajusta según sea necesario */
    background-color: var(--background);
    opacity: var(--opacity);
    /* Fondo semi-transparente para mejor legibilidad */
    color: white;
    /* Color del texto */
    padding: 10px;
    /* Espaciado interno */
    border-radius: 5px;
    /* Esquinas redondeadas */
}
        </style>
        `
    }
    render() {
        this.shadowRoot.innerHTML += `
    <div class="carousel">
        <div class="carousel-images">
        ${this.attrs.images.map((slideGroup) => `
            <div class="carousel-slides" id="${this.id}">
            ${slideGroup.map((image) => `
                <a href="${image.link}">
                    <div class="img-carousel-slide">
                        <img src="${image.src}" alt="${image.alt}">
                        <div class="hover"></div>
                        <div class="image-tag">
                            <h3>${image.location}</h3>
                        </div>
                    </div>
                </a>
            `).join('')}
            </div>
        `).join('')}
        </div>
        <button class="prev scroll">&#10094;</button>
        <button class="next scroll">&#10095;</button>
    </div>`;

        // JavaScript to toggle the scroll
        this.shadowRoot.querySelector('.prev').addEventListener('click', () => {
            this.moveSlideSoon(-1);
            this.stopSoonAutoplay()
        });

        // JavaScript to toggle the scroll
        this.shadowRoot.querySelector('.next').addEventListener('click', () => {
            this.moveSlideSoon(1);
            this.stopSoonAutoplay();
        });
    }

    moveSlideSoon(step) {
        const slides = this.shadowRoot.querySelectorAll(`#${this.id}`);
        const totalSlides = slides.length;

        this.currentSlideIndex = (this.currentSlideIndex + step + totalSlides) % totalSlides;

        const offset = -this.currentSlideIndex * 100;
        this.shadowRoot.querySelector('.carousel-images').style.transform = `translateX(${offset}%)`;
    }
    stopSoonAutoplay() {
        clearInterval(this.interval);
    }
}


customElements.define('custom-carousel', Carousel);