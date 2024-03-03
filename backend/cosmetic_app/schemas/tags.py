from datetime import datetime

from pydantic import BaseModel, ConfigDict


class ProductSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    title: str
    link_detail: str
    price: int
    image: str
    label: str
    num_goods: str
    data_goods: str
    created_at: datetime
    updated_at: datetime | None = None


class TagSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    title: str


class TagResponseSchema(TagSchema):
    model_config = ConfigDict(from_attributes=True)
    products_assoc: list[ProductSchema]


class TagCreateSchema(TagSchema): ...


class TagUpdateSchema(TagSchema): ...


class TagUpdatePartialSchema(TagSchema):
    model_config = ConfigDict(from_attributes=True)
    title: str | None = None
