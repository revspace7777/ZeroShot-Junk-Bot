import sys
import os

# Add the web-demo directory to the path
repo_root = os.path.join(os.path.dirname(__file__), '..', '..')
sys.path.insert(0, os.path.join(repo_root, 'web-demo'))

from mangum import Mangum
from main import app

# Mangum adapter for AWS Lambda/Netlify Functions
handler = Mangum(app, lifespan="off")
