from typing import TYPE_CHECKING

from db.base_class import Base
from sqlalchemy.orm import Mapped, relationship

if TYPE_CHECKING:
    from models import Product


class Tag(Base):
    title: Mapped[str]
    products_assoc: Mapped[list["Product"]] = relationship(
        secondary="associate_tags", back_populates="tags_assoc"
    )

    def __str__(self):
        return f"{self.__class__.__name__}, title={self.title}"

    def __repr__(self):
        return str(self)
