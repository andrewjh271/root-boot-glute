function computerPlay() {
  let number = Math.floor(Math.random()*3);
  return (number == 0) ? 'root' : (number == 1) ? 'boot' : 'glute';
}

function playRound(playerSelection, computerSelection) {
  if(roundNumber==0) {
    instructions.remove();
    currentRound.appendChild(userImage);
    vs.textContent = "VS";
    currentRound.appendChild(vs);
    currentRound.appendChild(computerImage);
    userPoint.forEach(item => {
      item.classList.add('far');
      item.classList.remove('fas');
    })
    computerPoint.forEach(item => {
      item.classList.add('far');
      item.classList.remove('fas');
    })
  }
  roundNumber++;

  userImage.src = `./${playerSelection}.png`;
  computerImage.src = `./${computerSelection}.png`;

  switch(playerSelection){
    case('root'):
      (computerSelection == 'boot') ? game("You win! Boot trips on Root!")
      :(computerSelection == 'glute') ? game("You lose! Glute sits on Root!") 
      : game("It's a tie!");
      break;
    case('boot'):
      (computerSelection == 'glute') ? game("You win! Boot kicks Glute!")
      :(computerSelection == 'root') ? game("You lose! Boot trips on Root!") 
      : game("It's a tie!");
      break;
    case('glute'):
      (computerSelection == 'root') ? game("You win! Glute sits on Root!")
      :(computerSelection == 'boot') ? game("You lose! Boot kicks Glute!") 
      : game("It's a tie!");
      break;
    default:
      console.error("playerSelection did not equal 'root' 'boot' or 'glute'");
  }
}

function game(roundResult) {
  const roundDescription = document.querySelector('#round-description');
  roundDescription.textContent = `Round ${roundNumber}: ${roundResult}`
  userImage.style.border = '4px solid transparent';
  computerImage.style.border = '4px solid transparent';
  
  if(roundResult.indexOf("win") !== -1){
    userScore++;
    userImage.style.border = '4px solid red';
    userPoint[userScore-1].classList.add('fas');
    userPoint[userScore-1].classList.remove('far');
  }else if(roundResult.indexOf("lose") !== -1){
    computerScore++;
    computerImage.style.border = '4px solid red';
    computerPoint[computerScore-1].classList.add('fas');
    computerPoint[computerScore-1].classList.remove('far');
  }
  else if(roundResult.indexOf("tie") !== -1){
    //do nothing
  }else{
    console.error("Incorrect input");
  }
  
  if(userScore==5 || computerScore==5) {
    window.removeEventListener('click', respondToClick);
    rootButton.classList.remove('button-action');
    bootButton.classList.remove('button-action');
    gluteButton.classList.remove('button-action');
    let delayInMilliseconds = 3000; // 3 seconds
    setTimeout(function() {
      if(userScore==5) instructions.textContent = "You won the match! Make your choice to play again...";
      if(computerScore==5) instructions.textContent = "You lost the match. Make your choice to play again...";
      roundNumber = 0;
      userScore = 0;
      computerScore = 0;
      currentRound.appendChild(instructions);
      currentRound.removeChild(userImage);
      currentRound.removeChild(vs);
      currentRound.removeChild(computerImage);
      roundDescription.textContent = "";
      window.addEventListener('click', respondToClick);
      rootButton.classList.add('button-action');
      bootButton.classList.add('button-action');
      gluteButton.classList.add('button-action');
    }, delayInMilliseconds);
  }
}

const rootButton = document.querySelector('#root-button');
const bootButton = document.querySelector('#boot-button');
const gluteButton = document.querySelector('#glute-button');

const userPoint = [];
userPoint[0] = document.querySelector('#user-point1');
userPoint[1] = document.querySelector('#user-point2');
userPoint[2] = document.querySelector('#user-point3');
userPoint[3] = document.querySelector('#user-point4');
userPoint[4] = document.querySelector('#user-point5');
const computerPoint = [];
computerPoint[0] = document.querySelector('#computer-point1');
computerPoint[1] = document.querySelector('#computer-point2');
computerPoint[2] = document.querySelector('#computer-point3');
computerPoint[3] = document.querySelector('#computer-point4');
computerPoint[4] = document.querySelector('#computer-point5');

let roundNumber = 0;
let userScore = 0;
let computerScore = 0;

let currentRound = document.querySelector('#current-round');
let instructions = document.querySelector('#instructions');
let userImage = document.createElement('img');
userImage.classList.add('round-images');
let computerImage = document.createElement('img');
computerImage.classList.add('round-images');
let vs = document.createElement('span');
vs.setAttribute('id', 'vs');

window.addEventListener('click', respondToClick);
function respondToClick(e) {
  const playerSelection = e.target.dataset.choice;
  const computerSelection = computerPlay();

  if(!playerSelection) return;

  playRound(playerSelection, computerSelection);
}

const roundDescription = document.querySelector('#round-description');