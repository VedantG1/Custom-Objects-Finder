var status1 = ""

function preload(){

}

function setup(){
    canvas = createCanvas(480, 380)
    canvas.position(500 ,350)
    video = createCapture(VIDEO)
    video.hide()
}

function draw(){
    image(video, 0, 0, 480, 380)
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("detection").innerHTML = "Status : Detecting Objects"
}

function modelLoaded(){
    console.log("loaded")
    status1 = true
}
