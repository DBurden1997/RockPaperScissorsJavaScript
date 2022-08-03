
function getRandomNum(max) {
    return Math.floor(Math.random() * max) + 1;
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function compareChoices(first, second) {
    switch(first) {
        case 'Rock': {
            switch(second) {
                case 'Rock': {
                    return 0;
                }
                case 'Paper': {
                    return -1;
                }
                case 'Scissors': {
                    return 1;
                }
            }
        }
        case 'Paper': {
            switch(second) {
                case 'Rock': {
                    return 1;
                }
                case 'Paper': {
                    return 0;
                }
                case 'Scissors': {
                    return -1;
                }
            }
        }
        case 'Scissors': {
            switch(second) {
                case 'Rock': {
                    return -1;
                }
                case 'Paper': {
                    return 1;
                }
                case 'Scissors': {
                    return 0;
                }
            }
        }
    }
}

function getResultMessage(first, second) {
    let resultNum = compareChoices(first, second);

    if(resultNum > 0) {
        return `You win! ${first} beats ${second}`;
    }
    if(resultNum < 0) {
        return `You lose! ${first} loses to ${second}`;
    }

    return `It's a draw! You both selected ${first}`;
}

function updateRoundResultText(text) {
    document.querySelector("#round-result").textContent = text;
}

function playRound(playerChoice, computerChoice) {
    let finalPlayerChoice = capitalize(playerChoice);

    if(!(finalPlayerChoice == 'Rock' || finalPlayerChoice == 'Paper' || finalPlayerChoice == 'Scissors')) {
        finalPlayerChoice = 'Rock';
    }

    console.log(`You selected ${finalPlayerChoice}`);
    console.log(`The computer selected ${computerChoice}`);
    
    updateRoundResultText(getResultMessage(finalPlayerChoice, computerChoice));
    return compareChoices(finalPlayerChoice, computerChoice);
}

function getComputerChoice() {
    let i = getRandomNum(3);

    switch(i) {
        case 1: {
            return 'Rock';
        }
        case 2: {
            return 'Paper';
        }
        default: {
            return 'Scissors';
        }
    }
}

function updateResultsTally(result) {
    if(result < 0) {
        let lossCounterNode = document.querySelector(`#loss-counter`)
        let losses = +(lossCounterNode.textContent);
        lossCounterNode.textContent = ++losses;
    } else if(result > 0) {
        let winCounterNode = document.querySelector(`#win-counter`)
        let wins = +(winCounterNode.textContent);
        winCounterNode.textContent = ++wins;
    } else {
        let drawCounterNode = document.querySelector(`#draw-counter`)
        let draws = +(drawCounterNode.textContent);
        drawCounterNode.textContent = ++draws;
    }
}

function clickChoiceButton(e) {
    let computerChoice = getComputerChoice();
    let playerChoice = e.target.id;

    updateResultsTally(playRound(playerChoice, computerChoice));
}

let buttons = document.querySelectorAll(`button`);
buttons.forEach(button => button.addEventListener('click', clickChoiceButton));

// function game() {

//     for(let i = 0; i < 5; ++i) {
//         let playerChoice = prompt('Rock, Paper or Scissors?', 'Rock');
//         let computerChoice = getComputerChoice();
        
//     }

//     console.log(`The Game Results Are: ${wins} Wins - ${losses} Losses - ${draws} Draws`);
// }
