import re

def validate_user_registration(data):
    errors = []
    if not data.get('username'):
        errors.append("Username is required")
    if not data.get('email'):
        errors.append("Email is required")
    elif not re.match(r"[^@]+@[^@]+\.[^@]+", data['email']):
        errors.append("Invalid email format")
    if not data.get('password') or len(data['password']) < 6:
        errors.append("Password must be at least 6 characters long")
    return errors

def validate_product(data):
    errors = []
    if not data.get('name'):
        errors.append("Product name is required")
    if not data.get('price'):
        errors.append("Price is required")
    try:
        float(data.get('price', 0))
    except ValueError:
        errors.append("Price must be a number")
    if not data.get('category_id'):
        errors.append("Category is required")
    return errors
