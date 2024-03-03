from datetime import datetime
from typing import TYPE_CHECKING

from db import Base
from sqlalchemy import text
from sqlalchemy.orm import Mapped, mapped_column, relationship

if TYPE_CHECKING:
    from models import Category, Order, Tag


class Product(Base):
    title: Mapped[str]
    link_detail: Mapped[str]
    price: Mapped[int]
    image: Mapped[str]
    label: Mapped[str] = mapped_column(nullable=True)
    num_goods: Mapped[str]
    data_goods: Mapped[str]
    created_at: Mapped[datetime] = mapped_column(
        server_default=text("TIMEZONE('utc', now())")
    )
    updated_at: Mapped[datetime] = mapped_column(
        server_default=text("TIMEZONE('utc', now())"), onupdate=datetime.utcnow
    )

    tags_assoc: Mapped[list["Tag"]] = relationship(
        secondary="associate_tags", back_populates="products_assoc"
    )
    category_assoc: Mapped[list["Category"]] = relationship(
        secondary="associate_categories", back_populates="products_assoc"
    )
    order_assoc: Mapped[list["Order"]] = relationship(
        secondary="associate_order_product", back_populates="products_assoc"
    )

    def __str__(self):
        return f"{self.__class__.__name__}, title={self.title}, price={self.price}"

    def __repr__(self):
        return str(self)
