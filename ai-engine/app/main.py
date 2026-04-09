from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import re
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = FastAPI(title="ReferralAI AI Engine")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============ Models ============

class ResumeData(BaseModel):
    skills: List[str] = []
    experience: str = ""

class MatchRequest(BaseModel):
    candidateSkills: List[str]
    jobSkills: List[str]
    candidateExperience: str = ""

class SkillExtractionRequest(BaseModel):
    text: str

class EmbeddingRequest(BaseModel):
    text: str

# ============ Skill Database ============

TECH_SKILLS_DB = {
    "backend": ["python", "nodejs", "java", "go", "rust", "csharp", "php"],
    "frontend": ["react", "vue", "angular", "svelte", "nextjs", "gatsby"],
    "databases": ["mongodb", "postgresql", "mysql", "redis", "elasticsearch"],
    "devops": ["docker", "kubernetes", "aws", "gcp", "azure", "terraform"],
    "mobile": ["react native", "flutter", "swift", "kotlin"],
    "ml": ["tensorflow", "pytorch", "scikit-learn", "keras", "xgboost"],
    "tools": ["git", "github", "jenkins", "circleci", "gitlab"],
}

SOFT_SKILLS = ["communication", "leadership", "teamwork", "problem solving", "presentation"]

# ============ Helper Functions ============

def extract_skills_from_text(text: str) -> List[str]:
    """Extract technical skills from text using keyword matching"""
    text_lower = text.lower()
    extracted_skills = []

    for category, skills in TECH_SKILLS_DB.items():
        for skill in skills:
            if re.search(rf'\b{skill}\b', text_lower):
                if skill not in extracted_skills:
                    extracted_skills.append(skill)

    return extracted_skills

def extract_soft_skills(text: str) -> List[str]:
    """Extract soft skills from text"""
    text_lower = text.lower()
    found_soft_skills = []

    for skill in SOFT_SKILLS:
        if skill in text_lower:
            found_soft_skills.append(skill)

    return found_soft_skills

def calculate_experience_years(text: str) -> int:
    """Extract years of experience from text"""
    match = re.search(r'(\d+)\s*(?:years?|yrs?)', text.lower())
    return int(match.group(1)) if match else 0

def get_skill_recommendations(skills: List[str], strengths: List[str]) -> List[str]:
    """Generate recommendations based on current skills"""
    recommendations = []

    if "python" in skills and "ml" not in str(skills):
        recommendations.append("Consider learning Machine Learning (TensorFlow/PyTorch)")
    if "frontend" in skills and "devops" not in str(skills):
        recommendations.append("Learn CI/CD and DevOps practices")
    if len(skills) < 5:
        recommendations.append("Diversify your skill set with complementary technologies")

    return recommendations

# ============ Endpoints ============

@app.get("/health")
async def health():
    """Health check endpoint"""
    return {"status": "AI Engine running"}

@app.post("/parse-resume")
async def parse_resume(data: ResumeData):
    """
    Parse resume and extract skills, strengths, weaknesses
    """
    combined_text = f"{' '.join(data.skills)} {data.experience}"

    # Extract skills
    tech_skills = extract_skills_from_text(combined_text)
    soft_skills = extract_soft_skills(combined_text)

    # Calculate experience
    experience_years = calculate_experience_years(data.experience)

    # Determine strengths (based on skill variety)
    strengths = []
    if len(tech_skills) > 5:
        strengths.append(f"Diverse technical background ({len(tech_skills)} skills)")
    if experience_years > 3:
        strengths.append(f"Strong experience ({experience_years} years)")
    if "leadership" in soft_skills:
        strengths.append("Leadership experience")
    if "python" in tech_skills or "java" in tech_skills:
        strengths.append("Core programming languages mastered")

    # Generate recommendations
    recommendations = get_skill_recommendations(tech_skills, strengths)

    if len(tech_skills) == 0:
        recommendations.append("Add specific technical skills to your resume")

    return {
        "skills": tech_skills,
        "soft_skills": soft_skills,
        "experience_years": experience_years,
        "strengths": strengths,
        "weaknesses": [
            "Consider adding more project details" if not data.experience else None,
            f"Learn more {category.capitalize()}" 
            for category in ["devops", "cloud"] if category not in combined_text.lower()
        ],
        "recommendations": recommendations,
    }

@app.post("/match-candidate-job")
async def match_candidate_job(request: MatchRequest):
    """
    Match candidate skills to job requirements using TF-IDF and cosine similarity
    """
    candidate_skills = " ".join(request.candidateSkills).lower()
    job_skills = " ".join(request.jobSkills).lower()

    # Handle edge cases
    if not candidate_skills or not job_skills:
        return {"matchPercentage": 0, "explanation": "Missing skills data"}

    # Vectorize skills
    vectorizer = TfidfVectorizer(analyzer='char', ngram_range=(2, 3))
    try:
        vectors = vectorizer.fit_transform([candidate_skills, job_skills])
        similarity = cosine_similarity(vectors)[0][1]
        match_percentage = max(0, min(100, similarity * 100))
    except:
        match_percentage = 0

    # Calculate match based on direct skill overlap
    candidate_skill_list = request.candidateSkills
    job_skill_list = request.jobSkills
    
    matching_skills = [s for s in candidate_skill_list if s.lower() in [js.lower() for js in job_skill_list]]
    direct_match = (len(matching_skills) / max(len(job_skill_list), 1)) * 100

    # Final score (weighted average)
    final_score = (match_percentage * 0.4 + direct_match * 0.6)

    # Generate explanation
    if len(matching_skills) == 0:
        explanation = "No direct skill matches found. Consider upskilling."
    elif len(matching_skills) < len(job_skill_list) / 2:
        explanation = f"Matched {len(matching_skills)}/{len(job_skill_list)} required skills. Missing some key skills."
    else:
        explanation = f"Good match! You have {len(matching_skills)}/{len(job_skill_list)} required skills."

    return {
        "matchPercentage": min(100, final_score),
        "directMatches": matching_skills,
        "missingSkills": [s for s in job_skill_list if s.lower() not in [cs.lower() for cs in candidate_skill_list]],
        "explanation": explanation,
    }

@app.post("/extract-skills")
async def extract_skills(request: SkillExtractionRequest):
    """Extract skills from any text"""
    skills = extract_skills_from_text(request.text)
    soft_skills = extract_soft_skills(request.text)

    return {
        "technical_skills": skills,
        "soft_skills": soft_skills,
        "total_skills": len(skills) + len(soft_skills),
    }

@app.post("/generate-embeddings")
async def generate_embeddings(request: EmbeddingRequest):
    """
    Generate TF-IDF embeddings for job/candidate text
    In production, use Sentence Transformers or OpenAI embeddings
    """
    vectorizer = TfidfVectorizer(analyzer='char', ngram_range=(2, 3), max_features=100)
    try:
        vector = vectorizer.fit_transform([request.text]).toarray()[0]
        return {
            "embedding": vector.tolist(),
            "dimension": len(vector),
            "type": "tfidf",
        }
    except:
        return {"error": "Failed to generate embedding"}

@app.post("/recommend-jobs")
async def recommend_jobs(request: MatchRequest):
    """
    Get recommendations for job matches
    """
    match_result = await match_candidate_job(request)

    recommendations = []
    if match_result["matchPercentage"] >= 80:
        recommendations.append("Perfect match! Apply immediately")
    elif match_result["matchPercentage"] >= 60:
        recommendations.append("Strong match - Good fit for your skills")
    else:
        recommendations.append(f"Upskill in {', '.join(match_result['missingSkills'][:2])}")

    return {
        "matchPercentage": match_result["matchPercentage"],
        "recommendations": recommendations,
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
