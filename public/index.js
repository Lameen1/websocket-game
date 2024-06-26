const theBody = document.querySelector('#the-body')
const game = document.querySelector('.game-board')
const wordContainer = document.querySelector('.word-container')
const wordBox = document.querySelector('.answer-box')
const usernameTag= document.getElementById('username-label')
const usernameInput= document.getElementById('username-input')
const usernameConnectButton= document.getElementById('connect')
const usernameDisplay= document.getElementById('usernameDisplay')
const nameBox= document.querySelector(".player-id-box")
const letterContainer = document.querySelector(".letter-container")
const letterBox = document.querySelectorAll('.letter-box')
const guessString = document.querySelector('.word-guessed')
const wordeeInfo = document.querySelector('.stats-timer-info-container')
const scoreNumber = document.querySelector('.score-number')
const ansFeedback = document.querySelector('.answer-feedback')
const submitButton = document.querySelector('.submit-guess')
const resetButton = document.querySelector('.reset-guess')

//Hide username input when user enter username
//keep track of username in backend
const possWords = [
  "ALE",
  "AGE",
  "BEG",
  "LEG",
  "BAG",
  "GEL",
  "LAG",
  "ABLE",
  "BALE",
  "BAGEL",
  "GABLE"
]

const themeSong = new Audio("assets/theme-song.mp3")
const clickEffect = new Audio("assets/click-effect.mp3")
connectingUser()

for (i = 0; i < possWords.length; i++){
  let element = document.createElement('div')
  
  element.className = "wordees-words"
  let currentWord = possWords[i]
  wordContainer.appendChild(element)

  for (e = 0; e < possWords[i].length; e++){
    let elementBox = document.createElement('div')
    
    elementBox.className = "answer-box"
    elementBox.classList.add("hidden-answer-box")
    elementBox.innerText = currentWord[e]
    
    element.appendChild(elementBox)
  }
}


function connectingUser(){
  usernameConnectButton.addEventListener('click', () => {
    let enteredUsername  = usernameInput.value
    if(enteredUsername == ""|| null){
      return 
    }else{ 
      usernameDisplay.style.display= 'none'
      nameBox.innerText = enteredUsername
      game.classList.add('show-game')
      wordeeInfo.classList.add('show-wordee-info')
      ansFeedback.classList.add('show-wordee-info')
      theBody.style.height = "100%"
      runTimer()
  }})
}


let emptyString = ''
guessString.innerText = emptyString
let guessWord = guessString.innerText

// Game info

function gameTimer(duration, display){
  var timer = duration, minutes, seconds;
  setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      if (--timer < 0) {
          display.textContent = "00:00";
          disableAllButtons()
          clearInterval()
      }

  }, 1000);
}
runTimer = function () {
  var threeMinutes = 60 * 3,
  display = document.querySelector('.timer-number');
  gameTimer(threeMinutes, display);
};






// Game Board Secion

function addLetter(e){
  const letterGuess = letterBox[e].innerText
  guessString.innerText = guessString.innerText + letterGuess
  
  disableLetter(e)
  clickEffect.play()
  clearFeedback()
}


let usedWords = []
function submitGuess(){
  let nah = 0
  
  for (i = 0; i < possWords.length; i++){

    if (possWords[i] == guessString.innerText){
      for (j = 0; j < usedWords.length; j++){
        if (usedWords[j] == guessString.innerText){
          ansFeedback.innerText = "You used that word already!"
          return
        }
      }
      ++nah
      usedWords.push(guessString.innerText)
      let currentNode = wordContainer.childNodes[i]
      resetGuess()
      
      for (e = 0; e < currentNode.childNodes.length; e++){
        currentNode.childNodes[e].classList.remove("hidden-answer-box")
        let wordPoints = e + 1
        addPoints(wordPoints)
      }
    } 
  }
  if (!nah == 1 ){
    ansFeedback.innerText = "Try a Different Word!"
  }
  return resetGuess()
}

let tempPoints = 0
function addPoints (points){
  tempPoints = tempPoints + points
  scoreNumber.innerText = tempPoints

}
function resetGuess(){
  guessString.innerText = emptyString
  enableLetter()
}


function doneButton(){
  const wordeeWord = wordContainer.childNodes
  let counter = 0

  for (i = 0; i < wordeeWord.length; i++){
    counter++
    if(counter == possWords.length){
      alert('You Did It')
    }
    for (e = 0; e < wordeeWord[i].childNodes.length; e++){
      if (wordeeWord[i].childNodes[e].classList.contains("hidden-answer-box")){
        return alert('Ur a failure Bruh')
      }
    }
  }
}

function clearFeedback(){
  ansFeedback.innerText = ""
}

function disableLetter (e){
  letterBox[e].classList.add("disable-it")
}

function enableLetter(){
  const allLetters = letterContainer.children
  for (i = 0; i < allLetters.length; i++){
    allLetters[i].classList.remove("disable-it")
  }
}

function disableAllButtons(){
  submitButton.classList.add("disable-it")
  resetButton.classList.add("disable-it")
}