//Set all the values and suits that a card can be.
const SUITS = ["♥", "♦", "♠", "♣"]
const VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

//variables for all the HTML element that can filled in later
const opponentDisplayName = document.querySelector('.opponent-display-name')
const playerDisplayName = document.querySelector('.player-display-name')
const opponentCardSlot = document.querySelector('.opponent-card-slot')
const playerCardSlot = document.querySelector('.player-card-slot')
const opponentDeckElement = document.querySelector('.opponent-deck')
const playerDeckElement = document.querySelector('.player-deck')
const text = document.querySelector('.text')
const scoreboard = document.querySelector('.scoreboard')

//set all the cards value for comparisons on who won to be used later
const CARD_VALUES = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    "J": 11,
    "Q": 12,
    "K": 13,
    "A": 14,
}
//set variables for the two decks to be used later.
let playerDeck, opponentDeck
//set the default for round started to false upon start
let inRound = false


class Card {
    constructor(suit, value) {
        this.suit = suit
        this.value = value
    }

    //code to figure out what colour the card should be displayed in
    get color() {
        return this.suit === '♣' || this.suit === '♠' ? 'black' : 'red';
    }

    //display these values on the HTML page.
    getHTML() {
        const cardDiv = document.createElement('div')
        cardDiv.innerText = this.suit
        cardDiv.classList.add("card", this.color)
        cardDiv.dataset.value = `${this.value} ${this.suit}`
        return cardDiv
    }
}

class Deck {
    constructor(cards = fullDeck()) {
        this.cards = cards

    }
    //simplify and not have to require always putting .length at the end of everything
    get numberOfCards() {
        return this.cards.length
    }

    //get the top card in the deck from the array
    pop() {
        return this.cards.shift()
    }

    //randomize the cards completely by swapping and shuffle positions in the array.
    shuffle() {
        for (let i = this.numberOfCards -1; i > 0; i--) {
            const newIndex = Math.floor(Math.random() * (i + 1))
            const oldIndex = this.cards[newIndex]
            this.cards[newIndex] = this.cards[i]
            this.cards[i] = oldIndex

        }
    }
}

//generate a full deck of 52 cards with all the suits and values.
function fullDeck () {
    return SUITS.flatMap(suit => {
        return VALUES.map(value => {
            return new Card(suit, value)
        })
    })
}
console.log(fullDeck())

class Player {
    constructor(playerName) {
        this.playerName = playerName
        this.PlayerScore = 0
        
    }

}
//On click progress the game if there is cards to play
document.addEventListener('click', () => {
    if (inRound) {
        roundReset()
    }
    else if (playerDeck.numberOfCards > 0)
        flipCards()
})

startgame()

function startgame() {
    const deck = new Deck()
    deck.shuffle()
    console.log(deck.cards)

    //split the deck and ask for names, display those names and start the game.
    const deckMidpoint = Math.ceil(deck.numberOfCards /2)
    let playNickname = prompt("Enter your name:")
    let oppoNickname = prompt("Enter opponent's name:")
    YourPlayer = new Player(playNickname)
    playerDeck = new Deck(deck.cards.slice(0, deckMidpoint))
    NewOpponent = new Player(oppoNickname)
    opponentDeck = new Deck(deck.cards.slice(deckMidpoint, deck.numberOfCards))
    inRound = false

    playerDisplayName.innerText = YourPlayer.playerName
    opponentDisplayName.innerText = NewOpponent.playerName

    console.log(playerDeck)
    console.log(opponentDeck)

    roundReset()
}

//remove all the text from the previous round and set the round variable to be replayed
function roundReset() {
    
    opponentCardSlot.innerHTML = ''
    playerCardSlot.innerHTML = ''
    text.innerText = ''
    inRound = false

    updateCardCount()
}

function flipCards() {
    inRound = true

    const playerCard = playerDeck.pop()
    const opponentCard = opponentDeck.pop()

    //Display the cards played using the getHTML Function
    playerCardSlot.appendChild(playerCard.getHTML())
    opponentCardSlot.appendChild(opponentCard.getHTML())

    //Display wins and loses and add them to the scoreboard.
    if (roundWinnerCheck(playerCard, opponentCard)) {
        text.innerText = "You win!"
        YourPlayer.PlayerScore += 1
        scoreboard.innerText = YourPlayer.PlayerScore + "-" + NewOpponent.PlayerScore
        
    }
    else if (roundWinnerCheck(opponentCard, playerCard)) {
        text.innerText = "Opponent wins!"
        NewOpponent.PlayerScore += 1
        scoreboard.innerText = YourPlayer.PlayerScore + "-" + NewOpponent.PlayerScore
    }
    else {
        text.innerText = "Draw!"
    }
    //update the cardCount to make sure the game doesn't end before displaying zero.
    updateCardCount()

    //Check if the player still has cards
    if (outOfCards(playerDeck)) {
        //if not compare the scores and declare a winner!
        if (YourPlayer.PlayerScore > NewOpponent.PlayerScore){
            text.innerText = YourPlayer.playerName + " has won!"
        }
        else if (NewOpponent.PlayerScore > YourPlayer.PlayerScore) {
            text.innerText = NewOpponent.playerName + " has beaten you!"
        }
        else {
            text.innerText = YourPlayer.playerName + " has tied with" + NewOpponent.playerName
        }
    }
}

//Update display of the cards left in the decks.
function updateCardCount() {
    opponentDeckElement.innerText = opponentDeck.numberOfCards
    playerDeckElement.innerText = playerDeck.numberOfCards
}

//Check if the values of the cards are bigger then anothers
function roundWinnerCheck(cardOne, cardTwo) {
    return CARD_VALUES[cardOne.value] > CARD_VALUES[cardTwo.value]
}

//Check if the decks have no more cards to play
function outOfCards(deck) {
    return deck.numberOfCards === 0
}