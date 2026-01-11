"""
Users API endpoints
"""
from fastapi import APIRouter

router = APIRouter()


@router.get("/me")
async def get_current_user():
    """
    Get current user information (requires authentication)
    """
    # TODO: Implement authentication
    return {"message": "User endpoint - to be implemented"}


@router.get("/{user_id}/skills")
async def get_user_skills(user_id: int):
    """
    Get skills published by a user
    """
    # TODO: Implement user skills retrieval
    return {"message": "User skills endpoint - to be implemented"}
