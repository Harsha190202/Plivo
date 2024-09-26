from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.future import select
from ..schemas.user import UserCreate, User
from ..database.db import get_async_session  
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter()

@router.post("/signup", response_model=User)
async def create_user(user: UserCreate, session: AsyncSession = Depends(get_async_session)):
    
    query = select(User).where(User.email == user.email)
    existing_user = await session.execute(query)
    existing_user = existing_user.scalar_one_or_none()
    
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    
    new_user = User(**user.dict())
    session.add(new_user)
    await session.commit()  
    await session.refresh(new_user)  
    
    return new_user

@router.post("/signin")
async def sign_in(user: UserCreate, session: AsyncSession = Depends(get_async_session)):
    query = select(User).where(User.email == user.email, User.password == user.password)
    existing_user = await session.execute(query)
    existing_user = existing_user.scalar_one_or_none()
    
    if not existing_user:
        raise HTTPException(status_code=400, detail="Invalid email or password")
    
    return {"message": "Sign-in successful", "user_id": existing_user.id}
