from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from .database.db import engine, get_async_session
from .models import user, message 
from .routes import user as user_routes
from .routes import message as message_routes


import logging
logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO) 

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_routes.router)
app.include_router(message_routes.router)

@app.get("/")
def home():
    return {"message": "Application running"}

@app.on_event("startup")
async def startup_event():
    async with engine.begin() as conn:
        await conn.run_sync(user.Base.metadata.create_all)
        await conn.run_sync(message.Base.metadata.create_all)

@app.on_event("shutdown")
async def shutdown_event():
    await engine.dispose()
