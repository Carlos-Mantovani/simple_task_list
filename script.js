let storageArray = [];
const getStorage = () => JSON.parse(localStorage.getItem('todoList')) ?? [];
const setStorage = (value) => localStorage.setItem('todoList', JSON.stringify(value));

const newTaskForm = document.querySelector('#new-task-form');
const newTaskInput = document.querySelector('#new-task-input');
const taskList = document.querySelector('#tasks');

const addTasks = () => {
	for (let i = 0; i < getStorage().length; i++) {
		const task = document.createElement('li');
		const inputText = document.createElement('input');
		const buttons = document.createElement('div');
		const buttonEdit = document.createElement('button');
		const buttonDelete = document.createElement('button');
		task.classList.add('task');
		inputText.classList.add('text');
		buttons.classList.add('buttons');
		buttonEdit.classList.add('btn-edit');
		buttonDelete.classList.add('btn-delete');
		buttonEdit.textContent = 'Edit';
		buttonDelete.textContent = 'Delete';
		inputText.type = 'text';
		inputText.readOnly = true;
		inputText.value = getStorage()[i].task;
		task.appendChild(inputText);
		buttons.appendChild(buttonEdit);
		buttons.appendChild(buttonDelete);
		task.appendChild(buttons);
		taskList.appendChild(task);

		let isEditing = false
		inputText.addEventListener('click', () => {
			if (!isEditing) {
				inputText.classList.toggle('done');
			}
		});
		buttonEdit.addEventListener('click', () => {
			if (!isEditing) {
				inputText.readOnly = false;
				inputText.focus();
				buttonEdit.textContent = 'Save';
				isEditing = true;
			}else {
				inputText.readOnly = true;
				storageArray = getStorage();
				storageArray[i].task = inputText.value;
				setStorage(storageArray);
				buttonEdit.textContent = 'Edit';
				isEditing = false;
			}
		});
		buttonDelete.addEventListener('click', () => {
			taskList.removeChild(task);
			storageArray = getStorage();
			console.log(storageArray);
			storageArray.splice(i, 1);
			console.log(storageArray);
			setStorage(storageArray);
		});
	}
}

const restartScreen = () => {
	taskList.innerHTML = '';
}

newTaskForm.addEventListener('submit', (e) => {
	e.preventDefault();
	if (newTaskInput.value.trim() === '') {
		return;
	}
	storageArray = getStorage();
	storageArray.push({'task': newTaskInput.value, 'status': ''});
	setStorage(storageArray);
	restartScreen();
	addTasks();
	newTaskInput.value = '';
});
restartScreen();
addTasks();
