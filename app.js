const _private = new WeakMap()
//Usamos esta clase para usar su objeto properties.

class Book{
//solo contiene variables y funciones, mas no dara resultados
    constructor(title, author, price){//El método constructor es un metodo especial para crear e inicializar un objeto creado a partir de una clase.
        const properties = {
            _title:title, 
            _author:author,
            _price:price
        }

        _private.set(this, {properties});
    }
//solo nos importan estas tres propiedades, la abstraccion se centra en los detalles 
//necesarios para el sistema que estamos creando
    //Usando el get, obtiene el titulo del libro:
    get title() {
        return _private.get(this).properties["_title"];
    }
    //Usando el set, modificamos el titulo del libro:
    set title(newTitle) {
        return _private.get(this).properties["_title"]=newTitle;
    }

    get author() {
        return _private.get(this).properties["_author"];
    }
    //Usando el set, modificamos el titulo del libro:
    set author(newAuthor) {
        return _private.get(this).properties["_author"]=newAuthor;
    }

    get price() {
        return _private.get(this).properties["_price"];
    }
    //Usando el set, modificamos el titulo del libro:
    set price(newPrice) {
        return _private.get(this).properties["_price"]=newPrice;
    }

    getAllData(){
        console.log( `Título: ${this.title}, Autor: ${this.author}, Precio: ${this.price}`);//Con esto aplicamos polimorfismo, esta funcion debe estar en la clase padre.
    }
}

class Comic extends Book{//Con extends estamos generando una herencia de la clase comic de la clase book.
    //solo contiene variables y funciones, mas no dara resultados
        constructor(name, author, price, illustrators){
            super(name, author, price);//super hace referencia la clase padre.
            this.illustrators=illustrators//Esta propiedad no la podemos agregar al super, porque en ela clase padre no existe.
        }
        addIlustrator(newIlustrator = []){
            this.illustrators.push(newIlustrator);//El método push() añade uno o más elementos al final de un array y devuelve la nueva longitud del array.1
        }
        getAllData(){
            super.getAllData();
            console.log(`Ilustradores: ${this.illustrators}`);//Hacemos esto ya que esta propiedad no la tenemos en clase padre. Por ello sobreescribimos el metodo, usamos super para obtener valores de la clase padre.
        }        
}

class ShoppingCart {
    constructor(){
        this.products = [];
    }

    addProduct(amount, price){
        //2**150 en caso sean dos comic1
        this.products.push(...Array(amount).fill(price));//fill es para rellenar.
        //los ... antes del array nos facilitaran ver sus valores en la consola
    }

    showProducts(){
        console.log(this.products);
    }

    calcTotal() {
        return this.products
            .map( price => price )//map lo que hace es ejecutar una funcion sobre los elementos que se selccionen.
            .reduce((ac, price) => ac + price, 0);//el cero es el valor que se le dara a ac(acumulador).
    }

    printTicket(){
        console.log(`Total a pagar ${this.calcTotal()}`);//utilizamos las comillas ``
    }
}

//Instancia de Book:
const book1 = new Book("1984","G.O",350);
const book2 = new Book("Frankenstein","M.S",200);

const comic1 = new Comic("The killing Joke", "A.M", 150, ["B.B"]);

comic1.addIlustrator("J.H");
console.log(comic1.illustrators);

const cart = new ShoppingCart();

cart.addProduct(2,comic1.price);

cart.addProduct(3,book1.price);

cart.showProducts();

cart.printTicket();

book1.getAllData();
book2.getAllData();
comic1.getAllData();//Da resultado porque estamos heredando de la clase padre, lo que quiere decir que tenemos acceso a todos los metodos y propiedades de dicha clase.