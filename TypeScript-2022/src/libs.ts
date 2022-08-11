import _ from 'lodash';
import { plainToClass } from 'class-transformer';
import { Book } from './models/book';
import { validate } from 'class-validator';
import axios from 'axios';

declare var GLOBAL: any;

console.log(_.shuffle([4,3,6,8,9]));

console.log('GLOBAL:', GLOBAL);

// Class transformers

const booksJson = [
    { title: 'A book', price: 26.99 },
    { title: 'A novel', price: 13.20 }
]

const books = plainToClass(Book, booksJson);

console.log('Books:', books);

// Class validations

const newProduct = new Book('', -34.00);

validate(newProduct).then(errors => {
    if (errors.length > 0) {
        console.log('Validation Errors: ', errors);
    } else {
        console.log(newProduct.getInfo());
    }
})

axios.get('https://localhost');