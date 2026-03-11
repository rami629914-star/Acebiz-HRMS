from app import app, init_db

# Initialize database tables on first request
init_db()

# Vercel serverless handler
app = app
