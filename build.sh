#!/bin/bash
# Build script for Vercel deployment

echo "Installing Python dependencies..."
pip install -r requirements.txt

echo "Installing SpaCy English model..."
python -m spacy download en_core_web_sm

echo "Training the chatbot model..."
python train_model.py

echo "Build completed successfully!"
