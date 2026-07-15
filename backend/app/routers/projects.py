from fastapi import APIRouter, HTTPException, Depends, status
from typing import List, Optional
from bson import ObjectId
from bson.errors import InvalidId
from app.models import ProjectCreate, ProjectUpdate, ProjectResponse
from app.database import get_db
from app.auth import get_current_admin

router = APIRouter(prefix="/api/projects", tags=["Projects"])

def serialize_project(doc) -> dict:
    if not doc:
        return {}
    doc = dict(doc)
    if "_id" in doc:
        doc["_id"] = str(doc["_id"])
    return doc

def get_id_query(project_id: str) -> dict:
    try:
        return {"_id": ObjectId(project_id)}
    except (InvalidId, TypeError):
        return {"_id": project_id}

@router.get("", response_model=List[ProjectResponse])
async def list_projects(featured: Optional[bool] = None, db=Depends(get_db)):
    query = {}
    if featured is not None:
        query["is_featured"] = featured
        
    projects = db["projects"].find(query)
    return [serialize_project(p) for p in projects]

@router.get("/{id}", response_model=ProjectResponse)
async def get_project(id: str, db=Depends(get_db)):
    query = get_id_query(id)
    project = db["projects"].find_one(query)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Project with ID {id} not found"
        )
    return serialize_project(project)

@router.post("", response_model=ProjectResponse, status_code=status.HTTP_201_CREATED)
async def create_project(project: ProjectCreate, db=Depends(get_db), current_admin: str = Depends(get_current_admin)):
    project_dict = project.model_dump()
    result = db["projects"].insert_one(project_dict)
    
    # Fetch the inserted project to return
    created_project = db["projects"].find_one({"_id": result.inserted_id})
    return serialize_project(created_project)

@router.put("/{id}", response_model=ProjectResponse)
async def update_project(
    id: str, 
    project_update: ProjectUpdate, 
    db=Depends(get_db), 
    current_admin: str = Depends(get_current_admin)
):
    query = get_id_query(id)
    existing_project = db["projects"].find_one(query)
    if not existing_project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Project with ID {id} not found"
        )
        
    update_data = {k: v for k, v in project_update.model_dump().items() if v is not None}
    if update_data:
        db["projects"].update_one(query, {"$set": update_data})
        
    updated_project = db["projects"].find_one(query)
    return serialize_project(updated_project)

@router.delete("/{id}", status_code=status.HTTP_200_OK)
async def delete_project(id: str, db=Depends(get_db), current_admin: str = Depends(get_current_admin)):
    query = get_id_query(id)
    existing_project = db["projects"].find_one(query)
    if not existing_project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Project with ID {id} not found"
        )
        
    db["projects"].delete_one(query)
    return {"message": f"Project {id} deleted successfully"}
