from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
import json
from typing import List, Optional
from pydantic import BaseModel
import urllib.request
import urllib.parse

app = FastAPI(title="Local Guys Junk Removal API")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Turso database connection via HTTP API
TURSO_DATABASE_URL = os.environ.get("TURSO_DATABASE_URL", "libsql://local-guys-junk-removal-revspace.aws-us-east-2.turso.io")
TURSO_AUTH_TOKEN = os.environ.get("TURSO_AUTH_TOKEN", "")

# Convert libsql:// URL to HTTPS with correct API endpoint
TURSO_HTTP_URL = TURSO_DATABASE_URL.replace("libsql://", "https://") + "/v2/pipeline"

class Location(BaseModel):
    zip_code: str
    city: str
    state: str

class Item(BaseModel):
    item_id: str
    item_name: str
    base_price: float
    total_price: float
    addition: float
    multiplier: float

def execute_query(query: str, params: list = None):
    """Execute a query against Turso database via HTTP API"""
    url = TURSO_HTTP_URL
    
    # Build the request payload
    payload = {
        "statements": [
            {
                "q": query,
                "params": params or []
            }
        ]
    }
    
    # Create the request
    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode('utf-8'),
        headers={
            'Authorization': f'Bearer {TURSO_AUTH_TOKEN}',
            'Content-Type': 'application/json'
        },
        method='POST'
    )
    
    try:
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read().decode('utf-8'))
            return result[0]  # Return first statement result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

@app.get("/api/validate-zip/{zip_code}")
async def validate_zip(zip_code: str):
    result = execute_query("SELECT COUNT(*) as count FROM pricing WHERE zip_code = ?", [zip_code])
    
    if 'results' in result and 'rows' in result['results']:
        count = result['results']['rows'][0][0]
        if count == 0:
            return {"valid": False, "message": "Zip code not found in our database."}
        return {"valid": True, "zip_code": zip_code}
    
    return {"valid": False, "message": "Database query failed."}

@app.get("/api/location/{zip_code}", response_model=Location)
async def get_location(zip_code: str):
    locations = {
        "30144": {"city": "Kennesaw", "state": "Georgia"},
        "30345": {"city": "Atlanta", "state": "Georgia"},
        "30006": {"city": "Marietta", "state": "Georgia"},
        "30081": {"city": "Smyrna", "state": "Georgia"},
    }
    
    loc = locations.get(zip_code, {"city": "Unknown City", "state": "Georgia"})
    return {
        "zip_code": zip_code,
        "city": loc["city"],
        "state": loc["state"]
    }

@app.get("/api/items/{zip_code}", response_model=List[Item])
async def get_items(zip_code: str, search: Optional[str] = None, sort_by: str = "item_name", order: str = "asc"):
    query = """
        SELECT item_id, item_name, price_regular as base_price, CAST(price as REAL) as total_price, 
               price_addition as addition, price_multiplier as multiplier
        FROM pricing
        WHERE zip_code = ?
    """
    params = [zip_code]
    
    if search:
        query += " AND item_name LIKE ?"
        params.append(f"%{search}%")
    
    # Simple whitelist for sorting to prevent injection
    sort_columns = {"item_name": "item_name", "base_price": "price_regular", "total_price": "CAST(price as REAL)"}
    db_sort_col = sort_columns.get(sort_by, "item_name")
    db_order = "ASC" if order.lower() == "asc" else "DESC"
    
    query += f" ORDER BY {db_sort_col} {db_order}"
    
    result = execute_query(query, params)
    
    if 'results' in result and 'rows' in result['results']:
        items = []
        for row in result['results']['rows']:
            items.append({
                "item_id": row[0],
                "item_name": row[1],
                "base_price": float(row[2]),
                "total_price": float(row[3]),
                "addition": float(row[4]),
                "multiplier": float(row[5])
            })
        return items
    
    return []

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
