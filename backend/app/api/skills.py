"""
Skills API endpoints
"""
from fastapi import APIRouter, Query, HTTPException
from typing import Optional, List
from app.models.skill import (
    Skill,
    SkillListResponse,
    SkillDetailResponse,
    SkillCategory,
    SkillCreate,
    SkillUpdate,
)

router = APIRouter()


# Mock data for development
MOCK_SKILLS = [
    Skill(
        id=1,
        name="Agent-SQL-Pro",
        description="Turn natural language into complex SQL queries instantly. Seamlessly integrate with PostgreSQL, MySQL, and Snowflake databases with read-only safety modes and intelligent query optimization.",
        category=SkillCategory.DATA_ANALYSIS,
        tags=["SQL", "Database", "Query"],
        author="AgenticX Team",
        version="2.4",
        llm_compatibility=["GPT-4o"],
        is_free=True,
        download_count=15234,
        rating=4.9,
        review_count=2400,
        created_at="2024-01-15T10:00:00Z",
        updated_at="2024-12-26T10:00:00Z",
    ),
    Skill(
        id=2,
        name="Canvas Design",
        description="Create beautiful visual art in .png and .pdf documents using design tools and templates.",
        category=SkillCategory.CONTENT_CREATION,
        tags=["Design", "Canvas", "Visual"],
        author="Design Pro",
        version="1.2",
        llm_compatibility=["GPT-4o"],
        is_free=True,
        download_count=15000,
        rating=4.9,
        review_count=1200,
        created_at="2024-02-01T10:00:00Z",
        updated_at="2024-12-24T10:00:00Z",
    ),
    Skill(
        id=3,
        name="DOCX Editor",
        description="Edit and manipulate Word documents programmatically with advanced formatting options.",
        category=SkillCategory.PRODUCTIVITY,
        tags=["Document", "Word", "Editor"],
        author="Productivity Labs",
        version="1.5",
        llm_compatibility=["GPT-4o"],
        is_free=True,
        download_count=28000,
        rating=4.8,
        review_count=2100,
        created_at="2024-01-20T10:00:00Z",
        updated_at="2024-12-25T10:00:00Z",
    ),
    Skill(
        id=4,
        name="PDF Toolkit",
        description="Comprehensive PDF manipulation toolkit with merge, split, extract, and convert capabilities.",
        category=SkillCategory.PRODUCTIVITY,
        tags=["PDF", "Document", "Toolkit"],
        author="PDF Master",
        version="2.1",
        llm_compatibility=["Claude 3"],
        is_free=True,
        download_count=32000,
        rating=4.7,
        review_count=1800,
        created_at="2024-01-10T10:00:00Z",
        updated_at="2024-12-23T10:00:00Z",
    ),
]


@router.get("/", response_model=SkillListResponse)
async def list_skills(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    category: Optional[SkillCategory] = None,
    search: Optional[str] = None,
    sort_by: str = Query("most_popular", regex="^(most_popular|newest|highest_rated)$"),
):
    """
    List all skills with pagination and filtering
    """
    skills = MOCK_SKILLS.copy()
    
    # Filter by category
    if category:
        skills = [s for s in skills if s.category == category]
    
    # Search
    if search:
        search_lower = search.lower()
        skills = [
            s for s in skills
            if search_lower in s.name.lower() or search_lower in s.description.lower()
        ]
    
    # Sort
    if sort_by == "newest":
        skills.sort(key=lambda x: x.created_at, reverse=True)
    elif sort_by == "highest_rated":
        skills.sort(key=lambda x: x.rating, reverse=True)
    else:  # most_popular
        skills.sort(key=lambda x: x.download_count, reverse=True)
    
    # Paginate
    total = len(skills)
    start = (page - 1) * page_size
    end = start + page_size
    paginated_skills = skills[start:end]
    
    return SkillListResponse(
        skills=paginated_skills,
        total=total,
        page=page,
        page_size=page_size,
    )


@router.get("/{skill_id}", response_model=SkillDetailResponse)
async def get_skill(skill_id: int):
    """
    Get skill details by ID
    """
    skill = next((s for s in MOCK_SKILLS if s.id == skill_id), None)
    if not skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    
    # Add detail fields
    detail = SkillDetailResponse(
        **skill.dict(),
        readme=f"# {skill.name}\n\n{skill.description}\n\n## Installation\n\n```bash\npip install {skill.name.lower().replace(' ', '-')}\n```",
        installation_guide=f"Install {skill.name} using pip or download from the marketplace.",
        usage_examples=[
            f"Example 1: Use {skill.name} to perform basic operations",
            f"Example 2: Advanced usage of {skill.name}",
        ],
    )
    
    return detail


@router.post("/", response_model=Skill)
async def create_skill(skill: SkillCreate):
    """
    Create a new skill (requires authentication)
    """
    # TODO: Implement authentication and database persistence
    new_skill = Skill(
        id=len(MOCK_SKILLS) + 1,
        **skill.dict(),
        download_count=0,
        rating=0.0,
        review_count=0,
        created_at="2024-12-27T10:00:00Z",
        updated_at="2024-12-27T10:00:00Z",
    )
    MOCK_SKILLS.append(new_skill)
    return new_skill


@router.get("/trending/list")
async def get_trending_skills():
    """
    Get trending skills
    """
    # Return top skills by download count
    trending = sorted(MOCK_SKILLS, key=lambda x: x.download_count, reverse=True)[:5]
    return {"skills": trending}
