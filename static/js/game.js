class Game {
    constructor() {
        this.canvas = this.getCanvas();
        this.ctx = this.canvas.getContext('2d');
        this.character = new Character();
        this.inventory = new Inventory();
        this.combat = new Combat(this.character);
        this.animation = new Animation(this.ctx);

        this.setupEventListeners();
        this.gameLoop();
    }
    getCanvas() {
        if (window.innerWidth <= 768) {
            return document.getElementById('gameCanvasMobile');
        } else {
            return document.getElementById('gameCanvasDesktop');
        }
    }

    setupEventListeners() {
        document.addEventListener('keydown', (e) => this.handleInput(e));
        document.getElementById('saveGame').addEventListener('click', () => this.saveGame());
        document.getElementById('loadGame').addEventListener('click', () => this.loadGame());
    }

    handleInput(e) {
        switch (e.key) {
            case 'ArrowUp':
                this.character.moveUp();
                break;
            case 'ArrowDown':
                this.character.moveDown();
                break;
            case 'ArrowLeft':
                this.character.moveLeft();
                break;
            case 'ArrowRight':
                this.character.moveRight();
                break;
            case ' ':
                this.combat.attack();
                break;
        }
    }

    async saveGame() {
        const gameState = {
            character: this.character.serialize(),
            inventory: this.inventory.serialize()
        };

        const response = await fetch('/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(gameState)
        });

        if (response.ok) {
            alert('Game saved successfully!');
        }
    }

    async loadGame() {
        const response = await fetch('/load');
        const data = await response.json();

        if (data.status !== 'no_save') {
            this.character.deserialize(data.character);
            this.inventory.deserialize(data.inventory);
            this.updateUI();
        }
    }

    updateUI() {
        const statsDiv = document.getElementById('stats');
        statsDiv.innerHTML = `
            <p>Level: ${this.character.level}</p>
            <p>Health: ${this.character.health}/${this.character.maxHealth}</p>
            <p>Experience: ${this.character.experience}</p>
            <p>Strength: ${this.character.strength}</p>
            <p>Defense: ${this.character.defense}</p>
        `;
    }

    gameLoop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.animation.drawCharacter(this.character);
        this.updateUI();

        requestAnimationFrame(() => this.gameLoop());
    }
}

window.onload = () => {
    new Game();
};
