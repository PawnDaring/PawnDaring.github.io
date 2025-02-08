class CheekyButton extends HTMLElement {
  connectedCallback() {
    // Inject HTML
    this.innerHTML = `
      <style>
@import url('https://fonts.googleapis.com/css2?family=Orbitron&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Special+Elite&display=swap');

:root {
  --border-speed: 3s;
  --border-color-1: #ff0080;
  --border-color-2: #00eaff;
  --glossy-highlight: rgba(255, 255, 255, 0.2);
}

.button-container {
  font-family: 'Special Elite', cursive;
  width: 200px;
  height: 90px;
  overflow: hidden;
  position: fixed;
  left: 0;
  bottom: 0;
  rotate: 45deg;
  padding-top: 100px;
  border-bottom: 5px solid;
  border-image: linear-gradient(90deg, var(--border-color-1), var(--border-color-2)) 1;
}

.custom-button {
  position: absolute;
  bottom: -65%;
  left: 50%;
  width: 120px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  color: white;
  text-decoration: none;
  background: linear-gradient(135deg, #333, #111);
  border: 1px solid;
  border-image: linear-gradient(90deg, var(--border-color-1), var(--border-color-2)) 1;
  box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.05), 0 5px 15px rgba(0, 0, 0, 0.6);
  transform: translateX(-50%);
  transition: bottom 0.2s ease-in-out, transform 0.8s ease-in-out;
  animation: border-hue var(--border-speed) infinite linear;
}

.button-container:hover .custom-button {
  bottom: 0;
  transform: translateX(-50%) translateY(-5px);
}

.button-png {
  position: absolute;
  width: 90px;
  top: -70px;
  transition: transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.button-container:hover .button-png {
  transform: translateY(-10%);
}

@keyframes border-hue {
  0%, 100% {
    border-image-source: linear-gradient(90deg, var(--border-color-1), var(--border-color-2));
  }
}

</style>
<div class="background">
  <div class="button-container">
    <a href="https://pawndaring.github.io/" class="custom-button">
      <span class="button-text">Psst! <br> Need A Custom App?</span>
      <img src="https://raw.githubusercontent.com/PawnDaring/PawnDaring.github.io/refs/heads/main/CheekyGuyW.png" alt="Cheeky Character" class="button-png">
    </a>
  </div>
</div>
    `;
    document.head.appendChild(style);
  }
}

// Register the custom element
customElements.define("cheeky-button", CheekyButton);
