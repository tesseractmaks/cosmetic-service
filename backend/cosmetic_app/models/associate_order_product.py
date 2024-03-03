from typing import TYPE_CHECKING

from db import Base
from sqlalchemy import ForeignKey, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

if TYPE_CHECKING:
    from models import Order


class AssociateOrderProduct(Base):
    __tablename__ = "associate_order_product"
    __table_args__ = (
        UniqueConstraint(
            "order_id",
            "product_id",
            name="idx_unique_o_p"
        ),
    )

    id: Mapped[int] = mapped_column(primary_key=True)
    order_id: Mapped[int] = mapped_column(ForeignKey("orders.id"), nullable=False)
    product_id: Mapped[int] = mapped_column(ForeignKey("products.id"), nullable=False)
    quantity: Mapped[int] = mapped_column(default=1, server_default="1")
    unit_price: Mapped[int] = mapped_column(default=0, server_default="0")
    image: Mapped[str] = mapped_column(default="", server_default="")
    total_price: Mapped[int] = mapped_column(default=0, server_default="0")
    order_assoc: Mapped["Order"] = relationship(back_populates="a_assoc")