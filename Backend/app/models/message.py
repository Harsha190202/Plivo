from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from ..database.db import Base

class Message(Base):
    __tablename__ = "messages"

    messageid = Column(Integer, primary_key=True, index=True)
    userid = Column(Integer, ForeignKey("users.id"))
    description = Column(String)
    sender_number = Column(String)
    receiver_number = Column(String)

    user = relationship("User")
