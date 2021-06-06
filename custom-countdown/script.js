const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const title = document.getElementById('title');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElments = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo =  document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set Date Input Min with Today's Date
const today = new Date().toISOString().split('T')[0]; 
dateEl.setAttribute('min',today);

//  Populate Countdown / Complete UI
function updateDOM() {
    countdownActive = setInterval(()=>{
        countdownElTitle.textContent = `${countdownTitle}`;
        const now = new Date().getTime();
        const distance = countdownValue - now;
        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day)/hour);
        const minutes = Math.floor((distance % hour)/minute);
        const seconds = Math.floor((distance % minute)/second);
        // Hide Input
        inputContainer.hidden = true;
        // If the countdown has ended, show complete
        if (distance < 0){
            countdownEl.hidden = true;
            clearInterval(countdownActive);
            completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
            completeEl.hidden = false;
        } else {
            // Else, show the countdown in progress
            timeElments[0].textContent = `${days}`;
            timeElments[1].textContent = `${hours}`;
            timeElments[2].textContent = `${minutes}`;
            timeElments[3].textContent = `${seconds}`;
            countdownEl.hidden = false;
        }

    }, second);
 
    
}

// Take Values from Form

function updateCountDown(e){
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    savedCountdown = {
        'title':countdownTitle,
        'date':countdownDate,        
    };
    localStorage.setItem('countdown', JSON.stringify(savedCountdown));
    // console.log(savedCountdown);
    // Get number version of current Date, updateDOM
    if (countdownDate === '') {
        alert('Please input a date~~');
    }else{
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

// Rest All Value

function reset() {
    // Hide Countdowns, show Input
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;
    // Stop the Countdown
    clearInterval(countdownActive);
    // Reset values
    title.value = '';
    dateEl.value = '';
    localStorage.removeItem('countdown');
}
function restorepreviousCountdown(){
    // Get countdown from localStorage if available
    if(localStorage.getItem('countdown')){
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}
// Event Listeners
countdownForm.addEventListener('submit', updateCountDown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

// On load, check localStorage
restorepreviousCountdown();