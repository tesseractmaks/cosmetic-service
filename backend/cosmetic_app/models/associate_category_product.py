from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from db import Base


class AssociateCategoryProduct(Base):
    __tablename__ = "associate_categories"

    id: Mapped[int] = mapped_column(primary_key=True)
    category_id: Mapped[int] = mapped_column(
        ForeignKey("categories.id"), nullable=False
    )
    product_id: Mapped[int] = mapped_column(ForeignKey("products.id"), nullable=False)
