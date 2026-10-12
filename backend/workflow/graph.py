from typing import TypedDict, Literal, Optional, List
from langgraph.graph import StateGraph, START, END
from langchain_openai import ChatOpenAI
from pydantic import BaseModel, Field
import os

# 1. Define State Schema
class DukaState(TypedDict):
    raw_input: str
    business_id: int
    session_id: int
    intent: Optional[str]
    extracted_data: Optional[dict]
    db_status: Optional[str]
    response_message: str

# 2. Define Structured Output Parser for LLM
class ParsedIntent(BaseModel):
    intent: Literal["START_DAY", "RECORD_SALE", "RECORD_EXPENSE", "TRANSFORM_STOCK", "RECORD_DEBT", "PAY_DEBT", "END_DAY"] = Field(
        description="The primary action category determined from user speech."
    )
    payment_method: Optional[Literal["CASH", "MOBILE_MONEY"]] = Field(default="CASH")
    customer_name: Optional[str] = None
    item_name: Optional[str] = None
    quantity: Optional[float] = Field(default=1.0)
    unit_price: Optional[float] = Field(default=0.0)
    total_amount: float = Field(default=0.0)
    raw_summary: str

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0) # Or compatible LLM provider configured with free/low-cost tier
structured_llm = llm.with_structured_output(ParsedIntent)

# 3. Node 1: Intent Routing & Parsing Node
def parse_input_node(state: DukaState):
    prompt = f"""
    You are an intelligent bookkeeper assistant for Kenyan MSMEs handling Swahili, Sheng, and English mixed speech.
    Analyze this message: "{state['raw_input']}"
    Extract the transaction details accurately.
    """
    result: ParsedIntent = structured_llm.invoke(prompt)
    return {
        "intent": result.intent,
        "extracted_data": result.model_dump(),
        "response_message": f"Parsed intent: {result.intent} successfully."
    }

# 4. Node 2: Database Persistence & Reconciler Node
def db_persistence_node(state: DukaState):
    data = state["extracted_data"]
    intent = state["intent"]
    
    # Here you connect to Supabase PostgreSQL using SQLModel and commit records based on intent
    # e.g., if intent == "RECORD_DEBT", write to `debts` table.
    # if intent == "PAY_DEBT", search pending debts by customer_name, settle balance, and log transaction.
    
    persistence_note = f"Successfully committed {intent} for session {state['session_id']} into PostgreSQL."
    return {
        "db_status": "COMMITTED",
        "response_message": persistence_note
    }

# 5. Build and Compile LangGraph Workflow
workflow = StateGraph(DukaState)
workflow.add_node("parse_input", parse_input_node)
workflow.add_node("persist_db", db_persistence_node)

workflow.add_edge(START, "parse_input")
workflow.add_edge("parse_input", "persist_db")
workflow.add_edge("persist_db", END)

duka_app = workflow.compile()