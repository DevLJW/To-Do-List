const todoinput = document.querySelector("#todo-input");

const createTodo = function () {
  const todolist = document.querySelector("#todo-list");

  const newLi = document.createElement("li"); //새로운 li태그
  const newspan = document.createElement("span"); //새로운 span태그
  const newBtn = document.createElement("button");

  newBtn.addEventListener("click", () => {
    newLi.classList.toggle("complete"); //li태그에 class 이름 추가
  });

  newspan.textContent = todoinput.value;
  newLi.appendChild(newBtn);
  newLi.appendChild(newspan);
  todolist.appendChild(newLi); //기존에 있던 todo-list아이디에 값 붙히기
  todoinput.value = " ";
};
const keyCodeCheck = function () {
  if (window.event.keyCode === 13 && todoinput.value !== "") {
    createTodo();
  }
};
