from fastapi import APIRouter
from .api_v1.endpoints.user import router as user_router

from .api_v1.endpoints.product import router as product_router
from .api_v1.endpoints.tag import router as tag_router
from .api_v1.endpoints.category import router as category_router
from .api_v1.endpoints.order import router as order_router


router = APIRouter()
router_token = APIRouter()
router.include_router(router=user_router, prefix="/users")
router.include_router(router=product_router, prefix="/products")
router.include_router(router=tag_router, prefix="/tags")
router.include_router(router=category_router, prefix="/categories")
router.include_router(router=order_router, prefix="/orders")
