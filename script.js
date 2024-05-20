const albums = [
    { name: "Whole Lotta Red", image: "images/Whole Lotta Red.jpg" },
    { name: "Die Lit", image: "images/Die Lit.jpg" },
    { name: "Alexandria", image: "images/Alexandria.jpg" },
    { name: "War", image: "images/War.jpg" },
    { name: "Graduation", image: "images/Graduation.jpg" },
    { name: "The Life of Pablo", image: "images/The Life of Pablo.jpeg" },
    { name: "Luv Is Rage 2", image: "images/LuvIsRage2.jpeg" },
    { name: "Eternal Atake", image: "images/Eternal Atake.jpeg" },
    { name: "X", image: "images/X.jpeg" },
    { name: "Great Chaos", image: "images/A Great Chaos.jpeg" },
    { name: "If Looks Could Kill", image: "images/If Looks Could Kill.jpeg" },
    { name: "Rodeo", image: "images/Rodeo.jpeg" },
    { name: "Utopia", image: "images/Utopia.jpeg" },
    { name: "Golden Child 3", image: "images/Golden Child 3.jpeg" },
    { name: "Watch My Back", image: "images/Watch My Back.png" },
    { name: "Days B4 III", image: "images/Days B4 III.png" },
    { name: "Freewave 3", image: "images/Freewave 3.png" },
    { name: "Fallen Raven", image: "images/Fallen Raven.png" },
    { name: "AfterLyfe", image: "images/Afterlyfe.png" },
    { name: "4L", image: "images/4L.png" },
    { name: "2093", image: "images/2093.png" },
    { name: "Lyfe", image: "images/Lyfe.jpg" },
    { name: "Up 2 Me", image: "images/Up 2 Me.png" },
    { name: "For All The Dogs", image: "images/For All The Dogs.jpg" },
    { name: "Dark Lane Demo Tapes", image: "images/Dark Lane Demo Tapes.jpg" },
    { name: "Scorpion", image: "images/Scorpion.jpg" },
    { name: "Views", image: "images/Views.jpg" },
    { name: "Certified Boy Lover", image: "images/Certified Lover Boy.png" },
    { name: "Honestly, Nevermind", image: "images/Honestly, Nevermind.png" },
    { name: "Astroworld", image: "images/Astroworld.png" },
    { name: "Her Loss", image: "images/Her Loss.png" },
    { name: "Midnight Club", image: "images/Midnight Club.jpg" },
    { name: "Solitary 2", image: "images/Solitary 2.png" },
    { name: "Stuck In My Ways", image: "images/Stuck In My Ways.png" },
    { name: "B4DARAVEN", image: "images/B4DARAVEN.jpg" },
    { name: "i am > i was", image: "images/i am i was.jpg" },
    { name: "?", image: "images/Question Mark.png" },
    { name: "17", image: "images/17.png" },
    { name: "Goodbye & Good Riddance", image: "images/Goodbye & Good Riddance.jpg" },
    { name: "SAVAGE MODE II", image: "images/SAVAGE MODE II.png" },
    { name: "We Don't Trust You", image: "images/We Don't Trust You.png" },
    { name: "Pink Tape", image: "images/Pink Tape.png" },
    { name: "IGOR", image: "images/IGOR.png" },
    { name: "Flower Boy", image: "images/Flower Boy.jpg" },
    { name: "CALL ME IF YOU GET LOST", image: "images/CALL ME IF YOU GET LOST.png" },
];

const albumImage = document.getElementById('albumImage');
const guessInput = document.getElementById('guessInput');
const submitGuess = document.getElementById('submitGuess');
const skipButton = document.getElementById('skipButton');
const result = document.getElementById('result');
const giveUpButton = document.getElementById('giveUpButton');
const howToPlayButton = document.getElementById('howToPlayButton');
const howToPlayBox = document.getElementById('howToPlayBox');
const startAgainButton = document.getElementById('startAgainButton');

let currentAlbumIndex;
let blurLevel = 15;
let tries = 0;
const maxTries = 5;
let correctGuesses = 0;
let totalAlbums = 10;
let displayedAlbums = new Set();

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
    albumImage.alt = album.name;
    albumImage.style.filter = `blur(${blurLevel}px)`;
    if (album.name === "Graduation") {
        albumImage.classList.add('graduation');
    } else {
        albumImage.classList.remove('graduation');
    }
}

function checkGuess() {
    const guess = guessInput.value.trim().toLowerCase();
    if (guess === albums[currentAlbumIndex].name.toLowerCase()) {
        result.textContent = "Correct! The answer is " + albums[currentAlbumIndex].name + ".";
        albumImage.style.filter = 'blur(0px)';
        correctGuesses++;
    } else {
        tries++;
        if (tries >= maxTries) {
            result.textContent = "Incorrect. The correct answer was: " + albums[currentAlbumIndex].name + ".";
            albumImage.style.filter = 'blur(0px)';
            guessInput.disabled = true;
            submitGuess.disabled = true;
        } else {
            result.textContent = "Incorrect, tries left: " + (maxTries - tries) + ".";
            if (blurLevel > 0) {
                blurLevel -= 3;
                albumImage.style.filter = `blur(${blurLevel}px)`;
            }
        }
    }
}

function nextAlbum() {
    totalAlbums--;
    if (totalAlbums > 0) {
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
        result.textContent = `Game over! You guessed ${correctGuesses} out of 10 correctly.`;
        guessInput.disabled = true;
        submitGuess.disabled = true;
        skipButton.disabled = true;
        giveUpButton.disabled = true;
        startAgainButton.style.display = 'block';
    }
}

submitGuess.addEventListener('click', checkGuess);
skipButton.addEventListener('click', nextAlbum);
giveUpButton.addEventListener('click', () => {
    result.textContent = "The correct answer was: " + albums[currentAlbumIndex].name + ".";
    albumImage.style.filter = 'blur(0px)';
    guessInput.disabled = true;
    submitGuess.disabled = true;
});

function initGame() {
    guessInput.disabled = false;
    albumImage.style.transition = 'none';
    blurLevel = 15;
    tries = 0;
    totalAlbums = 10;
    correctGuesses = 0;
    displayedAlbums.clear();
    currentAlbumIndex = getRandomAlbum();
    displayAlbum(albums[currentAlbumIndex]);
    result.textContent = "";
    guessInput.value = "";
    submitGuess.disabled = false;
    skipButton.disabled = false;
    giveUpButton.disabled = false;
    startAgainButton.style.display = 'none';
}

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

startAgainButton.addEventListener('click', initGame);

window.onload = initGame;
