// Questions array
const questions = [
    { inputLabel: 'Enter Your First Name' },
    { inputLabel: 'What Are You Looking For?' },
    { inputLabel: 'Enter Your Email Address', pattern: /\S+@\S+\.\S+/ },//email validation pattern from stackoverflow https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    { inputLabel: 'Create A Password', type: 'password' }
];

//Transition Times 
const shakeTime = 100; // Shake transition time Ex. 100 = 100 milsec
const switchTime = 200; //Transition between questions

//Init Position at First Question
let position = 0;

//Init DOM Elements
const footerContainer = document.querySelector('#footer-container');
const newsletterBox = document.querySelector('#newsletter-box');
const nextBtn = document.querySelector('#next-btn');
const prevBtn = document.querySelector('#prev-btn');
const inputGroup = document.querySelector('#input-group');
const inputField = document.querySelector('#input-field');
const inputLabel = document.querySelector('#input-label');
const inputProgress = document.querySelector('#input-progress');
const progressBar = document.querySelector('#progress-bar');

//EVENT

// Get Question on DOM Load
document.addEventListener('DOMContentLoaded', getInputLabel);

// Next Button Click
nextBtn.addEventListener('click', validate);

// Input field 'Enter' keyboard button click
inputField.addEventListener('keyup', e => {
    if (e.keyCode == 13) {
        validate();
    }
});


//FUNCTIONS

//Get question from array and add to mark up
function getInputLabel() {
    //Get Current Question
    inputLabel.innerHTML = questions[position].inputLabel;
    //Get Current Type
    inputField.type = questions[position].type || 'text';
    //Get Current Answer
    inputField.value = questions[position].answer || '';
    //Focus on Element
    inputField.focus();

    //Set Progress Bar Width - Var to the questions length
    progressBar.style.width = (position * 100) / questions.length + '%';

    //Add User icon for first question
    prevBtn.className = position ? "fas fa-arrow-left" : "fas fa-user";

    showQuestion();
}

//Display Question to User 
function showQuestion() {
    inputGroup.style.opacity = 1;
    inputProgress.style.transition = '';
    inputProgress.style.width = '100%';
}

//Hide Question From User after they answer it
function hideQuestion() {
    inputGroup.style.opacity = 0;
    inputLabel.style.marginLeft = 0;
    inputProgress.style.width = 0;
    inputProgress.style.transition = 'none';
    inputGroup.style.border = null;
}

// transform to Create Shake FX
function transform(x, y) {
    console.log(x, y);
    newsletterBox.style.transform = `translate(${x}px, ${y}px)`;
}

//Validate field
function validate() {
    // Make sure pattern Matches if there is one
    if (!inputField.value.match(questions[position].pattern || /.+/)) {
        inputFail();
    } else {
        inputPass();
    }
}

//Field Input Fail
function inputFail() {
    newsletterBox.className = 'error';
    //Repeat Shake Motion
    for (let i = 0; i < 4; i++) {
        setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0);
    }
    setTimeout(transform, shakeTime * 4, 0, 0);
    inputField.focus();
}

//Field Input Passed
function inputPass() {
    newsletterBox.className = '';
    setTimeout(transform, shakeTime * 0, 0, 10);
    setTimeout(transform, shakeTime * 1, 0, 0);

    //Store Answers in array
    questions[position].answer = inputField.value;

    //Increment Position
    position++;

    //If inputPass hide current question and get next
    if (questions[position]) {
        hideQuestion();
        getInputLabel();
    } else {
        //Remove If No More Questions
        hideQuestion();
        newsletterBox.className = 'close';
        progressBar.style.width = '100%';

        //Form Complete
        formComplete();
    }
}

// All fields Complete and progressBar width = 100%

function formComplete() {
    console.log(questions);
    const h1 = document.createElement('h1');
    h1.classList.add('end');
    h1.appendChild(document.createTextNode(`Thanks ${questions[0].answer}, you will recieve an email shortly.`));
    setTimeout(() => {
        newsletterBox.parentElement.appendChild(h1);
        setTimeout(() => h1.style.opacity = 50);
    }, 1000);
}