async function loadTasks() {
	const res = await fetch('/api/tasks');
	const tasks = await res.json();

	const container = document.getElementById('tasks');

	container.innerHTML = tasks
		.map(
			(task) => `
    <div class="task">
      ${task.completed ? '✅' : '⬜'} ${task.title}
    </div>
  `,
		)
		.join('');
}

async function addTask() {
	const input = document.getElementById('taskInput');

	if (!input.value) return;

	await fetch('/api/tasks', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ title: input.value }),
	});

	input.value = '';
	loadTasks();
}

loadTasks();
