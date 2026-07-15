from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import logging

from app.config import settings
from app.database import get_db, get_db_status
from app.routers import auth, projects, contacts

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("Main")

# Initial projects list to seed if empty
INITIAL_PROJECTS = [
    {
        "title": "EcoShare AI",
        "subtitle": "AI Powered Sustainable Resource Sharing Platform",
        "description": "EcoShare AI is a full stack web application that promotes sustainable living by allowing users to share, donate, and exchange reusable items while integrating AI-powered features to improve user experience.",
        "tech_stack": [
            "React", "Vite", "Tailwind CSS", "Python FastAPI", 
            "MongoDB Atlas", "JWT Authentication", "REST APIs", "AI Integration"
        ],
        "features": [
            "User Authentication", "Resource Sharing", 
            "AI Recommendations", "Search and Filter", 
            "Responsive Design", "MongoDB Integration", "Secure JWT Login"
        ],
        "live_url": "https://eco-share-ai.vercel.app/login",
        "github_url": "https://github.com/DINESH0822/EcoShare-AI",
        "is_featured": True,
        "image_placeholder_type": "code"
    },
    {
        "title": "Employee Management System",
        "subtitle": "Enterprise Java Application with Spring Boot",
        "description": "A comprehensive backend employee tracking system built with Java and Spring Boot, utilizing Hibernate to communicate with an Oracle Database. Employs layered architecture mapping controllers, services, and repositories.",
        "tech_stack": ["Java", "Spring Boot", "Hibernate", "Oracle XE", "REST API", "Maven"],
        "features": [
            "CRUD Operations", "Employee Search", 
            "REST APIs", "Layered Architecture"
        ],
        "live_url": None,
        "github_url": "https://github.com/DINESH0822",
        "is_featured": False,
        "image_placeholder_type": "database"
    },
    {
        "title": "Network Based Smart Attendance System",
        "subtitle": "Socket-based LAN Student Attendance Logger",
        "description": "A Java desktop application that utilizes network socket connections. Automatically logs attendance records for nodes on the local intranet, validating client IP addresses and recording exact timestamps.",
        "tech_stack": ["Java", "Networking", "Socket Programming", "File IO"],
        "features": [
            "Automatic Attendance", "IP Validation", 
            "Timestamp Logging"
        ],
        "live_url": None,
        "github_url": "https://github.com/DINESH0822",
        "is_featured": False,
        "image_placeholder_type": "network"
    },
    {
        "title": "Password Strength Analyzer",
        "subtitle": "Regex-driven Client Security Checker",
        "description": "An interactive utility validating password complexity through cryptographic patterns. Formulates live suggestions based on character entropy and length requirements.",
        "tech_stack": ["Python", "HTML", "CSS", "JavaScript", "Regex Validation"],
        "features": [
            "Regex Validation", "Strength Detection", 
            "Interactive Password Checker"
        ],
        "live_url": None,
        "github_url": "https://github.com/DINESH0822",
        "is_featured": False,
        "image_placeholder_type": "security"
    }
]

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Seeding database
    try:
        db = get_db()
        project_count = db["projects"].count_documents({})
        if project_count == 0:
            logger.info("No projects found in database. Seeding default projects...")
            for project in INITIAL_PROJECTS:
                db["projects"].insert_one(project)
            logger.info(f"Seeded {len(INITIAL_PROJECTS)} default projects successfully.")
        else:
            logger.info(f"Database contains {project_count} projects; skipping seeder.")
    except Exception as e:
        logger.error(f"Failed to seed initial projects data: {e}")
    yield

app = FastAPI(
    title="M Dinesh Full Stack Portfolio API",
    description="Python FastAPI backend powering the recruiter portfolio app, linking with MongoDB Atlas",
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173", 
        "http://localhost:3000",
        "https://dinesh-portfolio.vercel.app", 
        "*"  # Accept requests from anywhere in development
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(auth.router)
app.include_router(projects.router)
app.include_router(contacts.router)

@app.get("/")
async def root():
    return {
        "message": "Welcome to M Dinesh Portfolio API Server",
        "docs_url": "/docs",
        "db_status": get_db_status()
    }

@app.get("/api/health")
async def health():
    return {
        "status": "healthy",
        "database": get_db_status()
    }
