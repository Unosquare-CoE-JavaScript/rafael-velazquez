import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class Book {
    @IsNotEmpty()
    title: string;

    @IsNumber()
    @IsPositive()
    price: number;

    constructor(t: string, p: number) {
        this.title = t;
        this.price = p;
    }

    getInfo() {
        return 'Title: ' + this.title + ', Price: ' + this.price;
    }
}