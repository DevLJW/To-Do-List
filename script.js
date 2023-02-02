const todoinput = document.querySelector("#todo-input");

const createTodo = function () {
  const todolist = document.querySelector("#todo-list");

  const newLi = document.createElement("li"); //새로운 li태그
  const newspan = document.createElement("span"); //새로운 span태그
  const newBtn = document.createElement("button");

  newBtn.addEventListener("click", () => {
    //li태그에 complete라는 이름을 가진 클래스 추가
    newLi.classList.toggle("complete");
  });

  newLi.addEventListener("dblclick", () => {
    newLi.remove();
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

const deleteAll = function () {
  // li 태그 전부 가져오기(배열형태(안의 데이터는 객체))
  const liList = document.querySelectorAll("li");
  for (let i = 0; i < liList.length; i++) {
    liList[i].remove();
  }
};

const saveItemsFn = function () {
  const saveItems = [];
  for (i = 0; i < todolist.children.length; i++) {
    const todoObj = {
      //li 태그 i번째 태그가 가지고 있는 span 태그 텍스트값 가져오기
      contents: todolist.children[i].querySelector("span").textContent,
      //li태그 i번째 태그가 가지고 있는 클래스 안에 컴플리트 라는 클래스가 존재하는지
      complete: todolist.children[i].classList.contains("complete"),
    };

    saveItems.push(todo);
  }
};
