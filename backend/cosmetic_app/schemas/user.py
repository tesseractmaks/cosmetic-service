from datetime import datetime
from uuid import UUID, uuid4

from pydantic import BaseModel, ConfigDict, Field


class UserSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    email: str
    password: str
    is_active: bool
    created_at: datetime
    updated_at: datetime | None = None


class UserResponseSchema(UserSchema):
    id: UUID = Field(default_factory=uuid4)


class UserCreateSchema(UserSchema): ...


class UserUpdateSchema(UserSchema): ...


class UserUpdatePartialSchema(UserSchema):
    id: UUID | None = None
    email: str | None = None
    password: str | None = None
    is_active: bool | None = None
    created_at: datetime | None = None
    updated_at: datetime | None = None
