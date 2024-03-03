import uuid

from models.product import Product
from schemas import (
    ProductCreateSchema,
    ProductSchema,
    ProductUpdatePartialSchema,
    ProductUpdateSchema,
)
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncResult, AsyncSession
from sqlalchemy.orm import selectinload


async def read_product_db(session: AsyncSession) -> list[ProductSchema]:
    query = (
        select(Product)
        .order_by(Product.id)
        .options(selectinload(Product.tags_assoc), selectinload(Product.category_assoc))
    )
    result: AsyncResult = await session.execute(query)
    products = result.unique().scalars().all()
    return list(products)


async def read_products_by_tag_db(
    session: AsyncSession, tag_title: str
) -> ProductSchema | None:
    stmt = (
        select(Product)
        .where(Product.tags_assoc.title == tag_title)
        .options(selectinload(Product.tags_assoc), selectinload(Product.category_assoc))
    )

    result: AsyncResult = await session.execute(stmt)
    products = result.unique().scalars().all()
    return list(products)


async def read_products_by_category_db(
    session: AsyncSession, category_title: str
) -> ProductSchema | None:
    stmt = (
        select(Product)
        .where(Product.category_assoc.title == category_title)
        .options(selectinload(Product.category_assoc), selectinload(Product.tags_assoc))
    )
    result: AsyncResult = await session.execute(stmt)
    products = result.unique().scalars().all()
    return list(products)


async def read_product_by_id_db(
    session: AsyncSession, product_id: uuid.uuid4
) -> ProductSchema | None:
    return await session.get(Product, product_id)


async def create_product_db(
    session: AsyncSession,
    product_in: ProductCreateSchema,
) -> Product:
    product_obj = product_in.model_dump()
    product = Product(**product_obj)
    session.add(product)
    await session.commit()
    return product


async def update_product_db(
    session: AsyncSession,
    product: ProductSchema,
    product_update: ProductUpdateSchema | ProductUpdatePartialSchema,
    partial: bool = False,
) -> ProductSchema:
    for name, value in product_update.model_dump(exclude_unset=partial).items():
        setattr(product, name, value)
    await session.commit()
    return product


async def delete_product_db(session: AsyncSession, product: ProductSchema) -> None:
    await session.delete(product)
    await session.commit()
