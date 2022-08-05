var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { autobind as Autobind } from "../../decorators/autobind.js";
import { projectState } from "../../state/project-state.js";
import * as Validation from "../../util/validation.js";
import Component from "../base-component.js";
export class ProjectInput extends Component {
    constructor() {
        super('project-input', 'app', true, 'user-input');
        this.titleElement = this.element.querySelector('#title');
        this.descriptionElement = this.element.querySelector('#description');
        this.peopleElement = this.element.querySelector('#people');
        this.configure();
    }
    gatherUserInput() {
        const enteredTitle = this.titleElement.value;
        const enteredDescription = this.descriptionElement.value;
        const enteredPeople = this.peopleElement.value;
        const titleValidatable = {
            value: enteredTitle,
            required: true,
            maxLength: 20
        };
        const descriptionValidatable = {
            value: enteredDescription,
            required: true,
            minLength: 5,
            maxLength: 100
        };
        const peopleValidatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 100
        };
        if (!Validation.validateInput(titleValidatable) || !Validation.validateInput(descriptionValidatable) || !Validation.validateInput(peopleValidatable)) {
            alert('Check your data and try again.');
            return;
        }
        return [enteredTitle, enteredDescription, +enteredPeople];
    }
    submitHandler(event) {
        event.preventDefault();
        console.log(this.titleElement.value);
        const userInput = this.gatherUserInput();
        if (!Array.isArray(userInput)) {
            return;
        }
        const [title, description, people] = userInput;
        console.log(title, description, people);
        projectState.addProject(title, description, people);
        this.clear();
    }
    clear() {
        this.titleElement.value = '';
        this.descriptionElement.value = '';
        this.peopleElement.value = '';
    }
    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }
    renderContent() { }
}
__decorate([
    Autobind
], ProjectInput.prototype, "submitHandler", null);
//# sourceMappingURL=input.js.map