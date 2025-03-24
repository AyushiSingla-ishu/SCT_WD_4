let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const minuteElement = document.querySelector('.minute');
const secondElement = document.querySelector('.second');
const msecondElement = document.querySelector('.msecond');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapList = document.getElementById('lap-list');

function formatTime(time) {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
}

function updateTime() {
    const currentTime = Date.now() - startTime + elapsedTime;
    const formattedTime = formatTime(currentTime);
    const [minutes, seconds, milliseconds] = formattedTime.split(':');
    minuteElement.textContent = `${minutes}:`;
    secondElement.textContent = `${seconds}:`;
    msecondElement.textContent = milliseconds;
}

function start() {
    if (!isRunning) {
        startTime = Date.now();
        timerInterval = setInterval(updateTime, 10);
        isRunning = true;
        startButton.disabled = true;
        pauseButton.disabled = false;
        resetButton.disabled = false;
        lapButton.disabled = false;
    }
}

function pause() {
    if (isRunning) {
        clearInterval(timerInterval);
        elapsedTime += Date.now() - startTime;
        isRunning = false;
        startButton.disabled = false;
        pauseButton.disabled = true;
    }
}

function reset() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    isRunning = false;
    startButton.disabled = false;
    pauseButton.disabled = true;
    resetButton.disabled = true;
    lapButton.disabled = true;
    minuteElement.textContent = '00:';
    secondElement.textContent = '00:';
    msecondElement.textContent = '00';
    lapList.innerHTML = '';
}

function lap() {
    if (isRunning) {
        const lapTime = formatTime(Date.now() - startTime + elapsedTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = lapTime;
        lapList.appendChild(lapItem);
    }
}

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);