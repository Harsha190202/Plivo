from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import SQLAlchemyError
from typing import Optional
from ..schemas.message import MessageCreate, Message as MessageResponse  
from ..models.message import Message as MessageModel
from ..database.db import get_async_session
from sqlalchemy import and_

router = APIRouter()

@router.post("/create", response_model=MessageResponse)
async def create_message(message: MessageCreate, session: AsyncSession = Depends(get_async_session)):
    new_message = MessageModel(**message.dict())
    
    try:
        session.add(new_message)
        await session.commit()
        await session.refresh(new_message)
    except SQLAlchemyError as e:
        await session.rollback()
        raise HTTPException(status_code=500, detail="Could not create message, please try again.")
    
    return new_message

@router.get("/get/messages/{account_id}", response_model=list[MessageResponse])
async def get_messages(account_id: int, session: AsyncSession = Depends(get_async_session)):
    query = select(MessageModel).where(MessageModel.userid == account_id)
    
    try:
        result = await session.execute(query)
        messages = result.scalars().all()
        
        if not messages:
            raise HTTPException(status_code=404, detail=f"No messages found for account ID {account_id} - Bad REquest")
        
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail="An error occurred while retrieving messages.")
    
    return messages

@router.get("/search", response_model=list[MessageResponse])
async def search_messages(
    message_id: Optional[str] = None, 
    sender_number: Optional[str] = None, 
    receiver_number: Optional[str] = None, 
    session: AsyncSession = Depends(get_async_session)
):
    filters = []
    
    if message_id:
        try:
            ids = list(map(int, message_id.split(",")))
            filters.append(MessageModel.messageid.in_(ids))
        except ValueError:
            raise HTTPException(status_code=400, detail="Message IDs must be integers.")

    if sender_number:
        numbers = sender_number.split(",")
        filters.append(MessageModel.sender_number.in_(numbers))

    if receiver_number:
        numbers = receiver_number.split(",")
        filters.append(MessageModel.receiver_number.in_(numbers))
    
    # if not filters:
    #     raise HTTPException(status_code=400, detail="At least one filter must be provided.")

    query = select(MessageModel).where(and_(*filters))
    
    try:
        result = await session.execute(query)
        messages = result.scalars().all()
        
        if not messages:
            raise HTTPException(status_code=404, detail="No messages found matching the search criteria.")
        
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail="An error occurred while searching for messages.")
    
    return messages
