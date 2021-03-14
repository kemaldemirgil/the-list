var inputText = document.getElementById("new-text");
var theForm = document.getElementById("the-form");
var theList = document.getElementById("the-list");
var theCount = document.getElementById("the-count");

var listArray = [];

function refreshList() {
  theList.innerHTML = "";
  theCount.textContent = listArray.length;
  for (var i = 0; i < listArray.length; i++) {
    var input = listArray[i];
    var li = document.createElement("li");
    li.textContent = input;
    li.setAttribute("data-index", i);
    var button = document.createElement("button");
    button.textContent = "OK";
    li.appendChild(button);
    theList.appendChild(li);
  }
}

function run() {
  var listInput = JSON.parse(localStorage.getItem("listArray"));
  if (listInput !== null) {
    listArray = listInput;
  }
  refreshList();
}

function listedInputs() {
  localStorage.setItem("listArray", JSON.stringify(listArray));
}
console.log(localStorage);
theForm.addEventListener("submit", function(event) {
  event.preventDefault();
  var theInputText = inputText.value.trim();
  if (theInputText === "") {
    return;
  }
  listArray.push(theInputText);
  inputText.value = "";
  listedInputs();
  refreshList();
});

theList.addEventListener("click", function(event) {
  var element = event.target;
  if (element.matches("button") === true) {
    var index = element.parentElement.getAttribute("data-index");
    listArray.splice(index, 1);
    listedInputs();
    refreshList();
  }
});

run()