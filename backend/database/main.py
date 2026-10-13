from fastapi import FastAPI, Request, Depends
from sqlmodel import Session
from database.db import get_session
from workflow.graph import duka_app
import os

app = FastAPI(title="SautiDuka LangGraph Gateway")

@app.get("/webhook")
async def verify_whatsapp(request: Request):
    hub_mode = request.query_params.get("hub.mode")
    hub_challenge = request.query_params.get("hub.challenge")
    hub_verify_token = request.query_params.get("hub.verify_token")
    
    if hub_mode and hub_verify_token == os.getenv("WHATSAPP_VERIFY_TOKEN"):
        return int(hub_challenge)
    return "Verification failed", 403

@app.post("/webhook")
async def handle_whatsapp_message(request: Request, db: Session = Depends(get_session)):
    body = await request.json()
    
    # Extract incoming message text or transcribe audio
    # For MVP, assume text/transcript is extracted from webhook payload:
    incoming_text = "Allan took 2 cups of passion juice at 160 na hajalipa"
    business_id = 1
    session_id = 1 # Active session ID fetched from DB
    
    # Execute LangGraph state machine
    initial_state = {
        "raw_input": incoming_text,
        "business_id": business_id,
        "session_id": session_id,
        "intent": None,
        "extracted_data": None,
        "db_status": None,
        "response_message": ""
    }
    
    result = duka_app.invoke(initial_state)
    
    return {
        "status": "success",
        "graph_output": result["response_message"]
    }