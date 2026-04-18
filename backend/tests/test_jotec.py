"""JOTEC Showcase API tests - Products and Inquiries endpoints"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

SLUGS = ["speed-editor", "replay-editor", "editor-keyboard", "micro-color-panel", "mini-panel"]


class TestProducts:
    """Product listing and detail endpoints"""

    def test_list_products_returns_200(self):
        r = requests.get(f"{BASE_URL}/api/products")
        assert r.status_code == 200

    def test_list_products_count(self):
        r = requests.get(f"{BASE_URL}/api/products")
        data = r.json()
        assert len(data) == 5

    def test_list_products_fields(self):
        r = requests.get(f"{BASE_URL}/api/products")
        for p in r.json():
            for field in ["slug", "name", "tagline", "description", "features", "specs", "image_url"]:
                assert field in p, f"Missing field {field} in product {p.get('slug')}"

    @pytest.mark.parametrize("slug", SLUGS)
    def test_get_product_by_slug(self, slug):
        r = requests.get(f"{BASE_URL}/api/products/{slug}")
        assert r.status_code == 200
        data = r.json()
        assert data["slug"] == slug

    def test_get_product_unknown_slug_returns_404(self):
        r = requests.get(f"{BASE_URL}/api/products/unknown-slug-xyz")
        assert r.status_code == 404


class TestInquiries:
    """Inquiry creation and listing"""

    def test_create_inquiry_valid(self):
        payload = {"name": "TEST_User", "email": "test@example.com", "message": "Test inquiry"}
        r = requests.post(f"{BASE_URL}/api/inquiries", json=payload)
        assert r.status_code == 201
        data = r.json()
        assert "id" in data
        assert "created_at" in data
        assert data["name"] == "TEST_User"

    def test_create_inquiry_invalid_email(self):
        payload = {"name": "TEST_User", "email": "not-an-email", "message": "Test"}
        r = requests.post(f"{BASE_URL}/api/inquiries", json=payload)
        assert r.status_code == 422

    def test_create_inquiry_missing_required_fields(self):
        r = requests.post(f"{BASE_URL}/api/inquiries", json={"name": "TEST_User"})
        assert r.status_code == 422

    def test_list_inquiries(self):
        r = requests.get(f"{BASE_URL}/api/inquiries")
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)

    def test_list_inquiries_no_mongo_id(self):
        r = requests.get(f"{BASE_URL}/api/inquiries")
        for item in r.json():
            assert "_id" not in item
