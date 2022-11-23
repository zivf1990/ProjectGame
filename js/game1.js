const canvas = document.querySelector("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;
const c = canvas.getContext("2d");
const xCenter = canvas.width / 2;
const yCenter = canvas.height / 2;

const projectiles = [];
const enemies = [];

const player = new Player(xCenter, yCenter, 30, "blue");

addEventListener("click", (event) => {
  //   console.log(event.clientX);
  //   console.log(event.clientY);
  shootProjectile(event);
});

// animate();
// spawnEnemies();

function animate() {
  requestAnimationFrame(animate);

  c.clearRect(0, 0, canvas.width, canvas.height);

  player.draw();
  projectiles.forEach((projectile) => projectile.update());
  enemies.forEach((enemy) => enemy.update());
}

function spawnEnemies(level = 1000) {
  setInterval(() => {
    const radius = 30;
    let x;
    let y;
    if (Math.random() > 0.5) {
      x = Math.random() > 0.5 ? 0 - radius : canvas.width + radius;
      y = Math.random() * canvas.height;
    } else {
      x = Math.random() * canvas.width;
      y = Math.random > 0.5 ? 0 - radius : canvas.height + radius;
    }

    const color = "red";
    const angle = Math.atan2(yCenter - y, xCenter - x);
    const velocity = {
      x: Math.cos(angle),
      y: Math.sin(angle),
    };
    enemies.push(new Enemy(x, y, radius, color, velocity));
    // console.log(enemies)
  }, level);
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

// Creating a Player object
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
// Creating an Enemy object
function Enemy(x, y, radius, color, velocity) {
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
// Creating a Projectile object
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
