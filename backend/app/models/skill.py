"""
Skill data models
"""
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from enum import Enum


class SkillCategory(str, Enum):
    """Skill categories"""
    DATA_ANALYSIS = "Data Analysis"
    CODING = "Coding"
    PRODUCTIVITY = "Productivity"
    FINANCE = "Finance"
    WEB_SCRAPER = "Web Scraper"
    CONTENT_CREATION = "Content Creation"
    DEVELOPMENT = "Development"
    OTHER = "Other"


class LLMCompatibility(str, Enum):
    """LLM compatibility"""
    GPT_4 = "GPT-4"
    GPT_4O = "GPT-4o"
    GPT_5 = "GPT-5"
    CLAUDE_3 = "Claude 3"
    CLAUDE_3_5 = "Claude 3.5"
    QWEN_PLUS = "Qwen Plus"
    DEEPSEEK = "DeepSeek"
    UNIVERSAL = "Universal"


class SkillBase(BaseModel):
    """Base skill model"""
    name: str = Field(..., description="Skill name")
    description: str = Field(..., description="Skill description")
    category: SkillCategory = Field(..., description="Skill category")
    tags: List[str] = Field(default_factory=list, description="Skill tags")
    author: str = Field(..., description="Skill author")
    version: str = Field(default="1.0.0", description="Skill version")
    llm_compatibility: List[LLMCompatibility] = Field(
        default_factory=list,
        description="Compatible LLM models"
    )
    is_free: bool = Field(default=True, description="Is free skill")
    price: Optional[float] = Field(None, description="Price if not free")


class SkillCreate(SkillBase):
    """Skill creation model"""
    pass


class SkillUpdate(BaseModel):
    """Skill update model"""
    name: Optional[str] = None
    description: Optional[str] = None
    category: Optional[SkillCategory] = None
    tags: Optional[List[str]] = None
    version: Optional[str] = None
    llm_compatibility: Optional[List[LLMCompatibility]] = None
    is_free: Optional[bool] = None
    price: Optional[float] = None


class Skill(SkillBase):
    """Skill model with metadata"""
    id: int = Field(..., description="Skill ID")
    download_count: int = Field(default=0, description="Download count")
    rating: float = Field(default=0.0, description="Average rating")
    review_count: int = Field(default=0, description="Review count")
    created_at: datetime = Field(..., description="Creation timestamp")
    updated_at: datetime = Field(..., description="Update timestamp")
    
    class Config:
        from_attributes = True


class SkillListResponse(BaseModel):
    """Skill list response"""
    skills: List[Skill]
    total: int
    page: int
    page_size: int


class SkillDetailResponse(Skill):
    """Skill detail response"""
    readme: Optional[str] = None
    installation_guide: Optional[str] = None
    usage_examples: Optional[List[str]] = None
