const canvas = document.querySelector("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;
const c = canvas.getContext("2d");
const xCenter = canvas.width / 2;
const yCenter = canvas.height / 2;

const player = new Player(xCenter, yCenter, 30, "blue");
player.draw();
const projectile = new Projectile(xCenter, yCenter, 5, "red", {
  x: 1,
  y: 1,
});

addEventListener("click", (event) => {});

// animate()

function animate() {
  projectile.draw();
  projectile.update();
  requestAnimationFrame(animate);
  console.log("go");
}

function Player(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    c.fillStyle = this.color;
    c.fill();
  };
}

function Projectile(x, y, radius, color, velocity) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.velocity = velocity;

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    c.fillStyle = this.color;
    c.fill();
  };

  this.update = function () {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  };
}
