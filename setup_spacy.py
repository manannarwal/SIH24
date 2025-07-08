#!/usr/bin/env python3
import subprocess
import sys

def install_spacy_model():
    """Install the English spaCy model required for the application"""
    try:
        import spacy
        # Try to load the model
        nlp = spacy.load("en_core_web_sm")
        print("SpaCy model already installed and loaded successfully")
    except OSError:
        print("Installing SpaCy English model...")
        subprocess.check_call([sys.executable, "-m", "spacy", "download", "en_core_web_sm"])
        print("SpaCy model installed successfully")

if __name__ == "__main__":
    install_spacy_model()
