class ToDoList {
    constructor() {
        this.darkTheme = false;
        this.items = [];
        this.build();
        this.getDOM();
        this.initEvents();
    }
    build() {
        // Build the first issue of the page
        // Set static layout
        // Fetch info from local storage
        // Build items from local storage if necessary
    }
    getDOM() {
        this.DOM = {
            // Fetch the interactive elements in the DOM
            // Add task button,
            // Clear all completed button,
            // Search bar,
            // Dark mode switch,
            // Filters
        }
    }
    initEvents() {
        // Base state interactions
        // Add task button,
        // Clear all completed button,
        // Search bar,
        // Dark mode switch,
        // Filters
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