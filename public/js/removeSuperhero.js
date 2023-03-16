import { updateMessage, clearMessage } from '/js/helperFunctions.js';

let inputField;
let messagearea;

document.addEventListener('DOMContentLoaded',init);

function init(){
    inputField = document.getElementById('heroID');
    messagearea = document.getElementById('messagearea');
    document.getElementById('submit')
        .addEventListener('click',send);
}

async function send(){
    clearMessage(messagearea);
    const id = inputField.value;
    try{
        const options = {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({id})
        }

        const data = await fetch('/remove',options);
        const status = await data.json();

        if(status.message){
            updateMessage(messagearea,status.message,status.type);
        }

    }
    catch(error){
        updateMessage(messagearea,error.message,'error');
    }

}

