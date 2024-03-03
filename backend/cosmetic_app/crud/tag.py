import uuid

from models.tags import Tag
from schemas import TagCreateSchema, TagSchema, TagUpdatePartialSchema, TagUpdateSchema
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncResult, AsyncSession
from sqlalchemy.orm import selectinload


async def read_tag_db(session: AsyncSession) -> list[TagSchema]:
    query = select(Tag).order_by(Tag.id).options(selectinload(Tag.products_assoc))
    result: AsyncResult = await session.execute(query)
    tags = result.unique().scalars().all()
    return list(tags)


async def read_tag_by_title_db(
    session: AsyncSession, tag_title: str
) -> TagSchema | None:
    query = (
        select(Tag)
        .where(Tag.title == tag_title)
        .options(selectinload(Tag.products_assoc))
    )
    result: AsyncResult = await session.execute(query)
    tag = result.unique().scalar()
    return tag


async def read_tag_by_id_db(
    session: AsyncSession, tag_id: uuid.uuid4
) -> TagSchema | None:
    return await session.get(Tag, tag_id)


async def create_tag_db(
    session: AsyncSession,
    tag_in: TagCreateSchema,
) -> Tag:
    tag_obj = tag_in.model_dump()
    tag = Tag(**tag_obj)
    session.add(tag)
    await session.commit()
    return tag


async def update_tag_db(
    session: AsyncSession,
    tag: TagSchema,
    tag_update: TagUpdateSchema | TagUpdatePartialSchema,
    partial: bool = False,
) -> TagSchema:
    for name, value in tag_update.model_dump(exclude_unset=partial).items():
        setattr(tag, name, value)
    await session.commit()
    return tag


async def delete_tag_db(session: AsyncSession, tag: TagSchema) -> None:
    await session.delete(tag)
    await session.commit()
