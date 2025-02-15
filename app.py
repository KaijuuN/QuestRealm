import os
import json
from flask import Flask, render_template, request, jsonify, session
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/save', methods=['POST'])
def save_game():
    game_state = request.json
    session['game_state'] = json.dumps(game_state)
    return jsonify({"status": "success"})

@app.route('/load')
def load_game():
    game_state = session.get('game_state')
    if game_state:
        return jsonify(json.loads(game_state))
    return jsonify({"status": "no_save"})
