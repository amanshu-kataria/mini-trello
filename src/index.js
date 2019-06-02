onload = function() {
  let boards = localStorage.getItem('boards');
  let task = localStorage.getItem('task');

  if (!boards) {
    localStorage.setItem(
      'boards',
      JSON.stringify([{ boardName: 'Board One', id: 'sfjdbjkf' }])
    );
    // boards = [];
  } else {
    boards = JSON.parse(boards);
  }
  if (!task) {
    localStorage.setItem(
      'task',
      JSON.stringify({
        sfjdbjkf: [
          { taskName: 'Something to do', id: 12345 },
          { taskName: 'something else', id: 45645 }
        ]
      })
    );
    // task = {};
  } else {
    task = JSON.parse(task);
  }

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
  let task = document.getElementById(id);
  let tasks = localStorage.getItem('task');
  const boardId = task.parentNode.parentElement.id;
}
