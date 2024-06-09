let player1Score = 0;
let player2Score = 0;
let currentPlayer = 'player1';

const player1ScoreElement = document.getElementById('player1Score');
const player2ScoreElement = document.getElementById('player2Score');
const player1Element = document.getElementById('player1Label');
const player2Element = document.getElementById('player2Label');

// List of image paths (15 unique images)
const images = [
    'card_images/colorfulCrossimage.jpg',
    'card_images/image2.jpg',
    'card_images/image3.jpg',
    'card_images/image4.jpg',
    'card_images/image5.jpg',
    'card_images/image6.jpg',
    'card_images/image7.jpg',
    'card_images/image8.jpg',
    'card_images/image9.jpg',
    'card_images/image10.jpg',
    'card_images/image11.jpg',
    'card_images/image12.jpg',
    'card_images/image13.jpg',
    'card_images/image14.jpg',
    'card_images/image15.jpg'
];

// Duplicate the images to create pairs and shuffle them
let cardImages = images.concat(images).sort(() => 0.5 - Math.random());

// Update player scores in the game logic
function updateScore(player) {
    if (player === 'player1') {
        player1Score++;
        player1ScoreElement.textContent = player1Score;
    } else if (player === 'player2') {
        player2Score++;
        player2ScoreElement.textContent = player2Score;
    }
}

// Example usage of updateScore function when a match is found
function handleMatch() {
    updateScore(currentPlayer); // Update current player's score
    switchPlayer(); // Switch to the next player

    const flippedCards = document.querySelectorAll('.flip.matched');
    flippedCards.forEach(card => {
        card.classList.add('fade-out'); // Add fade-out class
    });

    const matchedCards = document.querySelectorAll('.matched');
    if (matchedCards.length === 30) {
        setTimeout(() => alert('Congratulations! You win!'), 500);
    }
}

// Create game board
const gameGrid = document.querySelector('.game-grid');

function createBoard() {
    for (let i = 0; i < 30; i++) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.id = i;

        const front = document.createElement('div');
        front.classList.add('card-face', 'front');

        const back = document.createElement('div');
        back.classList.add('card-face', 'back');
        back.style.backgroundImage = `url(${cardImages[i]})`; // Set background image

        card.appendChild(front);
        card.appendChild(back);
        gameGrid.appendChild(card);

        card.addEventListener('click', flipCard);
    }
}

// Flip card
function flipCard() {
    if (document.querySelectorAll('.flip:not(.matched)').length >= 2) {
        return; // Prevent more than 2 cards being flipped at once
    }

    this.classList.toggle('flip');
    checkForMatch();
}

// Check for match
function checkForMatch() {
    const flippedCards = document.querySelectorAll('.flip:not(.matched)');
    if (flippedCards.length === 2) {
        const [firstCard, secondCard] = flippedCards;
        const firstImage = firstCard.querySelector('.back').style.backgroundImage;
        const secondImage = secondCard.querySelector('.back').style.backgroundImage;

        if (firstImage === secondImage) {
            flippedCards.forEach(card => {
                card.classList.remove('flip');
                card.classList.add('matched'); // Add matched class
            });

            handleMatch(); // Update current player's score
        } else {
            setTimeout(() => {
                flippedCards.forEach(card => card.classList.remove('flip'));
                switchPlayer(); // Switch to the next player
            }, 1000);
        }
    }
}

// Restart game
function restartGame() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.classList.remove('flip', 'matched', 'fade-out'); // Remove fade-out class
        card.style.transition = '';
        card.style.opacity = 1; // Reset card opacity
    });

    setTimeout(() => {
        cards.forEach((card, index) => {
            card.querySelector('.back').style.backgroundImage = `url(${cardImages[index]})`; // Reset background image
        });
        shuffleCards();
    }, 500); // Delay restart to give time to see the flipped cards

    // Reset scores
    player1Score = 0;
    player2Score = 0;
    player1ScoreElement.textContent = player1Score;
    player2ScoreElement.textContent = player2Score;
    currentPlayer = 'player1'; // Reset to player 1
    updateBackground(); // Reset background color
}

// Shuffle cards
function shuffleCards() {
    cardImages = images.concat(images).sort(() => 0.5 - Math.random()); // Reshuffle images
    const cardsArray = Array.from(document.querySelectorAll('.card'));
    cardsArray.forEach((card, index) => {
        card.querySelector('.back').style.backgroundImage = `url(${cardImages[index]})`; // Reset background image
        gameGrid.appendChild(card); // Re-append shuffled cards to grid
    });
}

// Switch player and update background color
function switchPlayer() {
    currentPlayer = currentPlayer === 'player1' ? 'player2' : 'player1';
    updateBackground();
}

function updateBackground() {
    if (currentPlayer === 'player1') {
        document.body.style.backgroundColor = 'lightgreen';
        player1Element.style.color = 'green';
        player2Element.style.color = 'black';
    } else {
        document.body.style.backgroundColor = 'lightblue';
        player2Element.style.color = 'blue';
        player1Element.style.color = 'black';
    }
}

// Initialize game
createBoard();
updateBackground(); // Set initial background color
