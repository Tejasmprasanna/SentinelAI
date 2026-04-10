from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from attack_detector import detect_attacks
from log_parser import parse_logs

app = FastAPI(title="SentinelAI", description="Real-Time AI Cyber Attack Radar")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"status": "SentinelAI Running"}


@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):
    raw = await file.read()
    try:
        text = raw.decode("utf-8")
    except UnicodeDecodeError:
        text = raw.decode("utf-8", errors="replace")

    log_lines = text.splitlines()
    parsed_logs = parse_logs(log_lines)
    threats = detect_attacks(parsed_logs)

    return {"logs": parsed_logs, "threats": threats}
