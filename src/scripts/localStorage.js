/*
Task list syntax :

tasksList : [
    {
        id : number,
        name : string,
        isDone : bool
    },
    ...
]

*/
class LocalStorageHandler {
    constructor() {
        this.init();
    }
    init() {
        // This only tests whether or not our keys exist. If they don't, create them
        if (localStorage.getItem('tasksList') === null) {
            console.log("Storage empty, key created");
            localStorage.setItem('tasksList', '[]');
            localStorage.setItem('lastId', '-1');
        }
        if (localStorage.getItem('dark-mode') === null)
            localStorage.setItem('dark-mode', 'init');
    }
    getAll() {
        const list = localStorage.getItem('tasksList');
        return JSON.parse(list);
    }
    updateAll(newList) {
        // Rebuilds the stored list with the list sent in argument - format is a JSON object
        const pushList = [];
        newList.forEach((item, index) => {
            const entry = {
                name: item.name,
                isDone: item.isDone,
                id: index
            }
            pushList.push(entry);
        })
        localStorage.setItem('lastId', pushList.length - 1);
        localStorage.setItem('tasksList', JSON.stringify(pushList));
    }

    set(taskName, taskState) {
        // Adds a new task to storage and returns the id for that task
        const entry = {
            name: taskName,
            isDone: taskState
        }
        const currentList = this.getAll();
        const lastId = Number(localStorage.getItem('lastId'));
        entry.id = lastId + 1;
        currentList.push(entry);

        localStorage.setItem('tasksList', JSON.stringify(currentList));
        localStorage.setItem('lastId', entry.id);
        return entry.id;
    }
    updateText(taskId, text) {
        // Find taskId in storage and change its text
        const currentList = this.getAll();
        const newList = [];

        currentList.forEach((entry) => {
            if (taskId == entry.id) {
                entry.name = text;
            }
            newList.push(entry);
        })
        localStorage.setItem('tasksList', JSON.stringify(newList));
    }
    complete(taskId) {
        // Find entry and toggle its isDone property
        const currentList = this.getAll();
        const newList = [];

        currentList.forEach((entry) => {
            if (taskId == entry.id) {
                entry.isDone = !entry.isDone;
            }
            newList.push(entry);
        })
        localStorage.setItem('tasksList', JSON.stringify(newList));
    }
    delete(taskId) {
        // Find entry and delete it
        const currentList = this.getAll();
        const newList = [];
        // Rebuild the list without the id we want out
        currentList.forEach((entry) => {
            if (taskId != entry.id)
                newList.push(entry);
        })
        localStorage.setItem('tasksList', JSON.stringify(newList));
        /* NOTE :
        We can't use array index to identify each entry, as removing elements from the array will shift indexes to avoid "holes".
        */
        if (newList.length === 0)
            localStorage.setItem('lastId', -1);
    }

    setDarkMode(value) {
        localStorage.setItem('dark-mode', value);
    }
    getDarkMode() {
        return localStorage.getItem('dark-mode');
    }
}

export { LocalStorageHandler };