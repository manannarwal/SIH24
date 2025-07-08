import json
import spacy
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
import pickle

# Loading spaCy model
nlp = spacy.load('en_core_web_sm')

# Loading the intents dataset
with open('intents.json') as f:
    intents = json.load(f)

# Preparing training data
texts = []
labels = []

for intent in intents['intents']:
    for pattern in intent['text']:
        texts.append(pattern)
        labels.append(intent['intent'])

# Converting text data to numerical features using CountVectorizer
vectorizer = CountVectorizer()
X = vectorizer.fit_transform(texts)

# Training a Naive Bayes classifier
classifier = MultinomialNB()
classifier.fit(X, labels)

# Saving the model and vectorizer
with open('classifier.pkl', 'wb') as model_file:
    pickle.dump(classifier, model_file)

with open('vectorizer.pkl', 'wb') as vectorizer_file:
    pickle.dump(vectorizer, vectorizer_file)

print("Model trained and saved successfully!")
