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
        console.log(currentList);
        entry.id = currentList?.length || 0;
        currentList?.push(entry);

        localStorage.setItem('tasksList', JSON.stringify(currentList));
        console.log(`Created entry ${entry.id}`);
        return entry.id;
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
    }
}

export { LocalStorageHandler };