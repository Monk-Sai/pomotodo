const inputbox = document.getElementById("input-box");
const ListContainer = document.getElementById("list-container");
function addTask(){
    if(inputbox.value === ''){
        alert("You must write something!");
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = inputbox.value;
        ListContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span)
    }
    inputbox.value = "";
    saveData();
}
// Add event listener to input box for Enter key press
inputbox.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        addTask(); // Call the addTask function when Enter is pressed
    }
});

ListContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData(){
    localStorage.setItem("data", ListContainer.innerHTML);
}
function showTask(){
    ListContainer.innerHTML = localStorage.getItem("data");
}
showTask();

