from flask import Blueprint, request, render_template, redirect, url_for, flash, session
from flask_login import login_user, logout_user, login_required
from werkzeug.security import generate_password_hash, check_password_hash
from models import User
from database import db
import logging

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')

        if not username or not email or not password:
            flash('All fields are required')
            return redirect(url_for('auth.register'))

        if User.query.filter_by(username=username).first():
            flash('Username already exists')
            return redirect(url_for('auth.register'))

        if User.query.filter_by(email=email).first():
            flash('Email already registered')
            return redirect(url_for('auth.register'))

        user = User(
            username=username,
            email=email,
            password_hash=generate_password_hash(password)
        )
        db.session.add(user)
        db.session.commit()

        login_user(user)
        flash('Registration successful! Welcome to the game.')
        return redirect(url_for('index'))

    return render_template('auth/register.html')

@auth_bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')

        logging.debug(f"Login attempt for username: {username}")

        user = User.query.filter_by(username=username).first()
        if user and check_password_hash(user.password_hash, password):
            logging.debug("Password verified successfully")
            login_user(user)
            flash('Successfully logged in!')
            next_page = request.args.get('next')
            return redirect(next_page if next_page else url_for('index'))

        logging.debug("Invalid login attempt")
        flash('Invalid username or password')
    return render_template('auth/login.html')

@auth_bp.route('/logout')
@login_required
def logout():
    # Clear game state from session
    session.pop('game_state', None)
    # Clear any other game-related session data
    for key in list(session.keys()):
        if key.startswith('game_'):
            session.pop(key, None)

    logout_user()
    flash('You have been successfully logged out.')
    return redirect(url_for('auth.login'))