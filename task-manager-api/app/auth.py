from fastapi import APIRouter

router = APIRouter()


@router.post("/auth/signup")
async def signup():
    return {"message": "Sign up"}


@router.post("/auth/login")
async def login():
    return {"message": "Login"}
