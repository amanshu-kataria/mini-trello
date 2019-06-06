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
      boardName.innerText = item.boardName;

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
          newTask.innerText = taskItem.taskName;
          newTask.onblur = onTaskEdit;
          tasksFragment.appendChild(newTask);
        });
        taskList.appendChild(tasksFragment);
      }
      let createTaskButton = document.createElement('div');
      createTaskButton.className = 'createNewTask';
      createTaskButton.innerText = 'Add New Task';

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

function toggleAddNewModal(action) {
  const modal = document.getElementById('addBoardModal');
  if (action) {
    modal.style.display = 'block';
    modal.querySelector('input').focus();
  } else {
    modal.style.display = 'none';
  }
}

function createBoard() {
  const modal = document.getElementById('addBoardModal');
  const { value } = modal.querySelector('input');

  if (value.trim()) {
    let boards = JSON.parse(localStorage.getItem('boards')) || [];
    const id = generateID();
    boards.push({
      boardName: value.trim(),
      id
    });

    localStorage.setItem('boards', JSON.stringify(boards));

    let allBoards = document.getElementById('boards');

    let newBoard = document.createElement('div');
    let boardName = document.createElement('div');
    let taskList = document.createElement('div');

    newBoard.className = 'toDoBoard';
    newBoard.id = id;

    boardName.className = 'boardName';
    boardName.innerText = value;

    taskList.className = 'taskList';

    let createTaskButton = document.createElement('div');
    createTaskButton.className = 'createNewTask';
    createTaskButton.innerText = 'Add New Task';

    taskList.appendChild(createTaskButton);

    newBoard.appendChild(boardName);
    newBoard.appendChild(taskList);

    allBoards.appendChild(newBoard);

    modal.style.display = 'none';
  } else {
    let errorText = modal.getElementsByClassName('newBoardError')[0];
    errorText.style.display = 'block';
  }
}

function generateID() {
  function uuid() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return uuid() + uuid() + '-' + uuid() + '-' + uuid();
}
