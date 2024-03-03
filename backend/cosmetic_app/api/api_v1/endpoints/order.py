import aiohttp
from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    Request,
    Response,
    WebSocketException,
    status,
)
from fastapi.websockets import WebSocket, WebSocketDisconnect
from sqlalchemy.ext.asyncio import AsyncSession

from api.api_v1.endpoints import get_consumer
from core import logger
from crud import create_order_db
from db import db_helper
from schemas import OrderResponseSchema, ProductCreateSchema

router = APIRouter(tags=["Order"])


async def get_links(client: aiohttp.ClientSession, link):
    try:
        async with client.get(url=link) as response:
            return {"data": "12332312"}
    except Exception:
        pass


@logger.catch
@router.get(
    "/",
)
async def create_producers_order(
    topics: str,
    request: Request,
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
):
    if topics is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            headers={"X-Error": "Url format wrong"},
        )

    for topic in topics.split(","):
        value = {
            "topic": str(topic),
            "host": str(request.client.host),
        }


class ConnectionManager:
    def __init__(self):
        self.active_connection: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connection.append(websocket)

    async def disconnect(self, websocket: WebSocket):
        self.active_connection.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        for connection in self.active_connection:
            await connection.send_text(message)


manager = ConnectionManager()


@logger.catch
@router.websocket("/ws/{client_id}")
async def websocket_endpoint(
    websocket: WebSocket,
    client_id: str,
):
    if client_id is None:
        raise WebSocketException(code=status.WS_1008_POLICY_VIOLATION)

    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.broadcast(f"Topic {client_id} -- {data}")
    except WebSocketDisconnect:
        await manager.disconnect(websocket)


@logger.catch
@router.get(
    "/topic/{topic}/",
)
async def get_consumer_order(
    response: Response,
    topic: str = None,
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
):
    if topic is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            headers={"X-Error": "Url format wrong"},
        )
    record = get_consumer(topic)


@logger.catch
@router.get(
    "/topic/event",
)
async def get_consumer_order(
    response: Response,
    topic: str = None,
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
):
    if response is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            headers={"X-Error": "Url format wrong"},
        )
    response.headers["Content-Type"] = "text/event-stream"
    return {"data": "response"}


@logger.catch
@router.post(
    "/", response_model=OrderResponseSchema, status_code=status.HTTP_201_CREATED
)
async def create_order(
    order_in: ProductCreateSchema,
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
):
    if order_in is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            headers={"X-Error": "Empty data"},
        )
    return await create_order_db(session=session, order_in=order_in)
