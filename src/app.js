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
        this.buildControls();
    }
    buildHeader() {
        // This builds the top part of the page : the title, search bar and dark mode switch

        const title = this.make("h2", "", "To do :");
        this.ctrls.darkSwitch = this.make("button", "btn-dark");
        this.ctrls.searchBar = this.make("input", "search-bar");
        this.ctrls.searchBar.type = "text";

        const side = this.make("div");
        side.append(this.ctrls.searchBar, this.ctrls.darkSwitch);

        const header = this.make("header");
        header.append(title, side);

        this.frame.appendChild(header);
        this.componentFrame.appendChild(this.frame);
    }
    buildControls() {
        // This populates the control area above the list, with the view filters and the add/clear buttons
        const controlDiv = this.make("div", "controlsDiv");
        const controlsBar = this.make("div", "controlsBar");
        this.ctrls.filters = this.make("div", "filters");

        const filtAll = this.make("button", "filter", "All");
        const filtAct = this.make("button", "filter", "Active");
        const filtDone = this.make("button", "filter", "Completed");
        filtAll.value = "all";
        filtAct.value = "act";
        filtDone.value = "done";

        this.ctrls.filters.append(filtAll, filtAct, filtDone);
        controlDiv.appendChild(this.ctrls.filters);

        this.ctrls.btnAdd = this.make("button", "ctrl-add", "Add a new task");
        this.ctrls.btnClr = this.make("button", "ctrl-clr", "Clear completed");
        controlsBar.append(this.ctrls.btnAdd, this.ctrls.btnClr);

        controlDiv.appendChild(controlsBar);

        // This creates the main as a side effect, too
        this.DOM.main = this.make("main");
        this.DOM.main.appendChild(controlDiv);
        this.frame.appendChild(this.DOM.main);
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

    make(tag, classs = "", content = "") {
        const element = document.createElement(tag);
        if (classs)
            element.className = classs;
        element.textContent = content;
        return element;
    }
}

class ToDoItem {
    constructor(name) {
        this.name = name;
        this.complete = false;
        this.build(name);
    }
    build(name) {
        // Add item on page
        // Add it to local storage
    }
    complete() {
        this.complete = true;
        // Update display
        // Update local storage
    }
    delete() {
        // Remove item from page
        // Remove item from local storage
    }
}

const app = new ToDoList();