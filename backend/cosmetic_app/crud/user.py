import uuid

from sqlalchemy import select
from sqlalchemy.engine import Result
from sqlalchemy.ext.asyncio import AsyncSession

from models.user import UserModel
from schemas import (
    UserSchema,
    UserUpdateSchema,
    UserCreateSchema,
    UserUpdatePartialSchema,
)


async def read_user_db(session: AsyncSession) -> list[UserSchema]:
    query = select(UserModel).order_by(UserModel.id)
    result: Result = await session.execute(query)
    users = result.scalars().all()
    return list(users)


async def read_user_by_id_db(session: AsyncSession, user_id: uuid.uuid4) -> UserSchema | None:
    return await session.get(UserModel, user_id)


async def create_user_db(
        session: AsyncSession,
        user_in: UserCreateSchema,
) -> UserModel:
    user_obj = user_in.model_dump()
    user = UserModel(**user_obj)
    session.add(user)
    await session.commit()
    return user


async def update_user_db(
        session: AsyncSession,
        user: UserSchema,
        user_update: UserUpdateSchema | UserUpdatePartialSchema,
        partial: bool = False
) -> UserSchema:
    for name, value in user_update.model_dump(exclude_unset=partial).items():
        setattr(user, name, value)
    await session.commit()
    return user


async def delete_user_db(session: AsyncSession, user: UserSchema) -> None:
    await session.delete(user)
    await session.commit()
