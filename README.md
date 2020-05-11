# Root Boot Glute
[Live Page](https://andrewjh271.github.io/root-boot-glute/)

This project is an adaption for a friend of my [Rock Paper Scissors](https://andrewjh271.github.io/RockPaperScissors/) project.

### Thoughts

The major Javascript change was replacing

```javascript
rockButton.onclick = function(){playRound(0, computerPlay())};
paperButton.onclick = function(){playRound(1, computerPlay())};
scissorsButton.onclick = function(){playRound(2, computerPlay())};
```
with
```javascript
window.addEventListener('click', respondToClick);
function respondToClick(e) {
  const playerSelection = e.target.dataset.choice;
  const computerSelection = computerPlay();
  if(!playerSelection) return;
  playRound(playerSelection, computerSelection);
}
window.removeEventListener('click', respondToClick);
```
This allowed me to remove button responsiveness after the last game of the match. I also changed computerPlay to return strings instead of numbers, which made the code more readable.

I also needed to give the buttons a specific class that contained the effects with :hover and :active. This was so that I could temporarily remove that class from these buttons so they looked inactive to the user.

-Andrew Hayhurst