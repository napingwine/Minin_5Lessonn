const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['red', 'blue', 'green', 'yellow', 'purple']
const endGameBox = document.querySelector('.end-game-box')
const scoreResult = document.querySelector('.scoreResult')
let time = 0
let score = 0
let currentSize = 0  // currentSize - размер крипа
let newGameBTN = document.querySelector('#newGameBTN')

newGameBTN.addEventListener('click', () => {
  screens[1].classList.remove('up') 
  window.location.reload()
})

startBtn.addEventListener('click', (event) => {
event.preventDefault()
screens[0].classList.add('up')
})
            
timeList.addEventListener('click', event => {
  if(event.target.classList.contains('time-btn')){
   time =  parseInt(event.target.getAttribute('data-time'))
  //  screens[1].classList.add('up')
   startGame()
  }
})

board.addEventListener('click', event => {
  if (event.target.classList.contains('circle')){
    score++
    event.target.remove()
    createRandomCircle()
    let timeBonus = currentSize / 10;
    time = time + timeBonus
    time = Math.round(time)
  }
  var audioElement = document.createElement('audio');
  audioElement.setAttribute('src', 'sound/016651.mp3');
  audioElement.play();
})
 
function startGame() {
  setInterval(()=> {
    if (time <= 0){
      finishGame()
    } else {
      let current = time--
      setTime(current)
    }
  } , 100) //time utill endGame
  createRandomCircle()
  setTime(time)
}

function setTime(value){
  value = value/10
  if(value < 10){
    timeEl.innerHTML = `00:0${value}` // if time less then 10sec
  }else {
    timeEl.innerHTML = `00:${value}` // if time more then 10sec
  }
}

function finishGame(){
  timeEl.parentNode.classList.add('hide')
  scoreResult.innerHTML = `${score}`
  const circle = document.querySelector('.circle')
  circle.style.display = `none`
  endGameBox.style.display = 'flex'
}

function createRandomCircle(){
  const circle = document.createElement('div')
  var audioElement = document.createElement('audio');
  audioElement.setAttribute('src', 'sound/zombie3.mp3');
  audioElement.play();
  const size = getRandomNumber(20, 60)
  currentSize = size
  const {width,height} = board.getBoundingClientRect()
  const x = getRandomNumber(0,width-size)
  const y = getRandomNumber(0,height-size)
  circle.classList.add('circle')
  circle.style.width = `${size}px`
  circle.style.height = `${size}px`
  circle.style.top = `${y}px`
  circle.style.left = `${x}px`
  circle.style.background = `url('pngwing.png')center`
  circle.style.backgroundSize = `contain`
  circle.style.backgroundRepeat = `no-repeat`
  board.append(circle)
}

function getRendomColor(){
  const index = Math.floor(Math.random() * colors.length)
  return colors[index]
}

function getRandomNumber(min, max){
 return Math.round(Math.random() * (max-min) + min)
}

function zombieSound() {
  
}