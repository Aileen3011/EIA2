namespace L06_Hexenkessel {
    interface Item{
        name: string;
        price:: number;
    }
    interface Data {
        [category: string]: Item();
    }
    let data: Data{
        Zutaten:[
            {name: "Gift", price: 100},
            {name: "Froschbeine", price: 30},
            {name:"Rattenschwänze", price: 40},
            {name:"Blumenblätter", price: 60},
        ]
    }
}