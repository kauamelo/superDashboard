// We need this in order to load the audio files.
// We can't load them if the user didn't perform any gesture yet.
let userClickedStarted = false;
// let userClickedStarted = true;


// Sound when getting in/out the pipe.
let pipeSound;

// Pipe
let leftPipeImg;
let rightPipeImg;
let pipeHeightFactor = 0.2;

let pipeLengthFactor = 0.2; // Pipe length will be 0.2 * windowWidth

// Base Image
let baseImg;
let baseImgScaled;

// Animals GIFs
let horseGif;
let catGif;
let dogGif;
let exoticGif;

//
let gameFont;

let animal;

let board;


// Draw: pipes, base, 
function drawScene () {
    // Left Pipe
    leftPipeImg.position(0, pipeHeightFactor*windowHeight);

    // Right Pipe
    rightPipeImg.position(windowWidth - rightPipeImg.width, pipeHeightFactor*windowHeight);

    // Base
    image(baseImgScaled, windowWidth/2, windowHeight - baseImgScaled.height/2);
}

function preload() {
    // !! The order in which you load things here does matter !!
    // Gif are loaded as 'createImg' which creates an HTML element outside the canvas.
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

    // Base
    baseImg = loadImage('assets/base.png');  // This will remain untouched.
    baseImgScaled = loadImage('assets/base.png'); // This will be resized possibly several times.

    // 
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


    animal = new Animal(leftPipeImg.width/2, 
                        pipeHeightFactor*windowHeight + leftPipeImg.height/2, 
                        "Busse", 
                        2, 
                        'assets/gifs/horse.gif');

    board = new Board();

}


function handleStartButton() {
    // Start the sketch when the button is pressed.
    userClickedStarted = true;
    
    // Start the audio context on user gesture and load sounds
    userStartAudio();
      pipeSound = loadSound('assets/audio/pipe.mp3');

    // Remove the start button after starting
    let startButton = select('button');
    startButton.remove();

    // Turning all images visible now
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


    // Resizing the base
    baseImgScaled = baseImg.get();
    baseImgScaled.resize(windowWidth, baseImgScaled.height);
}

function update() {
    animal.update();
}

function draw() {
    if(userClickedStarted){
        update();
        background(0);
    
        drawScene();
            
        animal.draw();
        board.draw();

    }
}
