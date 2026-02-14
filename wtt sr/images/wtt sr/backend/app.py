import os
from flask import Flask, render_template, request, redirect, url_for, flash, session
from backend.models import db, User, Product, Category, Tag
from backend.validation import validate_user_registration, validate_product
from sqlalchemy.exc import IntegrityError

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key_here'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///../database/store.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

@app.route('/')
def index():
    products = Product.query.all()
    return render_template('index.html', products=products)

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        errors = validate_user_registration(request.form)
        if errors:
            for error in errors:
                flash(error, 'danger')
            return render_template('register.html')
        
        user = User(username=request.form['username'], email=request.form['email'])
        user.set_password(request.form['password'])
        
        try:
            db.session.add(user)
            db.session.commit()
            flash('Registration successful! Please login.', 'success')
            return redirect(url_for('login'))
        except IntegrityError:
            db.session.rollback()
            flash('Username or Email already exists.', 'danger')
            
    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        user = User.query.filter_by(username=request.form['username']).first()
        if user and user.check_password(request.form['password']):
            session['user_id'] = user.id
            session['is_admin'] = user.is_admin
            flash('Logged in successfully.', 'success')
            return redirect(url_for('index'))
        else:
            flash('Invalid username or password.', 'danger')
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.clear()
    flash('Logged out.', 'info')
    return redirect(url_for('index'))

# CRUD Operations for Products (Admin only)
@app.route('/product/new', methods=['GET', 'POST'])
def create_product():
    if not session.get('is_admin'):
        flash('Admin access required.', 'warning')
        return redirect(url_for('login'))

    if request.method == 'POST':
        errors = validate_product(request.form)
        if errors:
            for error in errors:
                flash(error, 'danger')
        else:
            product = Product(
                name=request.form['name'],
                description=request.form.get('description'),
                price=float(request.form['price']),
                category_id=int(request.form['category_id'])
            )
            db.session.add(product)
            db.session.commit()
            flash('Product created successfully!', 'success')
            return redirect(url_for('index'))

    categories = Category.query.all()
    return render_template('product_form.html', categories=categories, action='Create')

@app.route('/product/<int:id>/edit', methods=['GET', 'POST'])
def edit_product(id):
    if not session.get('is_admin'):
        flash('Admin access required.', 'warning')
        return redirect(url_for('login'))
        
    product = Product.query.get_or_404(id)
    
    if request.method == 'POST':
        errors = validate_product(request.form)
        if errors:
            for error in errors:
                flash(error, 'danger')
        else:
            product.name = request.form['name']
            product.description = request.form.get('description')
            product.price = float(request.form['price'])
            product.category_id = int(request.form['category_id'])
            db.session.commit()
            flash('Product updated successfully!', 'success')
            return redirect(url_for('index'))

    categories = Category.query.all()
    return render_template('product_form.html', categories=categories, product=product, action='Edit')

@app.route('/product/<int:id>/delete', methods=['POST'])
def delete_product(id):
    if not session.get('is_admin'):
        flash('Admin access required.', 'warning')
        return redirect(url_for('login'))
        
    product = Product.query.get_or_404(id)
    db.session.delete(product)
    db.session.commit()
    flash('Product deleted.', 'success')
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
