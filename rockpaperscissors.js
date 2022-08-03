
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

function playRound(playerChoice, computerChoice) {
    let finalPlayerChoice = capitalize(playerChoice);

    if(!(finalPlayerChoice == 'Rock' || finalPlayerChoice == 'Paper' || finalPlayerChoice == 'Scissors')) {
        finalPlayerChoice = 'Rock';
    }

    console.log(`You selected ${finalPlayerChoice}`);
    console.log(`The computer selected ${computerChoice}`);
    
    console.log(getResultMessage(finalPlayerChoice, computerChoice));
    return compareChoices(finalPlayerChoice, computerChoice);
}

function clickChoiceButton(e) {
    let computerChoice = getComputerChoice();
    let playerChoice = e.target.id;

    playRound(playerChoice, computerChoice);
}

let buttons = document.querySelectorAll(`button`);
buttons.forEach(button => button.addEventListener('click', clickChoiceButton));

// function game() {
//     let wins = 0;
//     let losses = 0;
//     let draws = 0;

//     for(let i = 0; i < 5; ++i) {
//         let playerChoice = prompt('Rock, Paper or Scissors?', 'Rock');
//         let computerChoice = getComputerChoice();
        
//         let result = playRound(playerChoice, computerChoice);
        
//         if(result < 0) {
//             losses++;
//         } else if(result > 0) {
//             wins++;
//         } else {
//             draws++;
//         }
//     }

//     console.log(`The Game Results Are: ${wins} Wins - ${losses} Losses - ${draws} Draws`);
// }
