import { LocalStorageHandler } from "./localStorage";

const lsHandler = new LocalStorageHandler();

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

        this.filtAll = make("button", "filter active", "All");
        this.filtAct = make("button", "filter", "Active");
        this.filtDone = make("button", "filter", "Completed");
        this.filtAll.value = "all";
        this.filtAct.value = "act";
        this.filtDone.value = "done";
        this.currentFilter = this.filtAll;

        this.ctrls.filters.append(this.filtAll, this.filtAct, this.filtDone);
        controlDiv.appendChild(this.ctrls.filters);

        const btnAddText = make("span");
        btnAddText.textContent = "Add a new task";
        const btnClrText = make("span");
        btnClrText.textContent = "Clear completed";
        this.ctrls.btnAdd = make("button", "ctrl-add");
        this.ctrls.btnAdd.appendChild(btnAddText);
        this.ctrls.btnClr = make("button", "ctrl-clr");
        this.ctrls.btnClr.appendChild(btnClrText);
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
            this.addTask();
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
            this.currentFilter.classList.remove("active");
            e.target.classList.add("active");
            this.currentFilter = e.target;
        })
    }
    addTask(name) {
        const task = new ToDoItem(name);
        task.addToLS();
    }

    displayAll() {
        const list = lsHandler.getAll();
        list.forEach(entry => {
            const task = new ToDoItem(entry.name);
            task.id = entry.id;
        });
    }
}

class ToDoItem {
    constructor(name) {
        this.name = name;
        this.isComplete = false;
        this.build(name);
        this.initEvents();
    }
    build(name) {
        const bgHolder = make("div");
        const text = make("p");
        text.textContent = name;
        const blockLeft = make("div");
        blockLeft.append(bgHolder, text);

        this.btnDone = make("button", "btn-done");
        this.btnDel = make("button", "btn-del");
        const btns = make("div", "btns-div");
        btns.append(this.btnDone, this.btnDel);

        this.element = make("div", "task-bar");
        this.element.append(blockLeft, btns);
        // Add item on page
        this.container.appendChild(this.element);
    }
    addToLS() {
        // This method adds the name to the storage and returns an id (based on number of tasks stored)
        this.id = lsHandler.set(this.name, this.isComplete);
    }
    initEvents() {
        this.btnDone.addEventListener("click", () => {
            this.complete();
        });
        this.btnDel.addEventListener("click", () => {
            this.delete();
        });
    }
    complete() {
        // Update display
        this.isComplete = !this.isComplete;
        this.element.classList.toggle('done');
        // Update local storage
        lsHandler.complete(this.id);
    }
    delete() {
        // Remove item from page
        this.element.remove();
        // Remove item from local storage
        lsHandler.delete(this.id);
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
app.displayAll();