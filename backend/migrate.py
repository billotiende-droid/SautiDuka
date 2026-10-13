from database.db import engine
from models.schema import SQLModel

def run_migrations():
    print("Connecting to Supabase PostgreSQL...")
    try:
        # This inspects your SQLModel definitions and creates matching tables in Supabase
        SQLModel.metadata.create_all(engine)
        print("Database migrations completed successfully! All tables created.")
    except Exception as e:
        print(f"Error running migrations: {e}")

if __name__ == "__main__":
    run_migrations()