status = "";
objects= [];
function setup() {
    Canvas = createCanvas(480, 340);
    Canvas.center();
    Video = createCapture(VIDEO);
    Video.size(480, 380);
    Video.hide();
}


function Start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status:Detecting Objects";
    Text_Box= document.getElementById("text").value;
}
function modelLoaded(){
    console.log("model is Loaded");
    status = true;
}
function gotResult(error, results) {
    if (error) {
        console.log(error);console
    }
    console.log(results);
    objects = results;
}
function draw(){
    image(Video,0,0,480,380);
    if (status != "") {
        objectDetector.detect(Video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status:Objects Detected";
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
           if(objects[i].label == Text_Box){
           Video.stop();
           objectDetector.detect(gotResult);
           document.getElementById("name").innerHTML = Text_Box +" Found";
           var synth = window.speechSynthesis;
           var utterThis = new SpeechSynthesisUtterance(Text_Box.value+" Found");
           }
           if(objects[i].label != Text_Box){
            Video.stop();
            objectDetector.detect(gotResult);
            document.getElementById("name").innerHTML = Text_Box +"  Not Found";
            var synth = window.speechSynthesis;
            var utterThis = new SpeechSynthesisUtterance(Text_Box.value+" Not Found");
           }
            }
        }
    }
