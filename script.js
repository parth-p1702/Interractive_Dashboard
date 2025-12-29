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

function pomodoroTime(){
  
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