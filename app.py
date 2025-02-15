import os
import json
from flask import Flask, render_template, request, jsonify, session, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, login_required, current_user
from sqlalchemy.orm import DeclarativeBase
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Initialize SQLAlchemy with a base class
class Base(DeclarativeBase):
    pass

db = SQLAlchemy(model_class=Base)
login_manager = LoginManager()

# Create Flask app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET")

# Configure database
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URL")
app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {
    "pool_recycle": 300,
    "pool_pre_ping": True,
}

# Initialize database and login manager
db.init_app(app)
login_manager.init_app(app)
login_manager.login_view = 'auth.login'  # Specify the login view route

@login_manager.user_loader
def load_user(user_id):
    from models import User
    return User.query.get(int(user_id))

# Create all database tables
with app.app_context():
    import models  # This import must be after db initialization
    db.create_all()

# Register blueprints
from routes.auth import auth_bp
app.register_blueprint(auth_bp)

@app.route('/')
@login_required
def index():
    return render_template('index.html')

@app.route('/save', methods=['POST'])
@login_required
def save_game():
    game_state = request.json
    session['game_state'] = json.dumps(game_state)
    return jsonify({"status": "success"})

@app.route('/load')
@login_required
def load_game():
    game_state = session.get('game_state')
    if game_state:
        return jsonify(json.loads(game_state))
    return jsonify({"status": "no_save"})