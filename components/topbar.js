class TopBar extends HTMLElement {
    attrs = {
        background: "black",
        hover: "#B8B8B7",
        logowidth: "300px",
        lettercolor: "white",
        letterhover: "white",
        tabs: [
            {
                url: "#",
                tab: "Home",
            },
            {
                url: "#",
                tab: "About us",
            },
            {
                url: "#",
                tab: "Our Proyects",
            },
            {
                url: "#",
                tab: "Contact us",
            },
        ],
        contact: {
            url: "#",
            phone: "+51 987 654 321",
        },
    }


    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
    }

    connectedCallback() {
        this.getAttributes();
        this.style();
        this.render();
    }

    getAttributes() {
        Array.from(this.attributes).map(a => {
            this.attrs[a.name] = a.value
        });
    }

    style() {
        this.shadowRoot.innerHTML = `
    <style>
    @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');
    a {
        color: ${this.attrs.lettercolor};
        text-decoration: none;
        height: 80px;
    }

    .nav-bar,
    .nav-elements {
        background-color: ${this.attrs.background};
        width: 100%;
        height: 80px;
        display: flex;
        flex-direction: row;
    }

    .logo,
    .logo>a {
        width: ${this.attrs.logowidth};
        height: 80px;
        display: flex;
        justify-content: center;
        margin-right: auto;
    }

    .logo img {
        width: ${this.attrs.logowidth};
        object-fit: contain;
    }

    li {
        list-style-type: none;
        height: 80px;
    }

    .tab {
        font-size: large;
        height: 80px;
        width: 100px;
        display: flex;
        align-content: center;
    }


    .number {
        width: 150px;
    }

    .tab>p {
        margin: auto;
    }

    .tab:hover {
        background: ${this.attrs.hover};
    }
    a:hover{
        color:${this.attrs.letterhover}
    }
    .navigations {
        background-color: ${this.attrs.background};
        margin: 0;
        height: 80px;
        gap: 20px;
        display: flex;
        flex-direction: row;
    }

    .nav-elements a.icon {
        display: none;
    }

    #nav-mobile {
        display: none;
    }

    @media only screen and (min-width: 970px) {
        #nav-mobile {
            display: none !important;
        }
    }

    @media only screen and (max-width: 970px) {
        .navigations {
            display: none;
        }

        #nav-mobile {
            padding: 0;
            right:0;
            top:80px;
            position: absolute;
            height: max-content;
            width: 100%;
            gap: 0;
            z-index: 1;
        }

        li {
            height: min-content;
        }

        .nav-elements a.icon {
            background: ${this.attrs.background};
            display: flex;
            position: absolute;
            right: 0;
            top: 0;
            width: 80px;
            height: 80px;
        }

        .nav-elements a.icon:hover {
            background-color: ${this.attrs.hover};
            color: ${this.attrs.letterhover};
        }

        .tab {
            height: 40px;
            width: 100%;
        }


        .number {
            width: 100%;
        }
    }
</style>`
    }

    render() {
        this.shadowRoot.innerHTML += `
             <div class="nav-bar">
            <div class="nav-elements">
                <div class="logo">
                    <a href="#"><img src="logo/logo_rectangle.png" alt="img-logo"></a>
                </div>
                <ul class="navigations" id="navigations">
                ${this.attrs.tabs.map((e) => `
                    <li>
                        <a href="${e.url}">
                            <div class="tab">
                                <p>${e.tab}</p>
                            </div>
                        </a>
                    </li>
                `).join('')}
                    <li>
                        <a href="${this.attrs.contact.url}">
                            <div class="tab number">
                                <p>${this.attrs.contact.phone}</p>
                            </div>
                        </a>
                    </li>
                </ul>
                <a href="javascript:void(0);" class="icon" id="menu-icon">
                    <i class="fa fa-bars" style="margin: auto;"></i>
                </a>
            </div>
        </div>
        <ul class="navigations" id="nav-mobile">
            <li>
                <a href="#">
                    <div class="tab">
                        <p>Home</p>
                    </div>
                </a>
            </li>
            <li>
                <a href="#">
                    <div class="tab">
                        <p>About Us</p>
                    </div>
                </a>
            </li>
            <li>
                <a href="#">
                    <div class="tab">
                        <p>Our Proyects</p>
                    </div>
                </a>
            </li>
            <li>
                <a href="#">
                    <div class="tab">
                        <p>Contact Us</p>
                    </div>
                </a>
            </li>
            <li>
                <a href="#">
                    <div class="tab number">
                        <p>+51 987 654 321</p>
                    </div>
                </a>
            </li>
        </ul>`;

        // JavaScript to toggle the mobile menu
        this.shadowRoot.querySelector('#menu-icon').addEventListener('click', () => {
            const navMobile = this.shadowRoot.querySelector('#nav-mobile');
            if (navMobile.style.display === 'block') {
                navMobile.style.display = 'none';
            } else {
                navMobile.style.display = 'block';
            }
        });
    }

}


customElements.define('top-bar', TopBar);