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


class CategorySchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    title: str


class CategoryResponseSchema(CategorySchema):
    model_config = ConfigDict(from_attributes=True)
    products_assoc: list[ProductSchema]


class CategoryCreateSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    title: str


class CategoryUpdateSchema(BaseModel): ...


class CategoryUpdatePartialSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    title: str | None = None
