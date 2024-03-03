__all__ = (
    "user_by_id",
    "category_by_id",
    "tag_by_id",
    "product_by_id",
    "get_consumer",
    "create_producer",
)

from .depends_endps import (
    user_by_id,
    category_by_id,
    tag_by_id,
    product_by_id,
)

from .kafka_utils import get_consumer, create_producer
