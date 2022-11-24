const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

const startGameBtn = document.querySelector("#start-game-btn");
const modalEl = document.querySelector("#modal-el");
const scoreEl = document.querySelector("#scoreEl");
const bigScoreEl = document.querySelector("#big-score-el");
let score = 0;

canvas.width = innerWidth;
canvas.height = innerHeight;

const xCenter = canvas.width / 2;
const yCenter = canvas.height / 2;

let animationId;
let shootingProjectilesIntervalId;

let particles;
let projectiles;
let enemies;

let player;

function init() {
  particles = [];
  projectiles = [];
  enemies = [];
  player = new Player(xCenter, yCenter, 10, "white");
  score = 0;
  scoreEl.textContent = score;
  bigScoreEl.textContent = score;
}

startGameBtn.addEventListener("click", () => {
  init();
  animate();
  spawnEnemies();
  modalEl.style.display = "none";
});

addEventListener("click", (event) => {
  //   console.log(event.clientX);
  //   console.log(event.clientY);
  // shootMultipleProjectiles(event);
  shootProjectile(event);
});

function animate() {
  animationId = requestAnimationFrame(animate);
  c.fillStyle = "rgba(0,0,0,0.1)";
  c.fillRect(0, 0, canvas.width, canvas.height);

  player.draw();

  //Fading out particles after explosion.
  particles.forEach((particle, index) => {
    if (particle.alpha < 0) {
      particles.splice(index, 1);
    } else {
      particle.update();
    }
  });

  //Draw & Update projectiles.
  projectiles.forEach((projectile, projectileIndex) => {
    projectile.update();

    //Remove off screen projectiles
    // console.log(projectiles)
    if (
      projectile.x - projectile.radius < 0 ||
      projectile.x + projectile.radius > canvas.width ||
      projectile.y - projectile.radius < 0 ||
      projectile.y + projectile.radius > canvas.height
    ) {
      setTimeout(() => {
        projectiles.splice(projectileIndex, 1);
      }, 0);
    }
  });

  //Draw & Update enemies.
  enemies.forEach((enemy, enemyIndex) => {
    enemy.update();

    //Collision detection between an enemy and a player.
    const dist = Math.hypot(enemy.x - player.x, enemy.y - player.y);
    if (dist - enemy.radius - player.radius < 1) {
      //GameOver
      cancelAnimationFrame(animationId);
      updateHighscore();
      modalEl.style.display = "flex";
      bigScoreEl.textContent = score;
    }

    // Collision detection between an enemy and a player's projectile.
    projectiles.forEach((projectile, projectileIndex) => {
      const dist = Math.hypot(enemy.x - projectile.x, enemy.y - projectile.y);
      if (dist - enemy.radius - projectile.radius < 1) {
        for (let i = 0; i < enemy.radius * 2; i++) {
          //Create explosions
          let xParticleSpeed = Math.random() * 6;
          let yParticleSpeed = Math.random() * 6;
          particles.push(
            new Particle(
              projectile.x,
              projectile.y,
              Math.random() * 2,
              enemy.color,
              {
                x: (Math.random() - 0.5) * xParticleSpeed,
                y: (Math.random() - 0.5) * yParticleSpeed,
              }
            )
          );
        }

        //Shrink an enemy when projectile's hits & remove the projectile..
        if (enemy.radius - 5 > 10) {
          //increase our score by 10 points.
          score += 100;
          scoreEl.textContent = score;

          gsap.to(enemy, {
            radius: enemy.radius - 10,
          });

          setTimeout(() => {
            projectiles.splice(projectileIndex, 1);
          }, 0);
        } else {
          //increase our score by 250 points.
          score += 250;
          scoreEl.textContent = score;

          //Remove an enemy & remove the projectile
          setTimeout(() => {
            enemies.splice(enemyIndex, 1);
            projectiles.splice(projectileIndex, 1);
            player.radius += 2;
          }, 0);
        }
      }
    });
  });
}

function spawnEnemies(level = 1000) {
  setInterval(() => {
    const radius = Math.random() * 26 + 4;
    let x;
    let y;
    if (Math.random() > 0.5) {
      x = Math.random() > 0.5 ? 0 - radius : canvas.width + radius;
      y = Math.random() * canvas.height;
    } else {
      x = Math.random() * canvas.width;
      y = Math.random > 0.5 ? 0 - radius : canvas.height + radius;
    }

    const color = `hsl(${Math.random() * 360}, 50%, 50%)`;
    //TODO: change yCenter and xCenter to player.x and player.y values.
    const angle = Math.atan2(yCenter - y, xCenter - x);

    const velocity = {
      x: Math.cos(angle),
      y: Math.sin(angle),
    };
    enemies.push(new Enemy(x, y, radius, color, velocity));
    // console.log(enemies)
  }, level);
}

function shootMultipleProjectiles(event) {
  clearInterval(shootingProjectilesIntervalId);
  addEventListener("mousemove", (event) => {
    shootingProjectilesIntervalId = setInterval(() => {
      shootProjectile(event);
    }, 350);
  });
}

function shootProjectile(event) {
  const angle = Math.atan2(event.clientY - yCenter, event.clientX - xCenter);
  console.log(angle);
  console.log(Math.cos(angle));
  console.log(Math.sin(angle));
  const velocity = {
    x: Math.cos(angle) * 5,
    y: Math.sin(angle) * 5,
  };
  //   console.log(velocity);
  projectiles.push(new Projectile(xCenter, yCenter, 4, "white", velocity));
}

//Update highscore for user
function updateHighscore() {
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));

  let curentUserHighScore = currentUser.game1.highScore;
  if (score > curentUserHighScore || currentUser.game1.highScore === null) {
    currentUser.game1.highScore = score;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }
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

const friction = 0.99;
function Particle(x, y, radius, color, velocity) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.velocity = velocity;
  this.alpha = 1; // fading out

  this.draw = function () {
    c.save();
    c.globalAlpha = this.alpha;
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    c.fillStyle = this.color;
    c.fill();
    c.restore();
  };

  this.update = function () {
    this.draw();
    this.velocity.x *= friction; // slow down velocityX
    this.velocity.y *= friction; // slow down velocityY
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= 0.01;
  };
}
