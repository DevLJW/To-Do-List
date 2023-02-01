const keyCodeCheck = function () {
  const todoinput = document.querySelector("#todo-input");

  if (window.event.keyCode === 13 && todoinput.value !== "") {
    const todolist = document.querySelector("#todo-list");

    const newLi = document.createElement("li"); //새로운 li태그
    const newspan = document.createElement("span"); //새로운 span태그

    newspan.textContent = todoinput.value;
    newLi.appendChild(newspan);
    todolist.appendChild(newLi); //기존에 있던 todo-list아이디에 값 붙히기
    todoinput.value = " ";
  }
};
