import json
import pickle

import redis
from fastapi import APIRouter, status, Depends, HTTPException
from kafka import KafkaProducer, KafkaConsumer
from sqlalchemy.ext.asyncio import AsyncSession

from core import logger
from crud.user import read_user_db, update_user_db, create_user_db, delete_user_db
from db.db_helper import db_helper
from schemas import (
    UserSchema,
    UserCreateSchema,
    UserUpdateSchema,
    UserUpdatePartialSchema,
    UserResponseSchema,
)
from .depends_endps import user_by_id

router = APIRouter(tags=["User"])


def redis_cache(res_raw=None):
    red = redis.Redis(host="redis", port=6379, decode_responses=True, encoding="utf-8")

    x = red.lrange("users", 0, -1)
    return x


async def get_consumer():
    consumer = KafkaConsumer(
        "users",
        auto_offset_reset="earliest",
        bootstrap_servers=["kafka:9092"],
        api_version=(0, 10),
        max_poll_records=1000,
    )

    for records in consumer:
        record = pickle.loads(records.value)
        if consumer is not None:
            consumer.close()
        return record


async def send_producer(value_raw, topic_name="users"):
    kafka_producer = KafkaProducer(
        bootstrap_servers=["kafka:9092"], api_version=(0, 10)
    )
    value = pickle.dumps(value_raw)
    try:
        kafka_producer.send(topic_name, value=value)
        kafka_producer.flush()
    except Exception as exc:
        print(str(exc))
    if kafka_producer is not None:
        kafka_producer.close()


def parse_response(response_raw):
    e = []

    for i in response_raw:
        a = i.__dict__.copy()
        x = i.profile.__dict__.copy()
        a.__delitem__("_sa_instance_state")
        x.__delitem__("_sa_instance_state")
        a.__delitem__("profile")
        a["updated_at"] = str(a["updated_at"])
        a["created_at"] = str(a["created_at"])
        a["id"] = str(a["id"])
        x["updated_at"] = str(x["updated_at"])
        x["created_at"] = str(x["created_at"])
        x["id"] = str(x["id"])
        x["user_id"] = str(x["user_id"])
        data = {"user": a, "profile": x}
        e.append(data)
    return json.dumps(e)


@logger.catch
@router.get(
    "/",
)
async def read_users(
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
):
    response = await read_user_db(session=session)
    if response is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            headers={"X-Error": "Url format wrong"},
        )

    return response


@logger.catch
@router.get("/{user_id}/", response_model=UserResponseSchema)
async def read_user_by_id(user: UserSchema = Depends(user_by_id)):
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            headers={"X-Error": "Url format wrong"},
        )
    return user


@logger.catch
@router.post("/", response_model=UserCreateSchema, status_code=status.HTTP_201_CREATED)
async def create_user(
    user_in: UserCreateSchema,
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
):
    if user_in is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            headers={"X-Error": "Empty data"},
        )
    return await create_user_db(session=session, user_in=user_in)


@logger.catch
@router.put(
    "/{user_id}",
)
async def update_user(
    user_update: UserUpdateSchema,
    user: UserSchema = Depends(user_by_id),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
):
    if user_update is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            headers={"X-Error": "Empty data"},
        )
    return await update_user_db(
        session=session,
        user=user,
        user_update=user_update,
    )


@logger.catch
@router.patch(
    "/{user_id}",
)
async def update_user_partial(
    user_update: UserUpdatePartialSchema,
    user: UserSchema = Depends(user_by_id),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
):
    if user_update is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            headers={"X-Error": "Empty data"},
        )

    return await update_user_db(
        session=session, user=user, user_update=user_update, partial=True
    )


@logger.catch
@router.delete("/{user_id}/", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(
    user: UserSchema = Depends(user_by_id),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> None:
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            headers={"X-Error": "Url format wrong"},
        )
    await delete_user_db(user=user, session=session)
