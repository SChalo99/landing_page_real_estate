class Footer extends HTMLElement {
    attrs = {
        sections: [

            {
                section: "Our Company",
                options: [
                    {
                        option: "About us",
                        url: "#"
                    },
                    {
                        option: "Career",
                        url: "#"
                    },
                    {
                        option: "Blogs",
                        url: "#"
                    },
                    {
                        option: "Privacy policy",
                        url: "#"
                    },
                ]
            },
            {
                section: "Partners",
                options: [
                    {
                        option: "About us",
                        url: "#"
                    },
                    {
                        option: "Career",
                        url: "#"
                    },
                    {
                        option: "Blogs",
                        url: "#"
                    },
                    {
                        option: "Privacy policy",
                        url: "#"
                    },
                ]
            },
            {
                section: "Customers",
                options: [
                    {
                        option: "About us",
                        url: "#"
                    },
                    {
                        option: "Career",
                        url: "#"
                    },
                    {
                        option: "Blogs",
                        url: "#"
                    },
                    {
                        option: "Privacy policy",
                        url: "#"
                    },
                ]
            },
        ],
        logo: "logo/logo_full.png",
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' })
    }

    connectedCallback() {
        this.getAttributes();
        this.style();
        this.render();
        this.addEventListeners();
    }

    getAttributes() {
        Array.from(this.attributes).map(a => {
            if (a.name === "sections") {
                this.attrs[a.name] = JSON.parse(a.value);
            } else {
                this.attrs[a.name] = a.value
            }
        });
    }

    style() {
        this.shadowRoot.innerHTML = `
        <style>
        .footer-container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

.footer-container>.logo {
    display: flex;
    justify-content: center;
}

.logo-footer {
    width: 23vh;
}

.footer-nav {
    padding-top: 30px;
}

.footer-nav>ul>a>li {
    display: block;
}

.footer-nav>ul>a {
    text-decoration: none;
    color: var(--primary);
}

.footer-nav>ul>a:hover {
    text-decoration: underline;
}

.category {
    font-size: x-large;
}

.copyright {
    display: flex;
    justify-content: center;
}
    @media only screen and (max-width: 970px){
            .footer-container {
        display: flex;
        flex-direction: column-reverse;
        justify-content: center;
        margin-top: 30px;
    }

    .footer-nav {
        padding-left: 0;
        padding-top: 0;
        align-items: center;
        display: flex;
        flex-direction: column;
    }

    .nav-list {
        width: 100%;
        display: none;
        padding: 0;
        margin: 0;
        border-bottom: 2px solid white;
    }

    .footer-nav>ul>a {
        width: 100%;
        height: 2em;
        align-items: center;
        background: rgb(2 9 40);
        justify-content: center;
        display: flex;
        color: #fff;
    }

    .footer-nav>ul>a:hover {
        background: white;
        color: rgb(2 9 40);
    }

    .category {
        width: 100%;
        text-align: center;
        cursor: pointer;
        color: #fff;
        height: 50px;
        border-bottom: 2px solid white;
    }

    /* Dropdown arrow with ::after */
    .category::after {
        content: '';
        position: absolute;
        right: 10px;
        transform: translateY(200%) rotate(0deg);
        /* Adjust to be perfectly centered */
        border-width: 5px;
        /* Size of the arrow */
        border-style: solid;
        border-color: #fff transparent transparent transparent;
        /* White arrow */
    }

        .category.open::after {
            transform: translateY(150%) rotate(180deg);
            /* Rotate arrow when open */
        }
    }
    @media only screen and (min-width: 970px) {
        .nav-list {
            display: block !important;
        }
    }
        </style>
        `
    }
    render() {
        this.shadowRoot.innerHTML += `
        <div class="footer-container">
            <div class="logo">
                <img class="logo-footer" src="${this.attrs.logo}" alt="logo-full">
            </div>
            ${this.attrs.sections.map((e, idx) => `
                <div class="footer-nav">
                    <span class="category" data-toggle="list${idx.toString()}">
                        ${e.section}
                    </span>
                    <ul id="list${idx.toString()}" class="nav-list">
                        ${e.options.map(op => `
                            <a href="${op.url}"><li>${op.option}</li></a>
                        `).join('')}
                    </ul>
                </div>
            `).join('')}
        </div>
        <div class="copyright">
            <p>Copyright @YourCompany</p>
        </div>
    `;
    }

    addEventListeners() {
        this.shadowRoot.querySelectorAll('.category').forEach(button => {
            button.addEventListener('click', function () {
                console.log('Button clicked:', this);
                var toggleListId = this.getAttribute('data-toggle');
                console.log('Toggle list ID:', toggleListId);

                var navList = this.getRootNode().host.shadowRoot.getElementById(toggleListId);
                console.log('Shadow root:', this.shadowRoot);
                console.log('Nav list:', navList);

                if (navList) {
                    if (navList.style.display === 'none' || navList.style.display === '') {
                        navList.style.display = 'block'; // Show the list
                        this.classList.add('open'); // Rotate arrow
                    } else {
                        navList.style.display = 'none'; // Hide the list
                        this.classList.remove('open'); // Reset arrow
                    }
                } else {
                    console.warn(`List with ID "${toggleListId}" not found.`);
                }
            });
        });
    }
}

customElements.define('custom-footer', Footer);
