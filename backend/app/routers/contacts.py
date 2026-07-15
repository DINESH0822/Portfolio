from fastapi import APIRouter, HTTPException, Depends, status
from typing import List
from datetime import datetime
from bson import ObjectId
from bson.errors import InvalidId
from app.models import ContactSubmissionCreate, ContactSubmissionResponse
from app.database import get_db
from app.auth import get_current_admin

router = APIRouter(prefix="/api/contacts", tags=["Contact Submissions"])

def serialize_contact(doc) -> dict:
    if not doc:
        return {}
    doc = dict(doc)
    if "_id" in doc:
        doc["_id"] = str(doc["_id"])
    return doc

def get_id_query(contact_id: str) -> dict:
    try:
        return {"_id": ObjectId(contact_id)}
    except (InvalidId, TypeError):
        return {"_id": contact_id}

@router.post("", response_model=ContactSubmissionResponse, status_code=status.HTTP_201_CREATED)
async def submit_contact(contact: ContactSubmissionCreate, db=Depends(get_db)):
    contact_dict = contact.model_dump()
    contact_dict["timestamp"] = datetime.utcnow()
    
    result = db["contacts"].insert_one(contact_dict)
    created_contact = db["contacts"].find_one({"_id": result.inserted_id})
    return serialize_contact(created_contact)

@router.get("", response_model=List[ContactSubmissionResponse])
async def list_contacts(db=Depends(get_db), current_admin: str = Depends(get_current_admin)):
    contacts = db["contacts"].find()
    # Sort messages chronologically by timestamp, newest first
    sorted_contacts = sorted(contacts, key=lambda x: x.get("timestamp", datetime.min), reverse=True)
    return [serialize_contact(c) for c in sorted_contacts]

@router.delete("/{id}", status_code=status.HTTP_200_OK)
async def delete_contact(id: str, db=Depends(get_db), current_admin: str = Depends(get_current_admin)):
    query = get_id_query(id)
    existing_contact = db["contacts"].find_one(query)
    if not existing_contact:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Message with ID {id} not found"
        )
    db["contacts"].delete_one(query)
    return {"message": f"Message {id} deleted successfully"}
