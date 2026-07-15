import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    port: int = 8000
    host: str = "127.0.0.1"
    mongodb_uri: str = ""
    db_name: str = "portfolio_db"
    jwt_secret: str = "f3a8b275de18749cbe5d22f0ef1a0b321c238b1f09e6cf9b71e1d09e5ab7168d"
    access_token_expire_minutes: int = 60
    admin_username: str = "admin"
    # BCrypt hash of "admin123" by default
    admin_password_hash: str = "$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36KQUS7gbe2sc3gQeG5G6Ky"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        extra = "ignore"

# Force load .env from the root of backend if available
from pathlib import Path
env_path = Path(__file__).resolve().parent.parent / ".env"
if env_path.exists():
    from dotenv import load_dotenv
    load_dotenv(dotenv_path=env_path)

settings = Settings()
