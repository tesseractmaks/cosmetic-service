from fastapi import Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from crud import (
    read_category_by_id_db,
    read_product_by_id_db,
    read_tag_by_id_db,
    read_user_by_id_db,
)
from db.db_helper import db_helper
from schemas import CategorySchema, ProductSchema, TagSchema, UserSchema


async def user_by_id(
    user_id: str, session: AsyncSession = Depends(db_helper.scoped_session_dependency)
) -> UserSchema:
    user = await read_user_by_id_db(session=session, user_id=user_id)
    if user is not None:
        return user
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="not found...")


async def product_by_id(
    product_id: str,
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> ProductSchema:
    product = await read_product_by_id_db(session=session, product_id=product_id)
    if product is not None:
        return product
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="not found...")


async def category_by_id(
    category_id: str,
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> CategorySchema:
    category = await read_category_by_id_db(session=session, category_id=category_id)
    if category is not None:
        return category
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="not found...")


async def tag_by_id(
    tag_id: str, session: AsyncSession = Depends(db_helper.scoped_session_dependency)
) -> TagSchema:
    tag = await read_tag_by_id_db(session=session, tag_id=tag_id)
    if tag is not None:
        return tag
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="not found...")
