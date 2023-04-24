import { LocalStorageHandler } from "./localStorage";
import { MakeElement } from "./makeElement";

const make = new MakeElement();
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

        this.buildPage();
        this.initEvents();
    }
    buildPage() {
        // This calls all methods that build each page section
        // Each method populates this.ctrls with elements having active roles (search bar, buttons...)

        this.buildHeader();
        this.buildMain();
    }
    buildHeader() {
        // This builds the top part of the page : the title, search bar and dark mode switch

        const title = make.create("h2", { content: "To do :" });
        this.ctrls.darkSwitch = make.create("button", { attributes: [{ name: "class", value: "btn-dark" }] });
        this.ctrls.searchBar = make.create("input", { attributes: [{ name: "class", value: "search-bar" }, { name: "type", value: "text" }] });

        const side = make.create("div");
        side.append(this.ctrls.searchBar, this.ctrls.darkSwitch);

        const header = make.create("header");
        header.append(title, side);

        this.frame.appendChild(header);
        this.componentFrame.appendChild(this.frame);
    }
    buildMain() {
        // This populates the control area above the list, with the view filters and the add/clear buttons
        const controlDiv = make.create("div", { attributes: [{ name: "class", value: "controlsDiv" }] });
        const controlsBar = make.create("div", { attributes: [{ name: "class", value: "controlsBar" }] });
        this.ctrls.filters = make.create("div", { attributes: [{ name: "class", value: "filters" }] });

        this.filtAll = make.create("button", { attributes: [{ name: "class", value: "filter active" }, { name: "value", value: "all" }], content: "All" });
        this.filtAct = make.create("button", { attributes: [{ name: "class", value: "filter" }, { name: "value", value: "act" }], content: "Active" });
        this.filtDone = make.create("button", { attributes: [{ name: "class", value: "filter" }, { name: "value", value: "done" }], content: "Completed" });
        this.currentFilter = this.filtAll;

        this.ctrls.filters.append(this.filtAll, this.filtAct, this.filtDone);
        controlDiv.appendChild(this.ctrls.filters);

        const btnAddText = make.create("span", { content: "Add a new task" });
        const btnClrText = make.create("span", { content: "Clear completed" });
        this.ctrls.btnAdd = make.create("button", { attributes: [{ name: "class", value: "ctrl-add" }] });
        this.ctrls.btnAdd.appendChild(btnAddText);
        this.ctrls.btnClr = make.create("button", { attributes: [{ name: "class", value: "ctrl-clr" }] });
        this.ctrls.btnClr.appendChild(btnClrText);
        controlsBar.append(this.ctrls.btnAdd, this.ctrls.btnClr);

        controlDiv.appendChild(controlsBar);

        // This creates the main as a side effect, too
        this.DOM.main = make.create("main");
        this.DOM.main.appendChild(controlDiv);
        this.frame.appendChild(this.DOM.main);

        // This will contain the tasks
        const tasksDiv = make.create("div");
        tasksDiv.id = "tasks-container";
        this.DOM.main.appendChild(tasksDiv);
    }

    initEvents() {
        // Base state interactions
        // Add task button,
        this.ctrls.btnAdd.addEventListener("click", () => {
            this.addTask("Your text here, click to edit");
            // this.applyFilters();
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
            if (e.target.value)
                this.ctrls.searchBar.classList.add('hasText');
            else
                this.ctrls.searchBar.classList.remove('hasText');

            this.search(e.target.value);
        })
        // Filters
        this.ctrls.filters.addEventListener("click", (e) => {
            this.currentFilter.classList.remove("active");
            e.target.classList.add("active");
            this.currentFilter = e.target;
            this.applyFilters();
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
    buildAllItems() {
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
    applyFilters() {
        this.elements.forEach((task) => {
            switch (this.currentFilter.value) {
                case 'all':
                    task.element.classList.remove('hide');
                    break;
                case 'act':
                    if (task.isComplete)
                        task.element.classList.add('hide');
                    else
                        task.element.classList.remove('hide');
                    break;
                case 'done':
                    if (!task.isComplete)
                        task.element.classList.add('hide');
                    else
                        task.element.classList.remove('hide');
                    break;
            }
        })
        if (this.ctrls.searchBar.value) {
            this.search(this.ctrls.searchBar.value);
        }
    }
    search(search) {
        const value = search.toLowerCase();

        this.elements.forEach((task) => {
            const taskText = task.element.textContent.toLowerCase();

            if (taskText.includes(value)) {
                if (this.currentFilter.value === 'all' ||
                    task.isComplete && this.currentFilter.value === 'done' ||
                    !task.isComplete && this.currentFilter.value === 'act') {
                    task.element.classList.remove('hide');
                }
            }
            else
                task.element.classList.add('hide');
        })
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
        const bgHolder = make.create("div");
        this.text = make.create("p", { attributes: [{ name: "contentEditable", value: "true" }, { name: "spellCheck", value: false }], content: name });
        const blockLeft = make.create("div");
        blockLeft.append(bgHolder, this.text);

        this.btnDone = make.create("button", { attributes: [{ name: "class", value: "btn-done" }] });
        this.btnDel = make.create("button", { attributes: [{ name: "class", value: "btn-del" }] });
        const btns = make.create("div", { attributes: [{ name: "class", value: "btns-div" }] });
        btns.append(this.btnDone, this.btnDel);

        this.element = make.create("div", { attributes: [{ name: "class", value: "task-bar" }] });
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
        // app.applyFilters();
    }
    delete() {
        // Remove item from page
        this.element.remove();
        // Remove item from local storage
        lsHandler.delete(this.id);
    }
}

const app = new ToDoList();
ToDoItem.prototype.container = document.querySelector("#tasks-container");
app.getAll();
app.buildAllItems();