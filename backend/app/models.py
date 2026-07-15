from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from datetime import datetime

# ==========================================
# PROJECT MODELS
# ==========================================

class ProjectBase(BaseModel):
    title: str = Field(..., example="EcoShare AI")
    subtitle: str = Field(..., example="AI Powered Sustainable Resource Sharing Platform")
    description: str = Field(..., example="EcoShare AI is a full stack web application...")
    tech_stack: List[str] = Field(default=[], example=["React", "FastAPI", "MongoDB"])
    features: List[str] = Field(default=[], example=["User Authentication", "AI Recommendations"])
    live_url: Optional[str] = Field(None, example="https://eco-share-ai.vercel.app/login")
    github_url: Optional[str] = Field(None, example="https://github.com/DINESH0822/EcoShare-AI")
    is_featured: bool = Field(default=False)
    image_placeholder_type: Optional[str] = Field("code", description="Visual layout type: 'code', 'database', 'network', 'security'")

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    subtitle: Optional[str] = None
    description: Optional[str] = None
    tech_stack: Optional[List[str]] = None
    features: Optional[List[str]] = None
    live_url: Optional[str] = None
    github_url: Optional[str] = None
    is_featured: Optional[bool] = None
    image_placeholder_type: Optional[str] = None

class ProjectResponse(ProjectBase):
    id: str = Field(..., alias="_id")

    class Config:
        populate_by_name = True
        json_schema_extra = {
            "example": {
                "id": "65f12ab345cd6789ef012345",
                "title": "EcoShare AI",
                "subtitle": "AI Powered Sustainable Resource Sharing Platform",
                "description": "EcoShare AI is a full stack web application that promotes sustainable living...",
                "tech_stack": ["React", "Vite", "Tailwind CSS", "FastAPI", "MongoDB Atlas"],
                "features": ["User Authentication", "AI Recommendations", "Resource Sharing"],
                "live_url": "https://eco-share-ai.vercel.app/login",
                "github_url": "https://github.com/DINESH0822/EcoShare-AI",
                "is_featured": True,
                "image_placeholder_type": "code"
            }
        }

# ==========================================
# CONTACT MODELS
# ==========================================

class ContactSubmissionBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=50)
    email: EmailStr
    subject: str = Field(..., min_length=3, max_length=100)
    message: str = Field(..., min_length=10, max_length=1000)

class ContactSubmissionCreate(ContactSubmissionBase):
    pass

class ContactSubmissionResponse(ContactSubmissionBase):
    id: str = Field(..., alias="_id")
    timestamp: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True

# ==========================================
# AUTH MODELS
# ==========================================

class AdminLogin(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None
