import { updateMessage, clearMessage } from '/js/helperFunctions.js';

let resultarea;
let messagearea;
let computerId;

document.addEventListener('DOMContentLoaded',init);

function init(){
    resultarea=document.getElementById('resultarea');
    heroID=document.getElementById('heroID');
    messagearea=document.getElementById('messagearea');
    document.getElementById('submit')
        .addEventListener('click', send);
}

async function send(){
    clearMessage(messagearea);
    resultarea.innerHTML='';
    try{
        if (heroID.value.trim().length>0){
            const data = await fetch(`/getOne/${heroID.value}`);
            const result = await data.json();
            if (result) {
                if (result.message) {
                    updateMessage(messagearea,result.message, result.type);
                }
                else {
                    updateComputer(result);
                }
            }
        }
        
    }
    catch(error){
        updateMessage(messagearea,`Not found. ${error.message}`,'error')
    }
};

function updateComputer(result){
    if(result.length===0) return;
    const hero=result[0];
    resultarea.innerHTML=`
    <p><span class="legend">heroID: </span> ${hero.heroID}</p>
    <p><span class="legend">Name: </span> ${hero.name}</p>
    <p><span class="legend">yearOfBirth: </span> ${hero.yearOfBirth}</p>
    <p><span class="legend">gear: </span> ${hero.gear}</p>
    <p><span class="legend">costme: </span> ${hero.costme}</p>
    `
}
