class Footer extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' })
    }

    connectedCallback() {
        this.getAttributes();
        this.style();
        this.render();
    }

    getAttributes() {
    }

    style() {
        this.shadowRoot.innerHTML = `
        <style>
        </style>
        `
    }
    render() {
        this.shadowRoot.innerHTML += `
            
        `;
    }
}

customElements.define('custom-footer', Footer);
