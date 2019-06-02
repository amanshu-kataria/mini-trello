onload = function() {
  let boards = JSON.parse(localStorage.getItem('boards')) || [];
  let task = JSON.parse(localStorage.getItem('task')) || {};

  if (boards) {
    let allBoards = document.getElementById('boards');
    let boardsFragment = document.createDocumentFragment();
    boards.forEach(item => {
      let newBoard = document.createElement('div');
      let boardName = document.createElement('div');
      let taskList = document.createElement('div');

      newBoard.className = 'toDoBoard';
      newBoard.id = item.id;

      boardName.className = 'boardName';
      boardName.innerHTML = item.boardName;

      newBoard.appendChild(boardName);

      taskList.className = 'taskList';

      if (task.hasOwnProperty(item.id)) {
        let tasks = task[item.id];
        let tasksFragment = document.createDocumentFragment();
        tasks.forEach(taskItem => {
          let newTask = document.createElement('div');
          newTask.contentEditable = true;
          newTask.className = 'toDoTask';
          newTask.id = taskItem.id;
          newTask.innerHTML = taskItem.taskName;
          newTask.onblur = onTaskEdit;
          tasksFragment.appendChild(newTask);
        });
        taskList.appendChild(tasksFragment);
      }
      let createTaskButton = document.createElement('div');
      createTaskButton.className = 'createNewTask';
      createTaskButton.innerHTML = 'Add New Task';

      taskList.appendChild(createTaskButton);

      newBoard.appendChild(taskList);
      boardsFragment.appendChild(newBoard);
    });
    allBoards.appendChild(boardsFragment);
  }
};

function onTaskEdit(event) {
  const { id, innerText } = event.target;
  let currentTask = document.getElementById(id);

  let tasks = JSON.parse(localStorage.getItem('task')) || {};
  const boardId = currentTask.parentNode.parentElement.id;

  if (tasks.hasOwnProperty(boardId)) {
    let boardTasks = tasks[boardId];
    let taskIndex = boardTasks.findIndex(task => {
      return task.id === parseInt(id);
    });

    boardTasks[taskIndex].taskName = innerText;
    tasks[boardId] = boardTasks;
    localStorage.setItem('task', JSON.stringify(tasks));

    // Show success notification
  } else {
    // display error message
  }
}
