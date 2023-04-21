/*
Task list syntax :

tasksList : [
    {
        taskId : number,
        taskName : string,
        taskDone : bool
    },
    ...
]

*/
class LocalStorageHandler {
    getAll() {
        return JSON.parse(localStorage.getItem('tasksList'));
    }

    set(taskName, taskState) {
        const entry = {
            name: taskName,
            isDone: taskState
        }
        const currentList = this.getAll();
        entry.id = currentList.length;
        currentList.push(entry);

        localStorage.setItem('tasksList', JSON.stringify(currentList));
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