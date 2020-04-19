# root-boot-glute

I adapted for a friend my Rock Paper Scissors project.

Major script change was replacing

rockButton.onclick = function(){playRound(0, computerPlay())};
paperButton.onclick = function(){playRound(1, computerPlay())};
scissorsButton.onclick = function(){playRound(2, computerPlay())};

with

window.addEventListener('click', respondToClick);
function respondToClick(e) {
  const playerSelection = e.target.dataset.choice;
  const computerSelection = computerPlay();

  if(!playerSelection) return;

  playRound(playerSelection, computerSelection);
}

window.removeEventListener('click', respondToClick);

This allowed me to remove button responsiveness after the last game of the match. I also changed computerPlay to return strings instead of numbers, which made the code more readable.

I also needed to give the buttons a specific class where I made the effects with :hover and :active. I temporarily removed the class from these buttons so they looked inactive to user.