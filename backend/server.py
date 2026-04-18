from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="JOTEC Showcase API")
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
class InquiryCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    company: Optional[str] = Field(default=None, max_length=160)
    product_interest: Optional[str] = Field(default=None, max_length=120)
    message: str = Field(min_length=1, max_length=4000)


class Inquiry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    company: Optional[str] = None
    product_interest: Optional[str] = None
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class Product(BaseModel):
    slug: str
    name: str
    tagline: str
    description: str
    features: List[str]
    specs: List[dict]
    image_url: str


# ---------- Static product data ----------
PRODUCTS: List[dict] = [
    {
        "slug": "speed-editor",
        "name": "DaVinci Resolve Speed Editor",
        "tagline": "Edit faster than real time.",
        "description": "A purpose-built keyboard for the cut page of DaVinci Resolve. High quality metal jog/shuttle knob and dedicated edit keys let editors work at the speed of thought.",
        "features": [
            "Dedicated cut page shortcut keys",
            "High quality search dial with electronic clutch",
            "Bluetooth low energy + USB-C",
            "Machined metal chassis",
            "Built-in rechargeable battery"
        ],
        "specs": [
            {"label": "Connection", "value": "Bluetooth LE & USB-C"},
            {"label": "Battery", "value": "Rechargeable Li-ion"},
            {"label": "Keys", "value": "Source tape, sync bin, smart switches"},
            {"label": "Weight", "value": "670 g"}
        ],
        "image_url": "https://images.unsplash.com/photo-1695460355096-3d303912874b?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600"
    },
    {
        "slug": "replay-editor",
        "name": "DaVinci Resolve Replay Editor",
        "tagline": "Live replay, broadcast ready.",
        "description": "Designed for live sports production. Captures multiple camera feeds simultaneously for instant replay with slow motion, color correction and graphics in a single broadcast workflow.",
        "features": [
            "Multi-camera live replay",
            "Tactile jog/shuttle for slow-mo control",
            "Integrated with ATEM switchers",
            "Dedicated A/B angle keys",
            "HDR and wide gamut support"
        ],
        "specs": [
            {"label": "Inputs", "value": "Up to 4x 12G-SDI"},
            {"label": "Formats", "value": "Up to 2160p60"},
            {"label": "Storage", "value": "Internal SSD + external"},
            {"label": "Control", "value": "Dedicated physical keys + dial"}
        ],
        "image_url": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600"
    },
    {
        "slug": "editor-keyboard",
        "name": "DaVinci Resolve Editor Keyboard",
        "tagline": "The keyboard broadcast pros demand.",
        "description": "A premium full-size keyboard with metal search dial, every key you need for professional editing, and the speed and tactile feel of broadcast tape machines.",
        "features": [
            "Heavy metal jog/shuttle search dial",
            "Full mechanical key array",
            "USB-C and USB Type-A",
            "Dedicated trim and timeline keys",
            "Machined metal chassis"
        ],
        "specs": [
            {"label": "Connection", "value": "USB-C + USB-A"},
            {"label": "Keys", "value": "Mechanical, dedicated edit keys"},
            {"label": "Dial", "value": "Machined aluminum, weighted"},
            {"label": "Dimensions", "value": "455 × 220 × 60 mm"}
        ],
        "image_url": "https://images.unsplash.com/photo-1652810251800-51d8d6384b9d?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600"
    },
    {
        "slug": "micro-color-panel",
        "name": "DaVinci Resolve Micro Color Panel",
        "tagline": "Portable color. Full control.",
        "description": "Three high resolution trackballs, 12 precision knobs and 18 dedicated keys for primary correction. Compact enough for the road, precise enough for the grading suite.",
        "features": [
            "3 high-res trackballs",
            "12 precision control knobs",
            "18 dedicated grading keys",
            "USB-C connectivity",
            "Travel-friendly metal chassis"
        ],
        "specs": [
            {"label": "Trackballs", "value": "3 (lift, gamma, gain)"},
            {"label": "Knobs", "value": "12 high-res rotary"},
            {"label": "Keys", "value": "18 dedicated"},
            {"label": "Weight", "value": "2.4 kg"}
        ],
        "image_url": "https://images.unsplash.com/photo-1696389500422-d48223c77d5f?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600"
    },
    {
        "slug": "mini-panel",
        "name": "DaVinci Resolve Mini Panel",
        "tagline": "Professional grading at your fingertips.",
        "description": "The Mini Panel combines three trackballs, 12 control knobs, 27 dedicated buttons and two LCD screens with menus for faster access to all DaVinci Resolve primary and secondary tools.",
        "features": [
            "Dual built-in LCDs",
            "3 weighted trackballs",
            "12 control knobs + 27 buttons",
            "Direct access to secondary tools",
            "Ethernet + USB-C"
        ],
        "specs": [
            {"label": "Displays", "value": "2× built-in LCD"},
            {"label": "Trackballs", "value": "3 precision"},
            {"label": "Connection", "value": "Ethernet + USB-C"},
            {"label": "Weight", "value": "5.7 kg"}
        ],
        "image_url": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600"
    }
]


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "JOTEC Showcase API", "status": "ok"}


@api_router.get("/products", response_model=List[Product])
async def list_products():
    return PRODUCTS


@api_router.get("/products/{slug}", response_model=Product)
async def get_product(slug: str):
    for p in PRODUCTS:
        if p["slug"] == slug:
            return p
    raise HTTPException(status_code=404, detail="Product not found")


@api_router.post("/inquiries", response_model=Inquiry, status_code=201)
async def create_inquiry(payload: InquiryCreate):
    inquiry = Inquiry(**payload.model_dump())
    doc = inquiry.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    await db.inquiries.insert_one(doc)
    return inquiry


@api_router.get("/inquiries", response_model=List[Inquiry])
async def list_inquiries():
    docs = await db.inquiries.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for d in docs:
        if isinstance(d.get("created_at"), str):
            d["created_at"] = datetime.fromisoformat(d["created_at"])
    return docs


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
