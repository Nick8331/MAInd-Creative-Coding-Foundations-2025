const canvas = document.getElementById("myCanvas");
const context = canvas.getContext('2d');
const width = window.innerWidth;
const height = window.innerHeight;
const size = 200;

canvas.width = width;
canvas.height = height;

let circlePos = size / 2;

function draw() {

    context.clearRect(0,0,width,height);

    circlePos += 0.5;

    context.fillStyle = "black";
    context.font = "40px Arial";
    context.fillText("Ciao", 100, 100);

    context.save();
    context.translate(width/2, height/3)

        context.fillStyle = "blue";
        context.fillRect(0,0, size, size);

        context.fillStyle = "orange";
        context.arc(size/2, circlePos, 50, 0, Math.PI*2)
        context.fill();

    context.restore();

    requestAnimationFrame(draw);
}

draw();