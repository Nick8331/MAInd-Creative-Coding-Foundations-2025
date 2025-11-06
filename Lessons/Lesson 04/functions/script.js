// dichiariamo che vogliamo fare una funzione
function greet(person1 /*questo è un parametro che è una variabile*/, person2) {
    // block of code goes here
    console.log(`Hi ${person1} and ${person2}!`);
}

// ora chiamiamo la funzione
greet("nicholas", "roberto");
// la possiamo anche chiamare dalla console

/* Alle variabile, io posso assegnare anche funzioni.
Per esempio: const myGreetings = function(person1, person2); 
e uso myGreetings come funzione -> myGreetings("Nicholas","Anna") */

// le funzioni, oltre a eseguire linee di codici, possono ritornare cose
function printInfo(name, surname, course) {
    return name + " " + surname + " " + course;
}

console.log(printInfo("marco","blabla","coding"))