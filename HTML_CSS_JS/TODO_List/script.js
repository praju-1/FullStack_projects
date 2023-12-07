const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');

addButton.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    addTask(taskText);
    taskInput.value = '';
  }
});

taskList.addEventListener('click', (event) => {
  const target = event.target;
  if (target.tagName === 'LI') {
    toggleTaskStatus(target);
  }
});

function addTask(text) {
  const li = document.createElement('li');
  li.innerText = text;
  taskList.appendChild(li);
}

function toggleTaskStatus(task) {
  task.classList.toggle('completed');
}
