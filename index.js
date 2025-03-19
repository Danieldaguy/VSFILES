document.addEventListener('DOMContentLoaded', () => {
    const words = ["Innovation", "Creativity", "Excellence", "Leadership", "Success"]; // Words to cycle through
    const dynamicText = document.getElementById('dynamic-text');
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentWord = words[wordIndex];
        if (isDeleting) {
            // Remove characters
            dynamicText.textContent = currentWord.substring(0, charIndex--);
        } else {
            // Add characters
            dynamicText.textContent = currentWord.substring(0, charIndex++);
        }

        // Determine typing speed
        let typingSpeed = isDeleting ? 100 : 150;

        // If the word is fully typed
        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 1000; // Pause before deleting
            isDeleting = true;
        }

        // If the word is fully deleted
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length; // Move to the next word
        }

        setTimeout(typeEffect, typingSpeed);
    }

    typeEffect(); // Start the typing effect
});