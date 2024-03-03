from models.associate_order_product import AssociateOrderProduct
from models.order import Order
from schemas import OrderCreateSchema
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncResult, AsyncSession
from sqlalchemy.orm import selectinload


async def read_order_db(session: AsyncSession):
    query = select(AssociateOrderProduct).options(
        selectinload(AssociateOrderProduct.order_assoc)
    )
    result: AsyncResult = await session.execute(query)
    order = result.unique().scalar()
    return order.order_assoc.title


async def create_order_db(
    session: AsyncSession,
    order_in: OrderCreateSchema,
) -> Order:
    order_obj = order_in.model_dump()
    order = Order(**order_obj)
    session.add(order)
    await session.commit()
    return order
