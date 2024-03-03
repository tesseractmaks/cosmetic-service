from datetime import datetime

from pydantic import BaseModel, ConfigDict


class OrderSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    title: str
    created_at: datetime
    updated_at: datetime | None = None


class OrderResponseSchema(OrderSchema):
    model_config = ConfigDict(from_attributes=True)
    ...


class OrderCreateSchema(OrderSchema):
    model_config = ConfigDict(from_attributes=True)
    ...


class OrderUpdateSchema(OrderSchema):
    model_config = ConfigDict(from_attributes=True)
    ...


class OrderUpdatePartialSchema(OrderSchema):
    model_config = ConfigDict(from_attributes=True)
    ...
