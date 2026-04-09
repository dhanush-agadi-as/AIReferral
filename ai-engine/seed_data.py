# Seed MongoDB with test data
import subprocess
import json

test_data = {
    "users": [
        {
            "email": "candidate1@test.com",
            "role": "candidate",
            "skills": ["Python", "JavaScript", "React", "Node.js"]
        },
        {
            "email": "recruiter1@test.com",
            "role": "recruiter"
        }
    ]
}

print(json.dumps(test_data, indent=2))
