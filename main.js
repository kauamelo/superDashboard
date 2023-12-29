
// Pipe
let pipeImg;
let pipeImgScaled;
let pipeHeightPosition = 100;
let pipeLengthFactor = 0.2; // Pipe length will be 0.2 * windowWidth

// Base Image
let baseImg;
let baseImgScaled;

// Animals GIFs
let horseGif;

function drawScene () {
    // Left Pipe
    image(pipeImgScaled, pipeImgScaled.width/2, pipeHeightPosition);

    // Right Pipe
    push();
    translate(windowWidth - pipeImgScaled.width/2, pipeHeightPosition);
    scale(-1,1); // inverting the x axis (to mirror the pipe image)
    image(pipeImgScaled, 0, 0);
    pop();

    // Base
    image(baseImgScaled, windowWidth/2, windowHeight - baseImgScaled.height);
}


function preload() {
    // Pipe
    pipeImg = loadImage('assets/pipe.png'); // This will remain untouched.
    pipeImgScaled = loadImage('assets/pipe.png'); // This will be resized possibly several times.

    // Base
    baseImg = loadImage('assets/base.png');  // This will remain untouched.
    baseImgScaled = loadImage('assets/base.png'); // This will be resized possibly several times.

    // Animal Gifs
    // horseGif = createImage('assets/gifs/horse.gif');
    horseGif = createImg('assets/gifs/horse.gif');


}

function setup() {
    createCanvas(windowWidth, windowHeight);

    angleMode(DEGREES);

    imageMode(CENTER); // This will make placement and rotation easier because the 
                       // anchor point is moved to the center of the image

    // Resizing images.
    pipeImgScaled.resize(pipeLengthFactor * windowWidth, pipeImg.height);
    baseImgScaled.resize(windowWidth, baseImgScaled.height);

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

    // Resizing the pipes
    let pipeLength = pipeLengthFactor*windowWidth;
    pipeImgScaled = pipeImg.get()
    pipeImgScaled.resize(pipeLength, pipeImg.height);

    // Resizing the base
    baseImgScaled = baseImg.get();
    baseImgScaled.resize(windowWidth, baseImgScaled.height);

}

function update() {
    // console.log("update");
}

function draw() {
    update();
    background(0);

    drawScene();


    
    // horseGif.position(mouseX, mouseY);
    // horseGif.position(50, 350);
    horseGif.position(mouseX, mouseY);



}
   