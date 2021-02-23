//document.getElementById('date').innerHTML = new Date().toDateString();

//Full Credit to the bouncy balls goes to Roger van Hout on codepen!  Awesome stuff fun to mess around with
var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");
var xAix = window.innerWidth;
var yAxi = window.innerHeight;
canvas.width = xAix;
canvas.height = yAxi;
//c.lineWidth= 5;
//c.globalAlpha = 0.5;

var mousex = 0;
var mousey = 0;

addEventListener("mousemove", function() {
  mousex = event.clientX;
  mousey = event.clientY;
});


var gravy = 0.99;
c.strokeWidth=10;
function randomColor() {
  return (
    "rgba(" +
    Math.round(Math.random() * 150) +
    "," +
    Math.round(Math.random() * 150) +
    "," +
    Math.round(Math.random() * 150) +
    "," +
    Math.ceil(Math.random() * 10) / 10 +
    ")"
  );
}

function Ball() {
  this.color = randomColor();
  this.radius = Math.random() * 20 + 14;
  this.startradius = this.radius;
  this.x = Math.random() * (xAix - this.radius * 2) + this.radius;
  this.y = Math.random() * (yAxi - this.radius);
  this.dy = Math.random() * 2;
  this.dx = Math.round((Math.random() - 0.5) * 10);
  this.vel = Math.random() /5;
  this.update = function() {
    c.beginPath();//used in conjunction with arc
    c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);//https://www.w3schools.com/tags/canvas_arc.asp 
    //arc function used to actually create the circles
    c.fillStyle = this.color;//adding random color
    c.fill();//filling with color
    c.stroke();//border of ball
  };
}

var bal = [];
for (var i=0; i<65; i++){//num of balls
    bal.push(new Ball());
}

function animate() {    
  if (xAix != window.innerWidth || yAxi != window.innerHeight) {
    xAix = window.innerWidth;
    yAxi = window.innerHeight;
    canvas.width = xAix;
    canvas.height = yAxi;
  }
  requestAnimationFrame(animate);
  c.clearRect(0, 0, xAix, yAxi);
  for (var i = 0; i < bal.length; i++) {
    bal[i].update();
    bal[i].y += bal[i].dy;
    bal[i].x += bal[i].dx;
    if (bal[i].y + bal[i].radius >= yAxi) {
      bal[i].dy = -bal[i].dy * gravy;
    } else {
      bal[i].dy += bal[i].vel;
    }    
    if(bal[i].x + bal[i].radius > xAix || bal[i].x - bal[i].radius < 0){
        bal[i].dx = -bal[i].dx;
    }
    if(mousex > bal[i].x - 20 && 
      mousex < bal[i].x + 20 &&
      mousey > bal[i].y -50 &&
      mousey < bal[i].y +50 &&
      bal[i].radius < 70){
        //bal[i].x += +1;
        bal[i].radius +=5; 
      } else {
        if(bal[i].radius > bal[i].startradius){
          bal[i].radius += -5;
        }
      }
      
    //forloop end
    }
//animation end
}

animate();

setInterval(function() {
  bal.push(new Ball());
  bal.splice(0, 1);
}, 100);
