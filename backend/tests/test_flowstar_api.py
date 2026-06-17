"""Backend tests for Flowstar Asset Recovery API."""
import os
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://recover-capital-1.preview.emergentagent.com').rstrip('/')
API = f"{BASE_URL}/api"


@pytest.fixture
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Health ----------
def test_health(client):
    r = client.get(f"{API}/health", timeout=15)
    assert r.status_code == 200
    data = r.json()
    assert data["status"] == "healthy"
    assert "time" in data


# ---------- Blog ----------
def test_blog_list(client):
    r = client.get(f"{API}/blog/posts", timeout=15)
    assert r.status_code == 200
    posts = r.json()
    assert isinstance(posts, list)
    assert len(posts) == 4
    required = {"slug", "title", "excerpt", "category", "cover_image", "content"}
    for p in posts:
        assert required.issubset(p.keys()), f"Missing fields in {p}"
        assert isinstance(p["content"], list)


def test_blog_single_valid(client):
    r = client.get(f"{API}/blog/posts/what-are-surplus-funds", timeout=15)
    assert r.status_code == 200
    data = r.json()
    assert data["slug"] == "what-are-surplus-funds"
    assert data["title"]


def test_blog_single_invalid(client):
    r = client.get(f"{API}/blog/posts/does-not-exist", timeout=15)
    assert r.status_code == 404


# ---------- Leads ----------
def test_create_lead_full(client):
    payload = {
        "full_name": "TEST Jane Doe",
        "email": "TEST_jane@example.com",
        "phone": "555-555-1212",
        "state": "TX",
        "property_type": "Single Family",
        "foreclosure_date": "2024-08-01",
        "estimated_amount": "25000-50000",
        "message": "Please contact me",
        "source": "eligibility_checker",
    }
    r = client.post(f"{API}/leads", json=payload, timeout=20)
    assert r.status_code == 201, r.text
    data = r.json()
    assert "id" in data and data["id"]
    assert "created_at" in data
    assert data["email"] == payload["email"]
    assert data["full_name"] == payload["full_name"]
    assert data["source"] == "eligibility_checker"


def test_create_lead_invalid_email(client):
    payload = {"full_name": "TEST Bad Email", "email": "not-an-email"}
    r = client.post(f"{API}/leads", json=payload, timeout=15)
    assert r.status_code == 422


def test_create_lead_without_resend_does_not_fail(client):
    # RESEND_API_KEY is empty in .env; this proves lead is saved regardless.
    payload = {"full_name": "TEST NoResend", "email": "TEST_noresend@example.com"}
    r = client.post(f"{API}/leads", json=payload, timeout=20)
    assert r.status_code == 201
    assert r.json()["id"]


def test_list_leads_sorted_desc(client):
    r = client.get(f"{API}/leads", timeout=15)
    assert r.status_code == 200
    leads = r.json()
    assert isinstance(leads, list)
    assert len(leads) >= 1
    # Verify desc sort
    times = [l["created_at"] for l in leads]
    assert times == sorted(times, reverse=True)


# ---------- Contact ----------
def test_create_contact(client):
    payload = {
        "full_name": "TEST Contact User",
        "email": "TEST_contact@example.com",
        "phone": "555-000-9999",
        "message": "Hello there, please reach out.",
    }
    r = client.post(f"{API}/contact", json=payload, timeout=20)
    assert r.status_code == 201, r.text
    data = r.json()
    assert data["source"] == "contact_form"
    assert data["full_name"] == payload["full_name"]
    assert data["email"] == payload["email"]
