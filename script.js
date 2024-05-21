const albums = [
    { names: ["Whole Lotta Red", "WLR"], image: "images/Whole Lotta Red.jpg" },
    { names: ["Die Lit"], image: "images/Die Lit.jpg" },
    { names: ["Alexandria"], image: "images/Alexandria.jpg" },
    { names: ["War"], image: "images/War.jpg" },
    { names: ["Graduation"], image: "images/Graduation.jpg" },
    { names: ["The Life of Pablo", "Life of Pablo", "TLoP"], image: "images/The Life of Pablo.jpeg" },
    { names: ["Luv Is Rage 2", "Luv Is Rage Two", "LIR2", "LIR 2"], image: "images/LuvIsRage2.jpeg" },
    { names: ["Eternal Atake"], image: "images/Eternal Atake.jpeg" },
    { names: ["X"], image: "images/X.jpeg" },
    { names: ["Great Chaos", "A Great Chaos"], image: "images/A Great Chaos.jpeg" },
    { names: ["If Looks Could Kill", "ILCK"], image: "images/If Looks Could Kill.jpeg" },
    { names: ["Rodeo"], image: "images/Rodeo.jpeg" },
    { names: ["Utopia"], image: "images/Utopia.jpeg" },
    { names: ["Golden Child, Chapter 3", "Golden Child 3", "Golden Child Chapter 3", "GCC3"], image: "images/Golden Child 3.jpeg" },
    { names: ["Watch My Back"], image: "images/Watch My Back.png" },
    { names: ["Days B4 III", "Days B4 3"], image: "images/Days B4 III.png" },
    { names: ["Freewave 3"], image: "images/Freewave 3.png" },
    { names: ["Fallen Raven"], image: "images/Fallen Raven.png" },
    { names: ["AftërLyfe", "AfterLyfe"], image: "images/Afterlyfe.png" },
    { names: ["4L"], image: "images/4L.png" },
    { names: ["2093"], image: "images/2093.png" },
    { names: ["Lyfë", "Lyfe"], image: "images/Lyfe.jpg" },
    { names: ["Up 2 Më", "Up 2 Me"], image: "images/Up 2 Me.png" },
    { names: ["For All The Dogs", "FATD"], image: "images/For All The Dogs.jpg" },
    { names: ["Dark Lane Demo Tapes", "DLDT"], image: "images/Dark Lane Demo Tapes.jpg" },
    { names: ["Scorpion"], image: "images/Scorpion.jpg" },
    { names: ["Views"], image: "images/Views.jpg" },
    { names: ["Certified Lover Boy", "Certified Boy Lover"], image: "images/Certified Lover Boy.png" },
    { names: ["Honestly, Nevermind", "Honestly Nevermind"], image: "images/Honestly, Nevermind.png" },
    { names: ["Astroworld"], image: "images/Astroworld.png" },
    { names: ["Her Loss"], image: "images/Her Loss.png" },
    { names: ["Midnight Club"], image: "images/Midnight Club.jpg" },
    { names: ["Solitary 2", "Solitary Two"], image: "images/Solitary 2.png" },
    { names: ["Stuck In My Ways", "SIMW"], image: "images/Stuck In My Ways.png" },
    { names: ["B4DARAVEN"], image: "images/B4DARAVEN.jpg" },
    { names: ["i am > i was"], image: "images/i am i was.jpg" },
    { names: ["?"], image: "images/Question Mark.png" },
    { names: ["17"], image: "images/17.png" },
    { names: ["Goodbye & Good Riddance", "Goodbye Good Riddance"], image: "images/Goodbye & Good Riddance.jpg" },
    { names: ["SAVAGE MODE II", "Savage Mode 2"], image: "images/SAVAGE MODE II.png" },
    { names: ["We Don't Trust You", "We Dont Trust You"], image: "images/We Don't Trust You.png" },
    { names: ["Pink Tape"], image: "images/Pink Tape.png" },
    { names: ["IGOR"], image: "images/IGOR.png" },
    { names: ["Flower Boy"], image: "images/Flower Boy.jpg" },
    { names: ["CALL ME IF YOU GET LOST", "CMIYGL"], image: "images/CALL ME IF YOU GET LOST.png" },
    { names: ["We Love You Tecca 2", "WLYT2"], image: "images/We Love You Tecca 2.png" },
    { names: ["We Love You Tecca", "WLYT"], image: "images/We Love You Tecca.jpg" },
    { names: ["TEC"], image: "images/TEC.png" },
    { names: ["HEROES & VILLAINS"], image: "images/HEROES VILLAINS.jpg" },
    { names: ["NOT ALL HEROES WEAR CAPES", "NAHWC"], image: "images/NOT ALL HEROES WEAR CAPES.png" },
];

const albumImage = document.getElementById('albumImage');
const guessInput = document.getElementById('guessInput');
const submitGuess = document.getElementById('submitGuess');
const result = document.getElementById('result');
const howToPlayButton = document.getElementById('howToPlayButton');
const howToPlayBox = document.getElementById('howToPlayBox');
const startAgainButton = document.getElementById('startAgainButton');
const restartButton = document.getElementById('restartButton');
const restartConfirmationBox = document.getElementById('restartConfirmationBox');
const confirmRestartButton = document.getElementById('confirmRestartButton');
const cancelRestartButton = document.getElementById('cancelRestartButton');
const pointsDisplay = document.getElementById('pointsDisplay');
const streakText = document.getElementById('streakText');
const roundNumber = document.getElementById('roundNumber');

restartButton.addEventListener('click', () => {
    restartConfirmationBox.style.display = 'block';
});

confirmRestartButton.addEventListener('click', () => {
    restartConfirmationBox.style.display = 'none';
    initGame(); // Call the initGame function to restart the game
});

cancelRestartButton.addEventListener('click', () => {
    restartConfirmationBox.style.display = 'none';
});

let currentAlbumIndex;
let blurLevel = 15;
let tries = 0;
const maxTries = 5;
let correctGuesses = 0;
let totalRounds = 10;
let currentRound = 1; // Track the current round
let displayedAlbums = new Set();
let points = 0;  // To keep track of the player's points
let streak = 0;  // To keep track of the player's streak

function getRandomAlbum() {
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * albums.length);
    } while (displayedAlbums.has(randomIndex));
    displayedAlbums.add(randomIndex);
    return randomIndex;
}

function displayAlbum(album) {
    albumImage.src = album.image;
    albumImage.alt = album.names[0];
    albumImage.style.filter = `blur(${blurLevel}px)`;
}

function checkGuess() {
    const guess = guessInput.value.trim().toLowerCase();
    const acceptableAnswers = albums[currentAlbumIndex].names.map(name => name.toLowerCase());

    if (acceptableAnswers.includes(guess)) {
        result.textContent = "Correct! The answer is " + albums[currentAlbumIndex].names[0] + ".";
        document.getElementById('nextButton').style.display = 'block';
        guessInput.disabled = true;
        submitGuess.disabled = true;
        albumImage.style.filter = 'blur(0px)';
        correctGuesses++;
        points++;  // Add one point for a correct guess
        streak++;  // Increment streak
        updatePointsDisplay();
        if (streak > 2) {  // If the player has a streak of 3 or more
            points += (streak - 2);  // Add extra points based on the streak
            updatePointsDisplay();
            streakText.textContent = `Streak: ${streak} (${streak - 2} bonus points)`;
        }
    } else {
        tries++;
        if (tries >= maxTries) {
            result.textContent = "Incorrect. The correct answer was: " + albums[currentAlbumIndex].names[0] + ".";
            document.getElementById('nextButton').style.display = 'block';
            albumImage.style.filter = 'blur(0px)';
            guessInput.disabled = true;
            submitGuess.disabled = true;
            streak = 0;
            updatePointsDisplay();
            streakText.textContent = '';
        } else {
            result.textContent = "Incorrect, tries left: " + (maxTries - tries) + ".";
            streak = 0;
            if (blurLevel > 0) {
                blurLevel -= 3;
                albumImage.style.filter = `blur(${blurLevel}px)`;
            }
        }
    }
    guessInput.value = "";
}

function updatePointsDisplay() {
    pointsDisplay.textContent = "Points: " + points;
}

function nextAlbum() {
    totalRounds--;
    if (totalRounds > 0) {
        currentRound++;
        roundNumber.textContent = "Round " + currentRound; // Update the round number display
        document.getElementById('nextButton').style.display = 'none';
        guessInput.disabled = false;
        albumImage.style.transition = 'none';
        blurLevel = 15;
        tries = 0;
        currentAlbumIndex = getRandomAlbum();
        displayAlbum(albums[currentAlbumIndex]);
        result.textContent = "";
        guessInput.value = "";
        submitGuess.disabled = false;
    } else {
        result.textContent = `Game over! You guessed ${correctGuesses} out of 10 correctly and earned ${points} points.`;
        guessInput.disabled = true;
        submitGuess.disabled = true;
        startAgainButton.style.display = 'block';
    }
}

function initGame() {
    guessInput.disabled = false;
    albumImage.style.transition = 'none';
    blurLevel = 15;
    tries = 0;
    totalRounds = 10;
    currentRound = 1; // Reset the current round
    correctGuesses = 0;
    points = 0;  // Reset points at the start of the game
    streak = 0;  // Reset streak at the start of the game
    displayedAlbums.clear();
    currentAlbumIndex = getRandomAlbum();
    displayAlbum(albums[currentAlbumIndex]);
    result.textContent = "";
    guessInput.value = "";
    submitGuess.disabled = false;
    startAgainButton.style.display = 'none';
    roundNumber.textContent = "Round 1"; // Reset the round number display
    updatePointsDisplay();
    streakText.textContent = '';
    document.getElementById('nextButton').style.display = 'none';
}

submitGuess.addEventListener('click', checkGuess);

howToPlayButton.addEventListener('click', () => {
    if (howToPlayBox.style.display === 'none' || howToPlayBox.style.display === '') {
        howToPlayBox.style.display = 'block';
        howToPlayBox.style.animation = 'slideIn 0.5s forwards';
    } else {
        howToPlayBox.style.animation = 'slideOut 0.5s forwards';
        setTimeout(() => {
            howToPlayBox.style.display = 'none';
        }, 500);
    }
});

closeHowToPlay.addEventListener('click', () => {
    howToPlayBox.style.animation = 'slideOut 0.5s forwards';
    setTimeout(() => {
        howToPlayBox.style.display = 'none';
    }, 500);
});

document.getElementById('nextButton').addEventListener('click', nextAlbum);
startAgainButton.addEventListener('click', initGame);

window.onload = initGame;
