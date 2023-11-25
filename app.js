const { createApp, defineComponent } = Vue;

const AddTaskForm = defineComponent({
    template: '#add-task-form-template',
    data() {
        return {
            newTaskTitle: ''
        };
    },
    methods: {
        submitTask() {
            this.$emit('add-task', this.newTaskTitle);
            this.newTaskTitle = '';
        }
    }
});

const TodoList = defineComponent({
    template: '#todo-list-template',
    props: {
        tasks: Array
    },
    methods: {
        toggleCompleted(task) {
            task.completed = !task.completed;
            this.$emit('update-task', task);
        }
    }
});

const app = createApp({
    data() {
        return {
            tasks: []
        };
    },
    components: {
        AddTaskForm,
        TodoList
    },
    created() {
        axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
            .then(response => {
                this.tasks = response.data;
            });
    },
    methods: {
        addTask(newTaskTitle) {
            if (!newTaskTitle) return;
            const newTask = {
                id: Date.now(),
                title: newTaskTitle,
                completed: false
            };
            this.tasks.push(newTask);
        },
        deleteTask(taskId) {
            this.tasks = this.tasks.filter(task => task.id !== taskId);
        },
        updateTask(updatedTask) {
            const taskIndex = this.tasks.findIndex(task => task.id === updatedTask.id);
            if (taskIndex !== -1) {
                this.tasks[taskIndex] = updatedTask;
            }
        }
    
    }
});

app.mount('#app');
