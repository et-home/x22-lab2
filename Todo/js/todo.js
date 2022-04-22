let todoService = "https://localhost:7183/api/todo";

let todoEl = document.getElementById("items");

document.getElementById("task-submit").addEventListener("click", async () => {
  let taskNameEl = document.getElementById("task-name");

  let taskName = taskNameEl.value;

  if (taskName.trim() != "") {
    let newTask = { task: taskName };
    let newTodoData = await fetch(todoService, {
      cache: "no-cache",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newTask),
    });

    taskNameEl.value = "";
  }
});

let getTodos = async function () {
  let todoData = await (
    await fetch(todoService, {
      cache: "no-cache",
      method: "GET",
    })
  ).json();
  // console.log(todoData);

  let taskCard = "";
  for (let i = 0; i < todoData.length; i++) {
    taskCard += `<div class="card">
        <div class="card-body">
            <H5 class="card-title">${todoData[i].task}</H5>
                <div class="row">
                    <div class="col">
                        <label>is finished</label>
                        <input type="checkbox" id="${todoData[i].todoItemId}" onclick="taskComplete(${todoData[i].todoItemId})"/>
                    </div>
                    <div class="col">
                        <button type="submit" id="task-delete" class="btn btn-danger" onclick="deleteTodo(${todoData[i].todoItemId})">Delete</button>
                    </div>
                </div>
            </div>
        </div>`;
  }
  //   stringTemp += "</ol>";
  todoEl.innerHTML = taskCard;
};

getTodos();

async function taskComplete(postid) {
  let curStatus = document.getElementById(postid);
  let taskToPatch = {};
  if (curStatus.checked == true) {
    taskToPatch = { todoItemId: postid, isComplete: true };
  } else {
    taskToPatch = { todoItemId: postid, isComplete: false };
  }

  await fetch(todoService + "/" + postid, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(taskToPatch),
  });

  console.log(curStatus.checked);
}

async function deleteTodo(postid) {
  let taskToDelete = { todoItemId: postid };

  await fetch(todoService + "/" + postid, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(taskToDelete),
  });

  getTodos();
  //   console.log(postid);
}
