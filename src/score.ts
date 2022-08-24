let snipesAlive = 0;
let snipesDead = 0;
let eggsAlive = 0;
let eggsDead = 0;

const snipesAliveScoreElement = document.getElementById('snipes-alive')!
const snipesDeadScoreElement = document.getElementById('snipes-dead')!
const eggsAliveScoreElement = document.getElementById('eggs-alive')!
const eggsDeadScoreElement = document.getElementById('eggs-dead')!

export function increaseSnipeScore() {
    snipesAlive++;
    snipesAliveScoreElement.innerHTML = snipesAlive.toString()
}

export function decreaseSnipeScore() {
    snipesDead++;
    snipesAlive--;
    snipesAliveScoreElement.innerHTML = snipesAlive.toString()
    snipesDeadScoreElement.innerHTML = snipesDead.toString()
}

export function increaseEggScore() {
    eggsAlive++;
    eggsAliveScoreElement.innerHTML = eggsAlive.toString()
}

export function decreaseEggScore() {
    eggsDead++;
    eggsAlive--;
    eggsAliveScoreElement.innerHTML = eggsAlive.toString()
    eggsDeadScoreElement.innerHTML = eggsDead.toString()
}