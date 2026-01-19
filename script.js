// Game State
let playerScore = 0;
let computerScore = 0;

// DOM Elements
const playerScoreElement = document.getElementById('playerScore');
const computerScoreElement = document.getElementById('computerScore');
const playerChoiceElement = document.getElementById('playerChoice');
const computerChoiceElement = document.getElementById('computerChoice');
const resultMessageElement = document.getElementById('resultMessage');
const choiceButtons = document.querySelectorAll('.choice-btn');
const restartButton = document.getElementById('restartBtn');

// Choice emoji mapping
const choiceEmojis = {
    rock: '🪨',
    paper: '📄',
    scissors: '✂️'
};

// Choice names for display
const choiceNames = {
    rock: 'Rock',
    paper: 'Paper',
    scissors: 'Scissors'
};

/**
 * Initialize the game
 */
function initGame() {
    // Add event listeners to choice buttons
    choiceButtons.forEach(button => {
        button.addEventListener('click', () => {
            const playerChoice = button.getAttribute('data-choice');
            playRound(playerChoice);
        });
    });

    // Add event listener to restart button
    restartButton.addEventListener('click', resetGame);

    // Initialize display
    updateDisplay();
}

/**
 * Play a round of Rock-Paper-Scissors
 * @param {string} playerChoice - The player's choice ('rock', 'paper', or 'scissors')
 */
function playRound(playerChoice) {
    // Disable buttons during animation
    choiceButtons.forEach(btn => btn.disabled = true);

    // Generate computer's choice
    const computerChoice = getComputerChoice();

    // Display choices with animation
    displayChoices(playerChoice, computerChoice);

    // Determine winner after a short delay for animation
    setTimeout(() => {
        const result = determineWinner(playerChoice, computerChoice);
        updateScore(result);
        displayResult(result, playerChoice, computerChoice);
        
        // Re-enable buttons
        choiceButtons.forEach(btn => btn.disabled = false);
    }, 500);
}

/**
 * Generate a random choice for the computer
 * @returns {string} - Random choice ('rock', 'paper', or 'scissors')
 */
function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

/**
 * Display player and computer choices with animation
 * @param {string} playerChoice - Player's choice
 * @param {string} computerChoice - Computer's choice
 */
function displayChoices(playerChoice, computerChoice) {
    // Reset to question mark first
    playerChoiceElement.textContent = '❓';
    computerChoiceElement.textContent = '❓';

    // Animate and display choices
    setTimeout(() => {
        playerChoiceElement.textContent = choiceEmojis[playerChoice];
        computerChoiceElement.textContent = choiceEmojis[computerChoice];
        
        // Add bounce animation
        playerChoiceElement.classList.add('animate');
        computerChoiceElement.classList.add('animate');
        
        // Remove animation class after animation completes
        setTimeout(() => {
            playerChoiceElement.classList.remove('animate');
            computerChoiceElement.classList.remove('animate');
        }, 500);
    }, 200);
}

/**
 * Determine the winner of a round
 * @param {string} playerChoice - Player's choice
 * @param {string} computerChoice - Computer's choice
 * @returns {string} - 'win', 'lose', or 'draw'
 */
function determineWinner(playerChoice, computerChoice) {
    // Same choice = draw
    if (playerChoice === computerChoice) {
        return 'draw';
    }

    // Winning conditions
    if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return 'win';
    }

    // Otherwise, player loses
    return 'lose';
}

/**
 * Update the score based on the result
 * @param {string} result - 'win', 'lose', or 'draw'
 */
function updateScore(result) {
    if (result === 'win') {
        playerScore++;
    } else if (result === 'lose') {
        computerScore++;
    }
    // Draw doesn't change scores

    updateScoreDisplay();
}

/**
 * Update the score display on the page
 */
function updateScoreDisplay() {
    playerScoreElement.textContent = playerScore;
    computerScoreElement.textContent = computerScore;
}

/**
 * Display the result message
 * @param {string} result - 'win', 'lose', or 'draw'
 * @param {string} playerChoice - Player's choice
 * @param {string} computerChoice - Computer's choice
 */
function displayResult(result, playerChoice, computerChoice) {
    // Remove all result classes
    resultMessageElement.classList.remove('default', 'win', 'lose', 'draw');

    // Add appropriate class and message based on result
    if (result === 'win') {
        resultMessageElement.classList.add('win');
        resultMessageElement.textContent = `🎉 You Win! ${choiceNames[playerChoice]} beats ${choiceNames[computerChoice]}`;
    } else if (result === 'lose') {
        resultMessageElement.classList.add('lose');
        resultMessageElement.textContent = `😢 You Lose! ${choiceNames[computerChoice]} beats ${choiceNames[playerChoice]}`;
    } else {
        resultMessageElement.classList.add('draw');
        resultMessageElement.textContent = `🤝 Draw! Both chose ${choiceNames[playerChoice]}`;
    }
}

/**
 * Reset the game to initial state
 */
function resetGame() {
    // Reset scores
    playerScore = 0;
    computerScore = 0;

    // Reset display
    playerChoiceElement.textContent = '❓';
    computerChoiceElement.textContent = '❓';
    
    // Reset result message
    resultMessageElement.classList.remove('win', 'lose', 'draw');
    resultMessageElement.classList.add('default');
    resultMessageElement.textContent = 'Choose your weapon!';

    // Update score display
    updateScoreDisplay();
}

/**
 * Update the entire display
 */
function updateDisplay() {
    updateScoreDisplay();
    resetGame();
}

// Initialize the game when the page loads
initGame();
