import { ProjectInput } from "./components/projects/input";
import { ProjectList } from "./components/projects/list";
import { ProjectState } from "./state/project-state";
import "reflect-metadata";

require('./libs');

ProjectState.getInstance();

new ProjectInput();
new ProjectList('active');
new ProjectList('finished');