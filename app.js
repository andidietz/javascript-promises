//Part 1a
const getNum12TriviaUrl = 'http://numbersapi.com/12/trivia?json'
axios.get(getNum12TriviaUrl)
    .then( res => console.log(res.data))
    .catch( err => console.log(err))

// Part 1b
const getRangeOfTriviaUrl = 'http://numbersapi.com/1..12/trivia?json'
const numfactsList = document.querySelector('#num-list-facts')

function generateNumListHTML(list, res) {
    for (let i = 0; i < res.length; i++) {
        let newFact = document.createElement('li')
        newFact.innerText = res[i]
        list.append(newFact)
    }
}

axios.get(getRangeOfTriviaUrl)
    .then( res => {
        generateNumListHTML(numfactsList, Object.values(res.data))
    })
    .catch( err => console.log(err))

//Part 1c
const getNum6TriviaUrl = 'http://numbersapi.com/6/trivia'
const favfactsList = document.querySelector('#fav-num-facts')
let numPromises = []

function generateFavNumHTML(list, res) {
    for (let i = 0; i < res.length; i++) {
        let newFact = document.createElement('li')
        newFact.innerText = res[i].data
        list.append(newFact)
    }
}

for (let i = 1; i < 5; i++) {
    numPromises.push(
        axios.get(getNum6TriviaUrl)
    )
}

Promise.all(numPromises)
    .then( numFacts => generateFavNumHTML(favfactsList, numFacts))
    .catch(err => console.log(err))

//Part 2a
const shuffleAndDrawUrl = 'http://deckofcardsapi.com/api/deck/new/draw/?count=1'

axios.get(shuffleAndDrawUrl)
    .then( res => console.log(res.data.cards[0].value, res.data.cards[0].suit))
    .catch( err => console.log(err))

// Part 2b
let playersCards = []

function storeCardValueAndSuit(res) {
    playersCards.push(`${res.data.cards[0].value}, ${res.data.cards[0].suit}`)
}

function displayCards(playersCards) {
    for (let i = 0; i < playersCards.length; i++) {
        console.log(playersCards[i])
    }    
}

axios.get(shuffleAndDrawUrl)
    .then( res => {
        storeCardValueAndSuit(res)
        let deckId = res.data.deck_id

        return axios.get(`http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    })
    .then( res => {
        storeCardValueAndSuit(res)
        displayCards(playersCards)
    })
    .catch( err => console.log(err))

    //Part 3
    const getDeckUrl = 'http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
    const drawCardBtn = document.querySelector('#draw-card-btn')
    let deckId
    let cardDisplaySection = document.querySelector('#card-display-section')

    function generateCardHTML(res) {
        let newCard = document.createElement('img')
        newCard.setAttribute('src', res.data.cards[0].image)
        cardDisplaySection.append(newCard)
    }

    function getDeck() {
        axios.get(getDeckUrl)
            .then( res => {
                deckId = res.data.deck_id
            })
    }

    function getCardFromSameDec() {
        axios.get(`http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
            .then( res => {
                generateCardHTML(res)
            })
    }

    document.addEventListener('DOMContentLoaded', getDeck)
    drawCardBtn.addEventListener('click', getCardFromSameDec)