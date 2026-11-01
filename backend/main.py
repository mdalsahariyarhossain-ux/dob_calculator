
from datetime import date

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from backend.age_service import calculate_age

app = FastAPI(
    title="DOB Calculator API",
    description="Calculate a person's age from their date of birth.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://dob-calculator-frontend.onrender.com"],
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)


class DOBRequest(BaseModel):
    date_of_birth: date = Field(
        description="Date of birth in YYYY-MM-DD format"
    )


@app.get("/")
def home():
    return {"message": "DOB Calculator API is running"}


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/api/calculate-age")
def calculate_age_api(payload: DOBRequest):
    today = date.today()

    try:
        age = calculate_age(payload.date_of_birth, today)
    except ValueError as exc:
        raise HTTPException(
            status_code=400,
            detail=str(exc),
        ) from exc

    return {
        **age,
        "date_of_birth": payload.date_of_birth.isoformat(),
        "calculated_on": today.isoformat(),
    }
