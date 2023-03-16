import { updateMessage, clearMessage } from '/js/helperFunctions.js';

let heroIDField;
let nameField;
let yearOfBirthField;
let gearField;
let costumeField;
let messagearea;
let searchState=true;

document.addEventListener('DOMContentLoaded', init);

function init(){
    heroIDField = document.getElementById('heroID');
    nameField = document.getElementById('name');
    yearOfBirthField = document.getElementById('yearOfBirth');
    gearField = document.getElementById('gear');
    costumeField = document.getElementById('costume');
    messagearea = document.getElementById('messagearea');


    updateFields();

    document.getElementById('submit')
        .addEventListener('click',send);
    
        heroIDField.addEventListener('focus', clearAll);
}



function clearAll(){
    if(searchState){
        clearFieldValues();
        clearMessage(messagearea);
    }
}

function updateFields(){
    if(searchState){
        heroIDField.removeAttribute('readonly');
        nameField.setAttribute('readonly',true);
        yearOfBirthField.setAttribute('readonly',true);
        gearField.setAttribute('readonly',true);
        costumeField.setAttribute('readonly',true);
    }
    else{
        heroIDField.setAttribute('readonly',true);
        nameField.removeAttribute('readonly');
        yearOfBirthField.removeAttribute('readonly');
        gearField.removeAttribute('readonly');
        costumeField.removeAttribute('readonly');
    }
} //updateFields end

function clearFieldValues(){
    heroIDField.value='';
    nameField.value='';
    yearOfBirthField.value='';
    gearField.value='';
    costumeField.value='';
    searchState=true;
    updateFields();
} //end of clearFieldValues

function updateSuperhero(result){
    if (result.length === 0) return;
    const superhero = result[0];
    heroIDField.value = superhero.heroID;
    nameField.value = superhero.name;
    yearOfBirthField.value = superhero.yearOfBirth;
    gearField.value = superhero.gear;
    costumeField.value = superhero.costume;
    searchState = false;
    updateFields();
}

async function send(){
    try{
        if(searchState){ //get superhero
            if (heroIDField.value.trim().length > 0) {
                const data = await fetch(`/getOne/${heroIDField.value}`);
                const result = await data.json();
                if (result) {
                    if (result.message) {
                        updateMessage(messagearea,result.message, result.type);
                    }
                    else {
                        updateSuperhero(result);
                    }
                }
            }
        }
        else{ //put superhero
            const hero = {
                heroID:heroIDField.value,
                name:nameField.value,
                yearOfBirth:yearOfBirthField.value,
                gear:gearField.value,
                costume:costumeField.value
            };

            const options = {
                method:'POST',
                body:JSON.stringify(hero),
                headers:{
                    'Content-Type':'application/json'
                }
            }

            const data = await fetch(`/update`, options);
            const status=await data.json();

            if (status.message) {
                updateMessage(messagearea,status.message, status.type);
            }

            searchState=true;
            updateFields();
        }

    }
    catch(err){
        updateMessage(messagearea,err.message,'error');
    }
}
