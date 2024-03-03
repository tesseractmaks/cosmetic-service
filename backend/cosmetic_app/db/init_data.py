import random

from faker import Faker
from models.category import Category
from models.gist import values_data
from models.product import Product
from sqlalchemy import insert, select
from sqlalchemy.ext.asyncio import AsyncResult
from sqlalchemy.orm import selectinload

from db.db_helper import db_helper
from models.user import UserModel

fake = Faker("ru_RU")


async def add_test_user(session):
    for i in range(1, 20):
        values_data = {
            "email": "one@mail.ru1",
            "password": fake.nic_handle(),
            "is_active": True,
        }
        await session.execute(insert(UserModel).values(values_data))
    await session.commit()


async def add_test_category(session):
    for i in [
        "Для губ",
        "Макияж",
        "Туалетная вода",
        "Уход за кожей",
        "Для ногтей",
        "Уход за волосами",
        "Новые",
    ]:
        values_cat = {
            "title": i,
        }
        new_cat = Category(**values_cat)
        session.add(new_cat)
    await session.commit()


async def add_test_tag(session):
    from models.tags import Tag

    for i in ["Для губ", "Для лица", "Для ресниц", "Макияж"]:
        values_tag = {
            "title": i,
        }

        new_tag = Tag(**values_tag)

        session.add(new_tag)
    await session.commit()


async def add_test_product(session):
    for value in values_data:
        new_product = Product(**value)
        session.add(new_product)
    await session.commit()


async def add_test_tag_category(session):
    from models.tags import Tag

    query_tag = select(Tag)
    res: AsyncResult = await session.execute(query_tag)
    tag_raw = res.unique().scalars().all()
    query_cat = select(Category)
    res: AsyncResult = await session.execute(query_cat)
    category_raw = res.unique().scalars().all()

    query = select(Product)
    result = await session.execute(query)
    products_raw = result.unique().scalars().all()

    for product in list(products_raw):
        product = await session.scalar(
            select(Product)
            .where(Product.id == product.id)
            .options(selectinload(Product.tags_assoc))
        )

        product.tags_assoc.append(random.choice(list(tag_raw)))
    for product in list(products_raw):
        product = await session.scalar(
            select(Product)
            .where(Product.id == product.id)
            .options(selectinload(Product.category_assoc))
        )
        product.category_assoc.append(random.choice(list(category_raw)))
    await session.commit()


async def add_test_order(session):
    from models.order import Order

    values_data = {
        "title": "one",
    }
    new_order = Order(**values_data)
    session.add(new_order)
    await session.commit()


async def add_test_order_products(session):
    from models.associate_order_product import AssociateOrderProduct
    from models.order import Order

    query = select(Order)
    result = await session.execute(query)
    order = result.unique().scalar()
    query = select(Product)
    result = await session.execute(query)
    product = result.unique().scalar()
    order = await session.scalar(
        select(Order)
        .where(Order.id == order.id)
        .options(selectinload(Order.products_assoc))
    )
    order.products_assoc.append(product)
    await session.commit()
    query = select(AssociateOrderProduct).where(
        AssociateOrderProduct.order_id == Order.id
    )
    result = await session.execute(query)
    ass_order = result.unique().scalar()
    ass_order.order_assoc.title = "two"
    ass_order.image = product.image
    ass_order.unit_price = product.price
    ass_order.quantity = 3
    ass_order.total_price = product.price * 3
    await session.commit()


async def add_test_data():
    async with db_helper.session_factory() as session:
        await add_test_user(session)
        await add_test_product(session)
        await add_test_category(session)
        await add_test_tag(session)
        await add_test_tag_category(session)
        await add_test_order(session)
        await add_test_order_products(session)
