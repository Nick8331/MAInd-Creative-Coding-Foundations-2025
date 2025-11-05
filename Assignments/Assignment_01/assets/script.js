

// buttons
const addButton = document.getElementById('add-btn');
const listButton = document.getElementById('list-view-btn');
const removeButton = document.getElementById('rmv-btn')
const cardButton = document.getElementById('card-view-btn');
const updateList = document.getElementById('update-list');
// elements
const colorWheel = document.getElementById('color-id')
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list-container');
const list = document.querySelector('ul');
const lastItem = list.lastElementChild;

// se premo listButton (list-view-btn) mi fa due task
listButton.addEventListener('click', () => {
    taskList.classList.remove('card-view')
    taskList.classList.add('list-view');
})

// se premo cardButton (card-view-btn) mi fa due task
cardButton.addEventListener('click', () => {
    taskList.classList.remove('list-view')
    taskList.classList.add('card-view');
})

// se premo rmv-btn, mi fa questo
removeButton.addEventListener('click', () => {
    lastItem.remove();
})

// se cambio colore, mi inserisce il colore in una variabile 
// che poi uso nell'eventlistener di addButton

// se premo addButton mi fa le seguenti task
addButton.addEventListener('click',() => {
    // crea una variabile interno per memorizzare il valore che ho inserito
    const inputValue = taskInput.value;
    // crea variabile per HEX colore e la setta con il colore selezionato
    const colorValue = colorWheel.value
    // crea elemento HTML e lo inserisce nella 
    const listElement = document.createElement('li');
    // inserisce la variabile locale nell'elemento creato <li></li>
    listElement.innerHTML = inputValue;
    // inserisce l'attributo CSS inline in riferimento al colore'
    listElement.setAttribute('style', 'background-color:' + colorValue + ';')
    // console.log(listElement)
    // piazza il list element, che ora contiente il testo, nel HTML
    taskList.appendChild(listElement);
    // resetta la variabile
    taskInput.value = '';
});

updateList.addEventListener('click', () => {
    const list = document.querySelector('ul');
    const lastItem = list.lastElementChild;
    console.log(lastItem)
})
