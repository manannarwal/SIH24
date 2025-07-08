let bookingStep = 0;  // Track booking steps: 0 = Not in booking flow, 1 = Ask number of tickets, 2 = Ask name, 3 = Ask age, 4 = Ask phone number, 5 = Ask date, 6 = Ask email, 7 = Ask city, 8 = Ask payment mode

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent the default form submission behavior
        sendMessage();
    }
}

function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;

    const chatBox = document.getElementById('chat-box');
    const userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'message user-message';
    userMessageDiv.textContent = userInput;
    chatBox.appendChild(userMessageDiv);

    chatBox.scrollTop = chatBox.scrollHeight;

    // Handling booking flow based on steps
    if (bookingStep === 0) {
        fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userInput }),
        })
        .then(response => response.json())
        .then(data => {
            const botResponse = data.response;

            if (botResponse.toLowerCase().includes("how many tickets")) {
                bookingStep = 1;  // Initialize the booking flow by asking number of tickets
                appendBotMessage(botResponse);
            } else {
                appendBotMessage(botResponse);
            }
        });
    } else if (bookingStep === 1) {
        // Ask for name after getting number of tickets
        setTimeout(() => {
            appendBotMessage("Please enter your Name.");
            bookingStep = 2;
        }, 500);
    } else if (bookingStep === 2) {
        // Validate and ask for name
        if (!userInput.trim()) {
            setTimeout(() => {
                appendBotMessage("Please enter your Name.");
            }, 500);
        } else {
            // Store name and proceed
            setTimeout(() => {
                appendBotMessage("Please enter your Age.");
                bookingStep = 3;
            }, 500);
        }
    } else if (bookingStep === 3) {
        // Validate age
        const age = parseInt(userInput);
        if (isNaN(age) || age < 18) {
            setTimeout(() => {
                appendBotMessage("Age must be 18 or older. Please enter your Age.");
            }, 500);
        } else {
            // Store age and proceed
            setTimeout(() => {
                appendBotMessage("Please enter your Phone Number.");
                bookingStep = 4;
            }, 500);
        }
    } else if (bookingStep === 4) {
        // Validate phone number
        const phoneNumber = userInput.trim();
        if (!/^\d{10}$/.test(phoneNumber)) {
            setTimeout(() => {
                appendBotMessage("Phone Number must be of exactly 10 digits. Please enter your Phone Number.");
            }, 500);
        } else {
            // Store phone number and proceed
            setTimeout(() => {
                appendBotMessage("Please enter the Date of Booking.");
                bookingStep = 5;
            }, 500);
        }
    } else if (bookingStep === 5) {
        // Validate date
        const datePattern = /^\d{2} \w+ \d{4}$/;  // For example, "29 August 2024"
        if (!datePattern.test(userInput)) {
            setTimeout(() => {
                appendBotMessage("Please enter a valid Date of Booking (such as: 31 August 2024).");
            }, 500);
        } else {
            // Store date and proceed
            setTimeout(() => {
                appendBotMessage("Please enter your Email ID.");
                bookingStep = 6;
            }, 500);
        }
    } else if (bookingStep === 6) {
        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(userInput)) {
            setTimeout(() => {
                appendBotMessage("Please enter a valid Email ID.");
            }, 500);
        } else {
            // Store email and proceed
            setTimeout(() => {
                appendBotMessage("Please enter your City.");
                bookingStep = 7;
            }, 500);
        }
    } else if (bookingStep === 7) {
        // Store city and proceed
        setTimeout(() => {
            appendBotMessage("Thank you! Now, please choose your payment method: **Credit Card**, **Debit Card**, **UPI**.");
            bookingStep = 8;
        }, 500);
    } else if (bookingStep === 8) {
        // Redirect to payment gateway
        setTimeout(() => {
            appendBotMessage("Redirecting you to the payment gateway...");
            window.location.href = "/payment-gateway";
        }, 1000);
    }

    document.getElementById('user-input').value = '';
}

function appendBotMessage(message) {
    const chatBox = document.getElementById('chat-box');
    const botResponseDiv = document.createElement('div');
    botResponseDiv.className = 'message bot-response';
    
    // Convert markdown to HTML using marked.js
    const parsedMarkdown = marked.parse(message);
    
    botResponseDiv.innerHTML = parsedMarkdown;
    chatBox.appendChild(botResponseDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}
