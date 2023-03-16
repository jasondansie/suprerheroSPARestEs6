import { updateMessage, clearMessage } from '/js/helperFunctions.js';

let heroIDField;
let nameField;
let yearOfBirthField;
let gearField;
let costumeField;
let messagearea;

document.addEventListener('DOMContentLoaded', init);

function init(){
    heroIDField = document.getElementById('heroID');
    nameField = document.getElementById('name');
    yearOfBirthField = document.getElementById('yearOfBirth');
    gearField = document.getElementById('gear');
    costumeField = document.getElementById('costume');
    messagearea = document.getElementById('messagearea');


    document.getElementById('submit').addEventListener('click', send);
}

async function send(){
    clearMessage(messagearea);
    const superhero={
        heroID: +heroIDField.value,
        name: nameField.value,
        yearOfBirth: yearOfBirthField.value,
        gear:gearField.value,
        costume:costumeField.value
    }

    try{
        const options={
            method:'POST',
            body:JSON.stringify(superhero),
            headers:{
                'Content-Type':'application/json'
            }
        }

        const data = await fetch('/add',options);
        const status = await data.json();

        if(status.message){
            updateMessage(messagearea,status.message, status.type);
        }

    }
    catch(error){
        updateMessage(messagearea,error.message,'error');
    }
}



