from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
import json
from typing import List, Optional
from pydantic import BaseModel
import psycopg2
from psycopg2.extras import RealDictCursor

app = FastAPI(title="Local Guys Junk Removal API")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Postgres (Neon) Database Connection using DATABASE_URL env variable
DATABASE_URL = os.environ.get("DATABASE_URL")

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

def get_db_connection():
    if not DATABASE_URL:
        raise HTTPException(status_code=500, detail="DATABASE_URL environment variable not set")
    conn = psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor)
    return conn

def execute_query(query: str, params: tuple = None, fetch_one: bool = False):
    """Execute a query against Neon Postgres database"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute(query, params or ())
        
        if fetch_one:
            result = cursor.fetchone()
        else:
            result = cursor.fetchall()
            
        conn.close()
        return result
    except Exception as e:
        print(f"Database Query Error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

@app.get("/api/validate-zip/{zip_code}")
async def validate_zip(zip_code: str):
    # Use %s for Postgres placeholders
    result = execute_query("SELECT COUNT(*) as count FROM pricing WHERE zip_code = %s", (zip_code,), fetch_one=True)
    
    # RealDictCursor returns dict-like objects
    if result:
        count = result['count']
        if count > 0:
            return {"valid": True, "zip_code": zip_code}
    
    return {"valid": False, "message": "Zip code not found in our database."}

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
        SELECT item_id, item_name, price_regular as base_price, CAST(price as FLOAT) as total_price, 
               price_addition as addition, price_multiplier as multiplier
        FROM pricing
        WHERE zip_code = %s
    """
    params = [zip_code]
    
    if search:
        query += " AND item_name ILIKE %s"
        params.append(f"%{search}%")
    
    # Simple whitelist for sorting to prevent injection
    sort_columns = {"item_name": "item_name", "base_price": "price_regular", "total_price": "CAST(price as FLOAT)"}
    db_sort_col = sort_columns.get(sort_by, "item_name")
    db_order = "ASC" if order.lower() == "asc" else "DESC"
    
    query += f" ORDER BY {db_sort_col} {db_order}"
    
    results = execute_query(query, tuple(params))
    
    if results:
        items = []
        for row in results:
            # RealDictCursor returns dict objects
            items.append({
                "item_id": row['item_id'],
                "item_name": row['item_name'],
                "base_price": float(row['base_price'] or 0),
                "total_price": float(row['total_price'] or 0),
                "addition": float(row['addition'] or 0),
                "multiplier": float(row['multiplier'] or 0)
            })
        return items
    
    return []

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
