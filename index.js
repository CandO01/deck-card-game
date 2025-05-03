const deckCardButton = document.getElementById('deck-card')
const container = document.getElementById('card-container')
const drawCard = document.getElementById('draw-card')
const winnerHeader = document.getElementById('winner-slot')
const remainingCard = document.getElementById('newdeck-remaining')
const computerScore = document.getElementById('computer-score')
const myScore = document.getElementById('my-score')

//For score update
let computerScores = 0;
let myScores = 0

let deckId;
//fetching deck card from an api
async function deckCard(){
  const url = 'https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/'

  const options = {
    method: 'GET'
  }
  const response = await fetch(url, options)
  const data = await response.json()
  //to display the number of cards we drawn from the deck
  remainingCard.textContent = `Remaining card left: ${data.remaining}`

  //enable the draw card button when the new deck is zero
  if(data.remaining === 52){
    drawCard.disabled = false
    computerScore.textContent = 0;
    myScore.textContent = 0;
  }
  //This is the deck id
  deckId = data.deck_id
  // console.log(deckId)
}

//button logic to get new cards from deck
deckCardButton.addEventListener('click', deckCard)



//button to draw cards and also using an async function to draw cards
drawCard.addEventListener('click', async ()=>{
  container.innerHTML = ''
  const url = `https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`

  const options2 = {
    method: 'GET'
  }
  const response = await fetch(url, options2)
  const data = await response.json()
  const playCard = data.cards

  //To know the remaining card left after each card is drawn
  remainingCard.textContent = `Remaining card left: ${data.remaining}`

  //looping through the cards from the API
  let htmlCard =''
  playCard.forEach(element => {
    const div = document.createElement('div')
    div.classList.add('cards')
    htmlCard = `<img src='${element.image}' style='width: 160px; height: 224px;'>`
    div.innerHTML = htmlCard
    container.appendChild(div)
    // document.body.appendChild(div)
  });

  //To determine the winner
  const winnerText = compareCards(playCard[0], playCard[1])
  winnerHeader.textContent = winnerText

    //if the draw card is zero then the draw card button disabled
    if(data.remaining === 0){
      drawCard.disabled = true
      //determine the overall winner when the deck card is zero
      if(computerScores > myScores){
        winnerHeader.textContent = 'Computer won the game!!!'
      }
      else if(myScores > computerScores){
        winnerHeader.textContent = 'You won the game!!!'
      }
      else{
        winnerHeader.textContent = 'It is a tie.'
      }
    }

  compareCards();     
})

//placeholder before the card is drawn
container.innerHTML = `
                      <img src='./img/back.png' style='width: 160px; height: 224px; border: 2px solid black; border-radius: 4px;'>
                      <img src='./img/back.png' style='width: 160px; height: 224px; border: 2px solid black; border-radius: 4px;'>
                      `


//compare cards 
const compareCards = (card1, card2)=>{
  const cardsOrder = ["2","3","4","5","6","7","8","9","10","JACK","QUEEN","KING","ACE"]

  //know the value of card1
  const value1 = cardsOrder.indexOf(card1.value.toUpperCase())
  const value2 = cardsOrder.indexOf(card2.value.toUpperCase())

  //knowing the winner using ternary operator
  if(value1 > value2){
    computerScores++
    computerScore.textContent = `Computer's point: ${computerScores}`
    return 'Computer wins!'
  }
  else if(value2 > value1){
    myScores++
    myScore.textContent = `My point: ${myScores}`
    return 'You win!'
  }
  else{
    return 'War'
  }

}
// const card1 = {value: 'QUEEN'}
// const card2 = {value: 'QUEEN'}
// console.log(compareCards(card1, card2));








