class CustomButton extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" }); // create shadow root for element and attach it
    const button = document.createElement("button");
    button.textContent = "Custom Button";
    const style = document.createElement("style");
    style.textContent = `
    button {
      background-color: grey;
      color: white;
    }
    `;
    shadow.appendChild(button);
    shadow.appendChild(style);
  }
}
customElements.define("custom-button", CustomButton);
