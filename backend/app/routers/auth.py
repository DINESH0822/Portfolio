from datetime import timedelta
from fastapi import APIRouter, HTTPException, Depends, status
from app.models import AdminLogin, Token
from app.auth import verify_password, create_access_token, get_current_admin
from app.config import settings

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

@router.post("/login", response_model=Token)
async def login(login_data: AdminLogin):
    # Verify username matching
    if login_data.username != settings.admin_username:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Verify password matching
    if not verify_password(login_data.password, settings.admin_password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create Access Token
    access_token_expires = timedelta(minutes=settings.access_token_expire_minutes)
    access_token = create_access_token(
        data={"sub": login_data.username}, expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/verify")
async def verify_token(current_admin: str = Depends(get_current_admin)):
    """
    Utility endpoint for the React frontend to check if current token in storage is valid.
    """
    return {"valid": True, "username": current_admin}
