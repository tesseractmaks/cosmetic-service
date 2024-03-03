from db import Base
from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column


class AssociateTagProduct(Base):
    __tablename__ = "associate_tags"
    id: Mapped[int] = mapped_column(primary_key=True)
    tag_id: Mapped[int] = mapped_column(ForeignKey("tags.id"), nullable=False)
    product_id: Mapped[int] = mapped_column(ForeignKey("products.id"), nullable=False)
