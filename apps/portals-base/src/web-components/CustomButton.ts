class CustomButton extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" }); // create shadow root for element and attach it
    const button = document.createElement("button");
    const style = document.createElement("style");
    style.textContent = `
    button {
      background-color: grey;
      color: white;
    }
    `;
    const slot = document.createElement("slot"); // content projection, define placeholders inside your custom web components
    button.appendChild(slot);
    shadow.appendChild(button);
    shadow.appendChild(style);
  }
}
customElements.define("custom-button", CustomButton);
