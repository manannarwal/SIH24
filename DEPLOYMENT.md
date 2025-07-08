# MuseMate Chatbot - Vercel Deployment Guide

## Prerequisites
1. Install Vercel CLI: `npm i -g vercel`
2. Create a Vercel account at https://vercel.com

## Deployment Steps

### 1. Initialize Vercel Project
```bash
cd "e:\Manan Files\Web Dev. Projects\SIH\SIH 2024\SIH Project\Chatbot"
vercel
```

### 2. Configure Project
- Choose "Flask" as framework (or skip framework detection)
- Set build command: `python train_model.py`
- Set output directory: `./`
- Keep other settings as default

### 3. Deploy
```bash
vercel --prod
```

## Important Notes

### SpaCy Model Installation
- The app will try to auto-install the SpaCy model
- If it fails, spell correction will be disabled gracefully
- The app will still work with basic functionality

### Ollama Alternative
- Ollama is not available on Vercel (serverless environment)
- The app uses a fallback response system for complex queries
- Consider integrating OpenAI API for better AI responses

### File Structure for Vercel
```
Chatbot/
├── app.py (main Flask app)
├── vercel.json (Vercel configuration)
├── requirements.txt (Python dependencies)
├── intents.json (training data)
├── classifier.pkl (trained model)
├── vectorizer.pkl (text vectorizer)
├── train_model.py (model training script)
├── templates/ (HTML templates)
├── static/ (CSS, JS, images)
└── setup_spacy.py (SpaCy setup script)
```

### Alternative AI Integration (Optional)
To add OpenAI integration instead of Ollama:

1. Add to requirements.txt:
```
openai
```

2. Set environment variables in Vercel dashboard:
```
OPENAI_API_KEY=your_api_key_here
```

3. Update the getOllamaResponse function to use OpenAI API

## Testing Locally
```bash
python app.py
# Visit http://localhost:5000
```

## Troubleshooting

### Common Issues:
1. **Build timeout**: Increase maxDuration in vercel.json
2. **Large bundle size**: Optimize dependencies
3. **SpaCy model fails**: App gracefully falls back to no spell correction
4. **Ollama not working**: Expected, uses fallback responses

### Performance Tips:
- Keep model files small (classifier.pkl, vectorizer.pkl)
- Optimize static files
- Use CDN for large assets
- Consider caching strategies

## Environment Variables (Optional)
Set these in Vercel dashboard if using external APIs:
- `OPENAI_API_KEY` (for OpenAI integration)
- `ENVIRONMENT=production`
