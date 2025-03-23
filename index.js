document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed.');

    // Handle dynamic text only if the element exists
    const dynamicText = document.getElementById('dynamic-text');
    if (dynamicText) {
        console.log('dynamicText element found:', dynamicText);

        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            console.log('typeEffect called. Current wordIndex:', wordIndex, 'charIndex:', charIndex, 'isDeleting:', isDeleting);

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
    } else {
        console.log('dynamicText element not found. Skipping typewriter effect.');
    }

    const easterEggTrigger = document.getElementById('easter-egg');
    console.log('easterEggTrigger element:', easterEggTrigger);

    if (easterEggTrigger) {
        easterEggTrigger.addEventListener('click', () => {
            console.log('Easter egg clicked.');

            const codeRainContainer = document.createElement('div');
            codeRainContainer.classList.add('code-rain');
            document.body.appendChild(codeRainContainer);
            console.log('Code rain container added to DOM.');

            const columns = Math.floor(window.innerWidth / 20);
            console.log('Number of columns for code rain:', columns);

            for (let i = 0; i < columns; i++) {
                const codeColumn = document.createElement('span');
                codeColumn.style.left = `${i * 20}px`;
                codeColumn.style.animationDelay = `${Math.random() * 2}s`;
                codeColumn.textContent = generateRandomCode();
                codeRainContainer.appendChild(codeColumn);
                console.log(`Code column ${i} added with text:`, codeColumn.textContent);
            }

            codeRainContainer.style.display = 'block';

            setTimeout(() => {
                codeRainContainer.remove();
                console.log('Code rain container removed from DOM.');
            }, 10000);
        });
    } else {
        console.warn('Easter egg trigger not found.');
    }

    function generateRandomCode() {
        const characters = '01';
        let code = '';
        for (let i = 0; i < 20; i++) {
            code += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        console.log('Generated random code:', code);
        return code;
    }

    // Render plans
    const plansContainer = document.getElementById('plans-container');
    if (!plansContainer) {
        console.error('Error: #plans-container not found in the DOM.');
        return;
    }

    console.log('Clearing fallback message.');
    plansContainer.innerHTML = ''; // Ensure the fallback message is removed

    const plans = [
        { name: "Starter Package", price: "$10", features: ["1 - 2 Page Design", "Responsive Layout"] },
        { name: "Pro Business Package", price: "$20", features: ["Up to 5 Pages", "Responsive Layout", "Contact Form", "Small API Integration"] },
        { name: "Premium Business Package", price: "$40", features: ["Unlimited Pages", "Responsive Layout", "E-commerce Integration", "Contact Form", "Any API integration"] },
        { name: "Already made a site but want me to add or edit something", price: "$3", features: ["Add up to 1 extra Page", "Redesign", "You provide me with the files HTML, JavaScript, and CSS only"] }
    ];

    plans.forEach((plan, index) => {
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

        const selectButton = document.createElement('button');
        selectButton.textContent = "Select This Plan";
        selectButton.classList.add('select-plan');
        selectButton.addEventListener('click', () => {
            openForm(plan);
            plansContainer.scrollTo({ top: plansContainer.scrollHeight, behavior: 'smooth' }); // Scroll to the bottom
        });
        planDiv.appendChild(selectButton);

        plansContainer.appendChild(planDiv);
    });

    function openForm(plan) {
        // Remove any existing form
        const existingForm = document.getElementById('plan-form');
        if (existingForm) {
            existingForm.remove();
        }

        // Create the form
        const form = document.createElement('form');
        form.id = 'plan-form';
        form.classList.add('plan-form');

        const heading = document.createElement('h3');
        heading.textContent = `Order Form for ${plan.name}`;
        form.appendChild(heading);

        const packageNameField = document.createElement('input');
        packageNameField.type = 'text';
        packageNameField.name = 'packageName';
        packageNameField.value = plan.name;
        packageNameField.readOnly = true;
        packageNameField.placeholder = 'Package Name';
        form.appendChild(packageNameField);

        const nameField = document.createElement('input');
        nameField.type = 'text';
        nameField.name = 'name';
        nameField.placeholder = 'Your Name';
        form.appendChild(nameField);

        const emailField = document.createElement('input');
        emailField.type = 'email';
        emailField.name = 'email';
        emailField.placeholder = 'Your Email';
        form.appendChild(emailField);

        const messageField = document.createElement('textarea');
        messageField.name = 'message';
        messageField.placeholder = 'How do you want your site? Whats your site about and for? Theme? Any thing else to add? BE DETAILED!! 5 sentences REQUIRED';
        form.appendChild(messageField);

        // Add file upload input if the specific plan is selected
        if (plan.name === "Already made a site but want me to add or edit something") {
            const fileUploadLabel = document.createElement('label');
            fileUploadLabel.textContent = "Upload your site files:";
            fileUploadLabel.setAttribute('for', 'site-files');
            form.appendChild(fileUploadLabel);

            const fileUploadInput = document.createElement('input');
            fileUploadInput.type = 'file';
            fileUploadInput.name = 'siteFiles';
            fileUploadInput.id = 'site-files';
            fileUploadInput.multiple = true; // Allow multiple file uploads
            form.appendChild(fileUploadInput);
        }

        // Payment dropdown
        const paymentLabel = document.createElement('label');
        paymentLabel.textContent = "Choose your payment method";
        paymentLabel.setAttribute('for', 'payment-method');
        form.appendChild(paymentLabel);

        const paymentDropdown = document.createElement('select');
        paymentDropdown.name = 'paymentMethod';
        paymentDropdown.id = 'payment-method';
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Select Payment Method';
        defaultOption.disabled = true;
        defaultOption.selected = true;
        paymentDropdown.appendChild(defaultOption);

        const cashAppOption = document.createElement('option');
        cashAppOption.value = 'cashapp';
        cashAppOption.textContent = 'CashApp';
        paymentDropdown.appendChild(cashAppOption);

        const donationOption = document.createElement('option');
        donationOption.value = 'donation';
        donationOption.textContent = 'Donation';
        paymentDropdown.appendChild(donationOption);

        form.appendChild(paymentDropdown);

        // Conditional inputs for payment
        const cashAppInput = document.createElement('input');
        cashAppInput.type = 'text';
        cashAppInput.name = 'cashTag';
        cashAppInput.id = 'cash-tag';
        cashAppInput.placeholder = 'Enter your CashApp $cashtag';
        cashAppInput.style.display = 'none'; // Initially hidden
        form.appendChild(cashAppInput);

        const donationMessage = document.createElement('p');
        donationMessage.id = 'donation-message';
        donationMessage.style.display = 'none'; // Initially hidden
        donationMessage.innerHTML = `
            Donate via <a href="https://www.buymeacoffee.com/dangy" target="_blank">Buy Me a Coffee</a>.
            Use the code provided after submission in your donation message.
        `;
        form.appendChild(donationMessage);

        paymentDropdown.addEventListener('change', () => {
            if (paymentDropdown.value === 'cashapp') {
                cashAppInput.style.display = 'block';
                donationMessage.style.display = 'none';
            } else if (paymentDropdown.value === 'donation') {
                cashAppInput.style.display = 'none';
                donationMessage.style.display = 'block';
            } else {
                cashAppInput.style.display = 'none';
                donationMessage.style.display = 'none';
            }
        });

        // Contact method dropdown
        const contactLabel = document.createElement('label');
        contactLabel.textContent = "How can we contact you?";
        contactLabel.setAttribute('for', 'contact-method');
        form.appendChild(contactLabel);

        const contactDropdown = document.createElement('select');
        contactDropdown.name = 'contactMethod';
        contactDropdown.id = 'contact-method';
        const contactDefaultOption = document.createElement('option');
        contactDefaultOption.value = '';
        contactDefaultOption.textContent = 'Select Contact Method';
        contactDefaultOption.disabled = true;
        contactDefaultOption.selected = true;
        contactDropdown.appendChild(contactDefaultOption);

        const textOption = document.createElement('option');
        textOption.value = 'text';
        textOption.textContent = 'Text';
        contactDropdown.appendChild(textOption);

        const emailOption = document.createElement('option');
        emailOption.value = 'email';
        emailOption.textContent = 'Email';
        contactDropdown.appendChild(emailOption);

        const discordOption = document.createElement('option');
        discordOption.value = 'discord';
        discordOption.textContent = 'Discord';
        contactDropdown.appendChild(discordOption);

        const redditOption = document.createElement('option');
        redditOption.value = 'reddit';
        redditOption.textContent = 'Reddit';
        contactDropdown.appendChild(redditOption);

        form.appendChild(contactDropdown);

        // Conditional inputs for contact method
        const contactInput = document.createElement('input');
        contactInput.type = 'text';
        contactInput.id = 'contact-input';
        contactInput.style.display = 'none'; // Initially hidden
        form.appendChild(contactInput);

        const additionalNotesField = document.createElement('textarea');
        additionalNotesField.name = 'additionalNotes';
        additionalNotesField.id = 'additional-notes';
        additionalNotesField.placeholder = 'Additional notes or comments (optional)';
        form.appendChild(additionalNotesField);

        contactDropdown.addEventListener('change', () => {
            if (contactDropdown.value === 'text') {
                contactInput.style.display = 'block';
                contactInput.placeholder = 'Enter your phone number';
                contactInput.name = 'phoneNumber';
            } else if (contactDropdown.value === 'discord') {
                contactInput.style.display = 'block';
                contactInput.placeholder = 'Enter your Discord username';
                contactInput.name = 'discordUsername';
            } else if (contactDropdown.value === 'reddit') {
                contactInput.style.display = 'block';
                contactInput.placeholder = 'Enter your Reddit username (u/...)';
                contactInput.name = 'redditUsername';
            } else {
                contactInput.style.display = 'none';
                contactInput.placeholder = '';
                contactInput.name = '';
            }
        });

        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.textContent = 'Submit';
        form.appendChild(submitButton);

        const chooseAnotherPlanButton = document.createElement('button');
        chooseAnotherPlanButton.type = 'button';
        chooseAnotherPlanButton.textContent = 'Choose Another Plan';
        chooseAnotherPlanButton.addEventListener('click', () => {
            plansContainer.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top
            form.remove(); // Remove the form
        });
        form.appendChild(chooseAnotherPlanButton);

        // Add the form to the DOM
        plansContainer.appendChild(form);

        form.addEventListener('submit', (event) => {
            event.preventDefault();
        
            // Validate message field for at least 5 sentences
            const message = messageField.value.trim();
            const sentenceCount = message.split(/[.!?]/).filter(sentence => sentence.trim().length > 0).length;
        
            if (sentenceCount < 5) {
                alert('Your message must contain at least 5 sentences. Please provide more details.');
                return;
            }
        
            if (nameField.value && emailField.value && paymentDropdown.value && contactDropdown.value) {
                const formData = {
                    planName: packageNameField.value,
                    userName: nameField.value,
                    userEmail: emailField.value,
                    userMessage: messageField.value,
                    paymentMethod: paymentDropdown.value,
                    userContactMethod: contactDropdown.value,
                    cashTag: paymentDropdown.value === 'cashapp' ? cashAppInput.value : '',
                    phoneNumber: contactDropdown.value === 'text' ? contactInput.value : '',
                    discordUsername: contactDropdown.value === 'discord' ? contactInput.value : '',
                    redditUsername: contactDropdown.value === 'reddit' ? contactInput.value : '',
                    additionalNotes: document.getElementById('additional-notes')?.value || '', // Optional additional notes field
                };
        
                console.log('Form Data:', formData); // Debugging log
        
                // Send form data to the serverless function
                fetch('/api/submit-form', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log('Server Response:', data);
                        alert('Your form has been submitted successfully!');
                    })
                    .catch((error) => {
                        console.error('Error submitting form:', error);
                        alert('There was an error submitting your form. Please try again later.');
                    });
            } else {
                alert('Please fill out all required fields.');
            }
        });
    }

    function showModal(content) {
        // Remove any existing modal
        const existingModal = document.querySelector('.modal');
        if (existingModal) {
            existingModal.remove();
        }

        // Create modal elements
        const modal = document.createElement('div');
        modal.classList.add('modal');

        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');
        modalContent.innerHTML = content;

        const closeModalButton = document.createElement('button');
        closeModalButton.textContent = 'Close';
        closeModalButton.addEventListener('click', () => {
            modal.remove();
        });

        modalContent.appendChild(closeModalButton);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
    }

    console.log('Plans successfully added to the container.');
});