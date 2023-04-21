import { LocalStorageHandler } from "./localStorage";

const lsHandler = new LocalStorageHandler();

class ToDoList {
    constructor() {
        this.darkTheme = false;
        // items is used to fetch from localStorage
        this.items = [];
        // elements is the live list of HTML elements to interact with
        this.elements = [];
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
            this.addTask("Your text here, click to edit");
        })
        // Clear all completed button,
        this.ctrls.btnClr.addEventListener("click", () => {
            this.elements.forEach((entry) => {
                if (entry.isComplete) {
                    entry.delete();
                }
            })
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
        this.elements.push(task);
    }
    getAll() {
        this.items = lsHandler.getAll();
    }
    displayAll() {
        this.items.forEach((entry, index) => {
            const task = new ToDoItem(entry.name);
            task.id = entry.id;
            if (entry.isDone) {
                task.element.classList.add("done");
                task.isComplete = entry.isDone;
            }
            // Link HTML element to list array
            this.elements[index] = task;
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
        this.text = make("p");
        this.text.contentEditable = "true";
        this.text.textContent = name;
        const blockLeft = make("div");
        blockLeft.append(bgHolder, this.text);

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
        return this.id;
    }
    initEvents() {
        this.btnDone.addEventListener("click", () => {
            this.complete();
        });
        this.btnDel.addEventListener("click", () => {
            this.delete();
        });
        this.text.addEventListener("focusout", () => {
            this.putText(this.text.textContent);
        })
    }
    putText(text) {
        lsHandler.updateText(this.id, text);
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
app.getAll();
app.displayAll();