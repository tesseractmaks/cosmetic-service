from typing import TYPE_CHECKING

from db import Base
from sqlalchemy.orm import Mapped, relationship

if TYPE_CHECKING:
    from models import Product


class Category(Base):
    __tablename__ = "categories"
    title: Mapped[str]
    products_assoc: Mapped[list["Product"]] = relationship(
        secondary="associate_categories", back_populates="category_assoc"
    )

    def __str__(self):
        return f"{self.__class__.__name__}, title={self.title}"

    def __repr__(self):
        return str(self)
