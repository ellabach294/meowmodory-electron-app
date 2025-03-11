function init() {
  window.addEventListener('DOMContentLoaded', () => {
    doAThing()
  })
}

function doAThing() {
  const versions = window.electron.process.versions
  replaceText('.electron-version', `Electron v${versions.electron}`)
  replaceText('.chrome-version', `Chromium v${versions.chrome}`)
  replaceText('.node-version', `Node v${versions.node}`)

  const ipcHandlerBtn = document.getElementById('ipcHandler')
  ipcHandlerBtn?.addEventListener('click', () => {
    window.electron.ipcRenderer.send('ping')
  })
}

function replaceText(selector, text) {
  const element = document.querySelector(selector)
  if (element) {
    element.innerText = text
  }
}

init()

document.getElementById('minimize-btn').addEventListener('click', () => {
  window.electron.minimize();
})

document.getElementById('close-btn').addEventListener('click', () => {
  window.electron.close();
})

/**
 * Pomodoro Function
 */
let pomodoroBtn = document.getElementById("pomodoro-session")
let shortBreakBtn = document.getElementById("short-break")
let longBreakBtn= document.getElementById("long-break")

let pomodoroTimer = document.getElementById("pomodoro-timer")
let shortTimer = document.getElementById("short-timer")
let longTimer = document.getElementById("long-timer")

let startBtn = document.getElementById("start")
let stopBtn = document.getElementById("stop")

const allSparklingImage = document.querySelectorAll(".sparkling-image")
const catImage = document.getElementById("cat-image")

console.log(allSparklingImage)

let currentTimer = null;
let alarm

function showDefaultTimer() {
  pomodoroTimer.style.display = "block";
  shortTimer.style.display = "none";
  longTimer.style.display = "none";
}

showDefaultTimer();

function hideAll() {
  let timers = document.querySelectorAll(".timer-display")
  console.log(timers)

  timers.forEach((timer) => (timer.style.display = "none"))
}

pomodoroBtn.addEventListener("click", () => {
  hideAll();

  pomodoroTimer.style.display = "block"
  currentTimer = pomodoroTimer;
})

shortBreakBtn.addEventListener("click", () => {
  hideAll();

  shortTimer.style.display = "block"
  currentTimer = shortTimer
})

longBreakBtn.addEventListener("click", () => {
  hideAll();
  
  longTimer.style.display = "block"
  currentTimer = longTimer
})

let myInterval = null;

function startTimer(timerDisplay) {
  if(!timerDisplay) {
    console.error("timerDisplay is null. Make sure the element exits")
    return;
  }

  if(myInterval) {
    clearInterval(myInterval)
  }

  const timerAttribute = timerDisplay.getAttribute("data-duration")
  if(!timerAttribute) {
    console.error("data-duration attribute is missing")
    return
  }

  let timerDuration = timerAttribute.split(":")[0];

  let durationInMilliSeconds = timerDuration * 60 * 1000;
  let endTimestamps = Date.now() + durationInMilliSeconds;

  //Style timer display
  timerDisplay.style.fontSize = "5rem";
  timerDisplay.style.letterSpacing = "15px";
  timerDisplay.style.color = "var(--dark-green)";

  myInterval = setInterval(function() {
    const timeRemaining = new Date(endTimestamps - Date.now());

    if(timeRemaining <= 0) {
      clearInterval(myInterval);
      timerDisplay.textContent = "00:00"
      alarm = new Audio("../assets/audio/mixkit-tick-tock-clock-timer-1045.wav");
      alarm.play();
    } else {
      const minutes = Math.floor(timeRemaining / 60000);
      const seconds = ((timeRemaining % 60000) / 1000).toFixed(0);
      const formattedTime = `${minutes}:${seconds
        .toString()
        .padStart(2, "0")}`;
        timerDisplay.textContent = formattedTime
    }
  }, 1000)
}

startBtn.addEventListener("click", () => {
  if(currentTimer) {
    startTimer(currentTimer)
  }

  allSparklingImage.forEach(image => {
    image.style.animation = "sparkle-glow-fade 2s infinite ease-in-out"
  }) 
  catImage.style.animation = "sparkle 4s infinite ease-in-out"

})

stopBtn.addEventListener("click", () => {
  const timerDisplay = document.querySelectorAll(".timer-display")

  timerDisplay.forEach((timer) => {
    const originalTime = timer.getAttribute("data-duration");
    if(originalTime) {
      timer.textContent = originalTime
      timer.style.fontSize = "5rem";
      timer.style.letterSpacing = "15px";
      timer.style.color = "var(--dark-green)";
    }
  })

  allSparklingImage.forEach(image => {
    image.style.animation = "none"
  }) 
  catImage.style.animation = "none"

  if(alarm) {
    alarm.pause();
    alarm.currentTime = 0;
  }

  if(currentTimer) {
    clearInterval(myInterval);
  }
})


