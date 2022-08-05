import { autobind } from "../../decorators/autobind.js";
import { Draggable } from "../../models/drag-drop.js";
import { Project } from "../../models/project.js";
import { Component } from "../base-component.js";

export class ProjectItem extends Component<HTMLDivElement, HTMLLIElement> implements Draggable {
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