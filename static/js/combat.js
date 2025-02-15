class Combat {
    constructor(character) {
        this.character = character;
    }

    attack() {
        // Calculate damage based on character's strength
        const damage = this.character.strength * 2;
        
        // Simulate enemy taking damage
        console.log(`Dealt ${damage} damage!`);
        
        // Grant experience for successful attack
        this.character.gainExperience(10);
    }

    takeDamage(amount) {
        const actualDamage = Math.max(1, amount - this.character.defense);
        this.character.health = Math.max(0, this.character.health - actualDamage);
        
        if (this.character.health === 0) {
            this.handleDeath();
        }
    }

    handleDeath() {
        alert('Game Over!');
        // Reset character stats
        this.character.health = this.character.maxHealth;
    }
}
