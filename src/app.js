class ToDoList {
    constructor() {
        this.darkTheme = false;
        this.items = [];
        this.componentFrame = document.querySelector("#component");
        this.frame = document.createElement("div");
        this.frame.id = "frame";

        // ctrls stores the active elements
        this.ctrls = {};
        // DOM stores layout and misc elements
        this.DOM = {};

        this.buildAll();
        this.initEvents();
    }
    buildAll() {
        // This calls all methods that build each page section
        // Each method populates this.ctrls with elements having active roles (search bar, buttons...)

        this.buildHeader();
        this.buildMain();
    }
    buildHeader() {
        // This builds the top part of the page : the title, search bar and dark mode switch

        const title = make("h2", "", "To do :");
        this.ctrls.darkSwitch = make("button", "btn-dark");
        this.ctrls.searchBar = make("input", "search-bar");
        this.ctrls.searchBar.type = "text";

        const side = make("div");
        side.append(this.ctrls.searchBar, this.ctrls.darkSwitch);

        const header = make("header");
        header.append(title, side);

        this.frame.appendChild(header);
        this.componentFrame.appendChild(this.frame);
    }
    buildMain() {
        // This populates the control area above the list, with the view filters and the add/clear buttons
        const controlDiv = make("div", "controlsDiv");
        const controlsBar = make("div", "controlsBar");
        this.ctrls.filters = make("div", "filters");

        const filtAll = make("button", "filter", "All");
        const filtAct = make("button", "filter", "Active");
        const filtDone = make("button", "filter", "Completed");
        filtAll.value = "all";
        filtAct.value = "act";
        filtDone.value = "done";

        this.ctrls.filters.append(filtAll, filtAct, filtDone);
        controlDiv.appendChild(this.ctrls.filters);

        this.ctrls.btnAdd = make("button", "ctrl-add", "Add a new task");
        this.ctrls.btnClr = make("button", "ctrl-clr", "Clear completed");
        controlsBar.append(this.ctrls.btnAdd, this.ctrls.btnClr);

        controlDiv.appendChild(controlsBar);

        // This creates the main as a side effect, too
        this.DOM.main = make("main");
        this.DOM.main.appendChild(controlDiv);
        this.frame.appendChild(this.DOM.main);

        // This will contain the tasks
        const tasksDiv = make("div");
        tasksDiv.id = "tasks-container";
        this.DOM.main.appendChild(tasksDiv);
    }

    initEvents() {
        // Base state interactions
        // Add task button,
        this.ctrls.btnAdd.addEventListener("click", () => {
            console.log('Add a task.');
        })
        // Clear all completed button,
        this.ctrls.btnClr.addEventListener("click", () => {
            console.log('Clear completed tasks.');
        })
        // Dark mode switch,
        this.ctrls.darkSwitch.addEventListener("click", () => {
            document.body.classList.toggle('dark-mode');
        })
        // Search bar,
        this.ctrls.searchBar.addEventListener("input", (e) => {
            console.log(e.target.value);
        })
        // Filters
        this.ctrls.filters.addEventListener("click", (e) => {
            console.log(e.target.value)

        })
    }
    addTask(name) {
        const task = new ToDoItem(name);
        this.items.push(task);
    }
}

class ToDoItem {
    constructor(name) {
        this.name = name;
        this.complete = false;
        this.build(name);
    }
    build(name) {
        this.element = make("div", "task-bar", name);
        // Add item on page
        // Add it to local storage
        this.container.appendChild(this.element);
    }
    complete() {
        this.complete = true;
        // Update display
        // Update local storage
    }
    delete() {
        this.element.remove();
        // Remove item from page
        // Remove item from local storage
    }
}

function make(tag, classs = "", content = "") {
    const element = document.createElement(tag);
    if (classs)
        element.className = classs;
    element.textContent = content;
    return element;
}

const app = new ToDoList();
ToDoItem.prototype.container = document.querySelector("#tasks-container");
app.addTask("Build this app.");