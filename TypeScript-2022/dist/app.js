import { ProjectInput } from "./components/projects/input.js";
import { ProjectList } from "./components/projects/list.js";
import { ProjectState } from "./state/project-state.js";
ProjectState.getInstance();
new ProjectInput();
new ProjectList('active');
new ProjectList('finished');
//# sourceMappingURL=app.js.map