"use strict";
class Product {
    constructor(productName, productScale) {
        this.name = productName;
        this.scale = productScale;
    }
    getScale() {
        return this.scale;
    }
    getName() {
        return this.name;
    }
}
class Tomato extends Product {
    constructor(name, scale) {
        super(name, scale);
    }
}
class Apple extends Product {
    constructor(name, scale) {
        super(name, scale);
    }
}
class Scales {
    constructor() {
        this.products = [];
    }
    add(product) {
        this.products.push(product);
    }
    getSumScale() {
        return this.products.reduce((sum, product) => sum + product.getScale(), 0);
    }
    getNameList() {
        return this.products.map(product => product.getName());
    }
}
const apple1 = new Apple("Apple Golden", 1.5);
const apple2 = new Apple("Apple Semerenko", 1.4);
const tomato1 = new Tomato("Tomato Pink", 1.2);
const tomato2 = new Tomato("Tomato Heart", 0.9);
const scales = new Scales();
scales.add(apple1);
scales.add(apple2);
scales.add(tomato1);
scales.add(tomato2);
console.log(scales.getSumScale());
console.log(scales.getNameList());
