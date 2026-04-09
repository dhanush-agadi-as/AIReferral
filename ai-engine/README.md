# AI Engine - ReferralAI

Python FastAPI server for AI-powered resume parsing, skill extraction, and job matching.

## Setup

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload  # Starts on http://localhost:8000
```

## API Endpoints

### Resume Parsing
**POST /parse-resume**
- Input: `{ skills: [string], experience: string }`
- Output: Skills, soft skills, strengths, weaknesses, recommendations

### Skill Extraction
**POST /extract-skills**
- Input: `{ text: string }`
- Output: Technical skills, soft skills count

### Job Matching
**POST /match-candidate-job**
- Input: `{ candidateSkills: [string], jobSkills: [string], candidateExperience: string }`
- Output: Match percentage, direct matches, missing skills, explanation

### Embeddings Gen eration
**POST /generate-embeddings**
- Input: `{ text: string }`
- Output: TF-IDF vector, dimension

### Job Recommendations
**POST /recommend-jobs**
- Input: Same as job matching
- Output: Match percentage + personalized recommendations

## Docs

Swagger UI available at: http://localhost:8000/docs

## Features

- **Skill Extraction**: Detects 50+ technical skills and soft skills
- **Experience Parsing**: Extracts years of experience from text
- **TF-IDF Vectorization**: Text similarity using TF-IDF
- **Smart Matching**: Cosine similarity-based job matching
- **Recommendations**: Personalized recommendations based on skill gaps

## Future Enhancements

- Integration with spaCy NLP for advanced parsing
- Sentence Transformers for semantic embeddings
- OpenAI GPT for resume analysis
- Multi-language support
- Real-time skill trend analysis
