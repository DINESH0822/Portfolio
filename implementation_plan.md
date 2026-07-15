# Premium Full Stack Portfolio Website

Create a modern, premium, recruiter-focused Full Stack personal portfolio website for M Dinesh. The design is inspired by high-end tech corporate landing pages like Stripe, Vercel, and Linear, utilizing a clean white/slate gray palette with primary blue accents.

## User Review Required

> [!IMPORTANT]
> The backend connects to MongoDB Atlas. For local testing, we will configure a connection string in a `.env` file. We will include a graceful database health-check fallback to mock storage in case MongoDB Atlas credentials are not immediately configured by the recruiter, ensuring the site works and remains responsive during evaluation.

> [!NOTE]
> We will implement a secure admin dashboard accessible via `/admin` (with standard JWT credential authentication) to manage projects and read received messages from the contact form.

## Proposed Changes

We will organize the workspace into two folders:
1. `backend/`: FastAPI application.
2. `frontend/`: React + Vite + Tailwind CSS static/client application.

---

### Backend (Python FastAPI)

The backend provides endpoints for JWT authentication, admin logins, contact form submissions, and full CRUD operations on projects.

#### [NEW] [backend/requirements.txt](file:///c:/Users/Dinesh/OneDrive/Desktop/Portfolio/backend/requirements.txt)
Specifies python packages:
- `fastapi`
- `uvicorn`
- `pymongo[srv]`
- `pydantic`
- `pydantic-settings`
- `python-jose[cryptography]`
- `passlib[bcrypt]`
- `python-multipart`
- `python-dotenv`

#### [NEW] [backend/.env.example](file:///c:/Users/Dinesh/OneDrive/Desktop/Portfolio/backend/.env.example)
Example environment template for local credentials:
- `MONGODB_URI` (MongoDB Atlas URI)
- `JWT_SECRET` (Key for signing tokens)
- `ADMIN_USERNAME` (Admin user)
- `ADMIN_PASSWORD_HASH` (Admin bcrypt password hash)

#### [NEW] [backend/app/config.py](file:///c:/Users/Dinesh/OneDrive/Desktop/Portfolio/backend/app/config.py)
Config class using `pydantic_settings` to read environment variables and validate them.

#### [NEW] [backend/app/database.py](file:///c:/Users/Dinesh/OneDrive/Desktop/Portfolio/backend/app/database.py)
Initializes the MongoDB client. Handles reconnection, handles errors, and prints logs. Provides a helper to check connection status.

#### [NEW] [backend/app/models.py](file:///c:/Users/Dinesh/OneDrive/Desktop/Portfolio/backend/app/models.py)
Pydantic schemas for data serialization and validation:
- `Project`: `title`, `subtitle`, `description`, `tech_stack` (list), `features` (list), `live_url`, `github_url`, `is_featured`, `image_placeholder_type` (for beautiful dynamic SVG design mockups)
- `ContactSubmission`: `name`, `email`, `subject`, `message`, `timestamp`
- `AdminUser`: `username`, `password`
- `Token`: `access_token`, `token_type`

#### [NEW] [backend/app/auth.py](file:///c:/Users/Dinesh/OneDrive/Desktop/Portfolio/backend/app/auth.py)
Bcrypt hashing utilities, JWT payload creation and decoding, and FastAPI `Depends` authentication checking for admin operations.

#### [NEW] [backend/app/routers/auth.py](file:///c:/Users/Dinesh/OneDrive/Desktop/Portfolio/backend/app/routers/auth.py)
Authentication endpoints:
- `POST /api/auth/login`: verifies credentials, returns JWT.
- `GET /api/auth/verify`: returns validation status of the provided bearer token.

#### [NEW] [backend/app/routers/projects.py](file:///c:/Users/Dinesh/OneDrive/Desktop/Portfolio/backend/app/routers/projects.py)
CRUD for Projects:
- `GET /api/projects`: Public, lists all projects (supporting filters like featured vs other stack categories).
- `POST /api/projects`: Admin only, creates a project.
- `PUT /api/projects/{id}`: Admin only, updates a project.
- `DELETE /api/projects/{id}`: Admin only, deletes a project.

#### [NEW] [backend/app/routers/contacts.py](file:///c:/Users/Dinesh/OneDrive/Desktop/Portfolio/backend/app/routers/contacts.py)
Contact Form APIs:
- `POST /api/contacts`: Public, saves a new message.
- `GET /api/contacts`: Admin only, returns all contact submissions.
- `DELETE /api/contacts/{id}`: Admin only, deletes a submission.

#### [NEW] [backend/app/main.py](file:///c:/Users/Dinesh/OneDrive/Desktop/Portfolio/backend/app/main.py)
Bootstraps FastAPI, configures CORS middleware to allow the frontend, includes API routers, and initializes preloaded project data (like EcoShare AI, Employee Management System, etc.) if database collection is empty.

---

### Frontend (React + Vite + Tailwind CSS)

A premium corporate UI built in a React SPA using Vite, Tailwind CSS for beautiful styles, and Framer Motion for scroll effects, loading transitions, and smooth hover feedback.

#### [NEW] [frontend/package.json](file:///c:/Users/Dinesh/OneDrive/Desktop/Portfolio/frontend/package.json)
Standard react structure with additional libraries:
- `framer-motion` for animations.
- `lucide-react` for premium corporate outline icons (matching Stripe/Linear aesthetic).
- `react-router-dom` for app routing (portfolio landing page, project details, admin dashboard).
- `axios` for backend API communication.

#### [NEW] [frontend/tailwind.config.js](file:///c:/Users/Dinesh/OneDrive/Desktop/Portfolio/frontend/tailwind.config.js)
Defines the theme colors:
- White background (`#FFFFFF`)
- Light Gray Sections (`#F8FAFC`, `#F1F5F9`)
- Primary Blue (`#2563EB`, hover: `#1D4ED8`)
- Dark Text (`#1F2937` / Slate-800)
- Secondary Text (`#6B7280` / Slate-500)
- Fonts: Inter

#### [NEW] [frontend/src/index.css](file:///c:/Users/Dinesh/OneDrive/Desktop/Portfolio/frontend/src/index.css)
Tailwind imports, font family bindings, custom animations, custom scrollbar styling, and smooth scroll behavior setup.

#### [NEW] [frontend/src/context/AuthContext.jsx](file:///c:/Users/Dinesh/OneDrive/Desktop/Portfolio/frontend/src/context/AuthContext.jsx)
State provider for tracking the Admin login token in `localStorage`, offering login/logout procedures, and configuring Axios authorization headers automatically.

#### [NEW] [frontend/src/components/Loader.jsx](file:///c:/Users/Dinesh/OneDrive/Desktop/Portfolio/frontend/src/components/Loader.jsx)
Premium splash page animation displayed upon first loading the app.

#### [NEW] [frontend/src/components/Navbar.jsx](file:///c:/Users/Dinesh/OneDrive/Desktop/Portfolio/frontend/src/components/Navbar.jsx)
Sticky, glassmorphism navbar header with interactive scroll sections and navigation. Includes indicator for active sections.

#### [NEW] [frontend/src/components/Hero.jsx](file:///c:/Users/Dinesh/OneDrive/Desktop/Portfolio/frontend/src/components/Hero.jsx)
High-end hero component featuring a subtle, abstract interactive background (SVG/canvas-based moving nodes, strictly non-neon, elegant), corporate typography, and CTA buttons.

#### [NEW] [frontend/src/components/About.jsx](file:///c:/Users/Dinesh/OneDrive/Desktop/Portfolio/frontend/src/components/About.jsx)
Displays profile description using a card-style grid structure with statistics (years in CS, projects built, learning badges).

#### [NEW] [frontend/src/components/Skills.jsx](file:///c:/Users/Dinesh/OneDrive/Desktop/Portfolio/frontend/src/components/Skills.jsx)
Displays skills categorized (Languages, Frontend, Backend, Databases, Tools) on premium animated hover cards, complete with visual progress metrics and icons.

#### [NEW] [frontend/src/components/Education.jsx](file:///c:/Users/Dinesh/OneDrive/Desktop/Portfolio/frontend/src/components/Education.jsx)
Vertical, interactive timeline highlighting Dinesh's academic trajectory (B.Tech, Intermediate, SSC) using neat step nodes.

#### [NEW] [frontend/src/components/Internship.jsx](file:///c:/Users/Dinesh/OneDrive/Desktop/Portfolio/frontend/src/components/Internship.jsx)
Clean card highlighting IBM SkillsBuild virtual internship, displaying the key focus areas (AI, ML, LLM, RAG, Agentic AI) as tags.

#### [NEW] [frontend/src/components/Projects.jsx](file:///c:/Users/Dinesh/OneDrive/Desktop/Portfolio/frontend/src/components/Projects.jsx)
Featured project display (EcoShare AI) with detailed features, tech badges, external demo & code links, alongside grid cards for additional projects with filtering controls (All, Java, Python/AI, Other).

#### [NEW] [frontend/src/components/Certifications.jsx](file:///c:/Users/Dinesh/OneDrive/Desktop/Portfolio/frontend/src/components/Certifications.jsx)
Clean grid layout of clickable credentials linking to external validation pages (Credly, WISER).

#### [NEW] [frontend/src/components/Achievements.jsx](file:///c:/Users/Dinesh/OneDrive/Desktop/Portfolio/frontend/src/components/Achievements.jsx)
Structured display highlighting Dinesh's achievements (Karate champion, technical quiz winner, federated learning research paper) using premium icons.

#### [NEW] [frontend/src/components/Contact.jsx](file:///c:/Users/Dinesh/OneDrive/Desktop/Portfolio/frontend/src/components/Contact.jsx)
Professional feedback interface. Includes a layout with general coordinates (email, phone, github, linkedin) alongside an interactive contact message form that submits to the FastAPI endpoint.

#### [NEW] [frontend/src/components/Footer.jsx](file:///c:/Users/Dinesh/OneDrive/Desktop/Portfolio/frontend/src/components/Footer.jsx)
Elegant footer containing copyright info, design credits, and social icons.

#### [NEW] [frontend/src/pages/Home.jsx](file:///c:/Users/Dinesh/OneDrive/Desktop/Portfolio/frontend/src/pages/Home.jsx)
Combines all portfolio section components together, implementing scroll indicators, back-to-top buttons, and loading screen integration.

#### [NEW] [frontend/src/pages/Admin.jsx](file:///c:/Users/Dinesh/OneDrive/Desktop/Portfolio/frontend/src/pages/Admin.jsx)
Secure route layout showing a clean admin panel for reading contact messages and editing project entries (creating new, editing properties, deleting).

#### [NEW] [frontend/src/pages/NotFound.jsx](file:///c:/Users/Dinesh/OneDrive/Desktop/Portfolio/frontend/src/pages/NotFound.jsx)
Sleek 404 page that matches the corporate design, allowing routing recovery back to the homepage.

---

## Verification Plan

### Automated Tests
- Test Python backend APIs: run automated sanity script checking `GET /api/projects` and `POST /api/contacts`.
- Lint and check frontend React compilation: run `npm run build` locally inside the `frontend` folder to guarantee production-ready status.

### Manual Verification
- Launch the backend using `uvicorn main:app` and verify output console logs.
- Launch the frontend using `npm run dev` and navigate the interface using the browser, testing:
  - Responsive screen adjustment (mobile responsiveness).
  - Navigation smooth-scrolling behavior.
  - Submitting contact form and validating error/success states.
  - Dynamic skill animations.
  - Logging in as Admin, editing/adding a project, and verifying changes immediately update on the homepage list.
