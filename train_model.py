import json
import pickle
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB

# Load the intents dataset
with open('intents.json', encoding='utf-8') as f:
    intents = json.load(f)

# Prepare training data
texts = []
labels = []

for intent in intents['intents']:
    for pattern in intent['text']:
        texts.append(pattern)
        labels.append(intent['intent'])

# Convert text data to numerical features using CountVectorizer
vectorizer = CountVectorizer()
X = vectorizer.fit_transform(texts)

# Train a Naive Bayes classifier
classifier = MultinomialNB()
classifier.fit(X, labels)

# Save the trained model and vectorizer
with open('classifier.pkl', 'wb') as model_file:
    pickle.dump(classifier, model_file)

with open('vectorizer.pkl', 'wb') as vectorizer_file:
    pickle.dump(vectorizer, vectorizer_file)

print("Model trained and saved successfully!")
