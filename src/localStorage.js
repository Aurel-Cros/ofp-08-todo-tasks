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
        const test = localStorage.getItem('tasksList');
        if (test === null) {
            console.log("Storage empty, key created");
            localStorage.setItem('tasksList', '[]');
            localStorage.setItem('lastId', '-1');
        }
    }
    getAll() {
        const list = localStorage.getItem('tasksList');
        return JSON.parse(list);
    }

    set(taskName, taskState) {
        const entry = {
            name: taskName,
            isDone: taskState
        }
        const currentList = this.getAll();
        const lastId = Number(localStorage.getItem('lastId'));
        console.log(currentList);
        entry.id = lastId + 1;
        currentList.push(entry);

        localStorage.setItem('tasksList', JSON.stringify(currentList));
        localStorage.setItem('lastId', entry.id);
        console.log(`Created entry ${entry.id}`);
        return entry.id;
    }
    complete(taskId) {
        const currentList = this.getAll();
        const newList = [];

        currentList.forEach((entry) => {
            if (taskId != entry.id)
                newList.push(entry);
        })
    }
    delete(taskId) {
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
    }
}

export { LocalStorageHandler };