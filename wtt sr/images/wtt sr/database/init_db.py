from backend.app import app, db
from backend.models import User, Category, Product

def init_db():
    with app.app_context():
        db.create_all()
        
        # Create default categories if they don't exist
        if not Category.query.first():
            categories = ['Electronics', 'Clothing', 'Home', 'Books']
            for name in categories:
                db.session.add(Category(name=name))
            db.session.commit()
            print("Default categories created.")
            
        print("Database initialized successfully.")

if __name__ == '__main__':
    init_db()
