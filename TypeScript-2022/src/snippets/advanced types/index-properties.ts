
interface ErrorContainer {
    [prop: string]: String;
}

const respErrors: ErrorContainer = {
    email: 'Invalid format',
    phone: 'Must have at least 8 digits'
}