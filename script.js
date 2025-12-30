function openFeatures() {
  var allElems = document.querySelectorAll(".elem");
  var fullElemPage = document.querySelectorAll(".fullElems");
  var fullElemPageBackBtn = document.querySelectorAll(".fullElems .back");

  allElems.forEach((elem) => {
    elem.addEventListener("click", () => {
      // console.log(elem.id);
      fullElemPage[elem.id].style.display = "block";
    });
  });

  fullElemPageBackBtn.forEach((back) => {
    back.addEventListener("click", () => {
      fullElemPage[back.id].style.display = "none";
    });
  });
}
openFeatures();

function todoList() {
  let form = document.querySelector(".addTask form");
  let taskInput = document.querySelector(".addTask form #task-input");
  let taskDetailsInput = document.querySelector(".addTask form textarea");
  let taskCheckBox = document.querySelector(".addTask form #check");

  var currentTask = [];

  if (localStorage.getItem("currentTask")) {
    currentTask = JSON.parse(localStorage.getItem("currentTask"));
  } else {
    console.log("Task list is empty");
  }

  function renderTask() {
    let allTask = document.querySelector(".allTask");

    let sum = "";

    currentTask.forEach((elem, idx) => {
      sum += `<div class="task">
        <h5>${elem.task} <span class=${elem.imp}>imp</span></h5>
        <button id=${idx}>Mark as Compelted</button>
        </div>`;
    });

    allTask.innerHTML = sum;

    localStorage.setItem("currentTask", JSON.stringify(currentTask));

    document.querySelectorAll(".task button").forEach((btn) => {
      btn.addEventListener("click", () => {
        currentTask.splice(btn.id, 1);
        renderTask();
      });
    });
  }
  renderTask();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    currentTask.push({
      task: taskInput.value,
      details: taskDetailsInput.value,
      imp: taskCheckBox.checked,
    });
    renderTask();

    taskInput.value = "";
    taskDetailsInput.value = "";
    taskCheckBox.checked = false;
  });
}
todoList();

function dailyPlanner() {
  var dayPlanner = document.querySelector(".day-planner");

  var dayPlanData = JSON.parse(localStorage.getItem("dayPlanData") || "{}");

  var hours = Array.from(
    { length: 18 },
    (_, idx) => `${6 + idx}:00 - ${7 + idx}:00`
  );

  var wholeDaySum = "";

  hours.forEach((elem, idx) => {
    var savedData = dayPlanData[idx] || "";

    wholeDaySum += `<div class="day-planner-time">
  <p>${elem}</p>
  <input id=${idx} type="text" placeholder="..." value=${savedData}>
  </div>`;
  });

  dayPlanner.innerHTML = wholeDaySum;

  var dayPlannerInput = document.querySelectorAll(".day-planner input");
  // console.log(dayPlannerInput);

  dayPlannerInput.forEach((elem) => {
    elem.addEventListener("input", () => {
      dayPlanData[elem.id] = elem.value;
      // console.log(dayPlanData);
      localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));
    });
  });
}
dailyPlanner();

function motivationalQuote() {
  var motivationQuote = document.querySelector(".motivation-2 h1");
  var motivationAuthor = document.querySelector(".motivation-3 h2");

  async function fetchQuote() {
    let response = await fetch("https://dummyjson.com/quotes/random");
    let data = await response.json();
    motivationQuote.innerHTML = data.quote;
    motivationAuthor.innerHTML = data.author;
  }

  fetchQuote();
}
motivationalQuote();

function pomodoroTime() {
  let timer = document.querySelector(".pomo-timer h1");
  let startBtn = document.querySelector(".pomo-timer .start");
  let pauseBtn = document.querySelector(".pomo-timer .pause");
  let resetBtn = document.querySelector(".pomo-timer .reset");
  let isWorkSession = true;
  let session = document.querySelector(".pomodoro-fullpage .session");

  let totalSeconds = 25 * 60;
  let timerInterval = null;

  function upDateTime() {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    timer.innerHTML = `${String(minutes).padStart("2", "0")}:${String(
      seconds
    ).padStart("2", "0")}`;
  }

  function startTimer() {
    clearInterval(timerInterval);

    if (isWorkSession) {
      timerInterval = setInterval(() => {
        if (totalSeconds > 0) {
          totalSeconds--;
          upDateTime();
        } else {
          isWorkSession = false;
          clearInterval(timerInterval);
          timer.innerHTML = "05:00";
          session.innerHTML = "Take a Break";
          session.style.backgroundColor = `var(--blue)`;
          totalSeconds = 5 * 60;
        }
      }, 1000);
    } else {
      timerInterval = setInterval(() => {
        if (totalSeconds > 0) {
          totalSeconds--;
          upDateTime();
        } else {
          isWorkSession = true;
          clearInterval(timerInterval);
          timer.innerHTML = "25:00";
          session.innerHTML = "Work Session";
          session.style.backgroundColor = `var(--green)`;
          totalSeconds = 25 * 60;
        }
      }, 1000);
    }
  }

  function pauseTimer() {
    clearInterval(timerInterval);
  }

  function resetTimer() {
    totalSeconds = 25 * 60;
    clearInterval(timerInterval);
    upDateTime();
  }

  startBtn.addEventListener("click", startTimer);
  pauseBtn.addEventListener("click", pauseTimer);
  resetBtn.addEventListener("click", resetTimer);
}

pomodoroTime();

function weatherDash() {
  var city = "Bharuch";
  var apiKey = "c5dfc1b908634b41a1181742252912";
  var data = null;
  var header1Time = document.querySelector(".header-1 h1");
  var header1Date = document.querySelector(".header-1 h2");
  var header2Temp = document.querySelector(".header-2 h2");
  var header2Condition = document.querySelector(".header-2 h4");
  var precipitation = document.querySelector(".header-2 .precipitation");
  var humidity = document.querySelector(".header-2 .humidity");
  var wind = document.querySelector(".header-2 .wind");

  async function weatherAPICall() {
    var response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
    );
    data = await response.json();
    console.log(data);

    header2Temp.innerHTML = `${data.current.temp_c}°C`;
    header2Condition.innerHTML = `${data.current.condition.text}`;
    precipitation.innerHTML = `Heat index: ${data.current.heatindex_c}%`;
    humidity.innerHTML = `Humidity: ${data.current.humidity}%`;
    wind.innerHTML = `Wind: ${data.current.wind_kph} km/h`;
  }
  weatherAPICall();

  function timeDate() {
    const totaldaysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var date = new Date();
    var dayOfWeek = totaldaysOfWeek[date.getDay()];
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var tarik = date.getDate();
    var month = months[date.getMonth()];
    var year = date.getFullYear();

    header1Date.innerHTML = `${tarik} ${month}, ${year}`;
    // AM / PM logic
    const ampm = hours >= 12 ? "PM" : "AM";
    // Convert 24-hour → 12-hour format
    hours = hours % 12 || 12;
    // Add leading zero to minutes
    minutes = String(minutes).padStart(2, "0");
    header1Time.innerHTML = `${dayOfWeek}, ${hours}:${minutes} ${ampm}`;
  }
  setInterval(() => {
    timeDate();
  }, 100);
}

weatherDash();

var theme = document.querySelector("#main .theme");
var rootElement = document.documentElement;
var flag = 0;
theme.addEventListener("click", () => {
  if (flag == 0) {
    rootElement.style.setProperty("--pri", "#F7E396");
    rootElement.style.setProperty("--sec", "#061E29");
    rootElement.style.setProperty("--tri1", "#CF4B00");
    rootElement.style.setProperty("--tri2", "#E2852E");
    flag = 1;
  } else if (flag == 1) {
    rootElement.style.setProperty("--pri", "#E9E4FF");
    rootElement.style.setProperty("--sec", "#1C1A3A");
    rootElement.style.setProperty("--tri1", "#6D5DFE");
    rootElement.style.setProperty("--tri2", "#A89BFF");
    flag = 2;
  }
  else{
    rootElement.style.setProperty("--pri", "#EAF7F0");
    rootElement.style.setProperty("--sec", "#0E2F25");
    rootElement.style.setProperty("--tri1", "#2FA36B");
    rootElement.style.setProperty("--tri2", "#7ED9A3");
    flag = 0
  }
});
