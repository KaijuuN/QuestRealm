from database import db
from flask_login import UserMixin
from datetime import datetime

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256))
    characters = db.relationship('Character', backref='user', lazy=True)

class Character(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), nullable=False)
    level = db.Column(db.Integer, default=1)
    health = db.Column(db.Integer, default=100)
    max_health = db.Column(db.Integer, default=100)
    experience = db.Column(db.Integer, default=0)
    strength = db.Column(db.Integer, default=10)
    defense = db.Column(db.Integer, default=5)
    x_position = db.Column(db.Float, default=400)
    y_position = db.Column(db.Float, default=300)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    inventory_items = db.relationship('InventoryItem', backref='character', lazy=True)

class InventoryItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), nullable=False)
    item_type = db.Column(db.String(32), nullable=False)
    character_id = db.Column(db.Integer, db.ForeignKey('character.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)