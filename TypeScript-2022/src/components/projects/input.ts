import { autobind } from "../../decorators/autobind.js";
import { projectState } from "../../state/project-state.js";
import { Validatable, validateInput } from "../../util/validation.js";
import { Component } from "../base-component.js";

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleElement: HTMLInputElement;
    descriptionElement: HTMLInputElement;
    peopleElement: HTMLInputElement;

    constructor() {
        super('project-input', 'app', true, 'user-input');
        
        this.titleElement = this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionElement = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleElement = this.element.querySelector('#people') as HTMLInputElement;

        this.configure();
    }

    private gatherUserInput(): [string, string, number] | undefined {
        const enteredTitle = this.titleElement.value;
        const enteredDescription = this.descriptionElement.value;
        const enteredPeople = this.peopleElement.value;

        const titleValidatable: Validatable = {
            value: enteredTitle,
            required: true,
            maxLength: 20
        }

        const descriptionValidatable: Validatable = {
            value: enteredDescription,
            required: true,
            minLength: 5,
            maxLength: 100
        }

        const peopleValidatable: Validatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 100
        }

        if (!validateInput(titleValidatable) || !validateInput(descriptionValidatable) || !validateInput(peopleValidatable)) {
            alert('Check your data and try again.');
            return;
        }

        return [enteredTitle, enteredDescription, +enteredPeople];
    }

    @autobind
    private submitHandler(event: Event) {
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

    private clear() {
        this.titleElement.value = '';
        this.descriptionElement.value = '';
        this.peopleElement.value = '';
    }

    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }

    renderContent(): void {}
}