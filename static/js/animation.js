class Animation {
    constructor(ctx) {
        this.ctx = ctx;
    }

    drawCharacter(character) {
        if (character.image) {
            this.ctx.drawImage(character.image, character.x, character.y);
        } else {
            // Fallback: Zeichne einen Platzhalter, wenn kein Bild vorhanden ist
            this.ctx.fillStyle = 'green';
            this.ctx.fillRect(character.x, character.y, 50, 50); // Beispielgröße
            // Draw health bar
            this.drawHealthBar(character);
        }
    }

    drawHealthBar(character) {
        const barWidth = 40;
        const barHeight = 5;
        const healthPercentage = character.health / character.maxHealth;

        // Background
        this.ctx.fillStyle = '#ff0000';
        this.ctx.fillRect(character.x - barWidth / 2, character.y - 30, barWidth, barHeight);

        // Health
        this.ctx.fillStyle = '#00ff00';
        this.ctx.fillRect(character.x - barWidth / 2, character.y - 30, barWidth * healthPercentage, barHeight);
    }
    startAnimationLoop(game) {
        const loop = () => {
            this.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
            this.drawCharacter(game.character);
            requestAnimationFrame(loop);
        };
        loop();
    }
}
