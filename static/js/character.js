class Character {
    constructor() {
        this.x = 400;
        this.y = 300;
        this.level = 1;
        this.health = 100;
        this.maxHealth = 100;
        this.experience = 0;
        this.strength = 10;
        this.defense = 5;
        this.skills = [];
        this.speed = 5;
    }

    moveUp() {
        this.y = Math.max(0, this.y - this.speed);
    }

    moveDown() {
        this.y = Math.min(600, this.y + this.speed);
    }

    moveLeft() {
        this.x = Math.max(0, this.x - this.speed);
    }

    moveRight() {
        this.x = Math.min(800, this.x + this.speed);
    }

    gainExperience(amount) {
        this.experience += amount;
        if (this.experience >= this.level * 100) {
            this.levelUp();
        }
    }

    levelUp() {
        this.level++;
        this.maxHealth += 20;
        this.health = this.maxHealth;
        this.strength += 2;
        this.defense += 1;
        this.experience = 0;
    }

    serialize() {
        return {
            x: this.x,
            y: this.y,
            level: this.level,
            health: this.health,
            maxHealth: this.maxHealth,
            experience: this.experience,
            strength: this.strength,
            defense: this.defense,
            skills: this.skills
        };
    }

    deserialize(data) {
        Object.assign(this, data);
    }
}
