from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.exception_handlers import request_validation_exception_handler
from fastapi.exceptions import RequestValidationError, ResponseValidationError
from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend
from redis import asyncio as aioredis
from starlette.middleware.cors import CORSMiddleware

from api import router as router_v1
from core import logger, settings
from db import init_db


@asynccontextmanager
async def lifespan(app: FastAPI):
    redis = await aioredis.from_url("redis://redis:6377", encoding="utf-8")
    FastAPICache.init(RedisBackend(redis), prefix="fastapi-cache")
    await init_db()
    yield


app = FastAPI(lifespan=lifespan)


@logger.catch
@app.exception_handler(ResponseValidationError)
async def validation_exception_handler(request, exc):
    logger.error(exc)
    return await request_validation_exception_handler(request, exc)


@logger.catch
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    logger.error(exc)
    return await request_validation_exception_handler(request, exc)


app.include_router(router=router_v1, prefix=settings.api_v1_prefix)
origins = ["https://cosmetic.tesseractmaks.tech"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
