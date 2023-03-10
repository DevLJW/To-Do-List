const todoinput = document.querySelector("#todo-input");
const todolist = document.querySelector("#todo-list");
const savedWeatherData = JSON.parse(localStorage.getItem("saved-weather"));

//원본데이터 타입으로 변환(객체 타입으로)
const savedTodoList = JSON.parse(localStorage.getItem("saved-items"));

const createTodo = function (storageData) {
  let todoContents = todoinput.value; //저장해논 값이 없는경우
  if (storageData) {
    //저장해논 값이 있는경우
    todoContents = storageData.contents;
  }
  const newLi = document.createElement("li"); //새로운 li태그
  const newspan = document.createElement("span"); //새로운 span태그
  const newBtn = document.createElement("button");

  newBtn.addEventListener("click", () => {
    //li태그에 complete라는 이름을 가진 클래스 추가
    newLi.classList.toggle("complete");
    saveItemsFn();
  });

  newLi.addEventListener("dblclick", () => {
    newLi.remove();
    saveItemsFn();
  });

  //옵셔널 체이닝 : 데이터가 없는경우 if문 무시하고 다음구문으로 넘어간다.
  if (storageData?.complete === true) {
    newLi.classList.add("complete");
  }

  newspan.textContent = todoContents;
  newLi.appendChild(newBtn);
  newLi.appendChild(newspan);
  todolist.appendChild(newLi); //기존에 있던 todo-list아이디에 값 붙히기
  todoinput.value = "";
  saveItemsFn();
};

const keyCodeCheck = function () {
  if (window.event.keyCode === 13 && todoinput.value.trim() !== "") {
    createTodo();
  }
};

const deleteAll = function () {
  // li 태그 전부 가져오기(배열형태(안의 데이터는 객체))
  const liList = document.querySelectorAll("li");
  for (let i = 0; i < liList.length; i++) {
    liList[i].remove();
  }

  saveItemsFn();
};

const saveItemsFn = function () {
  const saveItems = [];
  for (i = 0; i < todolist.children.length; i++) {
    const todoObj = {
      //li 태그 i번째 태그가 가지고 있는 span 태그 텍스트값 가져오기
      contents: todolist.children[i].querySelector("span").textContent,
      //li태그 i번째 태그가 가지고 있는 클래스 안에 컴플리트 라는 클래스가 존재하는지
      complete: todolist.children[i].classList.contains("complete"), //complete가 존재하면 true반환
    };

    saveItems.push(todoObj);
  }

  //로컬스토리지에는 String 형식 데이터만 저장 가능.
  //객체 타입을 --> String 형식으로 변환 해줘야됨.
  if (saveItems.length === 0) {
    //데이터가 없는경우
    localStorage.removeItem("saved-items");
  } else {
    localStorage.setItem("saved-items", JSON.stringify(saveItems)); //객체 --> 문자열변환
  }
};

if (savedTodoList) {
  //로컬에 저장해논 데이터가 있을떄
  for (let i = 0; i < savedTodoList.length; i++) {
    createTodo(savedTodoList[i]); //표현식 호이스팅 때문에 밑에 내려주기
  }
}

const weatherDataActive = function ({ location, weather }) {
  const weatherMainList = [
    "Clear",
    "Clouds",
    "Drizzle",
    "Rain",
    "Snow",
    "Thunderstorm",
  ];

  weather = weatherMainList.includes(weather) ? weather : "Fog";

  const locationNameTag = document.querySelector("#weather_id");
  locationNameTag.textContent = location;
  document.body.style = `url(./Images/${weather}.jpg)`;

  //이전에 통신했을때가 현재 통신했을때 지역이 다르다면 || 이전에 통신했던날씨와 현재날씨가 다르다면
  //지역이 다른데 날씨가 같다면 저장, 지역이 같은데 날씨가 다를경우도 저장(or)
  if (
    !savedWeatherData ||
    savedWeatherData.location !== location ||
    savedWeatherData.weather !== weather
  ) {
    localStorage.setItem(
      "saved-weather",
      JSON.stringify({ location, weather })
    );
  }
};

const weatherSearch = function ({ latitude, longitude }) {
  //5
  //fetch 매서드는 JavaScript에서 서버로 네트워크 요청을 보내고 응답을 받을 수 있도록 해주는 매서드이다.
  //Get방식
  const openWeatherRes = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=5b4efe2cb81f20d788fed862e3257f38`
  )
    .then((res) => {
      //통신이 완료된 후, then 메소드 내부 실행
      return res.json(); //응답 헤더나 바디가 있는경우 .json()사용
    })
    .then((json) => {
      console.log(json.name, json.weather[0].description);
      const weatherdata = {
        location: json.name,
        weather: json.weather[0].name,
      };
      weatherDataActive(weatherdata);
    })
    .catch((err) => {
      console.error(err);
    });
};

const accesToGeo = function ({ coords }) {
  //3
  const { latitude, longitude } = coords;

  const positionObj = {
    //short hand property
    latitude,
    longitude,
  };

  weatherSearch(positionObj); //4
};

const askForLocation = function () {
  //2
  navigator.geolocation.getCurrentPosition(accesToGeo, (err) => {
    console.log(err);
  });
};

askForLocation(); //1

if (savedWeatherData) {
  weatherDataActive(savedWeatherData);
}
