import sys
import os

# Set the database path for the serverless environment
# The database is at the repo root: data/goloadup_consolidated.db
# This function is at: netlify/functions/api.py
repo_root = os.path.join(os.path.dirname(__file__), '..', '..')
os.environ['DB_PATH'] = os.path.abspath(os.path.join(repo_root, 'data', 'goloadup_consolidated.db'))

# Add the web-demo directory to the path
sys.path.insert(0, os.path.join(repo_root, 'web-demo'))

from mangum import Mangum
from main import app

# Mangum adapter for AWS Lambda/Netlify Functions
handler = Mangum(app, lifespan="off")
