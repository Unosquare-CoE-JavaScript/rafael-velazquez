
const userInput = <HTMLInputElement>document.getElementById('user-input');
const userInputElement = document.getElementById('user-input')! as HTMLInputElement;

userInput.value = 'Other val';
userInputElement.value = 'Some val';