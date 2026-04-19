from fastapi import FastAPI, HTTPException, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from database import supabase
from matching import find_matching_donor
import os
import requests as http_requests
import shutil

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001", "https://bloodconnect-delta.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class DonorCreate(BaseModel):
    name: str
    email: str
    phone: str
    blood_group: str
    latitude: float
    longitude: float

class BloodRequest(BaseModel):
    patient_name: str
    phone: str
    blood_group: str
    hospital: str
    latitude: float
    longitude: float

@app.post("/donors/register")
def register_donor(donor: DonorCreate):
    try:
        data = donor.dict()
        result = supabase.table("donors").insert(data).execute()
        return {"message": "Donor registered!", "data": result.data}
    except Exception as e:
        print("ERROR:", str(e))
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/donors")
def get_donors():
    result = supabase.table("donors").select("*").execute()
    return result.data

@app.post("/requests/create")
def create_request(req: BloodRequest):
    result = supabase.table("blood_requests").insert(req.dict()).execute()
    request_data = result.data[0]
    donors = supabase.table("donors").select("*").execute().data
    matched = find_matching_donors(
        donors,
        req.blood_group,
        req.latitude,
        req.longitude
    )

    print(f"Matched donors count: {len(matched)}")

    # Send SMS to matched donors
    for donor in matched:
        try:
            phone = donor["phone"].replace("+91", "").replace(" ", "").strip()
            full_phone = f"+91{phone}"
            print(f"Trying SMS to: {full_phone}")
            message = f"URGENT: {req.blood_group} blood needed at {req.hospital}. Patient: {req.patient_name}. Contact: {req.phone}. - BloodConnect"
            response = http_requests.post(
                "https://textbelt.com/text",
                data={
                    "phone": full_phone,
                    "message": message,
                    "key": "textbelt_test"
                }
            )
            print(f"SMS response: {response.json()}")
        except Exception as e:
            print(f"SMS FAILED: {e}")

    return {
        "message": "Request created!",
        "request": request_data,
        "matched_donors": matched
    }

@app.get("/requests")
def get_requests():
    result = supabase.table("blood_requests").select("*").execute()
    return result.data


@app.get("/")
def root():
    return {"message": "Blood Donor Finder API is running!"}