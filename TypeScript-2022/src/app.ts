// --- INTERFACES ---

interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

interface Draggable {
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
}

interface DragTarget {
    dragOverHandler(event: DragEvent): void;
    dropHandler(event: DragEvent): void;
    dragLeaveHandler(event: DragEvent): void;
}

// --- TYPES AND ENUMS ---

type Listener<T> = (items: T[]) => void;

enum ProjectStatus { Active, Finished };


// --- DECORATORS

function autobind(_target: any, _method: string, description: PropertyDescriptor) {
    const originalMethod = description.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    }
    return adjDescriptor;
}

function validateInput(input: Validatable) {
    let isValid = true;

    if (input.required) {
        isValid = isValid && input.value.toString().trim().length > 0
    }

    if (input.minLength != null  && typeof input.value === 'string') {
        isValid = isValid && input.value.toString().trim().length >= input.minLength
    }

    if (input.maxLength && typeof input.value === 'string') {
        isValid = isValid && input.value.toString().trim().length <= input.maxLength
    }

    if (input.min != null && typeof input.value === 'number') {
        isValid = isValid && +input.value >= input.min
    }

    if (input.max && typeof input.value === 'number') {
        isValid = isValid && +input.value <= input.max
    }

    return isValid;
}

abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;

    constructor(templateId: string, hostElement: string, insertAtStart: boolean, newElementId?: string) {
        this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
        this.hostElement = document.getElementById(hostElement) as T;

        const importedNode = document.importNode(this.templateElement.content, true);

        this.element = importedNode.firstElementChild as U;
        if (newElementId) {
            this.element.id = newElementId;
        }

        this.attach(insertAtStart);
    }

    private attach(insertAtStart: boolean) {
        this.hostElement.insertAdjacentElement(insertAtStart ? 'afterbegin' : 'beforeend', this.element);
    }

    abstract configure(): void;
    abstract renderContent(): void;
}

// --- APPLICATION ---

class Project {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public people: number,
        public status: ProjectStatus
    ) {}
}

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
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

class ProjectItem extends Component<HTMLDivElement, HTMLLIElement> implements Draggable {
    constructor(hostId: string, private project: Project) {
        super('single-project', hostId, false, project.id);

        this.configure();
        this.renderContent();
    }

    get persons() {
        if (this.project.people === 1) {
            return '1 person';
        }
        return this.project.people.toString() + ' persons';
    }

    configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);
    }

    renderContent() {
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = `${this.persons} assigned`;
        this.element.querySelector('p')!.textContent = this.project.description;
    }

    @autobind
    dragStartHandler(event: DragEvent): void {
        event.dataTransfer!.setData('text/plain', this.project.id);
        event.dataTransfer!.effectAllowed = 'move';
    }

    @autobind
    dragEndHandler(event: DragEvent): void {
        console.log('Drag end', event);
    }
}

class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
    assignedProjects: Project[];

    constructor(private type: 'active' | 'finished') {
        super('project-list', 'app', false, `${type}-projects`);
        
        this.assignedProjects = [];

        this.configure();
        this.renderContent();
    }

    configure() {
        projectState.addListener((projects: Project[]) => {
            this.assignedProjects = projects.filter(project => {
                if (this.type === 'active') {
                    return project.status === ProjectStatus.Active;
                }
                return project.status === ProjectStatus.Finished;
            });
            this.renderProjects();
        });

        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);
    }

    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
    }

    private renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`)!;
        listEl.innerHTML = '';
        for (const projectItem of this.assignedProjects) {
            new ProjectItem(listEl.id, projectItem);
        }
    }

    @autobind
    dragOverHandler(event: DragEvent): void {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            const ulElement = this.element.querySelector('ul')!;
            ulElement.classList.add('droppable');
        }
    }

    @autobind
    dropHandler(event: DragEvent): void {
        event.preventDefault();
        const projectId = event.dataTransfer!.getData('text/plain');
        projectState.moveProject(
          projectId,
          this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished
        );
    }

    @autobind
    dragLeaveHandler(_event: DragEvent): void {
        const ulElement = this.element.querySelector('ul')!;
        ulElement.classList.remove('droppable');
    }
}

// --- STATE ---

class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn);
    }
}

class ProjectState extends State<Project> {
    private static instance: ProjectState;
    private projects: Project[] = [];

    private constructor() {
        super();
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new ProjectState();
        }
        return this.instance;
    }

    addProject(title: string, description: string, people: number) {
        const newProject = new Project(
            Math.random().toString(),
            title,
            description,
            people,
            ProjectStatus.Active
        );

        this.projects.push(newProject);

        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }

    moveProject(projectId: string, newStatus: ProjectStatus) {
        const project = this.projects.find(project => project.id === projectId);
        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.updateListeners();
        }
    }

    private updateListeners() {
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}

const projectState = ProjectState.getInstance();

const projectInput = new ProjectInput();
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');