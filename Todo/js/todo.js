let todoService = "https://localhost:7183/api/todo";

let todoEl = document.getElementById("items")

let getTodos = async function () {
    let todoData = await (await fetch(todoService)).json();
    console.log(todoData);

    todoEl.innerHTML = "<ol>";
    for (let i = 0; i < todoData.length; i++){
        todoEl.innerHTML += `<li class="${todoData[i].isComplete}>${todoData[i].task}</li>`
    }
    todoEl.innerHTML += "</ol>";
}

getTodos();