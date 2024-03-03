import uuid

from models.category import Category
from schemas import (
    CategoryCreateSchema,
    CategorySchema,
    CategoryUpdatePartialSchema,
    CategoryUpdateSchema,
)
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncResult, AsyncSession
from sqlalchemy.orm import selectinload


async def read_category_db(session: AsyncSession) -> list[CategorySchema]:
    query = (
        select(Category)
        .order_by(Category.id)
        .options(selectinload(Category.products_assoc))
    )
    result: AsyncResult = await session.execute(query)
    categories = result.unique().scalars().all()
    return list(categories)


async def read_category_by_title_db(
    session: AsyncSession, category_title: str
) -> CategorySchema | None:
    query = (
        select(Category)
        .where(Category.title == category_title)
        .options(selectinload(Category.products_assoc))
    )
    result: AsyncResult = await session.execute(query)
    category = result.unique().scalar()
    return category


async def read_category_by_id_db(
    session: AsyncSession, category_id: uuid.uuid4
) -> CategorySchema | None:
    return await session.get(Category, category_id)


async def create_category_db(
    session: AsyncSession,
    category_in: CategoryCreateSchema,
) -> Category:
    category_obj = category_in.model_dump()
    category = Category(**category_obj)
    session.add(category)
    await session.commit()
    return category


async def update_category_db(
    session: AsyncSession,
    category: CategorySchema,
    category_update: CategoryUpdateSchema | CategoryUpdatePartialSchema,
    partial: bool = False,
) -> CategorySchema:
    for name, value in category_update.model_dump(exclude_unset=partial).items():
        setattr(category, name, value)
    await session.commit()
    return category


async def delete_category_db(session: AsyncSession, category: CategorySchema) -> None:
    await session.delete(category)
    await session.commit()
