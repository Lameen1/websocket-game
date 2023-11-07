
const game = document.querySelector('.game-board')
const wordContainer = document.querySelector('.word-container')
const wordBox = document.querySelector('.answer-box')
const usernameTag= document.getElementById('username-label')
const usernameInput= document.getElementById('username-input')
const usernameConnectButton= document.getElementById('connect')
const usernameDisplay= document.getElementById('usernameDisplay')
const nameBox= document.querySelector(".player-id-box")
const letterBox = document.querySelectorAll('.letter-box')
const guessString = document.querySelector('.word-guessed')

//Hide username input when user enter username
//keep track of username in backend
const possWords = [
  "RAT",
  "MADE",
  "GAME",
  "DRAG",
  "GAT"
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
      nameBox.innerText = 'Player:' + " " + enteredUsername
      game.classList.add('show-game')
  }})
}


let emptyString = ''
guessString.innerText = emptyString
let guessWord = guessString.innerText

function addLetter(e){
  const letterGuess = letterBox[e].innerText
  guessString.innerText = guessString.innerText + letterGuess
  
  clickEffect.play()
}
function submitGuess(){
  for (i = 0; i < possWords.length; i++){
    if (possWords[i] == guessString.innerText){
      console.log("nutz")
      let currentNode = wordContainer.childNodes[i]
      resetGuess()
      for (e = 0; e < currentNode.childNodes.length; e++){
        currentNode.childNodes[e].classList.remove("hidden-answer-box")
      } 
    }
  }
  return resetGuess()
} 

function resetGuess(){
  guessString.innerText = emptyString
  clickEffect.play()
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
        return alert('game is not completed')
      }
    }
  }
}
