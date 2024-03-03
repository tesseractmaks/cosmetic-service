import os
import sys
from os.path import dirname, join

from dotenv import load_dotenv
from loguru import logger
from pydantic_settings import BaseSettings

dotenv_path = join(dirname(__file__), ".env")
load_dotenv(dotenv_path)


class Settings(BaseSettings):
    db_url: str = (
        f"postgresql+asyncpg://{os.getenv('POSTGRES_USER')}:{os.getenv('POSTGRES_PASSWORD')}@{os.getenv('POSTGRES_HOST')}:5432/cosmetic_db"
    )
    api_v1_prefix: str = "/api/v1"
    db_username: str = os.getenv("POSTGRES_USER")
    db_password: str = os.getenv("POSTGRES_PASSWORD")
    db_name: str = "cosmetic_db"
    db_echo: bool = True


settings = Settings()

logger.add(
    sys.stdout,
    format="{time} {level} {message}",
    level="ERROR",
    serialize=True,
    backtrace=True,
    diagnose=True,
)
