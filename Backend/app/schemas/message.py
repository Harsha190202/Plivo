from pydantic import BaseModel

class MessageCreate(BaseModel):
    userid: int
    sender_number: str
    receiver_number: str
    description: str

class Message(BaseModel):
    messageid: int
    sender_number: str
    userid: int
    receiver_number: str
    description: str

    class Config:
        orm_mode = True
