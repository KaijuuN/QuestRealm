class Inventory {
    constructor() {
        this.items = [];
        this.maxSize = 10;
    }

    addItem(item) {
        if (this.items.length < this.maxSize) {
            this.items.push(item);
            this.updateUI();
            return true;
        }
        return false;
    }

    removeItem(index) {
        if (index >= 0 && index < this.items.length) {
            this.items.splice(index, 1);
            this.updateUI();
            return true;
        }
        return false;
    }

    updateUI() {
        const inventoryDiv = document.getElementById('inventory');
        inventoryDiv.innerHTML = this.items.map((item, index) => 
            `<div class="item">${item.name}</div>`
        ).join('');
    }

    serialize() {
        return {
            items: this.items,
            maxSize: this.maxSize
        };
    }

    deserialize(data) {
        Object.assign(this, data);
        this.updateUI();
    }
}
