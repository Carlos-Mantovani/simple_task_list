window.addEventListener('load', () => {
	const newTaskForm = document.querySelector('#new-task-form');
	const newTaskInput = document.querySelector('#new-task-input');
	const taskList = document.querySelector('#tasks');
	
	newTaskForm.addEventListener('submit', (e) => {
		e.preventDefault();
		if (newTaskInput.value.trim() === '') {
			return;
		}
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
		inputText.value = newTaskInput.value;
		task.appendChild(inputText);
		buttons.appendChild(buttonEdit);
		buttons.appendChild(buttonDelete);
		task.appendChild(buttons);
		taskList.appendChild(task);
		newTaskInput.value = '';
		
		let isEditing = false
		buttonEdit.addEventListener('click', () => {
			if (!isEditing) {
				inputText.readOnly = false;
				inputText.focus();
				buttonEdit.textContent = 'Save';
				isEditing = true;
			}else {
				inputText.readOnly = true;
				buttonEdit.textContent = 'Edit';
				isEditing = false;
			}
		});
		
		buttonDelete.addEventListener('click', () => {
			taskList.removeChild(task);
		});
	});
});