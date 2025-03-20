document.addEventListener('DOMContentLoaded', () => {
    const dynamicText = document.getElementById('dynamic-text');
    if (!dynamicText) {
        console.error('Error: #dynamic-text not found in the DOM.');
        return;
    }

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const words = ["Business", "Creativity", "Excellence", "Leadership", "Success"];
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
    if (!plansContainer) {
        console.error('Error: #plans-container not found in the DOM.');
        return;
    }

    const plans = [
        { name: "Starter Package", price: "$10", features: ["1 - 2 Page Design", "Responsive Layout"] },
        { name: "Pro Business Package", price: "$20", features: ["Up to 5 Pages", "Responsive Layout", "Contact Form", "Small API Integration"] },
        { name: "Premium Business Package", price: "$40", features: ["Unlimited Pages", "Responsive Layout", "E-commerce Integration", "Contact Form", "Any API integration"] },
        { name: "Already made a site but want me to add or edit something", price: "$3", features: ["Add up to 1 extra Page", "Redesign", "You provide me with the files HTML, JavaScript, and CSS only"] }
    ];

    plans.forEach(plan => {
        const planDiv = document.createElement('div');
        planDiv.classList.add('plan');

        const planName = document.createElement('h3');
        planName.textContent = plan.name;
        planDiv.appendChild(planName);

        const planPrice = document.createElement('p');
        planPrice.classList.add('price');
        planPrice.textContent = plan.price;
        planDiv.appendChild(planPrice);

        const featuresList = document.createElement('ul');
        featuresList.classList.add('features');
        plan.features.forEach(feature => {
            const featureItem = document.createElement('li');
            featureItem.textContent = feature;
            featuresList.appendChild(featureItem);
        });
        planDiv.appendChild(featuresList);

        plansContainer.appendChild(planDiv);
    });
});