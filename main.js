// We need this in order to load the audio files.
// We can't load them if the user didn't perform any gesture in the browser yet.
// So we force her/him to click on a 'Start' button.
let userClickedStart = false;
// let userClickedStart = true;


// Sounds
let pipeSound; // when getting out the pipe.
let coinSound;

// Pipe
let leftPipeImg;
let rightPipeImg;
let pipePosYFactor = 0.2;
let pipeLengthFactor = 0.2; // Pipe length will be THIS * windowWidth

// Base Image
let baseImg;
let baseImgScaled;

// Animals GIFs
let horseGif;
let catGif;
let dogGif;
let exoticGif;

let gameFont;

let board;

let animals = []; 
// Used to create animals randomly:
let animalCreationInterval = 120; // Create a new animal every 120 frames (roughly every 2 seconds)
let lastAnimalCreationFrame = 0;

const animalTypes = {
    DOG: 'Dog',
    CAT: 'Cat',
    HORSE: 'Horse',
    EXOTIC: 'Exotic'
};



function preload() {
    // !! The order in which you load things here does matter !!
    // GIFs are loaded as 'createImg' which creates an HTML element outside the canvas.
    // Because of that you need to import the pipes as HTML elements as well otherwise the GIFs 
    //  will always be in front of the pipes.

    // Animal GIFs
    horseGif = createImg('assets/gifs/horse.gif');
    catGif = createImg('assets/gifs/cat.gif');
    dogGif = createImg('assets/gifs/dog.gif');
    exoticGif = createImg('assets/gifs/exotic.gif');
    //   Hiding their HTML elements   
    horseGif.style('display', `none`);
    catGif.style('display', `none`);
    dogGif.style('display', `none`);
    exoticGif.style('display', `none`);

    // Pipe
    leftPipeImg = createImg('assets/pipe.png');
    rightPipeImg = createImg('assets/pipe.png');
    leftPipeImg.style('display', `none`);
    rightPipeImg.style('display', `none`);

    // Floor
    baseImg = loadImage('assets/base.png');  // This will remain untouched.
    baseImgScaled = loadImage('assets/base.png'); // This will be resized possibly several times.

    
    gameFont = loadFont('assets/fonts/joystix.otf');
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    // Create the start button
    let startButton = createButton('s t a r t');
    startButton.id('startButton');
    startButton.mousePressed(handleStartButton);

    angleMode(DEGREES);

    imageMode(CENTER); // This will make placement and rotation easier because the 
                       // anchor point is moved to the center of the image

    // Resizing images
    leftPipeImg.style('width', `${pipeLengthFactor * windowWidth}px`);
    leftPipeImg.style('height', `${leftPipeImg.height}px`);

    rightPipeImg.style('width', `${pipeLengthFactor * windowWidth}px`);
    rightPipeImg.style('height', `${rightPipeImg.height}px`);
    rightPipeImg.style('transform', 'scaleX(-1)');

    baseImgScaled.resize(windowWidth, baseImgScaled.height);

    // Bringing the pipes to the front so it always show above all other <imgs>
    leftPipeImg.style('z-index', '2');
    rightPipeImg.style('z-index', '2');

    textFont(gameFont);

    // The board needs to necessarily be created before the animals since 
    //  we are passing some of its functions to the animals.
    board = new Board();

    // When we fetch, we order the data and update it like this:
    board.updateScoreData(
        [
            {  date: 'DEC 01', meetings: 320 },
            {  date: 'DEC 12', meetings: 311 },
            {  date: 'DEC 22', meetings: 291 },
            {  date: 'DEC 28', meetings: 121 },
            {  date: 'DEC 18', meetings: 97 }
        ],
        237 // yesterday's score
    );
}

function update() {
    // Picking a random animal type
    let types = Object.values(animalTypes);
    let randomIndex = Math.floor(Math.random() * types.length);
    let randomAnimalType = types[randomIndex];

    // Creating a new animal every once in a while.
    if (frameCount - lastAnimalCreationFrame >= animalCreationInterval + Math.floor(Math.random() * 19000) ) {

        let newAnimal = new Animal(leftPipeImg.width / 2, 
                                    pipePosYFactor*windowHeight + leftPipeImg.height/2, 
                                    petNames[Math.floor(Math.random() * petNames.length)], 
                                    randomAnimalType, 
                                    (animalType) => {
                                    if (board) {
                                        board.animalBooked(animalType);
                                    }
                                  });

        animals.push(newAnimal); 


        lastAnimalCreationFrame = frameCount;
    }

    for (let i = 0; i < animals.length; i++) {
        animals[i].update();
    }

    // Remove animals which were already computed.
    // We're looping backwards here because we're removing
    //  items at the same time that we're looping.
    for (let i = animals.length - 1; i >= 0; i--) {
        if (animals[i].isDead) {
            animals.splice(i, 1);
        }
    }
}

function draw() {
    if(userClickedStart){
        update();
        background(0);
    
        drawScene();
            
        for (let i = 0; i < animals.length; i++) {
            animals[i].draw();
        }

        board.draw();
    }
}

function drawScene () {
    // Left Pipe
    leftPipeImg.position(0, pipePosYFactor*windowHeight);

    // Right Pipe
    rightPipeImg.position(windowWidth - rightPipeImg.width, pipePosYFactor*windowHeight);

    // Floor
    image(baseImgScaled, windowWidth/2, windowHeight - baseImgScaled.height/2);
}

function handleStartButton() {
    // Start the sketch when the button is pressed.
    userClickedStart = true;
    
    // Start the audio context on user gesture and load sounds.
    userStartAudio();
    pipeSound = loadSound('assets/audio/pipe.mp3');
    coinSound = loadSound('assets/audio/coin.mp3');

    // Remove the start button after starting.
    let startButton = select('button');
    startButton.remove();

    // Turning all hidden images visible now.
    leftPipeImg.style('display', `inline`);
    rightPipeImg.style('display', `inline`);
  }

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

    // Resizing the pipes
    let pipeLength = pipeLengthFactor*windowWidth;
    leftPipeImg.style('width', `${pipeLength}px`);
    leftPipeImg.style('height', `${leftPipeImg.height}px`);
    rightPipeImg.style('width', `${pipeLength}px`);
    rightPipeImg.style('height', `${leftPipeImg.height}px`);

    // Resizing the floor
    baseImgScaled = baseImg.get();
    baseImgScaled.resize(windowWidth, baseImgScaled.height);
}

const petNames = [
    "Bella",
    "Max",
    "Lucy",
    "Charlie",
    "Luna",
    "Cooper",
    "Milo",
    "Oliver",
    "Leo",
    "Chloe",
    "Simba",
    "Coco",
    "Buddy",
    "Sadie",
    "Rocky",
    "Sophie",
    "Molly",
    "Tucker",
    "Daisy",
    "Oscar",
    "Zoe",
    "Lola",
    "Jackson",
    "Lily",
    "Bailey",
    "Maddie",
    "Jack",
    "Nala",
    "Sam",
    "Lily",
  ];