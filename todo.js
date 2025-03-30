// Using the HTML5 Drag and Drop API
taskList.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', e.target.dataset.id);
});

taskList.addEventListener('dragover', (e) => {
    e.preventDefault();
});

taskList.addEventListener('drop', (e) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    const targetTask = e.target.closest('.task-item');
    
    if (targetTask) {
        const targetId = targetTask.dataset.id;
        reorderTasks(taskId, targetId);
    }
});
function checkReminders() {
    tasks.forEach(task => {
        if (task.dueDate && !task.completed) {
            const dueDate = new Date(task.dueDate);
            const now = new Date();
            
            if (dueDate < now) {
                if (Notification.permission === 'granted') {
                    new Notification(`Task overdue: ${task.text}`);
                } else if (Notification.permission !== 'denied') {
                    Notification.requestPermission().then(permission => {
                        if (permission === 'granted') {
                            new Notification(`Task overdue: ${task.text}`);
                        }
                    });
                }
            }
        }
    });
}

// Check reminders every minute
setInterval(checkReminders, 60000);
// Add priority to task object
const newTask = {
    id: Date.now(),
    text: taskText,
    completed: false,
    list: currentList,
    dueDate: dueDate || null,
    priority: prioritySelect.value, // 'low', 'medium', 'high'
    createdAt: new Date().toISOString()
};