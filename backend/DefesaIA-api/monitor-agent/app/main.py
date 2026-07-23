from fastapi import FastAPI
from datetime import datetime
import socket

app = FastAPI(
  title="Sentinela Agent",
  version="1.0.0",
  description="Agente de Monitoramento da Defesa Civil de Brusque - SC"
)

@app.get("/")
async def root():
  return{
    "agent": "Sentinela",
    "status": "online",
    "version": "1.0.0",
    "hostname": socket.gethostname(),
    "time": datetime.now()
  }

@app.get("/health")
async def health():
  return{
    "status": "healthy"
  }
