module.exports = class Fruit {
    constructor(name, pricePerPiece, weight) {
        this.name = name
        this.pricePerPiece = Number(pricePerPiece)
        this.weight = Number(weight)
    }
}