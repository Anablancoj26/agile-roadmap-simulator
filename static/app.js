document.addEventListener("DOMContentLoaded", () => {
    fetchTasks();
});

async function fetchTasks() {
    try {
        const response = await fetch("/api/tasks");
        const tasks = await response.json();
        renderKanban(tasks);
        updateMetrics(tasks);
    } catch (error) {
        console.error("Error al cargar las tareas:", error);
    }
}

function renderKanban(tasks) {
    const listTodo = document.getElementById("list-todo");
    const listInProgress = document.getElementById("list-in_progress");
    const listDone = document.getElementById("list-done");

    listTodo.innerHTML = "";
    listInProgress.innerHTML = "";
    listDone.innerHTML = "";

    tasks.forEach(task => {
        const taskCard = document.createElement("div");
        taskCard.className = "task-item";
        taskCard.innerHTML = `
            <strong>${task.title}</strong>
            <small>📌 ${task.sprint}</small>
        `;

        if (task.status === "todo") listTodo.appendChild(taskCard);
        else if (task.status === "in_progress") listInProgress.appendChild(taskCard);
        else if (task.status === "done") listDone.appendChild(taskCard);
    });
}

function updateMetrics(tasks) {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === "done").length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    document.getElementById("total-tasks").innerText = total;
    document.getElementById("completed-tasks").innerText = completed;
    document.getElementById("progress-percentage").innerText = `${percentage}%`;
}
