document.addEventListener("DOMContentLoaded", () => {
    // Ensure GSAP and ScrollTrigger are loaded
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.error("GSAP or ScrollTrigger not loaded");
        return;
    }

    let char = document.querySelector(".character");
    if (!char) {
        console.error("Character element not found");
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const section2 = document.querySelector(".section:nth-child(2)");
    const section3 = document.querySelector(".section:nth-child(3)");
    const body = document.querySelector("body");

    if (!section2) {
        console.error("Section 2 element not found");
        return;
    }
    if (!section3) {
        console.error("Section 3 element not found");
        return;
    }
    if (!body) {
        console.error("Body element not found");
        return;
    }

    // Stage 1 - Falling from Section 2 to 3
    gsap.to(char, {
        y: "100vh", 
        duration: 1,
        ease: "bounce.out",
        scrollTrigger: {
            trigger: section2,
            start: "center center",
            end: "bottom center",
            toggleActions: "play none none reverse"
        }
    });

    // Stage 2 - Running across Section 3
    gsap.to(char, {
        x: "95vw",
        duration: 2,
        ease: "power1.inOut",
        scrollTrigger: {
            trigger: section3,
            start: "center center",
            end: "bottom center",
            toggleActions: "play none none reverse"
        }
    });

    // Stage 3 - Sliding down to bottom of Section 4
    gsap.to(char, {
        y: "150vh", 
        duration: 2,
        ease: "power1.inOut",
        scrollTrigger: {
            trigger: body,
            start: "bottom bottom",
            end: "bottom bottom",
            toggleActions: "play none none reverse"
        }
    });
});