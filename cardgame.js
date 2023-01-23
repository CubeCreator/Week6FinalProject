const SUITS = ["♥", "♦", "♠", "♣"]
const VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

class Card {
    constructor(suit, value) {
        this.suit = suit
        this.value = value
    }

    
}

class Deck {
    constructor(cards = fullDeck()) {
        this.cards = cards

    }

    get numberOfCards() {
        return this.cards.length
    }

    shuffle() {
        for (let i = this.numberOfCards -1; i > 0; i--) {
            const newIndex = Math.floor(Math.random() * (i + 1))
            const oldIndex = this.cards[newIndex]
            this.cards[newIndex] = this.cards[i]
            this.cards[i] = oldIndex

        }
    }
}

function fullDeck () {
    return SUITS.flatMap(suit => {
        return VALUES.map(value => {
            return new Card(suit, value)
        })
    })
}

class Player {
    constructor(PlayerName) {
        this.PlayerName = PlayerName
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

const deck = new Deck()
deck.shuffle()
console.log(deck.cards)