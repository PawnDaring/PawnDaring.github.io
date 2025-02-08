export function initializeChaoticButton(targetElementId) {
    const container = document.getElementById(targetElementId);
    if (!container) {
        console.error(`Chaotic Button: No element found with ID '${targetElementId}'`);
        return;
    }

    // Create score display
    const scoreboard = document.createElement("div");
    scoreboard.className = "scoreboard";
    scoreboard.innerHTML = `Score: <span id="chaotic-score">0</span>`;
    container.appendChild(scoreboard);

    // Create button
    const button = document.createElement("button");
    button.className = "chaotic-button";
    button.id = "chaoticButton";
    button.textContent = "Catch Me!";
    container.appendChild(button);

    let score = 0;
    let buttonSize = 1;
    let rotationAngle = 0;
    const colors = ["crimson", "dodgerblue", "limegreen", "gold", "purple", "orange", "hotpink"];
    let isWiggling = false;

    function moveButton(event) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        const buttonRect = button.getBoundingClientRect();
        const buttonX = buttonRect.left + buttonRect.width / 2;
        const buttonY = buttonRect.top + buttonRect.height / 2;

        const deltaX = mouseX - buttonX;
        const deltaY = mouseY - buttonY;
        const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

        // Only react when the mouse gets within 120px
        if (distance > 120) {
            if (isWiggling) {
                isWiggling = false;
                button.style.animation = "none";
            }
            return;
        }

        // Start wiggling when the mouse is close
        if (!isWiggling) {
            isWiggling = true;
            button.style.setProperty("--scale-size", buttonSize);
            button.style.animation = "wiggle 0.1s infinite linear";
        }

        // Make movement unpredictable by adding randomness
        let speed = Math.max(1, (120 - distance) / 12);
        let randomFactorX = (Math.random() - 0.5) * 20; // Randomness in X direction
        let randomFactorY = (Math.random() - 0.5) * 20; // Randomness in Y direction

        let newX = button.offsetLeft - deltaX * 0.07 * speed + randomFactorX;
        let newY = button.offsetTop - deltaY * 0.07 * speed + randomFactorY;

        // Rotate slightly as it moves
        rotationAngle += Math.random() * 5;
        if (rotationAngle > 360) rotationAngle -= 360;

        // Keep button inside the window bounds
        newX = Math.min(Math.max(newX, 5), window.innerWidth - button.offsetWidth - 5);
        newY = Math.min(Math.max(newY, 5), window.innerHeight - button.offsetHeight - 5);

        button.style.left = `${newX}px`;
        button.style.top = `${newY}px`;
        button.style.setProperty("--rotation", `${rotationAngle}deg`);
        button.style.transform = `rotate(${rotationAngle}deg) scale(${buttonSize})`;
    }

    function shrinkAndChangeColor() {
        score += 10;
        document.getElementById("chaotic-score").textContent = score;
        buttonSize *= 0.85;
        button.style.setProperty("--scale-size", buttonSize);
        button.style.transform = `rotate(${rotationAngle}deg) scale(${buttonSize})`;
        button.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    }

    document.addEventListener("mousemove", moveButton);
    button.addEventListener("click", shrinkAndChangeColor);
}
