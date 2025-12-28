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


function todoList(){

let form = document.querySelector(".addTask form");
let taskInput = document.querySelector(".addTask form #task-input");
let taskDetailsInput = document.querySelector(".addTask form textarea");
let taskCheckBox = document.querySelector(".addTask form #check");
    
var currentTask = []

if(localStorage.getItem('currentTask')){
    currentTask = JSON.parse(localStorage.getItem('currentTask'))
}else{
    console.log('Task list is empty');
    
}

function renderTask() {
    let allTask = document.querySelector(".allTask");
    
    let sum = "";
    
    currentTask.forEach((elem,idx) => {
        sum += `<div class="task">
        <h5>${elem.task} <span class=${elem.imp}>imp</span></h5>
        <button id=${idx}>Mark as Compelted</button>
        </div>`;
    });
    
    allTask.innerHTML = sum;

    localStorage.setItem('currentTask', JSON.stringify(currentTask));

    document.querySelectorAll('.task button').forEach((btn)=>{
        btn.addEventListener('click',()=>{
            currentTask.splice(btn.id,1)
            renderTask()
            
        })
    })
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

  taskInput.value = '';
  taskDetailsInput.value = '';
  taskCheckBox.checked = false
  
});



}
todoList()


function dailyPlanner(){
  
var dayPlanner = document.querySelector('.day-planner')

var dayPlanData = JSON.parse(localStorage.getItem('dayPlanData') || '{}');

var hours = Array.from({length:18}, (_,idx)=>`${6+idx}:00 - ${7+idx}:00`)


var wholeDaySum = '';

hours.forEach((elem,idx)=>{
  var savedData = dayPlanData[idx] || '';
  
  wholeDaySum += `<div class="day-planner-time">
  <p>${elem}</p>
  <input id=${idx} type="text" placeholder="..." value=${savedData}>
  </div>`
})


dayPlanner.innerHTML = wholeDaySum;

var dayPlannerInput = document.querySelectorAll('.day-planner input');
// console.log(dayPlannerInput);

dayPlannerInput.forEach((elem)=>{
  elem.addEventListener('input',()=>{
    dayPlanData[elem.id] = elem.value
    // console.log(dayPlanData);
    localStorage.setItem('dayPlanData',JSON.stringify(dayPlanData))
  })
})
}

dailyPlanner();