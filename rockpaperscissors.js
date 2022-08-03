
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

function updateRoundResultText(playerChoice, computerChoice) {
    let resultText = getResultMessage(playerChoice, computerChoice);

    document.querySelector("#player-choice").textContent = `You Selected ${playerChoice}`;
    document.querySelector("#computer-choice").textContent = `Computer Selected ${computerChoice}`;
    document.querySelector("#round-result-text").textContent = resultText;
}

function playRound(playerChoice, computerChoice) {
    let finalPlayerChoice = capitalize(playerChoice);

    if(!(finalPlayerChoice == 'Rock' || finalPlayerChoice == 'Paper' || finalPlayerChoice == 'Scissors')) {
        finalPlayerChoice = 'Rock';
    }

    console.log(`You selected ${finalPlayerChoice}`);
    console.log(`The computer selected ${computerChoice}`);
    
    updateRoundResultText(finalPlayerChoice, computerChoice);
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

function showModal(text) {
    let resultModal = document.querySelector(`#result-modal`);
    resultModal.querySelector(`#result-modal-text`).textContent = text;
    resultModal.classList.add(`active`);
}

function closeModal() {
    let resultModal = document.querySelector(`#result-modal`);
    resultModal.classList.remove(`active`);
}

function checkForVictory(wins, losses, draws) {
    let result = 0;

    if(wins >= 5) {
        result = 1;
    }
    if(losses >= 5) {
        result = -1;
    }

    if(!result) {
        return;
    }


    showModal(`The Game Results Are: ${wins} Wins - ${losses} Losses - ${draws} Draws`);
}

function updateResultsTally(result) {
    let lossCounterNode = document.querySelector(`#loss-counter`);
    let losses = +(lossCounterNode.textContent);

    let winCounterNode = document.querySelector(`#win-counter`);
    let wins = +(winCounterNode.textContent);

    let drawCounterNode = document.querySelector(`#draw-counter`);
    let draws = +(drawCounterNode.textContent);

    if(result < 0) {
        lossCounterNode.textContent = ++losses;
    } else if(result > 0) {
        winCounterNode.textContent = ++wins;
    } else {
        drawCounterNode.textContent = ++draws;
    }

    checkForVictory(wins, losses, draws);
}
function resetResultsTally() {

    let lossCounterNode = document.querySelector(`#loss-counter`);

    let winCounterNode = document.querySelector(`#win-counter`);

    let drawCounterNode = document.querySelector(`#draw-counter`);

    lossCounterNode.textContent = 0;
    winCounterNode.textContent = 0;
    drawCounterNode.textContent = 0;
} 

function resetGame() {
    resetResultsTally();
    closeModal();
}

function clickChoiceButton(e) {
    let computerChoice = getComputerChoice();
    let playerChoice = e.target.id;

    updateResultsTally(playRound(playerChoice, computerChoice));
}

let buttons = document.querySelectorAll(`.choice-button`);
buttons.forEach(button => button.addEventListener('click', clickChoiceButton));

let modalButton = document.querySelector('#retry');
modalButton.addEventListener('click', resetGame);
