from datetime import datetime, date
from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import Column, JSON

class Business(SQLModel, table=True):
    __tablename__ = "businesses"
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    context_type: str
    commission_type: str
    commission_rate: float = Field(default=0.0)
    created_at: datetime = Field(default_factory=datetime.utcnow)

    sessions: List["DailySession"] = Relationship(back_populates="business")

class DailySession(SQLModel, table=True):
    __tablename__ = "daily_sessions"
    id: Optional[int] = Field(default=None, primary_key=True)
    business_id: int = Field(foreign_key="businesses.id")
    date: date = Field(default_factory=date.today)
    status: str = Field(default="OPEN")
    opening_cash: float = Field(default=0.0)
    opening_mobile_money: float = Field(default=0.0)
    closing_cash: Optional[float] = Field(default=None)
    closing_mobile_money: Optional[float] = Field(default=None)

    business: Optional[Business] = Relationship(back_populates="sessions")
    transactions: List["Transaction"] = Relationship(back_populates="session")
    debts: List["Debt"] = Relationship(back_populates="session")

class Transaction(SQLModel, table=True):
    __tablename__ = "transactions"
    id: Optional[int] = Field(default=None, primary_key=True)
    session_id: int = Field(foreign_key="daily_sessions.id")
    type: str  # 'SALE', 'EXPENSE', 'UTILITY', 'STOCK_PURCHASE', 'YIELD_TRANSFORM'
    payment_method: str  # 'CASH', 'MOBILE_MONEY'
    amount: float
    quantity: Optional[float] = Field(default=1.0)
    product_name: Optional[str] = None
    customer_name: Optional[str] = None
    commission_amount: float = Field(default=0.0)
    timestamp: datetime = Field(default_factory=datetime.utcnow)

    session: Optional[DailySession] = Relationship(back_populates="transactions")

class Debt(SQLModel, table=True):
    __tablename__ = "debts"
    id: Optional[int] = Field(default=None, primary_key=True)
    session_id: int = Field(foreign_key="daily_sessions.id")
    customer_name: str
    product_details: str
    total_amount: float
    balance_due: float
    status: str = Field(default="PENDING")  # 'PENDING', 'PAID'
    created_at: datetime = Field(default_factory=datetime.utcnow)

    session: Optional[DailySession] = Relationship(back_populates="session")