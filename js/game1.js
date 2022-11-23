const canvas = document.querySelector("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;
const c = canvas.getContext("2d");
const xCenter = canvas.width / 2;
const yCenter = canvas.height / 2;

const projectiles = [];

const player = new Player(xCenter, yCenter, 30, "blue");

addEventListener("click", (event) => {
  console.log(event.clientX);
  console.log(event.clientY);
  shootProjectile(event);
});

// animate();

function animate() {
  requestAnimationFrame(animate);

  c.clearRect(0, 0, canvas.width, canvas.height);
  player.draw();
  projectiles.forEach((projectile) => {
    projectile.update();
  });
}

function shootProjectile(event) {
  const angle = Math.atan2(event.clientY - yCenter, event.clientX - xCenter);
  const velocity = {
    x: Math.cos(angle),
    y: Math.sin(angle),
  };
  console.log(velocity);
  projectiles.push(new Projectile(xCenter, yCenter, 4, "green", velocity));
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
    this.draw();
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  };
}
