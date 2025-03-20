document.addEventListener('DOMContentLoaded', () => {
    const words = ["Business", "Creativity", "Excellence", "Leadership", "Success"]; // Words to cycle through
    const dynamicText = document.getElementById('dynamic-text');
    console.log('dynamicText:', dynamicText);
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentWord = words[wordIndex];
        if (isDeleting) {
            dynamicText.textContent = currentWord.substring(0, charIndex--);
        } else {
            dynamicText.textContent = currentWord.substring(0, charIndex++);
        }

        let typingSpeed = isDeleting ? 100 : 150;

        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 1000;
            isDeleting = true;
        }

        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }

        setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();

    const easterEggTrigger = document.getElementById('easter-egg');

    easterEggTrigger.addEventListener('click', () => {
        const codeRainContainer = document.createElement('div');
        codeRainContainer.classList.add('code-rain');
        document.body.appendChild(codeRainContainer);

        const columns = Math.floor(window.innerWidth / 20);
        for (let i = 0; i < columns; i++) {
            const codeColumn = document.createElement('span');
            codeColumn.style.left = `${i * 20}px`;
            codeColumn.style.animationDelay = `${Math.random() * 2}s`;
            codeColumn.textContent = generateRandomCode();
            codeRainContainer.appendChild(codeColumn);
        }

        codeRainContainer.style.display = 'block';

        setTimeout(() => {
            codeRainContainer.remove();
        }, 10000);
    });

    function generateRandomCode() {
        const characters = '01';
        let code = '';
        for (let i = 0; i < 20; i++) {
            code += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return code;
    }

    const plansContainer = document.getElementById('plans-container');

    // Store the JSON data directly in the JavaScript
    const plans = [
        {
            "name": "Starter Package",
            "price": "$10",
            "features": ["1 - 2 Page Design", "Responsive Layout"]
        },
        {
            "name": "Pro Business Package",
            "price": "$20",
            "features": ["Up to 5 Pages", "Responsive Layout", "Contact Form", "Small API Integration"]
        },
        {
            "name": "Premium Business Package",
            "price": "$40",
            "features": ["Unlimited Pages", "Responsive Layout", "E-commerce Integration", "Contact Form", "Any API integration"]
        },
        {
            "name": "Already made a site but want me to add or edit something",
            "price": "$3",
            "features": ["Add up to 1 extra Page", "Redesign", "You provide me with the files HTML, JavaScript, and CSS only"]
        }
    ];

    console.log('Plans:', plans);

    // Loop through the plans and create HTML for each
    plans.forEach(plan => {
        const planDiv = document.createElement('div');
        planDiv.classList.add('plan');

        // Add plan details
        planDiv.innerHTML = `
            <h3>${plan.name}</h3>
            <p class="price">${plan.price}</p>
            <ul class="features">
                ${plan.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        `;

        // Append the plan to the container
        plansContainer.appendChild(planDiv);
    });
});