import { LocalStorageHandler } from "./localStorage";
import { MakeElement } from "./makeElement";

const make = new MakeElement();
const lsHandler = new LocalStorageHandler();

class ToDoList {
    constructor() {
        // items is used to fetch from localStorage and contains the JSON list of items ; data is used to build the HTML elements
        this.items = [];
        // elements is the live list of ToDoItems objects which contains the HTML elements to interact with
        this.elements = [];
        this.componentFrame = document.querySelector("#component");
        this.frame = make.create("div", { attributes: [{ name: "id", value: "frame" }] });

        // ctrls stores the active elements
        this.ctrls = {};

        this.buildPage();
        this.initEvents();
    }
    buildPage() {
        // This calls all methods that build each page section
        // Each method populates this.ctrls with elements having active roles (search bar, buttons...)

        this.buildTemplate();
        this.buildHeader();
        this.buildMain();

        // Checks for dark mode value in localStorage
        // The init value means the page is opened for the first time, so we check browser preference and set dark mode accordingly
        if (lsHandler.getDarkMode() === 'true')
            document.body.classList.add('dark-mode');
        else if (lsHandler.getDarkMode() === 'init') {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.body.classList.add('dark-mode');
                lsHandler.setDarkMode(true);
            }
            else
                lsHandler.setDarkMode(false);
        }


    }
    buildHeader() {
        // This builds the top part of the page : the title, search bar and dark mode switch

        const title = make.create("h2", { content: "To do :" });
        this.ctrls.darkSwitch = make.create("button", { attributes: [{ name: "class", value: "btn-dark" }] });
        this.ctrls.searchBar = make.create("input", { attributes: [{ name: "class", value: "search-bar" }, { name: "type", value: "text" }] });
        this.ctrls.searchReset = make.create("button", { content: "X", attributes: [{ name: "class", value: "btn-sb-reset" }] });

        const side = make.create("div");
        side.append(this.ctrls.searchBar, this.ctrls.searchReset, this.ctrls.darkSwitch);

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
        const main = make.create("main");
        main.appendChild(controlDiv);
        this.frame.appendChild(main);

        // This will contain the tasks
        this.tasksContainer = make.create("div", { attributes: [{ name: "id", value: "tasks-container" }] });
        main.appendChild(this.tasksContainer);
    }
    buildTemplate() {
        this.template = make.create("template", { attributes: [{ name: "id", value: "taskTemplate" }] });

        const grabHandle = make.create("div");
        const text = make.create("p", { attributes: [{ name: "contentEditable", value: "true" }, { name: "spellCheck", value: false }] });
        const blockLeft = make.create("div");
        blockLeft.append(grabHandle, text);

        const btnDone = make.create("button", { attributes: [{ name: "class", value: "btn-done" }] });
        const btnDel = make.create("button", { attributes: [{ name: "class", value: "btn-del" }] });
        const btns = make.create("div", { attributes: [{ name: "class", value: "btns-div" }] });
        btns.append(btnDone, btnDel);

        const element = make.create("div", { attributes: [{ name: "class", value: "task-bar" }] });
        element.append(blockLeft, btns);
        this.template.appendChild(element);
        document.body.appendChild(this.template);
    }


    initEvents() {
        // Base state interactions
        // Add task button,
        this.ctrls.btnAdd.addEventListener("click", () => {
            this.addTask();
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
            if (document.body.classList.contains('dark-mode'))
                lsHandler.setDarkMode(true);
            else
                lsHandler.setDarkMode(false);
        })
        // Search bar,
        this.ctrls.searchBar.addEventListener("input", (e) => {
            this.search(e.target.value);
        })
        this.ctrls.searchReset.addEventListener("click", () => {
            this.ctrls.searchBar.value = "";
            this.search();
        })
        // Filters
        this.ctrls.filters.addEventListener("click", (e) => {
            this.currentFilter.classList.remove("active");
            e.target.classList.add("active");
            this.currentFilter = e.target;
            this.applyFilters();
        })
    }
    getAll() {
        this.items = lsHandler.getAll();
    }
    buildAllItems() {
        this.items.forEach((entry) => {
            // Link HTML element to list array
            this.elements[entry.id] = new ToDoItem(entry);
        });
    }
    addTask(name = " ") {
        const task = new ToDoItem({ name: name, isDone: false });
        const id = task.addToLS();
        task.id = id;
        this.elements[id] = task;
        this.getAll();
        task.text.focus();
    }

    move(elToMove, targetEl, goOver) {
        const newArray = [];
        this.items.forEach((entry) => {
            if (entry.id === targetEl) {
                if (goOver) {
                    newArray.push(this.items[elToMove]);
                    newArray.push(entry);
                }
                else {
                    newArray.push(entry);
                    newArray.push(this.items[elToMove]);
                }
            }
            else if (entry.id != elToMove) {
                newArray.push(entry);
            }
        })
        lsHandler.updateAll(newArray);
        this.getAll();
        this.tasksContainer.replaceChildren();
        this.buildAllItems();
        this.applyFilters();
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
    search(search = "") {
        const value = search.toLowerCase();

        if (search) {
            this.ctrls.searchBar.classList.add('hasText');
            this.ctrls.searchReset.classList.add('active');
        }
        else {
            this.ctrls.searchBar.classList.remove('hasText');
            this.ctrls.searchReset.classList.remove('active');
        }

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
    constructor(data) {
        this.name = data.name;
        this.isComplete = data.isDone;
        this.id = data.id;
        if ("content" in document.createElement("template"))
            this.build(data.name);
        else
            this.buildNoTemplate(data.name);
        this.initEvents();
    }
    build(name) {
        this.element = document.importNode(document.querySelector("template").firstChild, true); // Creates a deep copy of the template's child element
        this.text = this.element.querySelector("p");
        this.text.textContent = name;
        this.container.appendChild(this.element);
        if (this.isComplete)
            this.element.classList.add('done');

        this.btnDel = this.element.querySelector(".btn-del");
        this.btnDone = this.element.querySelector(".btn-done");
        this.grabHandle = this.element.querySelector(".task-bar > div:first-child > div:first-child");
    }
    buildNoTemplate(name) {
        this.grabHandle = make.create("div");
        this.text = make.create("p", { attributes: [{ name: "contentEditable", value: "true" }, { name: "spellCheck", value: false }], content: name });
        const blockLeft = make.create("div");
        blockLeft.append(this.grabHandle, this.text);

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
            app.applyFilters();
        });
        this.btnDel.addEventListener("click", () => {
            this.delete();
        });

        this.text.addEventListener("focusout", () => {
            this.putText(this.text.textContent);
            app.getAll();
        });
        this.text.addEventListener("keypress", (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                e.target.blur();
            }
        });

        this.grabHandle.addEventListener("mouseenter", () => {
            this.element.draggable = true;
        });
        this.grabHandle.addEventListener("mouseleave", () => {
            this.element.draggable = false;
        });

        this.element.addEventListener("dragstart", (e) => {
            this.element.classList.add('move');
            // sessionStorage is necessary rather than setData, because getData does not carry data in dragover/dragenter events, which we want to use.
            sessionStorage.setItem('dragId', this.id);
            e.dataTransfer.effectAllowed = "move";
            this.text.contentEditable = "false";
        });
        this.element.addEventListener("dragend", () => {
            this.element.classList.remove('move');
            this.text.contentEditable = "true";
        });


        this.element.addEventListener("dragover", (e) => {
            e.preventDefault();
            const data = Number(sessionStorage.getItem('dragId'));

            // Do not process if the move would not alter the order of tasks :
            // Trying to move task on itself, below the task above or above the task below
            if (this.id != data) {
                const onTop = this.isTopHalf(e);
                if (!(onTop && this.id == data + 1) &&
                    !(!onTop && this.id + 1 == data)) {
                    e.dataTransfer.dropEffect = "move";
                    this.element.classList.add(onTop ? 'moveOver' : 'moveUnder');
                }
                this.element.classList.remove(onTop ? 'moveUnder' : 'moveOver');
            }
        });
        this.element.addEventListener("dragenter", () => {
            this.element.firstChild.classList.add('noEvents');
        });
        this.element.addEventListener("dragleave", () => {
            this.element.classList.remove('moveUnder');
            this.element.classList.remove('moveOver');
            this.element.firstChild.classList.remove('noEvents');
        });
        this.element.addEventListener("drop", (e) => {
            e.preventDefault();
            this.element.classList.remove('moveUnder');
            this.element.classList.remove('moveOver');

            // Do not process if the move would not alter the order of tasks :
            // Trying to move task on itself, below the task above or above the task below
            const data = Number(sessionStorage.getItem('dragId'));
            const onTop = this.isTopHalf(e);
            if (this.id != data &&
                !(onTop && this.id == data + 1) &&
                !(!onTop && this.id + 1 == data)) {
                app.move(data, this.id, onTop);
            }
        });
    }
    isTopHalf(e) {
        const elemPos = e.target.getBoundingClientRect();
        const y = e.clientY - elemPos.top;
        const h = elemPos.height;
        return y * 2 < h;
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
        // Update task manager list with new data
        app.getAll();
        app.applyFilters();
    }
    delete() {
        // Remove item from page
        this.element.remove();
        // Remove item from local storage
        lsHandler.delete(this.id);
        // Update task manager list with new data
        app.getAll();
    }
}
// Initialize task manager
const app = new ToDoList();
ToDoItem.prototype.container = document.querySelector("#tasks-container");
// Initial build of items in storage
app.getAll();
app.buildAllItems();