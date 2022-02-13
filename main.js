var status1 = ""
var objects = []
var customObj = ""

function preload() {

}

function setup() {
    canvas = createCanvas(480, 380)
    canvas.position(500, 350)
    video = createCapture(VIDEO)
    video.hide()
}

function draw() {
    image(video, 0, 0, 480, 380)
    if (status1 == true) {
        objectDetector.detect(video, gotResults)

        for (i = 0; i < objects.length; i++) {
            document.getElementById("detection").innerHTML = "Status : Detected"
            document.getElementById("noOfObjects").innerHTML = "Number of Objects Detected : " + objects.length
            fill("#FF0000")
            text(objects[i].label + " " + floor(objects[i].confidence * 100) + "%", (objects[i].x + 15), (objects[i].y + 15))
            noFill()
            stroke("#FF0000")
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
            if (objects[i].label == customObj) {
                video.stop()
                objectDetector.detect(gotResults)
                document.getElementById("found").innerHTML = customObj + " Found!"
                var synth = new window.speechSynthesis
                var utterThis = new SpeechSynthesisUtterance(customObj + " Found!")
                synth.speak(utterThis)
            }
            else {
                document.getElementById("found").innerHTML = customObj + " Not Found!"
            }
        }
    }
}

function gotResults(error, results) {
    if (error) {
        console.log("Error!")
    }
    else {
        console.log(results)
        objects = results
    }
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("detection").innerHTML = "Status : Detecting Objects"
    customObj = document.getElementById("input").value
}

function modelLoaded() {
    console.log("loaded")
    status1 = true
}
