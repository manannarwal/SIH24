from flask import Flask, request, jsonify, render_template, redirect, url_for
import json
import random
import re

# Try to import optional dependencies
try:
    import ollama
    OLLAMA_AVAILABLE = True
except ImportError:
    OLLAMA_AVAILABLE = False

try:
    import qrcode
    QR_AVAILABLE = True
except ImportError:
    QR_AVAILABLE = False

app = Flask(__name__)

# Loading the intents dataset
with open('intents.json', encoding='utf-8') as f:
    intents = json.load(f)

def correct_spelling(text):
    # Simple text cleaning without external dependencies
    # Remove extra spaces and convert to lowercase
    cleaned_text = re.sub(r'\s+', ' ', text.strip().lower())
    return cleaned_text

def predict_intent_simple(user_input):
    """Simple keyword-based intent prediction without ML"""
    user_input = correct_spelling(user_input)
    
    # Check each intent for keyword matches
    best_intent = "fallback"
    best_score = 0
    
    for intent_data in intents['intents']:
        intent_name = intent_data['intent']
        patterns = intent_data['text']
        
        # Count matches for this intent
        score = 0
        for pattern in patterns:
            pattern_lower = pattern.lower()
            # Exact match gets high score
            if user_input == pattern_lower:
                score += 10
            # Partial match gets lower score
            elif pattern_lower in user_input or user_input in pattern_lower:
                score += 5
            # Word-by-word match
            else:
                user_words = set(user_input.split())
                pattern_words = set(pattern_lower.split())
                common_words = user_words.intersection(pattern_words)
                if common_words:
                    score += len(common_words)
        
        # Update best match
        if score > best_score:
            best_score = score
            best_intent = intent_name
    
    return best_intent

def generate_response(intent):
    for i in intents['intents']:
        if i['intent'] == intent:   
            return i['responses'][0]
    return "Sorry, I didn't get that. Can you please rephrase your question?"

def getOllamaResponse(input_text):
    # If Ollama is not available (like on Vercel), provide a fallback response
    if not OLLAMA_AVAILABLE:
        return getMuseMateResponse(input_text)
    
    try:
        # First, try to check if Ollama service is available
        available_models = ollama.list()
        
        # Use the first available model, or default to deepseek-r1:1.5b
        model_to_use = 'deepseek-r1:1.5b'
        if available_models and 'models' in available_models:
            model_names = [model['name'] for model in available_models['models']]
            if 'llama3.1:latest' in model_names:
                model_to_use = 'llama3.1:latest'
            elif model_names:
                model_to_use = model_names[0]
        
        response = ollama.generate(
            model=model_to_use,
            prompt=f"""
            You are MuseMate, an AI chatbot specifically designed to help users with museum ticket bookings and related queries in India. You work for MuseMate - a platform for booking museum tickets across India.

            IMPORTANT: Never introduce yourself as DeepSeek or any other AI assistant. You are MuseMate's chatbot.

            Your primary functions:
            1. Help users book museum tickets across India
            2. Provide information about Indian museums, their timings, ticket prices, and attractions
            3. Answer queries about museum visits, travel, and cultural sites
            4. Guide users through the booking process
            5. Resolve any issues related to museum visits or bookings

            Key Guidelines:
            1. Always stay in character as MuseMate's helpful chatbot
            2. Focus on Indian museums, cultural sites, and heritage locations
            3. Display prices in Indian Rupees (₹)
            4. Be helpful, friendly, and knowledgeable about Indian culture and museums
            5. Guide users toward booking tickets when appropriate
            6. Never mention being developed by any company other than MuseMate
            7. Keep responses concise but informative

            Response Guidelines:
            - Start responses naturally without introducing yourself
            - Focus on helping with the user's specific query
            - Offer to help with bookings when relevant
            - Be enthusiastic about Indian museums and culture

            User Query: {input_text}

            Respond directly to the user's query as MuseMate's helpful chatbot:
            """
        )

        return response.get('response', 'Welcome to MuseMate! I apologize, but I am having trouble generating a response right now. Please try asking about museum bookings, ticket prices, or specific museums you\'d like to visit.')
    except Exception as e:
        # Fallback response when Ollama is not available
        return getMuseMateResponse(input_text)

def getMuseMateResponse(input_text):
    """Fallback response function for when Ollama is not available (like on Vercel)"""
    input_lower = input_text.lower()
    
    # Basic keyword-based responses for common queries
    if any(word in input_lower for word in ['book', 'ticket', 'booking', 'reserve']):
        return "I'd be happy to help you book museum tickets! To get started, please let me know which museum you'd like to visit and how many tickets you need. You can also check our list of available museums by typing 'list'."
    
    elif any(word in input_lower for word in ['price', 'cost', 'fee', 'charge']):
        return "Ticket prices vary by museum and visitor type. Most museums in India charge between ₹10-₹500 for Indian citizens and ₹100-₹1000 for foreign visitors. Children and students often get discounts. Which specific museum are you interested in?"
    
    elif any(word in input_lower for word in ['timing', 'hours', 'open', 'close', 'schedule']):
        return "Most museums in India are typically open from 10:00 AM to 5:00 PM, Tuesday to Sunday (closed on Mondays). However, timings can vary. Which museum would you like to know the specific timings for?"
    
    elif any(word in input_lower for word in ['location', 'address', 'where', 'how to reach']):
        return "I can help you with museum locations and directions! Which museum are you planning to visit? I can provide detailed location information and the best ways to reach there."
    
    elif any(word in input_lower for word in ['cancel', 'refund', 'change']):
        return "For ticket cancellations or changes, please note that policies vary by museum. Generally, cancellations made 24 hours in advance are eligible for refunds. Would you like me to help you with a specific booking?"
    
    else:
        return "Welcome to MuseMate! I'm here to assist you with museum ticket bookings across India. I can help you with booking tickets, checking prices, museum information, timings, and answering any questions about your museum visit. How can I help you today?"

def contains_number(text):
    return bool(re.search(r'\d', text))

known_responses = [intent['responses'][0] for intent in intents['intents']]

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json['message'].lower()
    
    # Predict intent using simple keyword matching
    intent = predict_intent_simple(user_input)
    response = generate_response(intent)
    
    # If intent is fallback (no good match), use advanced response
    if intent == 'fallback':
        response = getOllamaResponse(user_input)
    
    return jsonify({"response": response})

@app.route('/payment-gateway')
def payment_gateway():
    # Assuming XAMPP is serving the Razorpay payment page on localhost
    return redirect('http://localhost/PHP_Codes/Razorpay Payment/index.php')

@app.route('/ticket-confirmation')
def ticket_confirmation():
    ticket_id = f"MUSEUM-{random.randint(1000, 9999)}"
    
    # Generate QR code if library is available
    if QR_AVAILABLE:
        try:
            img = qrcode.make(ticket_id)
            img.save("static/ticket_qr.png")
        except:
            # Fallback: no QR code generation
            pass
    
    return render_template('ticket-confirmation.html', ticket_id=ticket_id)

@app.route('/book-ticket', methods=['POST'])
def book_ticket():
    user_data = request.json
    name = user_data.get('name')
    age = user_data.get('age')
    phone_number = user_data.get('phone_number')
    booking_date = user_data.get('booking_date')
    email = user_data.get('email')
    city = user_data.get('city')
    payment_mode = user_data.get('payment_mode')

    # Perform server-side validation
    if not name or not age or not phone_number or not booking_date or not email or not city:
        return jsonify({"error": "All fields are required."}), 400

    if int(age) < 18:
        return jsonify({"error": "Age must be 18 or older."}), 400

    if not re.match(r'^\d{10}$', phone_number):
        return jsonify({"error": "Phone Number must be of exactly 10 digits."}), 400

    if not re.match(r'^\d{2} \w+ \d{4}$', booking_date):
        return jsonify({"error": "Invalid Date of Booking."}), 400

    if not re.match(r'^[^\s@]+@[^\s@]+\.[^\s@]+$', email):
        return jsonify({"error": "Invalid Email ID."}), 400

    # Redirect to ticket confirmation if all validations pass
    return jsonify({"redirect": url_for('ticket_confirmation')})

# For Vercel deployment
handler = app

if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
