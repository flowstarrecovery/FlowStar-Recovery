from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import asyncio
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import resend

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend setup
RESEND_API_KEY = os.environ.get("RESEND_API_KEY", "")
SENDER_EMAIL = os.environ.get("SENDER_EMAIL", "onboarding@resend.dev")
NOTIFICATION_RECIPIENT = os.environ.get("NOTIFICATION_RECIPIENT", "")
if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY

app = FastAPI(title="Flowstar Asset Recovery API")
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


# ===================== Models =====================
class LeadCreate(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=120)
    email: EmailStr
    phone: Optional[str] = Field(None, max_length=40)
    state: Optional[str] = Field(None, max_length=60)
    property_type: Optional[str] = Field(None, max_length=60)
    foreclosure_date: Optional[str] = Field(None, max_length=40)
    estimated_amount: Optional[str] = Field(None, max_length=80)
    message: Optional[str] = Field(None, max_length=2000)
    source: Optional[str] = Field("eligibility_checker", max_length=80)


class Lead(LeadCreate):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ContactCreate(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=120)
    email: EmailStr
    phone: Optional[str] = Field(None, max_length=40)
    message: str = Field(..., min_length=5, max_length=2000)


class BlogPost(BaseModel):
    slug: str
    title: str
    excerpt: str
    category: str
    author: str
    published_at: str
    read_minutes: int
    cover_image: str
    content: List[str]


# ===================== Static Blog Data =====================
BLOG_POSTS: List[BlogPost] = [
    BlogPost(
        slug="what-are-surplus-funds",
        title="What Are Surplus Funds? A Plain-English Guide",
        excerpt="If your property was sold at foreclosure or a tax sale for more than what you owed, that extra money belongs to you. Here's how it works.",
        category="Fundamentals",
        author="Flowstar Research Desk",
        published_at="2025-09-14",
        read_minutes=6,
        cover_image="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=85&w=1200",
        content=[
            "When a home is sold at foreclosure or tax auction, the proceeds are first applied to the outstanding debt, legal fees, and county costs. Anything that remains is what we call surplus funds, overage, or excess proceeds.",
            "Under most state statutes, those leftover dollars do not belong to the bank or the county. They belong to the former owner, lien-holders in priority order, or in some cases the heirs of a deceased owner. Yet billions of dollars sit unclaimed each year, simply because the rightful party never receives clear notice.",
            "The recovery process generally involves locating the case file, verifying ownership chain, filing a motion or claim with the court or treasurer's office, and following up through disbursement. Timelines vary by state, but the right paperwork is the difference between recovering everything and recovering nothing.",
            "Flowstar Asset Recovery operates on a strict contingency model. You pay nothing unless we successfully recover funds on your behalf. We only get paid when you do."
        ],
    ),
    BlogPost(
        slug="tax-sale-vs-mortgage-foreclosure-overages",
        title="Tax Sale Overages vs. Mortgage Foreclosure Surplus: What's the Difference?",
        excerpt="Both can leave money on the table for the former owner, but the rules, deadlines, and claim process differ significantly.",
        category="Process",
        author="Flowstar Research Desk",
        published_at="2025-10-02",
        read_minutes=7,
        cover_image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=85&w=1200",
        content=[
            "Tax sale overages occur when a county sells a property for unpaid property taxes and the winning bid exceeds the amount owed in taxes, penalties, and fees. The remainder is held by the county treasurer or clerk for a statutory period.",
            "Mortgage foreclosure surplus, by contrast, arises after a lender forecloses and the auction proceeds exceed the loan balance plus permissible costs. These funds are typically deposited with the court or trustee until claimed.",
            "Deadlines matter. Some states require a claim within one year; others give five. Miss the window and the funds may escheat to the government permanently.",
            "Our intake team handles both case types every week. We start with a no-cost search and only proceed if there is a real claim to pursue."
        ],
    ),
    BlogPost(
        slug="five-mistakes-claimants-make",
        title="Five Mistakes Former Owners Make When Claiming Surplus Funds",
        excerpt="From missed deadlines to overpaying middlemen, these are the most common pitfalls we see — and how to avoid each one.",
        category="Guides",
        author="Flowstar Research Desk",
        published_at="2025-10-21",
        read_minutes=5,
        cover_image="https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&q=85&w=1200",
        content=[
            "Mistake #1: Assuming the bank or county will mail a check. They are required to send notice, but if the address on file is outdated, the notice goes nowhere.",
            "Mistake #2: Signing an open-ended power of attorney with a recovery firm. Always read the limits, the contingency percentage, and the termination clause.",
            "Mistake #3: Paying upfront fees. Reputable recovery firms work on contingency. If someone is asking for retainers or 'filing fees' out of pocket, walk away.",
            "Mistake #4: Missing the statute of limitations. Each state sets its own clock. We track them for every active client.",
            "Mistake #5: Filing without proof of identity chain. Death certificates, prior deeds, and probate records often make or break the claim."
        ],
    ),
    BlogPost(
        slug="how-flowstar-recovers-funds",
        title="How Flowstar Recovers Funds: A Step-by-Step Look",
        excerpt="A behind-the-scenes walkthrough of our four-stage recovery process, from research to disbursement.",
        category="Process",
        author="Flowstar Research Desk",
        published_at="2025-11-08",
        read_minutes=4,
        cover_image="https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&q=85&w=1200",
        content=[
            "Stage one: Research. We pull the case file, confirm the surplus exists, and verify the claim chain back to you.",
            "Stage two: Engagement. We send a clear, contingency-based agreement. No retainer, no upfront costs. You only pay if we recover.",
            "Stage three: Filing. Our paralegals prepare and file the motion or claim packet, including affidavits, ID verification, and any required court appearances.",
            "Stage four: Disbursement. Once approved, funds are released directly to you via certified mail or wire, less our agreed contingency fee."
        ],
    ),
]


# ===================== Email helper =====================
async def send_lead_notification(lead: Lead) -> None:
    """Fire-and-forget email when a lead is captured. Silently logs if not configured."""
    if not RESEND_API_KEY or not NOTIFICATION_RECIPIENT:
        logger.info("Resend not configured; skipping email notification for lead %s", lead.id)
        return
    html = f"""
    <div style="font-family: Arial, sans-serif; max-width:600px; margin:0 auto; color:#0C2340;">
      <h2 style="color:#0C2340; border-bottom:2px solid #D4AF37; padding-bottom:8px;">New Lead — Flowstar Asset Recovery</h2>
      <table style="width:100%; border-collapse:collapse;">
        <tr><td style="padding:6px 0;"><strong>Name:</strong></td><td>{lead.full_name}</td></tr>
        <tr><td style="padding:6px 0;"><strong>Email:</strong></td><td>{lead.email}</td></tr>
        <tr><td style="padding:6px 0;"><strong>Phone:</strong></td><td>{lead.phone or '—'}</td></tr>
        <tr><td style="padding:6px 0;"><strong>State:</strong></td><td>{lead.state or '—'}</td></tr>
        <tr><td style="padding:6px 0;"><strong>Property Type:</strong></td><td>{lead.property_type or '—'}</td></tr>
        <tr><td style="padding:6px 0;"><strong>Foreclosure / Sale Date:</strong></td><td>{lead.foreclosure_date or '—'}</td></tr>
        <tr><td style="padding:6px 0;"><strong>Estimated Amount:</strong></td><td>{lead.estimated_amount or '—'}</td></tr>
        <tr><td style="padding:6px 0;"><strong>Source:</strong></td><td>{lead.source}</td></tr>
        <tr><td style="padding:6px 0; vertical-align:top;"><strong>Message:</strong></td><td>{lead.message or '—'}</td></tr>
      </table>
      <p style="color:#526477; font-size:12px; margin-top:24px;">Submitted at {lead.created_at.isoformat()}</p>
    </div>
    """
    params = {
        "from": SENDER_EMAIL,
        "to": [NOTIFICATION_RECIPIENT],
        "subject": f"New Lead: {lead.full_name} — Flowstar",
        "html": html,
    }
    try:
        await asyncio.to_thread(resend.Emails.send, params)
        logger.info("Lead notification email sent for %s", lead.id)
    except Exception as e:
        logger.error("Failed to send lead notification: %s", e)


# ===================== Routes =====================
@api_router.get("/")
async def root():
    return {"service": "Flowstar Asset Recovery API", "status": "ok"}


@api_router.get("/health")
async def health():
    return {"status": "healthy", "time": datetime.now(timezone.utc).isoformat()}


@api_router.post("/leads", response_model=Lead, status_code=201)
async def create_lead(payload: LeadCreate):
    lead = Lead(**payload.model_dump())
    doc = lead.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    await db.leads.insert_one(doc)
    # Fire-and-forget email
    asyncio.create_task(send_lead_notification(lead))
    return lead


@api_router.get("/leads", response_model=List[Lead])
async def list_leads(limit: int = 100):
    docs = await db.leads.find({}, {"_id": 0}).sort("created_at", -1).to_list(limit)
    for d in docs:
        if isinstance(d.get("created_at"), str):
            try:
                d["created_at"] = datetime.fromisoformat(d["created_at"])
            except Exception:
                d["created_at"] = datetime.now(timezone.utc)
    return docs


@api_router.post("/contact", response_model=Lead, status_code=201)
async def create_contact(payload: ContactCreate):
    lead = Lead(
        full_name=payload.full_name,
        email=payload.email,
        phone=payload.phone,
        message=payload.message,
        source="contact_form",
    )
    doc = lead.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    await db.leads.insert_one(doc)
    asyncio.create_task(send_lead_notification(lead))
    return lead


@api_router.get("/blog/posts", response_model=List[BlogPost])
async def list_blog_posts():
    return BLOG_POSTS


@api_router.get("/blog/posts/{slug}", response_model=BlogPost)
async def get_blog_post(slug: str):
    for post in BLOG_POSTS:
        if post.slug == slug:
            return post
    raise HTTPException(status_code=404, detail="Post not found")


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
