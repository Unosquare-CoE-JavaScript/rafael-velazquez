(()=>{"use strict";function e(e,t,n){const r=n.value;return{configurable:!0,get(){return r.bind(this)}}}var t;!function(e){e[e.Active=0]="Active",e[e.Finished=1]="Finished"}(t||(t={}));class n{constructor(e,t,n,r,s){this.id=e,this.title=t,this.description=n,this.people=r,this.status=s}}class r extends class{constructor(){this.listeners=[]}addListener(e){this.listeners.push(e)}}{constructor(){super(),this.projects=[]}static getInstance(){return this.instance||(this.instance=new r),this.instance}addProject(e,r,s){const i=new n(Math.random().toString(),e,r,s,t.Active);this.projects.push(i);for(const e of this.listeners)e(this.projects.slice())}moveProject(e,t){const n=this.projects.find((t=>t.id===e));n&&n.status!==t&&(n.status=t,this.updateListeners())}updateListeners(){for(const e of this.listeners)e(this.projects.slice())}}const s=r.getInstance();function i(e){let t=!0;return e.required&&(t=t&&e.value.toString().trim().length>0),null!=e.minLength&&"string"==typeof e.value&&(t=t&&e.value.toString().trim().length>=e.minLength),e.maxLength&&"string"==typeof e.value&&(t=t&&e.value.toString().trim().length<=e.maxLength),null!=e.min&&"number"==typeof e.value&&(t=t&&+e.value>=e.min),e.max&&"number"==typeof e.value&&(t=t&&+e.value<=e.max),t}class o{constructor(e,t,n,r){this.templateElement=document.getElementById(e),this.hostElement=document.getElementById(t);const s=document.importNode(this.templateElement.content,!0);this.element=s.firstElementChild,r&&(this.element.id=r),this.attach(n)}attach(e){this.hostElement.insertAdjacentElement(e?"afterbegin":"beforeend",this.element)}}class l extends o{constructor(){super("project-input","app",!0,"user-input"),this.titleElement=this.element.querySelector("#title"),this.descriptionElement=this.element.querySelector("#description"),this.peopleElement=this.element.querySelector("#people"),this.configure()}gatherUserInput(){const e=this.titleElement.value,t=this.descriptionElement.value,n=this.peopleElement.value,r={value:t,required:!0,minLength:5,maxLength:100},s={value:+n,required:!0,min:1,max:100};if(i({value:e,required:!0,maxLength:20})&&i(r)&&i(s))return[e,t,+n];alert("Check your data and try again.")}submitHandler(e){e.preventDefault(),console.log(this.titleElement.value);const t=this.gatherUserInput();if(!Array.isArray(t))return;const[n,r,i]=t;console.log(n,r,i),s.addProject(n,r,i),this.clear()}clear(){this.titleElement.value="",this.descriptionElement.value="",this.peopleElement.value=""}configure(){this.element.addEventListener("submit",this.submitHandler)}renderContent(){}}!function(e,t,n,r){var s,i=arguments.length,o=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,n,r);else for(var l=e.length-1;l>=0;l--)(s=e[l])&&(o=(i<3?s(o):i>3?s(t,n,o):s(t,n))||o);i>3&&o&&Object.defineProperty(t,n,o)}([e],l.prototype,"submitHandler",null);var a=function(e,t,n,r){var s,i=arguments.length,o=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,n,r);else for(var l=e.length-1;l>=0;l--)(s=e[l])&&(o=(i<3?s(o):i>3?s(t,n,o):s(t,n))||o);return i>3&&o&&Object.defineProperty(t,n,o),o};class c extends o{constructor(e,t){super("single-project",e,!1,t.id),this.project=t,this.configure(),this.renderContent()}get persons(){return 1===this.project.people?"1 person":this.project.people.toString()+" persons"}configure(){this.element.addEventListener("dragstart",this.dragStartHandler),this.element.addEventListener("dragend",this.dragEndHandler)}renderContent(){this.element.querySelector("h2").textContent=this.project.title,this.element.querySelector("h3").textContent=`${this.persons} assigned`,this.element.querySelector("p").textContent=this.project.description}dragStartHandler(e){e.dataTransfer.setData("text/plain",this.project.id),e.dataTransfer.effectAllowed="move"}dragEndHandler(e){console.log("Drag end",e)}}a([e],c.prototype,"dragStartHandler",null),a([e],c.prototype,"dragEndHandler",null);var d=function(e,t,n,r){var s,i=arguments.length,o=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,n,r);else for(var l=e.length-1;l>=0;l--)(s=e[l])&&(o=(i<3?s(o):i>3?s(t,n,o):s(t,n))||o);return i>3&&o&&Object.defineProperty(t,n,o),o};class h extends o{constructor(e){super("project-list","app",!1,`${e}-projects`),this.type=e,this.assignedProjects=[],this.configure(),this.renderContent()}configure(){s.addListener((e=>{this.assignedProjects=e.filter((e=>"active"===this.type?e.status===t.Active:e.status===t.Finished)),this.renderProjects()})),this.element.addEventListener("dragover",this.dragOverHandler),this.element.addEventListener("dragleave",this.dragLeaveHandler),this.element.addEventListener("drop",this.dropHandler)}renderContent(){const e=`${this.type}-projects-list`;this.element.querySelector("ul").id=e,this.element.querySelector("h2").textContent=this.type.toUpperCase()+" PROJECTS"}renderProjects(){const e=document.getElementById(`${this.type}-projects-list`);e.innerHTML="";for(const t of this.assignedProjects)new c(e.id,t)}dragOverHandler(e){e.dataTransfer&&"text/plain"===e.dataTransfer.types[0]&&(e.preventDefault(),this.element.querySelector("ul").classList.add("droppable"))}dropHandler(e){e.preventDefault();const n=e.dataTransfer.getData("text/plain");s.moveProject(n,"active"===this.type?t.Active:t.Finished)}dragLeaveHandler(e){this.element.querySelector("ul").classList.remove("droppable")}}d([e],h.prototype,"dragOverHandler",null),d([e],h.prototype,"dropHandler",null),d([e],h.prototype,"dragLeaveHandler",null),r.getInstance(),new l,new h("active"),new h("finished")})();