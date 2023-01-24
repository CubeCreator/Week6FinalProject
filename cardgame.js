//Set all the values and suits that a card can be.
const SUITS = ["♥", "♦", "♠", "♣"]
const VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

const opponentCardSlot = document.querySelector('.opponent-card-slot')
const playerCardSlot = document.querySelector('.player-card-slot')
const opponentDeckElement = document.querySelector('.opponent-deck')
const playerDeckElement = document.querySelector('.player-deck')
const text = document.querySelector('.text')
const scoreboard = document.querySelector('.scoreboard')

let playerDeck, opponentDeck, inRound

class Card {
    constructor(suit, value) {
        this.suit = suit
        this.value = value
    }

    get color() {
        return this.suit === '♣' || this.suit === '♠' ? 'black' : 'red';
    }

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

    get numberOfCards() {
        return this.cards.length
    }

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

    dealCards() {

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

class Player {
    constructor() {
        this.CurrentHand = []
        this.PlayerScore = 0
        
    }

    gameSession() {
        
    }

    namingSession() {

    }

    cardMatchup() {
        
    }
}

document.addEventListener('click', () => {
    if (inRound) {
        roundReset()
    }
    else
        flipCards()
})

startgame()

function startgame() {
    const deck = new Deck()
    deck.shuffle()
    console.log(deck.cards)

    const deckMidpoint = Math.ceil(deck.numberOfCards /2)
    playerDeck = new Deck(deck.cards.slice(0, deckMidpoint))
    opponentDeck = new Deck(deck.cards.slice(deckMidpoint, deck.numberOfCards))

    console.log(playerDeck)
    console.log(opponentDeck)

    roundReset()
}

function roundReset() {
    opponentCardSlot.innerHTML = ''
    playerCardSlot.innerHTML = ''
    text.innerText = ''

    updateCardCount()
}

function flipCards() {
    inRound = true

    const playerCard = playerDeck.pop()
    const opponentCard = opponentDeck.pop()

    playerCardSlot.appendChild(playerCard.getHTML())
    opponentCardSlot.appendchild(opponentCard.getHTML())

}

function updateCardCount() {
    opponentDeckElement.innerText = opponentDeck.numberOfCards
    playerDeckElement.innerText = playerDeck.numberOfCards
}
