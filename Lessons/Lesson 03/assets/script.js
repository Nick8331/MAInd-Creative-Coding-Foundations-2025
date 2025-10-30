// buttons
const addButton = document.getElementById('add-btn');
const listButton = document.getElementById('list-view-btn');
const cardButton = document.getElementById('card-view-btn');
// elements
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list-container');

// event listeners
listButton.addEventListener('click', () => {
    console.log('list button pressed!!!');
    taskList.classList.remove('card-view')
    taskList.classList.add('list-view');
})

cardButton.addEventListener('click', () => {
    console.log('card button pressed!!!');
    taskList.classList.remove('list-view')
    taskList.classList.add('card-view');
})

addButton.addEventListener('click',() => {
    console.log("Add button pressed!!!!");
    const inputValue = taskInput.value;
    console.log(inputValue);
    // crea elemento HTML
    const listElement = document.createElement('li');
    // inserisce l'input nell'elemento creato <li></li>
    listElement.innerHTML = inputValue;
    // dice i piazzare l'elemento riempito nella lista che abbiamo nel HTML
    taskList.appendChild(listElement);
    taskInput.value = '';
});

