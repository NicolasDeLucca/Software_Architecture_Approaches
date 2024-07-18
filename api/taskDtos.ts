interface TaskOut {
    id: number;
    status: string;
}

interface TaskIn {
    name: string;
    description: string;
}

const toTask = (task_data: TaskIn) => {
    return {
        name: task_data.name,
        description: task_data.description
    };
};

export { TaskOut, TaskIn, toTask };