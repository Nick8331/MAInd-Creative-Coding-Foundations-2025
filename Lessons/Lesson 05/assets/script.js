// // Definisco e inizializzo un array costante
// const HOBBIES = ["Judo", "Boxe", "Cycling"];
// // richiamo la lunghezza dell'array
// console.log(HOBBIES.length);
// // richiamo l'oggetto al posto zero
// console.log(HOBBIES[0]);

// // Definisco e inizializzo un OBJECT
// const PERSON = {
//     name: "Sasha",
//     lastname: "Bravo",
//     hobbies: HOBBIES
// }

// // modi di richiamare dati nell'object
// console.log(PERSON);
// console.log(PERSON.name);
// console.log(PERSON.hobbies);
// console.log(PERSON.hobbies[1]);

// // crea in HTML un elemento della lista e inseriscici gli hobby uno a uno
// const CONTAINER = document.getElementById('container');
// for (hobbies of PERSON.hobbies){
//     const ITEM = document.createElement('li');
//     ITEM.inneHTML = hobbies;
//     CONTAINER.appendChild(ITEM);
// }

// console.log("fetchobject");
// fetch('/Lessons/Lesson 05/assets/data.json') // get the data from an external source
//   .then(response => response.json()) // parse/convert the data in JavaScript format
//   .then(data => console.log(data)) // dispay the data in the console
//   .catch(error => console.error('Error:', error)); // display an error if the data cannot be loaded




// function displayData(data){
//     console.log(data);
// }

const CONTAINER = document.getElementById('container');

fetch('/Lessons/Lesson 05/assets/data/MOCK_DATA.json')
    .then(response => response.json())
    .then(data => displayData(data)) 
    .catch(error => displayError('Error:', error)); 

function displayData(data){
    console.log(data)
    const FILTERED = data.filter( (obj) => obj.age > 50 )


    // for (let person of data){
    //     const PERSON = document.createElement('li');
    //     PERSON.textContent =  `${person.first_name} ${person.last_name}`;

    //     CONTAINER.appendChild(PERSON);
    // }

    for (let person of FILTERED){
        const PERSON = document.createElement('li');
        PERSON.textContent =  `${person.first_name} ${person.last_name}, ${person.age}`;

        CONTAINER.appendChild(PERSON);
    }
}

function displayError(error){
    console.log(error)
}