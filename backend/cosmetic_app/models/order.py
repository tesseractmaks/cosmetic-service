from datetime import datetime
from typing import TYPE_CHECKING

from db import Base
from sqlalchemy import text
from sqlalchemy.orm import Mapped, mapped_column, relationship

if TYPE_CHECKING:
    from models import Product


class Order(Base):
    from models.associate_order_product import AssociateOrderProduct

    title: Mapped[str]
    created_at: Mapped[datetime] = mapped_column(
        server_default=text("TIMEZONE('utc', now())")
    )
    updated_at: Mapped[datetime] = mapped_column(
        server_default=text("TIMEZONE('utc', now())"), onupdate=datetime.utcnow
    )

    products_assoc: Mapped[list["Product"]] = relationship(
        secondary="associate_order_product", back_populates="order_assoc"
    )
    a_assoc: Mapped[list["AssociateOrderProduct"]] = relationship(
        back_populates="order_assoc"
    )

    def __str__(self):
        return f"{self.__class__.__name__}, title={self.title}"

    def __repr__(self):
        return str(self)
