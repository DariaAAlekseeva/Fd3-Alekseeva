class Product {

    name: string;
    scale: number;
    constructor(productName: string, productScale: number) {
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

    constructor(name: string, scale: number) {
        super(name, scale);
    }
}

class Apple extends Product {

    constructor(name: string, scale: number) {
        super(name, scale);
    }
}


class Scales {
    
    products: Product[] = [];

    add(product: Product): void {
        this.products.push(product);
    }
    getSumScale(): number {
        return this.products.reduce((sum, product) => sum + product.getScale(), 0);
    }
    getNameList(): string[] {
        return this.products.map(product => product.getName());

    }

}

const apple1 = new Apple("Apple Golden", 1.5);
const apple2 = new Apple("Apple Semerenko", 1.4);
const tomato1 = new Tomato("Tomato Pink", 1.2);
const tomato2 = new Tomato ("Tomato Heart", 0.9);

const scales= new Scales();
scales.add (apple1);
scales.add (apple2);
scales.add (tomato1);
scales.add (tomato2);

console.log (scales.getSumScale());
console.log (scales.getNameList());