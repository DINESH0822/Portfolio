# Recruiter-Focused Full Stack Developer Portfolio

This portfolio is deployed as a frontend-only application using Vercel and Web3Forms for contact form delivery. The complete FastAPI backend with JWT authentication, MongoDB Atlas integration, CRUD APIs and Admin Panel remains inside this repository to demonstrate Full Stack Development skills.

## 🌐 Live Demo

**Portfolio:** https://portfolio-red-delta-99.vercel.app/

**GitHub Repository:** https://github.com/DINESH0822/Portfolio

---

## 🚀 Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- Framer Motion
- React Router
- Native Fetch API

### Backend
- Python
- FastAPI
- JWT Authentication
- MongoDB Atlas

### Deployment
- Vercel

### Contact Service
- Web3Forms

---

## 🌟 Key Features

- **Interactive Canvas Background**: Features a custom particle network background on the Hero section responding to mouse movements.
- **Dynamic Skills Board**: Lists technical proficiencies categorized by role (Languages, Frontend, Backend, Databases, and Tools) with animated loaders.
- **Vertical Education Timeline**: Displays educational history and academic highlights along an animated timeline path.
- **Virtual Internship Showcase**: Highlights AI/ML internship credentials in collaboration with IBM SkillsBuild, AICTE, and 1M1B.
- **Project Grid with Custom SVG Mockups**: Showcases built projects using customized corporate SVGs representing dashboard systems, database diagrams, LAN network setups, and security complex indexes.
- **Secure Admin Panel**: Access the dashboard at `/admin` (Default: `admin` / `admin123`) to list contact inquiries and carry out CRUD operations on showcased projects.
- **Responsive Layout**: Designed to adapt perfectly to all desktop, tablet, and mobile screens.

---

## 📂 Project Structure

```
├── backend/
│   ├── app/
│   │   ├── app/main.py             # FastAPI Server Bootloader & CORS
│   │   ├── app/config.py           # Configuration Loaders & Validators
│   │   ├── app/database.py         # MongoDB Connector & Fallback Mock DB
│   │   ├── app/models.py           # Pydantic Schemas for Validation
│   │   ├── app/auth.py             # JWT & Password Hash Utilities
│   │   └── app/routers/            # API Route Managers (auth, projects, contacts)
│   ├── .env.example                # Template for Environment Configuration
│   ├── requirements.txt            # Backend Python Dependencies
│   └── venv/                       # Local Python Virtual Environment
└── frontend/
    ├── src/
    │   ├── components/             # Layout components (Navbar, Hero, Skills, etc.)
    │   ├── context/                # AuthContext providing global session state
    │   ├── pages/                  # Route Pages (Home, Admin, NotFound)
    │   ├── index.css               # Global custom styles and keyframe definitions
    │   └── main.jsx                # React Entry Point
    ├── tailwind.config.js          # Tailwind Tokens & Theme Configuration
    └── package.json                # Frontend package dependencies
```

---

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v18+)
- Python (v3.10+)
- Git

---

### Step 1: Clone the Repository
```bash
git clone https://github.com/DINESH0822/Portfolio.git
cd Portfolio
```

### Step 2: Configure the Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create your virtual environment:
   ```bash
   python -m venv venv
   ```
3. Activate the virtual environment:
   - **On Windows (PowerShell)**:
     ```powershell
     .\venv\Scripts\Activate.ps1
     ```
   - **On macOS/Linux**:
     ```bash
     source venv/bin/activate
     ```
4. Install python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
5. Set up environment variables. Create a `.env` file in the `backend/` directory:
   ```env
   PORT=8000
   HOST=127.0.0.1
   MONGODB_URI=your_mongodb_atlas_connection_string
   DB_NAME=portfolio_db
   JWT_SECRET=generate_a_random_jwt_secret_hex
   ACCESS_TOKEN_EXPIRE_MINUTES=60
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD_HASH=bcrypt_hashed_password
   ```
   *Note: If no `MONGODB_URI` is provided, the backend will issue a startup warning and fallback to an in-memory database to allow project evaluation.*

6. Start the FastAPI development server:
   ```bash
   uvicorn app.main:app --reload
   ```
   The backend API documentation will be available at [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs).

---

### Step 3: Configure the Frontend
1. Open a new terminal window in the root directory, then navigate to `frontend/`:
   ```bash
   cd frontend
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `frontend/` directory to configure the Web3Forms key:
   ```env
   VITE_WEB3FORMS_KEY=YOUR_ACCESS_KEY
   ```
4. Start the Vite dev server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser to view the application!

---

## 🔒 Administrative Testing

- **Dashboard Page**: Navigate to [http://localhost:5173/admin](http://localhost:5173/admin)
- **Default Credentials**: 
  - **Username**: `admin`
  - **Password**: `admin123`
- Inside the portal, you can view submitted messages from the contact form, create new project listings, edit details, or remove projects.

---

## 🌐 Deployment

Frontend:
- Vercel
- https://portfolio-red-delta-99.vercel.app/

Contact Form:
- Web3Forms

Backend:
- FastAPI backend source code is included in this repository for demonstration purposes.
- Backend is intentionally not deployed publicly.
