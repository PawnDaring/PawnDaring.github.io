// matrixAnimation.js

function generateBinaryGrid() {
    const grid = document.getElementById("binary-grid");
    for (let i = 0; i < 400; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        grid.appendChild(cell);
        updateCell(cell);
    }
}

function updateCell(cell) {
    setInterval(() => {
        cell.textContent = Math.random() > 0.5 ? "1" : "0";
        cell.style.opacity = Math.random();
    }, 400);
}

document.addEventListener("DOMContentLoaded", generateBinaryGrid);