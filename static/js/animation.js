class Animation {
    constructor(ctx) {
        this.ctx = ctx;
    }

    drawCharacter(character) {
        // Draw character as a simple circle for now
        this.ctx.beginPath();
        this.ctx.arc(character.x, character.y, 20, 0, Math.PI * 2);
        this.ctx.fillStyle = '#4a9eff';
        this.ctx.fill();
        this.ctx.closePath();

        // Draw health bar
        this.drawHealthBar(character);
    }

    drawHealthBar(character) {
        const barWidth = 40;
        const barHeight = 5;
        const healthPercentage = character.health / character.maxHealth;
        
        // Background
        this.ctx.fillStyle = '#ff0000';
        this.ctx.fillRect(character.x - barWidth/2, character.y - 30, barWidth, barHeight);
        
        // Health
        this.ctx.fillStyle = '#00ff00';
        this.ctx.fillRect(character.x - barWidth/2, character.y - 30, barWidth * healthPercentage, barHeight);
    }
}
