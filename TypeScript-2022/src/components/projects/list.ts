import { autobind } from "../../decorators/autobind";
import { DragTarget } from "../../models/drag-drop";
import { Project, ProjectStatus } from "../../models/project";
import { projectState } from "../../state/project-state";
import Component from "../base-component";
import { ProjectItem } from "./item";

export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
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