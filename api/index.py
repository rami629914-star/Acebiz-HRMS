import os
import sys

# Add parent directory to path so app.py can be imported
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from app import app, init_db

# Fix template and static folder paths for Vercel
app.template_folder = os.path.join(os.path.dirname(__file__), '..', 'templates')
app.static_folder = os.path.join(os.path.dirname(__file__), '..', 'static')

# Initialize database tables
init_db()

# Vercel serverless handler
app = app
